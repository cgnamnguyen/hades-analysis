# Nhân vật, nội tại và phụ kiện riêng

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm nhân vật, nội tại và phụ kiện riêng theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [characterutil.lua:1](../source/scripts/characterutil.lua) — text-lua

- [curse_monkey_util.lua:1](../source/scripts/curse_monkey_util.lua) — text-lua

- [speech_walter.lua:1](../source/scripts/speech_walter.lua) — text-lua

- [speech_wanda.lua:1](../source/scripts/speech_wanda.lua) — text-lua

- [speech_warly.lua:1](../source/scripts/speech_warly.lua) — text-lua

- [speech_wathgrithr.lua:1](../source/scripts/speech_wathgrithr.lua) — text-lua

- [speech_waxwell.lua:1](../source/scripts/speech_waxwell.lua) — text-lua

- [speech_webber.lua:1](../source/scripts/speech_webber.lua) — text-lua

- [speech_wendy.lua:1](../source/scripts/speech_wendy.lua) — text-lua

- [speech_wickerbottom.lua:1](../source/scripts/speech_wickerbottom.lua) — text-lua

- [speech_willow.lua:1](../source/scripts/speech_willow.lua) — text-lua

- [speech_wilson.lua:1](../source/scripts/speech_wilson.lua) — text-lua

- [speech_winona.lua:1](../source/scripts/speech_winona.lua) — text-lua

- [speech_wolfgang.lua:1](../source/scripts/speech_wolfgang.lua) — text-lua

- [speech_woodie.lua:1](../source/scripts/speech_woodie.lua) — text-lua

- [speech_wormwood.lua:1](../source/scripts/speech_wormwood.lua) — text-lua

- [speech_wortox.lua:1](../source/scripts/speech_wortox.lua) — text-lua

- [speech_wurt.lua:1](../source/scripts/speech_wurt.lua) — text-lua

- [speech_wx78.lua:1](../source/scripts/speech_wx78.lua) — text-lua

- [wx78_moduledefs.lua:1](../source/scripts/wx78_moduledefs.lua) — text-lua

- [components/avengingghost.lua:1](../source/scripts/components/avengingghost.lua) — text-lua

- [components/beard.lua:1](../source/scripts/components/beard.lua) — text-lua

- [components/beaverness.lua:1](../source/scripts/components/beaverness.lua) — text-lua

- [components/ghostlybond.lua:1](../source/scripts/components/ghostlybond.lua) — text-lua

- [components/mightiness.lua:1](../source/scripts/components/mightiness.lua) — text-lua

- [components/singinginspiration.lua:1](../source/scripts/components/singinginspiration.lua) — text-lua

- [components/wereness.lua:1](../source/scripts/components/wereness.lua) — text-lua

- [components/wx78_abilitycooldowns.lua:1](../source/scripts/components/wx78_abilitycooldowns.lua) — text-lua

- [components/wx78_dronescouttracker.lua:1](../source/scripts/components/wx78_dronescouttracker.lua) — text-lua

- [components/wx78_shield.lua:1](../source/scripts/components/wx78_shield.lua) — text-lua

- [components/wx78_taserbuildup.lua:1](../source/scripts/components/wx78_taserbuildup.lua) — text-lua

- [prefabs/walter.lua:1](../source/scripts/prefabs/walter.lua) — text-lua

- [prefabs/wanda.lua:1](../source/scripts/prefabs/wanda.lua) — text-lua

- [prefabs/warly.lua:1](../source/scripts/prefabs/warly.lua) — text-lua

- [prefabs/wathgrithr.lua:1](../source/scripts/prefabs/wathgrithr.lua) — text-lua

- [prefabs/waxwell.lua:1](../source/scripts/prefabs/waxwell.lua) — text-lua

- [prefabs/webber.lua:1](../source/scripts/prefabs/webber.lua) — text-lua

- [prefabs/wendy.lua:1](../source/scripts/prefabs/wendy.lua) — text-lua

- [prefabs/wickerbottom.lua:1](../source/scripts/prefabs/wickerbottom.lua) — text-lua

