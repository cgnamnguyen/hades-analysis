# Mặt trăng, shadow, rift và tiến trình liên quan

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm mặt trăng, shadow, rift và tiến trình liên quan theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

RiftSpawner giữ pool có giới hạn, vị trí tránh rift cũ và timer được phục hồi qua GUID.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- SpawnRift chọn prefab qua GetNextRiftPrefab và definition. Thiếu definition/vị trí hoặc quá gần rift trước thì trả nil. Nó sinh prefab, đặt thrall type và AddRiftToPool; chỉ thêm mới thì tăng rifts_count, nghe onremove và phát ms_riftaddedtopool.

- TryToSpawnRift chỉ sinh dưới MAXIMUM_RIFTS_COUNT. OnRiftTimerDone bỏ qua spawnmode1; thất bại tìm chỗ thì thử lại sau TOTAL_DAY_TIME. Khi rift bị xóa, giảm count và tạo timer mới nếu mode cho phép, chưa có timer active và còn sức chứa.

- EnableLunar/Shadow đặt WORLDSTATETAGS, cờ và khởi động worldsettingstimer; lunar còn Enable wagpunk_manager. Setting never tắt cờ, dừng timer và tắt wagpunk ở nhánh lunar. Save giữ các cờ và GUID pool. LoadPostPass nối lại từng rift, gọi Enable tương ứng và khởi động lại tìm arena points nếu timer active.

### Nguồn đối chiếu

- [components/riftspawner.lua:53–151](../source/scripts/components/riftspawner.lua).

- [components/riftspawner.lua:176–249](../source/scripts/components/riftspawner.lua).

- [components/riftspawner.lua:382–436](../source/scripts/components/riftspawner.lua).

### Phạm vi còn hở

- Chưa giải thích đầy đủ moon altar, Alterguardian nhiều phase, mutation, shadow parasite và mọi rift prefab. Thiết lập vùng arena phụ thuộc map engine.

- GetNextRiftPrefab và RIFTPORTAL_DEFS quyết định affinity/location cụ thể; cần đọc riêng để có lịch và odds chính xác.

<!-- deep-review-world-ecology:end -->

- [components/lunaralterguardianspawner.lua:1](../source/scripts/components/lunaralterguardianspawner.lua) — text-lua

- [components/lunarfissureburning.lua:1](../source/scripts/components/lunarfissureburning.lua) — text-lua

- [components/lunarhailbirdsoundmanager.lua:1](../source/scripts/components/lunarhailbirdsoundmanager.lua) — text-lua

- [components/lunarhailbuildup.lua:1](../source/scripts/components/lunarhailbuildup.lua) — text-lua

- [components/lunarhailmanager.lua:1](../source/scripts/components/lunarhailmanager.lua) — text-lua

- [components/lunarplant_tentacle_weapon.lua:1](../source/scripts/components/lunarplant_tentacle_weapon.lua) — text-lua

- [components/lunarriftmutationsmanager.lua:1](../source/scripts/components/lunarriftmutationsmanager.lua) — text-lua

- [components/lunarsupernovablocker.lua:1](../source/scripts/components/lunarsupernovablocker.lua) — text-lua

- [components/lunarsupernovaburning.lua:1](../source/scripts/components/lunarsupernovaburning.lua) — text-lua

- [components/lunarthrall_plantspawner.lua:1](../source/scripts/components/lunarthrall_plantspawner.lua) — text-lua

- [components/moonaltarlink.lua:1](../source/scripts/components/moonaltarlink.lua) — text-lua

- [components/moonaltarlinktarget.lua:1](../source/scripts/components/moonaltarlinktarget.lua) — text-lua

- [components/moonstormlightningmanager.lua:1](../source/scripts/components/moonstormlightningmanager.lua) — text-lua

- [components/moonstormmanager.lua:1](../source/scripts/components/moonstormmanager.lua) — text-lua

- [components/moonstorms.lua:1](../source/scripts/components/moonstorms.lua) — text-lua

- [components/moonstormstaticcapturable.lua:1](../source/scripts/components/moonstormstaticcapturable.lua) — text-lua

- [components/moonstormstaticcatcher.lua:1](../source/scripts/components/moonstormstaticcatcher.lua) — text-lua

- [components/moonstormwatcher.lua:1](../source/scripts/components/moonstormwatcher.lua) — text-lua

- [components/riftspawner.lua:1](../source/scripts/components/riftspawner.lua) — text-lua

- [components/riftthralltype.lua:1](../source/scripts/components/riftthralltype.lua) — text-lua

- [components/shadowcreaturespawner.lua:1](../source/scripts/components/shadowcreaturespawner.lua) — text-lua

