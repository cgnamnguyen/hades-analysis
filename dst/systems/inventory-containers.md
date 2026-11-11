# Túi đồ, rương, stack và đóng gói

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm túi đồ, rương, stack và đóng gói theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [containers.lua:1](../source/scripts/containers.lua) — text-lua

- [components/bundlemaker.lua:1](../source/scripts/components/bundlemaker.lua) — text-lua

- [components/bundler.lua:1](../source/scripts/components/bundler.lua) — text-lua

- [components/container.lua:1](../source/scripts/components/container.lua) — text-lua

- [components/containerinstallableitem.lua:1](../source/scripts/components/containerinstallableitem.lua) — text-lua

- [components/container_proxy.lua:1](../source/scripts/components/container_proxy.lua) — text-lua

- [components/container_replica.lua:1](../source/scripts/components/container_replica.lua) — text-lua

- [components/container_transform.lua:1](../source/scripts/components/container_transform.lua) — text-lua

- [components/inventory.lua:1](../source/scripts/components/inventory.lua) — text-lua

- [components/inventoryitem.lua:1](../source/scripts/components/inventoryitem.lua) — text-lua

- [components/inventoryitemholder.lua:1](../source/scripts/components/inventoryitemholder.lua) — text-lua

- [components/inventoryitemmoisture.lua:1](../source/scripts/components/inventoryitemmoisture.lua) — text-lua

- [components/inventoryitemtemperature.lua:1](../source/scripts/components/inventoryitemtemperature.lua) — text-lua

- [components/inventoryitem_replica.lua:1](../source/scripts/components/inventoryitem_replica.lua) — text-lua

- [components/inventory_replica.lua:1](../source/scripts/components/inventory_replica.lua) — text-lua

- [components/itemstore.lua:1](../source/scripts/components/itemstore.lua) — text-lua

- [components/stackable.lua:1](../source/scripts/components/stackable.lua) — text-lua

- [components/stackable_replica.lua:1](../source/scripts/components/stackable_replica.lua) — text-lua

- [components/unwrappable.lua:1](../source/scripts/components/unwrappable.lua) — text-lua

- [widgets/containerwidget.lua:1](../source/scripts/widgets/containerwidget.lua) — text-lua

- [widgets/inventorybar.lua:1](../source/scripts/widgets/inventorybar.lua) — text-lua

## Đọc sâu mã nguồn — 08/11/2026

**Mức bằng chứng bổ sung — source-traced-partial.** Đã lần give/stack/overflow, hành vi khi đầy và khôi phục item/equipment.

**Nhận đồ vào túi.** Inventory.GiveItem kiểm tra item hợp lệ, gỡ khỏi owner cũ và gọi OnPickup trước khi tìm slot. Nó thử prevslot/prevcontainer còn mở, slot gợi ý rồi GetNextAvailableSlot, bao gồm overflow và specialized containers. Có leftovers thì gọi GiveItem lại, vì một lần nhận có thể gộp vào nhiều stack. [components/inventory.lua:1035–1175](../source/scripts/components/inventory.lua).

**Túi/rương đầy.** Inventory.ignorefull trả false để caller giữ phần dư. Các nhánh còn lại có thể DropItem, gọi HandleLeftoversFn hoặc gộp vào activeitem. Inventoryfull chỉ phát nếu không đang load/silentfull. Container.GiveItem thử stack cùng loại và ô trống; khi thất bại mặc định đặt item ra vị trí container và OnDropped. drop_on_fail=false giữ quyền xử lý lại cho caller. Container không acceptsstacks có thể nhận một đơn vị mà trả false. [components/inventory.lua:1177–1220](../source/scripts/components/inventory.lua) · [components/container.lua:447–567](../source/scripts/components/container.lua).

**Split và gộp stack.** CanStackWith yêu cầu cùng prefab, skinname và custom test nếu có. Put chỉ nhận tới maxsize, pha thời gian hư/độ ẩm/nhiệt, xóa entity nguồn khi nhận hết hoặc trả phần dư. Get tách entity và sao chép trạng thái perishable, cursed, rechargeable, moisture và temperature. [components/stackable.lua:72–96](../source/scripts/components/stackable.lua) · [components/stackable.lua:109–203](../source/scripts/components/stackable.lua).

