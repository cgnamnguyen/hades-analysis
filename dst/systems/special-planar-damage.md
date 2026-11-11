# Loại sát thương, phản đòn, điện và planar

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm loại sát thương, phản đòn, điện và planar theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [components/damagereflect.lua:1](../source/scripts/components/damagereflect.lua) — text-lua

- [components/damagetypebonus.lua:1](../source/scripts/components/damagetypebonus.lua) — text-lua

- [components/damagetyperesist.lua:1](../source/scripts/components/damagetyperesist.lua) — text-lua

- [components/electricattacks.lua:1](../source/scripts/components/electricattacks.lua) — text-lua

- [components/explosiveresist.lua:1](../source/scripts/components/explosiveresist.lua) — text-lua

- [components/planardamage.lua:1](../source/scripts/components/planardamage.lua) — text-lua

- [components/planardefense.lua:1](../source/scripts/components/planardefense.lua) — text-lua

- [components/planarentity.lua:1](../source/scripts/components/planarentity.lua) — text-lua

- [components/resistance.lua:1](../source/scripts/components/resistance.lua) — text-lua

- [components/spdamageutil.lua:1](../source/scripts/components/spdamageutil.lua) — text-lua

## Đọc sâu mã nguồn — 08/11/2026

**Mức bằng chứng bổ sung — source-traced-partial.** Đã xác định công thức planar, phòng thủ riêng và cách cộng/nhân theo tag.

**Tạo lượng planar.** PlanarDamage.GetDamage trả basedamage × tích externalmultipliers + tổng externalbonuses. PlanarDefense.GetDefense dùng cùng cấu trúc với basedefense. Modifier gắn theo source/key nên thêm lại cùng key cần đi qua SourceModifierList, không cộng trực tiếp mọi lần gọi. [components/planardamage.lua:1–46](../source/scripts/components/planardamage.lua) · [components/planardefense.lua:1–46](../source/scripts/components/planardefense.lua).

**Trừ phòng thủ.** SpDamageUtil chỉ tạo entry khi lượng damage dương. ApplySpDefense xử lý từng loại. Nếu damage > defense, kết quả là (damage-defense) × takenMult + takenBonus; nếu không, là takenBonus - (defense-damage). Entry không dương bị xóa và bảng rỗng trở thành nil trước khi cộng tổng vào đòn. [components/spdamageutil.lua:52–115](../source/scripts/components/spdamageutil.lua).

**Kháng theo tag và planar entity.** DamageTypeBonus nhân các modifier của tag nằm trên target cùng callback bonus. DamageTypeResist nhân modifier khi tag nằm trên attacker hoặc weapon. PlanarEntity.AbsorbDamage đổi phần damage thường thành (sqrt(4×damage+64)-8)×4 và giữ bảng spdamage, phát hiệu ứng kháng nếu đòn không có planar. [components/damagetypebonus.lua:42–56](../source/scripts/components/damagetypebonus.lua) · [components/damagetyperesist.lua:27–41](../source/scripts/components/damagetyperesist.lua) · [components/planarentity.lua:7–39](../source/scripts/components/planarentity.lua).

**Phần còn phải kiểm tra trong nhóm này.**

- Chưa liệt kê toàn bộ prefab tạo modifier hoặc thời điểm gỡ từng key.
- Các component planar này không có OnSave/OnLoad trong file đã đọc. Nguồn modifier cần được dựng lại bởi prefab, equipment hoặc buff khi tải.
