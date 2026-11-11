# Âm thanh, nhạc động và DSP

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm âm thanh, nhạc động và dsp theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [deferredaudio.lua:1](../source/scripts/deferredaudio.lua) — text-lua

- [guitartab_dsmaintheme.lua:1](../source/scripts/guitartab_dsmaintheme.lua) — text-lua

- [mixer.lua:1](../source/scripts/mixer.lua) — text-lua

- [mixes.lua:1](../source/scripts/mixes.lua) — text-lua

- [notetable_dsmaintheme.lua:1](../source/scripts/notetable_dsmaintheme.lua) — text-lua

- [preloadsounds.lua:1](../source/scripts/preloadsounds.lua) — text-lua

- [splitscreen_ambientsound.lua:1](../source/scripts/splitscreen_ambientsound.lua) — text-lua

- [splitscreen_dsp.lua:1](../source/scripts/splitscreen_dsp.lua) — text-lua

- [splitscreen_dynamicmusic.lua:1](../source/scripts/splitscreen_dynamicmusic.lua) — text-lua

- [components/ambientsound.lua:1](../source/scripts/components/ambientsound.lua) — text-lua

- [components/ambientsound_overlay.lua:1](../source/scripts/components/ambientsound_overlay.lua) — text-lua

- [components/ambientsound_splitscreen.lua:1](../source/scripts/components/ambientsound_splitscreen.lua) — text-lua

- [components/clientpickupsoundsuppressor.lua:1](../source/scripts/components/clientpickupsoundsuppressor.lua) — text-lua

- [components/dsp.lua:1](../source/scripts/components/dsp.lua) — text-lua

- [components/dsp_overlay.lua:1](../source/scripts/components/dsp_overlay.lua) — text-lua

- [components/dynamicmusic.lua:1](../source/scripts/components/dynamicmusic.lua) — text-lua

- [components/dynamicmusic_overlay.lua:1](../source/scripts/components/dynamicmusic_overlay.lua) — text-lua

- [components/dynamicmusic_splitscreen.lua:1](../source/scripts/components/dynamicmusic_splitscreen.lua) — text-lua

- [components/grottowaterfallsoundcontroller.lua:1](../source/scripts/components/grottowaterfallsoundcontroller.lua) — text-lua

- [components/instrument.lua:1](../source/scripts/components/instrument.lua) — text-lua

- [components/lavaarenamusic.lua:1](../source/scripts/components/lavaarenamusic.lua) — text-lua

- [components/lunarhailbirdsoundmanager.lua:1](../source/scripts/components/lunarhailbirdsoundmanager.lua) — text-lua

- [components/playerhearing.lua:1](../source/scripts/components/playerhearing.lua) — text-lua

- [components/quagmire_music.lua:1](../source/scripts/components/quagmire_music.lua) — text-lua

- [components/vaultmusiclistener.lua:1](../source/scripts/components/vaultmusiclistener.lua) — text-lua

<!-- deep-review-root-start -->

## Đọc sâu mã nguồn — 08/11/2026

Âm lượng được phối bằng stack mix và mức ưu tiên.

Mức đối chiếu của phần này là `source-traced-partial`.

- Mix lưu levels, priority và fadeintime; Apply gửi từng channel cho TheSim.SetSoundVolume. PushMix sắp stack theo priority giảm dần, tạo snapshot khi top thay và Apply ngay nếu chưa có top.
- Update nội suy từng channel từ snapshot đến mức mix top theo thời gian; qua thời lượng fade thì bỏ snapshot và Apply top. PopMix tạo chuyển tiếp nếu top thay, DeleteMix áp top mới trực tiếp trong nhánh đã đọc.
- Cơ chế mix dùng thời gian trình bày và mức âm lượng engine, độc lập với điều kiện gameplay tạo ra yêu cầu đổi mix.

**Lưu/tải.** Các hàm đã đọc không có OnSave/OnLoad. Tùy chọn âm lượng và dựng lại mix cần theo Profile và sự kiện môi trường.

**Phần còn hở.** Nhạc theo từng boss/season và DSP native có quy tắc consumer riêng.

[mixer.lua dòng 3–109](../source/scripts/mixer.lua) · [mixer.lua dòng 112–158](../source/scripts/mixer.lua)

<!-- deep-review-root-end -->