- [components/shadowdominance.lua:1](../source/scripts/components/shadowdominance.lua) — text-lua

- [components/shadowhandspawner.lua:1](../source/scripts/components/shadowhandspawner.lua) — text-lua

- [components/shadowlevel.lua:1](../source/scripts/components/shadowlevel.lua) — text-lua

- [components/shadowparasitemanager.lua:1](../source/scripts/components/shadowparasitemanager.lua) — text-lua

- [components/shadowsubmissive.lua:1](../source/scripts/components/shadowsubmissive.lua) — text-lua

- [components/shadowthrallmanager.lua:1](../source/scripts/components/shadowthrallmanager.lua) — text-lua

- [components/shadowthrall_mimics.lua:1](../source/scripts/components/shadowthrall_mimics.lua) — text-lua

- [prefabs/alterguardianhatshard.lua:1](../source/scripts/prefabs/alterguardianhatshard.lua) — text-lua

- [prefabs/alterguardian_hat_equipped.lua:1](../source/scripts/prefabs/alterguardian_hat_equipped.lua) — text-lua

- [prefabs/alterguardian_laser.lua:1](../source/scripts/prefabs/alterguardian_laser.lua) — text-lua

- [prefabs/alterguardian_lunar_fissures.lua:1](../source/scripts/prefabs/alterguardian_lunar_fissures.lua) — text-lua

- [prefabs/alterguardian_phase1.lua:1](../source/scripts/prefabs/alterguardian_phase1.lua) — text-lua

- [prefabs/alterguardian_phase2.lua:1](../source/scripts/prefabs/alterguardian_phase2.lua) — text-lua

- [prefabs/alterguardian_phase2spike.lua:1](../source/scripts/prefabs/alterguardian_phase2spike.lua) — text-lua

- [prefabs/alterguardian_phase3.lua:1](../source/scripts/prefabs/alterguardian_phase3.lua) — text-lua

- [prefabs/alterguardian_phase3circle.lua:1](../source/scripts/prefabs/alterguardian_phase3circle.lua) — text-lua

- [prefabs/alterguardian_phase3dead.lua:1](../source/scripts/prefabs/alterguardian_phase3dead.lua) — text-lua

- [prefabs/alterguardian_phase3trap.lua:1](../source/scripts/prefabs/alterguardian_phase3trap.lua) — text-lua

- [prefabs/alterguardian_phase4_lunarrift.lua:1](../source/scripts/prefabs/alterguardian_phase4_lunarrift.lua) — text-lua

- [prefabs/alterguardian_summon_fx.lua:1](../source/scripts/prefabs/alterguardian_summon_fx.lua) — text-lua

- [prefabs/lunarhail.lua:1](../source/scripts/prefabs/lunarhail.lua) — text-lua

- [prefabs/lunarhaildrop.lua:1](../source/scripts/prefabs/lunarhaildrop.lua) — text-lua

- [prefabs/lunarplanttentacle.lua:1](../source/scripts/prefabs/lunarplanttentacle.lua) — text-lua

- [prefabs/lunarplant_husk.lua:1](../source/scripts/prefabs/lunarplant_husk.lua) — text-lua

- [prefabs/lunarrift_crystals.lua:1](../source/scripts/prefabs/lunarrift_crystals.lua) — text-lua

- [prefabs/lunarrift_crystal_spawn_fx.lua:1](../source/scripts/prefabs/lunarrift_crystal_spawn_fx.lua) — text-lua

- [prefabs/lunarrift_portal.lua:1](../source/scripts/prefabs/lunarrift_portal.lua) — text-lua

- [prefabs/lunarrift_terraformer_explosion.lua:1](../source/scripts/prefabs/lunarrift_terraformer_explosion.lua) — text-lua

- [prefabs/lunarthrall_plant.lua:1](../source/scripts/prefabs/lunarthrall_plant.lua) — text-lua

- [prefabs/lunarthrall_plant_gestalt.lua:1](../source/scripts/prefabs/lunarthrall_plant_gestalt.lua) — text-lua

- [prefabs/lunar_forge.lua:1](../source/scripts/prefabs/lunar_forge.lua) — text-lua

- [prefabs/lunar_goop_cloud_fx.lua:1](../source/scripts/prefabs/lunar_goop_cloud_fx.lua) — text-lua

- [prefabs/lunar_goop_trail_fx.lua:1](../source/scripts/prefabs/lunar_goop_trail_fx.lua) — text-lua

- [prefabs/lunar_grazer.lua:1](../source/scripts/prefabs/lunar_grazer.lua) — text-lua

- [prefabs/lunar_seed.lua:1](../source/scripts/prefabs/lunar_seed.lua) — text-lua

