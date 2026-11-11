# Chưa phân loại hoặc cần đọc riêng

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **inventory-closure**.

Bucket dự phòng: trình build chỉ gán các file không khớp nhóm khác; globs rỗng cố ý. Không gọi nhóm này là cơ chế đã hiểu.

<!-- deep-review-root-start -->

## Đọc sâu mã nguồn — 08/11/2026

Bucket chưa phân loại đang rỗng trong system-files hiện có.

Mức đối chiếu của phần này là `inventory-closure`.

- system-files.json không gán file vào unclassified-review. Điều này chỉ xác nhận mọi file đã có ít nhất một nhãn trong taxonomy.
- Các file vẫn ở nhóm cấu trúc được ghi riêng trong needs-topic-review.json; không dùng bucket rỗng để chốt rằng đã đọc mọi hành vi.

**Lưu/tải.** Không có component hoặc payload riêng cho bucket rỗng.

**Phần còn hở.** Độ sâu ngữ nghĩa phải xét ledger theo hệ và các nhánh còn hở, không suy từ unclassified_files=0.

[Danh sách theo hệ](../system-files.json) · [File còn cần phân loại chủ đề](../needs-topic-review.json)

<!-- deep-review-root-end -->
