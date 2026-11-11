# Đói, ăn uống và hiệu ứng đồ ăn

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm đói, ăn uống và hiệu ứng đồ ăn theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [components/eater.lua:1](../source/scripts/components/eater.lua) — text-lua

- [components/edible.lua:1](../source/scripts/components/edible.lua) — text-lua

- [components/foodaffinity.lua:1](../source/scripts/components/foodaffinity.lua) — text-lua

- [components/foodmemory.lua:1](../source/scripts/components/foodmemory.lua) — text-lua

- [components/hunger.lua:1](../source/scripts/components/hunger.lua) — text-lua

- [components/hunger_replica.lua:1](../source/scripts/components/hunger_replica.lua) — text-lua

- [components/wereeater.lua:1](../source/scripts/components/wereeater.lua) — text-lua

- [prefabs/meatrack2.lua:1](../source/scripts/prefabs/meatrack2.lua) — text-lua

- [prefabs/meats.lua:1](../source/scripts/prefabs/meats.lua) — text-lua

- [prefabs/veggies.lua:1](../source/scripts/prefabs/veggies.lua) — text-lua

## Đọc sâu mã nguồn — 08/11/2026

**Mức bằng chứng bổ sung — source-traced-partial.** Đã nối lượng ăn, memory/absorption, giảm đói theo thời gian và cơ chế tiêu thực phẩm.

**Điều kiện và lượng nhận khi ăn.** Eat chỉ thực hiện khi PrefersToEat đạt. Lượng health/hunger/sanity lấy từ edible rồi nhân foodmemory và absorption riêng. Nhánh eatwholestack còn nhân stack multiplier. Health/sanity âm phụ thuộc DoFoodEffects; custom_stats_mod_fn có quyền thay cả ba delta trước khi áp. [components/eater.lua:230–287](../source/scripts/components/eater.lua).

**Callback và tiêu thực phẩm.** Sau delta, Eat phát oneat, gọi oneatfn và Edible.OnEaten, rồi HandleEatRemove. Lasteattime được cập nhật. Foodmemory ghi nhớ tên món nếu item không có tag potion. Feed người khác còn phát feedincontainer/feedmount khi owner hoặc mount phù hợp. [components/eater.lua:290–318](../source/scripts/components/eater.lua).

**Đói và sát thương đói.** DoDec không làm việc khi IsPaused. Khi current>0, trừ hungerrate × dt × burnrate × burnratemodifiers. Chỉ nhánh bắt đầu tick với current<=0 mới gọi overridestarvefn hoặc Health.DoDelta(-hurtrate×dt). LongUpdate truyền ignore_damage=true nên cập nhật đói dài hạn không áp damage đói qua nhánh này. [components/hunger.lua:128–168](../source/scripts/components/hunger.lua).

**Lưu/tải.** Hunger chỉ ghi current khi chưa đầy. Load nhận data.hunger và gọi DoDelta(0) để cập nhật. Eater lưu time_since_eat rồi khôi phục lasteattime=GetTime()-time_since_eat. FoodMemory vẫn là record riêng nếu muốn giữ chu kỳ lặp món đầy đủ. [components/hunger.lua:177–185](../source/scripts/components/hunger.lua) · [components/eater.lua:71–83](../source/scripts/components/eater.lua).

**Phần còn phải kiểm tra trong nhóm này.**

- Chưa đọc hết từng loại FOODTYPE, spoiled processor, WereEater và giá trị dinh dưỡng theo nhân vật.
- Khả năng ăn do replica/action picker và consumption khi action bị hủy còn cần trace từng caller.
