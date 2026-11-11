# Máu, hồi phục và giới hạn sinh mạng

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm máu, hồi phục và giới hạn sinh mạng theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [components/damagetracker.lua:1](../source/scripts/components/damagetracker.lua) — text-lua

- [components/deathloothandler.lua:1](../source/scripts/components/deathloothandler.lua) — text-lua

- [components/healer.lua:1](../source/scripts/components/healer.lua) — text-lua

- [components/health.lua:1](../source/scripts/components/health.lua) — text-lua

- [components/healthbar.lua:1](../source/scripts/components/healthbar.lua) — text-lua

- [components/healthsyncer.lua:1](../source/scripts/components/healthsyncer.lua) — text-lua

- [components/healthtrigger.lua:1](../source/scripts/components/healthtrigger.lua) — text-lua

- [components/health_replica.lua:1](../source/scripts/components/health_replica.lua) — text-lua

- [components/maxhealer.lua:1](../source/scripts/components/maxhealer.lua) — text-lua

## Đọc sâu mã nguồn — 08/11/2026

**Mức bằng chứng bổ sung — source-traced-partial.** Đã đọc thay đổi máu, penalty, hồi phục, chết và dữ liệu tương thích save cũ.

**Cổng thay đổi máu.** Health.DoDelta trả 0 khi nonlethal ngăn lạnh/nóng/đói ở ngưỡng, redirect xử lý thay, hoặc entity invincible/teleporting mà caller chưa bỏ qua. Damage âm đi qua absorption/reduction, deltamodifierfn và giới hạn damage-per-hit trước SetVal. Healthdelta mang lượng sau modifier, không bảo đảm bằng phần máu thực thay đổi vì SetVal còn giới hạn. [components/health.lua:615–651](../source/scripts/components/health.lua).

**Clamp và chết.** SetVal chặn trần bằng GetMaxWithPenalty và chặn dưới bằng min(minhealth,max). Chỉ chuyển từ old_health>0 sang currenthealth<=0 mới phát entity_death/death, ghi cause và chọn fade/corpse. Penalty được clamp trong [0,TUNING.MAXIMUM_HEALTH_PENALTY]. [components/health.lua:462–472](../source/scripts/components/health.lua) · [components/health.lua:567–613](../source/scripts/components/health.lua).

**Hồi phục và tiêu thuốc.** StartRegen dừng regen trước theo mặc định rồi tạo DoPeriodicTask. Healer.Heal yêu cầu target có health và canhealfn cho phép, áp efficientuser và gọi DoDelta khi health.canheal. Dù nhánh canheal không cộng máu, onhealfn vẫn có thể chạy và một đơn vị stack hoặc entity healer bị tiêu. [components/health.lua:330–353](../source/scripts/components/health.lua) · [components/healer.lua:21–53](../source/scripts/components/healer.lua).

**Lưu và tải.** OnSave ghi health, penalty dương và maxhealth chỉ khi save_maxhealth. OnLoad ưu tiên health tuyệt đối, tương thích percent của save cũ khi không có health, rồi cập nhật HUD. Regen scheduler và mọi modifier ngoài không nằm trong record này. [components/health.lua:156–188](../source/scripts/components/health.lua).

**Phần còn phải kiểm tra trong nhóm này.**

- Chưa duyệt mọi source regen, max-health penalty do nhân vật và các callback redirect.
- Việc rollback/sync health giữa shard cần đối chiếu luồng world save và network.
