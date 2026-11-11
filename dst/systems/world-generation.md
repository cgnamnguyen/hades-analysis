# Sinh thế giới, seed và layout

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm sinh thế giới, seed và layout theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

Luồng GenerateNew ghép level/task/mod/set-piece, thử sinh map có giới hạn rồi đóng gói dữ liệu lưu.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- GenerateNew đòi level_data và level.location hợp lệ, chọn PrefabSwaps theo location/overrides, gọi ChooseTasks, AddSetPeices và ChooseSetPieces trước forest_map.Generate. Debug có thể thay tasklist bằng oneofeverything.

- ChooseTasks chạy TaskSetPreInit theo tên và Any, chép task_set_data vào level, rồi chạy LevelPreInit theo ID và Any. Nó enqueue task bắt buộc, ApplyModsToTasks và bổ sung optionaltasks trước GetOverridesForTasks; kết quả giữ trong chosen_tasks.

- Generate lặp tới khi có savedata hoặc hết 5 lần. Khi nil, gọi WorldSim.RetryWorldgen, thu gom rác và ResetAll. Khi đạt, nó ghi location/topology, mod records, seed, build, level_id, session_identifier và saveversion; CheckMapSaveData rồi AddWorldEntities trước DataDumper.

### Nguồn đối chiếu

- [worldgen_main.lua:403–527](../source/scripts/worldgen_main.lua).

- [map/level.lua:89–150](../source/scripts/map/level.lua).

### Phạm vi còn hở

- Chưa có toàn bộ kết quả duy nhất của 451 file worldgen/layout. Hàm native WorldSim và forest_map graph placement cần được trace để khẳng định khả năng đi lại, resource guarantees hoặc cùng seed ra cùng map.

- Optional task, factory/layout tùy mod và mọi preset chưa được thực thi. Danh mục gọi hàm chưa được chuyển thành số biome hoặc prefab thực sinh.

<!-- deep-review-world-ecology:end -->

- [custompresets.lua:1](../source/scripts/custompresets.lua) — text-lua

- [noisetilefunctions.lua:1](../source/scripts/noisetilefunctions.lua) — text-lua

- [worldgen_main.lua:1](../source/scripts/worldgen_main.lua) — text-lua

- [worldsettingsutil.lua:1](../source/scripts/worldsettingsutil.lua) — text-lua

- [worldsettings_overrides.lua:1](../source/scripts/worldsettings_overrides.lua) — text-lua

- [components/worldsettings.lua:1](../source/scripts/components/worldsettings.lua) — text-lua

- [components/worldsettingstimer.lua:1](../source/scripts/components/worldsettingstimer.lua) — text-lua

- [map/archive_worldgen.lua:1](../source/scripts/map/archive_worldgen.lua) — text-lua

- [map/blockersets.lua:1](../source/scripts/map/blockersets.lua) — text-lua

- [map/boons.lua:1](../source/scripts/map/boons.lua) — text-lua

- [map/bunches.lua:1](../source/scripts/map/bunches.lua) — text-lua

- [map/bunch_spawner.lua:1](../source/scripts/map/bunch_spawner.lua) — text-lua

- [map/caves_retrofit_land.lua:1](../source/scripts/map/caves_retrofit_land.lua) — text-lua

- [map/customise.lua:1](../source/scripts/map/customise.lua) — text-lua

- [map/customize.lua:1](../source/scripts/map/customize.lua) — text-lua

- [map/extents.lua:1](../source/scripts/map/extents.lua) — text-lua

- [map/forest_map.lua:1](../source/scripts/map/forest_map.lua) — text-lua

- [map/graphedge.lua:1](../source/scripts/map/graphedge.lua) — text-lua

- [map/graphnode.lua:1](../source/scripts/map/graphnode.lua) — text-lua

- [map/layout.lua:1](../source/scripts/map/layout.lua) — text-lua

- [map/layouts.lua:1](../source/scripts/map/layouts.lua) — text-lua

- [map/level.lua:1](../source/scripts/map/level.lua) — text-lua

- [map/levels.lua:1](../source/scripts/map/levels.lua) — text-lua

- [map/locations.lua:1](../source/scripts/map/locations.lua) — text-lua

- [map/lockandkey.lua:1](../source/scripts/map/lockandkey.lua) — text-lua

- [map/maptags.lua:1](../source/scripts/map/maptags.lua) — text-lua

- [map/maze_layouts.lua:1](../source/scripts/map/maze_layouts.lua) — text-lua

- [map/monkeyisland_worldgen.lua:1](../source/scripts/map/monkeyisland_worldgen.lua) — text-lua

- [map/network.lua:1](../source/scripts/map/network.lua) — text-lua

- [map/object_layout.lua:1](../source/scripts/map/object_layout.lua) — text-lua

- [map/ocean_gen.lua:1](../source/scripts/map/ocean_gen.lua) — text-lua

- [map/ocean_gen_config.lua:1](../source/scripts/map/ocean_gen_config.lua) — text-lua

- [map/ocean_retrofit_island.lua:1](../source/scripts/map/ocean_retrofit_island.lua) — text-lua

- [map/placement.lua:1](../source/scripts/map/placement.lua) — text-lua

- [map/pointsofinterest.lua:1](../source/scripts/map/pointsofinterest.lua) — text-lua

- [map/protected_resources.lua:1](../source/scripts/map/protected_resources.lua) — text-lua

- [map/resource_substitution.lua:1](../source/scripts/map/resource_substitution.lua) — text-lua

- [map/retrofit_savedata.lua:1](../source/scripts/map/retrofit_savedata.lua) — text-lua

- [map/rooms.lua:1](../source/scripts/map/rooms.lua) — text-lua

- [map/room_functions.lua:1](../source/scripts/map/room_functions.lua) — text-lua

- [map/settings.lua:1](../source/scripts/map/settings.lua) — text-lua

- [map/stack.lua:1](../source/scripts/map/stack.lua) — text-lua

- [map/startlocations.lua:1](../source/scripts/map/startlocations.lua) — text-lua

- [map/static_layout.lua:1](../source/scripts/map/static_layout.lua) — text-lua

- [map/storygen.lua:1](../source/scripts/map/storygen.lua) — text-lua

- [map/task.lua:1](../source/scripts/map/task.lua) — text-lua

- [map/tasks.lua:1](../source/scripts/map/tasks.lua) — text-lua

- [map/tasksets.lua:1](../source/scripts/map/tasksets.lua) — text-lua

- [map/terrain.lua:1](../source/scripts/map/terrain.lua) — text-lua

- [map/traps.lua:1](../source/scripts/map/traps.lua) — text-lua

- [map/waterlog_worldgen.lua:1](../source/scripts/map/waterlog_worldgen.lua) — text-lua

- [map/levels/caves.lua:1](../source/scripts/map/levels/caves.lua) — text-lua

- [map/levels/forest.lua:1](../source/scripts/map/levels/forest.lua) — text-lua

- [map/levels/lavaarena.lua:1](../source/scripts/map/levels/lavaarena.lua) — text-lua

- [map/levels/quagmire.lua:1](../source/scripts/map/levels/quagmire.lua) — text-lua

- [map/rooms/test.lua:1](../source/scripts/map/rooms/test.lua) — text-lua

- [map/static_layouts/abandonedboat.lua:1](../source/scripts/map/static_layouts/abandonedboat.lua) — text-lua

