# Hư hại, sửa chữa, trang bị và thuỷ thủ thuyền

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm hư hại, sửa chữa, trang bị và thuỷ thủ thuyền theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

Va chạm chọn một vùng rò trên thân thuyền; miếng vá là trạng thái có thời hạn và được ghi riêng.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- HullHealth.OnCollide tìm vùng rò gần góc va chạm trong sáu vị trí. Nó lọc theo độ thẳng góc va chạm, cho bumper nhận damage rồi return nếu bumper bảo vệ điểm chạm. Với vận tốc tiếp tuyến lớn hơn 2, vùng rò tăng tối đa tới 1; sát thương máu thân còn dùng ngưỡng BOAT.OARS.MALBATROSS.FORCE và floor(max_health_damage × velocity_ratio × damage_mult).

- BoatLeak.Repair chỉ nhận entity có tag boat_leak. Nó thử repairer của vật vá lên platform; nếu chưa bị consume ở đó, lấy một item trong stack hoặc xóa item. Sau 0.4 giây chuyển sang repaired hoặc repaired_<patch_type>. ChangeToRepaired bỏ tag rò, dừng âm rò và gọi onrepairedleak.

- HullHealth.Save giữ leak_point, leak_damage, leak_state và thời gian vá còn lại; LoadPostPass dựng lại chỉ báo và trạng thái. Leak động có save riêng, Load chờ một task để tìm platform; không tìm thấy thuyền thì xóa leak. LongUpdate trừ thời gian vá còn lại, hết hạn chuyển med_leak.

### Nguồn đối chiếu

- [components/hullhealth.lua:137–212](../source/scripts/components/hullhealth.lua).

- [components/hullhealth.lua:237–288](../source/scripts/components/hullhealth.lua).

- [components/boatleak.lua:62–121](../source/scripts/components/boatleak.lua).

- [components/boatleak.lua:287–337](../source/scripts/components/boatleak.lua).

### Phạm vi còn hở

- Chưa trace đủ nhiệm vụ boatcrew/cannon/magnet và các loại patch để khẳng định sức bền hay chi phí mọi trang bị.

- Thao tác Repair gọi Remove item trước khi đọc boatpatch, nên cần quan sát lifecycle engine để xác nhận mọi callback của item đã tiêu.

<!-- deep-review-world-ecology:end -->

- [components/boatcannon.lua:1](../source/scripts/components/boatcannon.lua) — text-lua

- [components/boatcannonuser.lua:1](../source/scripts/components/boatcannonuser.lua) — text-lua

- [components/boatcrew.lua:1](../source/scripts/components/boatcrew.lua) — text-lua

- [components/boatleak.lua:1](../source/scripts/components/boatleak.lua) — text-lua

- [components/boatmagnet.lua:1](../source/scripts/components/boatmagnet.lua) — text-lua

- [components/boatmagnetbeacon.lua:1](../source/scripts/components/boatmagnetbeacon.lua) — text-lua

- [components/boatpatch.lua:1](../source/scripts/components/boatpatch.lua) — text-lua

- [components/crewmember.lua:1](../source/scripts/components/crewmember.lua) — text-lua

- [components/drownable.lua:1](../source/scripts/components/drownable.lua) — text-lua

- [components/embarker.lua:1](../source/scripts/components/embarker.lua) — text-lua

- [components/expertsailor.lua:1](../source/scripts/components/expertsailor.lua) — text-lua

- [components/hull.lua:1](../source/scripts/components/hull.lua) — text-lua

- [components/hullhealth.lua:1](../source/scripts/components/hullhealth.lua) — text-lua

- [prefabs/boat_bumpers.lua:1](../source/scripts/prefabs/boat_bumpers.lua) — text-lua

- [prefabs/boat_cannon.lua:1](../source/scripts/prefabs/boat_cannon.lua) — text-lua

- [prefabs/boat_leak.lua:1](../source/scripts/prefabs/boat_leak.lua) — text-lua

- [prefabs/boat_magnet.lua:1](../source/scripts/prefabs/boat_magnet.lua) — text-lua

- [prefabs/boat_magnet_beacon.lua:1](../source/scripts/prefabs/boat_magnet_beacon.lua) — text-lua

- [prefabs/boat_rotator.lua:1](../source/scripts/prefabs/boat_rotator.lua) — text-lua

- [prefabs/boat_water_fx.lua:1](../source/scripts/prefabs/boat_water_fx.lua) — text-lua
