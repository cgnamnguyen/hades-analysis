# Behaviour tree và tác vụ AI

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm behaviour tree và tác vụ ai theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [behaviourtree.lua:1](../source/scripts/behaviourtree.lua) — text-lua

- [behaviours/approach.lua:1](../source/scripts/behaviours/approach.lua) — text-lua

- [behaviours/attackwall.lua:1](../source/scripts/behaviours/attackwall.lua) — text-lua

- [behaviours/avoidelectricfence.lua:1](../source/scripts/behaviours/avoidelectricfence.lua) — text-lua

- [behaviours/avoidlight.lua:1](../source/scripts/behaviours/avoidlight.lua) — text-lua

- [behaviours/beargeroffscreen.lua:1](../source/scripts/behaviours/beargeroffscreen.lua) — text-lua

- [behaviours/chaseandattack.lua:1](../source/scripts/behaviours/chaseandattack.lua) — text-lua

- [behaviours/chaseandattackandavoid.lua:1](../source/scripts/behaviours/chaseandattackandavoid.lua) — text-lua

- [behaviours/chaseandram.lua:1](../source/scripts/behaviours/chaseandram.lua) — text-lua

- [behaviours/chattynode.lua:1](../source/scripts/behaviours/chattynode.lua) — text-lua

- [behaviours/controlminions.lua:1](../source/scripts/behaviours/controlminions.lua) — text-lua

- [behaviours/doaction.lua:1](../source/scripts/behaviours/doaction.lua) — text-lua

- [behaviours/faceentity.lua:1](../source/scripts/behaviours/faceentity.lua) — text-lua

- [behaviours/findclosest.lua:1](../source/scripts/behaviours/findclosest.lua) — text-lua

- [behaviours/findfarmplant.lua:1](../source/scripts/behaviours/findfarmplant.lua) — text-lua

- [behaviours/findflower.lua:1](../source/scripts/behaviours/findflower.lua) — text-lua

- [behaviours/findlight.lua:1](../source/scripts/behaviours/findlight.lua) — text-lua

- [behaviours/follow.lua:1](../source/scripts/behaviours/follow.lua) — text-lua

- [behaviours/leash.lua:1](../source/scripts/behaviours/leash.lua) — text-lua

- [behaviours/leashandavoid.lua:1](../source/scripts/behaviours/leashandavoid.lua) — text-lua

- [behaviours/minperiod.lua:1](../source/scripts/behaviours/minperiod.lua) — text-lua

- [behaviours/panic.lua:1](../source/scripts/behaviours/panic.lua) — text-lua

- [behaviours/panicandavoid.lua:1](../source/scripts/behaviours/panicandavoid.lua) — text-lua

- [behaviours/runaway.lua:1](../source/scripts/behaviours/runaway.lua) — text-lua

- [behaviours/runtodist.lua:1](../source/scripts/behaviours/runtodist.lua) — text-lua

- [behaviours/stalkerchaseandattack.lua:1](../source/scripts/behaviours/stalkerchaseandattack.lua) — text-lua

- [behaviours/standandattack.lua:1](../source/scripts/behaviours/standandattack.lua) — text-lua

- [behaviours/standstill.lua:1](../source/scripts/behaviours/standstill.lua) — text-lua

- [behaviours/useshield.lua:1](../source/scripts/behaviours/useshield.lua) — text-lua

- [behaviours/wander.lua:1](../source/scripts/behaviours/wander.lua) — text-lua

<!-- deep-review-root-start -->

## Đọc sâu mã nguồn — 08/11/2026

Thứ tự chạy Sequence, Selector và Priority của AI.

Mức đối chiếu của phần này là `source-traced-partial`.

- BT.Update gọi Visit, SaveStatus và Step trên root. Sequence giữ chỉ số child khi RUNNING, dừng tại child FAILED/RUNNING và chỉ SUCCESS khi đi hết. Selector chọn child đầu tiên SUCCESS/RUNNING, chỉ FAILED nếu hết lựa chọn.
- PriorityNode đánh giá lại khi chưa có lasttime, không có period hoặc đã vượt lasttime+period. Child có ưu tiên cao hơn có thể thay child đang chạy; các child bị bỏ được Reset. Khi chưa tới lượt đánh giá lại, chỉ child hiện tại RUNNING được Visit.
- GetTreeSleepTime chọn thời gian nhỏ nhất trong các child RUNNING và bản thân node; giá trị nil được đưa lên cơ chế hibernate của BrainManager. Vì vậy nhịp đánh giá ưu tiên khác nhịp chạy child hiện tại.

**Lưu/tải.** Đã đọc state machine điều phối của cây trong bộ nhớ. Không tự coi SaveStatus là ghi file save.

**Phần còn hở.** EventNode, Parallel và decorator của từng consumer còn có biến thể; hành vi đích đến phụ thuộc các node task.

[behaviourtree.lua dòng 12–43](../source/scripts/behaviourtree.lua) · [behaviourtree.lua dòng 117–138](../source/scripts/behaviourtree.lua) · [behaviourtree.lua dòng 319–375](../source/scripts/behaviourtree.lua) · [behaviourtree.lua dòng 541–638](../source/scripts/behaviourtree.lua)

<!-- deep-review-root-end -->
