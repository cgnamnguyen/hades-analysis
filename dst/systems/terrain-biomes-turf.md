# Địa hình, biome, turf và quy tắc nền

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm địa hình, biome, turf và quy tắc nền theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

Đặt turf tiêu một item sau khi đổi tile; undertile giữ nền cũ và đổi ID khi tải save.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- Factory make_turf tạo prefab theo từng mục GroundTiles.turf. Nhánh client return sau SetPristine; server thêm stackable, inventoryitem, fuel, burnable và deployable chế độ TURF có grid placer.

- ondeploy chuyển tọa độ điểm sang tile, gọi Map.SetTile rồi stackable.Get():Remove() để tiêu một đơn vị. Nhiên liệu của turf dùng TUNING.TINY_FUEL; không tự suy chi phí đặt từ recipe.

- UnderTile chỉ tồn tại trên mastersim, khởi tạo DataGrid khi worldmapsetsize. Get/Set/Clear quản lý nền bên dưới. Save nén grid, Load giải nén rồi ánh xạ mỗi ID qua TheWorld.tile_id_conversion_map, giữ ID gốc nếu không có mapping.

### Nguồn đối chiếu

- [prefabs/turfs.lua:8–91](../source/scripts/prefabs/turfs.lua).

- [components/undertile.lua:1–77](../source/scripts/components/undertile.lua).

### Phạm vi còn hở

- CanDeploy, loại nền cho phép và ảnh hưởng tốc độ/âm bước chân thuộc deployable/locomotor/tiledefs cần ghép tiếp.

- Chưa đọc đủ mọi room biome và native Map.SetTile để khẳng định thay tile luôn giữ lại vật thể/khả năng đi qua.

<!-- deep-review-world-ecology:end -->

- [groundcreepdefs.lua:1](../source/scripts/groundcreepdefs.lua) — text-lua

- [tiledefs.lua:1](../source/scripts/tiledefs.lua) — text-lua

- [tilegroups.lua:1](../source/scripts/tilegroups.lua) — text-lua

- [tilemanager.lua:1](../source/scripts/tilemanager.lua) — text-lua

- [worldtiledefs.lua:1](../source/scripts/worldtiledefs.lua) — text-lua

- [components/groundcreep.lua:1](../source/scripts/components/groundcreep.lua) — text-lua

- [components/undertile.lua:1](../source/scripts/components/undertile.lua) — text-lua

- [components/unevenground.lua:1](../source/scripts/components/unevenground.lua) — text-lua

- [prefabs/turfcraftingstation.lua:1](../source/scripts/prefabs/turfcraftingstation.lua) — text-lua

- [prefabs/turfs.lua:1](../source/scripts/prefabs/turfs.lua) — text-lua

- [map/rooms/test.lua:1](../source/scripts/map/rooms/test.lua) — text-lua

- [map/rooms/cave/bats.lua:1](../source/scripts/map/rooms/cave/bats.lua) — text-lua

- [map/rooms/cave/bluemush.lua:1](../source/scripts/map/rooms/cave/bluemush.lua) — text-lua

- [map/rooms/cave/fungusnoise.lua:1](../source/scripts/map/rooms/cave/fungusnoise.lua) — text-lua

- [map/rooms/cave/generic.lua:1](../source/scripts/map/rooms/cave/generic.lua) — text-lua

- [map/rooms/cave/greenmush.lua:1](../source/scripts/map/rooms/cave/greenmush.lua) — text-lua

- [map/rooms/cave/mud.lua:1](../source/scripts/map/rooms/cave/mud.lua) — text-lua

- [map/rooms/cave/rabbits.lua:1](../source/scripts/map/rooms/cave/rabbits.lua) — text-lua

- [map/rooms/cave/redmush.lua:1](../source/scripts/map/rooms/cave/redmush.lua) — text-lua

- [map/rooms/cave/rocky.lua:1](../source/scripts/map/rooms/cave/rocky.lua) — text-lua

- [map/rooms/cave/ruins.lua:1](../source/scripts/map/rooms/cave/ruins.lua) — text-lua

