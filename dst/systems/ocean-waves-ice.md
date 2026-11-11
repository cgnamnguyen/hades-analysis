# Đại dương, sóng, băng và màu nước

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm đại dương, sóng, băng và màu nước theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

Sóng trang trí được sinh gần người chơi; băng biển có grid sức bền và khôi phục phần đang vỡ.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- WaveManager.OnUpdate cần ThePlayer và map. Với mỗi loại shimmer nó tích lũy per_sec × modifier × mult × dt, tiêu mỗi đơn vị để thử spawn quanh người chơi. canSpawn đòi đúng loại tile và nằm ngoài mọi blocker đã đăng ký; modifier không dương thì dừng cập nhật.

- CreateIceAtTile đổi tile thành OCEAN_ICE, giữ tile cũ trong undertile sau SetTile vì callback terraforming có thể xóa nó. QueueCreate chỉ đặt tác vụ nếu grid chưa có dữ liệu, mặc định chờ 2.1 + random × 0.3 giây, có thể được data ghi đè.

- DamageIceAtTile bỏ qua ô không có sức bền hoặc đã về 0, clamp sức bền mới trong [0, OCEAN_ICE_HEALTH], tạo hiệu ứng hư hại và queue phá khi bằng 0. Save nén hai grid marked_for_delete và ice_health. Load khởi động lại tác vụ phá ở ô đang đánh dấu và dựng lại prefab biểu diễn hư hại.

### Nguồn đối chiếu

- [components/wavemanager.lua:142–203](../source/scripts/components/wavemanager.lua).

- [components/oceanicemanager.lua:151–175](../source/scripts/components/oceanicemanager.lua).

- [components/oceanicemanager.lua:228–267](../source/scripts/components/oceanicemanager.lua).

- [components/oceanicemanager.lua:451–478](../source/scripts/components/oceanicemanager.lua).

- [components/oceanicemanager.lua:504–544](../source/scripts/components/oceanicemanager.lua).

### Phạm vi còn hở

- Chưa xác minh engine xử lý collider/đối tượng đứng trên băng khi tile đổi và lịch sinh băng theo mọi nguồn gây đóng băng.

- Nhánh sóng gây tác động vật lý trong prefab wave cần đọc riêng; spawn shimmer vừa đọc chỉ xác nhận đường trình bày.

<!-- deep-review-world-ecology:end -->

- [ocean_util.lua:1](../source/scripts/ocean_util.lua) — text-lua

- [components/flotsamgenerator.lua:1](../source/scripts/components/flotsamgenerator.lua) — text-lua

- [components/ocean.lua:1](../source/scripts/components/ocean.lua) — text-lua

- [components/oceancolor.lua:1](../source/scripts/components/oceancolor.lua) — text-lua

- [components/oceanicemanager.lua:1](../source/scripts/components/oceanicemanager.lua) — text-lua

- [components/waterphysics.lua:1](../source/scripts/components/waterphysics.lua) — text-lua

- [components/wateryprotection.lua:1](../source/scripts/components/wateryprotection.lua) — text-lua

- [components/wavemanager.lua:1](../source/scripts/components/wavemanager.lua) — text-lua

- [prefabs/oceanfish.lua:1](../source/scripts/prefabs/oceanfish.lua) — text-lua

- [prefabs/oceanfishableflotsam.lua:1](../source/scripts/prefabs/oceanfishableflotsam.lua) — text-lua

- [prefabs/oceanfishdef.lua:1](../source/scripts/prefabs/oceanfishdef.lua) — text-lua

- [prefabs/oceanfishingbobber.lua:1](../source/scripts/prefabs/oceanfishingbobber.lua) — text-lua

- [prefabs/oceanfishinglure.lua:1](../source/scripts/prefabs/oceanfishinglure.lua) — text-lua

- [prefabs/oceanfishingrod.lua:1](../source/scripts/prefabs/oceanfishingrod.lua) — text-lua

- [prefabs/oceanfish_shoalspawner.lua:1](../source/scripts/prefabs/oceanfish_shoalspawner.lua) — text-lua

- [prefabs/oceanice_damage.lua:1](../source/scripts/prefabs/oceanice_damage.lua) — text-lua

- [prefabs/oceanshadowcreature.lua:1](../source/scripts/prefabs/oceanshadowcreature.lua) — text-lua

- [prefabs/oceantree.lua:1](../source/scripts/prefabs/oceantree.lua) — text-lua

- [prefabs/oceantreenut.lua:1](../source/scripts/prefabs/oceantreenut.lua) — text-lua

- [prefabs/oceantree_pillar.lua:1](../source/scripts/prefabs/oceantree_pillar.lua) — text-lua

- [prefabs/oceanvine.lua:1](../source/scripts/prefabs/oceanvine.lua) — text-lua

- [prefabs/oceanvine_cocoon.lua:1](../source/scripts/prefabs/oceanvine_cocoon.lua) — text-lua

- [prefabs/oceanvine_deco.lua:1](../source/scripts/prefabs/oceanvine_deco.lua) — text-lua

- [prefabs/oceanwhirlbigportal.lua:1](../source/scripts/prefabs/oceanwhirlbigportal.lua) — text-lua

- [prefabs/oceanwhirlportal.lua:1](../source/scripts/prefabs/oceanwhirlportal.lua) — text-lua

- [prefabs/ocean_trawler.lua:1](../source/scripts/prefabs/ocean_trawler.lua) — text-lua

- [prefabs/wave.lua:1](../source/scripts/prefabs/wave.lua) — text-lua

- [prefabs/waveyjones.lua:1](../source/scripts/prefabs/waveyjones.lua) — text-lua

- [prefabs/wave_shimmer.lua:1](../source/scripts/prefabs/wave_shimmer.lua) — text-lua

- [prefabs/wave_shore.lua:1](../source/scripts/prefabs/wave_shore.lua) — text-lua
