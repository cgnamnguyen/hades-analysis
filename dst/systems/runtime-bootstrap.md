# Khởi động và vòng đời ứng dụng

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm khởi động và vòng đời ứng dụng theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [gamelogic.lua:1](../source/scripts/gamelogic.lua) — text-lua

- [main.lua:1](../source/scripts/main.lua) — text-lua

- [mainfunctions.lua:1](../source/scripts/mainfunctions.lua) — text-lua

- [prefablist.lua:1](../source/scripts/prefablist.lua) — text-lua

- [prefabs.lua:1](../source/scripts/prefabs.lua) — text-lua

- [update.lua:1](../source/scripts/update.lua) — text-lua

<!-- deep-review-root-start -->

## Đọc sâu mã nguồn — 08/11/2026

Khởi tạo mod, các registry dùng chung và nhánh theo kiểu phiên chạy.

Mức đối chiếu của phần này là `source-traced-partial`.

- Nếu MODS_ENABLED tắt, main gọi ModSafeStartup trực tiếp. Nếu bật, phải qua callback KnownModIndex.Load rồi BeginStartupSequence mới gọi cùng đường khởi tạo.
- ModSafeStartup xóa alias hệ thống file, nạp mod trước khi nạp prefabs/global và event_deps. Nó tạo cookbook, plant registry, skill tree, generic KV, scrapbook và camera. Global entity được đặt persists=false.
- Phần shader được dựng khi không phải dedicated server. CHEATS_ENABLED mới nạp debugcommands/debugkeys; USE_MONKEY mới nạp chương trình monkey. Đây là các điều kiện thực trong loader.

**Lưu/tải.** Plant registry và skill tree được bật save_enabled tại khởi tạo. Bản thân global entity không đưa vào save.

**Phần còn hở.** Giá trị các cờ khởi động và lỗi native trong một phiên Android cụ thể cần dữ liệu lúc chạy.

[main.lua dòng 553–752](../source/scripts/main.lua)

<!-- deep-review-root-end -->
