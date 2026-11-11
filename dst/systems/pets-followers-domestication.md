# Bạn đồng hành, thuần hoá và cưỡi

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm bạn đồng hành, thuần hoá và cưỡi theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

Thuần hóa, obedience, loyalty và cưỡi là các trạng thái riêng có đường save/load khác nhau.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- Domesticatable clamp obedience trong min/max và domestication trong [0,1]. Tick vẫn làm giảm obedience khi pause decay. Trigger chăm sóc tăng domestication và ghi lastdomesticationgain; nếu không trigger, mức mất tăng theo thời gian bỏ mặc đến ngưỡng BEEFALO_DOMESTICATION_MAX_LOSS_DAYS. Skill beefalodomestication chỉ nhân delta dương.

- Follower.AddLoyaltyTime áp loyaltyeffectiveness của leader, clamp deadline tới maxfollowtime rồi thay task stopfollow. Save ghi số giây còn lại và userid leader; Load nối lại loyalty và cached leader. LongUpdate trừ dt khỏi cả deadline trực tiếp lẫn cache, hết thời gian thì bỏ leader/cache.

- Rider.Mount từ chối nếu đang cưỡi, target không rideable hoặc đã có rider. TestObedience/TestRider thất bại phát refusedmount và refusedrider. Save của rider giữ GetSaveRecord của mount khi ShouldSave; Load tạo lại bằng SpawnSaveRecord rồi Mount instant. Domesticatable save giữ tendencies, latch, obedience và dữ liệu rideable; Load domesticatable trước rồi mới gọi OnLoadDomesticatable.

### Nguồn đối chiếu

- [components/domesticatable.lua:88–158](../source/scripts/components/domesticatable.lua).

- [components/domesticatable.lua:172–248](../source/scripts/components/domesticatable.lua).

- [components/follower.lua:365–446](../source/scripts/components/follower.lua).

- [components/follower.lua:475–501](../source/scripts/components/follower.lua).

- [components/rider.lua:67–103](../source/scripts/components/rider.lua).

- [components/rider.lua:248–261](../source/scripts/components/rider.lua).

### Phạm vi còn hở

- Chưa theo đầy đủ từng loại pet/Woby và sự khác nhau ở cross-shard migration; cached userid không tự chứng minh pet sẽ theo qua mọi cổng.

- Cần đọc prefab/skill riêng để xác định trigger chăm sóc, saddle và thời gian hất rider theo từng nhân vật.

<!-- deep-review-world-ecology:end -->

- [components/crittertraits.lua:1](../source/scripts/components/crittertraits.lua) — text-lua

- [components/domesticatable.lua:1](../source/scripts/components/domesticatable.lua) — text-lua

- [components/follower.lua:1](../source/scripts/components/follower.lua) — text-lua

- [components/followerherder.lua:1](../source/scripts/components/followerherder.lua) — text-lua

- [components/followermemory.lua:1](../source/scripts/components/followermemory.lua) — text-lua

- [components/follower_replica.lua:1](../source/scripts/components/follower_replica.lua) — text-lua

- [components/groomer.lua:1](../source/scripts/components/groomer.lua) — text-lua

- [components/hitchable.lua:1](../source/scripts/components/hitchable.lua) — text-lua

- [components/hitcher.lua:1](../source/scripts/components/hitcher.lua) — text-lua

- [components/leader.lua:1](../source/scripts/components/leader.lua) — text-lua

- [components/leaderrollcall.lua:1](../source/scripts/components/leaderrollcall.lua) — text-lua

- [components/petleash.lua:1](../source/scripts/components/petleash.lua) — text-lua

- [components/rideable.lua:1](../source/scripts/components/rideable.lua) — text-lua

- [components/rider.lua:1](../source/scripts/components/rider.lua) — text-lua

- [components/rider_replica.lua:1](../source/scripts/components/rider_replica.lua) — text-lua

- [components/saddler.lua:1](../source/scripts/components/saddler.lua) — text-lua

- [components/unsaddler.lua:1](../source/scripts/components/unsaddler.lua) — text-lua

- [prefabs/critterbuff_lunarmoth.lua:1](../source/scripts/prefabs/critterbuff_lunarmoth.lua) — text-lua

- [prefabs/critterlab.lua:1](../source/scripts/prefabs/critterlab.lua) — text-lua

- [prefabs/critters.lua:1](../source/scripts/prefabs/critters.lua) — text-lua

- [prefabs/wobybig.lua:1](../source/scripts/prefabs/wobybig.lua) — text-lua

- [prefabs/wobycommon.lua:1](../source/scripts/prefabs/wobycommon.lua) — text-lua

- [prefabs/wobysmall.lua:1](../source/scripts/prefabs/wobysmall.lua) — text-lua

- [prefabs/woby_commands_classified.lua:1](../source/scripts/prefabs/woby_commands_classified.lua) — text-lua

- [prefabs/woby_rack.lua:1](../source/scripts/prefabs/woby_rack.lua) — text-lua

- [prefabs/woby_shadow_fx.lua:1](../source/scripts/prefabs/woby_shadow_fx.lua) — text-lua

- [prefabs/woby_treat.lua:1](../source/scripts/prefabs/woby_treat.lua) — text-lua