- [map/static_layouts/abandonedwarf.lua:1](../source/scripts/map/static_layouts/abandonedwarf.lua) — text-lua

- [map/static_layouts/abandonedwarf2.lua:1](../source/scripts/map/static_layouts/abandonedwarf2.lua) — text-lua

- [map/static_layouts/abandonedwarf3.lua:1](../source/scripts/map/static_layouts/abandonedwarf3.lua) — text-lua

- [map/static_layouts/adventure_portal_layout.lua:1](../source/scripts/map/static_layouts/adventure_portal_layout.lua) — text-lua

- [map/static_layouts/altar.lua:1](../source/scripts/map/static_layouts/altar.lua) — text-lua

- [map/static_layouts/archivedoor.lua:1](../source/scripts/map/static_layouts/archivedoor.lua) — text-lua

- [map/static_layouts/balatro.lua:1](../source/scripts/map/static_layouts/balatro.lua) — text-lua

- [map/static_layouts/bargain_start.lua:1](../source/scripts/map/static_layouts/bargain_start.lua) — text-lua

- [map/static_layouts/barracks.lua:1](../source/scripts/map/static_layouts/barracks.lua) — text-lua

- [map/static_layouts/barracks_two.lua:1](../source/scripts/map/static_layouts/barracks_two.lua) — text-lua

- [map/static_layouts/bathbombedhotspring.lua:1](../source/scripts/map/static_layouts/bathbombedhotspring.lua) — text-lua

- [map/static_layouts/beefalo_farm.lua:1](../source/scripts/map/static_layouts/beefalo_farm.lua) — text-lua

- [map/static_layouts/blue_mushy_entrance.lua:1](../source/scripts/map/static_layouts/blue_mushy_entrance.lua) — text-lua

- [map/static_layouts/brinepool1.lua:1](../source/scripts/map/static_layouts/brinepool1.lua) — text-lua

- [map/static_layouts/brinepool2.lua:1](../source/scripts/map/static_layouts/brinepool2.lua) — text-lua

- [map/static_layouts/brinepool3.lua:1](../source/scripts/map/static_layouts/brinepool3.lua) — text-lua

- [map/static_layouts/brokenaltar.lua:1](../source/scripts/map/static_layouts/brokenaltar.lua) — text-lua

- [map/static_layouts/bullkelpfarmmedium.lua:1](../source/scripts/map/static_layouts/bullkelpfarmmedium.lua) — text-lua

- [map/static_layouts/bullkelpfarmsmall.lua:1](../source/scripts/map/static_layouts/bullkelpfarmsmall.lua) — text-lua

- [map/static_layouts/cave_art_test_start.lua:1](../source/scripts/map/static_layouts/cave_art_test_start.lua) — text-lua

- [map/static_layouts/cave_base_1.lua:1](../source/scripts/map/static_layouts/cave_base_1.lua) — text-lua

- [map/static_layouts/cave_base_2.lua:1](../source/scripts/map/static_layouts/cave_base_2.lua) — text-lua

- [map/static_layouts/cave_base_3.lua:1](../source/scripts/map/static_layouts/cave_base_3.lua) — text-lua

- [map/static_layouts/cave_entrance.lua:1](../source/scripts/map/static_layouts/cave_entrance.lua) — text-lua

- [map/static_layouts/cave_exit.lua:1](../source/scripts/map/static_layouts/cave_exit.lua) — text-lua

- [map/static_layouts/cave_start.lua:1](../source/scripts/map/static_layouts/cave_start.lua) — text-lua

- [map/static_layouts/cave_test_start.lua:1](../source/scripts/map/static_layouts/cave_test_start.lua) — text-lua

- [map/static_layouts/charlie_1.lua:1](../source/scripts/map/static_layouts/charlie_1.lua) — text-lua

- [map/static_layouts/charlie_2.lua:1](../source/scripts/map/static_layouts/charlie_2.lua) — text-lua

- [map/static_layouts/chessy_1.lua:1](../source/scripts/map/static_layouts/chessy_1.lua) — text-lua

- [map/static_layouts/chessy_2.lua:1](../source/scripts/map/static_layouts/chessy_2.lua) — text-lua

- [map/static_layouts/chessy_3.lua:1](../source/scripts/map/static_layouts/chessy_3.lua) — text-lua

- [map/static_layouts/chessy_4.lua:1](../source/scripts/map/static_layouts/chessy_4.lua) — text-lua

- [map/static_layouts/chessy_5.lua:1](../source/scripts/map/static_layouts/chessy_5.lua) — text-lua

- [map/static_layouts/chessy_6.lua:1](../source/scripts/map/static_layouts/chessy_6.lua) — text-lua

- [map/static_layouts/chess_blocker.lua:1](../source/scripts/map/static_layouts/chess_blocker.lua) — text-lua

- [map/static_layouts/chess_blocker_b.lua:1](../source/scripts/map/static_layouts/chess_blocker_b.lua) — text-lua

- [map/static_layouts/chess_blocker_c.lua:1](../source/scripts/map/static_layouts/chess_blocker_c.lua) — text-lua

- [map/static_layouts/chess_spot.lua:1](../source/scripts/map/static_layouts/chess_spot.lua) — text-lua

- [map/static_layouts/chess_spot2.lua:1](../source/scripts/map/static_layouts/chess_spot2.lua) — text-lua

- [map/static_layouts/chess_spot3.lua:1](../source/scripts/map/static_layouts/chess_spot3.lua) — text-lua

- [map/static_layouts/crabking.lua:1](../source/scripts/map/static_layouts/crabking.lua) — text-lua

- [map/static_layouts/deciduous_pond.lua:1](../source/scripts/map/static_layouts/deciduous_pond.lua) — text-lua

- [map/static_layouts/default_pigking.lua:1](../source/scripts/map/static_layouts/default_pigking.lua) — text-lua

- [map/static_layouts/default_plus_start.lua:1](../source/scripts/map/static_layouts/default_plus_start.lua) — text-lua

- [map/static_layouts/default_start.lua:1](../source/scripts/map/static_layouts/default_start.lua) — text-lua

- [map/static_layouts/dev_graveyard.lua:1](../source/scripts/map/static_layouts/dev_graveyard.lua) — text-lua

- [map/static_layouts/dragonfly_arena.lua:1](../source/scripts/map/static_layouts/dragonfly_arena.lua) — text-lua

- [map/static_layouts/evergreensinkhole.lua:1](../source/scripts/map/static_layouts/evergreensinkhole.lua) — text-lua

- [map/static_layouts/eyebone_grave.lua:1](../source/scripts/map/static_layouts/eyebone_grave.lua) — text-lua

- [map/static_layouts/fissures_1.lua:1](../source/scripts/map/static_layouts/fissures_1.lua) — text-lua

- [map/static_layouts/grasssinkhole.lua:1](../source/scripts/map/static_layouts/grasssinkhole.lua) — text-lua

- [map/static_layouts/grass_spots.lua:1](../source/scripts/map/static_layouts/grass_spots.lua) — text-lua

- [map/static_layouts/grotto.lua:1](../source/scripts/map/static_layouts/grotto.lua) — text-lua

- [map/static_layouts/grotto_pool_large.lua:1](../source/scripts/map/static_layouts/grotto_pool_large.lua) — text-lua

