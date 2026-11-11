# Nhiệm vụ, thành tựu và tư liệu khám phá

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm nhiệm vụ, thành tựu và tư liệu khám phá theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

QuestOwner lưu trạng thái questing/questcomplete, Discoverable lưu việc khám phá icon.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- CanBeginQuest mặc định true hoặc gọi CanBeginFn. BeginQuest đặt questcomplete=false rồi nhận questing và begin_message từ callback. CanAbandon mặc định cho phép; Abandon chỉ tắt questing khi callback báo quest_abandoned hoặc không có callback.

- CompleteQuest tắt questing, bật questcomplete và gọi on_complete_quest. OnSave/OnLoad ghi hai cờ, thiếu dữ liệu dùng false. Vì callback cung cấp nội dung, component này chưa tự định nghĩa mục tiêu, tiến độ hay phần thưởng.

- Discoverable nghe onclick, chỉ Discover khi chưa phát hiện. Discover đổi icon và cờ, Hide phục hồi icon chưa khám phá. Save chỉ thêm discovered=true nếu đã phát hiện; Load gọi Discover khi cờ được ghi.

### Nguồn đối chiếu

- [components/questowner.lua:49–109](../source/scripts/components/questowner.lua).

- [components/discoverable.lua:1–54](../source/scripts/components/discoverable.lua).

### Phạm vi còn hở

- Chưa nối mọi eventachievement, scrapbook và achievement nền tảng tới điều kiện/grant cụ thể. Không cộng danh mục achievement với questowner thành số nhiệm vụ đang bật.

- Quyền sở hữu tiến độ theo profile/player/world và đồng bộ server cần đọc consumer từng hệ.

<!-- deep-review-world-ecology:end -->

- [achievements.lua:1](../source/scripts/achievements.lua) — text-lua

- [eventachievements.lua:1](../source/scripts/eventachievements.lua) — text-lua

- [eventachievements_splitscreen.lua:1](../source/scripts/eventachievements_splitscreen.lua) — text-lua

- [inspect.lua:1](../source/scripts/inspect.lua) — text-lua

- [lavaarena_achievement_quest_defs.lua:1](../source/scripts/lavaarena_achievement_quest_defs.lua) — text-lua

- [quagmire_achievements.lua:1](../source/scripts/quagmire_achievements.lua) — text-lua

- [scrapbookpartitions.lua:1](../source/scripts/scrapbookpartitions.lua) — text-lua

- [scrapbook_prefabs.lua:1](../source/scripts/scrapbook_prefabs.lua) — text-lua

- [components/discoverable.lua:1](../source/scripts/components/discoverable.lua) — text-lua

- [components/questowner.lua:1](../source/scripts/components/questowner.lua) — text-lua

- [components/scrapbookable.lua:1](../source/scripts/components/scrapbookable.lua) — text-lua
