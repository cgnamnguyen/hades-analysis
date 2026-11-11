# WX78 — 23 module và lưu/tải

Phạm vi là 23 định nghĩa literal trong wx78_moduledefs.lua của APK đã đối chiếu hash. Đã đọc toàn file 1–1696 và callback tương ứng. Không chạy APK/Lua; biến thể mod và engine chưa được phân giải đầy đủ.

[Nhân vật và perks](systems/characters-perks.md) · [Kho và túi mở rộng](systems/inventory-containers.md) · [Hiệu ứng screech/shielding](systems/skills-spells-magic.md) · [Danh mục máy đọc được](evidence/wx78-module-catalog.json)

## Quy tắc lắp, điện và khôi phục

- ModuleOwner.UpdateActivatedModules cấp lại cùng charge_level từ đầu cho từng bar Alpha/Beta/Gamma, trừ slots theo thứ tự trong bar rồi bật/tắt module. Đây là ngân sách riêng mỗi bar; không cộng tổng chi phí của ba bar thành một hàng. SetChargeLevel clamp vào 0..max_charge và tính lại khi giá trị đổi.

- WX78 prefab lưu riêng _wx78_health/_wx78_hunger/_wx78_sanity/_wx78_shield. Entity.OnLoad áp lại sau component.OnLoad, nhằm phục hồi current sau khi module đã thay max. Nhánh snapshot user session bỏ bước RefreshShadowSocketBuffs. ModuleOwner.OnLoad ưu tiên modules cũ, nếu không có mới dùng module_bars, gọi PushModule với isloading=true.

- Prefab module được tạo từ từng định nghĩa, gắn finiteuses max/current=4. Gỡ module tiêu 1 use hoặc mức HALF_MODULE_CONSUMPTION nếu leader có betterunplug, trừ khi owner đang SwapUpgradeModules. Swap bật is_swapping cho cả hai owner trong lúc PopAll/Push, nên callback gỡ bỏ qua hao use trong nhánh này.

- Circuit_SetUpSkillCb kiểm tra skill trên player hoặc leader của follower, áp callback ngay nếu đang có skill rồi nghe activate/deactivate và leaderchanged. Cleanup gọi deactivate cưỡng bức nếu đã active, sau đó tháo listeners. AddNewModuleDefinition chỉ cấp net ID với assert netid<64; định nghĩa đang có 23 mục literal, không khẳng định mọi mod đã được phân giải.

[wx78_moduledefs.lua dòng 1–1696](source/scripts/wx78_moduledefs.lua) · [components/upgrademodule.lua dòng 1–68](source/scripts/components/upgrademodule.lua) · [components/upgrademoduleowner.lua dòng 1–474](source/scripts/components/upgrademoduleowner.lua) · [prefabs/wx78_modules.lua dòng 1–105](source/scripts/prefabs/wx78_modules.lua) · [prefabs/wx78.lua dòng 181–233](source/scripts/prefabs/wx78.lua) · [tuning.lua dòng 6578–6634](source/scripts/tuning.lua) · [tuning.lua dòng 9397–9438](source/scripts/tuning.lua) · [constants.lua dòng 3163–3172](source/scripts/constants.lua) · [prefabs/wx78_common.lua dòng 961–974](source/scripts/prefabs/wx78_common.lua) · [stategraphs/SGwx78_common.lua dòng 1126–1174](source/scripts/stategraphs/SGwx78_common.lua)

## wx78module_maxhealth

Bar ALPHA · 1 ô · bật `maxhealth_activate` · tháo `maxhealth_deactivate`.

Tăng max health thêm 40. Khi lắp hoặc tháo bình thường, giữ tỷ lệ máu hiện tại; isloading bỏ bước SetPercent. Skill Alpha thêm hệ số giảm damage dựa tổng module health đang bật.

[wx78_moduledefs.lua dòng 180–220](source/scripts/wx78_moduledefs.lua)

## wx78module_maxsanity1

Bar ALPHA · 1 ô · bật `maxsanity1_activate` · tháo `maxsanity1_deactivate`.