- [prefabs/willow.lua:1](../source/scripts/prefabs/willow.lua) — text-lua

- [prefabs/wilson.lua:1](../source/scripts/prefabs/wilson.lua) — text-lua

- [prefabs/winona.lua:1](../source/scripts/prefabs/winona.lua) — text-lua

- [prefabs/wolfgang.lua:1](../source/scripts/prefabs/wolfgang.lua) — text-lua

- [prefabs/woodie.lua:1](../source/scripts/prefabs/woodie.lua) — text-lua

- [prefabs/wormwood.lua:1](../source/scripts/prefabs/wormwood.lua) — text-lua

- [prefabs/wortox.lua:1](../source/scripts/prefabs/wortox.lua) — text-lua

- [prefabs/wurt.lua:1](../source/scripts/prefabs/wurt.lua) — text-lua

- [prefabs/wx78.lua:1](../source/scripts/prefabs/wx78.lua) — text-lua

<!-- deep-review-characters-content:start -->

## Đọc sâu mã nguồn — 08/11/2026

Đã trace tài nguyên/state của Wolfgang, Wendy, Woodie, Wanda và đọc các nhánh khởi tạo riêng của đủ17 prefab nhân vật trong nhóm, cùng một số consumer nội tại.

Wolfgang cập nhật mightiness mỗi giây sau drain_delay. DoDelta dương dừng ở max đối với nguồn thường, riêng fromgym cho phép tới max+overmax. Giảm lượng được chặn ở0. State chọn theo MIGHTY_THRESHOLD rồi WIMPY_THRESHOLD, phát mightinessdelta với lượng thay đổi thực. Việc thay form đổi damage multiplier, cách nhiệt, hunger burnrate, hiệu suất CHOP/MINE/HAMMER và sức chèo thuyền. Khi đang di chuyển và cầm dumbbell, giảm sức bị trì hoãn2 giây. Hunger chia các ngưỡng75%,50%,25%,0 để chọn drain_multiplier. [components/mightiness.lua dòng 81–134](../source/scripts/components/mightiness.lua) · [components/mightiness.lua dòng 202–255](../source/scripts/components/mightiness.lua) · [components/mightiness.lua dòng 288–390](../source/scripts/components/mightiness.lua)

Mightiness lưu giá trị current rồi gọi DoDelta(0,true) khi tải để áp lại state. Wereness của biến hình lưu current và mode chỉ khi current>0, giảm/tăng theo rate*dt, clamp0..max và dừng cập nhật khi cạn. Khi tải giá trị dương, component bắt đầu drain rồi phát cập nhật. Các tốc độ và điều kiện biến hình còn do prefab gán. [components/mightiness.lua dòng 125–133](../source/scripts/components/mightiness.lua) · [components/wereness.lua dòng 46–104](../source/scripts/components/wereness.lua)

GhostlyBond tăng bondleveltimer theo dt nhân modifier và chuyển level tới maxbondlevel. Summon chỉ nhận khi ghost tồn tại và notsummoned, đưa ghost trở lại scene rồi gọi callback. Recall chỉ bắt đầu với ghost đã summoned và chủ không ở state dissipate. RecallComplete cất ghost khỏi scene, gắn parent vào chủ. Save giữ bondlevel, elapsedtime, cả save record của ghost và inlimbo, Load dựng lại ghost và gắn listeners. [components/ghostlybond.lua dòng 55–145](../source/scripts/components/ghostlybond.lua) · [components/ghostlybond.lua dòng 155–225](../source/scripts/components/ghostlybond.lua)

Wendy gọi Recall và PauseBonding khi chết, SetBondLevel(1) và ResumeBonding khi hồi sinh. Callback summon cộng SANITY_MED nếu không migration, recall trừ SANITY_MED hoặc gấp đôi khi ghost bị giết. Wanda gắn oldager vào health.redirect, tắt hồi máu thường, chỉ cho các healing causes đã đăng ký đi qua mô hình tuổi. [prefabs/wendy.lua dòng 191–227](../source/scripts/prefabs/wendy.lua) · [prefabs/wanda.lua dòng 265–266](../source/scripts/prefabs/wanda.lua) · [prefabs/wanda.lua dòng 396–413](../source/scripts/prefabs/wanda.lua)