- [map/rooms/cave/sinkhole.lua:1](../source/scripts/map/rooms/cave/sinkhole.lua) — text-lua

- [map/rooms/cave/spillagmites.lua:1](../source/scripts/map/rooms/cave/spillagmites.lua) — text-lua

- [map/rooms/cave/swamp.lua:1](../source/scripts/map/rooms/cave/swamp.lua) — text-lua

- [map/rooms/cave/terrain_mazes.lua:1](../source/scripts/map/rooms/cave/terrain_mazes.lua) — text-lua

- [map/rooms/cave/toadstoolarena.lua:1](../source/scripts/map/rooms/cave/toadstoolarena.lua) — text-lua

- [map/rooms/cave/vents.lua:1](../source/scripts/map/rooms/cave/vents.lua) — text-lua

- [map/rooms/forest/bee.lua:1](../source/scripts/map/rooms/forest/bee.lua) — text-lua

- [map/rooms/forest/beefalo.lua:1](../source/scripts/map/rooms/forest/beefalo.lua) — text-lua

- [map/rooms/forest/blockers.lua:1](../source/scripts/map/rooms/forest/blockers.lua) — text-lua

- [map/rooms/forest/chess.lua:1](../source/scripts/map/rooms/forest/chess.lua) — text-lua

- [map/rooms/forest/DLCrooms.lua:1](../source/scripts/map/rooms/forest/DLCrooms.lua) — text-lua

- [map/rooms/forest/giants.lua:1](../source/scripts/map/rooms/forest/giants.lua) — text-lua

- [map/rooms/forest/graveyard.lua:1](../source/scripts/map/rooms/forest/graveyard.lua) — text-lua

- [map/rooms/forest/mandrake.lua:1](../source/scripts/map/rooms/forest/mandrake.lua) — text-lua

- [map/rooms/forest/merms.lua:1](../source/scripts/map/rooms/forest/merms.lua) — text-lua

- [map/rooms/forest/pigs.lua:1](../source/scripts/map/rooms/forest/pigs.lua) — text-lua

- [map/rooms/forest/spider.lua:1](../source/scripts/map/rooms/forest/spider.lua) — text-lua

- [map/rooms/forest/starts.lua:1](../source/scripts/map/rooms/forest/starts.lua) — text-lua

- [map/rooms/forest/tallbird.lua:1](../source/scripts/map/rooms/forest/tallbird.lua) — text-lua

- [map/rooms/forest/terrain_dirt.lua:1](../source/scripts/map/rooms/forest/terrain_dirt.lua) — text-lua

- [map/rooms/forest/terrain_forest.lua:1](../source/scripts/map/rooms/forest/terrain_forest.lua) — text-lua

- [map/rooms/forest/terrain_grass.lua:1](../source/scripts/map/rooms/forest/terrain_grass.lua) — text-lua

- [map/rooms/forest/terrain_impassable.lua:1](../source/scripts/map/rooms/forest/terrain_impassable.lua) — text-lua

- [map/rooms/forest/terrain_marsh.lua:1](../source/scripts/map/rooms/forest/terrain_marsh.lua) — text-lua

- [map/rooms/forest/terrain_moonisland.lua:1](../source/scripts/map/rooms/forest/terrain_moonisland.lua) — text-lua

- [map/rooms/forest/terrain_noise.lua:1](../source/scripts/map/rooms/forest/terrain_noise.lua) — text-lua

- [map/rooms/forest/terrain_ocean.lua:1](../source/scripts/map/rooms/forest/terrain_ocean.lua) — text-lua

- [map/rooms/forest/terrain_rocky.lua:1](../source/scripts/map/rooms/forest/terrain_rocky.lua) — text-lua

- [map/rooms/forest/terrain_savanna.lua:1](../source/scripts/map/rooms/forest/terrain_savanna.lua) — text-lua

- [map/rooms/forest/walrus.lua:1](../source/scripts/map/rooms/forest/walrus.lua) — text-lua

- [map/rooms/forest/wormhole.lua:1](../source/scripts/map/rooms/forest/wormhole.lua) — text-lua