Tăng max sanity thêm 40, giữ tỷ lệ khi không load. Skill Alpha đặt modifier aura âm và hệ số dapperness dương của trang bị; tháo gỡ modifier theo module.

[wx78_moduledefs.lua dòng 224–304](source/scripts/wx78_moduledefs.lua)

## wx78module_maxsanity

Bar ALPHA · 2 ô · bật `maxsanity_activate` · tháo `maxsanity_deactivate`.

Tăng max sanity thêm 100 và dapperness thêm 100/(day_time×10). Tháo trừ lại cả hai; khi không load giữ tỷ lệ sanity. Các skill dùng cùng lớp xử lý aura/trang bị với bản 1 ô.

[wx78_moduledefs.lua dòng 308–361](source/scripts/wx78_moduledefs.lua) · [wx78_moduledefs.lua dòng 224–344](source/scripts/wx78_moduledefs.lua)

## wx78module_movespeed

Bar BETA · 6 ô · bật `movespeed_activate` · tháo `movespeed_deactivate`.

Tăng bộ đếm speed chip và chọn multiplier 1+{0;0,25;0,40;0,50}[count+1]. Bản này tốn 6 ô; playerspeedmult không cộng vào tốc độ thú cưỡi. Tháo giảm bộ đếm rồi tính lại.

[wx78_moduledefs.lua dòng 365–406](source/scripts/wx78_moduledefs.lua)

## wx78module_movespeed2

Bar BETA · 2 ô · bật `movespeed_activate` · tháo `movespeed_deactivate`.

Dùng cùng callback và hiệu quả theo số chip như movespeed nhưng chỉ tốn 2 ô. Đây là khác biệt chi phí trực tiếp trong định nghĩa, không phải cộng thêm một công thức tốc độ khác.

[wx78_moduledefs.lua dòng 365–422](source/scripts/wx78_moduledefs.lua)

## wx78module_heat

Bar BETA · 3 ô · bật `heat_activate` · tháo `heat_deactivate`.

Mỗi module tăng heat_count, đẩy cả mintemp/maxtemp thêm 20 trong giới hạn MIN_TEMP..MAX_TEMP và cộng 0,1 vào base/max drying rate. Skill Beta cập nhật chống đóng băng; từ 2 module heat đặt redirect miễn đóng băng. Tháo trừ lại các lượng đã cộng.

[wx78_moduledefs.lua dòng 430–522](source/scripts/wx78_moduledefs.lua)

## wx78module_nightvision

Bar BETA · 4 ô · bật `nightvision_common_activate` · tháo `nightvision_common_deactivate`.

Bản Beta 4 ô có callback cả server/client. Module đầu đăng ký watcher đêm/trăng tròn và sự kiện skill; chỉ ép night vision khi đêm và không trăng tròn. Module cuối bị tháo gỡ watcher và hiệu ứng.

[wx78_moduledefs.lua dòng 526–579](source/scripts/wx78_moduledefs.lua)

## wx78module_cold

Bar BETA · 3 ô · bật `cold_activate` · tháo `cold_deactivate`.

Mỗi module tăng cold_count và đẩy cả hai giới hạn nhiệt xuống 20; skill Beta trừ fire_damage_scale theo tuning. Callback tháo giảm count, tính lại nhiệt/overlay và gỡ skill.

[wx78_moduledefs.lua dòng 430–451](source/scripts/wx78_moduledefs.lua) · [wx78_moduledefs.lua dòng 583–634](source/scripts/wx78_moduledefs.lua)

## wx78module_taser

Bar BETA · 2 ô · bật `taser_activate` · tháo `taser_deactivate`.

Nghe blocked/attacked, khóa lặp 0,1 giây trên từng module; loại damage redirect, attacker chết/cách điện và vũ khí projectile. Damage cơ sở 20 nhân electric/wet multiplier; gắn cách điện cho chủ. Skill Beta tạo/cập nhật taser buildup và xử lý ReleaseBuildup khi tháo.

[wx78_moduledefs.lua dòng 637–758](source/scripts/wx78_moduledefs.lua)

## wx78module_light

