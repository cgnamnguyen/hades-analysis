# Cây kỹ năng, phép và năng lực sử dụng

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm cây kỹ năng, phép và năng lực sử dụng theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

- [skilltreedata.lua:1](../source/scripts/skilltreedata.lua) — text-lua

- [components/blinkstaff.lua:1](../source/scripts/components/blinkstaff.lua) — text-lua

- [components/book.lua:1](../source/scripts/components/book.lua) — text-lua

- [components/pocketwatch.lua:1](../source/scripts/components/pocketwatch.lua) — text-lua

- [components/pocketwatch_dismantler.lua:1](../source/scripts/components/pocketwatch_dismantler.lua) — text-lua

- [components/reader.lua:1](../source/scripts/components/reader.lua) — text-lua

- [components/simplebook.lua:1](../source/scripts/components/simplebook.lua) — text-lua

- [components/skilltreeupdater.lua:1](../source/scripts/components/skilltreeupdater.lua) — text-lua

- [components/spell.lua:1](../source/scripts/components/spell.lua) — text-lua

- [components/spellbook.lua:1](../source/scripts/components/spellbook.lua) — text-lua

- [components/spellbookcooldowns.lua:1](../source/scripts/components/spellbookcooldowns.lua) — text-lua

- [components/spellcaster.lua:1](../source/scripts/components/spellcaster.lua) — text-lua

- [components/summoningitem.lua:1](../source/scripts/components/summoningitem.lua) — text-lua

- [components/useableequippeditem.lua:1](../source/scripts/components/useableequippeditem.lua) — text-lua

- [components/useableitem.lua:1](../source/scripts/components/useableitem.lua) — text-lua

- [components/useabletargeteditem.lua:1](../source/scripts/components/useabletargeteditem.lua) — text-lua

- [prefabs/booklight.lua:1](../source/scripts/prefabs/booklight.lua) — text-lua

- [prefabs/books.lua:1](../source/scripts/prefabs/books.lua) — text-lua

- [prefabs/bookstation.lua:1](../source/scripts/prefabs/bookstation.lua) — text-lua

- [prefabs/books_lavaarena.lua:1](../source/scripts/prefabs/books_lavaarena.lua) — text-lua

- [prefabs/book_fx.lua:1](../source/scripts/prefabs/book_fx.lua) — text-lua

- [prefabs/book_web_ground.lua:1](../source/scripts/prefabs/book_web_ground.lua) — text-lua

- [prefabs/staff.lua:1](../source/scripts/prefabs/staff.lua) — text-lua

- [prefabs/staffcastfx.lua:1](../source/scripts/prefabs/staffcastfx.lua) — text-lua

- [prefabs/stafflight.lua:1](../source/scripts/prefabs/stafflight.lua) — text-lua

- [prefabs/staff_castinglight.lua:1](../source/scripts/prefabs/staff_castinglight.lua) — text-lua

- [prefabs/staff_lunarplant.lua:1](../source/scripts/prefabs/staff_lunarplant.lua) — text-lua

- [prefabs/staff_projectile.lua:1](../source/scripts/prefabs/staff_projectile.lua) — text-lua

- [prefabs/staff_tornado.lua:1](../source/scripts/prefabs/staff_tornado.lua) — text-lua

- [prefabs/wagstaff_items.lua:1](../source/scripts/prefabs/wagstaff_items.lua) — text-lua

- [prefabs/wagstaff_machinery.lua:1](../source/scripts/prefabs/wagstaff_machinery.lua) — text-lua

- [prefabs/wagstaff_npc.lua:1](../source/scripts/prefabs/wagstaff_npc.lua) — text-lua

- [prefabs/wagstaff_tools.lua:1](../source/scripts/prefabs/wagstaff_tools.lua) — text-lua

<!-- deep-review-characters-content:start -->

## Đọc sâu mã nguồn — 08/11/2026

Đã trace xác thực lựa chọn skill, gửi RPC, khôi phục blob và điều kiện dùng phép.