**Lưu/tải.** Inventory lưu itemslots/equipslots/activeitem với GetSaveRecord và references, chỉ lấy entity persists. Load SpawnSaveRecord rồi GiveItem/Equip, với cờ isloading ngăn câu báo đầy. Container cũng lưu theo slot và gọi GiveItem khi load, nên thay đổi luật slot có thể dẫn tới hành vi nhận/drop của caller. Stack lưu stacksize khác1 và load chặn trần MAXUINT. [components/inventory.lua:192–228](../source/scripts/components/inventory.lua) · [components/inventory.lua:293–325](../source/scripts/components/inventory.lua) · [components/container.lua:979–1005](../source/scripts/components/container.lua) · [components/stackable.lua:88–96](../source/scripts/components/stackable.lua).

**Phần còn phải kiểm tra trong nhóm này.**

- Đã nối thêm đổi equipment/container/socket/module qua backup body và lưu tiến độ drone giao hàng. Vẫn cần thao tác đồng thời, callback trang bị đặc biệt, reconnect và snapshot chen giữa các bước để xác minh kết quả runtime.
- Cần test đồng bộ slot và active item khi reconnect để xác định kết quả runtime của các thao tác cùng lúc.

<!-- deep-followup-start -->

## Các nhánh được nối thêm trong đợt đọc

- Bundler.StartBundling chỉ đi tiếp khi item có bundlemaker với cả prefab tạm và prefab đích, spawn thành công và container mở được cho doer. Container tạm gắn vào nhân vật, persists=false rồi chuyển SG bundling. FinishBundling đòi container không rỗng và đúng state; OnFinishBundling chụp record vật phẩm qua WrapItems rồi xóa container tạm và đưa gói vào inventory hoặc thả ra đất.

- StopBundling tháo từng item khỏi container tạm và trả qua Inventory.GiveItem, hoặc DropEverything nếu không có inventory. Nó có thể tạo lại item nguyên liệu gói trước khi xóa các cờ phiên. OnSave của Bundler vẫn lưu record container tạm khi không rỗng dù entity tạm persists=false; OnLoad dựng record, gắn parent lại và có nhánh bảo toàn phiên bundling hiện có.

- Unwrappable.WrapItems giữ từng GetSaveRecord và origin session. Unwrap có thể trì hoãn và tìm vị trí gần doer, tránh hố; sau đó SpawnPrefab từng record, SetPersistData và OnDropped, phát unwrappeditem rồi xóa itemdata. OnSave/OnLoad giữ items/origin. Nếu một prefab không dựng được, vòng lặp bỏ qua item đó và cuối lượt vẫn xóa itemdata; cần kiểm chứng theo dữ liệu thực trước khi kết luận mất vật phẩm.

[components/bundler.lua dòng 8–194](../source/scripts/components/bundler.lua) · [components/unwrappable.lua dòng 47–138](../source/scripts/components/unwrappable.lua) · [components/unwrappable.lua dòng 182–199](../source/scripts/components/unwrappable.lua)

<!-- deep-followup-end -->

<!-- continuation-review-start -->

## Đọc tiếp lưu/tải và các consumer — 08/11/2026

- ContainerProxy không giữ slots hoặc OnSave/OnLoad. SetMaster nối kho thật và nghe onopenother/onclose; mở một proxy phát onopenother khiến proxy cũ của cùng doer đóng, rồi chỉ tạo container_opener sau khi kho thật báo đã mở. Đây là đổi điểm truy cập cùng một kho, không sao chép contents giữa proxy.

- Định nghĩa pocket dimension có hai kho shadow/rabbitkinghorn, mỗi kho WidgetSetup kiểu 3×4 và loại item có tag irreplaceable. AddWorldEntities chỉ chèn record (0,0) nếu save chưa có prefab tương ứng; gamelogic gọi nó trước spawn entity. Registry nằm trên từng TheWorld, không đủ để coi contents đồng bộ xuyên shard.

- Pocket dimension prefab có Transform trên master để save, container thật và skipautoclose. OnSave của Container ghi item record theo slot và refs, OnLoad SpawnSaveRecord rồi GiveItem. Khi không ai mở, classified target là chính kho; một người thì người đó, nhiều người thì nil. Quy tắc network hiển thị này không đổi danh sách vật phẩm được lưu.