- [map/static_layouts/grotto_pool_small.lua:1](../source/scripts/map/static_layouts/grotto_pool_small.lua) — text-lua

- [map/static_layouts/hermitcrab_01.lua:1](../source/scripts/map/static_layouts/hermitcrab_01.lua) — text-lua

- [map/static_layouts/hound_rocks.lua:1](../source/scripts/map/static_layouts/hound_rocks.lua) — text-lua

- [map/static_layouts/insane_eyebone.lua:1](../source/scripts/map/static_layouts/insane_eyebone.lua) — text-lua

- [map/static_layouts/insane_flint.lua:1](../source/scripts/map/static_layouts/insane_flint.lua) — text-lua

- [map/static_layouts/insane_pig.lua:1](../source/scripts/map/static_layouts/insane_pig.lua) — text-lua

- [map/static_layouts/insane_rabbit_king.lua:1](../source/scripts/map/static_layouts/insane_rabbit_king.lua) — text-lua

- [map/static_layouts/insane_wormhole.lua:1](../source/scripts/map/static_layouts/insane_wormhole.lua) — text-lua

- [map/static_layouts/insanity_wormhole_1.lua:1](../source/scripts/map/static_layouts/insanity_wormhole_1.lua) — text-lua

- [map/static_layouts/junk_yard1.lua:1](../source/scripts/map/static_layouts/junk_yard1.lua) — text-lua

- [map/static_layouts/leif_forest.lua:1](../source/scripts/map/static_layouts/leif_forest.lua) — text-lua

- [map/static_layouts/livingtree.lua:1](../source/scripts/map/static_layouts/livingtree.lua) — text-lua

- [map/static_layouts/lures_and_worms.lua:1](../source/scripts/map/static_layouts/lures_and_worms.lua) — text-lua

- [map/static_layouts/mactusk_city.lua:1](../source/scripts/map/static_layouts/mactusk_city.lua) — text-lua

- [map/static_layouts/mactusk_village.lua:1](../source/scripts/map/static_layouts/mactusk_village.lua) — text-lua

- [map/static_layouts/maxwellhome.lua:1](../source/scripts/map/static_layouts/maxwellhome.lua) — text-lua

- [map/static_layouts/maxwell_1.lua:1](../source/scripts/map/static_layouts/maxwell_1.lua) — text-lua

- [map/static_layouts/maxwell_2.lua:1](../source/scripts/map/static_layouts/maxwell_2.lua) — text-lua

- [map/static_layouts/maxwell_3.lua:1](../source/scripts/map/static_layouts/maxwell_3.lua) — text-lua

- [map/static_layouts/maxwell_4.lua:1](../source/scripts/map/static_layouts/maxwell_4.lua) — text-lua

- [map/static_layouts/maxwell_5.lua:1](../source/scripts/map/static_layouts/maxwell_5.lua) — text-lua

- [map/static_layouts/maxwell_6.lua:1](../source/scripts/map/static_layouts/maxwell_6.lua) — text-lua

- [map/static_layouts/maxwell_7.lua:1](../source/scripts/map/static_layouts/maxwell_7.lua) — text-lua

- [map/static_layouts/maxwell_merm_shrine.lua:1](../source/scripts/map/static_layouts/maxwell_merm_shrine.lua) — text-lua

- [map/static_layouts/maxwell_pig_shrine.lua:1](../source/scripts/map/static_layouts/maxwell_pig_shrine.lua) — text-lua

- [map/static_layouts/MAX_puzzle1.lua:1](../source/scripts/map/static_layouts/MAX_puzzle1.lua) — text-lua

- [map/static_layouts/MAX_puzzle2.lua:1](../source/scripts/map/static_layouts/MAX_puzzle2.lua) — text-lua

- [map/static_layouts/MAX_puzzle3.lua:1](../source/scripts/map/static_layouts/MAX_puzzle3.lua) — text-lua

- [map/static_layouts/military_entrance.lua:1](../source/scripts/map/static_layouts/military_entrance.lua) — text-lua

- [map/static_layouts/monkeyisland_01.lua:1](../source/scripts/map/static_layouts/monkeyisland_01.lua) — text-lua

- [map/static_layouts/monkeyisland_01_small.lua:1](../source/scripts/map/static_layouts/monkeyisland_01_small.lua) — text-lua

- [map/static_layouts/monkeyisland_retrofitlarge_01.lua:1](../source/scripts/map/static_layouts/monkeyisland_retrofitlarge_01.lua) — text-lua

- [map/static_layouts/monkeyisland_retrofitlarge_02.lua:1](../source/scripts/map/static_layouts/monkeyisland_retrofitlarge_02.lua) — text-lua

- [map/static_layouts/monkeyisland_retrofitsmall_01.lua:1](../source/scripts/map/static_layouts/monkeyisland_retrofitsmall_01.lua) — text-lua

- [map/static_layouts/monkeyisland_retrofitsmall_02.lua:1](../source/scripts/map/static_layouts/monkeyisland_retrofitsmall_02.lua) — text-lua

- [map/static_layouts/moonaltarrockglass.lua:1](../source/scripts/map/static_layouts/moonaltarrockglass.lua) — text-lua

- [map/static_layouts/moonaltarrockidol.lua:1](../source/scripts/map/static_layouts/moonaltarrockidol.lua) — text-lua

- [map/static_layouts/moonaltarrockseed.lua:1](../source/scripts/map/static_layouts/moonaltarrockseed.lua) — text-lua

- [map/static_layouts/moonbaseone.lua:1](../source/scripts/map/static_layouts/moonbaseone.lua) — text-lua

- [map/static_layouts/moontreehiddenaxe.lua:1](../source/scripts/map/static_layouts/moontreehiddenaxe.lua) — text-lua

- [map/static_layouts/moontrees_1.lua:1](../source/scripts/map/static_layouts/moontrees_1.lua) — text-lua

- [map/static_layouts/moontrees_2.lua:1](../source/scripts/map/static_layouts/moontrees_2.lua) — text-lua

- [map/static_layouts/moose_nest.lua:1](../source/scripts/map/static_layouts/moose_nest.lua) — text-lua

- [map/static_layouts/mudlights.lua:1](../source/scripts/map/static_layouts/mudlights.lua) — text-lua

- [map/static_layouts/nightmare.lua:1](../source/scripts/map/static_layouts/nightmare.lua) — text-lua

- [map/static_layouts/nightmare_begin_blocker.lua:1](../source/scripts/map/static_layouts/nightmare_begin_blocker.lua) — text-lua

- [map/static_layouts/nightmare_start_easy.lua:1](../source/scripts/map/static_layouts/nightmare_start_easy.lua) — text-lua

- [map/static_layouts/oasis.lua:1](../source/scripts/map/static_layouts/oasis.lua) — text-lua

- [map/static_layouts/oceanmonument.lua:1](../source/scripts/map/static_layouts/oceanmonument.lua) — text-lua

- [map/static_layouts/oceanwhirlbigportal.lua:1](../source/scripts/map/static_layouts/oceanwhirlbigportal.lua) — text-lua

- [map/static_layouts/pigguards.lua:1](../source/scripts/map/static_layouts/pigguards.lua) — text-lua

- [map/static_layouts/pigguards_b.lua:1](../source/scripts/map/static_layouts/pigguards_b.lua) — text-lua

- [map/static_layouts/pigguards_easy.lua:1](../source/scripts/map/static_layouts/pigguards_easy.lua) — text-lua