SkillTreeData.ActivateSkill kiểm tra skill hợp lệ, thử ghi vào bảng activatedskills rồi ValidateCharacterData. Nếu kiểm tra thất bại, nó hoàn tác skill vừa thêm và xóa bảng rỗng. DeactivateSkill cũng thử gỡ rồi khôi phục nếu trạng thái mới không hợp lệ. AddSkillXP clamp trong khoảng0..giới hạn TUNING và bản thường chỉ chấp nhận tăng XP. GetNamesFromSkillSelection giải bitfield theo rpc_id của nhân vật. [skilltreedata.lua dòng 98–181](../source/scripts/skilltreedata.lua)

SkillTreeUpdater chỉ chạy callback onactivate của server sau khi data layer báo updated. Host tự gọi cả client/server, dedicated hoặc người chơi remote gửi Client RPC, local client gửi Server RPC nếu lời gọi chưa đến từ RPC. silent khiến hàm dừng trước event/network, skip_validation được dùng ở những bước phục hồi có chủ ý. [components/skilltreeupdater.lua dòng 64–108](../source/scripts/components/skilltreeupdater.lua) · [components/skilltreeupdater.lua dòng 126–198](../source/scripts/components/skilltreeupdater.lua)

Save giữ skilltreeblob và prefab tương ứng. Load chỉ cất blob. SendFromSkillTreeBlob chấp nhận blob cùng prefab hoặc blob cũ không có prefab, decode rồi xóa cache, xác thực bằng XP hiện tại. XP đọc trong blob bị bỏ qua. Nếu hợp lệ, các skill được deactive khi silent rồi activate lại để callback và RPC chạy đúng. TransferComponent chuyển blob sang entity mới. [components/skilltreeupdater.lua dòng 212–282](../source/scripts/components/skilltreeupdater.lua)

SpellCaster.CanCast loại nếu thiếu spell hoặc người dùng thiếu tag theo spelltype. Cast ở điểm kiểm tra callback, ground/ocean, và GroundTargetBlocked. Cast lên target loại limbo, vô hình, dead không cho phép, flight hoặc nospellcasting, rồi kiểm tra loại target/workable/combat/PVP. CastSpell thực hiện callback phép trước onspellcast. Component không tự trừ sanity/uses cho mọi phép. [components/spellcaster.lua dòng 134–200](../source/scripts/components/spellcaster.lua)

Cooldown sổ phép dùng hash của spellname. Server tạo prefab spellbookcooldown hoặc restart một cooldown đang có, đặt classified target về chủ; Stop gọi Remove và listener onremove xóa khỏi bảng. Đăng ký trùng tên hoặc tên0 chỉ ghi chẩn đoán. Component giữ lookup trong phiên; prefab cooldown có persists=false như nhánh bổ sung bên dưới. [components/spellbookcooldowns.lua dòng 1–74](../source/scripts/components/spellbookcooldowns.lua)

**Phần còn hở.**

- Chưa giải hết cây kỹ năng từng nhân vật và tất cả spells trong books/staff/pocketwatch.
- Đã đọc prefab cooldown và xác nhận persists=false; cần trace các phép có consumer chủ động khôi phục cooldown và thứ tự RPC khi reconnect.

<!-- deep-review-characters-content:end -->

<!-- deep-followup-start -->

## Các nhánh được nối thêm trong đợt đọc

- Spellbookcooldown mã hóa độ dài thành floor(duration*10+0,5), clamp0..65535, và lượng còn lại thành byte0..180. Wall update trừ dt/(len/10); khi hết, master Remove entity. LongUpdate dùng cùng callback. Entity được đặt persists=false và spellbookcooldowns không có OnSave/OnLoad trong file đã đọc, nên hai module này không tự lưu cooldown qua world save. Việc consumer có khởi động lại cooldown sau tải cần xét từng phép.

- Trong lúc giảm tự nhiên, prefab có thể dùng set_local để dự đoán phần trăm; thay đổi do restart hoặc sync định kỳ dùng set. Register cooldown theo hash là lookup trong phiên, không phải bản ghi deadline đã lưu.

[prefabs/spellbookcooldown.lua dòng 1–125](../source/scripts/prefabs/spellbookcooldown.lua) · [components/spellbookcooldowns.lua dòng 1–87](../source/scripts/components/spellbookcooldowns.lua)