Wilson đăng ký beard callback tại ngày4/8/16, reward beardhair, và khi chết EmptyBeard thả mọi đồ trong BEARD-slot container rồi xóa túi râu. Webber đăng ký mốc3/6/9 với bits1/3/6 và prize silk, cho eater strongstomach/rawmeat, bỏ trigger creep và đi nhanh trên creep. ReleaseSpiderFollowers gỡ defensive/no_targeting khi bị đánh, tấn công, chết hoặc remove. Đây là hai bộ cấu hình và consumer khác nhau của beard. [prefabs/wilson.lua dòng 91–168](../source/scripts/prefabs/wilson.lua) · [prefabs/webber.lua dòng 65–147](../source/scripts/prefabs/webber.lua)

Warly đặt hunger rate theo WILSON_HUNGER_RATE*WARLY_HUNGER_RATE_MODIFIER, ưu tiên preparedfood/pre-preparedfood và tạo FoodMemory. FoodMemory quy món gia vị về basename, cộng số lần ăn, hủy timer cũ rồi hẹn quên lại theo duration. Multiplier chọn theo count đã nhớ và clamp index ở cuối danh sách. Save lưu count cùng thời gian task còn lại, Load dựng lại timer với default count1/duration. Wickerbottom gắn insomniac/reader, science_bonus1 và refuses spoiled food. Đọc sách khi insane có thể gọi shadowcreaturespawner nếu số shadow trong radius16 dưới BOOK_MAX_SHADOWCREATURES. [prefabs/warly.lua dòng 17–43](../source/scripts/prefabs/warly.lua) · [components/foodmemory.lua dòng 1–87](../source/scripts/components/foodmemory.lua) · [prefabs/wickerbottom.lua dòng 30–96](../source/scripts/prefabs/wickerbottom.lua)

Wigfrid đặt diet tiêu thụ MEAT/GOODIES, ở nhánh thường gắn singinginspiration/battleborn, bật hồi sanity và health theo valid victim, allow_zero=false, damagemultiplier và absorption theo tuning. Willow dùng fire_damage_scale, custom sanity và damage callback chỉ tăng multiplier khi target đang burning và bản thân có tag firefrenzy. Nhánh thường gắn fuelmaster, các mode event chuyển sang server data riêng. Winona trong nguồn này gán health/hunger/sanity từ các hằng WENDY, đặt grue resistance1 và ngoài Forge gắn roseinspectableuser cùng save/preload/load và skill listeners. [prefabs/wathgrithr.lua dòng 162–205](../source/scripts/prefabs/wathgrithr.lua) · [prefabs/willow.lua dòng 152–195](../source/scripts/prefabs/willow.lua) · [prefabs/winona.lua dòng 189–215](../source/scripts/prefabs/winona.lua)

Maxwell mở reader với penalty multiplier riêng, tạo/giữ petleash và tăng khả năng chứa thêm6 pet hoặc khởi tạo max6. Pet spawn/despawn được thay callback, sanity nhận dapperness riêng và listener mất pet tháo SanityPenalty. Death/ghost/reroll có callbacks riêng, OnLoad được gán trong prefab; việc gắn listener không đủ để suy toàn bộ giá triệu hồi từng minion. [prefabs/waxwell.lua dòng 276–336](../source/scripts/prefabs/waxwell.lua)

Walter bật immunity cho aura âm, ghost player và light drain, nhưng HealthDelta âm vẫn trừ sanity theo amount, rate của overtime/instant và protection modifier. CustomSanityFn lấy tree bonus trừ phần thiếu health nhân WALTER_SANITY_HEALTH_DRAIN. Tree bonus chỉ có nếu đủ số cây trong radius, loại burnt/stump/fire. Init đặt petleash max0 cho pets chung, spawn Woby qua task0 và dùng save/load riêng. Như vậy miễn light drain không loại bỏ mất sanity do bị thương. [prefabs/walter.lua dòng 543–575](../source/scripts/prefabs/walter.lua) · [prefabs/walter.lua dòng 1177–1235](../source/scripts/prefabs/walter.lua)

