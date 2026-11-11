# Chia màn hình và tiện ích nền tảng

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại inventory theo các module/định nghĩa có thật. Một file có thể thuộc nhiều hệ thống; cần trace riêng trước khi xác nhận hành vi.

- [splitscreenoverlay.lua:1](../source/scripts/splitscreenoverlay.lua) — text-lua

- [splitscreenutils.lua:1](../source/scripts/splitscreenutils.lua) — text-lua

- [splitscreenutils_pc.lua:1](../source/scripts/splitscreenutils_pc.lua) — text-lua

- [splitscreen_ambientsound.lua:1](../source/scripts/splitscreen_ambientsound.lua) — text-lua

- [splitscreen_dsp.lua:1](../source/scripts/splitscreen_dsp.lua) — text-lua

- [splitscreen_dynamicmusic.lua:1](../source/scripts/splitscreen_dynamicmusic.lua) — text-lua

- [components/ambientsound_splitscreen.lua:1](../source/scripts/components/ambientsound_splitscreen.lua) — text-lua

- [components/dynamicmusic_splitscreen.lua:1](../source/scripts/components/dynamicmusic_splitscreen.lua) — text-lua

- [components/seamlessplayerswapper.lua:1](../source/scripts/components/seamlessplayerswapper.lua) — text-lua

<!-- deep-review-root-start -->

## Đọc sâu mã nguồn — 08/11/2026

Chia màn hình được tổ chức bằng instance và định tuyến input.

Mức đối chiếu của phần này là `source-traced-partial`.

- Instances phân biệt Player1, Player2, Server, CaveServer và Overlay. Cờ player2 registered được hỏi riêng với GetIsSplitScreen; tự join và ngắt cùng nhau dùng điều kiện splitscreen.
- StartSplit tạo instance Player2, hiển thị viewport, cấp input và capture controller0/1 cho từng instance. BlockInput/AllowInput gửi command tới instance thay vì sửa trực tiếp instance khác.
- StartSplitScreenGame mở overlay, nạp mod trong slot, lưu KnownModIndex và StartServer ở chế độ offline; chỉ nếu server_started=true mới DisableAllDLC và StartNextInstance để load slot.

**Lưu/tải.** Load slot và mod được phối hợp qua SaveGameIndex; viewport/controller là trạng thái nền tảng.

**Phần còn hở.** Sự hiện diện của code console/splitscreen trong APK chưa xác nhận khả năng bật trên Android.

[splitscreenutils.lua dòng 7–129](../source/scripts/splitscreenutils.lua)

<!-- deep-review-root-end -->
