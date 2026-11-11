# Đạn, đòn diện rộng và ngắm

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm đạn, đòn diện rộng và ngắm theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [components/aoecharging.lua:1](../source/scripts/components/aoecharging.lua) — text-lua

- [components/aoediminishingreturns.lua:1](../source/scripts/components/aoediminishingreturns.lua) — text-lua

- [components/aoespell.lua:1](../source/scripts/components/aoespell.lua) — text-lua

- [components/aoetargeting.lua:1](../source/scripts/components/aoetargeting.lua) — text-lua

- [components/aoeweapon_base.lua:1](../source/scripts/components/aoeweapon_base.lua) — text-lua

- [components/aoeweapon_leap.lua:1](../source/scripts/components/aoeweapon_leap.lua) — text-lua

- [components/aoeweapon_lunge.lua:1](../source/scripts/components/aoeweapon_lunge.lua) — text-lua

- [components/chargingreticule.lua:1](../source/scripts/components/chargingreticule.lua) — text-lua

- [components/complexprojectile.lua:1](../source/scripts/components/complexprojectile.lua) — text-lua

- [components/projectile.lua:1](../source/scripts/components/projectile.lua) — text-lua

- [components/reticule.lua:1](../source/scripts/components/reticule.lua) — text-lua

- [prefabs/brilliance_projectile_fx.lua:1](../source/scripts/prefabs/brilliance_projectile_fx.lua) — text-lua

- [prefabs/cannon_aoe_range_fx.lua:1](../source/scripts/prefabs/cannon_aoe_range_fx.lua) — text-lua

- [prefabs/chum_aoe.lua:1](../source/scripts/prefabs/chum_aoe.lua) — text-lua

- [prefabs/eyeofterror_mini_projectile.lua:1](../source/scripts/prefabs/eyeofterror_mini_projectile.lua) — text-lua

- [prefabs/gestalt_alterguardian_projectile.lua:1](../source/scripts/prefabs/gestalt_alterguardian_projectile.lua) — text-lua

- [prefabs/monkeyprojectile.lua:1](../source/scripts/prefabs/monkeyprojectile.lua) — text-lua

- [prefabs/reticuleaoe.lua:1](../source/scripts/prefabs/reticuleaoe.lua) — text-lua

- [prefabs/shadowthrall_projectile_fx.lua:1](../source/scripts/prefabs/shadowthrall_projectile_fx.lua) — text-lua

- [prefabs/slingshotaoefx.lua:1](../source/scripts/prefabs/slingshotaoefx.lua) — text-lua

- [prefabs/staff_projectile.lua:1](../source/scripts/prefabs/staff_projectile.lua) — text-lua

- [prefabs/wagdrone_projectile.lua:1](../source/scripts/prefabs/wagdrone_projectile.lua) — text-lua

- [prefabs/waterprojectiles.lua:1](../source/scripts/prefabs/waterprojectiles.lua) — text-lua

- [prefabs/winona_catapult_projectile.lua:1](../source/scripts/prefabs/winona_catapult_projectile.lua) — text-lua

- [prefabs/wx78_taser_projectile.lua:1](../source/scripts/prefabs/wx78_taser_projectile.lua) — text-lua

## Đọc sâu mã nguồn — 08/11/2026

**Mức bằng chứng bổ sung — source-traced-partial.** Đã đọc vòng đời projectile thông thường và thứ tự ưu tiên hiệu ứng của AOEWeapon_Base.

**Tạo và phóng projectile.** Weapon.LaunchProjectile sinh prefab rồi chọn Projectile.Throw hoặc ComplexProjectile.Launch theo component có thật. Throw lưu owner/target/start/dest, đặt motor velocity, bắt đầu update, gắn activeprojectile và phát onthrown/hostileprojectile. Target có catcher được yêu cầu StartWatching nếu projectile cho phép bắt. [components/weapon.lua:123–155](../source/scripts/components/weapon.lua) · [components/projectile.lua:149–181](../source/scripts/components/projectile.lua).

**Hit, miss và dọn trạng thái.** Hit giữ attacker/weapon cục bộ trước khi Stop xóa owner/target, dừng Physics rồi gọi onprehit. Khi attacker có combat, Hit tạm bật ignorehitrange để thực hiện DoAttack và khôi phục cờ, sau đó gọi onhit. Miss cũng Stop trước callback onmiss. Stop gỡ activeprojectile, hủy dozeOffTask và xóa dữ liệu stuck tracking. [components/projectile.lua:183–250](../source/scripts/components/projectile.lua).

**Thứ tự xử lý AOE.** AOEWeapon_Base.OnHit thử mục tiêu workable hợp lệ trước và Destroy nó, với DIG loại trừ spawner/childspawner. Sau đó mới thử pickable có thể thu và không intense, rồi tới combat target không phải ally. Callback onhit chỉ chạy khi một nhánh thành công, còn lại gọi onmiss. [components/aoeweapon_base.lua:86–139](../source/scripts/components/aoeweapon_base.lua).

**Phần còn phải kiểm tra trong nhóm này.**

- Quỹ đạo, va chạm complexprojectile, leap/lunge và mỗi callback projectile prefab còn cần đối chiếu riêng.
- Các hàm đã đọc không giữ trạng thái đạn đang bay trong OnSave. Cần đọc prefab lưu/tải trước khi tái tạo projectile xuyên phiên.
