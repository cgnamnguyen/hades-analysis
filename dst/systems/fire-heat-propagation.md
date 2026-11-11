# Lửa, âm ỉ và cháy lan

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm lửa, âm ỉ và cháy lan theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật. Chỉ entrypoint và nhánh đã ghi chú được đọc sâu; không gắn nhãn toàn bộ glob là đã dịch ngược.

- [firelevel.lua:1](../source/scripts/firelevel.lua) — text-lua

- [components/burnable.lua:1](../source/scripts/components/burnable.lua) — text-lua

- [components/firebug.lua:1](../source/scripts/components/firebug.lua) — text-lua

- [components/firedetector.lua:1](../source/scripts/components/firedetector.lua) — text-lua

- [components/firefx.lua:1](../source/scripts/components/firefx.lua) — text-lua

- [components/propagator.lua:1](../source/scripts/components/propagator.lua) — text-lua

- [components/smotherer.lua:1](../source/scripts/components/smotherer.lua) — text-lua

- [components/wildfires.lua:1](../source/scripts/components/wildfires.lua) — text-lua

## Đọc sâu mã nguồn — 08/11/2026

**Mức bằng chứng bổ sung — source-traced-partial.** Đã nối ignition, smolder, truyền nhiệt, dập lửa và tiêu công cụ dập.

**Bắt lửa.** Ignite chặn entity đang burning hoặc fireimmune. Nguồn controlled_burner tạo tham số damage/duration theo skilltree, đặt stokeablefire cho entity không có health. Sau StopSmoldering, nó bật burning, theo dõi death, tạo FX, phát onignite, gọi callback, bắt đầu tiêu fueled/truyền propagator và ExtendBurning. [components/burnable.lua:352–388](../source/scripts/components/burnable.lua).

**Âm ỉ và lan nhiệt.** Smolder cập nhật theo nhiệt lân cận và mưa, hết thời gian mới Ignite. Propagator.AddHeat chặn delay/fireimmune và giới hạn heat_this_update, chỉ vượt flashpoint mới gọi onflashpoint, với ngoại lệ nguồn controlled burn. OnUpdate decay currentheat và truyền heatoutput × max(0,1-distanceSquared/rangeSquared) × dt; mùa xuân thay range bằng tuning multiplier. [components/burnable.lua:218–248](../source/scripts/components/burnable.lua) · [components/propagator.lua:137–214](../source/scripts/components/propagator.lua).

**Dập và ngừng hoạt động.** Extinguish dừng smolder trước, tiêu một finiteuse hoặc một đơn vị stack của smotherer nếu được truyền. Với entity burning, hủy task, gỡ listener death, ngừng propagator, xóa controlled burn/stokeablefire, tắt FX và tiêu nhiên liệu, gọi callback rồi onextinguish. [components/burnable.lua:454–494](../source/scripts/components/burnable.lua).

**Phần còn phải kiểm tra trong nhóm này.**

- Trạng thái khi save/load cần theo prefab và entity persistence, Burnable không cung cấp OnSave/OnLoad trong file đã kiểm tra.
- Chưa duyệt đủ Wildfires/FireDetector và các prefab biến thành burnt để khẳng định mọi loại công trình được giữ hoặc phá khi cháy.
