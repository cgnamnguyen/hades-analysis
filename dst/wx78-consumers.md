# WX78 — xoay, drone, máy quét và thân dự phòng

Đối chiếu Lua nguyên byte của APK. Mỗi phần ghi đúng nhánh đã đọc; không chạy APK/Lua và không suy diễn thành mọi biến thể nhân vật đã hoàn tất.

[Định nghĩa 23 module](wx78-modules.md) · [Nhân vật](systems/characters-perks.md) · [Kho vật phẩm](systems/inventory-containers.md) · [Ledger nguồn](evidence/deep-review-wx78-consumers.json)

## Xoay — vào state, cửa sổ tác động và hao công cụ

- SGwilson chuyển CHOP/MINE/REMOVELUNARBUILDUP sang wx_spin_start khi có spin module và chưa prespin. ATTACK còn đòi vũ khí có CHOP/MINE và target; PICK đòi cây thuộc HARVESTABLE_PLANT_TARGET_TAGS, không quickpick và có công cụ phù hợp. Các nhánh rider/farmplantfastpicker/noquickpick được xét trước nhánh spin trong PICK.

- wx_spin_start dừng locomotor, phát chop_pre. Frame13 có thể quickstart hướng mục tiêu ATTACK của player nếu khoảng cách nằm trong min/max tính từ physics radius; frame14 chuyển wx_spin. Mỗi vòng spin tạo bảng targets/efficiency tại frame1, đóng cửa sổ tác động ở frame2 hoặc3 sau khi bảo đảm đã có ít nhất một lần update. Vì thế tác động được xử lý trong cửa sổ update, không gán thành một hit duy nhất đúng frame2.

- Spin truy entity quanh SPIN_RADIUS+3 rồi lọc lại bằng SPIN_RADIUS+physics radius, valid/visible và bảng targets. Ưu tiên gỡ lunar buildup khi có MINE, rồi CHOP/MINE theo workable, sau đó combat với CanTarget/not Ally, cuối cùng pickable harvest plant. Gặp vật cần loại công cụ khác có thể recoil với WorkedBy(...,0). Entity đã hit được ghi vào targets để tránh đánh lại trong cửa sổ đó.

- Hiệu suất CHOP/MINE/ATTACK có bảng riêng. Sau mỗi thành công, eff mới=(eff hoặc decay)×decay; decay=0,5 với một module, bằng0 với nhiều hơn một module. Vì vậy sau hit đầu, giá trị lưu kế tiếp là0,25 hoặc0. FiniteUses.OnUsedAsItem nhân consumption[action] với EfficientUser.GetMultiplier; đây là hao uses. AoeDiminishingReturns.mult phục vụ hành vi vũ khí riêng, comment của source nói không phải giảm damage chung. Sau lượt, các modifier tạm đều được gỡ.

- Thu hoạch spin gọi Pick(TheWorld), không GiveItem cho nhân vật; loot được Launch về phía nhân vật và rơi ra thế giới. Nếu có loot, finiteuses của công cụ có thể bị trừ WX78_SPIN_PICK_EFFICIENCY=0,2 một lần trong vòng; fumaroletool có nhánh OnUsed riêng. Source có hai lời gọi OnUsed cho fumarole trong nhánh này, nên không áp quy tắc 0,2 của finiteuses cho mọi công cụ. Túi đầy không ngăn loot được tạo từ nhánh này.

- Nhả phím gỡ busy/nopredict, nhưng chỉ về idle khi canrelease đã bật. Bộ đếm chóng mặt tăng theo dt, vượt CalcMaxDizzy thì vào wx_spin_dizzy; max là8 giây với một module,12 với nhiều module. Tích lũy phục hồi theo max(0,old−((now−last)/4)^2×max), nên nghỉ ngắn không nhất thiết xóa toàn bộ tích lũy. Spin loop chuyển tiếp vận tốc/hướng/numhits nhưng không chuyển các bảng targets/efficiency sang vòng mới.

