# Hệ sinh thái và trạng thái chuyên biệt

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm hệ sinh thái và trạng thái chuyên biệt theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [giantutils.lua:1](../source/scripts/giantutils.lua) — text-lua

- [components/deciduoustreeupdater.lua:1](../source/scripts/components/deciduoustreeupdater.lua) — text-lua

- [components/forestpetrification.lua:1](../source/scripts/components/forestpetrification.lua) — text-lua

- [components/hunter.lua:1](../source/scripts/components/hunter.lua) — text-lua

- [components/kramped.lua:1](../source/scripts/components/kramped.lua) — text-lua

- [components/luckitem.lua:1](../source/scripts/components/luckitem.lua) — text-lua

- [components/luckuser.lua:1](../source/scripts/components/luckuser.lua) — text-lua

- [components/lureplantspawner.lua:1](../source/scripts/components/lureplantspawner.lua) — text-lua

- [components/oasis.lua:1](../source/scripts/components/oasis.lua) — text-lua

- [components/petrifiable.lua:1](../source/scripts/components/petrifiable.lua) — text-lua

- [components/worlddeciduoustreeupdater.lua:1](../source/scripts/components/worlddeciduoustreeupdater.lua) — text-lua

<!-- deep-review-characters-content:start -->

## Đọc sâu mã nguồn — 08/11/2026

Đã trace naughtiness/Krampus, tác động luck âm và chu kỳ hóa đá rừng.

Kramped nhận sự kiện killed cho player khi KRAMPUS_THRESHOLD khác-1. Chỉ victim có NAUGHTY_VALUE mới tăng actions, nhân stackmult, trừ ngoại lệ pigman đang werebeast và victim ký sinh shadowthrall. Lần đầu random threshold. Khi actions đạt ngưỡng dương, reset actions/threshold trước khi spawn. Số Krampus phụ thuộc cycles và các mốc tăng, tuning ramp<1 dừng spawn. Điểm spawn có thể không tìm được. [components/kramped.lua dòng 45–100](../source/scripts/components/kramped.lua) · [components/kramped.lua dòng 116–137](../source/scripts/components/kramped.lua)

Naughtiness tự giảm1 khi timetodecay<0, rồi đặt lại chu kỳ decay. Dữ liệu _activeplayers được tạo lúc join và xóa lúc left ở component này. LuckUser cộng các nguồn luck; luck<0 thêm modifier trọng số bị hound nhắm là1+abs(luck), và bật hound_thief_sources khi luck<=-1. Khi luck không âm hoặc source bị gỡ, các modifier tương ứng bị gỡ. Đây là hiệu ứng có consumer cụ thể, chưa phải luật đổi mọi loot roll. [components/kramped.lua dòng 194–205](../source/scripts/components/kramped.lua) · [components/luckuser.lua dòng 1–49](../source/scripts/components/luckuser.lua)

ForestPetrification đăng ký cây petrifiable, tìm các sector chưa visited, tăng numfound cho entity chưa có. Chỉ mở rộng sector nằm trong MAX_SPAN_SQ. Update dùng workleft=MAX_WORK để chia lượt tìm. Khi hàng đợi rỗng, nhánh PetrifyForest chỉ chạy với numfound>0 và numfound<PETRIFICATION_THRESHOLD*tracked; nếu không đạt, thử lại hoặc vào cooldown. PetrifyForest chỉ gọi Petrify trên cây còn index và phát announce ở tâm trung bình. [components/forestpetrification.lua dòng 63–115](../source/scripts/components/forestpetrification.lua) · [components/forestpetrification.lua dòng 152–165](../source/scripts/components/forestpetrification.lua) · [components/forestpetrification.lua dòng 207–241](../source/scripts/components/forestpetrification.lua)

ForestPetrification.Save chỉ giữ cooldown theo ngày, dùng0 để ghi lượt đang tìm. Load phục hồi cooldown>=1 sau floor; LoadPostPass khởi động tìm mới nếu cooldown=0. LongUpdate quy đổi dt ra ngày và có thể hoàn thành nhiều bước tìm/cooldown. Hàng đợi sector không được serialize trong nhánh này. [components/forestpetrification.lua dòng 244–299](../source/scripts/components/forestpetrification.lua)

**Phần còn hở.**

- Hunter/track/beast, oasis và deciduous-tree ecology chưa được trace đầy đủ trong trang này.
- Cần kiểm nghiệm state naughtiness qua rời server và cơ chế tập cây/đăng ký lại khi tải sector, trước khi suy lịch hóa đá cho map cụ thể.

<!-- deep-review-characters-content:end -->
