# Input bàn phím, gamepad, cảm ứng và haptics

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm input bàn phím, gamepad, cảm ứng và haptics theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [controller.vdf:1](../source/scripts/controller.vdf) — support-data

- [haptics.lua:1](../source/scripts/haptics.lua) — text-lua

- [input.lua:1](../source/scripts/input.lua) — text-lua

- [interactiontargetpicker.lua:1](../source/scripts/interactiontargetpicker.lua) — text-lua

- [components/playercontroller.lua:1](../source/scripts/components/playercontroller.lua) — text-lua

- [widgets/actioncontrols.lua:1](../source/scripts/widgets/actioncontrols.lua) — text-lua

- [widgets/controllercrafting.lua:1](../source/scripts/widgets/controllercrafting.lua) — text-lua

- [widgets/controllercrafting_singletab.lua:1](../source/scripts/widgets/controllercrafting_singletab.lua) — text-lua

- [widgets/controllertab_ps4.lua:1](../source/scripts/widgets/controllertab_ps4.lua) — text-lua

<!-- deep-review-root-start -->

## Đọc sâu mã nguồn — 08/11/2026

Input được phân xử qua frontend trước khi tới gameplay.

Mức đối chiếu của phần này là `source-traced-partial`.

- OnControl chuyển control cho màn hình trước; chỉ khi frontend chưa xử lý mới phát sự kiện control. Mouse primary/secondary còn chịu IsMouseEnabled.
- Touch start/move/end/cancel đều có điều kiện UsingTouch. Start ghi ID đang chạm và thời điểm; move tôn trọng khóa focus; end/cancel bỏ ID và giảm số điểm chạm. Back trên Android được gửi sang frontend.
- PlayerController.OnControl dừng khi paused; sau đó xét IsEnabled và HUD blocking. Nhả control có nhánh gửi RemoteStopControl ở client. Không ánh xạ trực tiếp một sự kiện phím thành thao tác game nếu các cổng này chặn.

**Lưu/tải.** Tập touch, focus và control giữ trạng thái tương tác của phiên; không dùng chúng làm trạng thái vật phẩm trong save.

**Phần còn hở.** Mapping phím/controller theo thiết bị và độ trễ native phải xác minh ở nền tảng thực.

[input.lua dòng 263–375](../source/scripts/input.lua) · [components/playercontroller.lua dòng 783–826](../source/scripts/components/playercontroller.lua) · [frontend.lua dòng 611–640](../source/scripts/frontend.lua)

<!-- deep-review-root-end -->
