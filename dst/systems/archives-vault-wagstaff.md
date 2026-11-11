# Archive, vault, Wagstaff và phòng đặc biệt

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm archive, vault, wagstaff và phòng đặc biệt theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

Archive power nối gem socket với vault lobby; vault giữ version/layout và đợi các player sẵn sàng trước khi đổi phòng.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- ArchiveManager chỉ trên mastersim. SwitchPowerOn chỉ phát khi giá trị đổi, cập nhật ARCHIVES_ENERGIZED và event chính xác tên arhivepoweron/arhivepoweroff. Prefab archive_props.checkforgems tìm gemsockets trong bán kính6 và bật điện khi ít nhất3 socket có gem; lấy gem tắt điện. OnLoadPostPassSwitch tái gọi OnGemGiven/OnGemTaken theo pickable.caninteractwith.

- VaultRoomManager nghe hai event archive và SetPowered cho lobby teleporter đang tồn tại. TryStartTeleportSequence chỉ bắt đầu khi chưa có _pendingtp, phát vault_teleport với callback pending/ready cho từng player. Khi không còn player pending, nó chọn room, lưu marker đích và StopChanneling(true); CancelPendingTeleport gỡ listener và xóa pending.

- Vault save spawnedlayouts/resetting/version, vaultroomdata theo roomindex, repairedlinks và seed khác mặc định. Load mặc định version1, nếu version cũ hơn2 thì ép resetting, tạo layout phiên bản tương ứng rồi reapply seed. Roomdata chỉ phục hồi khi roomindex tồn tại.

### Nguồn đối chiếu

- [components/archivemanager.lua:1–86](../source/scripts/components/archivemanager.lua).

- [prefabs/archive_props.lua:790–863](../source/scripts/prefabs/archive_props.lua).

- [prefabs/archive_props.lua:879–901](../source/scripts/prefabs/archive_props.lua).

- [components/vaultroommanager.lua:434–447](../source/scripts/components/vaultroommanager.lua).

- [components/vaultroommanager.lua:675–735](../source/scripts/components/vaultroommanager.lua).

- [components/vaultroommanager.lua:1220–1279](../source/scripts/components/vaultroommanager.lua).

### Phạm vi còn hở

- Cần trace các trial/key, wagboss phase và wagpunk arena/loot riêng. Đã đọc luồng điện và chuyển phòng, chưa xem toàn bộ83 file là hoàn thành semantics.

- Phép sinh PRNG layout, thao tác teleport entity và recovery khi player rời giữa pending cần đọc sâu tiếp và kiểm chứng runtime.

<!-- deep-review-world-ecology:end -->

- [components/archivemanager.lua:1](../source/scripts/components/archivemanager.lua) — text-lua

- [components/vaultmusiclistener.lua:1](../source/scripts/components/vaultmusiclistener.lua) — text-lua

- [components/vaultorbteleportdestination.lua:1](../source/scripts/components/vaultorbteleportdestination.lua) — text-lua

- [components/vaultorbteleporter.lua:1](../source/scripts/components/vaultorbteleporter.lua) — text-lua

- [components/vaultroom.lua:1](../source/scripts/components/vaultroom.lua) — text-lua

- [components/vaultroommanager.lua:1](../source/scripts/components/vaultroommanager.lua) — text-lua

- [components/vaulttorchgrid.lua:1](../source/scripts/components/vaulttorchgrid.lua) — text-lua

- [components/vault_floor_helper.lua:1](../source/scripts/components/vault_floor_helper.lua) — text-lua

- [components/vault_teleporter.lua:1](../source/scripts/components/vault_teleporter.lua) — text-lua

- [components/wagboss_tracker.lua:1](../source/scripts/components/wagboss_tracker.lua) — text-lua

- [components/wagpunk_arena_manager.lua:1](../source/scripts/components/wagpunk_arena_manager.lua) — text-lua

- [components/wagpunk_floor_helper.lua:1](../source/scripts/components/wagpunk_floor_helper.lua) — text-lua

- [components/wagpunk_manager.lua:1](../source/scripts/components/wagpunk_manager.lua) — text-lua

- [prefabs/archive_centipede.lua:1](../source/scripts/prefabs/archive_centipede.lua) — text-lua

- [prefabs/archive_chandelier.lua:1](../source/scripts/prefabs/archive_chandelier.lua) — text-lua

