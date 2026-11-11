# Tuổi nhân vật, lịch sử và tiến triển

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm tuổi nhân vật, lịch sử và tiến triển theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [playerdeaths.lua:1](../source/scripts/playerdeaths.lua) — text-lua

- [playerhistory.lua:1](../source/scripts/playerhistory.lua) — text-lua

- [progressionconstants.lua:1](../source/scripts/progressionconstants.lua) — text-lua

- [wxputils.lua:1](../source/scripts/wxputils.lua) — text-lua

- [components/age.lua:1](../source/scripts/components/age.lua) — text-lua

- [components/experiencecollector.lua:1](../source/scripts/components/experiencecollector.lua) — text-lua

- [components/friendlevels.lua:1](../source/scripts/components/friendlevels.lua) — text-lua

- [components/oldager.lua:1](../source/scripts/components/oldager.lua) — text-lua

<!-- deep-review-characters-content:start -->

## Đọc sâu mã nguồn — 08/11/2026

Đã trace tuổi sống, XP định kỳ của skill tree và mô hình tuổi/sát thương Wanda.

Age.GetAge tính saved_age+(last_pause_time hoặc GetTime)-spawntime-paused_time. Số ngày nội bộ là floor(age/TOTAL_DAY_TIME), số ngày hiển thị cộng1. Pause chốt last_pause_time, Resume cộng phần đã pause rồi khởi động lại sync. Task đồng bộ10 giây gán Network player age và gọi các achievement mốc20/35/55/70 ngày trong code. Store review ở mốc20/50 là nhánh nền tảng riêng. [components/age.lua dòng 1–85](../source/scripts/components/age.lua)

Age.Save ghi tuổi đã tính và ispaused. Load dùng age hoặc0, áp lại paused tại spawntime hoặc restart sync. LongUpdate cộng dt vào saved_age, nhưng nếu paused cũng cộng dt vào paused_time để tuổi thực không tăng. Vì vậy tuổi sống và đồng hồ world có hai cách tích lũy cần giữ tách biệt khi tải. [components/age.lua dòng 87–124](../source/scripts/components/age.lua)

ExperienceCollector hẹn một lượt mỗi TOTAL_DAY_TIME. UpdateXp chỉ cộng1 nếu prefab có SKILLTREE_DEFS. LongUpdate tính số chu kỳ đã qua bằng math.modf, gọi UpdateXp cho từng chu kỳ và hẹn phần thời gian còn lại. Save giữ GetTaskRemaining, Load truyền time vào SetTask, vốn hủy task cũ trước khi tạo task mới. [components/experiencecollector.lua dòng 1–65](../source/scripts/components/experiencecollector.lua)

OldAger có base_rate=1/40 năm mỗi giây. Sát thương được đổi chiều so health, nhân OLDAGE_HEALTH_SCALE rồi tích lũy damage_remaining. Tốc độ tuổi do sát thương là min(ceil(sqrt(abs(remaining))*1,5),30), có đổi dấu cho hồi phục. Update tích lũy phần lẻ year_timer, chuyển số năm nguyên thành health.DoDelta âm, chặn vòng lặp redirect bằng _taking_time_damage. Hồi phục dừng khi health đạt max có penalty, chết thì xóa các khoản damage còn lại. [components/oldager.lua dòng 9–113](../source/scripts/components/oldager.lua) · [components/oldager.lua dòng 115–138](../source/scripts/components/oldager.lua)

**Phần còn hở.**

- Chưa trace toàn bộ playerhistory, friendlevels và WXP/account progression.
- OldAger không có OnSave trong component đã đọc; còn phải ghép prefab Wanda/health để chốt phần lẻ tuổi và sát thương đang chờ khi tải.

<!-- deep-review-characters-content:end -->
