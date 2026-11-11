# Minigame, đua và trò chơi phụ

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm minigame, đua và trò chơi phụ theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [components/boatracecrew.lua:1](../source/scripts/components/boatracecrew.lua) — text-lua

- [components/boatrace_proximitybeacon.lua:1](../source/scripts/components/boatrace_proximitybeacon.lua) — text-lua

- [components/boatrace_proximitychecker.lua:1](../source/scripts/components/boatrace_proximitychecker.lua) — text-lua

- [components/golfable.lua:1](../source/scripts/components/golfable.lua) — text-lua

- [components/golfballspinner.lua:1](../source/scripts/components/golfballspinner.lua) — text-lua

- [components/golfclub.lua:1](../source/scripts/components/golfclub.lua) — text-lua

- [components/golfclub_reticule.lua:1](../source/scripts/components/golfclub_reticule.lua) — text-lua

- [components/golfpropitem.lua:1](../source/scripts/components/golfpropitem.lua) — text-lua

- [components/hideandseeker.lua:1](../source/scripts/components/hideandseeker.lua) — text-lua

- [components/hideandseekgame.lua:1](../source/scripts/components/hideandseekgame.lua) — text-lua

- [components/hideandseekhider.lua:1](../source/scripts/components/hideandseekhider.lua) — text-lua

- [components/hideandseekhidingspot.lua:1](../source/scripts/components/hideandseekhidingspot.lua) — text-lua

- [components/kitcoon.lua:1](../source/scripts/components/kitcoon.lua) — text-lua

- [components/kitcoonden.lua:1](../source/scripts/components/kitcoonden.lua) — text-lua

- [components/minigame.lua:1](../source/scripts/components/minigame.lua) — text-lua

- [components/minigame_participator.lua:1](../source/scripts/components/minigame_participator.lua) — text-lua

- [components/minigame_spectator.lua:1](../source/scripts/components/minigame_spectator.lua) — text-lua

- [components/playingcard.lua:1](../source/scripts/components/playingcard.lua) — text-lua

- [components/playingcardsmanager.lua:1](../source/scripts/components/playingcardsmanager.lua) — text-lua

- [components/yotc_racecompetitor.lua:1](../source/scripts/components/yotc_racecompetitor.lua) — text-lua

- [components/yotc_raceprizemanager.lua:1](../source/scripts/components/yotc_raceprizemanager.lua) — text-lua

- [components/yotc_racestart.lua:1](../source/scripts/components/yotc_racestart.lua) — text-lua

- [components/yotc_racestats.lua:1](../source/scripts/components/yotc_racestats.lua) — text-lua

- [components/yotd_raceprizemanager.lua:1](../source/scripts/components/yotd_raceprizemanager.lua) — text-lua

- [prefabs/boatrace_checkpoint.lua:1](../source/scripts/prefabs/boatrace_checkpoint.lua) — text-lua

- [prefabs/boatrace_checkpoint_indicator.lua:1](../source/scripts/prefabs/boatrace_checkpoint_indicator.lua) — text-lua

- [prefabs/boatrace_common.lua:1](../source/scripts/prefabs/boatrace_common.lua) — text-lua

- [prefabs/boatrace_primemate.lua:1](../source/scripts/prefabs/boatrace_primemate.lua) — text-lua

- [prefabs/boatrace_seastack.lua:1](../source/scripts/prefabs/boatrace_seastack.lua) — text-lua

- [prefabs/boatrace_spectator_dragonling.lua:1](../source/scripts/prefabs/boatrace_spectator_dragonling.lua) — text-lua

- [prefabs/boatrace_start.lua:1](../source/scripts/prefabs/boatrace_start.lua) — text-lua

<!-- deep-review-characters-content:start -->

## Đọc sâu mã nguồn — 08/11/2026

Đã trace vòng kích hoạt minigame và lưu/tải trò trốn tìm.

Minigame.Activate luôn Deactivate lượt trước, đặt active=true, phát pulse ngay và lặp mỗi0,75 giây. Pulse tìm spectator là character, loại monster/player và follower đã có leader; tìm player trong participator_dist rồi gắn component tham gia. Deactivate hủy task, phát ms_minigamedeactivated và gọi callback nếu đang active. Intro/playing/outro là state riêng, active không tự có nghĩa đang thi đấu. [components/minigame.lua dòng 3–144](../source/scripts/components/minigame.lua)

