# Spawner thế giới và thiên tai

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm spawner thế giới và thiên tai theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

ChildSpawner quản lý quota trong/ngoài và regen; MeteorShower tách đợt thiên thạch với cooldown.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- ChildSpawner.NumChildren cộng childreninside và numchildrenoutside. Regen chỉ thêm vào trong nếu chưa đầy. Tick giảm lịch regen/spawn nếu không dùng external timer; khi tới lịch spawn nhưng entity ngủ và không spawnoffscreen thì queue thay vì sinh ngay.

- SpawnChild từ chối target bất tử, nguồn invalid/chết, không còn con trong hoặc canspawnfn false. Chỉ khi DoSpawnChild trả entity mới trừ childreninside và nhận ownership. Save ghi GUID con ngoài, số con trong, lịch spawn/regen và các cờ; GUID được trả làm references.

- MeteorShower.StartShower chọn level, duration/rate và tạo periodic dt=1/rate khi cả hai dương. Khi xa player, nó giảm tần suất thực sinh theo OFFSCREEN_MOD; hết duration chuyển cooldown. Save version2 lưu remainingtime đã chuẩn hóa theo mức tối đa của duration/cooldown. Load hỗ trợ dạng cũ không version và dựng lại task.

### Nguồn đối chiếu

- [components/childspawner.lua:169–225](../source/scripts/components/childspawner.lua).

- [components/childspawner.lua:332–378](../source/scripts/components/childspawner.lua).

- [components/childspawner.lua:615–646](../source/scripts/components/childspawner.lua).

- [components/childspawner.lua:717–757](../source/scripts/components/childspawner.lua).

- [components/meteorshower.lua:200–321](../source/scripts/components/meteorshower.lua).

### Phạm vi còn hở

- Mỗi loại disaster/spawner còn có callback và worldsetting riêng; chưa dùng ChildSpawner hoặc MeteorShower để suy quy tắc của bat, frog rain, lunar hay pirate.

- Đã nối khác khóa save/load tới quota và nhánh chọn cỡ meteor. Với save trực tiếp không được sửa khóa, quota về0; còn cần kiểm tra migration của save thực và kết quả lúc chạy.

<!-- deep-review-world-ecology:end -->

- [components/batspawner.lua:1](../source/scripts/components/batspawner.lua) — text-lua

- [components/beargerspawner.lua:1](../source/scripts/components/beargerspawner.lua) — text-lua

- [components/birdspawner.lua:1](../source/scripts/components/birdspawner.lua) — text-lua

- [components/brightmarespawner.lua:1](../source/scripts/components/brightmarespawner.lua) — text-lua

- [components/butterflyspawner.lua:1](../source/scripts/components/butterflyspawner.lua) — text-lua

- [components/caveins.lua:1](../source/scripts/components/caveins.lua) — text-lua

- [components/childspawner.lua:1](../source/scripts/components/childspawner.lua) — text-lua

- [components/crabkingspawner.lua:1](../source/scripts/components/crabkingspawner.lua) — text-lua

- [components/daywalkerspawner.lua:1](../source/scripts/components/daywalkerspawner.lua) — text-lua

- [components/deerclopsspawner.lua:1](../source/scripts/components/deerclopsspawner.lua) — text-lua

- [components/deerherdspawner.lua:1](../source/scripts/components/deerherdspawner.lua) — text-lua

- [components/desolationspawner.lua:1](../source/scripts/components/desolationspawner.lua) — text-lua

- [components/forestdaywalkerspawner.lua:1](../source/scripts/components/forestdaywalkerspawner.lua) — text-lua

- [components/forestresourcespawner.lua:1](../source/scripts/components/forestresourcespawner.lua) — text-lua

- [components/frograin.lua:1](../source/scripts/components/frograin.lua) — text-lua

- [components/gelblobspawner.lua:1](../source/scripts/components/gelblobspawner.lua) — text-lua

- [components/klaussackspawner.lua:1](../source/scripts/components/klaussackspawner.lua) — text-lua

- [components/lunaralterguardianspawner.lua:1](../source/scripts/components/lunaralterguardianspawner.lua) — text-lua

- [components/lunarthrall_plantspawner.lua:1](../source/scripts/components/lunarthrall_plantspawner.lua) — text-lua

- [components/lureplantspawner.lua:1](../source/scripts/components/lureplantspawner.lua) — text-lua