Wormwood gán eater absorption health0, sanity không phạt moisture, bloomness và fertilizable. Formula tăng fertilize cho bloomness, có skill nhân thêm. Compost dùng buff hồi theo thời gian, manure gọi health.DoDelta trực tiếp. Bloom rate có nhánh spring/winter riêng, và khi đang blooming với fertilizer>0 nhân season_mult*(1+fertilizer*rate_mod). Thời gian full bloom tăng được chặn bằng max tuning hoặc max đã nâng skill. Init còn gắn OnLoad/OnPreLoad/OnNewSpawn và watcher mùa. [prefabs/wormwood.lua dòng 502–581](../source/scripts/prefabs/wormwood.lua) · [prefabs/wormwood.lua dòng 776–872](../source/scripts/prefabs/wormwood.lua)

Wurt dùng UpdateStats giữ các phần trăm health/hunger/sanity trước khi đổi max. RoyalUpgrade áp bộ max KINGBONUS. Init ăn vegetarian, tăng affinity VEGGIE1,33, không bị phạt sanity vì moisture, có preserver cho cá và watcher tạo/mất merm king ở world. Task0 chọn RoyalUpgrade hoặc RoyalDowngrade theo HasKingAnywhere sau tải. Wortox giảm absorption đồ ăn theo WORTOX_FOOD_MULT và gắn souleater. TryToPortalHop kiểm inventory và số soul đủ, tích lũy counter/cost, cho hop miễn phí trong chuỗi theo GetHopsPerSoul, hẹn FinishPortalHop. Khi kết chuỗi, nó ConsumeByName với max(ceil(cost),1), reset counter và gỡ buff. [prefabs/wurt.lua dòng 124–153](../source/scripts/prefabs/wurt.lua) · [prefabs/wurt.lua dòng 633–708](../source/scripts/prefabs/wurt.lua) · [prefabs/wortox.lua dòng 580–650](../source/scripts/prefabs/wortox.lua) · [prefabs/wortox.lua dòng 749–800](../source/scripts/prefabs/wortox.lua)

WX78 init bỏ ảnh hưởng spoilage khi ăn, cho ăn gears, đặt module-owner charge3/max tuning, shield health redirect, listeners moisture/starving và lightning handler. CanUseUpgradeModule so max_charge-used_slots với số slots module, trả NOTENOUGHSLOTS khi thiếu. ModuleOwner gắn module thành child và cất khỏi scene, rồi kích hoạt theo thứ tự từng bar khi charge còn đủ. Gỡ module deactive trước callback, tách owner sau cùng rồi tính lại các module còn lại. Save ghi từng module GetSaveRecord và charge_level, Load hỗ trợ cả mảng modules cũ lẫn module_bars mới. [prefabs/wx78.lua dòng 445–453](../source/scripts/prefabs/wx78.lua) · [prefabs/wx78.lua dòng 734–840](../source/scripts/prefabs/wx78.lua) · [components/upgrademoduleowner.lua dòng 171–255](../source/scripts/components/upgrademoduleowner.lua) · [components/upgrademoduleowner.lua dòng 403–454](../source/scripts/components/upgrademoduleowner.lua)

Woodie ở nhánh thường gắn beard không tăng trưởng, wereness, wereeater và tackler. Tackle có work action CHOP8/MINE4/HAMMER2, distance0,5/radius0,75 và multiplier cấu trúc2. Callback dạng thú, kỹ năng, drown và các listener ghost/respawn được gán tại prefab. Save/load/preload là đường riêng ngoài Wereness.Save, còn Forge/Quagmire rẽ trước bộ setup này. [prefabs/woodie.lua dòng 1791–1870](../source/scripts/prefabs/woodie.lua)

**Phần còn hở.**

- Đã nối server spin timeline, scanner, scout/delivery drone, callback đổi thân và save/load backup/possessed body, taser buildup và quota Clockwork. Còn zap/shadow drone AI, thu phục và load follower Clockwork, client prediction, các snapshot chuyển trạng thái và perk/minion/spell của nhân vật khác.
- Các callback event mode chuyển sang event_server_data và các native hooks còn ngoài phạm vi Lua công khai đã đọc.

