# Trang bị, giáp, độ bền và sửa chữa

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm trang bị, giáp, độ bền và sửa chữa theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật. Chỉ entrypoint và nhánh đã ghi chú được đọc sâu; không gắn nhãn toàn bộ glob là đã dịch ngược.

- [equipslotutil.lua:1](../source/scripts/equipslotutil.lua) — text-lua

- [components/armor.lua:1](../source/scripts/components/armor.lua) — text-lua

- [components/equippable.lua:1](../source/scripts/components/equippable.lua) — text-lua

- [components/equippable_replica.lua:1](../source/scripts/components/equippable_replica.lua) — text-lua

- [components/finiteuses.lua:1](../source/scripts/components/finiteuses.lua) — text-lua

- [components/repairable.lua:1](../source/scripts/components/repairable.lua) — text-lua

- [components/repairer.lua:1](../source/scripts/components/repairer.lua) — text-lua

- [components/setbonus.lua:1](../source/scripts/components/setbonus.lua) — text-lua

- [components/sewing.lua:1](../source/scripts/components/sewing.lua) — text-lua

## Đọc sâu mã nguồn — 08/11/2026

**Mức bằng chứng bổ sung — source-traced-partial.** Đã nối hấp thụ damage, chia hao mòn giáp, số lần dùng và sửa chữa.

**Hấp thụ qua equipment.** Inventory.ApplyDamage thử resistance trước, nhánh hợp lệ có thể trả 0,nil ngay. Các armor hợp lệ dùng mức absorb lớn nhất để chặn damage thường. Phần hao mòn được chia theo tỷ lệ absorb của từng armor trên tổng absorb, cộng weakness bonus. Planar đi qua các spdefender theo phần chia đều lặp lại và cộng lượng chặn vào hao mòn armor nếu có. [components/inventory.lua:408–499](../source/scripts/components/inventory.lua).

**Giáp hỏng và sửa.** Armor.TakeDamage nhân conditionlossmultipliers rồi SetCondition. SetCondition giới hạn trên maxcondition, giữ nguyên nếu indestructible; khi condition<=0 gọi onfinished và Remove nếu không keeponfinished. Repair cộng condition và gọi callback repair. Save chỉ ghi condition nếu khác max, load qua SetCondition nên callback cạn có thể áp lại. [components/armor.lua:93–124](../source/scripts/components/armor.lua) · [components/armor.lua:126–171](../source/scripts/components/armor.lua).

**Số lần sử dụng.** FiniteUses.SetUses khi chuyển từ dương sang cạn đặt usesdepleted và gọi onfinished một lần cho lần chuyển đó. OnUsedAsItem lấy consumption[action], nhân efficientuser rồi qua modifyuseconsumption. Repair chặn trên total. Save giữ uses khi khác total hoặc doesnotstartfull, Load gọi SetUses. [components/finiteuses.lua:48–129](../source/scripts/components/finiteuses.lua).

**Sửa bằng vật liệu.** Repairable.Repair kiểm tra testvalidrepairfn, component Repairer, repairmaterial trùng và checkmaterialfn trước khi sửa. address_repair_amount ưu tiên health rồi workable, perishable và finiteuses, từ chối loại đã đầy hoặc không hợp lệ. Chỉ sau khi sửa thành công nó mới tiêu một đơn vị stack hoặc entity repair item, phát âm thanh và onrepaired. [components/repairable.lua:106–182](../source/scripts/components/repairable.lua).

**Phần còn phải kiểm tra trong nhóm này.**

- Chưa đọc toàn bộ Sewing và callback repair của từng prefab/vật liệu.
- Chưa xác minh riêng các slot/mount và override armor của từng nhân vật trong phiên chạy.