- [components/malbatrossspawner.lua:1](../source/scripts/components/malbatrossspawner.lua) — text-lua

- [components/maxlightspawner.lua:1](../source/scripts/components/maxlightspawner.lua) — text-lua

- [components/meteorshower.lua:1](../source/scripts/components/meteorshower.lua) — text-lua

- [components/minionspawner.lua:1](../source/scripts/components/minionspawner.lua) — text-lua

- [components/moonbeastspawner.lua:1](../source/scripts/components/moonbeastspawner.lua) — text-lua

- [components/moosespawner.lua:1](../source/scripts/components/moosespawner.lua) — text-lua

- [components/objectspawner.lua:1](../source/scripts/components/objectspawner.lua) — text-lua

- [components/penguinspawner.lua:1](../source/scripts/components/penguinspawner.lua) — text-lua

- [components/periodicspawner.lua:1](../source/scripts/components/periodicspawner.lua) — text-lua

- [components/piratespawner.lua:1](../source/scripts/components/piratespawner.lua) — text-lua

- [components/playerspawner.lua:1](../source/scripts/components/playerspawner.lua) — text-lua

- [components/quaker.lua:1](../source/scripts/components/quaker.lua) — text-lua

- [components/rampingspawner.lua:1](../source/scripts/components/rampingspawner.lua) — text-lua

- [components/riftspawner.lua:1](../source/scripts/components/riftspawner.lua) — text-lua

- [components/ruinsshadelingspawner.lua:1](../source/scripts/components/ruinsshadelingspawner.lua) — text-lua

- [components/schoolspawner.lua:1](../source/scripts/components/schoolspawner.lua) — text-lua

- [components/shadowcreaturespawner.lua:1](../source/scripts/components/shadowcreaturespawner.lua) — text-lua

- [components/shadowhandspawner.lua:1](../source/scripts/components/shadowhandspawner.lua) — text-lua

- [components/shard_daywalkerspawner.lua:1](../source/scripts/components/shard_daywalkerspawner.lua) — text-lua

- [components/sinkholespawner.lua:1](../source/scripts/components/sinkholespawner.lua) — text-lua

- [components/spawner.lua:1](../source/scripts/components/spawner.lua) — text-lua

- [components/squidspawner.lua:1](../source/scripts/components/squidspawner.lua) — text-lua

- [components/toadstoolspawner.lua:1](../source/scripts/components/toadstoolspawner.lua) — text-lua

- [components/wanderingtraderspawner.lua:1](../source/scripts/components/wanderingtraderspawner.lua) — text-lua

- [components/wintersurprisespawner.lua:1](../source/scripts/components/wintersurprisespawner.lua) — text-lua

- [components/worldmeteorshower.lua:1](../source/scripts/components/worldmeteorshower.lua) — text-lua

<!-- continuation-review-start -->

## Đọc tiếp lưu/tải và các consumer — 08/11/2026

- MeteorShower.OnSave version2 ghi mediumleft/largeleft, nhưng OnLoad trong nhánh interval~=nil chỉ đọc medium_remaining/large_remaining với fallback0. Với bảng do chính OnSave này trả về và không có bộ chuyển đổi chèn khóa, quota medium/large được phục hồi thành0 theo Lua. SpawnMeteor chỉ chọn hai cỡ đó nếu quota nil hoặc >=cost; khi cost dương, nhánh đó bị loại, vẫn có small và trường hợp rockmoonshell riêng.

- meteorspawner thực sự AddComponent meteorshower trong prefab. OnLoad dựng lại periodic interval và deadline từ remainingtime×max duration/cooldown; không gọi StartShower để gieo quota lại. Chưa tìm hay chứng minh một bước migration ngoài component có sửa các khóa, cũng chưa chạy snapshot để xác nhận số meteor thực. Đây là hệ quả điều kiện của đường source đã đọc.

[components/meteorshower.lua dòng 152–196](../source/scripts/components/meteorshower.lua) · [components/meteorshower.lua dòng 217–249](../source/scripts/components/meteorshower.lua) · [components/meteorshower.lua dòng 278–320](../source/scripts/components/meteorshower.lua) · [prefabs/meteorspawner.lua dòng 1–14](../source/scripts/prefabs/meteorspawner.lua)

[Phạm vi câu hỏi, suy luận và tìm kiếm](../evidence/deep-review-continuation-checks.json).

<!-- continuation-review-end -->
