# Động vật, đàn và sinh thái tự nhiên

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm động vật, đàn và sinh thái tự nhiên theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

Đàn là entity điều phối membership, vị trí trung tâm và quan hệ lưu giữa các cá thể.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- AddMember chống thêm trùng, tăng membercount, gắn listener, nhớ knownlocations[herd] và đặt herdmember. GatherNearbyMembers chỉ gom cá thể chưa thuộc đàn, chưa có vị trí herd và chưa chết; dừng khi IsFull.

- MergeNearbyHerds chỉ ghép đàn cùng membertag, đàn được nhập có dưới 4 cá thể và tổng không quá maxsize. OnUpdate tính trung bình vị trí của thành viên đủ điều kiện, loại thành viên sai tag/component, di chuyển entity đàn và cập nhật ký ức herd cho thành viên.

- OnSave ghi GUID của mọi member và trả danh sách GUID để bảo toàn tham chiếu. LoadPostPass tìm entity đã tải rồi gọi lại AddMember. RemoveMember gỡ listener, xóa knownlocation, giảm count và chỉ gọi onempty khi không còn thành viên.

### Nguồn đối chiếu

- [components/herd.lua:97–148](../source/scripts/components/herd.lua).

- [components/herd.lua:151–241](../source/scripts/components/herd.lua).

- [components/herd.lua:243–265](../source/scripts/components/herd.lua).

### Phạm vi còn hở

- Herd là hạ tầng đàn; sinh sản, mùa động dục, giận dữ và biến thể của từng loài còn nằm trong prefab/brain và chưa được suy từ membership.

- Chưa chạy trường hợp đàn hợp nhất đồng thời với chết, di cư hay despawn ngoài tầm nhìn.

<!-- deep-review-world-ecology:end -->

- [brains/beefalobrain.lua:1](../source/scripts/brains/beefalobrain.lua) — text-lua

- [brains/rabbitbrain.lua:1](../source/scripts/brains/rabbitbrain.lua) — text-lua

- [brains/rabbitkingbrain.lua:1](../source/scripts/brains/rabbitkingbrain.lua) — text-lua

- [brains/rabbitking_bunnymanbrain.lua:1](../source/scripts/brains/rabbitking_bunnymanbrain.lua) — text-lua

- [components/birdspawner.lua:1](../source/scripts/components/birdspawner.lua) — text-lua

- [components/butterflyspawner.lua:1](../source/scripts/components/butterflyspawner.lua) — text-lua

- [components/herd.lua:1](../source/scripts/components/herd.lua) — text-lua

- [components/herdmember.lua:1](../source/scripts/components/herdmember.lua) — text-lua

- [components/penguinspawner.lua:1](../source/scripts/components/penguinspawner.lua) — text-lua

- [components/pollinator.lua:1](../source/scripts/components/pollinator.lua) — text-lua

- [prefabs/beefalo.lua:1](../source/scripts/prefabs/beefalo.lua) — text-lua

- [prefabs/beefaloherd.lua:1](../source/scripts/prefabs/beefaloherd.lua) — text-lua

- [prefabs/beefalowool.lua:1](../source/scripts/prefabs/beefalowool.lua) — text-lua

- [prefabs/beefalo_groomer.lua:1](../source/scripts/prefabs/beefalo_groomer.lua) — text-lua

- [prefabs/birdcage.lua:1](../source/scripts/prefabs/birdcage.lua) — text-lua

- [prefabs/birds.lua:1](../source/scripts/prefabs/birds.lua) — text-lua

- [prefabs/birds_mutant.lua:1](../source/scripts/prefabs/birds_mutant.lua) — text-lua

- [prefabs/birds_mutant_rift.lua:1](../source/scripts/prefabs/birds_mutant_rift.lua) — text-lua

- [prefabs/birdtrap.lua:1](../source/scripts/prefabs/birdtrap.lua) — text-lua

- [prefabs/butterfly.lua:1](../source/scripts/prefabs/butterfly.lua) — text-lua

- [prefabs/butterflywings.lua:1](../source/scripts/prefabs/butterflywings.lua) — text-lua

- [prefabs/rabbit.lua:1](../source/scripts/prefabs/rabbit.lua) — text-lua

- [prefabs/rabbithole.lua:1](../source/scripts/prefabs/rabbithole.lua) — text-lua

- [prefabs/rabbithouse.lua:1](../source/scripts/prefabs/rabbithouse.lua) — text-lua

- [prefabs/rabbithouse_yule_glow_fx.lua:1](../source/scripts/prefabs/rabbithouse_yule_glow_fx.lua) — text-lua

- [prefabs/rabbitking.lua:1](../source/scripts/prefabs/rabbitking.lua) — text-lua

- [prefabs/rabbitkinghorn.lua:1](../source/scripts/prefabs/rabbitkinghorn.lua) — text-lua

- [prefabs/rabbitkinghorn_chest.lua:1](../source/scripts/prefabs/rabbitkinghorn_chest.lua) — text-lua

- [prefabs/rabbitkingspear.lua:1](../source/scripts/prefabs/rabbitkingspear.lua) — text-lua
