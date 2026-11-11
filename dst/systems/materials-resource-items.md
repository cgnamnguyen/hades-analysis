# Định nghĩa vật liệu, tài nguyên và chế phẩm cơ sở

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại inventory theo các module/định nghĩa có thật. Một file có thể thuộc nhiều hệ thống; cần trace riêng trước khi xác nhận hành vi.

- [prefabs/ash.lua:1](../source/scripts/prefabs/ash.lua) — text-lua

- [prefabs/beardhair.lua:1](../source/scripts/prefabs/beardhair.lua) — text-lua

- [prefabs/boards.lua:1](../source/scripts/prefabs/boards.lua) — text-lua

- [prefabs/boneshard.lua:1](../source/scripts/prefabs/boneshard.lua) — text-lua

- [prefabs/charcoal.lua:1](../source/scripts/prefabs/charcoal.lua) — text-lua

- [prefabs/cutgrass.lua:1](../source/scripts/prefabs/cutgrass.lua) — text-lua

- [prefabs/cutless.lua:1](../source/scripts/prefabs/cutless.lua) — text-lua

- [prefabs/cutlichen.lua:1](../source/scripts/prefabs/cutlichen.lua) — text-lua

- [prefabs/cutreeds.lua:1](../source/scripts/prefabs/cutreeds.lua) — text-lua

- [prefabs/cutstone.lua:1](../source/scripts/prefabs/cutstone.lua) — text-lua

- [prefabs/dreadstone.lua:1](../source/scripts/prefabs/dreadstone.lua) — text-lua

- [prefabs/driftwood.lua:1](../source/scripts/prefabs/driftwood.lua) — text-lua

- [prefabs/driftwood_trees.lua:1](../source/scripts/prefabs/driftwood_trees.lua) — text-lua

- [prefabs/feathers.lua:1](../source/scripts/prefabs/feathers.lua) — text-lua

- [prefabs/flint.lua:1](../source/scripts/prefabs/flint.lua) — text-lua

- [prefabs/gears.lua:1](../source/scripts/prefabs/gears.lua) — text-lua

- [prefabs/gem.lua:1](../source/scripts/prefabs/gem.lua) — text-lua

- [prefabs/goldnugget.lua:1](../source/scripts/prefabs/goldnugget.lua) — text-lua

- [prefabs/log.lua:1](../source/scripts/prefabs/log.lua) — text-lua

- [prefabs/nitre.lua:1](../source/scripts/prefabs/nitre.lua) — text-lua

- [prefabs/poop.lua:1](../source/scripts/prefabs/poop.lua) — text-lua

- [prefabs/rocks.lua:1](../source/scripts/prefabs/rocks.lua) — text-lua

- [prefabs/rope.lua:1](../source/scripts/prefabs/rope.lua) — text-lua

- [prefabs/silk.lua:1](../source/scripts/prefabs/silk.lua) — text-lua

- [prefabs/transistor.lua:1](../source/scripts/prefabs/transistor.lua) — text-lua

- [prefabs/twigs.lua:1](../source/scripts/prefabs/twigs.lua) — text-lua

<!-- deep-review-characters-content:start -->

## Đọc sâu mã nguồn — 08/11/2026

Đã trace prefab vật liệu gỗ, cỏ, gem, ash và rope với consumer thật.

Boards gắn edible loại WOOD nhưng health/hunger0, stack LARGEITEM, fuel LARGE_FUEL, burnable/propagator và repairer MATERIALS.WOOD với REPAIR_BOARDS_HEALTH. Các component gameplay chỉ được thêm sau mastersim check. Cutgrass dùng stack SMALLITEM, edible ROUGHAGE, health HEALING_TINY, hunger CALORIES_TINY/2, fuel SMALL_FUEL và repairer HAY. Cấu hình thành phần quyết định vật liệu đi vào hệ ăn, đốt, sửa, stack. [prefabs/boards.lua dòng 6–57](../source/scripts/prefabs/boards.lua) · [prefabs/cutgrass.lua dòng 6–63](../source/scripts/prefabs/cutgrass.lua)

Gem factory buildgem tạo purple/blue/red/orange/yellow/green và opalpreciousgem. Các gem chung gắn gem/molebait/quakedebris, edible ELEMENTAL hunger5, repairer GEM, stack SMALLITEM, tradable và bait. Chu kỳ sparkle chỉ chạy animation rồi hẹn lại sau4+random giây. Đây là factory tên prefab có dữ liệu màu, mỗi màu vẫn có scale float riêng. [prefabs/gem.lua dòng 6–91](../source/scripts/prefabs/gem.lua)

Ash đặt task biến mất qua component disappears. Pickup dừng biến mất, ondropped chuẩn bị lại, haunt gọi Disappear ngay và không bật cooldown/fx haunt thường. Stack lớn hơn1 xóa tên remains; inspect status dùng tên còn giữ. Prefab ash có edible BURNT health20/hunger20, nhưng eater còn phải cho phép loại thức ăn đó. Không suy mọi player đều ăn được ash từ con số này. [prefabs/ash.lua dòng 9–31](../source/scripts/prefabs/ash.lua) · [prefabs/ash.lua dòng 65–107](../source/scripts/prefabs/ash.lua)

Rope nhận target có tag canrope. OnUsedRope chuyển lời gọi sang target.OnUsedRope, trả success/reason từ target, và nếu rope còn tồn tại thì task static0 giải phóng in-use. Chính prefab rope không tự quyết định lượng bị tiêu hao cho mọi target. Rope còn có fuel MED_FUEL, stackable và burnable. Các ví dụ vật liệu này dùng component persistence chung; prefab không khai báo save riêng cho các thông số định nghĩa. [prefabs/rope.lua dòng 6–31](../source/scripts/prefabs/rope.lua) · [prefabs/rope.lua dòng 61–81](../source/scripts/prefabs/rope.lua)

**Phần còn hở.**

- Chưa giải đủ mọi khác biệt của26 file vật liệu, bảng loot của từng nguồn khai thác và mọi recipe tiêu thụ.
- Save/load stack, wetness và disappears cần theo các component tương ứng; bảng definition không phải state của một vật phẩm cụ thể.

<!-- deep-review-characters-content:end -->
