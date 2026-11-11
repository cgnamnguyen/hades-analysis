# Bẫy, mìn và bắt giữ

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm bẫy, mìn và bắt giữ theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

Bẫy bắt chuyển sinh vật thành danh sách loot; mine lưu trạng thái armed/sprung/inactive riêng.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- Trap tìm target còn sống có targettag và loại INLIMBO/untrappable. DoTriggerOn chỉ giữ target nếu inventoryitem hoặc lootdropper đánh dấu trappable; trường hợp khác phát safelydisarmedtrap. DoSpring lưu prefab/dữ liệu con bị bắt, khởi động starvation, xóa target khi đã có loot và xử lý baitstealer khác với tiêu mồi.

- Harvest chỉ chạy khi issprung, cache vị trí vì callback có thể xóa bẫy, sinh từng loot rồi GiveItem hoặc thả đất. Perishable được LongUpdate theo thời gian mắc bẫy. Nếu bẫy còn valid và còn finiteuses thì Set lại, hết uses thì Reset. Save giữ cờ, bait GUID, loot, lootdata và số soul; Load hỗ trợ loot cũ dạng string hoặc table.

- Mine đặt task kiểm tra theo testtimefn hoặc 1+random, khi ngủ chuyển khoảng kiểm tra 10 giây. Explode chỉ đặt state, giữ target và gọi onexplode, sát thương do callback quyết định. Save/Load giữ sprung hoặc inactive, trường hợp còn lại Reset.

### Nguồn đối chiếu

- [components/trap.lua:180–242](../source/scripts/components/trap.lua).

- [components/trap.lua:270–398](../source/scripts/components/trap.lua).

- [components/trap.lua:439–490](../source/scripts/components/trap.lua).

- [components/mine.lua:11–33](../source/scripts/components/mine.lua).

- [components/mine.lua:139–228](../source/scripts/components/mine.lua).

### Phạm vi còn hở

- Sát thương, bán kính thực và miễn trừ của teeth/starfish/bramble cần theo prefab và callback tương ứng.

- GiveItem khi đầy túi và starvation timer của từng loại con cần ghép với inventory/timer, chưa xác minh runtime.

<!-- deep-review-world-ecology:end -->

- [traps.lua:1](../source/scripts/traps.lua) — text-lua

- [components/mine.lua:1](../source/scripts/components/mine.lua) — text-lua

- [components/trap.lua:1](../source/scripts/components/trap.lua) — text-lua

- [prefabs/alterguardian_phase3trap.lua:1](../source/scripts/prefabs/alterguardian_phase3trap.lua) — text-lua

- [prefabs/birdtrap.lua:1](../source/scripts/prefabs/birdtrap.lua) — text-lua

- [prefabs/shadow_trap.lua:1](../source/scripts/prefabs/shadow_trap.lua) — text-lua

- [prefabs/trap.lua:1](../source/scripts/prefabs/trap.lua) — text-lua

- [prefabs/trap_bramble.lua:1](../source/scripts/prefabs/trap_bramble.lua) — text-lua

- [prefabs/trap_fumarole.lua:1](../source/scripts/prefabs/trap_fumarole.lua) — text-lua

- [prefabs/trap_fumarole_util.lua:1](../source/scripts/prefabs/trap_fumarole_util.lua) — text-lua

- [prefabs/trap_starfish.lua:1](../source/scripts/prefabs/trap_starfish.lua) — text-lua

- [prefabs/trap_teeth.lua:1](../source/scripts/prefabs/trap_teeth.lua) — text-lua

- [prefabs/trap_vines.lua:1](../source/scripts/prefabs/trap_vines.lua) — text-lua

- [prefabs/wx78_gestalttrapper.lua:1](../source/scripts/prefabs/wx78_gestalttrapper.lua) — text-lua
