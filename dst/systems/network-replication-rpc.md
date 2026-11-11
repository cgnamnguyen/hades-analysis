# Replication, netvars và RPC

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm replication, netvars và rpc theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [entityreplica.lua:1](../source/scripts/entityreplica.lua) — text-lua

- [entityscriptproxy.lua:1](../source/scripts/entityscriptproxy.lua) — text-lua

- [netvars.lua:1](../source/scripts/netvars.lua) — text-lua

- [networkclientrpc.lua:1](../source/scripts/networkclientrpc.lua) — text-lua

- [networking.lua:1](../source/scripts/networking.lua) — text-lua

- [socket.lua:1](../source/scripts/socket.lua) — text-lua

- [components/builder_replica.lua:1](../source/scripts/components/builder_replica.lua) — text-lua

- [components/combat_replica.lua:1](../source/scripts/components/combat_replica.lua) — text-lua

- [components/constructionsite_replica.lua:1](../source/scripts/components/constructionsite_replica.lua) — text-lua

- [components/container_replica.lua:1](../source/scripts/components/container_replica.lua) — text-lua

- [components/equippable_replica.lua:1](../source/scripts/components/equippable_replica.lua) — text-lua

- [components/fishingrod_replica.lua:1](../source/scripts/components/fishingrod_replica.lua) — text-lua

- [components/follower_replica.lua:1](../source/scripts/components/follower_replica.lua) — text-lua

- [components/fueled_replica.lua:1](../source/scripts/components/fueled_replica.lua) — text-lua

- [components/health_replica.lua:1](../source/scripts/components/health_replica.lua) — text-lua

- [components/hunger_replica.lua:1](../source/scripts/components/hunger_replica.lua) — text-lua

- [components/inventoryitem_replica.lua:1](../source/scripts/components/inventoryitem_replica.lua) — text-lua

- [components/inventory_replica.lua:1](../source/scripts/components/inventory_replica.lua) — text-lua

- [components/moisture_replica.lua:1](../source/scripts/components/moisture_replica.lua) — text-lua

- [components/named_replica.lua:1](../source/scripts/components/named_replica.lua) — text-lua

- [components/oceanfishingrod_replica.lua:1](../source/scripts/components/oceanfishingrod_replica.lua) — text-lua

- [components/rider_replica.lua:1](../source/scripts/components/rider_replica.lua) — text-lua

- [components/sanity_replica.lua:1](../source/scripts/components/sanity_replica.lua) — text-lua

- [components/sheltered_replica.lua:1](../source/scripts/components/sheltered_replica.lua) — text-lua

- [components/stackable_replica.lua:1](../source/scripts/components/stackable_replica.lua) — text-lua

- [components/writeable_replica.lua:1](../source/scripts/components/writeable_replica.lua) — text-lua

<!-- deep-review-root-start -->

## Đọc sâu mã nguồn — 08/11/2026

Replication theo component và kiểm tra yêu cầu tạo nhân vật.

Mức đối chiếu của phần này là `source-traced-partial`.

- EntityReplica chỉ nạp component trong REPLICATABLE_COMPONENTS. Master dùng tag _name và __name để biểu diễn có component hoặc đã prereplicate; client nạp class name_replica qua require và AttachClassified sau.
- net_event.push thực hiện set_local(true) rồi set(true) để phát lại tín hiệu. GetIdealUnsignedNetVarForCount chọn tiny/small/byte/ushort/uint theo ngưỡng 7,63,255,65535 và 4294967295; lớn hơn trả nil.
- Yêu cầu spawn được so với danh sách nhân vật gốc/mod và quyền seamless swap. Skin/clothing được xác thực ownership và loại vật; prefab không hợp lệ có fallback nhân vật. VerifySpawnNewPlayerOnServerRequest từ chối khi world/lobby chưa cho spawn.
- RPC LeftClick chấp nhận bộ tham số cùng nil hoặc bộ đã qua kiểm kiểu. Tham số sai phát invalidrpc và trả trước khi gọi playercontroller. Tọa độ platform-relative cần platform tồn tại để đổi về world space.
- Sau đổi tọa độ, khoảng cách bình phương từ player tới điểm click phải không vượt4096 mới gọi OnRemoteLeftClick. Kết quả kiểm này vẫn phải qua điều kiện action/SG của playercontroller; nó chưa cấp quyền thực hiện mọi thao tác lên target.

**Lưu/tải.** SerializeUserSession kiểm tra userid và local-player/server trước khi lấy record và chuyển dữ liệu sang TheNet. netvars chưa phải bản lưu bền vững.

**Phần còn hở.** Đóng gói packet, độ tin cậy transport và mọi RPC khác nằm ở native hoặc handler chưa đọc từng nhánh.

[entityreplica.lua dòng 5–101](../source/scripts/entityreplica.lua) · [netvars.lua dòng 83–110](../source/scripts/netvars.lua) · [networking.lua dòng 181–254](../source/scripts/networking.lua) · [networkclientrpc.lua dòng 1–111](../source/scripts/networkclientrpc.lua)

<!-- deep-review-root-end -->
