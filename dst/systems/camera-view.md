# Camera, rung, fade và góc nhìn

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm camera, rung, fade và góc nhìn theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [camerashake.lua:1](../source/scripts/camerashake.lua) — text-lua

- [viewport.lua:1](../source/scripts/viewport.lua) — text-lua

- [cameras/followcamera.lua:1](../source/scripts/cameras/followcamera.lua) — text-lua

- [components/camerafade.lua:1](../source/scripts/components/camerafade.lua) — text-lua

- [components/focalpoint.lua:1](../source/scripts/components/focalpoint.lua) — text-lua

<!-- deep-review-root-start -->

## Đọc sâu mã nguồn — 08/11/2026

Nội suy camera và độ trong suốt của vật che góc nhìn.

Mức đối chiếu của phần này là `source-traced-partial`.

- FollowCamera đưa distance về distancetarget khi sai số dưới 0,01; nếu còn xa thì lerp theo dt và gain của chế độ zoom. Pitch được nội suy từ khoảng cách, sau đó Apply và thông báo listener.
- CameraFade.Enable chỉ bật wall update khi entity đang thức. Entity sleep dừng cập nhật; wake bật lại nếu enabled hoặc alpha chưa về 1. Tắt tức thời đặt màu và alpha về 1.
- Alpha đích phụ thuộc khoảng chiếu theo hướng camera, symbol ở giữa màn hình và chiều cao nếu có cấu hình. Alpha thực tiến theo 0,95*alpha + 0,05*percent; đạt sai số 1/255 thì chốt giá trị.

**Lưu/tải.** Nhánh đọc là trạng thái trình bày và wall update, chưa xác nhận yêu cầu persist cho camera ở mọi platform.

**Phần còn hở.** Các preset camera, camera boat và thông số hiệu chỉnh theo từng thiết bị cần rà consumer tương ứng.

[cameras/followcamera.lua dòng 543–584](../source/scripts/cameras/followcamera.lua) · [components/camerafade.lua dòng 22–139](../source/scripts/components/camerafade.lua)

<!-- deep-review-root-end -->
