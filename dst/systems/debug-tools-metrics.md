# Debug, profiler, công cụ và metrics

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm debug, profiler, công cụ và metrics theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [consolecommands.lua:1](../source/scripts/consolecommands.lua) — text-lua

- [consolescreensettings.lua:1](../source/scripts/consolescreensettings.lua) — text-lua

- [debugcommands.lua:1](../source/scripts/debugcommands.lua) — text-lua

- [debughelpers.lua:1](../source/scripts/debughelpers.lua) — text-lua

- [debugkeys.lua:1](../source/scripts/debugkeys.lua) — text-lua

- [debugmenu.lua:1](../source/scripts/debugmenu.lua) — text-lua

- [debugprint.lua:1](../source/scripts/debugprint.lua) — text-lua

- [debugsounds.lua:1](../source/scripts/debugsounds.lua) — text-lua

- [debugtools.lua:1](../source/scripts/debugtools.lua) — text-lua

- [dumper.lua:1](../source/scripts/dumper.lua) — text-lua

- [entitydebug.lua:1](../source/scripts/entitydebug.lua) — text-lua

- [metricstracker.lua:1](../source/scripts/metricstracker.lua) — text-lua

- [monkey.lua:1](../source/scripts/monkey.lua) — text-lua

- [perfutil.lua:1](../source/scripts/perfutil.lua) — text-lua

- [profiler.lua:1](../source/scripts/profiler.lua) — text-lua

- [stacktrace.lua:1](../source/scripts/stacktrace.lua) — text-lua

- [stats.lua:1](../source/scripts/stats.lua) — text-lua

- [widgetdebug.lua:1](../source/scripts/widgetdebug.lua) — text-lua

- [components/debugger.lua:1](../source/scripts/components/debugger.lua) — text-lua

- [components/dpstracker.lua:1](../source/scripts/components/dpstracker.lua) — text-lua

- [components/playermetrics.lua:1](../source/scripts/components/playermetrics.lua) — text-lua

- [dbui/debug_panel.lua:1](../source/scripts/dbui/debug_panel.lua) — text-lua

- [dbui/imgui.lua:1](../source/scripts/dbui/imgui.lua) — text-lua

- [dbui/imgui_demo.lua:1](../source/scripts/dbui/imgui_demo.lua) — text-lua

- [tools/generate_worldgenoverride.lua:1](../source/scripts/tools/generate_worldgenoverride.lua) — text-lua

- [tools/getmissingstrings.lua:1](../source/scripts/tools/getmissingstrings.lua) — text-lua

<!-- deep-review-root-start -->

## Đọc sâu mã nguồn — 08/11/2026

Metrics và công cụ debug có cổng bật riêng.

Mức đối chiếu của phần này là `source-traced-partial`.

- MetricsTracker.Init/Log/Save/Update và đăng ký watcher đều dừng nếu METRICS_TRACKER_ENABLED tắt. Init đăng ký sự kiện hành động, thu/mất đồ, chỉ số, chết, nấu/xây và màn hình.
- Log tránh nối bản ghi giống bản ghi cuối. Save nối các dòng rồi SetPersistentString vào client_metrics theo date_time_str; Update chỉ Save khi vượt AUTO_SAVE_INTERVAL.
- Main chỉ require debugcommands/debugkeys khi CHEATS_ENABLED; chương trình monkey chỉ nạp khi USE_MONKEY. Frontend mở console/debug menu còn kiểm tra cờ tương ứng.

**Lưu/tải.** Metrics ghi file qua API persistent, khác với world/user session. Giá trị cờ và đường đích thực tế cần phiên chạy.

**Phần còn hở.** Các console command cụ thể và profiler native chưa được coi là đường thao tác gameplay thông thường.

[metricstracker.lua dòng 236–355](../source/scripts/metricstracker.lua) · [main.lua dòng 723–738](../source/scripts/main.lua) · [frontend.lua dòng 634–640](../source/scripts/frontend.lua)

<!-- deep-review-root-end -->