Bar BETA · 3 ô · bật `light_activate` · tháo `light_deactivate`.

Cộng 1,25 vào tổng bán kính sáng, Light radius thực là tổng^0,8. Skill Beta quản lý wx78_lightbeam theo tổng này. Tổng về gần 0 thì tắt sáng và trả thuộc tính light mặc định; bản này tốn 3 ô.

[wx78_moduledefs.lua dòng 762–833](source/scripts/wx78_moduledefs.lua)

## wx78module_maxhunger

Bar ALPHA · 2 ô · bật `maxhunger_activate` · tháo `maxhunger_deactivate`.

Tăng max hunger thêm 100 và đặt burn rate multiplier 0,80 theo module. Skill Alpha thay multiplier bằng mức skill tương ứng. Khi không load giữ tỷ lệ đói; tháo trừ max và đặt hệ số module về 1.

[wx78_moduledefs.lua dòng 837–898](source/scripts/wx78_moduledefs.lua)

## wx78module_maxhunger1

Bar ALPHA · 1 ô · bật `maxhunger1_activate` · tháo `maxhunger1_deactivate`.

Tăng max hunger thêm 40, tốn 1 ô; không tự có mức burn rate 0,80 của bản 2 ô. Skill Alpha có các hệ số riêng. Tháo trừ lại max và hủy callback skill.

[wx78_moduledefs.lua dòng 902–924](source/scripts/wx78_moduledefs.lua)

## wx78module_music

Bar BETA · 3 ô · bật `music_activate` · tháo `music_deactivate`.

Tăng dapperness của chủ, tạo sanity aura và chăm cây farm trong bán kính 12×số module, chu kỳ 144×FRAMES. Skill Beta thay task chăm cây bằng leaderrollcall, cập nhật radius/max followers. Module cuối bị tháo hủy task, aura và âm nhạc.

[wx78_moduledefs.lua dòng 927–1092](source/scripts/wx78_moduledefs.lua)

## wx78module_bee

Bar ALPHA · 3 ô · bật `bee_activate` · tháo `bee_deactivate`.

Hồi 5 máu×số module mỗi seg_time nếu đang bị thương; đồng thời dùng hiệu quả maxsanity bản 100. Skill Alpha có đường tạo/giới hạn/nạp khiên và listener healthdelta. Tháo module cuối hủy regen; cleanup skill xử lý khiên và aura modifier.

[wx78_moduledefs.lua dòng 1096–1215](source/scripts/wx78_moduledefs.lua) · [wx78_moduledefs.lua dòng 224–344](source/scripts/wx78_moduledefs.lua)

## wx78module_maxhealth2

Bar ALPHA · 2 ô · bật `maxhealth2_activate` · tháo `maxhealth2_deactivate`.

Tăng max health thêm 40×2,5 = 100; dùng cùng hàm đổi max và nhánh giữ tỷ lệ/isloading như maxhealth. Trọng số armor skill riêng lấy MAXHEALTH2_ARMOR_MULT.

[wx78_moduledefs.lua dòng 1218–1243](source/scripts/wx78_moduledefs.lua) · [wx78_moduledefs.lua dòng 152–192](source/scripts/wx78_moduledefs.lua)

## wx78module_radar

Bar BETA · 1 ô · bật `radar_activate` · tháo `radar_deactivate`.

Tăng khoảng camera thêm 5 theo module, gỡ bằng RemoveCameraExtraDistance khi tháo. Skill Beta phát rangecircuitupdate cho drone. Nhánh scan chim đọc occupiable occupant hoặc lootprefabs đầu của trap, không chỉ prefab entity ngoài lồng.

[wx78_moduledefs.lua dòng 1247–1292](source/scripts/wx78_moduledefs.lua)

## wx78module_screech

Bar GAMMA · 3 ô · bật `screech_activate` · tháo `screech_deactivate`.

Module Gamma 3 ô tăng bộ đếm; module đầu thêm inherent action TOGGLEWXSCREECH, module cuối tháo action. Hiệu ứng sợ hãi, thời gian và cooldown nằm ở stategraph được đối chiếu riêng bên dưới.

