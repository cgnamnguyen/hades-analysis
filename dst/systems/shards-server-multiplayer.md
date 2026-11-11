# Shard, server, quản trị và biểu quyết

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm shard, server, quản trị và biểu quyết theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [builtinusercommands.lua:1](../source/scripts/builtinusercommands.lua) — text-lua

- [serverpreferences.lua:1](../source/scripts/serverpreferences.lua) — text-lua

- [shardindex.lua:1](../source/scripts/shardindex.lua) — text-lua

- [shardnetworking.lua:1](../source/scripts/shardnetworking.lua) — text-lua

- [shardsaveindex.lua:1](../source/scripts/shardsaveindex.lua) — text-lua

- [voteutil.lua:1](../source/scripts/voteutil.lua) — text-lua

- [components/playervoter.lua:1](../source/scripts/components/playervoter.lua) — text-lua

- [components/shardstate.lua:1](../source/scripts/components/shardstate.lua) — text-lua

- [components/shardtransactionsteps.lua:1](../source/scripts/components/shardtransactionsteps.lua) — text-lua

- [components/shard_autosaver.lua:1](../source/scripts/components/shard_autosaver.lua) — text-lua

- [components/shard_clock.lua:1](../source/scripts/components/shard_clock.lua) — text-lua

- [components/shard_daywalkerspawner.lua:1](../source/scripts/components/shard_daywalkerspawner.lua) — text-lua

- [components/shard_mermkingwatcher.lua:1](../source/scripts/components/shard_mermkingwatcher.lua) — text-lua

- [components/shard_players.lua:1](../source/scripts/components/shard_players.lua) — text-lua

- [components/shard_seasons.lua:1](../source/scripts/components/shard_seasons.lua) — text-lua

- [components/shard_sinkholes.lua:1](../source/scripts/components/shard_sinkholes.lua) — text-lua

- [components/shard_wagbossinfo.lua:1](../source/scripts/components/shard_wagbossinfo.lua) — text-lua

- [components/shard_worldreset.lua:1](../source/scripts/components/shard_worldreset.lua) — text-lua

- [components/shard_worldvoter.lua:1](../source/scripts/components/shard_worldvoter.lua) — text-lua

- [components/worldoverseer.lua:1](../source/scripts/components/worldoverseer.lua) — text-lua

- [components/worldreset.lua:1](../source/scripts/components/worldreset.lua) — text-lua

- [components/worldvoter.lua:1](../source/scripts/components/worldvoter.lua) — text-lua

<!-- deep-review-root-start -->

## Đọc sâu mã nguồn — 08/11/2026

Đồng bộ shard và định tuyến cổng khi shard thay đổi.

Mức đối chiếu của phần này là `source-traced-partial`.

- Master gửi các override thuộc Customize.GetSyncOptions; secondary yêu cầu đồng bộ lại. World data khi shard READY được chạy trong sandbox; dạng bảng chỉ có str được decode/unzip rồi chạy sandbox lần nữa.
- Shard READY được thêm vào ShardConnected/ShardList và báo shardtransactionsteps. Khi rời mạng, các mục này bị xóa. Cổng auto hoặc chưa liên kết được gán destination, còn cổng sang shard khác có nhánh MISSINGSHARD.
- AutoSaver secondary so snapshot với master, có nhánh bắt kịp, bỏ qua khi đã đi trước đúng một snapshot trong điều kiện cho phép hoặc rollback. Rollback cùng snapshot chỉ thử tối đa ba lần rồi báo lỗi file save.
- ShardTransactionSteps chỉ tồn tại ở mastersim. CreateTransaction cấp ID tăng theo shard đích; với chuyển item, nó chụp GetSaveRecord rồi Remove item ở nguồn trước khi gửi INITIATE. Nếu shard đích chưa available, payload vẫn giữ trong transactions để gửi lại lúc kết nối.
- Bên nhận chỉ áp payload nếu ID vượt finalizedid. Chưa có portal hoặc tọa độ đích đủ ba trục thì nó trả false và hẹn thử lại bằng task0. Áp thành công đưa record vào itemstore của portal hoặc SpawnPrefab+SetPersistData, gửi ACCEPTED rồi đánh dấu FINALIZED.
- Transaction replay đã hoàn tất được trả ACCEPTED mà không dựng item lần nữa. Nguồn dồn finalizedid qua các ID đã xong liên tiếp rồi yêu cầu prune. OnSave ghi toàn bộ transactions, OnLoad nạp lại. Đây là bước chống xử lý lặp ở Lua; chưa chứng minh an toàn mọi crash giữa hai shard.

**Lưu/tải.** Snapshot và dữ liệu từng shard được điều phối bằng ShardGameIndex. Pending transaction cùng ID/status được giữ trong OnSave; việc commit đồng bộ giữa file save hai shard vẫn cần bằng chứng engine.

**Phần còn hở.** Chưa xác minh thứ tự save của hai shard khi crash, lỗi SpawnPrefab ở đích hoặc dữ liệu migration không hợp lệ, cùng cơ chế retry/transport native.

[shardnetworking.lua dòng 12–120](../source/scripts/shardnetworking.lua) · [components/autosaver.lua dòng 46–106](../source/scripts/components/autosaver.lua) · [components/autosaver.lua dòng 171–230](../source/scripts/components/autosaver.lua) · [components/shardtransactionsteps.lua dòng 13–230](../source/scripts/components/shardtransactionsteps.lua)

<!-- deep-review-root-end -->
