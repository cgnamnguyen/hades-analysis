# Ong, côn trùng và các module liên quan thụ phấn

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại inventory theo các module/định nghĩa có thật. Một file có thể thuộc nhiều hệ thống; cần trace riêng trước khi xác nhận hành vi.

- [components/birdattractor.lua:1](../source/scripts/components/birdattractor.lua) — text-lua

- [components/pollinator.lua:1](../source/scripts/components/pollinator.lua) — text-lua

- [prefabs/bee.lua:1](../source/scripts/prefabs/bee.lua) — text-lua

- [prefabs/beebox.lua:1](../source/scripts/prefabs/beebox.lua) — text-lua

- [prefabs/beefalo.lua:1](../source/scripts/prefabs/beefalo.lua) — text-lua

- [prefabs/beefaloherd.lua:1](../source/scripts/prefabs/beefaloherd.lua) — text-lua

- [prefabs/beefalowool.lua:1](../source/scripts/prefabs/beefalowool.lua) — text-lua

- [prefabs/beefalo_groomer.lua:1](../source/scripts/prefabs/beefalo_groomer.lua) — text-lua

- [prefabs/beef_bell.lua:1](../source/scripts/prefabs/beef_bell.lua) — text-lua

- [prefabs/beeguard.lua:1](../source/scripts/prefabs/beeguard.lua) — text-lua

- [prefabs/beehive.lua:1](../source/scripts/prefabs/beehive.lua) — text-lua

- [prefabs/beemine.lua:1](../source/scripts/prefabs/beemine.lua) — text-lua

- [prefabs/beequeen.lua:1](../source/scripts/prefabs/beequeen.lua) — text-lua

- [prefabs/beequeenhive.lua:1](../source/scripts/prefabs/beequeenhive.lua) — text-lua

- [prefabs/beeswax.lua:1](../source/scripts/prefabs/beeswax.lua) — text-lua

- [prefabs/beeswax_spray.lua:1](../source/scripts/prefabs/beeswax_spray.lua) — text-lua

- [prefabs/diseaseflies.lua:1](../source/scripts/prefabs/diseaseflies.lua) — text-lua

- [prefabs/fireflies.lua:1](../source/scripts/prefabs/fireflies.lua) — text-lua

- [prefabs/flies.lua:1](../source/scripts/prefabs/flies.lua) — text-lua

- [prefabs/flower.lua:1](../source/scripts/prefabs/flower.lua) — text-lua

- [prefabs/flower_cave.lua:1](../source/scripts/prefabs/flower_cave.lua) — text-lua

- [prefabs/flower_evil.lua:1](../source/scripts/prefabs/flower_evil.lua) — text-lua

- [prefabs/flower_withered.lua:1](../source/scripts/prefabs/flower_withered.lua) — text-lua

- [prefabs/honey.lua:1](../source/scripts/prefabs/honey.lua) — text-lua

- [prefabs/honeycomb.lua:1](../source/scripts/prefabs/honeycomb.lua) — text-lua

- [prefabs/honey_trail.lua:1](../source/scripts/prefabs/honey_trail.lua) — text-lua

- [prefabs/mosquito.lua:1](../source/scripts/prefabs/mosquito.lua) — text-lua

- [prefabs/mosquitobomb.lua:1](../source/scripts/prefabs/mosquitobomb.lua) — text-lua

- [prefabs/mosquitofertalizer.lua:1](../source/scripts/prefabs/mosquitofertalizer.lua) — text-lua

- [prefabs/mosquitomermsalve.lua:1](../source/scripts/prefabs/mosquitomermsalve.lua) — text-lua

- [prefabs/mosquitomusk.lua:1](../source/scripts/prefabs/mosquitomusk.lua) — text-lua

- [prefabs/mosquitosack.lua:1](../source/scripts/prefabs/mosquitosack.lua) — text-lua

- [prefabs/wasphive.lua:1](../source/scripts/prefabs/wasphive.lua) — text-lua

<!-- deep-review-characters-content:start -->

## Đọc sâu mã nguồn — 08/11/2026

Đã trace pollinator, sản lượng beebox và thu hoạch qua Harvestable.

Pollinator ghi từng flower entity có tag flower và chưa có trong self.flowers. HasCollectedEnough dùng số hoa lớn hơn collectcount, default5, nên điều kiện mặc định là hơn5 entity hoa. Khi đủ và đứng trên valid ground, CreateFlower chọn prefab ngẫu nhiên từ hoa đã gặp, spawn tại vị trí côn trùng rồi reset danh sách. CheckFlowerDensity đếm mọi entity qua bộ lọc loại FX/NOBLOCK/INLIMBO/DECOR trong distance, không lọc bắt buộc tag flower. [components/pollinator.lua dòng 1–53](../source/scripts/components/pollinator.lua)

Beebox chỉ cho bắt đầu sinh trưởng khi chưa burnt, có harvestable, không winter, childspawner còn ít nhất1 con và có flower trong radius. Nhánh hang dừng khi không caveday hoặc tối. Khi con trở về có pollinator.HasCollectedEnough, hộp Grow ngay. Khi entity asleep, TryStartSleepGrowing đặt growtime=BEEBOX_HONEY_TIME; khi wake xóa growtime và pause timer. Spring thay regen/spawn period theo SPRING_COMBAT_MOD. [prefabs/beebox.lua dòng 31–75](../source/scripts/prefabs/beebox.lua) · [prefabs/beebox.lua dòng 144–174](../source/scripts/prefabs/beebox.lua) · [prefabs/beebox.lua dòng 198–234](../source/scripts/prefabs/beebox.lua)

Harvest reset produce=0 trước callback onharvest. Beebox callback dừng timer hiện tại, cập nhật animation và thả các con ra nhắm picker nếu không winter, ngoại trừ picker có skill wormwood_bugs. Harvestable kiểm can_harvest_fn trước khi reset, rồi spawn từng product và GiveItem cho picker hoặc launch ra world. Vì vậy sản phẩm được thực hiện sau callback thu hoạch của hộp. [prefabs/beebox.lua dòng 122–151](../source/scripts/prefabs/beebox.lua) · [components/harvestable.lua dòng 176–208](../source/scripts/components/harvestable.lua)

Beebox save riêng cờ burnt và load gọi onburnt hoặc updatelevel. Số produce, pausetime và thời gian đến grow tiếp theo được Harvestable.Save giữ; Load gán produce/pausetime và StartGrowing(data.time) nếu có. Grow tăng1 tới maxproduce rồi dừng, Pause giữ thời gian dương còn lại. [prefabs/beebox.lua dòng 154–183](../source/scripts/prefabs/beebox.lua) · [components/harvestable.lua dòng 97–174](../source/scripts/components/harvestable.lua)

**Phần còn hở.**

- Chưa trace đầy đủ mosquito, fireflies, bird attractor và Bee Queen combat của nhóm. Các file beefalo xuất hiện do tên prefix cần phân loại chủ đề riêng.
- Cần đối chiếu hive/bee brain chọn target pollination và cách entity asleep/LongUpdate tác động lịch sản lượng thực tế.

<!-- deep-review-characters-content:end -->
