# Chat, lệnh người chơi và hội thoại xã hội

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm chat, lệnh người chơi và hội thoại xã hội theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [builtinusercommands.lua:1](../source/scripts/builtinusercommands.lua) — text-lua

- [chathistory.lua:1](../source/scripts/chathistory.lua) — text-lua

- [usercommands.lua:1](../source/scripts/usercommands.lua) — text-lua

- [wordfilter.lua:1](../source/scripts/wordfilter.lua) — text-lua

- [components/npc_talker.lua:1](../source/scripts/components/npc_talker.lua) — text-lua

- [components/talkable.lua:1](../source/scripts/components/talkable.lua) — text-lua

- [components/talker.lua:1](../source/scripts/components/talker.lua) — text-lua

- [components/wisecracker.lua:1](../source/scripts/components/wisecracker.lua) — text-lua

- [widgets/chatqueue.lua:1](../source/scripts/widgets/chatqueue.lua) — text-lua

- [widgets/chattoast.lua:1](../source/scripts/widgets/chattoast.lua) — text-lua

<!-- deep-review-root-start -->

## Đọc sâu mã nguồn — 08/11/2026

Lệnh chat được kiểm quyền trước khi chạy hoặc mở vote.

Mức đối chiếu của phần này là `source-traced-partial`.

- getexectype kiểm tra target tồn tại, quyền tác động admin/bản thân, hasaccessfn, canstartfn và cấp caller. Thiếu quyền có thể chuyển sang vote nếu lệnh cho phép và worldvoter/playervoter thỏa điều kiện.
- runcommand trả riêng DISABLED, DENY và INVALID. Lệnh cần confirm trên client mở popup và tạm auto-pause; xác nhận mới chạy lại với cờ confirm.
- ALLOW ở client xếp localfn và gửi serverfn qua SendSlashCmdToServer; server xếp serverfn vào queue. VOTE gọi StartVote. Nội dung tên lệnh không bỏ qua bước kiểm quyền.

**Lưu/tải.** Queue và vote là trạng thái phiên. Việc một lệnh gây rollback/save phải theo serverfn của chính lệnh đó.

**Phần còn hở.** Thời hạn/tỷ lệ thông qua vote và whitelist các lệnh cụ thể còn phụ thuộc định nghĩa command/worldvoter.

[usercommands.lua dòng 258–347](../source/scripts/usercommands.lua)

<!-- deep-review-root-end -->
