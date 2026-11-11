# Boss bề mặt và theo mùa

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm boss bề mặt và theo mùa theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

Đã nối nhánh tấn công/hành vi phụ và trạng thái lưu của Deerclops, Bearger và Dragonfly.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- Deerclops bị đánh sẽ đổi combat target sang attacker; player có thể khiến nó tìm targetbase nếu chưa phá đủ cấu trúc và chưa có vị trí base. OnHitOther thêm coldness cho mục tiêu còn sống, hạ nhiệt 5 khi nhiệt độ dương và phát shatter FX. Save giữ structuresDestroyed; Load có tương thích cờ looted cũ.

- Bearger vào hibernation trong winter/spring. ShouldSleep chỉ nhận khi không có combat target và không đang chịu sát thương lửa. Đòn có tag weapontoss làm rơi vật cầm ở HANDS trừ stronggrip, thiefproof hoặc item nosteal. OnDestroyOther phá workable hợp lệ, tạm đánh dấu recentlycharged và có nhánh bỏ loot cây/đá.

- Dragonfly chuyển sang fire khi wave lavae đã hết và remaining_spawns <= 0. Lavae chọn target gần nhất trong grouptargeter rồi nhớ mother. Khi enraged, moisture đi qua ngưỡng 90% max có thể TransformNormal. Save ghi playercombat; Load khi đang giao tranh sẽ SetEngaged, khởi tạo home event ở tick sau và gọi Reset sau 1 giây.

### Nguồn đối chiếu

- [prefabs/deerclops.lua:179–220](../source/scripts/prefabs/deerclops.lua).

- [prefabs/bearger.lua:160–217](../source/scripts/prefabs/bearger.lua).

- [prefabs/bearger.lua:261–307](../source/scripts/prefabs/bearger.lua).

- [prefabs/dragonfly.lua:319–414](../source/scripts/prefabs/dragonfly.lua).

### Phạm vi còn hở

- Đã bổ sung Antlion, Bee Queen và Klaus vào các luồng prefab; Moose cùng toàn bộ stategraph hit frame, minion và arena của từng boss vẫn cần đọc riêng.

- Thời điểm phát đòn, invulnerability và loot cuối phải ghép stategraph/brain với prefab, không lấy chỉ tên phase làm kết luận chung.

<!-- deep-review-world-ecology:end -->

- [brains/beargerbrain.lua:1](../source/scripts/brains/beargerbrain.lua) — text-lua

- [brains/deerclopsbrain.lua:1](../source/scripts/brains/deerclopsbrain.lua) — text-lua

- [prefabs/antlion.lua:1](../source/scripts/prefabs/antlion.lua) — text-lua

- [prefabs/antliontrinket.lua:1](../source/scripts/prefabs/antliontrinket.lua) — text-lua

- [prefabs/antlion_sinkhole.lua:1](../source/scripts/prefabs/antlion_sinkhole.lua) — text-lua

- [prefabs/antlion_spawner.lua:1](../source/scripts/prefabs/antlion_spawner.lua) — text-lua

- [prefabs/bearger.lua:1](../source/scripts/prefabs/bearger.lua) — text-lua

- [prefabs/beargerfur_sack.lua:1](../source/scripts/prefabs/beargerfur_sack.lua) — text-lua

- [prefabs/beargervest.lua:1](../source/scripts/prefabs/beargervest.lua) — text-lua

- [prefabs/bearger_fur.lua:1](../source/scripts/prefabs/bearger_fur.lua) — text-lua

- [prefabs/bearger_fx.lua:1](../source/scripts/prefabs/bearger_fx.lua) — text-lua

- [prefabs/beequeen.lua:1](../source/scripts/prefabs/beequeen.lua) — text-lua

- [prefabs/beequeenhive.lua:1](../source/scripts/prefabs/beequeenhive.lua) — text-lua

- [prefabs/deerclops.lua:1](../source/scripts/prefabs/deerclops.lua) — text-lua

- [prefabs/deerclopseyeball_sentryward.lua:1](../source/scripts/prefabs/deerclopseyeball_sentryward.lua) — text-lua

- [prefabs/deerclops_eyeball.lua:1](../source/scripts/prefabs/deerclops_eyeball.lua) — text-lua