- Vận tốc tối đa spin là runspeed×0,6, quickstart có thể nhân tạm, bỏ bám target khi xa>=8. Unequip hoặc trượt chân thoát state; attacked cập nhật numhits giảm theo floor(elapsed/2), dưới3 thêm nostunlock. Khi thực sự rời spin, cleanup dừng motor, bỏ prespin/remote override, trả quyền thoại và xóa combat target. Không có save riêng cho cửa sổ hit, vận tốc hay dizzy trong các module đã đọc.

**Nguồn đối chiếu.** [stategraphs/SGwilson.lua dòng 852–902](source/scripts/stategraphs/SGwilson.lua) · [stategraphs/SGwilson.lua dòng 1043–1067](source/scripts/stategraphs/SGwilson.lua) · [stategraphs/SGwilson.lua dòng 1320–1344](source/scripts/stategraphs/SGwilson.lua) · [stategraphs/SGwx78_common.lua dòng 192–887](source/scripts/stategraphs/SGwx78_common.lua) · [components/efficientuser.lua dòng 1–48](source/scripts/components/efficientuser.lua) · [components/aoediminishingreturns.lua dòng 1–12](source/scripts/components/aoediminishingreturns.lua) · [components/finiteuses.lua dòng 85–113](source/scripts/components/finiteuses.lua) · [util/sourcemodifierlist.lua dòng 1–100](source/scripts/util/sourcemodifierlist.lua) · [prefabs/wx78_common.lua dòng 253–265](source/scripts/prefabs/wx78_common.lua) · [tuning.lua dòng 9429–9439](source/scripts/tuning.lua)

**Còn hở.** Chưa quan sát frame thực trên Android, dự đoán phía client và từng vũ khí có hiệu ứng AoE riêng; không suy mọi hiệu ứng phụ nhận cùng multiplier.

## Thân dự phòng — chuyển đồ, stats và khôi phục

- CanDoerActivate yêu cầu player có wx78_classified, owner userid khớp nếu đã liên kết; body chưa có owner phải TryToAttachToOwner thành công, nếu không trả TOOMANYBACKUPBODIES. TryToAttach từ chối owner nil/snapshot user session, body đã có userid và kiểm số body tự do, trừ chỗ cho build buffered. Không coi chỉ có nhãn WX78 là đủ quyền dùng body của người khác.

- OnActivate bật _backupbody_transferring trên cả hai và tách shadow harvester/debuffer pet trước mọi chuyển đổi. Với inventory, nó ReturnActiveItem, thả đồ tag irreplaceable rồi SwapEquipment. Đồ container và inventory được tháo vào hai bảng theo slot, xóa prevcontainer/prevslot; túi wx78_inventorycontainer còn được gắn cờ riêng để callback tháo module không thả lại giữa chừng.

- Chuyển đồ chỉ đi qua min(container.numslots,inventory.maxslots), GiveItem theo cùng slot. Nếu nhận thất bại, code đặt vị trí và OnDropped; slot dư cũng đi ra đất. Sau lượt trả silentfull/ignoresound về false. Đây là đường xử lý phần dư có trong source, chưa chứng minh mọi callback item hoặc thao tác chen ngang đều an toàn khi chạy.

- Socket được UnsocketEverything cả hai phía rồi TryToSocket vào phía đối diện; vật không socket được hoặc nằm ngoài số socket chung được đặt xuống đất. Stats của doer được chụp trước đổi module; charge đổi chỗ rồi SwapUpgradeModules, sau đó mới ApplySavedStatsToDoer và ConfigureStats cho chassis. Cờ của túi mở rộng chỉ được gỡ sau khi module đã chuyển.

