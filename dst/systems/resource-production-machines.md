# Máy móc, năng lượng và sản xuất

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm máy móc, năng lượng và sản xuất theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [components/battery.lua:1](../source/scripts/components/battery.lua) — text-lua

- [components/batteryuser.lua:1](../source/scripts/components/batteryuser.lua) — text-lua

- [components/circuitnode.lua:1](../source/scripts/components/circuitnode.lua) — text-lua

- [components/incrementalproducer.lua:1](../source/scripts/components/incrementalproducer.lua) — text-lua

- [components/machine.lua:1](../source/scripts/components/machine.lua) — text-lua

- [components/powerload.lua:1](../source/scripts/components/powerload.lua) — text-lua

- [components/reloaditem.lua:1](../source/scripts/components/reloaditem.lua) — text-lua

- [components/socketable.lua:1](../source/scripts/components/socketable.lua) — text-lua

- [components/socketholder.lua:1](../source/scripts/components/socketholder.lua) — text-lua

- [components/socket_shadow_harvester.lua:1](../source/scripts/components/socket_shadow_harvester.lua) — text-lua

- [components/socket_shadow_heart.lua:1](../source/scripts/components/socket_shadow_heart.lua) — text-lua

- [components/socket_shadow_mimicry.lua:1](../source/scripts/components/socket_shadow_mimicry.lua) — text-lua

- [components/upgradeable.lua:1](../source/scripts/components/upgradeable.lua) — text-lua

- [components/upgrademodule.lua:1](../source/scripts/components/upgrademodule.lua) — text-lua

- [components/upgrademoduleowner.lua:1](../source/scripts/components/upgrademoduleowner.lua) — text-lua

- [components/upgrademoduleremover.lua:1](../source/scripts/components/upgrademoduleremover.lua) — text-lua

- [components/upgrader.lua:1](../source/scripts/components/upgrader.lua) — text-lua

- [prefabs/winch.lua:1](../source/scripts/prefabs/winch.lua) — text-lua

- [prefabs/winona.lua:1](../source/scripts/prefabs/winona.lua) — text-lua

- [prefabs/winona_battery_high.lua:1](../source/scripts/prefabs/winona_battery_high.lua) — text-lua

- [prefabs/winona_battery_low.lua:1](../source/scripts/prefabs/winona_battery_low.lua) — text-lua

- [prefabs/winona_battery_sparks.lua:1](../source/scripts/prefabs/winona_battery_sparks.lua) — text-lua

- [prefabs/winona_catapult.lua:1](../source/scripts/prefabs/winona_catapult.lua) — text-lua

- [prefabs/winona_catapult_projectile.lua:1](../source/scripts/prefabs/winona_catapult_projectile.lua) — text-lua

- [prefabs/winona_holoitems.lua:1](../source/scripts/prefabs/winona_holoitems.lua) — text-lua

- [prefabs/winona_remote.lua:1](../source/scripts/prefabs/winona_remote.lua) — text-lua

- [prefabs/winona_spotlight.lua:1](../source/scripts/prefabs/winona_spotlight.lua) — text-lua

- [prefabs/winona_storage_robot.lua:1](../source/scripts/prefabs/winona_storage_robot.lua) — text-lua

- [prefabs/winona_telebrella.lua:1](../source/scripts/prefabs/winona_telebrella.lua) — text-lua

- [prefabs/winona_teleport_pad.lua:1](../source/scripts/prefabs/winona_teleport_pad.lua) — text-lua

<!-- deep-review-root-start -->

## Đọc sâu mã nguồn — 08/11/2026

Bật máy, cooldown và sản xuất từng đơn vị.

Mức đối chiếu của phần này là `source-traced-partial`.

- Machine giữ ison/enabled/cooldown qua setter tag. TurnOn/TurnOff khởi động cooldown, gọi callback riêng rồi đổi ison và phát sự kiện. CanInteract chặn fueldepleted, vật đang được giữ nhưng chưa equip và máy disabled.
- Cooldown mặc định3 giây, task cũ bị hủy khi khởi động lại. OnSave chỉ ghi ison; OnLoad đặt lại ison rồi chạy TurnOn hoặc TurnOff, nên callback và cooldown được dựng lại.
- IncrementalProducer lấy count/max/increment từ callback. Khi quá delay và count<max, lượng chờ được clamp vào chỗ trống; DoProduce gọi producefn rồi giảm lượng chờ1 và ghi lastproduction. Battery dùng callback kiểm tra/tiêu thụ và có resolver cho sạc một phần.
- CircuitNode.ConnectTo chỉ nối entity khác còn visible, có circuitnode đã enabled và trong phạm vi. Cấu hình có thể trừ footprint của đối tác và buộc cùng platform. AddNode tăng numnodes, gọi onconnectfn rồi thêm quan hệ ngược; guard bảng nodes ngăn đệ quy tạo trùng.
- RemoveNode bỏ liên kết trước callback và gọi bỏ chiều ngược. Disconnect tháo tới khi hết node rồi đặt nodes=nil. Vì vậy IsEnabled (nodes~=nil) khác IsConnected (numnodes>0); trạng thái không có láng giềng vẫn có thể enabled.

**Lưu/tải.** Machine ghi cờ bật; core incrementalproducer không có OnSave/OnLoad. Cách giữ sản lượng và năng lượng dài hạn do prefab/consumer quyết định.

**Phần còn hở.** Công suất, mức tiêu hao và socket của từng máy nằm ở consumer; chưa đọc đầy đủ tất cả30 module/prefab máy.

[components/machine.lua dòng 17–115](../source/scripts/components/machine.lua) · [components/incrementalproducer.lua dòng 2–55](../source/scripts/components/incrementalproducer.lua) · [components/battery.lua dòng 24–47](../source/scripts/components/battery.lua) · [components/circuitnode.lua dòng 1–112](../source/scripts/components/circuitnode.lua)

<!-- deep-review-root-end -->
