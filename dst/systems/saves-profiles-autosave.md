# Lưu/tải, profile và autosave

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm lưu/tải, profile và autosave theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [platformpostload.lua:1](../source/scripts/platformpostload.lua) — text-lua

- [playeraccount.lua:1](../source/scripts/playeraccount.lua) — text-lua

- [playerhistory.lua:1](../source/scripts/playerhistory.lua) — text-lua

- [playerprofile.lua:1](../source/scripts/playerprofile.lua) — text-lua

- [savefileupgrades.lua:1](../source/scripts/savefileupgrades.lua) — text-lua

- [saveindex.lua:1](../source/scripts/saveindex.lua) — text-lua

- [shardindex.lua:1](../source/scripts/shardindex.lua) — text-lua

- [shardsaveindex.lua:1](../source/scripts/shardsaveindex.lua) — text-lua

- [components/autosaver.lua:1](../source/scripts/components/autosaver.lua) — text-lua

- [components/shard_autosaver.lua:1](../source/scripts/components/shard_autosaver.lua) — text-lua

<!-- deep-review-root-start -->

## Đọc sâu mã nguồn — 08/11/2026

Autosave, session người chơi và nâng cấp shard index.

Mức đối chiếu của phần này là `source-traced-partial`.

- Master autosave theo đổi cycles chỉ gọi OnSave khi đã qua hơn60 giây từ lúc khởi tạo. OnSave đánh dấu saving và đặt task sau1 giây; task gọi ShardGameIndex.SaveCurrent, ForceSave và cập nhật lastsave.
- Client khi nhận issavingdirty hiện chỉ báo3 giây và gọi SerializeUserSession rồi ForceSave. User session chỉ serialize nếu userid hợp lệ và actor là ThePlayer hoặc đang ở server.
- ShardIndex.Save chỉ ghi khi thỏa dirty/server/frontend; dữ liệu gồm world/server/session/mod/version. Khi load, dữ liệu phải là bảng hợp lệ; thiếu overrides được khởi tạo, phiên bản cũ được nâng rồi lưu lại. Nhánh dedicated có đường chuyển save slot cũ sang shard index.

**Lưu/tải.** Entity record lưu prefab, vị trí và dữ liệu component; quan hệ với platform và tham chiếu được phục hồi theo newents/LoadPostPass. ForceSave và persistent storage còn là API engine.

**Phần còn hở.** Chưa chứng minh tính nguyên tử khi tắt tiến trình, chính sách chọn snapshot và toàn bộ nhánh savefileupgrades.

[components/autosaver.lua dòng 71–169](../source/scripts/components/autosaver.lua) · [networking.lua dòng 311–338](../source/scripts/networking.lua) · [shardindex.lua dòng 21–73](../source/scripts/shardindex.lua) · [shardindex.lua dòng 102–179](../source/scripts/shardindex.lua)

<!-- deep-review-root-end -->