<!-- deep-review-characters-content:end -->

<!-- continuation-review-start -->

## Đọc tiếp lưu/tải và các consumer — 08/11/2026

[Hồ sơ đủ 23 module WX78](../wx78-modules.md) giữ tên, bar, số ô và callback từng module.

- wx78module_maxhealth · ALPHA · 1 ô. Tăng max health thêm 40. Khi lắp hoặc tháo bình thường, giữ tỷ lệ máu hiện tại; isloading bỏ bước SetPercent. Skill Alpha thêm hệ số giảm damage dựa tổng module health đang bật.

- wx78module_maxsanity1 · ALPHA · 1 ô. Tăng max sanity thêm 40, giữ tỷ lệ khi không load. Skill Alpha đặt modifier aura âm và hệ số dapperness dương của trang bị; tháo gỡ modifier theo module.

- wx78module_maxsanity · ALPHA · 2 ô. Tăng max sanity thêm 100 và dapperness thêm 100/(day_time×10). Tháo trừ lại cả hai; khi không load giữ tỷ lệ sanity. Các skill dùng cùng lớp xử lý aura/trang bị với bản 1 ô.

- wx78module_movespeed · BETA · 6 ô. Tăng bộ đếm speed chip và chọn multiplier 1+{0;0,25;0,40;0,50}[count+1]. Bản này tốn 6 ô; playerspeedmult không cộng vào tốc độ thú cưỡi. Tháo giảm bộ đếm rồi tính lại.

- wx78module_movespeed2 · BETA · 2 ô. Dùng cùng callback và hiệu quả theo số chip như movespeed nhưng chỉ tốn 2 ô. Đây là khác biệt chi phí trực tiếp trong định nghĩa, không phải cộng thêm một công thức tốc độ khác.

- wx78module_heat · BETA · 3 ô. Mỗi module tăng heat_count, đẩy cả mintemp/maxtemp thêm 20 trong giới hạn MIN_TEMP..MAX_TEMP và cộng 0,1 vào base/max drying rate. Skill Beta cập nhật chống đóng băng; từ 2 module heat đặt redirect miễn đóng băng. Tháo trừ lại các lượng đã cộng.

- wx78module_nightvision · BETA · 4 ô. Bản Beta 4 ô có callback cả server/client. Module đầu đăng ký watcher đêm/trăng tròn và sự kiện skill; chỉ ép night vision khi đêm và không trăng tròn. Module cuối bị tháo gỡ watcher và hiệu ứng.

- wx78module_cold · BETA · 3 ô. Mỗi module tăng cold_count và đẩy cả hai giới hạn nhiệt xuống 20; skill Beta trừ fire_damage_scale theo tuning. Callback tháo giảm count, tính lại nhiệt/overlay và gỡ skill.

- wx78module_taser · BETA · 2 ô. Nghe blocked/attacked, khóa lặp 0,1 giây trên từng module; loại damage redirect, attacker chết/cách điện và vũ khí projectile. Damage cơ sở 20 nhân electric/wet multiplier; gắn cách điện cho chủ. Skill Beta tạo/cập nhật taser buildup và xử lý ReleaseBuildup khi tháo.

- wx78module_light · BETA · 3 ô. Cộng 1,25 vào tổng bán kính sáng, Light radius thực là tổng^0,8. Skill Beta quản lý wx78_lightbeam theo tổng này. Tổng về gần 0 thì tắt sáng và trả thuộc tính light mặc định; bản này tốn 3 ô.

- wx78module_maxhunger · ALPHA · 2 ô. Tăng max hunger thêm 100 và đặt burn rate multiplier 0,80 theo module. Skill Alpha thay multiplier bằng mức skill tương ứng. Khi không load giữ tỷ lệ đói; tháo trừ max và đặt hệ số module về 1.

