# Đợt quái và cảnh báo chó săn

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm đợt quái và cảnh báo chó săn theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật. Chỉ entrypoint và nhánh đã ghi chú được đọc sâu; không gắn nhãn toàn bộ glob là đã dịch ngược.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

Đợt săn phân biệt lịch chung theo tuổi trung bình và số quái theo tuổi từng người, có phục hồi pha cảnh báo.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- CalcEscalationLevel dùng tuổi trung bình của activeplayers với mốc 8/25/50/100 ngày để chọn attackdelay và warnduration. CalcPlayerAttackSize lại dùng tuổi của từng player với mốc 10/25/50/100. Hai phép tính không có cùng ngưỡng đầu.

- PlanNextAttack giữ lịch đã lưu nếu timetoattack còn dương, thử lại sau 1 giây nếu không có người chơi và không lập đợt mới ở spawnmode never. OnUpdate xử lý delayed spawn riêng cho từng người; wave chung chỉ trừ thời gian khi có activeplayers và đã attackplanned. Pause source có logic riêng trước pha warning.

- Save giữ warning, timetoattack, warnduration, attackplanned, missingplayerspawninfo và dữ liệu override. Load bỏ warning nếu timer còn xa; nếu lịch đã vào vùng warning thì tăng timetoattack thành warnduration + 5 để có thời gian cảnh báo khi vào lại.

### Nguồn đối chiếu

- [components/hounded.lua:110–196](../source/scripts/components/hounded.lua).

- [components/hounded.lua:956–1028](../source/scripts/components/hounded.lua).

- [components/hounded.lua:1087–1126](../source/scripts/components/hounded.lua).

### Phạm vi còn hở

- Phải theo HandleSpawnInfoRec và GetWaveAmounts đầy đủ để tính grouping, miễn trừ vị trí, biến thể hound và worm boss cho mọi world setting.

- Chưa quan sát số quái thực sinh trong mạng nhiều người hoặc người rời/vào đúng lúc cảnh báo.

<!-- deep-review-world-ecology:end -->

- [brains/houndbrain.lua:1](../source/scripts/brains/houndbrain.lua) — text-lua

- [components/hounded.lua:1](../source/scripts/components/hounded.lua) — text-lua

- [components/houndedtarget.lua:1](../source/scripts/components/houndedtarget.lua) — text-lua

- [prefabs/hound.lua:1](../source/scripts/prefabs/hound.lua) — text-lua

- [prefabs/houndmound.lua:1](../source/scripts/prefabs/houndmound.lua) — text-lua

- [stategraphs/SGhound.lua:1](../source/scripts/stategraphs/SGhound.lua) — text-lua
