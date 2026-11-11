# Nhiệt độ, lạnh/nóng và cách nhiệt

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm nhiệt độ, lạnh/nóng và cách nhiệt theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [components/freezable.lua:1](../source/scripts/components/freezable.lua) — text-lua

- [components/freezefx.lua:1](../source/scripts/components/freezefx.lua) — text-lua

- [components/fumarolelocaltemperature.lua:1](../source/scripts/components/fumarolelocaltemperature.lua) — text-lua

- [components/heater.lua:1](../source/scripts/components/heater.lua) — text-lua

- [components/insulator.lua:1](../source/scripts/components/insulator.lua) — text-lua

- [components/temperature.lua:1](../source/scripts/components/temperature.lua) — text-lua

- [components/temperatureoverrider.lua:1](../source/scripts/components/temperatureoverrider.lua) — text-lua

- [components/worldtemperature.lua:1](../source/scripts/components/worldtemperature.lua) — text-lua

- [prefabs/heatrock.lua:1](../source/scripts/prefabs/heatrock.lua) — text-lua

## Đọc sâu mã nguồn — 08/11/2026

**Mức bằng chứng bổ sung — source-traced-partial.** Đã nối rate nhiệt với insulation, nguồn sưởi/lạnh, damage và cách load nhiệt độ player.

**Delta và cách nhiệt.** DoDelta nếu không skipinsulation nhân delta nóng với SEG_TIME/(SEG_TIME+summerInsulation), delta lạnh với SEG_TIME/(SEG_TIME+winterInsulation), rồi SetTemperature. OnUpdate bỏ qua khi settemp, teleporting hoặc health invincible. Inventory item còn chịu owner/preserver và fridge. [components/temperature.lua:71–82](../source/scripts/components/temperature.lua) · [components/temperature.lua:311–339](../source/scripts/components/temperature.lua).

**Nguồn nhiệt ở gần.** Heater có falloff dùng 1-distanceSquared/ZERO_DISTSQ và có thể bị cắt bởi radius cutoff. Wetness điều chỉnh heatfactor theo dấu nóng/lạnh. Từng nguồn chỉ kéo nhiệt về hướng phù hợp trước khi chọn rate theo ambient temperature và insulation. Cuối tick nhân preserver rate multiplier, clamp nhiệt theo min/max và áp cold dưới 0 hoặc hot trên overheattemp. [components/temperature.lua:432–514](../source/scripts/components/temperature.lua) · [components/temperature.lua:517–524](../source/scripts/components/temperature.lua).

**Đóng băng.** AddColdness tích coldness không âm và thử resistance. Tag nofreeze chặn chuyển frozen nhưng vẫn giữ mức coldness ở resistance. Freeze chỉ khi visible/chưa chết, dừng brain/locomotor, bỏ target và phát freeze. Unfreeze reset coldness, khởi động brain, phát unfreeze và blank attack 0,3 giây. [components/freezable.lua:137–161](../source/scripts/components/freezable.lua) · [components/freezable.lua:248–303](../source/scripts/components/freezable.lua).

**Lưu/tải nhiệt.** Temperature lưu current và phần hiệu ứng nhiệt trong bụng cùng thời gian còn lại. Load player giới hạn phần khôi phục theo nhiệt độ thế giới và nhiệt hiện tại thay vì gán thẳng giá trị cũ. Entity không phải player được gán current đã lưu rồi OnUpdate(0). [components/temperature.lua:119–153](../source/scripts/components/temperature.lua).

**Phần còn phải kiểm tra trong nhóm này.**

- Chưa duyệt toàn bộ heater, worldtemperature và các nhánh mặc đồ/lều/biến hình.
- Save/load của freezing và tác động onhit lên freezable cần mở rộng riêng.
