# Trao đổi, cửa hàng và quà

Phạm vi: APK người dùng cung cấp; phân tích tĩnh, không chạy APK hoặc Lua. Tên trong mã không chứng minh tính năng đang bật. Dòng nguồn tính từ 1; link mở file nguyên bản, số dòng nằm ở nhãn.


Mức bằng chứng: **source-traced-partial**.

Phân loại các module thuộc nhóm trao đổi, cửa hàng và quà theo inventory và đường dẫn. Một file có thể thuộc nhiều nhóm; sự hiện diện không chứng minh mọi tính năng hoặc mode đang được bật.

<!-- deep-review-world-ecology:start -->
## Đọc sâu mã nguồn — 08/11/2026

Trader phân biệt có thể giao dịch với muốn nhận vật và chỉ chuyển quyền sở hữu sau các kiểm tra.

Các luồng đã đối chiếu trực tiếp trong mã gói APK.

- AbleToAccept từ chối khi disabled, item nil hoặc itemmimic bị cấm. abletoaccepttest tùy biến được gọi trước các kiểm tra mặc định dead/sleeping/busy; sleeping/busy không chặn trader đang nằm trong inventory.

- AcceptGift chạy AbleToAccept rồi WantsToAccept. Nếu nhận, mặc định count=1; stack lớn hơn count thì Get(count), còn lại RemoveFromOwner(true). deleteitemonaccept xóa item; nếu trader có inventory thì GiveItem và xóa prevslot/prevcontainer trước. onaccept chạy sau chuyển/xóa vật, rồi phát trade và trả true.

- Nếu WantsToAccept false thì gọi onrefuse và trả false. Các lượng tiền/đồ trả lại thuộc onaccept của prefab hoặc trade_recipes, nên cấu trúc Trader không tự quy định một tỷ giá chung.

### Nguồn đối chiếu

- [components/trader.lua:104–164](../source/scripts/components/trader.lua).

### Phạm vi còn hở

- Pig King, Antlion, Wandering Trader, shop và giftreceiver có test/reward riêng cần tiếp tục trace consumer.

- Chưa thấy giao dịch rollback trong AcceptGift nếu callback lỗi sau khi item đã Remove; cần kiểm chứng ngoại lệ khi chạy và quyền chốt server.

<!-- deep-review-world-ecology:end -->

- [barterqueue.lua:1](../source/scripts/barterqueue.lua) — text-lua

- [trade_recipes.lua:1](../source/scripts/trade_recipes.lua) — text-lua

- [components/giftreceiver.lua:1](../source/scripts/components/giftreceiver.lua) — text-lua

- [components/moontrader.lua:1](../source/scripts/components/moontrader.lua) — text-lua

- [components/shop.lua:1](../source/scripts/components/shop.lua) — text-lua

- [components/tradable.lua:1](../source/scripts/components/tradable.lua) — text-lua

- [components/trader.lua:1](../source/scripts/components/trader.lua) — text-lua

- [prefabs/antlion.lua:1](../source/scripts/prefabs/antlion.lua) — text-lua

- [prefabs/pigking.lua:1](../source/scripts/prefabs/pigking.lua) — text-lua

- [prefabs/wanderingtrader.lua:1](../source/scripts/prefabs/wanderingtrader.lua) — text-lua
