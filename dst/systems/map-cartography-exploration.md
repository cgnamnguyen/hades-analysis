# Bản đồ, mở vùng và đánh dấu

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm bản đồ, mở vùng và đánh dấu theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

MapRecorder gắn bản đồ với session thế giới và tiêu bản đồ khi học thành công.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- RecordMap chỉ hỗ trợ player có player_classified.MapExplorer, thiếu trả NOEXPLORER. Nó RecordMap và giữ session_identifier, worldprefab, tên tác giả, cycles+1. Dữ liệu rỗng thì ClearMap và trả BLANK.

- TeachMap xóa item nếu rỗng, từ chối WRONGWORLD nếu session không trùng và NOEXPLORER nếu người học không hợp lệ. LearnRecordedMap phải trả thành công mới gọi onteachfn, xóa item và trả true. Map data không được nhận chỉ vì cùng tên worldprefab.

- Save giữ mapdata/mapsession/maplocation/mapauthor/mapday. Load chỉ phục hồi đủ khi có cả mapdata và mapsession; có nhánh cập nhật maplocation riêng và gọi ondatachangedfn khi dirty. TransferComponent chuyển cả năm field sang item mới.

### Nguồn đối chiếu

- [components/maprecorder.lua:13–148](../source/scripts/components/maprecorder.lua).

### Phạm vi còn hở

- Dữ liệu RecordMap/LearnRecordedMap và fog-of-war nằm sau MapExplorer engine; chưa xác minh thuật toán hợp nhất hoặc rò bản đồ qua shard.

- Các hệ maprevealable, message bottle treasure và icon toàn cục cần các consumer riêng, chưa suy đầy đủ từ MapRecorder.

<!-- deep-review-world-ecology:end -->

- [maputil.lua:1](../source/scripts/maputil.lua) — text-lua

- [messagebottletreasures.lua:1](../source/scripts/messagebottletreasures.lua) — text-lua

- [components/globaltrackingicon.lua:1](../source/scripts/components/globaltrackingicon.lua) — text-lua

- [components/map.lua:1](../source/scripts/components/map.lua) — text-lua

- [components/mapdeliverable.lua:1](../source/scripts/components/mapdeliverable.lua) — text-lua

- [components/maprecorder.lua:1](../source/scripts/components/maprecorder.lua) — text-lua

- [components/maprevealable.lua:1](../source/scripts/components/maprevealable.lua) — text-lua

- [components/maprevealer.lua:1](../source/scripts/components/maprevealer.lua) — text-lua

- [components/mapspotrevealer.lua:1](../source/scripts/components/mapspotrevealer.lua) — text-lua

- [components/messagebottlemanager.lua:1](../source/scripts/components/messagebottlemanager.lua) — text-lua

- [components/pointofinterest.lua:1](../source/scripts/components/pointofinterest.lua) — text-lua

- [prefabs/mapscroll.lua:1](../source/scripts/prefabs/mapscroll.lua) — text-lua

- [screens/mapscreen.lua:1](../source/scripts/screens/mapscreen.lua) — text-lua

- [widgets/mapactionover.lua:1](../source/scripts/widgets/mapactionover.lua) — text-lua

- [widgets/mapcontrols.lua:1](../source/scripts/widgets/mapcontrols.lua) — text-lua

- [widgets/maptoast.lua:1](../source/scripts/widgets/maptoast.lua) — text-lua

- [widgets/mapwidget.lua:1](../source/scripts/widgets/mapwidget.lua) — text-lua
