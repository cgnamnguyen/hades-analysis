# Các mode/event Forge và Quagmire

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm các mode/event forge và quagmire theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [gamemodes.lua:1](../source/scripts/gamemodes.lua) — text-lua

- [lavaarena_achievements.lua:1](../source/scripts/lavaarena_achievements.lua) — text-lua

- [lavaarena_achievement_quest_defs.lua:1](../source/scripts/lavaarena_achievement_quest_defs.lua) — text-lua

- [lavaarena_communityprogression.lua:1](../source/scripts/lavaarena_communityprogression.lua) — text-lua

- [quagmire_achievements.lua:1](../source/scripts/quagmire_achievements.lua) — text-lua

- [quagmire_recipebook.lua:1](../source/scripts/quagmire_recipebook.lua) — text-lua

- [components/lavaarenaeventstate.lua:1](../source/scripts/components/lavaarenaeventstate.lua) — text-lua

- [components/lavaarenamobtracker.lua:1](../source/scripts/components/lavaarenamobtracker.lua) — text-lua

- [components/lavaarenamusic.lua:1](../source/scripts/components/lavaarenamusic.lua) — text-lua

- [components/quagmire_hangriness.lua:1](../source/scripts/components/quagmire_hangriness.lua) — text-lua

- [components/quagmire_map.lua:1](../source/scripts/components/quagmire_map.lua) — text-lua

- [components/quagmire_music.lua:1](../source/scripts/components/quagmire_music.lua) — text-lua

- [components/quagmire_recipebook.lua:1](../source/scripts/components/quagmire_recipebook.lua) — text-lua

- [components/quagmire_recipeprices.lua:1](../source/scripts/components/quagmire_recipeprices.lua) — text-lua

- [prefabs/lavaarena_abigail.lua:1](../source/scripts/prefabs/lavaarena_abigail.lua) — text-lua

- [prefabs/lavaarena_abigail_flower.lua:1](../source/scripts/prefabs/lavaarena_abigail_flower.lua) — text-lua

- [prefabs/lavaarena_bernie.lua:1](../source/scripts/prefabs/lavaarena_bernie.lua) — text-lua

- [prefabs/lavaarena_fossilizing.lua:1](../source/scripts/prefabs/lavaarena_fossilizing.lua) — text-lua

- [prefabs/lavaarena_lucy.lua:1](../source/scripts/prefabs/lavaarena_lucy.lua) — text-lua

- [prefabs/quagmire_burnt_ingredients.lua:1](../source/scripts/prefabs/quagmire_burnt_ingredients.lua) — text-lua

<!-- deep-review-characters-content:start -->

## Đọc sâu mã nguồn — 08/11/2026

Đã trace replication của Forge và mô hình hangriness của Quagmire tới ranh giới server data.

LavaarenaEventState tạo netvars round, victory state, progression JSON và quest JSON theo số slot tối đa server. VictoryState là Playing0/Victory1/Defeat2. Khi victory dirty hoặc playeractivated và state>0, client hợp lệ ngoài dedicated phát endofmatch với cờ victory. GetCurrentRound trả ít nhất1. [components/lavaarenaeventstate.lua dòng 11–79](../source/scripts/components/lavaarenaeventstate.lua)

Quagmire hangriness có MAX_HANGRY=6000 và các mức gia tốc. DoDelta clamp0..6000, OnUpdate tích phân vận tốc/gia tốc từng khoảng threshold bằng dx=(v0+0,5*a*dt)*dt, xử lý hết một threshold rồi dùng thời gian dư. GetTimeRemaining giải phương trình theo từng khoảng bằng (sqrt(v0²+2*a*dx)-v0)/a. GetLevel dựa current<=0 hoặc speed>=8 thành3, speed>=4 thành2. [components/quagmire_hangriness.lua dòng 11–17](../source/scripts/components/quagmire_hangriness.lua) · [components/quagmire_hangriness.lua dòng 58–83](../source/scripts/components/quagmire_hangriness.lua) · [components/quagmire_hangriness.lua dòng 173–243](../source/scripts/components/quagmire_hangriness.lua)

Craving match/mismatch gọi _serverdata.OnCravingMatch/OnCravingMismatch, đồng bộ current/levelstart, đặt lại syncdelay và rumble rồi phát sự kiện matched. Start/Stop cũng gọi serverdata. Forge chuyển master_postinit sang event_server_data ở dòng76; Quagmire lấy serverdata riêng ở dòng160. Wrapper công khai không đủ để suy luật thắng, điểm, phần thưởng, save hoặc toàn bộ server loop. [components/quagmire_hangriness.lua dòng 89–123](../source/scripts/components/quagmire_hangriness.lua) · [components/quagmire_hangriness.lua dòng 153–163](../source/scripts/components/quagmire_hangriness.lua) · [components/quagmire_hangriness.lua dòng 203–215](../source/scripts/components/quagmire_hangriness.lua) · [components/lavaarenaeventstate.lua dòng 75–79](../source/scripts/components/lavaarenaeventstate.lua)

Loader event_server_data dựng đường dẫn eventname.._event_server/..path và gọi requireeventfile, có cache EventServerFiles. Tìm theo tên trong cây source/scripts, game-code/scripts, decoded scripts và archive-members.csv không thấy file đích *_event_server của hai wrapper này. File assets/databundles/klump.zip giữ trong APK đã trích có0 ZIP entries. Đây là giới hạn tìm tĩnh trong gói cục bộ, chưa xác định engine hoặc một nguồn tải ngoài có cấp dữ liệu đó hay không. [entityscript.lua dòng 75–87](../source/scripts/entityscript.lua)

**Phần còn hở.**

- Nội dung master_postinit và các OnCravingMatch/OnStart của event_server_data chưa được giải trong nguồn public đã đọc.
- Chưa xác minh các mode/event này đang bật hay có server hỗ trợ, cũng chưa trace vòng enemy waves, price và reward đầy đủ.

<!-- deep-review-characters-content:end -->
