# Buff, debuff và trạng thái khống chế

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm buff, debuff và trạng thái khống chế theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [components/cursable.lua:1](../source/scripts/components/cursable.lua) — text-lua

- [components/curseditem.lua:1](../source/scripts/components/curseditem.lua) — text-lua

- [components/debuff.lua:1](../source/scripts/components/debuff.lua) — text-lua

- [components/debuffable.lua:1](../source/scripts/components/debuffable.lua) — text-lua

- [components/grogginess.lua:1](../source/scripts/components/grogginess.lua) — text-lua

- [components/pinnable.lua:1](../source/scripts/components/pinnable.lua) — text-lua

- [components/rooted.lua:1](../source/scripts/components/rooted.lua) — text-lua

- [components/stunnable.lua:1](../source/scripts/components/stunnable.lua) — text-lua

- [prefabs/bufferedmapaction.lua:1](../source/scripts/prefabs/bufferedmapaction.lua) — text-lua

- [prefabs/critterbuff_lunarmoth.lua:1](../source/scripts/prefabs/critterbuff_lunarmoth.lua) — text-lua

- [prefabs/foodbuffs.lua:1](../source/scripts/prefabs/foodbuffs.lua) — text-lua

- [prefabs/ghostvision_buff.lua:1](../source/scripts/prefabs/ghostvision_buff.lua) — text-lua

- [prefabs/halloweenpotion_buffs.lua:1](../source/scripts/prefabs/halloweenpotion_buffs.lua) — text-lua

- [prefabs/healthregenbuff.lua:1](../source/scripts/prefabs/healthregenbuff.lua) — text-lua

- [prefabs/hungerregenbuff.lua:1](../source/scripts/prefabs/hungerregenbuff.lua) — text-lua

- [prefabs/mermking_gear_buffs.lua:1](../source/scripts/prefabs/mermking_gear_buffs.lua) — text-lua

- [prefabs/merm_healthregenbuff.lua:1](../source/scripts/prefabs/merm_healthregenbuff.lua) — text-lua

- [prefabs/miasmadebuff.lua:1](../source/scripts/prefabs/miasmadebuff.lua) — text-lua

- [prefabs/slingshotammo_debuffs.lua:1](../source/scripts/prefabs/slingshotammo_debuffs.lua) — text-lua

- [prefabs/spawnprotectionbuff.lua:1](../source/scripts/prefabs/spawnprotectionbuff.lua) — text-lua

- [prefabs/spellmasterybuff.lua:1](../source/scripts/prefabs/spellmasterybuff.lua) — text-lua

- [prefabs/spider_buffs.lua:1](../source/scripts/prefabs/spider_buffs.lua) — text-lua

- [prefabs/sunderarmordebuff.lua:1](../source/scripts/prefabs/sunderarmordebuff.lua) — text-lua

- [prefabs/wathgrithr_bloodlustbuff.lua:1](../source/scripts/prefabs/wathgrithr_bloodlustbuff.lua) — text-lua

- [prefabs/wintersfeastbuff.lua:1](../source/scripts/prefabs/wintersfeastbuff.lua) — text-lua

- [prefabs/wormwood_vined_debuff.lua:1](../source/scripts/prefabs/wormwood_vined_debuff.lua) — text-lua

- [prefabs/wx78_shadowdrone_debuffer.lua:1](../source/scripts/prefabs/wx78_shadowdrone_debuffer.lua) — text-lua

- [prefabs/wx78_shadow_fuel_debuff.lua:1](../source/scripts/prefabs/wx78_shadow_fuel_debuff.lua) — text-lua

- [prefabs/yoth_buffs.lua:1](../source/scripts/prefabs/yoth_buffs.lua) — text-lua

## Đọc sâu mã nguồn — 08/11/2026

**Mức bằng chứng bổ sung — source-traced-partial.** Đã đọc attach/extend/detach debuff, lưu hiệu ứng và vòng choáng grogginess.

**Gắn và gia hạn.** Debuffable.AddDebuff chỉ chạy khi enable. Tên chưa có thì SpawnPrefab rồi RegisterDebuff; entity thiếu component debuff bị Remove. Tên đã có gọi Extend trên instance hiện có. Register đặt persists=false cho entity hiệu ứng và theo dõi onremove để xóa entry, sau đó Debuff.AttachTo gọi callback của prefab. [components/debuffable.lua:72–108](../source/scripts/components/debuffable.lua) · [components/debuff.lua:35–64](../source/scripts/components/debuff.lua).

**Gỡ và persistence.** Disable component sẽ gỡ mọi hiệu ứng. RemoveOnDespawn giữ loại keepondespawn. OnSave vẫn lấy GetSaveRecord của các entity effect và đánh dấu add_component_if_missing; Load SpawnSaveRecord rồi RegisterDebuff nếu tên chưa có. RemoveDebuff gỡ listener trước khi gọi OnDetach, tránh xóa entry hai lần qua callback onremove. [components/debuffable.lua:28–49](../source/scripts/components/debuffable.lua) · [components/debuffable.lua:110–161](../source/scripts/components/debuffable.lua).

**Choáng và tỉnh lại.** AddGrogginess bỏ qua lượng<=0 hoặc immunity, tích grog_amount và khởi động update; knockouttestfn quyết định KnockOut. OnUpdate giảm grog_amount bởi decayrate mỗi lần gọi, không nhân dt ở dòng trừ này. Knockouttime và wearofftime mới cộng dt, cometotestfn và wearoffduration quyết định tỉnh/dừng update. [components/grogginess.lua:163–187](../source/scripts/components/grogginess.lua) · [components/grogginess.lua:272–310](../source/scripts/components/grogginess.lua).

**Phần còn phải kiểm tra trong nhóm này.**

- Thời hạn, cộng dồn và gỡ modifier cụ thể do callback trong từng prefab buff quyết định, chưa duyệt toàn bộ các prefab.
- Grogginess.TransferComponent đã đọc, còn ghi save và khôi phục trạng thái knockout phải theo entity/stategraph.
