# Định nghĩa vật phẩm công cụ, vũ khí và giáp

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại inventory theo các module/định nghĩa có thật. Một file có thể thuộc nhiều hệ thống; cần trace riêng trước khi xác nhận hành vi.

- [components/efficientuser.lua:1](../source/scripts/components/efficientuser.lua) — text-lua

- [components/rechargeable.lua:1](../source/scripts/components/rechargeable.lua) — text-lua

- [components/tool.lua:1](../source/scripts/components/tool.lua) — text-lua

- [prefabs/alterguardianhatshard.lua:1](../source/scripts/prefabs/alterguardianhatshard.lua) — text-lua

- [prefabs/alterguardian_hat_equipped.lua:1](../source/scripts/prefabs/alterguardian_hat_equipped.lua) — text-lua

- [prefabs/armor_bramble.lua:1](../source/scripts/prefabs/armor_bramble.lua) — text-lua

- [prefabs/armor_carrotlure.lua:1](../source/scripts/prefabs/armor_carrotlure.lua) — text-lua

- [prefabs/armor_dragonfly.lua:1](../source/scripts/prefabs/armor_dragonfly.lua) — text-lua

- [prefabs/armor_dreadstone.lua:1](../source/scripts/prefabs/armor_dreadstone.lua) — text-lua

- [prefabs/armor_grass.lua:1](../source/scripts/prefabs/armor_grass.lua) — text-lua

- [prefabs/armor_lavaarena.lua:1](../source/scripts/prefabs/armor_lavaarena.lua) — text-lua

- [prefabs/armor_lunarplant.lua:1](../source/scripts/prefabs/armor_lunarplant.lua) — text-lua

- [prefabs/armor_marble.lua:1](../source/scripts/prefabs/armor_marble.lua) — text-lua

- [prefabs/armor_ruins.lua:1](../source/scripts/prefabs/armor_ruins.lua) — text-lua

- [prefabs/armor_sanity.lua:1](../source/scripts/prefabs/armor_sanity.lua) — text-lua

- [prefabs/armor_skeleton.lua:1](../source/scripts/prefabs/armor_skeleton.lua) — text-lua

- [prefabs/armor_slurper.lua:1](../source/scripts/prefabs/armor_slurper.lua) — text-lua

- [prefabs/armor_snurtleshell.lua:1](../source/scripts/prefabs/armor_snurtleshell.lua) — text-lua

- [prefabs/armor_voidcloth.lua:1](../source/scripts/prefabs/armor_voidcloth.lua) — text-lua

- [prefabs/armor_wagpunk.lua:1](../source/scripts/prefabs/armor_wagpunk.lua) — text-lua

- [prefabs/armor_wood.lua:1](../source/scripts/prefabs/armor_wood.lua) — text-lua

- [prefabs/armor_yoth_knight.lua:1](../source/scripts/prefabs/armor_yoth_knight.lua) — text-lua

- [prefabs/axe.lua:1](../source/scripts/prefabs/axe.lua) — text-lua

- [prefabs/axe_pickaxe.lua:1](../source/scripts/prefabs/axe_pickaxe.lua) — text-lua

- [prefabs/batbat.lua:1](../source/scripts/prefabs/batbat.lua) — text-lua

- [prefabs/blowdart.lua:1](../source/scripts/prefabs/blowdart.lua) — text-lua

- [prefabs/blowdart_lava.lua:1](../source/scripts/prefabs/blowdart_lava.lua) — text-lua

- [prefabs/boomerang.lua:1](../source/scripts/prefabs/boomerang.lua) — text-lua

- [prefabs/bugnet.lua:1](../source/scripts/prefabs/bugnet.lua) — text-lua

- [prefabs/cutless.lua:1](../source/scripts/prefabs/cutless.lua) — text-lua

- [prefabs/glasscutter.lua:1](../source/scripts/prefabs/glasscutter.lua) — text-lua

- [prefabs/hammer.lua:1](../source/scripts/prefabs/hammer.lua) — text-lua

- [prefabs/hammer_mjolnir.lua:1](../source/scripts/prefabs/hammer_mjolnir.lua) — text-lua

- [prefabs/hats.lua:1](../source/scripts/prefabs/hats.lua) — text-lua

- [prefabs/pickaxe.lua:1](../source/scripts/prefabs/pickaxe.lua) — text-lua