- Stats chụp gồm current health/hunger/sanity, gears eaten, moisture, temperature, shield và grogginess. Health để lại tối thiểu1; khi áp lại, nhiệt quá lạnh/nóng có thể trở về STARTING_TEMP tùy nhiệt vùng, shield chỉ nhận giá trị đã lưu nếu hiện có charge source. Đổi thân không đơn thuần sao chép phần trăm health hay luôn giữ nguyên nhiệt độ/khiên.

- Sau khi đổi đồ/module/stats, body và doer đổi vị trí/rotation rồi phát teleported. Pet cũ được gắn sang petleash phía đối diện; AttachPet thất bại thì phát despawn. Cuối hàm mới xóa _backupbody_transferring. Đây là chuỗi lệnh đồng bộ trong callback, chưa có bằng chứng cơ chế rollback toàn bộ nếu một callback giữa chuỗi lỗi.

- Backup body có container thật lưu contents; body_inventory là entity con riêng với inventory.maxslots=0 chỉ để giữ equipment/skinner. Prefab.OnSave nhúng GetSaveRecord của entity con, maxcharge, possessed/planar và saved_stats. OnLoad xóa entity con mặc định, SpawnSaveRecord rồi gắn parent và đưa local position về0; LinkedItem.OnLoad đăng ký lại userid với world. Không coi thiếu itemslots trên entity con là body không lưu đồ.

- Khi owner có skill bodycircuits, chassis gọi TryActivate từng module Beta; nếu không có hoặc owner bị gỡ thì deactivate. Constructor tắt automatic module activation, charge ban đầu3, nên không áp thẳng quy tắc mọi bar của nhân vật sống cho chassis đang đứng yên. Skill-tree initialized mới đăng ký body và cập nhật slots/socket; nhánh possessed có thể hẹn task0 để trở lại thân hoạt động.

- Possessed body save riêng maxcharge, planar, gears và current stats; OnLoad áp current sau component load. OnLoadPostPass gọi TryToReplaceWithBackupBody(true): tạo chassis, chụp stats trước khi đặt charge hai phía về0, đổi dữ liệu qua DoActivate, ConfigurePossessed/saved_stats rồi Remove entity cũ. Cần kiểm chứng chuỗi tái sở hữu sau load, không mô tả là cứ nạp nguyên entity đang chạy tại state cũ.

- Đổi thân trên bản đồ đòi skill remotebodyswap, tìm icon body gần điểm chọn trong radius20, chặn khác phía WagPunk arena barrier rồi CanActivate/DoActivate lại. SG wx_poweroff chỉ PerformBufferedAction tại frame60; bật invincible từ frame19, sau đó reboot kể cả action thất bại. Poweron mở điều khiển lại ở frame75 và bỏ invincible ở frame82. Đây là timeline riêng với việc đổi dữ liệu trong callback.

- Đập hết work body thả equipment, contents container, socket và toàn bộ module rồi Remove. Haunt chỉ đăng ký hồi sinh khi có ghostrevive_1 và CanActivate; khi nhận ms_respawnedfromghost, charge body về0, đổi thân, skill ghostrevive_3 có thể SetPercent(1), rồi xóa chassis. Không suy rằng mọi lần haunt luôn hồi sinh ngay hoặc miễn mất charge.

**Nguồn đối chiếu.** [prefabs/wx78_backupbody.lua dòng 31–48](source/scripts/prefabs/wx78_backupbody.lua) · [prefabs/wx78_backupbody.lua dòng 86–240](source/scripts/prefabs/wx78_backupbody.lua) · [prefabs/wx78_backupbody.lua dòng 243–563](source/scripts/prefabs/wx78_backupbody.lua) · [prefabs/wx78_backupbody.lua dòng 581–674](source/scripts/prefabs/wx78_backupbody.lua) · [prefabs/wx78_backupbody.lua dòng 736–859](source/scripts/prefabs/wx78_backupbody.lua) · [prefabs/wx78_backupbody.lua dòng 929–980](source/scripts/prefabs/wx78_backupbody.lua) · [prefabs/wx78_backupbody.lua dòng 1018–1065](source/scripts/prefabs/wx78_backupbody.lua) · [prefabs/wx78_possessedbody.lua dòng 181–212](source/scripts/prefabs/wx78_possessedbody.lua) · [prefabs/wx78_possessedbody.lua dòng 434–493](source/scripts/prefabs/wx78_possessedbody.lua) · [components/linkeditem.lua dòng 123–144](source/scripts/components/linkeditem.lua) · [actions.lua dòng 6927–6978](source/scripts/actions.lua) · [stategraphs/SGwilson.lua dòng 27970–28185](source/scripts/stategraphs/SGwilson.lua) · [tuning.lua dòng 7515–7519](source/scripts/tuning.lua)

