# Di chuyển, vật lý và điều phối tìm đường

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm di chuyển, vật lý và điều phối tìm đường theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật. Chỉ entrypoint và nhánh đã ghi chú được đọc sâu; không gắn nhãn toàn bộ glob là đã dịch ngược.

- [physics.lua:1](../source/scripts/physics.lua) — text-lua

- [components/carefulwalker.lua:1](../source/scripts/components/carefulwalker.lua) — text-lua

- [components/locomotor.lua:1](../source/scripts/components/locomotor.lua) — text-lua

- [components/playerspeedmult.lua:1](../source/scripts/components/playerspeedmult.lua) — text-lua

- [components/strafer.lua:1](../source/scripts/components/strafer.lua) — text-lua

- [components/stuckdetection.lua:1](../source/scripts/components/stuckdetection.lua) — text-lua

<!-- deep-review-root-start -->

## Đọc sâu mã nguồn — 08/11/2026

Tách điều phối đường đi Lua khỏi truy vấn Pathfinder.

Mức đối chiếu của phần này là `source-traced-partial`.

- FindPath dừng với đích không hợp lệ, bỏ tìm lại khi tile đích trùng tile đã tìm. Nếu IsClear trả true thì ResetPath; nếu bị che, nó hủy tìm kiếm cũ và SubmitSearch khi đã có đường hoặc chưa đợi kết quả.
- Khi đang đợi, OnUpdate đọc GetSearchStatus. Kết quả tìm được trên hai bước thì giữ steps và bắt đầu từ bước thứ hai; đường thẳng ngắn được bỏ steps. Sau kết quả hoặc lỗi, KillSearch và xóa handle.
- Đến điểm hành động, server PushBufferedAction còn client PreviewBufferedAction, sau đó dừng và Clear. Đường đi và thực hiện action là hai giai đoạn có kiểm tra riêng.

**Lưu/tải.** Handle tìm đường là trạng thái truy vấn đang chạy, chưa phải một đường có thể lưu nguyên cho phiên sau.

**Phần còn hở.** Thuật toán tìm đường, collision và kết quả IsClear/SubmitSearch nằm sau API native.

[components/locomotor.lua dòng 1509–1570](../source/scripts/components/locomotor.lua) · [components/locomotor.lua dòng 1794–1864](../source/scripts/components/locomotor.lua)

<!-- deep-review-root-end -->