- [map/static_layouts/pigguard_berries.lua:1](../source/scripts/map/static_layouts/pigguard_berries.lua) — text-lua

- [map/static_layouts/pigguard_berries_easy.lua:1](../source/scripts/map/static_layouts/pigguard_berries_easy.lua) — text-lua

- [map/static_layouts/pigguard_grass.lua:1](../source/scripts/map/static_layouts/pigguard_grass.lua) — text-lua

- [map/static_layouts/pigguard_grass_easy.lua:1](../source/scripts/map/static_layouts/pigguard_grass_easy.lua) — text-lua

- [map/static_layouts/pigtown.lua:1](../source/scripts/map/static_layouts/pigtown.lua) — text-lua

- [map/static_layouts/pondsinkhole.lua:1](../source/scripts/map/static_layouts/pondsinkhole.lua) — text-lua

- [map/static_layouts/presummer_start.lua:1](../source/scripts/map/static_layouts/presummer_start.lua) — text-lua

- [map/static_layouts/pumpkin_carving.lua:1](../source/scripts/map/static_layouts/pumpkin_carving.lua) — text-lua

- [map/static_layouts/rabbitcity.lua:1](../source/scripts/map/static_layouts/rabbitcity.lua) — text-lua

- [map/static_layouts/rabbithermit.lua:1](../source/scripts/map/static_layouts/rabbithermit.lua) — text-lua

- [map/static_layouts/rabbittown.lua:1](../source/scripts/map/static_layouts/rabbittown.lua) — text-lua

- [map/static_layouts/resurrectionstone.lua:1](../source/scripts/map/static_layouts/resurrectionstone.lua) — text-lua

- [map/static_layouts/resurrectionstonelit.lua:1](../source/scripts/map/static_layouts/resurrectionstonelit.lua) — text-lua

- [map/static_layouts/resurrectionstone_winter.lua:1](../source/scripts/map/static_layouts/resurrectionstone_winter.lua) — text-lua

- [map/static_layouts/retrofit_brinepool_tiny.lua:1](../source/scripts/map/static_layouts/retrofit_brinepool_tiny.lua) — text-lua

- [map/static_layouts/retrofit_fumarole.lua:1](../source/scripts/map/static_layouts/retrofit_fumarole.lua) — text-lua

- [map/static_layouts/retrofit_moonisland_large.lua:1](../source/scripts/map/static_layouts/retrofit_moonisland_large.lua) — text-lua

- [map/static_layouts/retrofit_moonisland_medium.lua:1](../source/scripts/map/static_layouts/retrofit_moonisland_medium.lua) — text-lua

- [map/static_layouts/retrofit_moonisland_small.lua:1](../source/scripts/map/static_layouts/retrofit_moonisland_small.lua) — text-lua

- [map/static_layouts/retrofit_moonmush.lua:1](../source/scripts/map/static_layouts/retrofit_moonmush.lua) — text-lua

- [map/static_layouts/ruined_base.lua:1](../source/scripts/map/static_layouts/ruined_base.lua) — text-lua

- [map/static_layouts/ruins_camp.lua:1](../source/scripts/map/static_layouts/ruins_camp.lua) — text-lua

- [map/static_layouts/ruins_start.lua:1](../source/scripts/map/static_layouts/ruins_start.lua) — text-lua

- [map/static_layouts/ruins_start2.lua:1](../source/scripts/map/static_layouts/ruins_start2.lua) — text-lua

- [map/static_layouts/sacred_barracks.lua:1](../source/scripts/map/static_layouts/sacred_barracks.lua) — text-lua

- [map/static_layouts/sanity_wormhole_1.lua:1](../source/scripts/map/static_layouts/sanity_wormhole_1.lua) — text-lua

- [map/static_layouts/sanity_wormhole_oneshot.lua:1](../source/scripts/map/static_layouts/sanity_wormhole_oneshot.lua) — text-lua

- [map/static_layouts/sculptures_1.lua:1](../source/scripts/map/static_layouts/sculptures_1.lua) — text-lua

- [map/static_layouts/sculptures_2.lua:1](../source/scripts/map/static_layouts/sculptures_2.lua) — text-lua

- [map/static_layouts/sculptures_3.lua:1](../source/scripts/map/static_layouts/sculptures_3.lua) — text-lua

- [map/static_layouts/sculptures_4.lua:1](../source/scripts/map/static_layouts/sculptures_4.lua) — text-lua

- [map/static_layouts/sculptures_5.lua:1](../source/scripts/map/static_layouts/sculptures_5.lua) — text-lua

- [map/static_layouts/simple_base.lua:1](../source/scripts/map/static_layouts/simple_base.lua) — text-lua

- [map/static_layouts/skeleton_batfight.lua:1](../source/scripts/map/static_layouts/skeleton_batfight.lua) — text-lua

- [map/static_layouts/skeleton_camper.lua:1](../source/scripts/map/static_layouts/skeleton_camper.lua) — text-lua

- [map/static_layouts/skeleton_construction.lua:1](../source/scripts/map/static_layouts/skeleton_construction.lua) — text-lua

- [map/static_layouts/skeleton_dapper.lua:1](../source/scripts/map/static_layouts/skeleton_dapper.lua) — text-lua

- [map/static_layouts/skeleton_entomologist.lua:1](../source/scripts/map/static_layouts/skeleton_entomologist.lua) — text-lua

- [map/static_layouts/skeleton_farmer.lua:1](../source/scripts/map/static_layouts/skeleton_farmer.lua) — text-lua

- [map/static_layouts/skeleton_fisher.lua:1](../source/scripts/map/static_layouts/skeleton_fisher.lua) — text-lua

- [map/static_layouts/skeleton_graverobber.lua:1](../source/scripts/map/static_layouts/skeleton_graverobber.lua) — text-lua

- [map/static_layouts/skeleton_hunter.lua:1](../source/scripts/map/static_layouts/skeleton_hunter.lua) — text-lua

- [map/static_layouts/skeleton_hunter_swamp.lua:1](../source/scripts/map/static_layouts/skeleton_hunter_swamp.lua) — text-lua

- [map/static_layouts/skeleton_lightfarmer.lua:1](../source/scripts/map/static_layouts/skeleton_lightfarmer.lua) — text-lua

- [map/static_layouts/skeleton_lumberjack.lua:1](../source/scripts/map/static_layouts/skeleton_lumberjack.lua) — text-lua

- [map/static_layouts/skeleton_miner.lua:1](../source/scripts/map/static_layouts/skeleton_miner.lua) — text-lua

- [map/static_layouts/skeleton_miner_dirt.lua:1](../source/scripts/map/static_layouts/skeleton_miner_dirt.lua) — text-lua

- [map/static_layouts/skeleton_mushjack.lua:1](../source/scripts/map/static_layouts/skeleton_mushjack.lua) — text-lua

- [map/static_layouts/skeleton_night_hunter.lua:1](../source/scripts/map/static_layouts/skeleton_night_hunter.lua) — text-lua

- [map/static_layouts/skeleton_notplayer.lua:1](../source/scripts/map/static_layouts/skeleton_notplayer.lua) — text-lua

- [map/static_layouts/skeleton_rain_coat.lua:1](../source/scripts/map/static_layouts/skeleton_rain_coat.lua) — text-lua

