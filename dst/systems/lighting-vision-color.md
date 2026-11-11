# Ánh sáng, tầm nhìn và bảng màu

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm ánh sáng, tầm nhìn và bảng màu theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

PlayerVision chọn bảng màu theo thứ tự ưu tiên và xếp nguồn ép night vision bằng priority.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- OnEquipChanged đọc tag nightvision/goggles/nutrientsvision/scrapmonolevision/inspectaclesvision/roseglassesvision từ replica.inventory. Nó đổi cờ và phát sự kiện tương ứng khi không bị force; nutrientsvision chỉ gửi lên world nếu entity là ThePlayer.

- UpdateCCTable ưu tiên ghostvision, rồi overridecctable, nightvision hoặc forcednightvision khi không chặn CC, rồi nightmarevision. Nếu bảng thay đổi thì phát ccoverrides và ccphasefn. Việc có tag nhìn đêm và bảng màu đang dùng là hai trạng thái cần theo dõi riêng.

- PushForcedNightVision gỡ entry cũ cùng source, thêm với priority mặc định 0 và sort giảm dần. Nguồn đầu stack áp nightvision, ambient override và custom CC. Pop bỏ nguồn, trả trạng thái thường khi stack hết hoặc cập nhật bảng theo nguồn đầu mới.

### Nguồn đối chiếu

- [components/playervision.lua:41–81](../source/scripts/components/playervision.lua).

- [components/playervision.lua:172–272](../source/scripts/components/playervision.lua).

### Phạm vi còn hở

- Chưa đo shader/ánh sáng vật lý và render engine. Các hàm này chỉ xác nhận quyền ưu tiên vision/CC và event; không tự chứng minh miễn nhiễm Grue hoặc sát thương bóng tối.

- Nguồn forcedvision và việc tái áp sau load còn phụ thuộc từng prefab/effect consumer; component này không có OnSave riêng trong danh mục đã đọc.

<!-- deep-review-world-ecology:end -->

- [lighting.lua:1](../source/scripts/lighting.lua) — text-lua

- [postprocesseffects.lua:1](../source/scripts/postprocesseffects.lua) — text-lua

- [shadeeffects.lua:1](../source/scripts/shadeeffects.lua) — text-lua

- [components/ambientlighting.lua:1](../source/scripts/components/ambientlighting.lua) — text-lua

- [components/canopylightrays.lua:1](../source/scripts/components/canopylightrays.lua) — text-lua

- [components/canopyshadows.lua:1](../source/scripts/components/canopyshadows.lua) — text-lua

- [components/colourcube.lua:1](../source/scripts/components/colourcube.lua) — text-lua

- [components/nightlightmanager.lua:1](../source/scripts/components/nightlightmanager.lua) — text-lua

- [components/playervision.lua:1](../source/scripts/components/playervision.lua) — text-lua