**Còn hở.** Còn AI/command của possessed body, linkeditemmanager xuyên shard, mất kết nối hoặc save chen giữa đổi thân và callback trang bị đặc biệt.

## Drone trinh sát — tuyến bay, chủ sở hữu và shard

- MAPSCOUT_MAP cần doer có classified/skill scoutdrone_1, target có GetDroneRange và action point. Nó clamp điểm chọn vào tầm đo từ vị trí doer, unwrap global icon, Stop chuyến cũ rồi SendToPoint. Tầm cơ sở200, skill extradrone cộng300, Beta1 có thể cộng theo số radar. Không dùng vị trí drone làm tâm clamp trong hàm này.

- Drone scout dùng MapDeliverable, tốc độ tuning3; đoạn ngắn mất2 giây, dài hơn dùng 2+(distance−3)/3 với tăng/giảm tốc đầu/cuối. Khi đang bay, nó cập nhật vị trí rồi chỉ RevealArea nếu vùng cho phép bay, owner có player_classified và handshake READY; khoảng dịch chuyển bình phương>=16 mới reveal lần tiếp. Vùng cấm làm ẩn/ngừng quét, không có Stop tương tự delivery drone trong callback đã đọc.

- StartTracking khiến scout persists=false và maprevealer riêng tư theo chủ, vì tracker chủ lưu từng drone GetSaveRecord theo shard ID. OnLoad chỉ SpawnSaveRecord cho shard hiện tại, giữ record shard khác trong self.data. Untracked trả persists=true; chủ bị remove hoặc ReleaseAllDrones phát despawn. Do đó persists=false không đủ để kết luận scout mất sau save.

**Nguồn đối chiếu.** [actions.lua dòng 6821–6884](source/scripts/actions.lua) · [prefabs/wx78_drone_scout.lua dòng 107–246](source/scripts/prefabs/wx78_drone_scout.lua) · [prefabs/wx78_drone_scout.lua dòng 308–350](source/scripts/prefabs/wx78_drone_scout.lua) · [components/wx78_dronescouttracker.lua dòng 1–93](source/scripts/components/wx78_dronescouttracker.lua) · [tuning.lua dòng 7521–7527](source/scripts/tuning.lua) · [components/mapdeliverable.lua dòng 101–206](source/scripts/components/mapdeliverable.lua)

**Còn hở.** Chưa quan sát thao tác map/RPC từ client khác, owner rời shard giữa tuyến và merge record của nhiều lần chuyển shard.

## Drone giao hàng — khóa kho, phần dư và chuyến đang bay

- Có drone nhỏ3×1 và lớn3×2, skill lần lượt deliverydrone_1/_2. Trước mở thao tác map, server chặn thiếu skill, đang _nointeract, đã khóa hoặc người khác đang mở container, và kho rỗng; trả NOSKILL_DRONE/INUSE/EMPTY. Khi nhận khóa, nó Close container và canbeopened=false; stopcontinuousaction của đúng user hoặc user remove sẽ mở khóa.