HideAndSeekGame active khi còn hiding_spots. RegisterHidingSpot đăng ký onremove/onhidingspotremoved và khởi động pulse1 giây. Pulse nhận player còn sống, visible, trong bình phương hiding_range. Sự kiện phát hiện có finder.isplayer mới tăng num_hiders_found, sau đó unregister và gọi OnHidingSpotFound. Đếm found được giữ riêng để tính thưởng, việc kết thúc dựa hết chỗ trốn. [components/hideandseekgame.lua dòng 3–47](../source/scripts/components/hideandseekgame.lua) · [components/hideandseekgame.lua dòng 83–147](../source/scripts/components/hideandseekgame.lua)

Khi hết hiding_spots, component hủy pulse, gọi OnHideAndSeekOver trước khi xóa seeker listeners và reset found=0. Abort unregister từng spot rồi gọi Abort của spot. Save chỉ khi còn spot, ghi GUIDs và num_hiders_found kèm refs. LoadPostPass tìm newents và đăng ký lại spot. RegisterHidingSpot reset num_hiders_found=0, nên kết quả phục hồi count cần được thử riêng thay giả định giữ nguyên. [components/hideandseekgame.lua dòng 50–81](../source/scripts/components/hideandseekgame.lua) · [components/hideandseekgame.lua dòng 112–174](../source/scripts/components/hideandseekgame.lua)

**Phần còn hở.**

- Chưa trace đầy đủ golf, boatrace, các checkpoint/rank và YOTD/YOTC prize manager.
- Đã nối count found tới bảng thưởng Kitcoonden và dữ liệu hider riêng. Count thưởng reset theo nhánh Lua khi nối lại spot; cần snapshot để định lượng phần thưởng thay đổi trong một lượt thực.

<!-- deep-review-characters-content:end -->

<!-- continuation-review-start -->

## Đọc tiếp lưu/tải và các consumer — 08/11/2026

- HideAndSeekGame dùng hiding_spots để xác định active/kết thúc; num_hiders_found chỉ ghi số do player tìm để tính thưởng. LoadPostPass nạp found rồi gọi RegisterHidingSpot cho từng GUID còn tồn tại, mà hàm này reset found=0. Theo riêng nhánh Lua, nếu ít nhất một spot được nối lại thì count thưởng bị reset; không đồng nghĩa tất cả mèo còn trốn bị xóa.

- Kitcoonden.OnHideAndSeekOver đọc GetNumFound trước khi component reset cuối lượt. Nếu event YOT_CATCOON bật và found>0, nó chọn red pouch theo found và số seeker. Một người nhận [1,1] ở found1..4, [4] ở5..8, [4,4] ở>=9; nhiều người nhận [1], [1,1], [4] tương ứng. Nhánh found==0 nằm bên trong điều kiện found>0 nên không đi tới từ callback này.

- Ngoài nhánh event có found>0, số lựa chọn loot là 1+ceil(found/2) rồi SpawnLootPrefab theo weighted choices. Hiding spot lưu GetSaveRecord của hider đang thật sự trốn và add_component_if_missing; OnLoad dựng lại và HideInSpot. Vì thế cần phân biệt count thưởng bị reset với dữ liệu mèo trốn được giữ trong component khác. Tác động trên một snapshot chạy thực vẫn chưa quan sát.

[components/hideandseekgame.lua dòng 3–47](../source/scripts/components/hideandseekgame.lua) · [components/hideandseekgame.lua dòng 67–80](../source/scripts/components/hideandseekgame.lua) · [components/hideandseekgame.lua dòng 112–174](../source/scripts/components/hideandseekgame.lua) · [prefabs/kitcoonden.lua dòng 244–295](../source/scripts/prefabs/kitcoonden.lua) · [components/hideandseekhidingspot.lua dòng 96–115](../source/scripts/components/hideandseekhidingspot.lua)

[Phạm vi câu hỏi, suy luận và tìm kiếm](../evidence/deep-review-continuation-checks.json).

<!-- continuation-review-end -->
