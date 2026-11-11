# Cổng, dịch chuyển và đi giữa thế giới

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm cổng, dịch chuyển và đi giữa thế giới theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

Teleporter nội thế giới và WorldMigrator liên shard có điều kiện, vật mang theo và save khác nhau.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- Teleporter.IsActive cần enabled và exit tạm, exit thường hoặc migration_data. Activate gọi onActivate trước; migration_data chỉ phát ms_playerdespawnandmigrate khi khác shard hiện tại và shard đích available. Nhánh thường gọi Teleport và ReceivePlayer/ReceiveItem rồi đưa followers qua, trừ follower noleashing hoặc đang được cầm trong inventory.

- WorldMigrator.Activate trả NODESTINATION nếu chưa linkedWorld. Player chưa _despawning phát migration_activate rồi ms_playerdespawnandmigrate. Item irreplaceable hoặc còn migrationpetowner pet không được đưa qua; TryToMakeItemMigrateable có thể OnStopUsing để tháo cặp pet. Item hợp lệ tạo Shard_CreateTransaction_TransferInventoryItem kèm worldid/portalid/sessionid.

- Teleporter save target GUID khi saveenabled và target tồn tại; LoadPostPass nối GUID. WorldMigrator save id, linkedWorld, receivedPortal và auto; Load tương thích typo recievedPortal của save cũ và mặc định auto=true.

### Nguồn đối chiếu

- [components/teleporter.lua:43–164](../source/scripts/components/teleporter.lua).

- [components/teleporter.lua:373–417](../source/scripts/components/teleporter.lua).

- [components/worldmigrator.lua:157–258](../source/scripts/components/worldmigrator.lua).

### Phạm vi còn hở

- Cross-shard transaction, rollback khi shard đích mất kết nối, arrival safe point và mọi chi phí sanity của wormhole cần consumer/RPC riêng.

- Đã nối chỉ số #items không cộng1 tới khả năng đè record khóa0 và thời gian chờ lại3,5 giây khi tải. Cần serializer/snapshot để xác minh kết quả in-flight thực tế.

<!-- deep-review-world-ecology:end -->

- [components/migrationmanager.lua:1](../source/scripts/components/migrationmanager.lua) — text-lua

- [components/migrationpetowner.lua:1](../source/scripts/components/migrationpetowner.lua) — text-lua

- [components/migrationpetsoverrider.lua:1](../source/scripts/components/migrationpetsoverrider.lua) — text-lua

- [components/positionalwarp.lua:1](../source/scripts/components/positionalwarp.lua) — text-lua

- [components/remoteteleporter.lua:1](../source/scripts/components/remoteteleporter.lua) — text-lua

- [components/teleporter.lua:1](../source/scripts/components/teleporter.lua) — text-lua

- [components/townportalregistry.lua:1](../source/scripts/components/townportalregistry.lua) — text-lua

- [components/worldmigrator.lua:1](../source/scripts/components/worldmigrator.lua) — text-lua

- [prefabs/cave_entrance.lua:1](../source/scripts/prefabs/cave_entrance.lua) — text-lua

- [prefabs/cave_exit.lua:1](../source/scripts/prefabs/cave_exit.lua) — text-lua

- [prefabs/multiplayer_portal.lua:1](../source/scripts/prefabs/multiplayer_portal.lua) — text-lua

- [prefabs/wormhole.lua:1](../source/scripts/prefabs/wormhole.lua) — text-lua

- [prefabs/wormhole_limited.lua:1](../source/scripts/prefabs/wormhole_limited.lua) — text-lua

<!-- continuation-review-start -->

## Đọc tiếp lưu/tải và các consumer — 08/11/2026

- Teleporter.ReceiveItem giữ item làm child, RemoveFromScene và hẹn3,5 giây. OnSave chỉ gom item.persists, ghi bằng data.items[#data.items] vào bảng ban đầu rỗng. Theo quy tắc bảng Lua thông thường, lần đầu ghi khóa0, không thêm ô1; các lần sau vẫn ghi khóa0 nên đè record trước. Đây là suy luận từ câu lệnh, chưa phải quan sát mất đồ trên máy chạy.

- Teleporter.OnLoad duyệt pairs nên record khóa0 nếu được serializer giữ vẫn có thể được nạp, SpawnSaveRecord rồi ReceiveItem lại từ đầu với thời gian3,5 giây. Không lưu deadline còn lại của chuyến item. Phân biệt hai rủi ro: chờ lại từ đầu và chỉ còn một record trong bảng khi nhiều item cùng in-flight. Còn phải đối chiếu serializer và snapshot trước khi kết luận kết quả cuối.

[components/teleporter.lua dòng 244–299](../source/scripts/components/teleporter.lua) · [components/teleporter.lua dòng 373–417](../source/scripts/components/teleporter.lua)

[Phạm vi câu hỏi, suy luận và tìm kiếm](../evidence/deep-review-continuation-checks.json).

<!-- continuation-review-end -->
