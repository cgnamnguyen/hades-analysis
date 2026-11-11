# Lõi entity, component và prefab

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm lõi entity, component và prefab theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [class.lua:1](../source/scripts/class.lua) — text-lua

- [componentutil.lua:1](../source/scripts/componentutil.lua) — text-lua

- [entityreplica.lua:1](../source/scripts/entityreplica.lua) — text-lua

- [entityscript.lua:1](../source/scripts/entityscript.lua) — text-lua

- [entityscriptproxy.lua:1](../source/scripts/entityscriptproxy.lua) — text-lua

- [metaclass.lua:1](../source/scripts/metaclass.lua) — text-lua

- [standardcomponents.lua:1](../source/scripts/standardcomponents.lua) — text-lua

<!-- deep-review-root-start -->

## Đọc sâu mã nguồn — 08/11/2026

Vòng đời component và thứ tự khôi phục dữ liệu entity.

Mức đối chiếu của phần này là `source-traced-partial`.

- AddComponent kiểm tra trùng tên không phân biệt hoa thường, trả component cũ nếu đã có. Component mới được replicate, tạo instance, gắn vào bảng, chạy ComponentPostInit của mod rồi đăng ký action.
- RemoveComponent dừng cập nhật thường và wall update, tháo component, gọi OnRemoveFromEntity rồi unreplicate và bỏ action. Callback dọn task của từng component là một phần của vòng đời này.
- GetPersistData gom bảng OnSave không rỗng và danh sách tham chiếu của component, sau đó gọi OnSave của entity. SetPersistData có nhánh add_component_if_missing trước OnPreLoad, gọi OnLoad từng component rồi OnLoad của entity. LoadPostPass giải các liên kết khi đã có bảng newents.

**Lưu/tải.** Record giữ dữ liệu component theo tên. Thứ tự pairs không quy định thứ tự tải giữa hai component; liên kết chéo có đường LoadPostPass.

**Phần còn hở.** Các post-init của mod có thể đổi component trước khi hoạt động; cần xét mod đang bật cho từng kết luận.

[entityscript.lua dòng 587–639](../source/scripts/entityscript.lua) · [entityscript.lua dòng 1880–1966](../source/scripts/entityscript.lua) · [class.lua dòng 28–105](../source/scripts/class.lua)

<!-- deep-review-root-end -->
