# Chết, hồn ma và hồi sinh

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm chết, hồn ma và hồi sinh theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [playerdeaths.lua:1](../source/scripts/playerdeaths.lua) — text-lua

- [components/hauntable.lua:1](../source/scripts/components/hauntable.lua) — text-lua

- [components/resurrectorindicator.lua:1](../source/scripts/components/resurrectorindicator.lua) — text-lua

- [components/revivablecorpse.lua:1](../source/scripts/components/revivablecorpse.lua) — text-lua

- [components/spectatorcorpse.lua:1](../source/scripts/components/spectatorcorpse.lua) — text-lua

- [components/touchstonetracker.lua:1](../source/scripts/components/touchstonetracker.lua) — text-lua

- [prefabs/amulet.lua:1](../source/scripts/prefabs/amulet.lua) — text-lua

- [prefabs/resurrectionstatue.lua:1](../source/scripts/prefabs/resurrectionstatue.lua) — text-lua

- [prefabs/resurrectionstone.lua:1](../source/scripts/prefabs/resurrectionstone.lua) — text-lua

<!-- deep-review-characters-content:start -->

## Đọc sâu mã nguồn — 08/11/2026

Đã trace haunt, stone timeout, ghi dấu dùng theo shard và hồi sinh xác.

Hauntable.DoHaunt gọi onhaunt của prefab. Khi callback thành công, hauntvalue là HAUNT_INSTANT_REZ và người thực hiện có tag playerghost, nó phát respawnfromghost với source là vật bị haunt. itemmimic chuyển sang TurnEvil rồi thoát riêng. Cooldown/fx chạy theo kết quả; một callback trả false vẫn có thể mở FX/cooldown nhỏ khi entity còn hợp lệ, nên haunted tag không đủ chứng minh hồi sinh. [components/hauntable.lua dòng 9–38](../source/scripts/components/hauntable.lua) · [components/hauntable.lua dòng 82–115](../source/scripts/components/hauntable.lua)

Touchstone chỉ nhận haunt khi không có task, CanUseTouchStone của ghost đúng và animation idle_activate. Khi bắt đầu, nó hẹn timeout10 giây đề phòng ngắt kết nối. Nếu resurrection chưa hoàn tất, timeout sửa animation và bật lại light. Khi activate resurrection thật, task bị hủy, stone rơi loot và cooldown được khởi động, đồng thời phát usedtouchstone cho player. Stone có cooldown20 giây giữa các người dùng và có thể trì hoãn tái kích hoạt5..8 giây khi physics entity chặn vị trí. [prefabs/resurrectionstone.lua dòng 15–105](../source/scripts/prefabs/resurrectionstone.lua)

TouchStoneTracker dùng ID stone dương và bảng used. Save khóa bảng usedinsessions theo session_identifier hiện tại, giữ cả dữ liệu foreign shard. Load chỉ áp session hiện tại vào used và giữ các session khác riêng. TransferComponent chuyển dữ liệu sang entity mới. Điều này phân biệt quyền dùng stone của từng player với cooldown của stone trong world. [components/touchstonetracker.lua dòng 1–90](../source/scripts/components/touchstonetracker.lua)

RevivableCorpse.CanBeRevivedBy đòi tag corpse và callback riêng nếu có. GetReviveSpeedMult nhân tất cả multiplier ứng với tag của người hồi sinh. Revive ở mastersim phát respawnfromcorpse, source/user là reviver. Component mặc định tỷ lệ máu0,5, nhưng consumer có thể đổi. Việc kiểm tra CanBeRevivedBy và thực hiện Revive là hai API riêng cần caller dùng đúng. [components/revivablecorpse.lua dòng 1–93](../source/scripts/components/revivablecorpse.lua)

**Phần còn hở.**

- Cần ghép stategraph player để xác định lần trừ penalty, hồi máu, item mất đi và các kiểu respawn cụ thể.
- Amulet, resurrection statue và mode wilderness/endless có điều kiện riêng chưa được bao phủ bởi touchstone/corpse.

<!-- deep-review-characters-content:end -->