- [prefabs/archive_lockbox.lua:1](../source/scripts/prefabs/archive_lockbox.lua) — text-lua

- [prefabs/archive_orchestrina_main.lua:1](../source/scripts/prefabs/archive_orchestrina_main.lua) — text-lua

- [prefabs/archive_pillar.lua:1](../source/scripts/prefabs/archive_pillar.lua) — text-lua

- [prefabs/archive_props.lua:1](../source/scripts/prefabs/archive_props.lua) — text-lua

- [prefabs/archive_resonator.lua:1](../source/scripts/prefabs/archive_resonator.lua) — text-lua

- [prefabs/atrium_fence.lua:1](../source/scripts/prefabs/atrium_fence.lua) — text-lua

- [prefabs/atrium_gate.lua:1](../source/scripts/prefabs/atrium_gate.lua) — text-lua

- [prefabs/atrium_gate_activatedfx.lua:1](../source/scripts/prefabs/atrium_gate_activatedfx.lua) — text-lua

- [prefabs/atrium_gate_pulsesfx.lua:1](../source/scripts/prefabs/atrium_gate_pulsesfx.lua) — text-lua

- [prefabs/atrium_key.lua:1](../source/scripts/prefabs/atrium_key.lua) — text-lua

- [prefabs/atrium_light.lua:1](../source/scripts/prefabs/atrium_light.lua) — text-lua

- [prefabs/atrium_overgrowth.lua:1](../source/scripts/prefabs/atrium_overgrowth.lua) — text-lua

- [prefabs/atrium_pillar.lua:1](../source/scripts/prefabs/atrium_pillar.lua) — text-lua

- [prefabs/atrium_rubble.lua:1](../source/scripts/prefabs/atrium_rubble.lua) — text-lua

- [prefabs/atrium_statue.lua:1](../source/scripts/prefabs/atrium_statue.lua) — text-lua

- [prefabs/vaultcollision.lua:1](../source/scripts/prefabs/vaultcollision.lua) — text-lua

- [prefabs/vaultrelic.lua:1](../source/scripts/prefabs/vaultrelic.lua) — text-lua

- [prefabs/vaultroom_defs.lua:1](../source/scripts/prefabs/vaultroom_defs.lua) — text-lua

- [prefabs/vault_chandelier.lua:1](../source/scripts/prefabs/vault_chandelier.lua) — text-lua

- [prefabs/vault_compass.lua:1](../source/scripts/prefabs/vault_compass.lua) — text-lua

- [prefabs/vault_crawler.lua:1](../source/scripts/prefabs/vault_crawler.lua) — text-lua

- [prefabs/vault_decon_door.lua:1](../source/scripts/prefabs/vault_decon_door.lua) — text-lua

- [prefabs/vault_decon_mister.lua:1](../source/scripts/prefabs/vault_decon_mister.lua) — text-lua

- [prefabs/vault_decon_switch.lua:1](../source/scripts/prefabs/vault_decon_switch.lua) — text-lua

- [prefabs/vault_furniture.lua:1](../source/scripts/prefabs/vault_furniture.lua) — text-lua

- [prefabs/vault_ground_pattern.lua:1](../source/scripts/prefabs/vault_ground_pattern.lua) — text-lua

- [prefabs/vault_invalidtile.lua:1](../source/scripts/prefabs/vault_invalidtile.lua) — text-lua

- [prefabs/vault_key.lua:1](../source/scripts/prefabs/vault_key.lua) — text-lua

- [prefabs/vault_key_activator.lua:1](../source/scripts/prefabs/vault_key_activator.lua) — text-lua

- [prefabs/vault_key_trial.lua:1](../source/scripts/prefabs/vault_key_trial.lua) — text-lua

- [prefabs/vault_lobby_exit.lua:1](../source/scripts/prefabs/vault_lobby_exit.lua) — text-lua

- [prefabs/vault_markers.lua:1](../source/scripts/prefabs/vault_markers.lua) — text-lua

- [prefabs/vault_orb_refined.lua:1](../source/scripts/prefabs/vault_orb_refined.lua) — text-lua

- [prefabs/vault_pillar.lua:1](../source/scripts/prefabs/vault_pillar.lua) — text-lua

- [prefabs/vault_pillar_guard.lua:1](../source/scripts/prefabs/vault_pillar_guard.lua) — text-lua

