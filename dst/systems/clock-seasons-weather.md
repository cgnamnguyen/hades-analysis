# Ngày đêm, mùa và thời tiết

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm ngày đêm, mùa và thời tiết theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

Ngày đêm, mùa và mưa dùng state server có tick cục bộ và sửa dữ liệu save cũ.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- Clock giảm thời gian pha. Trong cùng segment, client/server tự tick; đổi segment thì mastersim sync và client chờ ranh giới. Chỉ mastershard tự chuyển pha, sang phase1 tăng cycles, phát ms_cyclecomplete và cập nhật chu kỳ mặt trăng. OnAdvanceSeason của seasons nhận chu kỳ để giảm remainingdays hoặc chuyển mùa trong mode cycle.

- Weather tích moisture khi chưa có precipitation; khi đạt ceiling server StartPrecipitation. Trong lúc mưa nó giảm moisture theo preciprate × dt × PRECIP_RATE_SCALE và dừng khi xuống floor. always/never ép bắt đầu/dừng. Tốc độ mưa động dùng p đã clamp [0,1], sin(p × PI), MIN_PRECIP_RATE và peak rate.

- Clock save segs/cycles/phase/remaining/mooomphasecycle; Load dùng default segments nếu tổng sai NUM_SEGS và suy moon cycle cho save cũ. Seasons save mode/season/lengths/độ dài day-dusk-night, Load sửa tổng segment không hợp lệ và dùng TUNING độ dài còn thiếu. Weather save moisture, snow, lunarhail, lightning, wetness rồi PushWeather sau Load.

### Nguồn đối chiếu

- [components/clock.lua:322–388](../source/scripts/components/clock.lua).

- [components/clock.lua:462–517](../source/scripts/components/clock.lua).

- [components/seasons.lua:267–294](../source/scripts/components/seasons.lua).

- [components/seasons.lua:484–539](../source/scripts/components/seasons.lua).

- [components/weather.lua:383–410](../source/scripts/components/weather.lua).

- [components/weather.lua:879–925](../source/scripts/components/weather.lua).

- [components/weather.lua:1131–1194](../source/scripts/components/weather.lua).

### Phạm vi còn hở

- Còn các nhánh endless-season, moonstorm/sandstorm, tuyết, hail và lightning strike placement; chưa dùng công thức mưa cho mọi kiểu precipitation.

- Giá trị weather runtime có thể bị worldsetting/mod thay; engine perlin và sync packet chưa được kiểm chứng bằng chạy nhiều shard.

<!-- deep-review-world-ecology:end -->

- [components/clock.lua:1](../source/scripts/components/clock.lua) — text-lua

- [components/moonstorms.lua:1](../source/scripts/components/moonstorms.lua) — text-lua

- [components/sandstorms.lua:1](../source/scripts/components/sandstorms.lua) — text-lua

- [components/sandstormwatcher.lua:1](../source/scripts/components/sandstormwatcher.lua) — text-lua

- [components/seasons.lua:1](../source/scripts/components/seasons.lua) — text-lua

- [components/stormwatcher.lua:1](../source/scripts/components/stormwatcher.lua) — text-lua

- [components/weather.lua:1](../source/scripts/components/weather.lua) — text-lua

- [components/worldstate.lua:1](../source/scripts/components/worldstate.lua) — text-lua

- [components/worldwind.lua:1](../source/scripts/components/worldwind.lua) — text-lua

- [prefabs/rain.lua:1](../source/scripts/prefabs/rain.lua) — text-lua

- [prefabs/raincoat.lua:1](../source/scripts/prefabs/raincoat.lua) — text-lua

- [prefabs/raindrop.lua:1](../source/scripts/prefabs/raindrop.lua) — text-lua

- [prefabs/rainometer.lua:1](../source/scripts/prefabs/rainometer.lua) — text-lua

- [prefabs/snow.lua:1](../source/scripts/prefabs/snow.lua) — text-lua

- [prefabs/snowball_item.lua:1](../source/scripts/prefabs/snowball_item.lua) — text-lua

- [prefabs/snowman.lua:1](../source/scripts/prefabs/snowman.lua) — text-lua
