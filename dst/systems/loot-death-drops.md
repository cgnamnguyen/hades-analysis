# Loot, rơi đồ và xác tồn tại

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm loot, rơi đồ và xác tồn tại theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

GenerateLoot ghép nhiều nguồn loot rồi DropLoot mới đổi theo cháy và tạo entity ngoài thế giới.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- PickRandomLoot lấy random × tổng trọng số rồi trừ lần lượt weight. GenerateLoot gọi lootsetupfn trước, sau đó numrandomloot, chanceloot, shared chanceloottable, fallback ifnotchanceloot, loot cố định và droprecipeloot. GetChance áp GetEntityLuckChance cho chance dưới 1 khi có lucky_user.

- Fallback ifnotchanceloot kiểm tra self.droppingchanceloot, là field của component; không được coi mỗi entry random đều tự bảo đảm fallback. Đối tượng burnt còn có xác suất 0.4 thêm charcoal trong GenerateLoot.

- DropLoot có thể đổi prefab sang BURNED_LOOT_OVERRIDES, dạng cooked hoặc ash theo trạng thái cháy/structure/tag. SpawnLootPrefab kế thừa độ ẩm, fling, phát on_loot_dropped và loot_prefab_spawned; controlled burn có thể làm loot smoulder. Sau đó còn nhánh Winter Feast và world event entity_droploot.

### Nguồn đối chiếu

- [components/lootdropper.lua:99–113](../source/scripts/components/lootdropper.lua).

- [components/lootdropper.lua:173–257](../source/scripts/components/lootdropper.lua).

- [components/lootdropper.lua:372–458](../source/scripts/components/lootdropper.lua).

### Phạm vi còn hở

- Loot của từng boss/corpse và quyền nhận trong multiplayer phải ghép callback cụ thể. Chưa tính đầy đủ recipe refund, luck implementation và save của corpse manager.

- Chưa chạy thống kê xác suất hoặc xác minh iteration order khi weight bảng dùng pairs.

<!-- deep-review-world-ecology:end -->

- [playerdeaths.lua:1](../source/scripts/playerdeaths.lua) — text-lua

- [components/corpsepersistmanager.lua:1](../source/scripts/components/corpsepersistmanager.lua) — text-lua

- [components/deathloothandler.lua:1](../source/scripts/components/deathloothandler.lua) — text-lua

- [components/lootdropper.lua:1](../source/scripts/components/lootdropper.lua) — text-lua

- [components/murderable.lua:1](../source/scripts/components/murderable.lua) — text-lua

- [components/treasuremarked.lua:1](../source/scripts/components/treasuremarked.lua) — text-lua

- [prefabs/skeleton.lua:1](../source/scripts/prefabs/skeleton.lua) — text-lua