- wx78module_maxhunger1 · ALPHA · 1 ô. Tăng max hunger thêm 40, tốn 1 ô; không tự có mức burn rate 0,80 của bản 2 ô. Skill Alpha có các hệ số riêng. Tháo trừ lại max và hủy callback skill.

- wx78module_music · BETA · 3 ô. Tăng dapperness của chủ, tạo sanity aura và chăm cây farm trong bán kính 12×số module, chu kỳ 144×FRAMES. Skill Beta thay task chăm cây bằng leaderrollcall, cập nhật radius/max followers. Module cuối bị tháo hủy task, aura và âm nhạc.

- wx78module_bee · ALPHA · 3 ô. Hồi 5 máu×số module mỗi seg_time nếu đang bị thương; đồng thời dùng hiệu quả maxsanity bản 100. Skill Alpha có đường tạo/giới hạn/nạp khiên và listener healthdelta. Tháo module cuối hủy regen; cleanup skill xử lý khiên và aura modifier.

- wx78module_maxhealth2 · ALPHA · 2 ô. Tăng max health thêm 40×2,5 = 100; dùng cùng hàm đổi max và nhánh giữ tỷ lệ/isloading như maxhealth. Trọng số armor skill riêng lấy MAXHEALTH2_ARMOR_MULT.

- wx78module_radar · BETA · 1 ô. Tăng khoảng camera thêm 5 theo module, gỡ bằng RemoveCameraExtraDistance khi tháo. Skill Beta phát rangecircuitupdate cho drone. Nhánh scan chim đọc occupiable occupant hoặc lootprefabs đầu của trap, không chỉ prefab entity ngoài lồng.

- wx78module_screech · GAMMA · 3 ô. Module Gamma 3 ô tăng bộ đếm; module đầu thêm inherent action TOGGLEWXSCREECH, module cuối tháo action. Hiệu ứng sợ hãi, thời gian và cooldown nằm ở stategraph được đối chiếu riêng bên dưới.

- wx78module_stacksize · BETA · 1 ô. Khi gắn vào owner, dành ô inventory từ cuối và tạo wx78_inventorycontainer khóa ô. Nếu thiếu charge, vật cũ bị thả; đủ charge thì đưa vật cũ vào túi con. isloading chỉ tăng bộ đếm, bỏ tạo túi mới. Activate/deactivate bật/tắt nguồn túi; tháo gỡ khóa và thả túi, trừ nhánh đang chuyển backup body.

- wx78module_light2 · BETA · 1 ô. Cùng công thức cộng bán kính 1,25 và lightbeam như light nhưng chỉ tốn 1 ô; tháo trừ cùng lượng.

- wx78module_digestion · GAMMA · 2 ô. Module Gamma 2 ô bật spoiled processor và listener oneat. Khi số món đạt 5−(số module−1), reset bộ đếm rồi queue state wx_bake; skill Gamma thay cấu hình processor. Tháo module cuối tắt processor/listener. Vật phẩm chỉ sinh tại frame 46 của wx_bake, không sinh ngay ở callback ăn.

- wx78module_spin · GAMMA · 3 ô. Module Gamma 3 ô thêm efficientuser và aoediminishingreturns. Module đầu nghe equip/unequip và đổi attack range sang 3 khi công cụ có CHOP/MINE, nếu không trả DEFAULT_ATTACK_RANGE. Module cuối gỡ aoediminishingreturns/listeners và reset range; lệnh gỡ efficientuser đang là comment nên không được mô tả là có gỡ.

- wx78module_shielding · GAMMA · 4 ô. Module Gamma 4 ô thêm inherent action TOGGLEWXSHIELDING và skill callback refresh. Khi tháo, gỡ action rồi cleanup skill. Armor, taunt, giới hạn damage và cooldown do stategraph quyết định, đã nối riêng.

- wx78module_chess · GAMMA · 1 ô. Module Gamma 1 ô thêm clockworktracker nếu thiếu rồi SetBonus bằng số module; skill Gamma gắn chessbff. Tháo cập nhật bonus và gỡ tag khi không còn module/skill; đoạn này không tự RemoveComponent clockworktracker.

