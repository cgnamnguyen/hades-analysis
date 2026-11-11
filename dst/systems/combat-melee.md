# Chiến đấu cận chiến và chọn mục tiêu

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm chiến đấu cận chiến và chọn mục tiêu theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật. Chỉ entrypoint và nhánh đã ghi chú được đọc sâu; không gắn nhãn toàn bộ glob là đã dịch ngược.

- [components/attackdodger.lua:1](../source/scripts/components/attackdodger.lua) — text-lua

- [components/combat.lua:1](../source/scripts/components/combat.lua) — text-lua

- [components/combat_replica.lua:1](../source/scripts/components/combat_replica.lua) — text-lua

- [components/grouptargeter.lua:1](../source/scripts/components/grouptargeter.lua) — text-lua

- [components/targettracker.lua:1](../source/scripts/components/targettracker.lua) — text-lua

- [components/teamattacker.lua:1](../source/scripts/components/teamattacker.lua) — text-lua

- [components/teamleader.lua:1](../source/scripts/components/teamleader.lua) — text-lua

- [components/weapon.lua:1](../source/scripts/components/weapon.lua) — text-lua

## Đọc sâu mã nguồn — 08/11/2026

**Mức bằng chứng bổ sung — source-traced-partial.** Đã nối yêu cầu ra đòn tới sát thương, giáp, phản đòn và hao mòn vũ khí.

**Đánh trúng và đánh hụt.** DoAttack lấy target và weapon mặc định nếu caller bỏ trống. CanHitTarget thất bại hoặc AOEarc chuyển sang onmissother, có thể thực hiện DoAreaAttack và luôn dọn khoảng đánh tạm trước khi trả về. Vũ khí ném được tách khỏi inventory rồi Throw hoặc Launch, còn vũ khí có đạn riêng gọi LaunchProjectile và thoát khỏi nhánh melee. [components/combat.lua:1095–1165](../source/scripts/components/combat.lua).

**Đường nhận đòn.** GetAttacked bỏ qua xử lý mới khi mục tiêu đã chết. Với mục tiêu có health, dodge có thể đặt damage=0 và xóa spdamage, inventory/saddle xử lý phần bảo vệ trước các hệ số kháng và planar. Sau Health.DoDelta, hàm phát killed khi đã chết, rồi phát attacked/onhitother hoặc blocked tùy kết quả. Damage redirect được gọi riêng tới combat của mục tiêu thay thế. [components/combat.lua:568–712](../source/scripts/components/combat.lua).

**Điện, phản đòn và độ bền.** Đòn điện lên đối tượng chưa miễn nhiễm dùng electric_damage_mult + electric_wet_damage_mult × GetWetMultiplier. Sau đòn chính, Weapon.OnAttack tính attackwear × attackwearmultipliers và modifier efficientuser rồi trừ finiteuses, trừ các nhánh ignore hoặc projectile đã bounce. Reflected damage được trả về người đánh sau khi hoàn tất đòn chính. [components/combat.lua:1167–1217](../source/scripts/components/combat.lua) · [components/weapon.lua:94–155](../source/scripts/components/weapon.lua).

**Phần còn phải kiểm tra trong nhóm này.**

- Chưa duyệt toàn bộ callback của từng prefab/vũ khí và từng stategraph đặc thù.
- Combat component không tự lưu cooldown trong các nhánh đã đọc. Cách khôi phục vị trí, target và lịch attack khi tải còn phụ thuộc prefab/stategraph và engine.