- STARTMAPDELIVER kiểm vùng bay trước StartMapAction. MAPDELIVER_MAP kiểm tuyến ở maponly_checkvalidpos và fn, rồi MapDeliverable từ chối chuyến đang chạy hoặc buffered action thuộc người khác. OnStartDelivery đóng truy cập, tắt workable, đặt sender và bắt đầu takeoff. Hàng tiếp tục nằm trong container của drone, không được chuyển sang inventory người nhận qua callback này.

- Thời gian delivery gồm cất cánh2,5 giây và đoạn bay tối thiểu2 giây, hoặc 2+(distance−speed)/speed với speed30. Mỗi update kiểm IsFlyingPermittedFromPointToPoint_BypassVault từ vị trí hiện tại tới vị trí mong muốn; không cho phép thì Stop và hạ cánh ở nơi hiện tại. Hạ cánh xong mới bật tương tác/workable và gỡ global tracking; có xử lý tránh mắc vật cản khi wake.

- MapDeliverable.OnSave chỉ ghi khi đang bay: origin/dest làm tròn0,001, elapsed t làm tròn giây và len làm tròn0,1. OnLoad dựng lại cùng origin/dest và t=min(saved_t,len), chạy OnStartDelivery với doer=nil rồi StartUpdatingComponent. Container save/load riêng giữ hàng. Đây là khôi phục tiến độ đã lượng tử hóa, không phải lưu chính xác từng frame hoặc tự cộng thời gian offline.

- Prefab delivery lưu sender.userid và sau component load chỉ tìm lại sender nếu IsDelivering; chưa online thì giữ senderid để thử lại trong progress. Khi không bay, OnLoadPostPass phát on_landed. Các khóa user đang chọn map không có trường lưu riêng trong code đọc, nên không đồng nhất khóa thao tác với hàng hay trạng thái chuyến đã gửi.

- CanDismantle đòi kho rỗng, batteryuser và container có thể mở. Tuy vậy nhánh hammer/ChangeToItem vẫn DropEverything trước đổi sang kit và Remove drone. OnHit cũng DropEverything khi tương tác được. Vì vậy đồ còn trong kho đi ra đất trong các nhánh phá này; không tuyên bố kit giữ nguyên contents.

**Nguồn đối chiếu.** [prefabs/wx78_drone_delivery.lua dòng 1–10](source/scripts/prefabs/wx78_drone_delivery.lua) · [prefabs/wx78_drone_delivery.lua dòng 108–250](source/scripts/prefabs/wx78_drone_delivery.lua) · [prefabs/wx78_drone_delivery.lua dòng 250–378](source/scripts/prefabs/wx78_drone_delivery.lua) · [prefabs/wx78_drone_delivery.lua dòng 435–526](source/scripts/prefabs/wx78_drone_delivery.lua) · [prefabs/wx78_drone_delivery.lua dòng 600–673](source/scripts/prefabs/wx78_drone_delivery.lua) · [components/mapdeliverable.lua dòng 1–213](source/scripts/components/mapdeliverable.lua) · [actions.lua dòng 6886–6925](source/scripts/actions.lua) · [components/container.lua dòng 979–1005](source/scripts/components/container.lua) · [tuning.lua dòng 7531–7532](source/scripts/tuning.lua)

**Còn hở.** Còn tắt tiến trình giữa callback, map RPC giả lập cạnh tranh và world collision thực khi hạ cánh.

## Máy quét — dữ liệu, công thức và thu máy khi túi đầy

- TryFindTarget ưu tiên mục tiêu có công thức chủ chưa biết, kể cả dữ liệu đã cạn; nhóm thường phải còn GetData>0. Khi khóa mục tiêu, _scantime=0. Trong range hợp lệ, thời gian cộng dt cho tới >10 giây hoặc >20 nếu epic; ra range chỉ dừng FX, không tự reset _scantime trong nhánh này. Target invalid/dead/limbo, mất owner hoặc không còn lợi ích scan thì fail và trở lại proximity scan.

