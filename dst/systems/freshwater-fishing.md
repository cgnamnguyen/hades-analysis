# Câu và bắt cá ao

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm câu và bắt cá ao theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

Câu ao nối lượng cá trong ao với thời gian chờ, giữ cá đã móc và hoàn tất thao tác thu.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- WaitForFish chỉ đặt lịch khi fishleft/maxfish > 0. Thời gian chờ bằng minwaittime + (1 − fishleft/maxfish) × (maxwaittime − minwaittime), nên ao ít cá kéo dài thời gian chờ. StartFishing yêu cầu target có fishable; OnUpdate dừng nếu người câu mất hiệu lực, rời state fishing/catchfish hoặc tháo cần.

- Hook từ chối khi đã có hookedfish hoặc caughtfish. HookFish sinh prefab, ẩn nó, đặt persists=false và trừ một fishleft nếu còn dương. ReleaseFish xóa cá đang giữ và hoàn lại fishleft. Reel tách cá khỏi ao; Collect mới hiện cá, bật Physics/shadow, đặt persists=true và phát fishingcollect. Thất bại không có cá để kéo thì StopFishing.

- Khi cá được lấy khỏi ao, RefreshFish đặt lịch hồi từng con theo fishrespawntime. Save chỉ ghi fishleft khi dưới maxfish; Load phục hồi số lượng và khởi động lại lịch hồi. Đóng băng bỏ tag fishable, mở băng trả tag.

### Nguồn đối chiếu

- [components/fishable.lua:1–148](../source/scripts/components/fishable.lua).

- [components/fishingrod.lua:87–238](../source/scripts/components/fishingrod.lua).

### Phạm vi còn hở

- Cần nối fishingcollect đến handler inventory và đọc các prefab pond riêng để xác nhận chính sách khi túi đầy, maxfish/respawntime theo từng ao.

- Chưa chạy việc thoát giữa Hook và Collect hoặc cạnh tranh nhiều người câu cùng ao.

<!-- deep-review-world-ecology:end -->

- [components/bait.lua:1](../source/scripts/components/bait.lua) — text-lua

- [components/catcher.lua:1](../source/scripts/components/catcher.lua) — text-lua

- [components/fishable.lua:1](../source/scripts/components/fishable.lua) — text-lua

- [components/fishingnet.lua:1](../source/scripts/components/fishingnet.lua) — text-lua

- [components/fishingnetvisualizer.lua:1](../source/scripts/components/fishingnetvisualizer.lua) — text-lua

- [components/fishingrod.lua:1](../source/scripts/components/fishingrod.lua) — text-lua

- [components/fishingrod_replica.lua:1](../source/scripts/components/fishingrod_replica.lua) — text-lua

- [prefabs/fish.lua:1](../source/scripts/prefabs/fish.lua) — text-lua

- [prefabs/fishingrod.lua:1](../source/scripts/prefabs/fishingrod.lua) — text-lua

- [prefabs/pond.lua:1](../source/scripts/prefabs/pond.lua) — text-lua

- [prefabs/pondfish.lua:1](../source/scripts/prefabs/pondfish.lua) — text-lua
