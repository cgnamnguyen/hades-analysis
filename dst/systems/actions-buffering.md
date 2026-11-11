# Hành động và hàng đợi thao tác

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm hành động và hàng đợi thao tác theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật. Chỉ entrypoint và nhánh đã ghi chú được đọc sâu; không gắn nhãn toàn bộ glob là đã dịch ngược.

- [actions.lua:1](../source/scripts/actions.lua) — text-lua

- [bufferedaction.lua:1](../source/scripts/bufferedaction.lua) — text-lua

- [componentactions.lua:1](../source/scripts/componentactions.lua) — text-lua

- [components/playeractionpicker.lua:1](../source/scripts/components/playeractionpicker.lua) — text-lua

- [components/playercontroller.lua:1](../source/scripts/components/playercontroller.lua) — text-lua

<!-- deep-review-root-start -->

## Đọc sâu mã nguồn — 08/11/2026

Kiểm tra lại hành động đã đệm tại thời điểm thực hiện.

Mức đối chiếu của phần này là `source-traced-partial`.

- BufferedAction lưu doer, target, vật dùng, chủ sở hữu ban đầu của target và DynamicPosition. IsValid kiểm tra entity còn hợp lệ, quyền giữ vật và chủ target còn khớp, platform còn hợp lệ và validfn.
- Do trả false ngay nếu IsValid thất bại. Nếu action.fn chạy, nó trả success/reason. Thành công gọi OnUsedAsItem khi vật còn tồn tại rồi Succeed; thất bại từ action.fn gọi Fail. Hai callback queue đều được xóa sau Succeed hoặc Fail.
- StateGraph.StartAction kiểm tra điều kiện handler rồi vào deststate hoặc gọi PerformBufferedAction. Nhánh preview của client có đường riêng. Vì thế chọn được action chưa bảo đảm thực hiện thành công sau khi actor di chuyển.

**Lưu/tải.** Callback queue là đối tượng đang chạy. Khôi phục hành động cần luồng của component/prefab và trạng thái nhân vật tương ứng.

**Phần còn hở.** 306 action.fn và mọi handler nhân vật không được đồng nhất với wrapper chung; đọc biến thể ở các nhóm gameplay.

[bufferedaction.lua dòng 2–120](../source/scripts/bufferedaction.lua) · [stategraph.lua dòng 399–455](../source/scripts/stategraph.lua)

<!-- deep-review-root-end -->
