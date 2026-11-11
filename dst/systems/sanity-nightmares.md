# Sanity, ảo giác và nguy hiểm bóng tối

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm sanity, ảo giác và nguy hiểm bóng tối theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [components/brightmarespawner.lua:1](../source/scripts/components/brightmarespawner.lua) — text-lua

- [components/grue.lua:1](../source/scripts/components/grue.lua) — text-lua

- [components/hallucinations.lua:1](../source/scripts/components/hallucinations.lua) — text-lua

- [components/sanity.lua:1](../source/scripts/components/sanity.lua) — text-lua

- [components/sanityaura.lua:1](../source/scripts/components/sanityaura.lua) — text-lua

- [components/sanityauraadjuster.lua:1](../source/scripts/components/sanityauraadjuster.lua) — text-lua

- [components/sanity_replica.lua:1](../source/scripts/components/sanity_replica.lua) — text-lua

- [components/shadowcreaturespawner.lua:1](../source/scripts/components/shadowcreaturespawner.lua) — text-lua

- [components/shadowhandspawner.lua:1](../source/scripts/components/shadowhandspawner.lua) — text-lua

- [prefabs/nightmarecreature.lua:1](../source/scripts/prefabs/nightmarecreature.lua) — text-lua

- [prefabs/nightmarefissure.lua:1](../source/scripts/prefabs/nightmarefissure.lua) — text-lua

- [prefabs/nightmarefuel.lua:1](../source/scripts/prefabs/nightmarefuel.lua) — text-lua

- [prefabs/nightmaregrowth.lua:1](../source/scripts/prefabs/nightmaregrowth.lua) — text-lua

- [prefabs/nightmarelight.lua:1](../source/scripts/prefabs/nightmarelight.lua) — text-lua

- [prefabs/nightmarelightfx.lua:1](../source/scripts/prefabs/nightmarelightfx.lua) — text-lua

- [prefabs/nightmarerock.lua:1](../source/scripts/prefabs/nightmarerock.lua) — text-lua

- [prefabs/nightmare_timepiece.lua:1](../source/scripts/prefabs/nightmare_timepiece.lua) — text-lua

- [prefabs/shadowcreature.lua:1](../source/scripts/prefabs/shadowcreature.lua) — text-lua

## Đọc sâu mã nguồn — 08/11/2026

**Mức bằng chứng bổ sung — source-traced-partial.** Đã đọc hysteresis sanity/lunacy, tổng nguồn thay đổi và trình tự Grue tấn công trong tối.

**Mode và ngưỡng đổi trạng thái.** Nguồn lunacy quyết định SANITY_MODE_LUNACY hoặc INSANITY. DoDelta giới hạn current từ 0 tới max×(1-penalty). Insanity và lunacy dùng hai cặp ngưỡng vào/ra riêng; sau đổi trạng thái phát gosane, goinsane hoặc goenlightened. Phần trăm dùng xét ngưỡng ở nhánh này là current/max. [components/sanity.lua:175–186](../source/scripts/components/sanity.lua) · [components/sanity.lua:377–435](../source/scripts/components/sanity.lua).

**Tổng mức biến thiên.** OnUpdate bỏ Recalc khi invincible, spawnprotection, sleeping, teleport hoặc ignore không redirect. Recalc cộng dapper, moisture, light, aura, ghost và external modifiers, cộng custom_rate_fn rồi nhân rate_modifier, cuối cùng DoDelta(rate×dt,true). Aura có kiểm tra immunity theo tag và tránh trùng base aura name. [components/sanity.lua:437–465](../source/scripts/components/sanity.lua) · [components/sanity.lua:550–610](../source/scripts/components/sanity.lua).

**Grue trong tối.** Grue chỉ bắt đầu nếu entity không invincible, không trong ánh sáng, chưa chết và không thể thấy trong tối. Hit đầu sau 5+random×5 giây, các hit sau 5+random×6. Khi level vượt resistance, Grue đi qua Combat.GetAttacked với stimuli darkness, giảm sanity và phát attackedbygrue; nonlethal có thể giới hạn damage trước khi gửi. [components/grue.lua:111–124](../source/scripts/components/grue.lua) · [components/grue.lua:170–223](../source/scripts/components/grue.lua).

**Dữ liệu lưu.** Sanity lưu current, sane và mode. Load khôi phục sane/mode trước rồi gọi DoDelta(0) khi có current, vì thế ngưỡng và event được tính lại. Các bộ spawner shadow/brightmare là component riêng. [components/sanity.lua:258–278](../source/scripts/components/sanity.lua).

**Phần còn phải kiểm tra trong nhóm này.**

- Chưa duyệt toàn bộ trạng thái shadowcreaturespawner, brightmarespawner và lịch spawn nightmare theo khu vực.
- Grue đã đọc nhánh timer/attack, chưa xác minh mọi callback ánh sáng, sleep và quyền server lúc chạy.
