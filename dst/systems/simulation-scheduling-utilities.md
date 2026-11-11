# Lịch cập nhật và tiện ích mô phỏng

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm lịch cập nhật và tiện ích mô phỏng theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [constants.lua:1](../source/scripts/constants.lua) — text-lua

- [datagrid.lua:1](../source/scripts/datagrid.lua) — text-lua

- [easing.lua:1](../source/scripts/easing.lua) — text-lua

- [fileutil.lua:1](../source/scripts/fileutil.lua) — text-lua

- [generickv.lua:1](../source/scripts/generickv.lua) — text-lua

- [json.lua:1](../source/scripts/json.lua) — text-lua

- [knownerrors.lua:1](../source/scripts/knownerrors.lua) — text-lua

- [math2d.lua:1](../source/scripts/math2d.lua) — text-lua

- [mathutil.lua:1](../source/scripts/mathutil.lua) — text-lua

- [scheduler.lua:1](../source/scripts/scheduler.lua) — text-lua

- [simutil.lua:1](../source/scripts/simutil.lua) — text-lua

- [strict.lua:1](../source/scripts/strict.lua) — text-lua

- [stringutil.lua:1](../source/scripts/stringutil.lua) — text-lua

- [util.lua:1](../source/scripts/util.lua) — text-lua

- [vec3util.lua:1](../source/scripts/vec3util.lua) — text-lua

- [vector3.lua:1](../source/scripts/vector3.lua) — text-lua

- [vecutil.lua:1](../source/scripts/vecutil.lua) — text-lua

- [worldentities.lua:1](../source/scripts/worldentities.lua) — text-lua

- [components/cooldown.lua:1](../source/scripts/components/cooldown.lua) — text-lua

- [components/counter.lua:1](../source/scripts/components/counter.lua) — text-lua

- [components/timer.lua:1](../source/scripts/components/timer.lua) — text-lua

- [components/updatelooper.lua:1](../source/scripts/components/updatelooper.lua) — text-lua

- [util/emoji.lua:1](../source/scripts/util/emoji.lua) — text-lua

- [util/hitbox.lua:1](../source/scripts/util/hitbox.lua) — text-lua

- [util/profanityfilter.lua:1](../source/scripts/util/profanityfilter.lua) — text-lua

- [util/savedata.lua:1](../source/scripts/util/savedata.lua) — text-lua

- [util/sourcemodifierlist.lua:1](../source/scripts/util/sourcemodifierlist.lua) — text-lua

- [util/textcompleter.lua:1](../source/scripts/util/textcompleter.lua) — text-lua

- [util/weighted_list.lua:1](../source/scripts/util/weighted_list.lua) — text-lua

- [util/wordpredictor.lua:1](../source/scripts/util/wordpredictor.lua) — text-lua

<!-- deep-review-root-start -->

## Đọc sâu mã nguồn — 08/11/2026

Lịch task theo tick, giới hạn số lượt và xử lý coroutine lỗi.

Mức đối chiếu của phần này là `source-traced-partial`.

- GetListForTimeFromNow tính wakeuptick bằng ceil((time+dt)/ticktime-0,0001), ép về ít nhất tick hiện tại+1. ExecuteInTime là ExecutePeriodic có limit1; initialdelay mặc định bằng period.
- OnTick chạy callback nếu task chưa hết limit, giảm limit rồi lên lịch lần kế hoặc Cleanup/onfinish. Task coroutine được resume trong Run; yield HIBERNATE và SLEEP chuyển sang danh sách chờ khác nhau.
- Coroutine lỗi được ghi traceback và KillTask. Không xem thời gian task là thời gian offline đã trôi; component có LongUpdate/OnLoad phải tự quyết cách bù thời gian.

**Lưu/tải.** Scheduler mô tả lịch đang chạy. Không có dữ liệu deadline file save được tạo từ những API này nếu component không tự lưu.

**Phần còn hở.** Các task tự sửa queue trong callback và sự khác biệt static/game scheduler cần kiểm tra đúng consumer khi dựng lại.

[scheduler.lua dòng 164–255](../source/scripts/scheduler.lua) · [scheduler.lua dòng 276–300](../source/scripts/scheduler.lua)

<!-- deep-review-root-end -->
