# Độ ướt, chống mưa và trú ẩn

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm độ ướt, chống mưa và trú ẩn theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [components/inventoryitemmoisture.lua:1](../source/scripts/components/inventoryitemmoisture.lua) — text-lua

- [components/moisture.lua:1](../source/scripts/components/moisture.lua) — text-lua

- [components/moistureabsorbersource.lua:1](../source/scripts/components/moistureabsorbersource.lua) — text-lua

- [components/moistureabsorberuser.lua:1](../source/scripts/components/moistureabsorberuser.lua) — text-lua

- [components/moistureimmunity.lua:1](../source/scripts/components/moistureimmunity.lua) — text-lua

- [components/moisture_replica.lua:1](../source/scripts/components/moisture_replica.lua) — text-lua

- [components/raindome.lua:1](../source/scripts/components/raindome.lua) — text-lua

- [components/raindomewatcher.lua:1](../source/scripts/components/raindomewatcher.lua) — text-lua

- [components/rainimmunity.lua:1](../source/scripts/components/rainimmunity.lua) — text-lua

- [components/sheltered.lua:1](../source/scripts/components/sheltered.lua) — text-lua

- [components/sheltered_replica.lua:1](../source/scripts/components/sheltered_replica.lua) — text-lua

- [components/waterproofer.lua:1](../source/scripts/components/waterproofer.lua) — text-lua

## Đọc sâu mã nguồn — 08/11/2026

**Mức bằng chứng bổ sung — source-traced-partial.** Đã đọc nguồn ướt, chống mưa, sấy, ngủ và trạng thái được lưu.

**Nước vào.** Rainimmunity làm nhánh nhận mưa trả 0. Tốc độ mưa dùng easing.inSine(precipitationrate,min,max,1) nhân 1-tổng chống nước từ shelter, inventory, inherent và modifiers; tổng>=1 trả 0. FloaterHeld hoặc bathing pool trả maxMoistureRate, kể cả khi không mưa. [components/moisture.lua:212–264](../source/scripts/components/moisture.lua).

**Nước ra.** GetDryingRate trả 0 nếu moisturerate>0. Nếu không, cộng base, externalheaterpower, nhiệt địa phương và độ ướt qua các hàm easing rồi clamp tới mức tối đa. Sleepingbag có dryingrate riêng thay toàn bộ phép cộng thông thường. OnUpdate lấy rain+equipment-drying+externalbonuses, trừ desiccant rồi DoDelta(rate×dt). [components/moisture.lua:287–306](../source/scripts/components/moisture.lua) · [components/moisture.lua:338–375](../source/scripts/components/moisture.lua).

**Lưu/tải.** Moisture.OnSave chỉ ghi moisture, OnLoad nhận giá trị đó khi có data. Rate và mức chống nước được dựng từ component/trang bị/world trong các tick sau, không được ghi cùng ở record này. [components/moisture.lua:378–389](../source/scripts/components/moisture.lua).

**Phần còn phải kiểm tra trong nhóm này.**

- Chưa đọc hết chia ẩm/nhiệt khi split/merge từng inventory item và mọi prefab rain dome.
- Cần nối riêng Waterproofer/Sheltered/RainImmunity tới trang bị để xác định chống mưa cuối cùng của mỗi nhân vật.
