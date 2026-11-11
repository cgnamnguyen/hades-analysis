# Nấu ăn, nồi hầm và món chế biến

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm nấu ăn, nồi hầm và món chế biến theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [cookbookdata.lua:1](../source/scripts/cookbookdata.lua) — text-lua

- [cooking.lua:1](../source/scripts/cooking.lua) — text-lua

- [preparedfoods.lua:1](../source/scripts/preparedfoods.lua) — text-lua

- [preparedfoods_warly.lua:1](../source/scripts/preparedfoods_warly.lua) — text-lua

- [preparednonfoods.lua:1](../source/scripts/preparednonfoods.lua) — text-lua

- [spicedfoods.lua:1](../source/scripts/spicedfoods.lua) — text-lua

- [wintersfeastcookedfoods.lua:1](../source/scripts/wintersfeastcookedfoods.lua) — text-lua

- [components/cookable.lua:1](../source/scripts/components/cookable.lua) — text-lua

- [components/cookbookupdater.lua:1](../source/scripts/components/cookbookupdater.lua) — text-lua

- [components/cooker.lua:1](../source/scripts/components/cooker.lua) — text-lua

- [components/cookiecutterdrill.lua:1](../source/scripts/components/cookiecutterdrill.lua) — text-lua

- [components/stewer.lua:1](../source/scripts/components/stewer.lua) — text-lua

- [prefabs/cookpot.lua:1](../source/scripts/prefabs/cookpot.lua) — text-lua

- [prefabs/portablecookpot.lua:1](../source/scripts/prefabs/portablecookpot.lua) — text-lua

## Đọc sâu mã nguồn — 08/11/2026

**Mức bằng chứng bổ sung — source-traced-partial.** Đã nối chọn công thức theo priority/weight, tiêu nguyên liệu, hẹn hoàn tất và thu món.

**Chọn món.** GetCandidateRecipes chạy test(cooker,names,tags) của các công thức, sắp priority giảm dần và chỉ giữ nhóm priority cao nhất. CalculateRecipe mới quay theo tổng weight trong nhóm đó và trả tên/cooktime. Bởi vậy thay một nguyên liệu có thể đổi nhóm priority trước khi trọng số được dùng. [cooking.lua:217–288](../source/scripts/cooking.lua).

**Bắt đầu và độ tươi.** CanCook kiểm tra container đầy. StartCooking tự kiểm tra chưa có targettime/container, ghi ingredient_prefabs, chọn product và tính product_spoilage từ trung bình độ tươi nguyên liệu. keepspoilage giữ trung bình, nhánh thường dùng 1-(1-average)×0,5. Hẹn cooktime=BASE_COOK_TIME×recipeCooktime×cooktimemult, đóng container rồi DestroyContents và khóa mở. [components/stewer.lua:122–177](../source/scripts/components/stewer.lua).

**Thu và đầy túi.** Harvest chỉ khi done. Nó SpawnPrefab, áp stacksize của recipe và độ tươi còn lại, học cookbook khi đúng chef/category, rồi GiveItem nếu harvester có inventory hoặc LaunchAt khi không có. Sau đó xóa product, task/deadline/done/spoiltime và cho container mở lại. GiveItem có thể đi vào nhánh overflow/drop đã mô tả ở hệ túi đồ. [components/stewer.lua:276–330](../source/scripts/components/stewer.lua).

**Lưu/tải nồi.** Save ghi done, product, product_spoilage, spoiltime, chef/ingredients và remainingtime dương. Load dựng targettime=GetTime()+max(0,remainingtime), hủy task cũ và chọn task dospoil nếu done hoặc dostew nếu đang nấu. Nếu thiếu remainingtime mà product chưa spoiledproduct và có product_spoilage, nó hẹn dostew ở tick0. Khi có product, container được khóa lại. Vì thế save lưu trạng thái sản phẩm cùng thời gian, không giữ lại nguyên liệu đã tiêu. [components/stewer.lua:203–261](../source/scripts/components/stewer.lua).

**Phần còn phải kiểm tra trong nhóm này.**

- Chưa đánh giá tổ hợp nguyên liệu của mọi công thức và các mode/event pot riêng.
- StopCooking khi cháy và các callback reset/spoiledproduct của từng prefab còn cần đối chiếu riêng.
