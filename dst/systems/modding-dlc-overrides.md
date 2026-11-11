# Mod, DLC và ghi đè cấu hình

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm mod, dlc và ghi đè cấu hình theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [config.lua:1](../source/scripts/config.lua) — text-lua

- [dlcsupport.lua:1](../source/scripts/dlcsupport.lua) — text-lua

- [dlcsupport_strings.lua:1](../source/scripts/dlcsupport_strings.lua) — text-lua

- [dlcsupport_worldgen.lua:1](../source/scripts/dlcsupport_worldgen.lua) — text-lua

- [globalvariableoverrides.lua:1](../source/scripts/globalvariableoverrides.lua) — text-lua

- [globalvariableoverrides_clean.lua:1](../source/scripts/globalvariableoverrides_clean.lua) — text-lua

- [globalvariableoverrides_monkey.lua:1](../source/scripts/globalvariableoverrides_monkey.lua) — text-lua

- [globalvariableoverrides_pax_server.lua:1](../source/scripts/globalvariableoverrides_pax_server.lua) — text-lua

- [item_blacklist.lua:1](../source/scripts/item_blacklist.lua) — text-lua

- [modcompatability.lua:1](../source/scripts/modcompatability.lua) — text-lua

- [modindex.lua:1](../source/scripts/modindex.lua) — text-lua

- [mods.lua:1](../source/scripts/mods.lua) — text-lua

- [modutil.lua:1](../source/scripts/modutil.lua) — text-lua

- [reload.lua:1](../source/scripts/reload.lua) — text-lua

- [tuning.lua:1](../source/scripts/tuning.lua) — text-lua

- [tuning_override.lua:1](../source/scripts/tuning_override.lua) — text-lua

<!-- deep-review-root-start -->

## Đọc sâu mã nguồn — 08/11/2026

Môi trường mod và thứ tự can thiệp vào component.

Mức đối chiếu của phần này là `source-traced-partial`.

- CreateEnvironment cung cấp GLOBAL, TUNING và MODROOT; modimport thêm đuôi .lua, nạp bằng kleiloadlua, đặt environment rồi thực thi. Lỗi không tìm thấy hoặc lỗi compile được chuyển thành error.
- InitializeModMain bỏ mod không tương thích mode. File lỗi được ghi failedmods và trả false; thiếu mainfile được coi là có thể bỏ qua và trả true; thực thi safe hoặc thường đều xét status.
- Entity.AddComponent chạy ComponentPostInit sau khi tạo instance và trước RegisterComponentActions. Vì vậy mặc định component có thể bị thay trước khi tương tác, còn khai báo TUNING trong nguồn chưa chốt giá trị đang dùng.

**Lưu/tải.** ShardIndex lưu enabled_mods để load theo phiên. Dữ liệu mod tự lưu tùy hook và component.

**Phần còn hở.** Phải có danh sách mod/config thực để đánh giá xung đột, thứ tự post-init giữa các mod và tương thích mạng.

[mods.lua dòng 297–359](../source/scripts/mods.lua) · [mods.lua dòng 589–621](../source/scripts/mods.lua) · [entityscript.lua dòng 603–622](../source/scripts/entityscript.lua)

<!-- deep-review-root-end -->