- [prefabs/moonbase.lua:1](../source/scripts/prefabs/moonbase.lua) — text-lua

- [prefabs/moonbutterfly.lua:1](../source/scripts/prefabs/moonbutterfly.lua) — text-lua

- [prefabs/moonbutterflywings.lua:1](../source/scripts/prefabs/moonbutterflywings.lua) — text-lua

- [prefabs/moondial.lua:1](../source/scripts/prefabs/moondial.lua) — text-lua

- [prefabs/mooneye.lua:1](../source/scripts/prefabs/mooneye.lua) — text-lua

- [prefabs/moonglass.lua:1](../source/scripts/prefabs/moonglass.lua) — text-lua

- [prefabs/moonglass_stalactites.lua:1](../source/scripts/prefabs/moonglass_stalactites.lua) — text-lua

- [prefabs/moonpulse.lua:1](../source/scripts/prefabs/moonpulse.lua) — text-lua

- [prefabs/moonrockcrater.lua:1](../source/scripts/prefabs/moonrockcrater.lua) — text-lua

- [prefabs/moonrockidol.lua:1](../source/scripts/prefabs/moonrockidol.lua) — text-lua

- [prefabs/moonrocknugget.lua:1](../source/scripts/prefabs/moonrocknugget.lua) — text-lua

- [prefabs/moonrockseed.lua:1](../source/scripts/prefabs/moonrockseed.lua) — text-lua

- [prefabs/moonrock_pieces.lua:1](../source/scripts/prefabs/moonrock_pieces.lua) — text-lua

- [prefabs/moonspiderden.lua:1](../source/scripts/prefabs/moonspiderden.lua) — text-lua

- [prefabs/moonspider_spike.lua:1](../source/scripts/prefabs/moonspider_spike.lua) — text-lua

- [prefabs/moonstormmarker.lua:1](../source/scripts/prefabs/moonstormmarker.lua) — text-lua

- [prefabs/moonstorm_glass.lua:1](../source/scripts/prefabs/moonstorm_glass.lua) — text-lua

- [prefabs/moonstorm_ground_lightning_fx.lua:1](../source/scripts/prefabs/moonstorm_ground_lightning_fx.lua) — text-lua

- [prefabs/moonstorm_lightning.lua:1](../source/scripts/prefabs/moonstorm_lightning.lua) — text-lua

- [prefabs/moonstorm_spark.lua:1](../source/scripts/prefabs/moonstorm_spark.lua) — text-lua

- [prefabs/moonstorm_static.lua:1](../source/scripts/prefabs/moonstorm_static.lua) — text-lua

- [prefabs/moontree.lua:1](../source/scripts/prefabs/moontree.lua) — text-lua

- [prefabs/moontree_blossom.lua:1](../source/scripts/prefabs/moontree_blossom.lua) — text-lua

- [prefabs/moon_altar.lua:1](../source/scripts/prefabs/moon_altar.lua) — text-lua

- [prefabs/moon_altar_break.lua:1](../source/scripts/prefabs/moon_altar_break.lua) — text-lua

- [prefabs/moon_altar_link.lua:1](../source/scripts/prefabs/moon_altar_link.lua) — text-lua

- [prefabs/moon_altar_pieces.lua:1](../source/scripts/prefabs/moon_altar_pieces.lua) — text-lua

- [prefabs/moon_device.lua:1](../source/scripts/prefabs/moon_device.lua) — text-lua

- [prefabs/moon_fissure.lua:1](../source/scripts/prefabs/moon_fissure.lua) — text-lua

- [prefabs/moon_mushroom.lua:1](../source/scripts/prefabs/moon_mushroom.lua) — text-lua

- [prefabs/shadowthrall_centipede.lua:1](../source/scripts/prefabs/shadowthrall_centipede.lua) — text-lua

- [prefabs/shadowthrall_hands.lua:1](../source/scripts/prefabs/shadowthrall_hands.lua) — text-lua

- [prefabs/shadowthrall_horns.lua:1](../source/scripts/prefabs/shadowthrall_horns.lua) — text-lua

- [prefabs/shadowthrall_mouth.lua:1](../source/scripts/prefabs/shadowthrall_mouth.lua) — text-lua

- [prefabs/shadowthrall_parasite.lua:1](../source/scripts/prefabs/shadowthrall_parasite.lua) — text-lua

- [prefabs/shadowthrall_projectile_fx.lua:1](../source/scripts/prefabs/shadowthrall_projectile_fx.lua) — text-lua

- [prefabs/shadowthrall_wings.lua:1](../source/scripts/prefabs/shadowthrall_wings.lua) — text-lua
