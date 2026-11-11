# Hang động, phế tích và sinh thái dưới đất

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm hang động, phế tích và sinh thái dưới đất theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

NightmareClock là bộ pha riêng của hang động với thời lượng dao động, đồng bộ ở ranh giới và lưu pha.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- OnUpdate trừ dt khỏi remainingtimeinphase. Khi còn dương nó set_local; hết pha trên mastersim thì tăng phase theo vòng và lấy segs × SEG_TIME cộng random × NIGHTMARE_SEG_VARIATION × SEG_TIME. lockedphase giữ pha; client ở cuối pha chờ sync thay vì tự tăng.

- Khi _phasedirty, world nhận nightmarephasechanged và âm thanh thế giới được cập nhật. Mỗi tick phát nightmareclocktick gồm phase, tỉ lệ tiến độ trong pha và elapsedtime; LongUpdate trỏ cùng OnUpdate.

- Save giữ lengths, tên phase, total/remaining time và lockedphase. Load phục hồi độ dài, chọn phase hợp lệ hoặc pha đầu có segment dương, clamp remaining tới total và đổi tên lockedphase sang chỉ số.

### Nguồn đối chiếu

- [components/nightmareclock.lua:225–315](../source/scripts/components/nightmareclock.lua).

### Phạm vi còn hở

- Đây là nhánh đồng hồ nightmare. Spawner Ruins, cave weather, map retrofit và đầy đủ sinh thái hang chưa được giải thích bởi riêng đồng hồ.

- Tác động nightmarephasechanged lên từng quái/cấu trúc cần trace consumer và quyền sync giữa shard khi chạy.

<!-- deep-review-world-ecology:end -->

- [components/caveweather.lua:1](../source/scripts/components/caveweather.lua) — text-lua

- [components/nightmareclock.lua:1](../source/scripts/components/nightmareclock.lua) — text-lua

- [components/retrofitcavemap_anr.lua:1](../source/scripts/components/retrofitcavemap_anr.lua) — text-lua

- [components/sinkholespawner.lua:1](../source/scripts/components/sinkholespawner.lua) — text-lua

- [map/caves_retrofit_land.lua:1](../source/scripts/map/caves_retrofit_land.lua) — text-lua

- [prefabs/cave.lua:1](../source/scripts/prefabs/cave.lua) — text-lua

- [prefabs/caveacidrain.lua:1](../source/scripts/prefabs/caveacidrain.lua) — text-lua

- [prefabs/cavein_boulder.lua:1](../source/scripts/prefabs/cavein_boulder.lua) — text-lua

- [prefabs/cavelight.lua:1](../source/scripts/prefabs/cavelight.lua) — text-lua

- [prefabs/cavelightmoon.lua:1](../source/scripts/prefabs/cavelightmoon.lua) — text-lua

- [prefabs/caverain.lua:1](../source/scripts/prefabs/caverain.lua) — text-lua

- [prefabs/cave_banana_tree.lua:1](../source/scripts/prefabs/cave_banana_tree.lua) — text-lua

- [prefabs/cave_entrance.lua:1](../source/scripts/prefabs/cave_entrance.lua) — text-lua

- [prefabs/cave_exit.lua:1](../source/scripts/prefabs/cave_exit.lua) — text-lua

- [prefabs/cave_fern.lua:1](../source/scripts/prefabs/cave_fern.lua) — text-lua

- [prefabs/cave_fern_withered.lua:1](../source/scripts/prefabs/cave_fern_withered.lua) — text-lua

- [prefabs/cave_hole.lua:1](../source/scripts/prefabs/cave_hole.lua) — text-lua

- [prefabs/cave_network.lua:1](../source/scripts/prefabs/cave_network.lua) — text-lua

- [prefabs/cave_vents.lua:1](../source/scripts/prefabs/cave_vents.lua) — text-lua

- [prefabs/cave_vent_ground_fx.lua:1](../source/scripts/prefabs/cave_vent_ground_fx.lua) — text-lua

- [prefabs/cave_vent_mite.lua:1](../source/scripts/prefabs/cave_vent_mite.lua) — text-lua

- [prefabs/cave_vent_mite_spawner.lua:1](../source/scripts/prefabs/cave_vent_mite_spawner.lua) — text-lua

- [prefabs/ruinsnightmare_horn_attack.lua:1](../source/scripts/prefabs/ruinsnightmare_horn_attack.lua) — text-lua

- [prefabs/ruinsrelic.lua:1](../source/scripts/prefabs/ruinsrelic.lua) — text-lua

- [prefabs/ruinsrespawner.lua:1](../source/scripts/prefabs/ruinsrespawner.lua) — text-lua

- [prefabs/ruins_bat.lua:1](../source/scripts/prefabs/ruins_bat.lua) — text-lua

- [prefabs/ruins_cavein_obstacle.lua:1](../source/scripts/prefabs/ruins_cavein_obstacle.lua) — text-lua

- [prefabs/ruins_shadeling.lua:1](../source/scripts/prefabs/ruins_shadeling.lua) — text-lua

- [map/levels/caves.lua:1](../source/scripts/map/levels/caves.lua) — text-lua

- [map/static_layouts/cave_art_test_start.lua:1](../source/scripts/map/static_layouts/cave_art_test_start.lua) — text-lua

- [map/static_layouts/cave_base_1.lua:1](../source/scripts/map/static_layouts/cave_base_1.lua) — text-lua

- [map/static_layouts/cave_base_2.lua:1](../source/scripts/map/static_layouts/cave_base_2.lua) — text-lua

- [map/static_layouts/cave_base_3.lua:1](../source/scripts/map/static_layouts/cave_base_3.lua) — text-lua

- [map/static_layouts/cave_entrance.lua:1](../source/scripts/map/static_layouts/cave_entrance.lua) — text-lua

- [map/static_layouts/cave_exit.lua:1](../source/scripts/map/static_layouts/cave_exit.lua) — text-lua

- [map/static_layouts/cave_start.lua:1](../source/scripts/map/static_layouts/cave_start.lua) — text-lua

- [map/static_layouts/cave_test_start.lua:1](../source/scripts/map/static_layouts/cave_test_start.lua) — text-lua

- [map/static_layouts/torch_rabbit_cave.lua:1](../source/scripts/map/static_layouts/torch_rabbit_cave.lua) — text-lua

- [map/tasks/caves.lua:1](../source/scripts/map/tasks/caves.lua) — text-lua

- [map/tasksets/caves.lua:1](../source/scripts/map/tasksets/caves.lua) — text-lua

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
