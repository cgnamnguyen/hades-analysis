# Boss hang động, biển và hang ổ

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm boss hang động, biển và hang ổ theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

Toadstool có phase được phục hồi từ save hoặc máu; Crab King nối brain, timer và trang bị phụ; Stalker giữ dữ liệu triệu hồi riêng.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- Toadstool.SetPhaseLevel đổi số target sporebomb, cooldown và mushroom count theo phase. Từ phase3 nó resume pound_cd, trước đó dừng rồi tạo timer pause. Trigger phase chỉ chạy khi chưa đạt phase tương ứng, có nhánh rơi shroom_skin và phát roar. Save ghi phase/engaged/poundspeed; thiếu phase khi Load thì suy từ phần trăm health và dark variant.

- Crab King brain chỉ điều phối khi stategraph không inert/casting/fixing/spawning. ShouldHeal yêu cầu thiếu máu, có icewall và hết taunt. ShouldFreeze đòi damage tích lũy qua ngưỡng, health dưới stage1 và có boat hoặc mục tiêu phù hợp; boat_ice ngăn nhánh này. EndCastSpell đặt lại spell_cooldown, bật icewall/notarget, khởi động taunt và queue tạo vòng băng.

- Crab King save giữ socketlist, itemprefab/slot của socket và GUID arms. Stalker bản Atrium save decay, music level, tham số channelers, số minions và userid attacker. Load chỉ khởi động lại channeler task khi tham số vị trí/góc/count hợp lệ và boss còn sống.

### Nguồn đối chiếu

- [prefabs/toadstool.lua:680–766](../source/scripts/prefabs/toadstool.lua).

- [brains/crabkingbrain.lua:10–109](../source/scripts/brains/crabkingbrain.lua).

- [prefabs/crabking.lua:537–564](../source/scripts/prefabs/crabking.lua).

- [prefabs/crabking.lua:715–730](../source/scripts/prefabs/crabking.lua).

- [prefabs/crabking.lua:925–957](../source/scripts/prefabs/crabking.lua).

- [prefabs/stalker.lua:360–375](../source/scripts/prefabs/stalker.lua).

- [prefabs/stalker.lua:1110–1151](../source/scripts/prefabs/stalker.lua).

### Phạm vi còn hở

- Còn các ability timer, stategraph hit frame, cơ chế gem cụ thể và các boss Minotaur/Malbatross/Sharkboi. Mức phase được ghi ở prefab chưa tương đương toàn bộ chiến thuật AI.

- Phải đọc LoadPostPass để khẳng định arm/cannon GUID, minion và arena được nối lại đầy đủ sau khi tải.

<!-- deep-review-world-ecology:end -->

- [brains/crabkingbrain.lua:1](../source/scripts/brains/crabkingbrain.lua) — text-lua

- [brains/crabkingclawbrain.lua:1](../source/scripts/brains/crabkingclawbrain.lua) — text-lua

- [brains/crabking_mobbrain.lua:1](../source/scripts/brains/crabking_mobbrain.lua) — text-lua

- [prefabs/crabking.lua:1](../source/scripts/prefabs/crabking.lua) — text-lua

- [prefabs/crabking_cannontower.lua:1](../source/scripts/prefabs/crabking_cannontower.lua) — text-lua

- [prefabs/crabking_claw.lua:1](../source/scripts/prefabs/crabking_claw.lua) — text-lua

- [prefabs/crabking_icewall.lua:1](../source/scripts/prefabs/crabking_icewall.lua) — text-lua

- [prefabs/crabking_mob.lua:1](../source/scripts/prefabs/crabking_mob.lua) — text-lua

- [prefabs/crabking_spawner.lua:1](../source/scripts/prefabs/crabking_spawner.lua) — text-lua

- [prefabs/malbatross.lua:1](../source/scripts/prefabs/malbatross.lua) — text-lua

- [prefabs/malbatross_feather.lua:1](../source/scripts/prefabs/malbatross_feather.lua) — text-lua

- [prefabs/malbatross_feathered_weave.lua:1](../source/scripts/prefabs/malbatross_feathered_weave.lua) — text-lua

- [prefabs/minotaur.lua:1](../source/scripts/prefabs/minotaur.lua) — text-lua

- [prefabs/minotaurhorn.lua:1](../source/scripts/prefabs/minotaurhorn.lua) — text-lua

- [prefabs/sharkboi.lua:1](../source/scripts/prefabs/sharkboi.lua) — text-lua

- [prefabs/sharkboi_fx.lua:1](../source/scripts/prefabs/sharkboi_fx.lua) — text-lua

- [prefabs/sharkboi_icespike.lua:1](../source/scripts/prefabs/sharkboi_icespike.lua) — text-lua

- [prefabs/sharkboi_ice_hazard.lua:1](../source/scripts/prefabs/sharkboi_ice_hazard.lua) — text-lua

- [prefabs/sharkboi_water.lua:1](../source/scripts/prefabs/sharkboi_water.lua) — text-lua

- [prefabs/stalker.lua:1](../source/scripts/prefabs/stalker.lua) — text-lua

- [prefabs/stalker_berry.lua:1](../source/scripts/prefabs/stalker_berry.lua) — text-lua

- [prefabs/stalker_bulb.lua:1](../source/scripts/prefabs/stalker_bulb.lua) — text-lua

- [prefabs/stalker_ferns.lua:1](../source/scripts/prefabs/stalker_ferns.lua) — text-lua

- [prefabs/stalker_minions.lua:1](../source/scripts/prefabs/stalker_minions.lua) — text-lua

- [prefabs/stalker_shield.lua:1](../source/scripts/prefabs/stalker_shield.lua) — text-lua

- [prefabs/toadstool.lua:1](../source/scripts/prefabs/toadstool.lua) — text-lua

- [prefabs/toadstool_cap.lua:1](../source/scripts/prefabs/toadstool_cap.lua) — text-lua

- [stategraphs/SGstalker.lua:1](../source/scripts/stategraphs/SGstalker.lua) — text-lua

- [stategraphs/SGstalker_minion.lua:1](../source/scripts/stategraphs/SGstalker_minion.lua) — text-lua

- [stategraphs/SGtoadstool.lua:1](../source/scripts/stategraphs/SGtoadstool.lua) — text-lua
