# Trang trí, viết/vẽ và đồ nội thất

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm trang trí, viết/vẽ và đồ nội thất theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [components/bedazzlement.lua:1](../source/scripts/components/bedazzlement.lua) — text-lua

- [components/bedazzler.lua:1](../source/scripts/components/bedazzler.lua) — text-lua

- [components/drawable.lua:1](../source/scripts/components/drawable.lua) — text-lua

- [components/drawingtool.lua:1](../source/scripts/components/drawingtool.lua) — text-lua

- [components/erasablepaper.lua:1](../source/scripts/components/erasablepaper.lua) — text-lua

- [components/furnituredecor.lua:1](../source/scripts/components/furnituredecor.lua) — text-lua

- [components/furnituredecortaker.lua:1](../source/scripts/components/furnituredecortaker.lua) — text-lua

- [components/papereraser.lua:1](../source/scripts/components/papereraser.lua) — text-lua

- [components/pumpkincarvable.lua:1](../source/scripts/components/pumpkincarvable.lua) — text-lua

- [components/pumpkincarver.lua:1](../source/scripts/components/pumpkincarver.lua) — text-lua

- [components/pumpkinhatcarvable.lua:1](../source/scripts/components/pumpkinhatcarvable.lua) — text-lua

- [components/vase.lua:1](../source/scripts/components/vase.lua) — text-lua

- [components/vasedecoration.lua:1](../source/scripts/components/vasedecoration.lua) — text-lua

- [components/writeable.lua:1](../source/scripts/components/writeable.lua) — text-lua

- [components/writeable_replica.lua:1](../source/scripts/components/writeable_replica.lua) — text-lua

- [prefabs/fence.lua:1](../source/scripts/prefabs/fence.lua) — text-lua

- [prefabs/fence_electric.lua:1](../source/scripts/prefabs/fence_electric.lua) — text-lua

- [prefabs/fence_electric_field.lua:1](../source/scripts/prefabs/fence_electric_field.lua) — text-lua

- [prefabs/fence_rotator.lua:1](../source/scripts/prefabs/fence_rotator.lua) — text-lua

- [prefabs/gravestone.lua:1](../source/scripts/prefabs/gravestone.lua) — text-lua

<!-- deep-review-root-start -->

## Đọc sâu mã nguồn — 08/11/2026

Khóa người viết và persist nội dung trang trí.

Mức đối chiếu của phần này là `source-traced-partial`.

- BeginWriting chỉ nhận khi chưa có writer, đăng ký close/remove của người viết rồi mở UI nếu có HUD. Write yêu cầu đúng writer và giới hạn độ dài UTF-8 theo layout hoặc MAX_WRITEABLE_LENGTH.
- Write hợp lệ lọc nội dung theo platform, SetText, gọi onwritten rồi EndWriting. OnUpdate đóng phiên nếu đang cưỡi, ra xa hoặc không nhìn thấy vật. EndWriting tháo callback, đóng UI và ghi userid/netid người viết.
- Drawable chỉ gọi ondrawn khi image/atlas/nền thay đổi, chuẩn hóa chuỗi rỗng thành nil. OnSave ghi image/atlas/bgimage/bgatlas khi có image; OnLoad đi lại qua OnDrawn.

**Lưu/tải.** Writeable lưu text cùng định danh người viết; tải có nhánh lọc chữ theo Rail/Switch. Khóa writer và UI là trạng thái phiên.

**Phần còn hở.** Các trang trí cụ thể như pumpkin carving/furniture có định dạng và điều kiện bổ sung ngoài hai component này.

[components/writeable.lua dòng 96–117](../source/scripts/components/writeable.lua) · [components/writeable.lua dòng 182–278](../source/scripts/components/writeable.lua) · [components/drawable.lua dòng 43–96](../source/scripts/components/drawable.lua)

<!-- deep-review-root-end -->