[wx78_moduledefs.lua dòng 1297–1321](source/scripts/wx78_moduledefs.lua)

## wx78module_stacksize

Bar BETA · 1 ô · bật `stacksize_activate` · tháo `stacksize_deactivate`.

Khi gắn vào owner, dành ô inventory từ cuối và tạo wx78_inventorycontainer khóa ô. Nếu thiếu charge, vật cũ bị thả; đủ charge thì đưa vật cũ vào túi con. isloading chỉ tăng bộ đếm, bỏ tạo túi mới. Activate/deactivate bật/tắt nguồn túi; tháo gỡ khóa và thả túi, trừ nhánh đang chuyển backup body.

[wx78_moduledefs.lua dòng 1325–1426](source/scripts/wx78_moduledefs.lua)

## wx78module_light2

Bar BETA · 1 ô · bật `light2_activate` · tháo `light2_deactivate`.

Cùng công thức cộng bán kính 1,25 và lightbeam như light nhưng chỉ tốn 1 ô; tháo trừ cùng lượng.

[wx78_moduledefs.lua dòng 1430–1452](source/scripts/wx78_moduledefs.lua) · [wx78_moduledefs.lua dòng 762–818](source/scripts/wx78_moduledefs.lua)

## wx78module_digestion

Bar GAMMA · 2 ô · bật `digestion_activate` · tháo `digestion_deactivate`.

Module Gamma 2 ô bật spoiled processor và listener oneat. Khi số món đạt 5−(số module−1), reset bộ đếm rồi queue state wx_bake; skill Gamma thay cấu hình processor. Tháo module cuối tắt processor/listener. Vật phẩm chỉ sinh tại frame 46 của wx_bake, không sinh ngay ở callback ăn.

[wx78_moduledefs.lua dòng 1456–1512](source/scripts/wx78_moduledefs.lua) · [stategraphs/SGwx78_common.lua dòng 1126–1174](source/scripts/stategraphs/SGwx78_common.lua)

## wx78module_spin

Bar GAMMA · 3 ô · bật `spin_activate` · tháo `spin_deactivate`.

Module Gamma 3 ô thêm efficientuser và aoediminishingreturns. Module đầu nghe equip/unequip và đổi attack range sang 3 khi công cụ có CHOP/MINE, nếu không trả DEFAULT_ATTACK_RANGE. Module cuối gỡ aoediminishingreturns/listeners và reset range; lệnh gỡ efficientuser đang là comment nên không được mô tả là có gỡ.

[wx78_moduledefs.lua dòng 1516–1566](source/scripts/wx78_moduledefs.lua) · [prefabs/wx78_common.lua dòng 961–974](source/scripts/prefabs/wx78_common.lua)

## wx78module_shielding

Bar GAMMA · 4 ô · bật `shielding_activate` · tháo `shielding_deactivate`.

Module Gamma 4 ô thêm inherent action TOGGLEWXSHIELDING và skill callback refresh. Khi tháo, gỡ action rồi cleanup skill. Armor, taunt, giới hạn damage và cooldown do stategraph quyết định, đã nối riêng.

[wx78_moduledefs.lua dòng 1570–1600](source/scripts/wx78_moduledefs.lua)

## wx78module_chess

Bar GAMMA · 1 ô · bật `chess_activate` · tháo `chess_deactivate`.

Module Gamma 1 ô thêm clockworktracker nếu thiếu rồi SetBonus bằng số module; skill Gamma gắn chessbff. Tháo cập nhật bonus và gỡ tag khi không còn module/skill; đoạn này không tự RemoveComponent clockworktracker.

[wx78_moduledefs.lua dòng 1604–1646](source/scripts/wx78_moduledefs.lua)

## Các phần còn hở

Đã nối server spin timeline, scanner, scout/delivery, backup/possessed body, taser buildup và quota Clockwork trong [hồ sơ consumer](wx78-consumers.md). Còn zap/shadow drone AI, load follower Clockwork, client prediction, cộng dồn skill và các snapshot giữa trạng thái. Không dùng số 23 để đánh dấu toàn bộ nhân vật WX78 hoàn tất.
