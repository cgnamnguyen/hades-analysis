# Đặt công trình, đào phá và xây dựng

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm đặt công trình, đào phá và xây dựng theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [prefabutil.lua:1](../source/scripts/prefabutil.lua) — text-lua

- [components/constructionbuilder.lua:1](../source/scripts/components/constructionbuilder.lua) — text-lua

- [components/constructionbuilderuidata.lua:1](../source/scripts/components/constructionbuilderuidata.lua) — text-lua

- [components/constructionplans.lua:1](../source/scripts/components/constructionplans.lua) — text-lua

- [components/constructionsite.lua:1](../source/scripts/components/constructionsite.lua) — text-lua

- [components/constructionsite_replica.lua:1](../source/scripts/components/constructionsite_replica.lua) — text-lua

- [components/deployable.lua:1](../source/scripts/components/deployable.lua) — text-lua

- [components/deployhelper.lua:1](../source/scripts/components/deployhelper.lua) — text-lua

- [components/placer.lua:1](../source/scripts/components/placer.lua) — text-lua

- [components/portablestructure.lua:1](../source/scripts/components/portablestructure.lua) — text-lua

- [components/terraformer.lua:1](../source/scripts/components/terraformer.lua) — text-lua

- [components/terraformerremoveable.lua:1](../source/scripts/components/terraformerremoveable.lua) — text-lua

- [components/workable.lua:1](../source/scripts/components/workable.lua) — text-lua

- [components/worker.lua:1](../source/scripts/components/worker.lua) — text-lua

- [components/workmultiplier.lua:1](../source/scripts/components/workmultiplier.lua) — text-lua

## Đọc sâu mã nguồn — 08/11/2026

**Mức bằng chứng bổ sung — source-traced-partial.** Đã đọc xác nhận vị trí đặt, hạn chế người đặt và tiến độ phá/khai thác công trình.

**Kiểm tra vị trí.** IsDeployable thử restrictedtag. Người cưỡi chỉ được đi tiếp với vật có complexprojectile; người giữ floater chỉ với boatbuilder. CanDeploy chọn hàm Map theo DEPLOYMODE riêng cho đất, turf, cây, tường, nước hoặc custom. Chế độ CUSTOM ưu tiên _custom_candeploy_fn, sau đó mới dùng CanDeployMastAtPoint. [components/deployable.lua:89–130](../source/scripts/components/deployable.lua).

**Thực hiện deploy.** Deploy ép pt.y=0, kiểm tra CanDeploy lại và trả false,reason nếu không đạt. Nếu đạt thì gọi ondeploy với rotation mặc định0, phát deployitem và thêm itemplanted cho deployedplant. Việc tạo entity và trừ item nằm trong callback ondeploy cụ thể. [components/deployable.lua:132–148](../source/scripts/components/deployable.lua).

**Phá và khai thác.** WorkedBy gọi ShouldRecoil để sửa lượng work rồi WorkedBy_Internal. Hàm nhân workmultiplierfn, giảm workleft khi lượng dương, chốt về0 khi workleft<=1 hoặc phần dư<0,01. Nó phát working/worked, gọi onwork, rồi nếu xong gọi onfinish, workfinished/finishedwork và plantkilled ở cây sống hợp lệ. [components/workable.lua:123–171](../source/scripts/components/workable.lua).

**Giữ tiến độ.** Workable.OnSave ghi maxwork/workleft khi savestate. Load nhận giá trị hoặc dùng mặc định hiện tại rồi gọi onloadfn. Cấu trúc deploy sử dụng record prefab/entity thay vì record riêng trong Deployable đã đọc. [components/workable.lua:106–121](../source/scripts/components/workable.lua).

**Phần còn phải kiểm tra trong nhóm này.**

- Map collision/build border và validation trong native chưa được xác minh bằng chạy game.
- Chưa duyệt toàn bộ callback construction site/plans và deploy item cụ thể, nên chưa có danh sách chi phí/hoàn trả cho mọi công trình.
