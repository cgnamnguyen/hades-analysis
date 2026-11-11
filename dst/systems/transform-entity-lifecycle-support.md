# Vòng đời, biến đổi và trạng thái hỗ trợ entity

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại inventory theo các module/định nghĩa có thật. Một file có thể thuộc nhiều hệ thống; cần trace riêng trước khi xác nhận hành vi.

- [curse_monkey_util.lua:1](../source/scripts/curse_monkey_util.lua) — text-lua

- [components/amorphous.lua:1](../source/scripts/components/amorphous.lua) — text-lua

- [components/custombuildmanager.lua:1](../source/scripts/components/custombuildmanager.lua) — text-lua

- [components/decay.lua:1](../source/scripts/components/decay.lua) — text-lua

- [components/despawnfader.lua:1](../source/scripts/components/despawnfader.lua) — text-lua

- [components/disappears.lua:1](../source/scripts/components/disappears.lua) — text-lua

- [components/distancefade.lua:1](../source/scripts/components/distancefade.lua) — text-lua

- [components/entitytracker.lua:1](../source/scripts/components/entitytracker.lua) — text-lua

- [components/knowndynamiclocations.lua:1](../source/scripts/components/knowndynamiclocations.lua) — text-lua

- [components/knownlocations.lua:1](../source/scripts/components/knownlocations.lua) — text-lua

- [components/physicsmodifiedexternally.lua:1](../source/scripts/components/physicsmodifiedexternally.lua) — text-lua

- [components/replayproxy.lua:1](../source/scripts/components/replayproxy.lua) — text-lua

- [components/savedrotation.lua:1](../source/scripts/components/savedrotation.lua) — text-lua

- [components/savedscale.lua:1](../source/scripts/components/savedscale.lua) — text-lua

- [components/scaler.lua:1](../source/scripts/components/scaler.lua) — text-lua

- [components/spawnfader.lua:1](../source/scripts/components/spawnfader.lua) — text-lua

- [components/transformer.lua:1](../source/scripts/components/transformer.lua) — text-lua

- [components/transparentondrones.lua:1](../source/scripts/components/transparentondrones.lua) — text-lua

- [components/transparentonsanity.lua:1](../source/scripts/components/transparentonsanity.lua) — text-lua

- [components/uniqueid.lua:1](../source/scripts/components/uniqueid.lua) — text-lua

- [components/uniqueprefabids.lua:1](../source/scripts/components/uniqueprefabids.lua) — text-lua

- [components/vanish_on_sleep.lua:1](../source/scripts/components/vanish_on_sleep.lua) — text-lua

<!-- deep-review-characters-content:start -->

## Đọc sâu mã nguồn — 08/11/2026

Đã trace thay prefab, chuyển dữ liệu component và theo dõi GUID qua save/load.

Transformer.GetObjectData gọi OnSave của từng component, giữ dữ liệu có trả về trong component_data và prefab.OnSave trong prefab_data. Khi StartTransform, nếu transformOffScreen yêu cầu entity ngủ thì nó đợi entitysleep, nếu đủ điều kiện thì chụp dữ liệu và hẹn Transform sau math.random() giây. Transform spawn transformPrefab tại vị trí cũ, chuyển objectData và cờ/event sang transformer mới nếu có rồi Remove entity cũ. [components/transformer.lua dòng 63–89](../source/scripts/components/transformer.lua) · [components/transformer.lua dòng 150–193](../source/scripts/components/transformer.lua)

Revert hẹn ngẫu nhiên tương tự, spawn objectData.prefab. Chỉ khi spawn thành công mới đặt vị trí, gọi OnLoad cho các component có sẵn và xóa entity hiện tại. Có sự khác biệt khóa cụ thể cần giữ nguyên khi đọc source. GetObjectData ghi prefab_data nhưng Revert gọi obj.OnLoad bằng self.objectData.item_data. Do đó chưa thể coi phần dữ liệu riêng prefab được phục hồi đầy đủ từ nhánh này. [components/transformer.lua dòng 195–231](../source/scripts/components/transformer.lua)

Transformer.Save ghi queuedTransform/queuedRevert, transformPrefab, transformed, objectData, các event/world-event và GUID target kèm refs. Load khôi phục dữ liệu chính và đăng ký lại các chờ entitysleep. LoadPostPass task0 kiểm onLoadCheck để quyết định đổi/revert, rồi tái gắn các event target qua ents. Khả năng serialize onLoadCheck và khôi phục refs bên trong component_data còn phải xem engine/caller. [components/transformer.lua dòng 233–304](../source/scripts/components/transformer.lua)

EntityTracker.TrackEntity đặt entry theo tên, đăng ký onremove để xóa reference. ForgetEntity bỏ listener trước khi xóa. Save ghi cặp name/GUID và danh sách refs; LoadPostPass chỉ TrackEntity khi GUID còn trong bảng ents. Đối tượng không có trong save được bỏ qua, không tự spawn lại từ tên. [components/entitytracker.lua dòng 1–66](../source/scripts/components/entitytracker.lua)

**Phần còn hở.**

- Chưa trace toàn bộ amorphous/decay/scaler/uniqueid. Tìm direct Transformer consumer trong Lua chỉ thấy comment ngoài module; consumer tạo bằng tên động/mod/native chưa xác minh.
- Khác khóa prefab_data/item_data đã xác minh ở mã nhưng chưa xác định consumer đang bật để tái hiện; chưa sửa mã gốc hoặc coi là lỗi runtime của mọi loại biến đổi.

<!-- deep-review-characters-content:end -->

<!-- continuation-review-start -->

## Đọc tiếp lưu/tải và các consumer — 08/11/2026

- Đã tìm direct reference components.transformer và AddComponent("transformer") trên toàn source/scripts Lua. Ngoài chính module, các match chỉ nằm trong comment của flower/flower_evil/mushrooms. GetObjectData ghi prefab_data còn Revert đọc item_data là khác khóa có thật, nhưng tìm kiếm này chưa cho thấy consumer trực tiếp đang bật. Không quy thành lỗi đang xảy ra với mọi hoa/nấm; dynamic component name, mod và native hook vẫn ngoài biên tìm kiếm.

[components/transformer.lua dòng 67–89](../source/scripts/components/transformer.lua) · [components/transformer.lua dòng 195–214](../source/scripts/components/transformer.lua) · [prefabs/flower.lua dòng 178–182](../source/scripts/prefabs/flower.lua) · [prefabs/flower_evil.lua dòng 76–76](../source/scripts/prefabs/flower_evil.lua) · [prefabs/mushrooms.lua dòng 241–245](../source/scripts/prefabs/mushrooms.lua)

[Phạm vi câu hỏi, suy luận và tìm kiếm](../evidence/deep-review-continuation-checks.json).

<!-- continuation-review-end -->
