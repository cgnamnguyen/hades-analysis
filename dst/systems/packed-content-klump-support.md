# Gói nội dung Klump và metadata nạp kèm

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại inventory theo các module/định nghĩa có thật. Một file có thể thuộc nhiều hệ thống; cần trace riêng trước khi xác nhận hành vi.

- [klump.lua:1](../source/scripts/klump.lua) — text-lua

- [klump_files.lua:1](../source/scripts/klump_files.lua) — text-lua

<!-- deep-review-root-start -->

## Đọc sâu mã nguồn — 08/11/2026

Klump có điều kiện festival, cipher và cache đã nạp.

Mức đối chiếu của phần này là `source-traced-partial`.

- LoadAccessibleKlumpFiles chỉ vào nhánh Quagmire khi festival hiện tại hoặc trước đó khớp. Với nhánh thông thường, nó duyệt klump_files, lấy cipher từ Profile và chỉ nạp khi có cipher.
- LoadKlumpFile/String kiểm tra loaded_klumps, lưu cipher vào Profile, gọi TheSim.LoadKlumpFile/String rồi đánh dấu đã nạp. Minimal-load trong nhánh upfront có thể bỏ phần chuỗi.
- ApplyKlumpToStringTable giải JSON, tạo bảng theo đường string_id, chọn locale với fallback tiếng Anh. Nội dung được nạp sau có thể thay giá trị STRINGS.

**Lưu/tải.** Cipher được lưu qua Profile, còn cache loaded_klumps thuộc phiên. Nội dung event server dùng requireeventfile và được cache riêng.

**Phần còn hở.** Cipher chưa cấp và dữ liệu event nạp qua engine có thể ngăn đọc đủ nội dung từ các file Lua public.

[klump.lua dòng 3–100](../source/scripts/klump.lua) · [entityscript.lua dòng 77–86](../source/scripts/entityscript.lua)

<!-- deep-review-root-end -->