- Magician chest nối shadow master tại OnLoadPostPass; khi không POPULATING nối ngay. Shadow Chester tải save cũ bằng container shadowchester trước, rồi OnLoadPostPass chuyển từng item sang master. Nếu GiveItem(item,i,nil,false) thất bại, Chester đặt phần dư tại vị trí mình và OnDropped thay vì dùng tọa độ (0,0) của kho ẩn.

- Rabbitkinghorn chest chỉ là proxy tới kho rabbitkinghorn. Mở đầu tiên pause timer despawn; đóng cuối resume. Hết timer xóa proxy hoặc chạy animation despawn với persists=false; nhánh này không DropEverything/xóa contents kho chủ. Mũ shadow cũng có proxy riêng persists=false, không phải nơi giữ save record vật phẩm.

- Module stacksize của WX78 bỏ tạo túi mới khi isloading; túi đã lưu qua inventory/container. wx78_inventorycontainer.OnLoad hẹn một PostUpdate để kiểm tra slot cuối tương ứng số module đã gắn/đang bật. Slot đúng thì tính lại canbeopened; slot sai thì mở khóa và DropItem. SetPowered(false) chỉ đóng truy cập, không xóa contents hoặc tắt infinitestacksize.

- wx78_inventorycontainer bật infinite stack size trong constructor và giữ container save theo slot. Khi bị thả, nó DropEverything rồi Remove nếu dưới ngưỡng overstacks; nếu đạt ngưỡng thì DropEverythingUpToMaxStacks và giữ entity nếu còn đồ. OnPicked lấy ngẫu nhiên một item rồi GiveItem cho người nhặt hoặc thả ra đất. Không đồng nhất việc mất điện với việc rơi túi.

[components/container_proxy.lua dòng 1–185](../source/scripts/components/container_proxy.lua) · [prefabs/pocketdimensioncontainer_defs.lua dòng 1–17](../source/scripts/prefabs/pocketdimensioncontainer_defs.lua) · [prefabs/pocketdimensioncontainers.lua dòng 1–83](../source/scripts/prefabs/pocketdimensioncontainers.lua) · [worldentities.lua dòng 1–17](../source/scripts/worldentities.lua) · [prefabs/world.lua dòng 387–393](../source/scripts/prefabs/world.lua) · [prefabs/world.lua dòng 608–610](../source/scripts/prefabs/world.lua) · [gamelogic.lua dòng 879–885](../source/scripts/gamelogic.lua) · [containers.lua dòng 94–130](../source/scripts/containers.lua) · [components/container.lua dòng 979–1005](../source/scripts/components/container.lua) · [prefabs/magician_chest.lua dòng 107–120](../source/scripts/prefabs/magician_chest.lua) · [prefabs/magician_chest.lua dòng 165–193](../source/scripts/prefabs/magician_chest.lua) · [prefabs/chester.lua dòng 382–445](../source/scripts/prefabs/chester.lua) · [prefabs/chester.lua dòng 578–582](../source/scripts/prefabs/chester.lua) · [prefabs/rabbitkinghorn_chest.lua dòng 33–123](../source/scripts/prefabs/rabbitkinghorn_chest.lua) · [prefabs/hats.lua dòng 7501–7516](../source/scripts/prefabs/hats.lua) · [wx78_moduledefs.lua dòng 1325–1424](../source/scripts/wx78_moduledefs.lua) · [prefabs/wx78_inventorycontainer.lua dòng 1–206](../source/scripts/prefabs/wx78_inventorycontainer.lua) · [components/container.lua dòng 182–218](../source/scripts/components/container.lua) · [components/container.lua dòng 1578–1603](../source/scripts/components/container.lua)

[Phạm vi câu hỏi, suy luận và tìm kiếm](../evidence/deep-review-continuation-checks.json).

<!-- continuation-review-end -->

<!-- wx78-consumer-review-start -->

## Đọc tiếp các luồng WX78 — 08/11/2026

[Hồ sơ chi tiết xoay, drone, máy quét và thân dự phòng](../wx78-consumers.md).

- **Thân dự phòng — chuyển đồ, stats và khôi phục.** Đã bổ sung 11 luồng; nguồn và phần còn hở có trong hồ sơ chi tiết.

- **Drone giao hàng — khóa kho, phần dư và chuyến đang bay.** Đã bổ sung 6 luồng; nguồn và phần còn hở có trong hồ sơ chi tiết.

[Ledger bổ sung](../evidence/deep-review-wx78-consumers.json).

<!-- wx78-consumer-review-end -->