<!-- deep-followup-end -->

<!-- continuation-review-start -->

## Đọc tiếp lưu/tải và các consumer — 08/11/2026

- ACTIONS.TOGGLEWXSCREECH và TOGGLEWXSHIELDING có fn chỉ return true. Tác dụng thực do ActionHandler chọn state dựa tag. Bộ thu inherent action cho phép tắt ngay khi đang bật; khi bật mới, nó chặn cooldown, busy, inspectingupgrademodules và using_drone_remote. Do đó chỉ đọc fn của ACTIONS sẽ bỏ qua điều kiện và hiệu quả.

- WX screech tìm mục tiêu trong 12×số module, đòi _combat/_health, loại epic/limbo, cần hauntable.panicable, CanTarget và không Ally. Nó gọi Panic(8), đánh thức có trì hoãn và ForceUpdate brain. Vòng loop gọi lại sau 15×FRAMES+random; không skill thì timeout 2+random×10×FRAMES, có Gamma1 thì không đặt timeout trong pre. Ra loop chỉ đặt cooldown 20 nếu đã thực hiện ít nhất một pulse.

- WX shielding gắn damage-taken multiplier 0,2, mass 99999 nếu trước đó dương, thiefproof và taunt mỗi 2 giây trong radius16 với bộ lọc không player/companion/epic/notaunt. Cộng data.damage của các attacked event, đạt100 thì thoát; thiếu payload dùng50. Khi cleanup trả mass/gỡ modifiers/task và chỉ đặt cooldown20 nếu giữ>=5 giây hoặc từng vào shield_hit. State shield_hit quay idle sau4 frame.

- wx78_abilitycooldowns lưu bảng lookup trong phiên, prefab cooldown persists=false và hai module không có OnSave/OnLoad. Length mã hóa phần mười giây, pct byte180; OnWallUpdate nhân TheSim:GetTimeScale và LongUpdate dùng cùng hàm. Vì vậy không coi chúng là deadline save. Các consumer có thể tạo lại cooldown theo trạng thái riêng, phải xét từng consumer.

- Consumer shadow fuel bật overridefullcharge và dùng timer debuff, tạo lại chỉ báo shadow_energy khi Attached có duration hoặc Extended. Detached bỏ override, xóa cooldown và Remove buff. Prefab buff cũng persists=false. Callback Extended tính duration fallback cho timer nhưng vẫn truy data.duration khi dựng cooldown; đường caller truyền nil chưa được chứng minh. Không suy từ chỉ báo mạng rằng buff tồn tại qua world save.

[actions.lua dòng 6980–6996](../source/scripts/actions.lua) · [stategraphs/SGwilson.lua dòng 1718–1724](../source/scripts/stategraphs/SGwilson.lua) · [prefabs/wx78_common.lua dòng 138–163](../source/scripts/prefabs/wx78_common.lua) · [stategraphs/SGwx78_common.lua dòng 38–187](../source/scripts/stategraphs/SGwx78_common.lua) · [stategraphs/SGwx78_common.lua dòng 889–1124](../source/scripts/stategraphs/SGwx78_common.lua) · [tuning.lua dòng 9414–9427](../source/scripts/tuning.lua) · [components/wx78_abilitycooldowns.lua dòng 1–89](../source/scripts/components/wx78_abilitycooldowns.lua) · [prefabs/wx78_abilitycooldown.lua dòng 1–126](../source/scripts/prefabs/wx78_abilitycooldown.lua) · [prefabs/wx78_shadow_fuel_debuff.lua dòng 1–90](../source/scripts/prefabs/wx78_shadow_fuel_debuff.lua)

**Còn phải xác minh.** WX78 screech/shielding đã nối ACTION→state→cooldown; khôi phục phiên, điều kiện module bị tháo giữa state và nil payload ở shadow fuel Extended vẫn cần caller/runtime.

[Phạm vi câu hỏi, suy luận và tìm kiếm](../evidence/deep-review-continuation-checks.json).

<!-- continuation-review-end -->