- OnSuccessfulScan chỉ đặt _donescanning, recipe-to-teach và scanned_id rồi dừng quét. Brain ưu tiên bay về leader qua WALKTO; callback success mới phát scan_success, còn callback fail tương ứng đang comment. Nếu không có leader thì phát ngay. State scan_success gọi SpawnData tại frame21 rồi animover chuyển sang prefab succeeded; không coi quét đủ thời gian là dữ liệu đã vào túi.

- SpawnData dùng DataAnalyzer.SpendData(scan_id), lấy floor dữ liệu hiện có rồi trừ đúng phần nguyên, giữ phần lẻ. Nếu amount>0 tạo scandata stack tại vị trí gần scanner và để nó rơi xuống đất, không GiveItem. DataAnalyzer hồi maxdata/16 mỗi SEG_TIME cho các mục đã có trong history; save giữ nguyên history. Hồi dữ liệu theo loại scan ID, không phải mỗi con vật được reset riêng.

- Prefab succeeded lưu _module_recipe riêng. can_harvest đòi doer có upgrademoduleowner; recipe zap remote còn kiểm skill zapdrone_1. Khi thu, nó Teach công thức nếu có, Spawn scanner_item rồi Inventory.GiveItem và Remove succeeded. Nhánh GiveItem đã biết có fallback khi đầy, nên việc trả máy đi qua luật inventory; source không giữ succeeded chỉ vì túi đầy.

- Succeeded timeout bằng total_day_time: xóa recipe và thay bằng scanner_item trên đất. Timer và module_recipe được lưu ở component/prefab riêng. Active scanner save chỉ có schematic, turned_off, scanned_id (load tương thích scanned_prefab); không ghi _scantime hay _donescanning. Vì vậy không khẳng định tải lại giữa quét/đang bay về sẽ tiếp tục đúng tiến độ; cần snapshot theo từng mốc.

- Đổi leader tháo/gắn listener skill và rangecircuitupdate; mất leader khi chưa done thì fail và đổi về item. Scan distance/player proximity lấy radar đang hoạt động và skill extradrone từ net vars. Client hiển thị vòng quét không đủ để chứng minh server đã cộng thời gian; điều kiện noattack vẫn loại target, trừ tag state canwxscan.

**Nguồn đối chiếu.** [prefabs/wx78_scanner.lua dòng 34–47](source/scripts/prefabs/wx78_scanner.lua) · [prefabs/wx78_scanner.lua dòng 104–174](source/scripts/prefabs/wx78_scanner.lua) · [prefabs/wx78_scanner.lua dòng 184–234](source/scripts/prefabs/wx78_scanner.lua) · [prefabs/wx78_scanner.lua dòng 397–550](source/scripts/prefabs/wx78_scanner.lua) · [prefabs/wx78_scanner.lua dòng 573–620](source/scripts/prefabs/wx78_scanner.lua) · [prefabs/wx78_scanner.lua dòng 696–727](source/scripts/prefabs/wx78_scanner.lua) · [prefabs/wx78_scanner.lua dòng 730–820](source/scripts/prefabs/wx78_scanner.lua) · [prefabs/wx78_scanner.lua dòng 1017–1174](source/scripts/prefabs/wx78_scanner.lua) · [brains/wx78_scannerbrain.lua dòng 1–127](source/scripts/brains/wx78_scannerbrain.lua) · [stategraphs/SGwx78_scanner.lua dòng 90–224](source/scripts/stategraphs/SGwx78_scanner.lua) · [components/dataanalyzer.lua dòng 1–79](source/scripts/components/dataanalyzer.lua) · [prefabs/wx78.lua dòng 779–780](source/scripts/prefabs/wx78.lua) · [tuning.lua dòng 6645–6659](source/scripts/tuning.lua) · [components/inventory.lua dòng 1177–1220](source/scripts/components/inventory.lua)

