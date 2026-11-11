# Nông trại, đất trồng và cây mùa vụ

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm nông trại, đất trồng và cây mùa vụ theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [components/compostingbin.lua:1](../source/scripts/components/compostingbin.lua) — text-lua

- [components/crop.lua:1](../source/scripts/components/crop.lua) — text-lua

- [components/farming_manager.lua:1](../source/scripts/components/farming_manager.lua) — text-lua

- [components/farmplantable.lua:1](../source/scripts/components/farmplantable.lua) — text-lua

- [components/farmplantstress.lua:1](../source/scripts/components/farmplantstress.lua) — text-lua

- [components/farmplanttendable.lua:1](../source/scripts/components/farmplanttendable.lua) — text-lua

- [components/farmsoildrinker.lua:1](../source/scripts/components/farmsoildrinker.lua) — text-lua

- [components/farmtiller.lua:1](../source/scripts/components/farmtiller.lua) — text-lua

- [components/grower.lua:1](../source/scripts/components/grower.lua) — text-lua

- [components/nutrients_visual_manager.lua:1](../source/scripts/components/nutrients_visual_manager.lua) — text-lua

- [prefabs/compost.lua:1](../source/scripts/prefabs/compost.lua) — text-lua

- [prefabs/compostingbin.lua:1](../source/scripts/prefabs/compostingbin.lua) — text-lua

- [prefabs/compostwrap.lua:1](../source/scripts/prefabs/compostwrap.lua) — text-lua

- [prefabs/farmplot.lua:1](../source/scripts/prefabs/farmplot.lua) — text-lua

- [prefabs/farm_decor.lua:1](../source/scripts/prefabs/farm_decor.lua) — text-lua

- [prefabs/farm_hoe.lua:1](../source/scripts/prefabs/farm_hoe.lua) — text-lua

- [prefabs/farm_plants.lua:1](../source/scripts/prefabs/farm_plants.lua) — text-lua

- [prefabs/farm_plant_defs.lua:1](../source/scripts/prefabs/farm_plant_defs.lua) — text-lua

- [prefabs/farm_plow.lua:1](../source/scripts/prefabs/farm_plow.lua) — text-lua

- [prefabs/farm_soil.lua:1](../source/scripts/prefabs/farm_soil.lua) — text-lua

- [prefabs/farm_soil_debris.lua:1](../source/scripts/prefabs/farm_soil_debris.lua) — text-lua

- [prefabs/soil_amender.lua:1](../source/scripts/prefabs/soil_amender.lua) — text-lua

## Đọc sâu mã nguồn — 08/11/2026

**Mức bằng chứng bổ sung — source-traced-partial.** Đã nối checkpoint stress, nước/đất dinh dưỡng, phần thưởng và save grid.

**Chốt stress mỗi giai đoạn.** FarmPlantStress khởi tạo mỗi category là stressed=true. MakeCheckpoint đếm category đang stressed, cộng stress_points rồi reset những category vừa tốt về stressed=true cho chặng sau. CalcFinalStressState chọn NONE nếu<=1, LOW nếu<=6, MODERATE nếu<=11, còn lại HIGH. Save giữ final_stress_state, stress_points, stressors và Load cập nhật theo các key hiện có. [components/farmplantstress.lua:17–79](../source/scripts/components/farmplantstress.lua) · [components/farmplantstress.lua:120–135](../source/scripts/components/farmplantstress.lua).

**Điều kiện cây.** Prefab farm_plants chốt killjoys, family, overcrowding, season, moisture, nutrients trước MakeCheckpoint. Family_min_count tính cả chính cây. Moisture so tỷ lệ thời gian đủ nước với plant_def.moisture.min_percent rồi Reset bộ đếm khi chốt. Nutrients gọi farming_manager.CycleNutrientsAtPoint với test_only=!apply. [prefabs/farm_plants.lua:173–258](../source/scripts/prefabs/farm_plants.lua) · [components/farmsoildrinker.lua:25–63](../source/scripts/components/farmsoildrinker.lua).

**Tài nguyên và thu hoạch.** CycleNutrients chỉ tiêu min(nutrients,count), đánh depleted nếu thiếu. Test_only trả trước khi thay đất. Phần dinh dưỡng thực tiêu được chia cho các loại restore và phần dư được phân ngẫu nhiên. SetupLoot cho cây thường stress NONE/LOW một product+hai seed, MODERATE một product+một seed, HIGH chỉ product; oversized và cây thối dùng nhánh riêng. [components/farming_manager.lua:400–454](../source/scripts/components/farming_manager.lua) · [prefabs/farm_plants.lua:344–382](../source/scripts/prefabs/farm_plants.lua).

**Save của đất.** FarmingManager lưu nutrientgrid, moisturegrid, weed queue và version bằng ZipAndEncodeSaveData. Load DecodeAndUnzip rồi chọn chuyển dữ liệu version1 hoặc loader version2, khởi động lại lịch weed nếu cần. Thời gian ướt/khô của từng cây được lưu như tổng elapsed và chênh thời gian bắt đầu. [components/farming_manager.lua:482–508](../source/scripts/components/farming_manager.lua) · [components/farming_manager.lua:545–568](../source/scripts/components/farming_manager.lua) · [components/farmsoildrinker.lua:51–63](../source/scripts/components/farmsoildrinker.lua).

**Phần còn phải kiểm tra trong nhóm này.**

- Chưa duyệt toàn bộ loại cây/weed và mọi stage callback, oversized weight/rot/seed variants.
- Cần kiểm tra riêng cập nhật grid theo mùa và toàn bộ nhánh migration tiledata version1/2 để phục hồi farm hoàn chỉnh.
