# Hư hỏng, giữ tươi, sấy và muối

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm hư hỏng, giữ tươi, sấy và muối theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [components/driedsalticon.lua:1](../source/scripts/components/driedsalticon.lua) — text-lua

- [components/dryable.lua:1](../source/scripts/components/dryable.lua) — text-lua

- [components/dryer.lua:1](../source/scripts/components/dryer.lua) — text-lua

- [components/dryingrack.lua:1](../source/scripts/components/dryingrack.lua) — text-lua

- [components/dryingracksaltcollector.lua:1](../source/scripts/components/dryingracksaltcollector.lua) — text-lua

- [components/perishable.lua:1](../source/scripts/components/perishable.lua) — text-lua

- [components/preservative.lua:1](../source/scripts/components/preservative.lua) — text-lua

- [components/preserver.lua:1](../source/scripts/components/preserver.lua) — text-lua

- [prefabs/icebox.lua:1](../source/scripts/prefabs/icebox.lua) — text-lua

- [prefabs/saltbox.lua:1](../source/scripts/prefabs/saltbox.lua) — text-lua

## Đọc sâu mã nguồn — 08/11/2026

**Mức bằng chứng bổ sung — source-traced-partial.** Đã đọc decay theo môi trường, pha stack, sấy khi mưa và lưu phần thời gian.

**Độ tươi và stack.** Update của Perishable kết hợp owner/world, độ ướt, lạnh/nóng, localPerishMultiplier và PERISH_GLOBAL_MULT. Acid rain có additional_decay riêng. Remaining giảm dt×modifier + additional_decay, bị chặn trên perishtime và Perish khi<=0. Dilute dùng trung bình có trọng số theo số đơn vị stack để pha remainingtime khi gộp. [components/perishable.lua:90–153](../source/scripts/components/perishable.lua) · [components/perishable.lua:168–177](../source/scripts/components/perishable.lua).

**Chu kỳ cập nhật và load.** StartPerishing hủy task cũ, đặt periodic interval 10+random×FRAMES×8 và initial delay random×2. LongUpdate gọi Update với dt khi task tồn tại. Save giữ paused và time, load phục hồi time rồi StopPerishing hoặc StartPerishing theo paused. [components/perishable.lua:253–277](../source/scripts/components/perishable.lua) · [components/perishable.lua:331–351](../source/scripts/components/perishable.lua).

**Sấy và mưa.** StartDrying yêu cầu CanDry, đọc ingredient/product/drytime và phần trăm tươi trước khi Remove vật nguyên liệu. Nếu dữ liệu thiếu thì xóa trạng thái và trả false trước bước Remove. Chỉ Resume nếu protectedfromrain hoặc không phơi mưa; Pause giữ max(0,deadline-GetTime), Resume hẹn DoDry/DoSpoil theo còn ingredient hay không. [components/dryer.lua:176–217](../source/scripts/components/dryer.lua) · [components/dryer.lua:251–270](../source/scripts/components/dryer.lua).

**Thu và phục hồi.** Dryer.Harvest yêu cầu done và harvester có inventory. Nó tạo món, áp phần trăm spoil, kế thừa wetness khi cần rồi GiveItem, xóa trạng thái/timer và callback onharvest. Save ghi ingredient/product/buildfiles/perish/remainingtime; Load phục hồi và đăng ký lại theo mưa. Save cũ thiếu ingredientperish dùng literal100 trong mã, cần giữ đúng thay vì tự đổi thành1. [components/dryer.lua:314–347](../source/scripts/components/dryer.lua) · [components/dryer.lua:390–439](../source/scripts/components/dryer.lua).

**Phần còn phải kiểm tra trong nhóm này.**

- Chưa đọc hết các tag refrigerator/saltbox/perish override và mọi sản phẩm thay thế khi hỏng.
- Quyền sở hữu container, pocket dimensions và bảo quản lúc migration cần đối chiếu caller riêng.
