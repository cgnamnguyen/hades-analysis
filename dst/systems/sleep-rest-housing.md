# Ngủ, nghỉ và nơi trú

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm ngủ, nghỉ và nơi trú theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [components/sittable.lua:1](../source/scripts/components/sittable.lua) — text-lua

- [components/sleeper.lua:1](../source/scripts/components/sleeper.lua) — text-lua

- [components/sleepingbag.lua:1](../source/scripts/components/sleepingbag.lua) — text-lua

- [components/sleepingbaguser.lua:1](../source/scripts/components/sleepingbaguser.lua) — text-lua

- [prefabs/bedroll.lua:1](../source/scripts/prefabs/bedroll.lua) — text-lua

- [prefabs/tent.lua:1](../source/scripts/prefabs/tent.lua) — text-lua

<!-- deep-review-characters-content:start -->

## Đọc sâu mã nguồn — 08/11/2026

Đã trace điều kiện ngủ tự nhiên, ngủ do sleepiness và phục hồi trong lều.

Sleeper mặc định từ chối ngủ gần home hợp lệ, khi có combat target, đang cháy/đóng băng, trong đội tấn công hoặc SG busy. Nhánh thường ngủ đêm, có phân biệt đêm hang và light watcher; nocturnal đổi sang pha ngày. Wake test xét target, cháy, đóng băng, team và firedamage. Brain chỉ dừng sau GoToSleep, rồi được restart ở WakeUp. [components/sleeper.lua dòng 74–161](../source/scripts/components/sleeper.lua) · [components/sleeper.lua dòng 279–335](../source/scripts/components/sleeper.lua)

AddSleepiness cộng dồn. Lớn hơn resistance hoặc đã ngủ gọi GoToSleep ngay; bằng đúng resistance hẹn task sau resistance; thấp hơn bắt đầu wearoff. Diminishing returns tăng extraresist, giảm0,1 mỗi30 giây; sleep duration được nhân max(0,2,1-extraresist*0,1). Save chỉ ghi extraresist dương đã làm tròn xuống0,1, Load áp lại giá trị này. [components/sleeper.lua dòng 242–348](../source/scripts/components/sleeper.lua)

SleepingBag.DoSleep cần giường chưa có sleeper và player chưa có sleepingbag. Nó gắn quan hệ hai chiều rồi gọi sleepingbaguser. DoWakeUp kiểm tra đúng cặp trước khi tháo liên kết, gọi wake và callback. Xóa component/giường cũng đi qua DoWakeUp. SleepingBagUser hẹn SleepTick theo tick_period, theo dõi world phase và thức dậy khi khác pha cho phép. [components/sleepingbag.lua dòng 21–95](../source/scripts/components/sleepingbag.lua) · [components/sleepingbaguser.lua dòng 32–77](../source/scripts/components/sleepingbaguser.lua)

SleepTick áp hunger_tick trước, xác định starving rồi tăng sanity nếu chưa đầy. Chỉ hồi health khi chưa starving và giường có healthsleep. Nhiệt do temperaturetickfn của giường xử lý. Starving làm thức ngay. Tent dùng một finite use khi wake, đánh búa hoặc bốc cháy khiến sleeper thức, save/load prefab giữ cờ burnt. Nhiệt lều được điều chỉnh từng tick về vùng mục tiêu theo chiều nóng/lạnh của prefab. [components/sleepingbaguser.lua dòng 79–108](../source/scripts/components/sleepingbaguser.lua) · [prefabs/tent.lua dòng 40–136](../source/scripts/prefabs/tent.lua)

**Phần còn hở.**

- Chưa ghép đủ mọi điều kiện trong action/stategraph trước lúc nằm và từng biến thể bedroll/siestahut.
- Chưa có bằng chứng khôi phục một phiên player đang ngủ qua crash hoặc ngắt kết nối.

<!-- deep-review-characters-content:end -->
