# Câu và thu hoạch cá biển

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm câu và thu hoạch cá biển theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

Câu biển dùng lực căng, độ chùng, khoảng cách và cấu hình bộ phao/mồi thay cho lịch chờ của ao.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- _CacheTackleData cộng từng tham số casting_base với dữ liệu phao và mồi, clamp ít nhất 0. Đích ném giới hạn dist_max, nhân độ chính xác ngẫu nhiên và nhiễu góc; Cast trả thành công khi tạo được target.

- Reel giảm line_dist, tính lại lực căng và làm đứt dây khi vừa đang ở mức căng cao và lực căng mới chạm REELING_SNAP_TENSION. OnUpdate dừng nếu tháo cần, người câu/target mất hiệu lực hoặc quá MAX_HOOK_DIST. Khi dây chùng hoàn toàn và target đã là cá, nó dừng với linetooloose.

- CatchFish biến đối tượng oceanfishable thành projectile, ghi chủ sở hữu nếu cân được, phóng về vị trí bắt, gọi callback ondonefishing và phát fishcaught. StopFishing báo nguyên nhân và lost_tackle cho callback, sự kiện của người câu và target.

### Nguồn đối chiếu

- [components/oceanfishingrod.lua:139–188](../source/scripts/components/oceanfishingrod.lua).

- [components/oceanfishingrod.lua:206–257](../source/scripts/components/oceanfishingrod.lua).

- [components/oceanfishingrod.lua:303–379](../source/scripts/components/oceanfishingrod.lua).

### Phạm vi còn hở

- Chưa phân giải mọi loại lure, xác suất interest theo thời tiết và lưu lại trận kéo cá giữa chừng. Callback của prefab quyết định việc mất tackle và nhận item.

- Giá trị TUNING và cá có locomotor làm thay đổi tốc độ kéo, nên không dùng một ngưỡng cố định cho tất cả loại cá.

<!-- deep-review-world-ecology:end -->

- [components/fishschool.lua:1](../source/scripts/components/fishschool.lua) — text-lua

- [components/oceanfishable.lua:1](../source/scripts/components/oceanfishable.lua) — text-lua

- [components/oceanfishinghook.lua:1](../source/scripts/components/oceanfishinghook.lua) — text-lua

- [components/oceanfishingrod.lua:1](../source/scripts/components/oceanfishingrod.lua) — text-lua

- [components/oceanfishingrod_replica.lua:1](../source/scripts/components/oceanfishingrod_replica.lua) — text-lua

- [components/oceanfishingtackle.lua:1](../source/scripts/components/oceanfishingtackle.lua) — text-lua

- [components/oceantrawler.lua:1](../source/scripts/components/oceantrawler.lua) — text-lua

- [components/trophyscale.lua:1](../source/scripts/components/trophyscale.lua) — text-lua

- [components/weighable.lua:1](../source/scripts/components/weighable.lua) — text-lua

- [prefabs/oceanfish.lua:1](../source/scripts/prefabs/oceanfish.lua) — text-lua

- [prefabs/oceanfishableflotsam.lua:1](../source/scripts/prefabs/oceanfishableflotsam.lua) — text-lua

- [prefabs/oceanfishdef.lua:1](../source/scripts/prefabs/oceanfishdef.lua) — text-lua

- [prefabs/oceanfishingbobber.lua:1](../source/scripts/prefabs/oceanfishingbobber.lua) — text-lua

- [prefabs/oceanfishinglure.lua:1](../source/scripts/prefabs/oceanfishinglure.lua) — text-lua

- [prefabs/oceanfishingrod.lua:1](../source/scripts/prefabs/oceanfishingrod.lua) — text-lua

- [prefabs/oceanfish_shoalspawner.lua:1](../source/scripts/prefabs/oceanfish_shoalspawner.lua) — text-lua