- [prefabs/deerclops_icespike_fx.lua:1](../source/scripts/prefabs/deerclops_icespike_fx.lua) — text-lua

- [prefabs/deerclops_laser.lua:1](../source/scripts/prefabs/deerclops_laser.lua) — text-lua

- [prefabs/deerclops_mutated_fx.lua:1](../source/scripts/prefabs/deerclops_mutated_fx.lua) — text-lua

- [prefabs/dragonfly.lua:1](../source/scripts/prefabs/dragonfly.lua) — text-lua

- [prefabs/dragonfly_chest.lua:1](../source/scripts/prefabs/dragonfly_chest.lua) — text-lua

- [prefabs/dragonfly_spawner.lua:1](../source/scripts/prefabs/dragonfly_spawner.lua) — text-lua

- [prefabs/klaus.lua:1](../source/scripts/prefabs/klaus.lua) — text-lua

- [prefabs/klaus_sack.lua:1](../source/scripts/prefabs/klaus_sack.lua) — text-lua

- [prefabs/moose.lua:1](../source/scripts/prefabs/moose.lua) — text-lua

- [prefabs/mooseegg.lua:1](../source/scripts/prefabs/mooseegg.lua) — text-lua

- [prefabs/moose_nest_fx.lua:1](../source/scripts/prefabs/moose_nest_fx.lua) — text-lua

- [stategraphs/SGdragonfly.lua:1](../source/scripts/stategraphs/SGdragonfly.lua) — text-lua

<!-- deep-followup-start -->

## Các nhánh được nối thêm trong đợt đọc

- Antlion.AcceptTest yêu cầu chưa có pending reward, chưa muốn đánh và rocktribute dương. Đồ có currentTempRange<=1 hoặc>=4 chuyển sang sự kiện nhận cống phẩm khiêu chiến, bỏ nhánh làm dịu. Cống phẩm thường cộng rocktribute*ANTLION_TRIBUTE_TO_RAGE_TIME vào thời gian rage có trần, cập nhật/resume/start timer rồi StopSinkholes.

- Antlion.StartCombat chỉ thêm combat/health/sanityaura khi persists và chưa có combat, đổi sang SGantlion_angry, gắn brain, disable trader và pause rage timer. StopCombat tháo lại các component chiến đấu, bật trader và khởi tạo lại timer. OnPreLoad thấy health trong save thì dựng combat trước khi component health được tải; OnLoad xóa wall_cd.

- Bee Queen đăng ký healthtrigger tại75%,50%,25%; mỗi callback thay cooldown/chuỗi guard theo phase và phát screech. OnLoad tính phase lại từ health hiện tại và khôi phục commander tracking boost. Boost mặc định tăng range lên80; khi bỏ boost và entity đang thức, task1 giây giảm range mỗi lượt4 cho tới40. HealthTrigger xét giao ngưỡng cả chiều giảm và chiều tăng, không có cờ dùng một lần trong component.

- Klaus.SetStatScale nhân khoảng đánh theo scale, chia attack period theo scale; sau đó dùng scale^3 cho max health và damage, giữ phần trăm health và đặt absorption=1-1/scale^3 khi scale>1. Unchain thay aura và tag/mode hiển thị; Enrage đặt lại scale và xóa nohelpers. Save giữ nohelpers/unchained/enraged, OnPreLoad áp các trạng thái này trước khi component được tải.

[prefabs/antlion.lua dòng 115–160](../source/scripts/prefabs/antlion.lua) · [prefabs/antlion.lua dòng 284–397](../source/scripts/prefabs/antlion.lua) · [prefabs/beequeen.lua dòng 224–302](../source/scripts/prefabs/beequeen.lua) · [prefabs/beequeen.lua dòng 420–427](../source/scripts/prefabs/beequeen.lua) · [components/healthtrigger.lua dòng 1–41](../source/scripts/components/healthtrigger.lua) · [prefabs/klaus.lua dòng 36–65](../source/scripts/prefabs/klaus.lua) · [prefabs/klaus.lua dòng 360–414](../source/scripts/prefabs/klaus.lua)

<!-- deep-followup-end -->
