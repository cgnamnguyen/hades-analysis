# Thuyền, sàn nổi và chuyển động hàng hải

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm thuyền, sàn nổi và chuyển động hàng hải theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

BoatPhysics gộp lực chèo, cột buồm, neo và hướng bánh lái rồi cập nhật vận tốc thuyền.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- DoApplyForce cộng lực theo hai trục rồi clamp độ dài vận tốc tới BOAT.MAX_ALLOWED_VELOCITY. ApplyRowForce tách lực thuận theo vận tốc hiện tại và lực ngang, áp dampening/easing trước khi cộng.

- GetMaxVelocity gom vận tốc của các mast có giá trị khác 0, sắp tăng dần rồi cộng với trọng số 1, 0.7, 0.7²…; magnets được tính thành một dãy trọng số riêng. Kết quả nhân self.max_velocity và các max_velocity_mod của nguồn drag rồi giới hạn bởi MAX_ALLOWED_VELOCITY.

- OnUpdate nội suy hướng bánh lái qua góc ngắn, dùng tốc độ quay phụ thuộc vận tốc và phát stopturning khi sai lệch nhỏ. Lực buồm là tổng CalcSailForce nhân tích sailforcemodifier; lực magnet đòi beacon đã ghép và chưa tắt.

### Nguồn đối chiếu

- [components/boatphysics.lua:299–338](../source/scripts/components/boatphysics.lua).

- [components/boatphysics.lua:344–440](../source/scripts/components/boatphysics.lua).

- [components/boatphysics.lua:506–563](../source/scripts/components/boatphysics.lua).

### Phạm vi còn hở

- Các hằng số lực/drag cần gắn từng prefab mast, oar, anchor để mô tả trang bị cụ thể. Collision solver, tiếp xúc bờ và độ ổn định mạng còn phụ thuộc engine.

- Cần đọc tiếp đoạn tích phân cuối OnUpdate và các liên kết save/load toàn bộ platform trước khi mô phỏng chính xác nhiều người đứng trên thuyền.

<!-- deep-review-world-ecology:end -->

- [components/anchor.lua:1](../source/scripts/components/anchor.lua) — text-lua

- [components/boatdrag.lua:1](../source/scripts/components/boatdrag.lua) — text-lua

- [components/boatdrifter.lua:1](../source/scripts/components/boatdrifter.lua) — text-lua

- [components/boatphysics.lua:1](../source/scripts/components/boatphysics.lua) — text-lua

- [components/boatrotator.lua:1](../source/scripts/components/boatrotator.lua) — text-lua

- [components/mast.lua:1](../source/scripts/components/mast.lua) — text-lua

- [components/oar.lua:1](../source/scripts/components/oar.lua) — text-lua

- [components/steeringwheel.lua:1](../source/scripts/components/steeringwheel.lua) — text-lua

- [components/steeringwheeluser.lua:1](../source/scripts/components/steeringwheeluser.lua) — text-lua

- [components/walkableplatform.lua:1](../source/scripts/components/walkableplatform.lua) — text-lua

- [components/walkableplatformmanager.lua:1](../source/scripts/components/walkableplatformmanager.lua) — text-lua

- [components/walkableplatformplayer.lua:1](../source/scripts/components/walkableplatformplayer.lua) — text-lua

- [prefabs/anchor.lua:1](../source/scripts/prefabs/anchor.lua) — text-lua

- [prefabs/boat.lua:1](../source/scripts/prefabs/boat.lua) — text-lua

- [prefabs/mast.lua:1](../source/scripts/prefabs/mast.lua) — text-lua

- [prefabs/mastupgrade_lamp.lua:1](../source/scripts/prefabs/mastupgrade_lamp.lua) — text-lua

- [prefabs/mastupgrade_lightningrod.lua:1](../source/scripts/prefabs/mastupgrade_lightningrod.lua) — text-lua

- [prefabs/mast_broken.lua:1](../source/scripts/prefabs/mast_broken.lua) — text-lua

- [prefabs/oar.lua:1](../source/scripts/prefabs/oar.lua) — text-lua
