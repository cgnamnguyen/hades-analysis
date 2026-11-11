# Skin, trang phục, emote và quyền sở hữu

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm skin, trang phục, emote và quyền sở hữu theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [beefalo_clothing.lua:1](../source/scripts/beefalo_clothing.lua) — text-lua

- [clothing.lua:1](../source/scripts/clothing.lua) — text-lua

- [emoji_items.lua:1](../source/scripts/emoji_items.lua) — text-lua

- [emotes.lua:1](../source/scripts/emotes.lua) — text-lua

- [emote_items.lua:1](../source/scripts/emote_items.lua) — text-lua

- [entitlementlookups.lua:1](../source/scripts/entitlementlookups.lua) — text-lua

- [misc_items.lua:1](../source/scripts/misc_items.lua) — text-lua

- [prefabskin.lua:1](../source/scripts/prefabskin.lua) — text-lua

- [prefabskins.lua:1](../source/scripts/prefabskins.lua) — text-lua

- [prefabswaps.lua:1](../source/scripts/prefabswaps.lua) — text-lua

- [skinsfiltersutils.lua:1](../source/scripts/skinsfiltersutils.lua) — text-lua

- [skinstradeutils.lua:1](../source/scripts/skinstradeutils.lua) — text-lua

- [skinsutils.lua:1](../source/scripts/skinsutils.lua) — text-lua

- [skins_defs_data.lua:1](../source/scripts/skins_defs_data.lua) — text-lua

- [skin_affinity_info.lua:1](../source/scripts/skin_affinity_info.lua) — text-lua

- [skin_assets.lua:1](../source/scripts/skin_assets.lua) — text-lua

- [skin_gifts.lua:1](../source/scripts/skin_gifts.lua) — text-lua

- [skin_set_info.lua:1](../source/scripts/skin_set_info.lua) — text-lua

- [skin_strings.lua:1](../source/scripts/skin_strings.lua) — text-lua

- [upsell.lua:1](../source/scripts/upsell.lua) — text-lua

- [components/skinner.lua:1](../source/scripts/components/skinner.lua) — text-lua

- [components/skinner_beefalo.lua:1](../source/scripts/components/skinner_beefalo.lua) — text-lua

- [components/symbolswapdata.lua:1](../source/scripts/components/symbolswapdata.lua) — text-lua

- [components/wardrobe.lua:1](../source/scripts/components/wardrobe.lua) — text-lua

- [components/yotb_skinunlocker.lua:1](../source/scripts/components/yotb_skinunlocker.lua) — text-lua

<!-- deep-review-characters-content:start -->

## Đọc sâu mã nguồn — 08/11/2026

Đã trace phiên thay đồ, tự đóng UI và kiểm tra quyền sở hữu khi tải.

Wardrobe.CanBeginChanging loại khi disabled, đã có changer, thiếu SG, SG busy ngoại trừ opengift, đang cháy hoặc không shared mà có người dùng khác. BeginChanging đăng ký onremove/ms_closepopup và chuyển SG openwardrobe. EndChanging bỏ listeners, phát onskinschanged và đóng state nếu cần. OnUpdate đóng phiên khi người chơi ra khỏi range hoặc mất line of sight. [components/wardrobe.lua dòng 109–174](../source/scripts/components/wardrobe.lua) · [components/wardrobe.lua dòng 302–321](../source/scripts/components/wardrobe.lua)

ActivateChanging đòi bảng skins không rỗng, state openwardrobe và skinner. Với thay đồ bản thân, base không thuộc tập của nhân vật được đổi về prefab_none. Chỉ diff khác đồ hiện tại mới thực hiện. ApplySkins kiểm Prefabs đối với base, CLOTHING đối với từng slot; clear slot trước khi set món hợp lệ. Target dressing có callback riêng và AssignItemSkins với userid. [components/wardrobe.lua dòng 186–296](../source/scripts/components/wardrobe.lua)

Skinner.Save lưu skin_name, clothing, monkey_curse, skin_mode, copiedplayer_data và skinoverrides. Load snapshot khi chưa InGamePlay bỏ qua validation quyền sở hữu vì người dùng chưa đăng nhập. Trong gameplay có userid, từng clothing bị loại nếu TheInventory.CheckClientOwnership false. Base không còn sở hữu trở về prefab_none. NON_PLAYER có nhánh dựng khác. [components/skinner.lua dòng 803–864](../source/scripts/components/skinner.lua)

**Phần còn hở.**

- TheInventory.CheckClientOwnership là ranh giới inventory service/native. Chưa xác minh quyền sở hữu tài khoản hay giao dịch skin thực tế.
- Chưa trace toàn bộ skin override cho mỗi nhân vật, beefalo và YOTB unlocker.

<!-- deep-review-characters-content:end -->