- [prefabs/vault_pillar_guard_fx.lua:1](../source/scripts/prefabs/vault_pillar_guard_fx.lua) — text-lua

- [prefabs/vault_pillar_guard_pieces.lua:1](../source/scripts/prefabs/vault_pillar_guard_pieces.lua) — text-lua

- [prefabs/vault_runes.lua:1](../source/scripts/prefabs/vault_runes.lua) — text-lua

- [prefabs/vault_sanity_adjuster.lua:1](../source/scripts/prefabs/vault_sanity_adjuster.lua) — text-lua

- [prefabs/vault_security_desk.lua:1](../source/scripts/prefabs/vault_security_desk.lua) — text-lua

- [prefabs/vault_statues.lua:1](../source/scripts/prefabs/vault_statues.lua) — text-lua

- [prefabs/vault_switch.lua:1](../source/scripts/prefabs/vault_switch.lua) — text-lua

- [prefabs/vault_teleporter.lua:1](../source/scripts/prefabs/vault_teleporter.lua) — text-lua

- [prefabs/vault_torch.lua:1](../source/scripts/prefabs/vault_torch.lua) — text-lua

- [prefabs/wagboss_beam.lua:1](../source/scripts/prefabs/wagboss_beam.lua) — text-lua

- [prefabs/wagboss_missile.lua:1](../source/scripts/prefabs/wagboss_missile.lua) — text-lua

- [prefabs/wagboss_robot.lua:1](../source/scripts/prefabs/wagboss_robot.lua) — text-lua

- [prefabs/wagboss_robot_constructionsite.lua:1](../source/scripts/prefabs/wagboss_robot_constructionsite.lua) — text-lua

- [prefabs/wagboss_robot_leg.lua:1](../source/scripts/prefabs/wagboss_robot_leg.lua) — text-lua

- [prefabs/wagboss_util.lua:1](../source/scripts/prefabs/wagboss_util.lua) — text-lua

- [prefabs/wagdrone_common.lua:1](../source/scripts/prefabs/wagdrone_common.lua) — text-lua

- [prefabs/wagdrone_flying.lua:1](../source/scripts/prefabs/wagdrone_flying.lua) — text-lua

- [prefabs/wagdrone_laserwire.lua:1](../source/scripts/prefabs/wagdrone_laserwire.lua) — text-lua

- [prefabs/wagdrone_parts.lua:1](../source/scripts/prefabs/wagdrone_parts.lua) — text-lua

- [prefabs/wagdrone_projectile.lua:1](../source/scripts/prefabs/wagdrone_projectile.lua) — text-lua

- [prefabs/wagdrone_rolling.lua:1](../source/scripts/prefabs/wagdrone_rolling.lua) — text-lua

- [prefabs/wagdrone_spot_marker.lua:1](../source/scripts/prefabs/wagdrone_spot_marker.lua) — text-lua

- [prefabs/wagpunkhat_classified.lua:1](../source/scripts/prefabs/wagpunkhat_classified.lua) — text-lua

- [prefabs/wagpunk_arena_collision.lua:1](../source/scripts/prefabs/wagpunk_arena_collision.lua) — text-lua

- [prefabs/wagpunk_bits.lua:1](../source/scripts/prefabs/wagpunk_bits.lua) — text-lua

- [prefabs/wagpunk_cagewall.lua:1](../source/scripts/prefabs/wagpunk_cagewall.lua) — text-lua

- [prefabs/wagpunk_floor_kit.lua:1](../source/scripts/prefabs/wagpunk_floor_kit.lua) — text-lua

- [prefabs/wagpunk_lever.lua:1](../source/scripts/prefabs/wagpunk_lever.lua) — text-lua

- [prefabs/wagpunk_workstation.lua:1](../source/scripts/prefabs/wagpunk_workstation.lua) — text-lua

- [prefabs/wagstaff_items.lua:1](../source/scripts/prefabs/wagstaff_items.lua) — text-lua

- [prefabs/wagstaff_machinery.lua:1](../source/scripts/prefabs/wagstaff_machinery.lua) — text-lua

- [prefabs/wagstaff_npc.lua:1](../source/scripts/prefabs/wagstaff_npc.lua) — text-lua

- [prefabs/wagstaff_tools.lua:1](../source/scripts/prefabs/wagstaff_tools.lua) — text-lua