- [map/static_layouts/skeleton_researchlab1.lua:1](../source/scripts/map/static_layouts/skeleton_researchlab1.lua) — text-lua

- [map/static_layouts/skeleton_researchlab2.lua:1](../source/scripts/map/static_layouts/skeleton_researchlab2.lua) — text-lua

- [map/static_layouts/skeleton_researchlab3.lua:1](../source/scripts/map/static_layouts/skeleton_researchlab3.lua) — text-lua

- [map/static_layouts/skeleton_summer.lua:1](../source/scripts/map/static_layouts/skeleton_summer.lua) — text-lua

- [map/static_layouts/skeleton_trapper.lua:1](../source/scripts/map/static_layouts/skeleton_trapper.lua) — text-lua

- [map/static_layouts/skeleton_warrior.lua:1](../source/scripts/map/static_layouts/skeleton_warrior.lua) — text-lua

- [map/static_layouts/skeleton_winter_easy.lua:1](../source/scripts/map/static_layouts/skeleton_winter_easy.lua) — text-lua

- [map/static_layouts/skeleton_winter_hard.lua:1](../source/scripts/map/static_layouts/skeleton_winter_hard.lua) — text-lua

- [map/static_layouts/skeleton_winter_medium.lua:1](../source/scripts/map/static_layouts/skeleton_winter_medium.lua) — text-lua

- [map/static_layouts/skeleton_wizard_fire.lua:1](../source/scripts/map/static_layouts/skeleton_wizard_fire.lua) — text-lua

- [map/static_layouts/skeleton_wizard_ice.lua:1](../source/scripts/map/static_layouts/skeleton_wizard_ice.lua) — text-lua

- [map/static_layouts/small_boon.lua:1](../source/scripts/map/static_layouts/small_boon.lua) — text-lua

- [map/static_layouts/spider_blocker.lua:1](../source/scripts/map/static_layouts/spider_blocker.lua) — text-lua

- [map/static_layouts/spider_blocker_b.lua:1](../source/scripts/map/static_layouts/spider_blocker_b.lua) — text-lua

- [map/static_layouts/spider_blocker_c.lua:1](../source/scripts/map/static_layouts/spider_blocker_c.lua) — text-lua

- [map/static_layouts/spider_blocker_easy.lua:1](../source/scripts/map/static_layouts/spider_blocker_easy.lua) — text-lua

- [map/static_layouts/spider_blocker_easy_b.lua:1](../source/scripts/map/static_layouts/spider_blocker_easy_b.lua) — text-lua

- [map/static_layouts/spider_forest.lua:1](../source/scripts/map/static_layouts/spider_forest.lua) — text-lua

- [map/static_layouts/spiral.lua:1](../source/scripts/map/static_layouts/spiral.lua) — text-lua

- [map/static_layouts/stagehandgarden.lua:1](../source/scripts/map/static_layouts/stagehandgarden.lua) — text-lua

- [map/static_layouts/symmetry_test.lua:1](../source/scripts/map/static_layouts/symmetry_test.lua) — text-lua

- [map/static_layouts/symmetry_test2.lua:1](../source/scripts/map/static_layouts/symmetry_test2.lua) — text-lua

- [map/static_layouts/tallbird_blocker.lua:1](../source/scripts/map/static_layouts/tallbird_blocker.lua) — text-lua

- [map/static_layouts/tallbird_blocker_b.lua:1](../source/scripts/map/static_layouts/tallbird_blocker_b.lua) — text-lua

- [map/static_layouts/tallbird_blocker_small.lua:1](../source/scripts/map/static_layouts/tallbird_blocker_small.lua) — text-lua

- [map/static_layouts/tallbird_rocks.lua:1](../source/scripts/map/static_layouts/tallbird_rocks.lua) — text-lua

- [map/static_layouts/teleportato_base_layout.lua:1](../source/scripts/map/static_layouts/teleportato_base_layout.lua) — text-lua

- [map/static_layouts/teleportato_base_layout_adv.lua:1](../source/scripts/map/static_layouts/teleportato_base_layout_adv.lua) — text-lua

- [map/static_layouts/teleportato_box_layout.lua:1](../source/scripts/map/static_layouts/teleportato_box_layout.lua) — text-lua

- [map/static_layouts/teleportato_crank_layout.lua:1](../source/scripts/map/static_layouts/teleportato_crank_layout.lua) — text-lua

- [map/static_layouts/teleportato_potato_layout.lua:1](../source/scripts/map/static_layouts/teleportato_potato_layout.lua) — text-lua

- [map/static_layouts/tentacles_blocker.lua:1](../source/scripts/map/static_layouts/tentacles_blocker.lua) — text-lua

- [map/static_layouts/tentacles_blocker_small.lua:1](../source/scripts/map/static_layouts/tentacles_blocker_small.lua) — text-lua

- [map/static_layouts/tentacle_pillar.lua:1](../source/scripts/map/static_layouts/tentacle_pillar.lua) — text-lua

- [map/static_layouts/tentacle_pillar_atrium.lua:1](../source/scripts/map/static_layouts/tentacle_pillar_atrium.lua) — text-lua

- [map/static_layouts/tentacle_pillar_atrium_outer.lua:1](../source/scripts/map/static_layouts/tentacle_pillar_atrium_outer.lua) — text-lua

- [map/static_layouts/tenticle_reeds.lua:1](../source/scripts/map/static_layouts/tenticle_reeds.lua) — text-lua

- [map/static_layouts/terrarium_forest_fire.lua:1](../source/scripts/map/static_layouts/terrarium_forest_fire.lua) — text-lua

- [map/static_layouts/terrarium_forest_pigs.lua:1](../source/scripts/map/static_layouts/terrarium_forest_pigs.lua) — text-lua

- [map/static_layouts/terrarium_forest_spiders.lua:1](../source/scripts/map/static_layouts/terrarium_forest_spiders.lua) — text-lua

- [map/static_layouts/test.lua:1](../source/scripts/map/static_layouts/test.lua) — text-lua

- [map/static_layouts/thismeanswar_start.lua:1](../source/scripts/map/static_layouts/thismeanswar_start.lua) — text-lua

- [map/static_layouts/toadstool_arena.lua:1](../source/scripts/map/static_layouts/toadstool_arena.lua) — text-lua

- [map/static_layouts/torch_pigking.lua:1](../source/scripts/map/static_layouts/torch_pigking.lua) — text-lua

- [map/static_layouts/torch_rabbit_cave.lua:1](../source/scripts/map/static_layouts/torch_rabbit_cave.lua) — text-lua

- [map/static_layouts/total_darkness_start.lua:1](../source/scripts/map/static_layouts/total_darkness_start.lua) — text-lua

- [map/static_layouts/trap_firestaff.lua:1](../source/scripts/map/static_layouts/trap_firestaff.lua) — text-lua

- [map/static_layouts/trap_forceinsane.lua:1](../source/scripts/map/static_layouts/trap_forceinsane.lua) — text-lua

- [map/static_layouts/trap_icestaff.lua:1](../source/scripts/map/static_layouts/trap_icestaff.lua) — text-lua

- [map/static_layouts/trap_sleepingspider.lua:1](../source/scripts/map/static_layouts/trap_sleepingspider.lua) — text-lua

- [map/static_layouts/trap_spoilfood.lua:1](../source/scripts/map/static_layouts/trap_spoilfood.lua) — text-lua

