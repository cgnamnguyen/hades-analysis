# Thực vật tự nhiên, thu hoạch và hồi phục

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm thực vật tự nhiên, thu hoạch và hồi phục theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật. Chỉ entrypoint và nhánh đã ghi chú được đọc sâu; không gắn nhãn toàn bộ glob là đã dịch ngược.

- [regrowthutil.lua:1](../source/scripts/regrowthutil.lua) — text-lua

- [components/diseaseable.lua:1](../source/scripts/components/diseaseable.lua) — text-lua

- [components/growable.lua:1](../source/scripts/components/growable.lua) — text-lua

- [components/pickable.lua:1](../source/scripts/components/pickable.lua) — text-lua

- [components/plantregrowth.lua:1](../source/scripts/components/plantregrowth.lua) — text-lua

- [components/regrowthmanager.lua:1](../source/scripts/components/regrowthmanager.lua) — text-lua

- [components/witherable.lua:1](../source/scripts/components/witherable.lua) — text-lua

- [prefabs/berrybush.lua:1](../source/scripts/prefabs/berrybush.lua) — text-lua

- [prefabs/deciduoustrees.lua:1](../source/scripts/prefabs/deciduoustrees.lua) — text-lua

- [prefabs/evergreens.lua:1](../source/scripts/prefabs/evergreens.lua) — text-lua

- [prefabs/grass.lua:1](../source/scripts/prefabs/grass.lua) — text-lua

- [prefabs/sapling.lua:1](../source/scripts/prefabs/sapling.lua) — text-lua

## Đọc sâu mã nguồn — 08/11/2026

**Mức bằng chứng bổ sung — source-traced-partial.** Đã đọc điều kiện hái, chu kỳ tái sinh, pause/long-update và growth stage/save.

**Hái và hồi phục.** Pick chỉ chạy khi canbepicked, caninteractwith và không stuck. Nó giảm cycles của cây transplanted, giảm protected_cycles và bật lại witherable khi hết bảo vệ. Sau SpawnProductLoot và onpickedfn, canbepicked=false. Chỉ lên lịch hồi phục nếu có baseregentime và chưa pause/barren/withered; có nhánh external timer và event picked. [components/pickable.lua:535–583](../source/scripts/components/pickable.lua).

**Pause và mô phỏng dài hạn.** Pause giữ phần targettime-GetTime và hủy task. Resume chọn phần pause_time qua SpringGrowthMod rồi hẹn lại nếu cây chưa đầy/barren. LongUpdate trừ dt khỏi lịch, dùng SpringGrowthMod và Regen ngay nếu hết hạn; external timer có setter riêng. [components/pickable.lua:99–123](../source/scripts/components/pickable.lua) · [components/pickable.lua:147–194](../source/scripts/components/pickable.lua).

**Lưu/tải cây hái.** OnSave ghi picked/transplanted/paused/cycles/stuck và phần thời gian floor khi còn dương. OnLoad khôi phục trạng thái full/empty/barren và callback hình ảnh, dựng lại timer chỉ ở nhánh internal; bảo vệ cycles còn có thể disable witherable. External timer phải được component sở hữu timer phục hồi. [components/pickable.lua:295–376](../source/scripts/components/pickable.lua).

**Nhiều giai đoạn sinh trưởng.** Growable lấy time từ current stage hoặc fallback, dừng nếu stage không hợp lệ hoặc timefn trả nil. DoGrowth chạy pregrowfn, SetStage trừ growonly, gọi growfn nếu được phép và khởi động chặng sau. Save ghi stage/time/sleeptime/usetimemultiplier; Load scale lại time khi cần. LongUpdate có thể đi qua nhiều stage và chỉ gọi growfn cuối phù hợp. [components/growable.lua:42–78](../source/scripts/components/growable.lua) · [components/growable.lua:121–150](../source/scripts/components/growable.lua) · [components/growable.lua:227–311](../source/scripts/components/growable.lua).

**Phần còn phải kiểm tra trong nhóm này.**

- Chưa duyệt đủ diseaseable, witherable, regrowth manager và mọi callback của cây tự nhiên.
- Cần đọc chính xác mùa/boost và timer ngoại của từng prefab để không áp một regentime chung cho grass/berrybush/tree.
