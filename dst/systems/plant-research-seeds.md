# Hạt giống, phân bón và nghiên cứu thực vật

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm hạt giống, phân bón và nghiên cứu thực vật theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [plantregistrydata.lua:1](../source/scripts/plantregistrydata.lua) — text-lua

- [components/fertilizable.lua:1](../source/scripts/components/fertilizable.lua) — text-lua

- [components/fertilizer.lua:1](../source/scripts/components/fertilizer.lua) — text-lua

- [components/fertilizerresearchable.lua:1](../source/scripts/components/fertilizerresearchable.lua) — text-lua

- [components/plantable.lua:1](../source/scripts/components/plantable.lua) — text-lua

- [components/plantregistryupdater.lua:1](../source/scripts/components/plantregistryupdater.lua) — text-lua

- [components/plantresearchable.lua:1](../source/scripts/components/plantresearchable.lua) — text-lua

- [prefabs/seeds.lua:1](../source/scripts/prefabs/seeds.lua) — text-lua

## Đọc sâu mã nguồn — 08/11/2026

**Mức bằng chứng bổ sung — source-traced-partial.** Đã nối nghiên cứu giai đoạn cây tới registry, lưu profile và RPC, cùng tiêu phân bón.

**Khám phá cây.** PlantResearchable gọi researchinfofn để lấy plant/stage. LearnPlant chỉ phát learnplantstage khi có cả hai. IsRandomSeed là trường hợp không lấy được plant từ callback, nên không suy tên cây từ prefab seed chung. [components/plantresearchable.lua:1–29](../source/scripts/components/plantresearchable.lua).

**Cập nhật registry.** PlantRegistryUpdater.LearnPlantStage cập nhật registry và chỉ gửi RPC về userid khi có thay đổi cùng điều kiện dedicated hoặc master đang xử lý người khác. LearnPlantStage ở PlantRegistryData đánh dấu stages[stage]=true, cập nhật summary/card, gọi Save(true) khi save_enabled và CheckAchievement. LearnFertilizer có vòng tương tự. [components/plantregistryupdater.lua:1–48](../source/scripts/components/plantregistryupdater.lua) · [plantregistrydata.lua:248–307](../source/scripts/plantregistrydata.lua).

**Persistence của tri thức.** Registry.Save ghi plants/fertilizers/pictures/filters/last_selected_card bằng PersistentString tên plantregistry khi force hoặc save_enabled+dirty. Load đặt bảng rỗng trước, nhận dữ liệu bất đồng bộ rồi RunInSandboxSafeCatchInfiniteLoops và chỉ gán khi là table hợp lệ. Dữ liệu profile này tách khỏi stage thực của cây đang nằm trong thế giới. [plantregistrydata.lua:104–137](../source/scripts/plantregistrydata.lua).

**Tiêu phân bón.** Fertilizable.Fertilize ủy quyền cho callback onfertlizedfn của entity đích. Fertilizer.OnApplied dùng một finiteuse nếu có, gọi onappliedfn với final_use, chỉ khi final_use mới xóa một đơn vị stack hoặc entity. Nutrients mặc định ba số0, SetNutrients nhận table hoặc ba đối số. [components/fertilizable.lua:2–12](../source/scripts/components/fertilizable.lua) · [components/fertilizer.lua:2–48](../source/scripts/components/fertilizer.lua).

**Phần còn phải kiểm tra trong nhóm này.**

- Chưa đọc toàn bộ giải mã/merge tri thức online và ảnh oversized của registry.
- Chưa liệt kê mọi seed distribution, chance mọc weed và tác dụng từng fertilizer prefab.