- [map/static_layouts/trap_summer.lua:1](../source/scripts/map/static_layouts/trap_summer.lua) — text-lua

- [map/static_layouts/trap_winter.lua:1](../source/scripts/map/static_layouts/trap_winter.lua) — text-lua

- [map/static_layouts/trap_winter_deciduous.lua:1](../source/scripts/map/static_layouts/trap_winter_deciduous.lua) — text-lua

- [map/static_layouts/vault_lobby.lua:1](../source/scripts/map/static_layouts/vault_lobby.lua) — text-lua

- [map/static_layouts/vault_vault.lua:1](../source/scripts/map/static_layouts/vault_vault.lua) — text-lua

- [map/static_layouts/walledgarden.lua:1](../source/scripts/map/static_layouts/walledgarden.lua) — text-lua

- [map/static_layouts/walls_corner.lua:1](../source/scripts/map/static_layouts/walls_corner.lua) — text-lua

- [map/static_layouts/walls_corner2.lua:1](../source/scripts/map/static_layouts/walls_corner2.lua) — text-lua

- [map/static_layouts/walls_straight.lua:1](../source/scripts/map/static_layouts/walls_straight.lua) — text-lua

- [map/static_layouts/walls_straight2.lua:1](../source/scripts/map/static_layouts/walls_straight2.lua) — text-lua

- [map/static_layouts/warzone_1.lua:1](../source/scripts/map/static_layouts/warzone_1.lua) — text-lua

- [map/static_layouts/warzone_2.lua:1](../source/scripts/map/static_layouts/warzone_2.lua) — text-lua

- [map/static_layouts/warzone_3.lua:1](../source/scripts/map/static_layouts/warzone_3.lua) — text-lua

- [map/static_layouts/wasphive_grass_easy.lua:1](../source/scripts/map/static_layouts/wasphive_grass_easy.lua) — text-lua

- [map/static_layouts/waterlogged1.lua:1](../source/scripts/map/static_layouts/waterlogged1.lua) — text-lua

- [map/static_layouts/waterlogged2.lua:1](../source/scripts/map/static_layouts/waterlogged2.lua) — text-lua

- [map/static_layouts/waterlogged3.lua:1](../source/scripts/map/static_layouts/waterlogged3.lua) — text-lua

- [map/static_layouts/waterlogged4.lua:1](../source/scripts/map/static_layouts/waterlogged4.lua) — text-lua

- [map/static_layouts/waterplant1.lua:1](../source/scripts/map/static_layouts/waterplant1.lua) — text-lua

- [map/static_layouts/waterplant2.lua:1](../source/scripts/map/static_layouts/waterplant2.lua) — text-lua

- [map/static_layouts/winter_start_easy.lua:1](../source/scripts/map/static_layouts/winter_start_easy.lua) — text-lua

- [map/static_layouts/winter_start_hard.lua:1](../source/scripts/map/static_layouts/winter_start_hard.lua) — text-lua

- [map/static_layouts/winter_start_medium.lua:1](../source/scripts/map/static_layouts/winter_start_medium.lua) — text-lua

- [map/static_layouts/winter_start_vhard.lua:1](../source/scripts/map/static_layouts/winter_start_vhard.lua) — text-lua

- [map/static_layouts/wormhole_grass.lua:1](../source/scripts/map/static_layouts/wormhole_grass.lua) — text-lua

- [map/static_layouts/wormhole_oneshot.lua:1](../source/scripts/map/static_layouts/wormhole_oneshot.lua) — text-lua

- [map/tasks/caves.lua:1](../source/scripts/map/tasks/caves.lua) — text-lua

- [map/tasks/DLCtasks.lua:1](../source/scripts/map/tasks/DLCtasks.lua) — text-lua

- [map/tasks/dst_tasks_forestworld.lua:1](../source/scripts/map/tasks/dst_tasks_forestworld.lua) — text-lua

- [map/tasks/forest.lua:1](../source/scripts/map/tasks/forest.lua) — text-lua

- [map/tasks/island_hopping.lua:1](../source/scripts/map/tasks/island_hopping.lua) — text-lua

- [map/tasks/lavaarena.lua:1](../source/scripts/map/tasks/lavaarena.lua) — text-lua

- [map/tasks/maxwell.lua:1](../source/scripts/map/tasks/maxwell.lua) — text-lua

- [map/tasks/moonisland_tasks.lua:1](../source/scripts/map/tasks/moonisland_tasks.lua) — text-lua

- [map/tasks/quagmire.lua:1](../source/scripts/map/tasks/quagmire.lua) — text-lua

- [map/tasks/ruins.lua:1](../source/scripts/map/tasks/ruins.lua) — text-lua

- [map/tasksets/caves.lua:1](../source/scripts/map/tasksets/caves.lua) — text-lua

- [map/tasksets/forest.lua:1](../source/scripts/map/tasksets/forest.lua) — text-lua

- [map/tasksets/lavaarena.lua:1](../source/scripts/map/tasksets/lavaarena.lua) — text-lua

- [map/tasksets/quagmire.lua:1](../source/scripts/map/tasksets/quagmire.lua) — text-lua

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

- [map/static_layouts/events/lava_arena.lua:1](../source/scripts/map/static_layouts/events/lava_arena.lua) — text-lua

- [map/static_layouts/events/quagmire_kitchen.lua:1](../source/scripts/map/static_layouts/events/quagmire_kitchen.lua) — text-lua

- [map/static_layouts/grotto/grotto_start.lua:1](../source/scripts/map/static_layouts/grotto/grotto_start.lua) — text-lua

- [map/static_layouts/rooms/archive_end/archive_end.lua:1](../source/scripts/map/static_layouts/rooms/archive_end/archive_end.lua) — text-lua

- [map/static_layouts/rooms/archive_fourblock/four.lua:1](../source/scripts/map/static_layouts/rooms/archive_fourblock/four.lua) — text-lua

- [map/static_layouts/rooms/archive_fourblock/one.lua:1](../source/scripts/map/static_layouts/rooms/archive_fourblock/one.lua) — text-lua

- [map/static_layouts/rooms/archive_fourblock/three.lua:1](../source/scripts/map/static_layouts/rooms/archive_fourblock/three.lua) — text-lua

- [map/static_layouts/rooms/archive_fourblock/two.lua:1](../source/scripts/map/static_layouts/rooms/archive_fourblock/two.lua) — text-lua

- [map/static_layouts/rooms/archive_hallway/archive_end.lua:1](../source/scripts/map/static_layouts/rooms/archive_hallway/archive_end.lua) — text-lua

- [map/static_layouts/rooms/archive_hallway/four.lua:1](../source/scripts/map/static_layouts/rooms/archive_hallway/four.lua) — text-lua

- [map/static_layouts/rooms/archive_hallway/long.lua:1](../source/scripts/map/static_layouts/rooms/archive_hallway/long.lua) — text-lua

- [map/static_layouts/rooms/archive_hallway/one.lua:1](../source/scripts/map/static_layouts/rooms/archive_hallway/one.lua) — text-lua

- [map/static_layouts/rooms/archive_hallway/three.lua:1](../source/scripts/map/static_layouts/rooms/archive_hallway/three.lua) — text-lua

- [map/static_layouts/rooms/archive_hallway/two.lua:1](../source/scripts/map/static_layouts/rooms/archive_hallway/two.lua) — text-lua