**Còn hở.** Còn snapshot giữa scan, scan xong đang bay về, trước/sau frame21 và lúc harvest để xác minh không mất/lặp data hoặc recipe.

## Taser buildup — tích lũy, nổ và lưu/tải

- Wx78_TaserBuildup nghe cả attacked và blocked, tăng theo gainratemultiplier×5 và clamp0..max100. Sau4 giây không tăng mới cộng drain_rate×dt; module consumer đặt drain_rate=-6+số module, gain multiplier=1+số module/3, blast_damage=50×số module và radius=2+số module. OnAttacked của component không dùng payload để lọc attacker như callback phản điện của từng module.

- ReleaseBuildup chỉ hoạt động từ25% charge, mặc định hẹn nổ3 giây; nếu đã có lịch thì chỉ thay callback, không bắt đầu lại countdown. Đạt max từ dưới ngưỡng tự gọi Release. Nổ nhân cả damage và radius với phần trăm hiện tại, electrocute chủ rồi detach/spawn FX mới, reset charge0 và chạy callback. Chủ đang wxshielding/spinning không bật ForceNoInsulated cưỡng bức trong nhánh đã đọc.

- OnSave chỉ lưu current; OnLoad SetCurrentBuildup, không khôi phục detonate_time, last_buildup_time hoặc effect cooldown cũ. Load tại max có thể kích hoạt lịch nổ mới qua setter; save ở mức khác khi đang countdown không giữ chính deadline đó trong component. Đây là hệ quả source có điều kiện, chưa quan sát snapshot.

- Taser blast có cửa sổ hit18×FRAMES, bảng targets chặn lặp và đánh dấu owner trước nên không đánh owner qua vòng AoE này. Có owner thì dùng CanTarget/not Ally; mất owner dùng CanBeAttacked và lọc follower player khi non-PVP theo nhánh riêng. Damage nhân electric/wet multiplier, GetAttacked rồi electrocute; không mặc định tất cả creature trong vòng đều nhận hit.

**Nguồn đối chiếu.** [components/wx78_taserbuildup.lua dòng 1–245](source/scripts/components/wx78_taserbuildup.lua) · [wx78_moduledefs.lua dòng 670–714](source/scripts/wx78_moduledefs.lua) · [prefabs/wx78_taser_projectile.lua dòng 67–185](source/scripts/prefabs/wx78_taser_projectile.lua) · [prefabs/wx78_taser_projectile.lua dòng 257–309](source/scripts/prefabs/wx78_taser_projectile.lua) · [tuning.lua dòng 7498–7511](source/scripts/tuning.lua)

**Còn hở.** Cần snapshot với charge25..99 đang countdown và charge100, cùng thứ tự component load/skill/module để xác minh deadline thực.

## Clockwork — quota chia sẻ và gỡ follower

- ClockworkTracker theo dõi rook/knight/bishop bằng tag. CanAdd cho dưới max cơ sở; phần vượt vừa phải dưới ceil(total_bonus/3) cho từng loại, vừa chưa dùng hết bonus chung. Trong event YOTH, knight có max vô hạn, hai loại còn lại dùng ceil(bonus/2). Do đó bonus2 không có nghĩa mỗi loại được thêm2.

- Giảm bonus/max gọi RevalidateFollowers theo thứ tự bishop→rook→knight, dùng next để chọn entity dư rồi SetLeader(nil), không mô tả được con cụ thể nào được giữ. Khi hết modifier, follower và max override, TryRemoveComponentIfClear tự RemoveComponent. Component không có OnSave/OnLoad; quota/nhóm theo dõi phải được dựng lại qua module/leader caller, chưa đọc hết đường follower load.

**Nguồn đối chiếu.** [components/clockworktracker.lua dòng 1–175](source/scripts/components/clockworktracker.lua)

**Còn hở.** Còn callback thu phục/đăng ký follower và khôi phục leader qua save của các prefab clockwork.