- ModuleOwner.UpdateActivatedModules cấp lại cùng charge_level từ đầu cho từng bar Alpha/Beta/Gamma, trừ slots theo thứ tự trong bar rồi bật/tắt module. Đây là ngân sách riêng mỗi bar; không cộng tổng chi phí của ba bar thành một hàng. SetChargeLevel clamp vào 0..max_charge và tính lại khi giá trị đổi.

- WX78 prefab lưu riêng _wx78_health/_wx78_hunger/_wx78_sanity/_wx78_shield. Entity.OnLoad áp lại sau component.OnLoad, nhằm phục hồi current sau khi module đã thay max. Nhánh snapshot user session bỏ bước RefreshShadowSocketBuffs. ModuleOwner.OnLoad ưu tiên modules cũ, nếu không có mới dùng module_bars, gọi PushModule với isloading=true.

- Prefab module được tạo từ từng định nghĩa, gắn finiteuses max/current=4. Gỡ module tiêu 1 use hoặc mức HALF_MODULE_CONSUMPTION nếu leader có betterunplug, trừ khi owner đang SwapUpgradeModules. Swap bật is_swapping cho cả hai owner trong lúc PopAll/Push, nên callback gỡ bỏ qua hao use trong nhánh này.

- Circuit_SetUpSkillCb kiểm tra skill trên player hoặc leader của follower, áp callback ngay nếu đang có skill rồi nghe activate/deactivate và leaderchanged. Cleanup gọi deactivate cưỡng bức nếu đã active, sau đó tháo listeners. AddNewModuleDefinition chỉ cấp net ID với assert netid<64; định nghĩa đang có 23 mục literal, không khẳng định mọi mod đã được phân giải.

[wx78_moduledefs.lua dòng 1–1696](../source/scripts/wx78_moduledefs.lua) · [components/upgrademodule.lua dòng 1–68](../source/scripts/components/upgrademodule.lua) · [components/upgrademoduleowner.lua dòng 1–474](../source/scripts/components/upgrademoduleowner.lua) · [prefabs/wx78_modules.lua dòng 1–105](../source/scripts/prefabs/wx78_modules.lua) · [prefabs/wx78.lua dòng 181–233](../source/scripts/prefabs/wx78.lua) · [tuning.lua dòng 6578–6634](../source/scripts/tuning.lua) · [tuning.lua dòng 9397–9438](../source/scripts/tuning.lua) · [constants.lua dòng 3163–3172](../source/scripts/constants.lua) · [prefabs/wx78_common.lua dòng 961–974](../source/scripts/prefabs/wx78_common.lua) · [stategraphs/SGwx78_common.lua dòng 1126–1174](../source/scripts/stategraphs/SGwx78_common.lua)

[Phạm vi câu hỏi, suy luận và tìm kiếm](../evidence/deep-review-continuation-checks.json).

<!-- continuation-review-end -->

<!-- wx78-consumer-review-start -->

## Đọc tiếp các luồng WX78 — 08/11/2026

[Hồ sơ chi tiết xoay, drone, máy quét và thân dự phòng](../wx78-consumers.md).

- **Xoay — vào state, cửa sổ tác động và hao công cụ.** Đã bổ sung 7 luồng; nguồn và phần còn hở có trong hồ sơ chi tiết.

- **Drone trinh sát — tuyến bay, chủ sở hữu và shard.** Đã bổ sung 3 luồng; nguồn và phần còn hở có trong hồ sơ chi tiết.

- **Máy quét — dữ liệu, công thức và thu máy khi túi đầy.** Đã bổ sung 6 luồng; nguồn và phần còn hở có trong hồ sơ chi tiết.

- **Taser buildup — tích lũy, nổ và lưu/tải.** Đã bổ sung 4 luồng; nguồn và phần còn hở có trong hồ sơ chi tiết.

- **Clockwork — quota chia sẻ và gỡ follower.** Đã bổ sung 2 luồng; nguồn và phần còn hở có trong hồ sơ chi tiết.

[Ledger bổ sung](../evidence/deep-review-wx78-consumers.json).

<!-- wx78-consumer-review-end -->