- [prefabs/pickaxe_lunarplant.lua:1](../source/scripts/prefabs/pickaxe_lunarplant.lua) — text-lua

- [prefabs/pitchfork.lua:1](../source/scripts/prefabs/pitchfork.lua) — text-lua

- [prefabs/razor.lua:1](../source/scripts/prefabs/razor.lua) — text-lua

- [prefabs/shatter.lua:1](../source/scripts/prefabs/shatter.lua) — text-lua

- [prefabs/shovel.lua:1](../source/scripts/prefabs/shovel.lua) — text-lua

- [prefabs/shovel_lunarplant.lua:1](../source/scripts/prefabs/shovel_lunarplant.lua) — text-lua

- [prefabs/spear.lua:1](../source/scripts/prefabs/spear.lua) — text-lua

- [prefabs/spear_gungnir.lua:1](../source/scripts/prefabs/spear_gungnir.lua) — text-lua

- [prefabs/spear_wathgrithr.lua:1](../source/scripts/prefabs/spear_wathgrithr.lua) — text-lua

- [prefabs/tophat_shadow_fx.lua:1](../source/scripts/prefabs/tophat_shadow_fx.lua) — text-lua

- [prefabs/wagpunkhat_classified.lua:1](../source/scripts/prefabs/wagpunkhat_classified.lua) — text-lua

<!-- deep-review-characters-content:start -->

## Đọc sâu mã nguồn — 08/11/2026

Đã trace khả năng tool, biến thể axe và vòng recharge.

Tool.SetAction chỉ nhận action có trong TOOLACTIONS, lưu effectiveness hoặc1 và gắn tag action_tool. CanDoAction kiểm có key, GetEffectiveness trả0 khi không hỗ trợ. Tough work là cờ riêng. Khi percentusedchange<=0, tool không rechargeable và đang nằm trong inventory có owner, component phát toolbroke cho owner. [components/tool.lua dòng 1–51](../source/scripts/components/tool.lua)

Factory MakeAxe gắn CHOP effectiveness1. Trong mode khác quagmire, axe có finiteuses trừ khi data.nofiniteuses, nhận maxfiniteuses từ data hoặc AXE_USES, mất1 use mỗi CHOP và Remove khi hết. Cũng ở nhánh này mới gắn weapon với AXE_DAMAGE. Vì vậy một prefab axe vừa có action tool vừa có damage, còn hành vi Quagmire được rẽ trước các component đó. Equip/unequip thay symbol và phát sự kiện skin theo skinbuild. [prefabs/axe.lua dòng 29–132](../source/scripts/prefabs/axe.lua)

Rechargeable cập nhật charge bằng current+dt*total/chargetime_effective, trong đó chargetime_effective=chargetime*(1+modifier cộng). Nếu thời gian hiệu lực<=0, nó nạp đầy ngay. SetCharge clamp0..total, phát rechargechange, oncharged chỉ lúc vừa chuyển lên đầy và ondischarged khi rời đầy. Tag rechargeable_full luôn theo kết quả hiện tại. [components/rechargeable.lua dòng 20–39](../source/scripts/components/rechargeable.lua) · [components/rechargeable.lua dòng 67–135](../source/scripts/components/rechargeable.lua)

Rechargeable.Save chỉ ghi lúc chưa đầy, gồm chargetime và charge. Load áp lại bằng SetChargeTime/SetCharge, qua đó khởi động cập nhật và tags. EfficientUser giữ modifier theo ACTION, mặc định1; thêm hoặc gỡ modifier MINE còn áp tương ứng lên REMOVELUNARBUILDUP. Công thức trừ durability cuối cùng cần theo consumer sử dụng multiplier. [components/rechargeable.lua dòng 146–181](../source/scripts/components/rechargeable.lua) · [components/efficientuser.lua dòng 1–38](../source/scripts/components/efficientuser.lua)

**Phần còn hở.**

- Chưa trace từng hiệu ứng riêng của46 prefab công cụ/giáp, các variant moon/fumarole, sửa chữa và weapon callbacks.
- Rechargeable chưa có LongUpdate trong component đã đọc; chưa khẳng định nạp pin offline khi mọi entity ngủ hoặc tải lại.

<!-- deep-review-characters-content:end -->
