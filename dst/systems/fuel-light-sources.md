# Nhiên liệu và nguồn sáng

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm nhiên liệu và nguồn sáng theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [components/fuel.lua:1](../source/scripts/components/fuel.lua) — text-lua

- [components/fueled.lua:1](../source/scripts/components/fueled.lua) — text-lua

- [components/fueled_replica.lua:1](../source/scripts/components/fueled_replica.lua) — text-lua

- [components/fueler.lua:1](../source/scripts/components/fueler.lua) — text-lua

- [components/fuelmaster.lua:1](../source/scripts/components/fuelmaster.lua) — text-lua

- [components/lighter.lua:1](../source/scripts/components/lighter.lua) — text-lua

- [components/lightningblocker.lua:1](../source/scripts/components/lightningblocker.lua) — text-lua

- [components/lightpostpartner.lua:1](../source/scripts/components/lightpostpartner.lua) — text-lua

- [components/lighttweener.lua:1](../source/scripts/components/lighttweener.lua) — text-lua

- [prefabs/campfire.lua:1](../source/scripts/prefabs/campfire.lua) — text-lua

- [prefabs/firepit.lua:1](../source/scripts/prefabs/firepit.lua) — text-lua

- [prefabs/nightlight.lua:1](../source/scripts/prefabs/nightlight.lua) — text-lua

- [prefabs/torch.lua:1](../source/scripts/prefabs/torch.lua) — text-lua

## Đọc sâu mã nguồn — 08/11/2026

**Mức bằng chứng bổ sung — source-traced-partial.** Đã đọc nhận nhiên liệu, hao theo thời gian, section callback và persistence.

**Nhận nhiên liệu.** TakeFuelItem yêu cầu accepting, fuel/fueler có đúng primary hoặc secondary fueltype và cantakefuelitemfn cho phép. Lượng cộng là fuelvalue × bonusmult × multfn × wet penalty × fuelmaster mastery. Sau DoDelta, gọi fuel.Taken, callback của item nếu có, Remove entity nhiên liệu được truyền vào và phát takefuel. [components/fueled.lua:173–234](../source/scripts/components/fueled.lua).

**Hao và cạn.** StartConsuming đặt consuming rồi tạo periodic task; firstperiod có nhánh wall-update tôn trọng server pause. DoUpdate khi consuming trừ dt × rate × rate_modifiers. DoDelta clamp fuel trong [0,maxfuel], đổi section sẽ callback và onfueldsectionchanged, tới0 gọi depleted. DoUpdate dừng consuming khi empty và vẫn gọi updatefn nếu có. [components/fueled.lua:273–349](../source/scripts/components/fueled.lua).

**Lưu/tải.** Fueled.OnSave chỉ ghi currentfuel khi khácmax. Load InitializeFuelLevel(max(0,fuel)); InitializeFuelLevel có thể nâng maxfuel để chứa dữ liệu được tải và cập nhật section/replica. LongUpdate là alias của DoUpdate. Firepit còn lưu queued_charcoal riêng ở prefab, vì record fuel không bao hết trạng thái sản phẩm phụ. [components/fueled.lua:137–147](../source/scripts/components/fueled.lua) · [components/fueled.lua:293–311](../source/scripts/components/fueled.lua) · [components/fueled.lua:351–363](../source/scripts/components/fueled.lua) · [prefabs/firepit.lua:114–121](../source/scripts/prefabs/firepit.lua).

**Phần còn phải kiểm tra trong nhóm này.**

- Cường độ Light/heat/animation của campfire/firepit/torch/nightlight do từng section callback quyết định, chưa duyệt mọi prefab nguồn sáng.
- Caller của refuel phải chia stack đúng lượng trước TakeFuelItem nếu muốn tiêu từng đơn vị, vì component nhận rồi xóa entity item được truyền vào.
