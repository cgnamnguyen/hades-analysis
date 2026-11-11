# Tương tác tổng quát, kiểm tra và kích hoạt

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại inventory theo các module/định nghĩa có thật. Một file có thể thuộc nhiều hệ thống; cần trace riêng trước khi xác nhận hành vi.

- [components/activatable.lua:1](../source/scripts/components/activatable.lua) — text-lua

- [components/appraisable.lua:1](../source/scripts/components/appraisable.lua) — text-lua

- [components/attunable.lua:1](../source/scripts/components/attunable.lua) — text-lua

- [components/attuner.lua:1](../source/scripts/components/attuner.lua) — text-lua

- [components/closeinspector.lua:1](../source/scripts/components/closeinspector.lua) — text-lua

- [components/grabbable.lua:1](../source/scripts/components/grabbable.lua) — text-lua

- [components/harvestable.lua:1](../source/scripts/components/harvestable.lua) — text-lua

- [components/inspectable.lua:1](../source/scripts/components/inspectable.lua) — text-lua

- [components/key.lua:1](../source/scripts/components/key.lua) — text-lua

- [components/linkeditem.lua:1](../source/scripts/components/linkeditem.lua) — text-lua

- [components/linkeditemmanager.lua:1](../source/scripts/components/linkeditemmanager.lua) — text-lua

- [components/lock.lua:1](../source/scripts/components/lock.lua) — text-lua

- [components/markable.lua:1](../source/scripts/components/markable.lua) — text-lua

- [components/markable_proxy.lua:1](../source/scripts/components/markable_proxy.lua) — text-lua

- [components/named.lua:1](../source/scripts/components/named.lua) — text-lua

- [components/named_replica.lua:1](../source/scripts/components/named_replica.lua) — text-lua

- [components/occupiable.lua:1](../source/scripts/components/occupiable.lua) — text-lua

- [components/occupier.lua:1](../source/scripts/components/occupier.lua) — text-lua

- [components/poppable.lua:1](../source/scripts/components/poppable.lua) — text-lua

- [components/pushable.lua:1](../source/scripts/components/pushable.lua) — text-lua

- [components/searchable.lua:1](../source/scripts/components/searchable.lua) — text-lua

- [components/teacher.lua:1](../source/scripts/components/teacher.lua) — text-lua

- [components/toggleableitem.lua:1](../source/scripts/components/toggleableitem.lua) — text-lua

- [components/tributable.lua:1](../source/scripts/components/tributable.lua) — text-lua

<!-- deep-review-characters-content:start -->

## Đọc sâu mã nguồn — 08/11/2026

Đã trace activate, attune, dạy công thức và đặt tên có lưu/tải.

Activatable.CanActivate mặc định dùng inactive, nhưng callback CanActivateFn có thể thay cả success và reason. DoActivate không tự gọi CanActivate, trả nil khi không OnActivate, còn khi có callback nó đặt inactive=false trước khi gọi. Chỉ callback thành công mới phát onactivated; thất bại không tự rollback inactive. Caller cần kiểm tra quyền thực hiện và consumer cần tái-arm khi muốn dùng lại. [components/activatable.lua dòng 21–68](../source/scripts/components/activatable.lua)

Attunable.CanAttune đòi userid không rỗng, component attuner và player chưa linked. LinkToPlayer chạy onattunecostfn trước khi tạo link, trừ khi isloading. Sau đó tạo attunable_classified, gắn tag/target, phát attuned và theo dõi player bị remove hoặc attuned mới. Unlink xóa classified và listeners rồi gọi callback. Save giữ userid của cả player online và link chưa tái gắn. [components/attunable.lua dòng 82–145](../source/scripts/components/attunable.lua)

Attunable.Load ánh xạ AllPlayers theo userid. Link có player online được phục hồi qua LinkToPlayer(player,true) để bỏ qua trả phí lại; link chưa online được giữ trong attuned_userids. Named.Save giữ name/nameformat/author net id; Load phát lại SetName cho replica. SetName(nil) trở về tên mặc định theo prefab và xóa tên replica. [components/attunable.lua dòng 148–163](../source/scripts/components/attunable.lua) · [components/named.lua dòng 9–51](../source/scripts/components/named.lua)

Teacher.Teach xóa chính item và trả false nếu recipe chưa được gán. Nếu target thiếu builder, đã biết recipe hoặc CanLearn false thì thất bại, trả KNOWN/CANTLEARN ở các nhánh tương ứng. Thành công UnlockRecipe, gọi onteach rồi Remove item. Item chỉ bị tiêu ở nhánh thành công hoặc dữ liệu recipe rỗng, không bị tiêu cho trường hợp đã biết. [components/teacher.lua dòng 1–30](../source/scripts/components/teacher.lua)

**Phần còn hở.**

- Chưa trace toàn bộ inspect text, occupiable, tribute, key/lock và linkeditem managers.
- Chi phí attune nằm ở callback prefab, persistence offline cần ghép event player join trong constructor và server session.

<!-- deep-review-characters-content:end -->