- [map/static_layouts/rooms/archive_hallway_two/four.lua:1](../source/scripts/map/static_layouts/rooms/archive_hallway_two/four.lua) — text-lua

- [map/static_layouts/rooms/archive_hallway_two/long.lua:1](../source/scripts/map/static_layouts/rooms/archive_hallway_two/long.lua) — text-lua

- [map/static_layouts/rooms/archive_hallway_two/one.lua:1](../source/scripts/map/static_layouts/rooms/archive_hallway_two/one.lua) — text-lua

- [map/static_layouts/rooms/archive_hallway_two/three.lua:1](../source/scripts/map/static_layouts/rooms/archive_hallway_two/three.lua) — text-lua

- [map/static_layouts/rooms/archive_hallway_two/two.lua:1](../source/scripts/map/static_layouts/rooms/archive_hallway_two/two.lua) — text-lua

- [map/static_layouts/rooms/archive_keyroom/keyroom_1.lua:1](../source/scripts/map/static_layouts/rooms/archive_keyroom/keyroom_1.lua) — text-lua

- [map/static_layouts/rooms/archive_start/archive_start.lua:1](../source/scripts/map/static_layouts/rooms/archive_start/archive_start.lua) — text-lua

- [map/static_layouts/rooms/atrium_end/atrium_end.lua:1](../source/scripts/map/static_layouts/rooms/atrium_end/atrium_end.lua) — text-lua

- [map/static_layouts/rooms/atrium_hallway/four.lua:1](../source/scripts/map/static_layouts/rooms/atrium_hallway/four.lua) — text-lua

- [map/static_layouts/rooms/atrium_hallway/long.lua:1](../source/scripts/map/static_layouts/rooms/atrium_hallway/long.lua) — text-lua

- [map/static_layouts/rooms/atrium_hallway/one.lua:1](../source/scripts/map/static_layouts/rooms/atrium_hallway/one.lua) — text-lua

- [map/static_layouts/rooms/atrium_hallway/three.lua:1](../source/scripts/map/static_layouts/rooms/atrium_hallway/three.lua) — text-lua

- [map/static_layouts/rooms/atrium_hallway/two.lua:1](../source/scripts/map/static_layouts/rooms/atrium_hallway/two.lua) — text-lua

- [map/static_layouts/rooms/atrium_hallway_three/four.lua:1](../source/scripts/map/static_layouts/rooms/atrium_hallway_three/four.lua) — text-lua

- [map/static_layouts/rooms/atrium_hallway_three/long.lua:1](../source/scripts/map/static_layouts/rooms/atrium_hallway_three/long.lua) — text-lua

- [map/static_layouts/rooms/atrium_hallway_three/one.lua:1](../source/scripts/map/static_layouts/rooms/atrium_hallway_three/one.lua) — text-lua

- [map/static_layouts/rooms/atrium_hallway_three/three.lua:1](../source/scripts/map/static_layouts/rooms/atrium_hallway_three/three.lua) — text-lua

- [map/static_layouts/rooms/atrium_hallway_three/two.lua:1](../source/scripts/map/static_layouts/rooms/atrium_hallway_three/two.lua) — text-lua

- [map/static_layouts/rooms/atrium_hallway_two/four.lua:1](../source/scripts/map/static_layouts/rooms/atrium_hallway_two/four.lua) — text-lua

- [map/static_layouts/rooms/atrium_hallway_two/long.lua:1](../source/scripts/map/static_layouts/rooms/atrium_hallway_two/long.lua) — text-lua

- [map/static_layouts/rooms/atrium_hallway_two/one.lua:1](../source/scripts/map/static_layouts/rooms/atrium_hallway_two/one.lua) — text-lua

- [map/static_layouts/rooms/atrium_hallway_two/three.lua:1](../source/scripts/map/static_layouts/rooms/atrium_hallway_two/three.lua) — text-lua

- [map/static_layouts/rooms/atrium_hallway_two/two.lua:1](../source/scripts/map/static_layouts/rooms/atrium_hallway_two/two.lua) — text-lua

- [map/static_layouts/rooms/atrium_start/atrium_start.lua:1](../source/scripts/map/static_layouts/rooms/atrium_start/atrium_start.lua) — text-lua

- [map/static_layouts/rooms/hallway/four.lua:1](../source/scripts/map/static_layouts/rooms/hallway/four.lua) — text-lua

- [map/static_layouts/rooms/hallway/long.lua:1](../source/scripts/map/static_layouts/rooms/hallway/long.lua) — text-lua

- [map/static_layouts/rooms/hallway/one.lua:1](../source/scripts/map/static_layouts/rooms/hallway/one.lua) — text-lua

- [map/static_layouts/rooms/hallway/three.lua:1](../source/scripts/map/static_layouts/rooms/hallway/three.lua) — text-lua

- [map/static_layouts/rooms/hallway/two.lua:1](../source/scripts/map/static_layouts/rooms/hallway/two.lua) — text-lua

- [map/static_layouts/rooms/hallway_armoury/four.lua:1](../source/scripts/map/static_layouts/rooms/hallway_armoury/four.lua) — text-lua

- [map/static_layouts/rooms/hallway_armoury/long.lua:1](../source/scripts/map/static_layouts/rooms/hallway_armoury/long.lua) — text-lua

- [map/static_layouts/rooms/hallway_armoury/one.lua:1](../source/scripts/map/static_layouts/rooms/hallway_armoury/one.lua) — text-lua

- [map/static_layouts/rooms/hallway_armoury/three.lua:1](../source/scripts/map/static_layouts/rooms/hallway_armoury/three.lua) — text-lua

- [map/static_layouts/rooms/hallway_armoury/two.lua:1](../source/scripts/map/static_layouts/rooms/hallway_armoury/two.lua) — text-lua

- [map/static_layouts/rooms/hallway_residential/four.lua:1](../source/scripts/map/static_layouts/rooms/hallway_residential/four.lua) — text-lua

- [map/static_layouts/rooms/hallway_residential/long.lua:1](../source/scripts/map/static_layouts/rooms/hallway_residential/long.lua) — text-lua

- [map/static_layouts/rooms/hallway_residential/one.lua:1](../source/scripts/map/static_layouts/rooms/hallway_residential/one.lua) — text-lua

- [map/static_layouts/rooms/hallway_residential/three.lua:1](../source/scripts/map/static_layouts/rooms/hallway_residential/three.lua) — text-lua

- [map/static_layouts/rooms/hallway_residential/two.lua:1](../source/scripts/map/static_layouts/rooms/hallway_residential/two.lua) — text-lua

- [map/static_layouts/rooms/hallway_residential_two/four.lua:1](../source/scripts/map/static_layouts/rooms/hallway_residential_two/four.lua) — text-lua

- [map/static_layouts/rooms/hallway_residential_two/long.lua:1](../source/scripts/map/static_layouts/rooms/hallway_residential_two/long.lua) — text-lua

- [map/static_layouts/rooms/hallway_residential_two/one.lua:1](../source/scripts/map/static_layouts/rooms/hallway_residential_two/one.lua) — text-lua

- [map/static_layouts/rooms/hallway_residential_two/three.lua:1](../source/scripts/map/static_layouts/rooms/hallway_residential_two/three.lua) — text-lua

- [map/static_layouts/rooms/hallway_residential_two/two.lua:1](../source/scripts/map/static_layouts/rooms/hallway_residential_two/two.lua) — text-lua

