# Chế tạo, nghiên cứu và công thức

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm chế tạo, nghiên cứu và công thức theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [craftingmenuprofile.lua:1](../source/scripts/craftingmenuprofile.lua) — text-lua

- [crafting_sorting.lua:1](../source/scripts/crafting_sorting.lua) — text-lua

- [recipe.lua:1](../source/scripts/recipe.lua) — text-lua

- [recipes.lua:1](../source/scripts/recipes.lua) — text-lua

- [recipes_filter.lua:1](../source/scripts/recipes_filter.lua) — text-lua

- [techtree.lua:1](../source/scripts/techtree.lua) — text-lua

- [components/builder.lua:1](../source/scripts/components/builder.lua) — text-lua

- [components/builder_replica.lua:1](../source/scripts/components/builder_replica.lua) — text-lua

- [components/craftingstation.lua:1](../source/scripts/components/craftingstation.lua) — text-lua

- [components/prototyper.lua:1](../source/scripts/components/prototyper.lua) — text-lua

- [components/recipescanner.lua:1](../source/scripts/components/recipescanner.lua) — text-lua

- [components/recipestockpile.lua:1](../source/scripts/components/recipestockpile.lua) — text-lua

- [components/researchpointconverter.lua:1](../source/scripts/components/researchpointconverter.lua) — text-lua

- [widgets/crafting.lua:1](../source/scripts/widgets/crafting.lua) — text-lua

- [widgets/craftslot.lua:1](../source/scripts/widgets/craftslot.lua) — text-lua

- [widgets/craftslots.lua:1](../source/scripts/widgets/craftslots.lua) — text-lua

- [widgets/crafttabs.lua:1](../source/scripts/widgets/crafttabs.lua) — text-lua

## Đọc sâu mã nguồn — 08/11/2026

**Mức bằng chứng bổ sung — source-traced-partial.** Đã lần kiểm tra nguyên liệu, prototype, buffered build, sản phẩm và lưu công thức.

**Điều kiện tạo.** DoBuild yêu cầu recipe hợp lệ, có buffered build hoặc HasIngredients và skin được phép. Ngoài freebuild, có thể trả MOUNTED khi đặt cấu trúc lúc cưỡi, HASPET khi orphanage đã có pet hoặc thiếu petleash, hoặc dừng khi recipe manufactured không có prototyper phù hợp. Recipe.canbuild còn có quyền từ chối cùng reason. [components/builder.lua:657–690](../source/scripts/components/builder.lua).

**Tài nguyên và sản phẩm.** RemoveIngredients lấy từng đơn vị khỏi inventory kể cả container, làm rơi contents nếu chính nguyên liệu là container rồi Remove. Health/maxhealth/sanity cost là nhánh riêng. Sau SpawnPrefab thành công, item lấy độ ướt nguyên liệu, gọi onPreBuilt, tiêu nguyên liệu rồi tự equip nếu slot trống/hợp lệ hoặc GiveOrDropItem. Cấu trúc chỉ tiêu ở bước này nếu chưa buffered, sau đó đặt position/rotation và phát buildstructure/onbuilt. [components/builder.lua:546–590](../source/scripts/components/builder.lua) · [components/builder.lua:712–840](../source/scripts/components/builder.lua).

**Chế tạo sẵn.** BufferBuild yêu cầu inventory mở, recipe có placer, chưa buffered và đủ nguyên liệu. Mimic có thể chặn trước bước tiêu. Sau kiểm tra biết recipe/prototype và sử dụng temp bonus nếu cần, nó trừ nguyên liệu rồi đặt buffered_builds. DoBuild đã buffered xóa cờ trước các bước tạo sản phẩm tiếp theo. [components/builder.lua:1133–1185](../source/scripts/components/builder.lua) · [components/builder.lua:692–716](../source/scripts/components/builder.lua).

**Lưu/tải.** OnSave giữ buffered_builds, recipes, tempbonuses/temptechbonus_count và thời gian/vị trí hungrybuilder cần thiết. Load chỉ phục hồi recipe có IsRecipeValid, dựng lại thời gian tương đối và bonus tạm. Không tự mở mọi recipe có trong save. [components/builder.lua:80–126](../source/scripts/components/builder.lua).

**Phần còn phải kiểm tra trong nhóm này.**

- Chưa phân giải mọi recipe factory, override_numtogive_fn, manufactured station và callback sản phẩm.
- Đường kiểm tra trả nguyên liệu khi spawn hoặc callback thất bại cần trace theo từng recipe, không có giao dịch rollback chung trong các nhánh đã đọc.