- [map/static_layouts/rooms/pit_hallway_armoury/four.lua:1](../source/scripts/map/static_layouts/rooms/pit_hallway_armoury/four.lua) — text-lua

- [map/static_layouts/rooms/pit_hallway_armoury/long.lua:1](../source/scripts/map/static_layouts/rooms/pit_hallway_armoury/long.lua) — text-lua

- [map/static_layouts/rooms/pit_hallway_armoury/one.lua:1](../source/scripts/map/static_layouts/rooms/pit_hallway_armoury/one.lua) — text-lua

- [map/static_layouts/rooms/pit_hallway_armoury/three.lua:1](../source/scripts/map/static_layouts/rooms/pit_hallway_armoury/three.lua) — text-lua

- [map/static_layouts/rooms/pit_hallway_armoury/two.lua:1](../source/scripts/map/static_layouts/rooms/pit_hallway_armoury/two.lua) — text-lua

- [map/static_layouts/rooms/pit_room_armoury/four.lua:1](../source/scripts/map/static_layouts/rooms/pit_room_armoury/four.lua) — text-lua

- [map/static_layouts/rooms/pit_room_armoury/long.lua:1](../source/scripts/map/static_layouts/rooms/pit_room_armoury/long.lua) — text-lua

- [map/static_layouts/rooms/pit_room_armoury/one.lua:1](../source/scripts/map/static_layouts/rooms/pit_room_armoury/one.lua) — text-lua

- [map/static_layouts/rooms/pit_room_armoury/three.lua:1](../source/scripts/map/static_layouts/rooms/pit_room_armoury/three.lua) — text-lua

- [map/static_layouts/rooms/pit_room_armoury/two.lua:1](../source/scripts/map/static_layouts/rooms/pit_room_armoury/two.lua) — text-lua

- [map/static_layouts/rooms/pit_room_armoury_two/four.lua:1](../source/scripts/map/static_layouts/rooms/pit_room_armoury_two/four.lua) — text-lua

- [map/static_layouts/rooms/pit_room_armoury_two/long.lua:1](../source/scripts/map/static_layouts/rooms/pit_room_armoury_two/long.lua) — text-lua

- [map/static_layouts/rooms/pit_room_armoury_two/one.lua:1](../source/scripts/map/static_layouts/rooms/pit_room_armoury_two/one.lua) — text-lua

- [map/static_layouts/rooms/pit_room_armoury_two/three.lua:1](../source/scripts/map/static_layouts/rooms/pit_room_armoury_two/three.lua) — text-lua

- [map/static_layouts/rooms/pit_room_armoury_two/two.lua:1](../source/scripts/map/static_layouts/rooms/pit_room_armoury_two/two.lua) — text-lua

- [map/static_layouts/rooms/room/four.lua:1](../source/scripts/map/static_layouts/rooms/room/four.lua) — text-lua

- [map/static_layouts/rooms/room/long.lua:1](../source/scripts/map/static_layouts/rooms/room/long.lua) — text-lua

- [map/static_layouts/rooms/room/one.lua:1](../source/scripts/map/static_layouts/rooms/room/one.lua) — text-lua

- [map/static_layouts/rooms/room/three.lua:1](../source/scripts/map/static_layouts/rooms/room/three.lua) — text-lua

- [map/static_layouts/rooms/room/two.lua:1](../source/scripts/map/static_layouts/rooms/room/two.lua) — text-lua

- [map/static_layouts/rooms/room_armoury/four.lua:1](../source/scripts/map/static_layouts/rooms/room_armoury/four.lua) — text-lua

- [map/static_layouts/rooms/room_armoury/long.lua:1](../source/scripts/map/static_layouts/rooms/room_armoury/long.lua) — text-lua

- [map/static_layouts/rooms/room_armoury/one.lua:1](../source/scripts/map/static_layouts/rooms/room_armoury/one.lua) — text-lua

- [map/static_layouts/rooms/room_armoury/three.lua:1](../source/scripts/map/static_layouts/rooms/room_armoury/three.lua) — text-lua

- [map/static_layouts/rooms/room_armoury/two.lua:1](../source/scripts/map/static_layouts/rooms/room_armoury/two.lua) — text-lua

- [map/static_layouts/rooms/room_armoury_two/four.lua:1](../source/scripts/map/static_layouts/rooms/room_armoury_two/four.lua) — text-lua

- [map/static_layouts/rooms/room_armoury_two/long.lua:1](../source/scripts/map/static_layouts/rooms/room_armoury_two/long.lua) — text-lua

- [map/static_layouts/rooms/room_armoury_two/one.lua:1](../source/scripts/map/static_layouts/rooms/room_armoury_two/one.lua) — text-lua

- [map/static_layouts/rooms/room_armoury_two/three.lua:1](../source/scripts/map/static_layouts/rooms/room_armoury_two/three.lua) — text-lua

- [map/static_layouts/rooms/room_armoury_two/two.lua:1](../source/scripts/map/static_layouts/rooms/room_armoury_two/two.lua) — text-lua

- [map/static_layouts/rooms/room_open/four.lua:1](../source/scripts/map/static_layouts/rooms/room_open/four.lua) — text-lua

- [map/static_layouts/rooms/room_open/long.lua:1](../source/scripts/map/static_layouts/rooms/room_open/long.lua) — text-lua

- [map/static_layouts/rooms/room_open/one.lua:1](../source/scripts/map/static_layouts/rooms/room_open/one.lua) — text-lua

- [map/static_layouts/rooms/room_open/three.lua:1](../source/scripts/map/static_layouts/rooms/room_open/three.lua) — text-lua

- [map/static_layouts/rooms/room_open/two.lua:1](../source/scripts/map/static_layouts/rooms/room_open/two.lua) — text-lua

- [map/static_layouts/rooms/room_residential/four.lua:1](../source/scripts/map/static_layouts/rooms/room_residential/four.lua) — text-lua

- [map/static_layouts/rooms/room_residential/long.lua:1](../source/scripts/map/static_layouts/rooms/room_residential/long.lua) — text-lua

- [map/static_layouts/rooms/room_residential/one.lua:1](../source/scripts/map/static_layouts/rooms/room_residential/one.lua) — text-lua

- [map/static_layouts/rooms/room_residential/three.lua:1](../source/scripts/map/static_layouts/rooms/room_residential/three.lua) — text-lua

- [map/static_layouts/rooms/room_residential/two.lua:1](../source/scripts/map/static_layouts/rooms/room_residential/two.lua) — text-lua

- [map/static_layouts/rooms/room_residential_two/four.lua:1](../source/scripts/map/static_layouts/rooms/room_residential_two/four.lua) — text-lua

- [map/static_layouts/rooms/room_residential_two/long.lua:1](../source/scripts/map/static_layouts/rooms/room_residential_two/long.lua) — text-lua

- [map/static_layouts/rooms/room_residential_two/one.lua:1](../source/scripts/map/static_layouts/rooms/room_residential_two/one.lua) — text-lua

- [map/static_layouts/rooms/room_residential_two/three.lua:1](../source/scripts/map/static_layouts/rooms/room_residential_two/three.lua) — text-lua

- [map/static_layouts/rooms/room_residential_two/two.lua:1](../source/scripts/map/static_layouts/rooms/room_residential_two/two.lua) — text-lua
