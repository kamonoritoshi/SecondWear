-- Sử dụng cơ sở dữ liệu SecondWearDB
USE SecondWearDB;

GO

-- Tắt kiểm tra ràng buộc khóa ngoại tạm thời để chèn dữ liệu không bị lỗi thứ tự
-- Trong môi trường phát triển, điều này có thể hữu ích nếu có vòng lặp ràng buộc hoặc dữ liệu có thứ tự phức tạp.
-- Tuy nhiên, trong script này, chúng ta đã sắp xếp thứ tự chèn để giảm thiểu nhu cầu này.
-- ALTER TABLE [Account] NOCHECK CONSTRAINT ALL;
-- ALTER TABLE [Product] NOCHECK CONSTRAINT ALL;
-- ALTER TABLE [Order] NOCHECK CONSTRAINT ALL;
-- ALTER TABLE [Payment] NOCHECK CONSTRAINT ALL;
-- ALTER TABLE [Shipping] NOCHECK CONSTRAINT ALL;
-- ALTER TABLE [Complaint] NOCHECK CONSTRAINT ALL;
-- ALTER TABLE [Resolution] NOCHECK CONSTRAINT ALL;
-- ALTER TABLE [Review] NOCHECK CONSTRAINT ALL;

-- Bắt đầu chèn dữ liệu -----------------------------------------------------------------------------------------

-- 1. Chèn dữ liệu mẫu cho bảng 'User' (100 người dùng)
-- user_id sẽ tự động tăng từ 1 đến 100
INSERT INTO [User] (name, email, phone, address) VALUES
(N'Nguyễn Văn Anh', N'nguyenvananh@gmail.com', N'0901234567', N'123 Đường Lý Thường Kiệt, Q.1, TP.HCM'),
(N'Trần Thị Hồng', N'tranthihong@gmail.com', N'0902345678', N'456 Đường Lê Lợi, Q. Bình Thạnh, TP.HCM'),
(N'Lê Văn Cường', N'levancuong@gmail.com', N'0903456789', N'789 Đường Hai Bà Trưng, Q. Hoàn Kiếm, Hà Nội'),
(N'Phạm Thị Nương', N'phamthinuong@gmail.com', N'0904567890', N'101 Đường Nguyễn Huệ, Q. Thốt Nốt, Cần Thơ'),
(N'Hoàng Văn Khoa', N'hoangvankhoa@gmail.com', N'0905678901', N'202 Đường Hùng Vương, Q. Hải Châu, Đà Nẵng'),
(N'Đặng Thị Mai', N'dangthimai@gmail.com', N'0906789012', N'303 Đường Trần Phú, P. Cái Khế, Cần Thơ'),
(N'Vũ Văn Nam', N'vuvannam@gmail.com', N'0907890123', N'404 Đường Nguyễn Tri Phương, Q. Thanh Khê, Đà Nẵng'),
(N'Bùi Thị Châu', N'buithichau@gmail.com', N'0908901234', N'505 Đường Đinh Tiên Hoàng, Q. Ba Đình, Hà Nội'),
(N'Ngô Văn Lương', N'ngovanluong@gmail.com', N'0909012345', N'606 Đường Phan Chu Trinh, Q. Tây Hồ, Hà Nội'),
(N'Dương Thị Đào', N'duongthidao@gmail.com', N'0910123456', N'707 Đường Nguyễn Đình Chiểu, Q.3, TP.HCM'),
(N'Trịnh Văn Luân', N'trinhvanluan@gmail.com', N'0911234567', N'808 Đường Cách Mạng Tháng Tám, Q.10, TP.HCM'),
(N'Đỗ Thị Mười', N'dothimuoi@gmail.com', N'0912345678', N'909 Đường Quang Trung, Q. Gò Vấp, TP.HCM'),
(N'Lý Văn Nghĩa', N'lyvannghia@gmail.com', N'0938728172', N'111 Đường Bà Triệu, Q. Hai Bà Trưng, Hà Nội'),
(N'Phan Thị Phương', N'phanthiphuong@gmail.com', N'0914567890', N'222 Đường Trần Hưng Đạo, Q. Sơn Trà, Đà Nẵng'),
(N'Tô Văn Quỳnh', N'tovanquynh@gmail.com', N'0915678901', N'333 Đường 3 Tháng 2, Q. Ninh Kiều, Cần Thơ'),
(N'Châu Thị Hoài', N'chauthihoai@gmail.com', N'0916789012', N'444 Đường Sư Vạn Hạnh, Q.10, TP.HCM'),
(N'Nguyễn Văn Sơn', N'nguyenvanson@gmail.com', N'0917890123', N'555 Đường Lạc Long Quân, Q. Tây Hồ, Hà Nội'),
(N'Trần Thị Tâm', N'tranthitam@gmail.com', N'0918901234', N'666 Đường Nguyễn Thị Minh Khai, Q.1, TP.HCM'),
(N'Lê Văn Luyện', N'levanluyen@gmail.com', N'0919012345', N'777 Đường Bạch Đằng, Q. Hoàn Kiếm, Hà Nội'),
(N'Phạm Thị Vượng', N'phamthivuong@gmail.com', N'0920123456', N'888 Đường Đồng Khởi, Q.1, TP.HCM'),
(N'Hoàng Văn Khiêm', N'hoangvankhiem@gmail.com', '0921234567', '999 Đường Cầu Giấy, Q. Cầu Giấy, Hà Nội'),
(N'Đặng Thị Như Anh', N'dangthinhuanh@gmail.com', '0922345678', '123 Đường Nam Kỳ Khởi Nghĩa, Q.3, TP.HCM'),
(N'Vũ Văn Đức', N'vuvanduc@gmail.com', '0923456789', '456 Đường Tràng Thi, Q. Hoàn Kiếm, Hà Nội'),
(N'Bùi Thị Hương', N'buithihuong@gmail.com', '0924567890', '789 Đường Trần Duy Hưng, Q. Cầu Giấy, Hà Nội'),
(N'Ngô Văn Hào', N'ngovanhao@gmail.com', '0925678901', '101 Đường Phan Kế Bính, Q. Ba Đình, Hà Nội'),
(N'Dương Thị Quế', N'duongthique@gmail.com', '0926789012', '202 Đường Hồ Tùng Mậu, Q. Cầu Giấy, Hà Nội'),
(N'Trịnh Văn Trung', N'trinhvantrung@gmail.com', '0927890123', '303 Đường Xã Đàn, Q. Đống Đa, Hà Nội'),
(N'Đỗ Thị Cúc', N'dothicuc@gmail.com', '0928901234', '404 Đường Láng Hạ, Q. Đống Đa, Hà Nội'),
(N'Lý Văn Trác', N'lyvantrac@gmail.com', '0929012345', '505 Đường Huỳnh Thúc Kháng, Q. Đống Đa, Hà Nội'),
(N'Phan Thị Nguyệt', N'phanthinguyet@gmail.com', '0930123456', '606 Đường Phạm Văn Đồng, Q. Bắc Từ Liêm, Hà Nội'),
(N'Tô Văn Lâm', N'tovanlam@gmail.com', '0931234567', '707 Đường Nguyễn Trãi, Q. Thanh Xuân, Hà Nội'),
(N'Châu Thị Nhàn', N'chauthinhan@gmail.com', '0932345678', '808 Đường Khuất Duy Tiến, Q. Thanh Xuân, Hà Nội'),
(N'Nguyễn Văn Phi', N'nguyenvanphi@gmail.com', '0933456789', '909 Đường Giải Phóng, Q. Hoàng Mai, Hà Nội'),
(N'Trần Thị Giang', N'tranthigiang@gmail.com', '0934567890', '111 Đường Minh Khai, Q. Hai Bà Trưng, Hà Nội'),
(N'Lê Văn Thái', N'levanthai@gmail.com', '0935678901', '222 Đường Đại Cồ Việt, Q. Hai Bà Trưng, Hà Nội'),
(N'Phạm Thị Linh', N'phamthilinh@gmail.com', '0936789012', '333 Đường Kim Mã, Q. Ba Đình, Hà Nội'),
(N'Hoàng Văn Hải', N'hoangvanhai@gmail.com', '0937890123', '444 Đường Nguyễn Thái Học, Q. Ba Đình, Hà Nội'),
(N'Đặng Thị Dung', N'dangthidung@gmail.com', '0938901234', '555 Đường Điện Biên Phủ, Q. Ba Đình, Hà Nội'),
(N'Vũ Văn Danh', N'vuvandanh@gmail.com', '0939012345', '666 Đường Hàng Gai, Q. Hoàn Kiếm, Hà Nội'),
(N'Bùi Thị Nương', N'buithinuong@gmail.com', '0940123456', '777 Đường Lý Thái Tổ, Q. Hoàn Kiếm, Hà Nội'),
(N'Ngô Văn Tài', N'ngovantai@gmail.com', '0941234567', '888 Đường Hàng Đào, Q. Hoàn Kiếm, Hà Nội'),
(N'Dương Thị Loan', N'duongthiloan@gmail.com', '0942345678', '999 Đường Tràng Tiền, Q. Hoàn Kiếm, Hà Nội'),
(N'Trịnh Văn Quyết', N'trinhvanquyet@gmail.com', '0943456789', '123 Đường Phan Đình Phùng, Q. Ba Đình, Hà Nội'),
(N'Đỗ Thị Hoa', N'dothihoa@gmail.com', '0944567890', '456 Đường Quán Thánh, Q. Ba Đình, Hà Nội'),
(N'Lý Văn Lộc', N'lyvanloc@gmail.com', '0945678901', '789 Đường Thụy Khuê, Q. Tây Hồ, Hà Nội'),
(N'Phan Thị Thảo', N'phanthithao@gmail.com', '0946789012', '101 Đường Hoàng Hoa Thám, Q. Ba Đình, Hà Nội'),
(N'Tô Văn Sơn', N'tovanson@gmail.com', '0947890123', '202 Đường Văn Cao, Q. Ba Đình, Hà Nội'),
(N'Châu Thị Thơ', N'chauthitho@gmail.com', '0948901234', '303 Đường Phạm Hùng, Q. Nam Từ Liêm, Hà Nội'),
(N'Nguyễn Văn Cảnh', N'nguyenvancanh@gmail.com', '0949012345', '404 Đường Trần Thái Tông, Q. Cầu Giấy, Hà Nội'),
(N'Trần Thị Thư', N'tranthithu@gmail.com', '0950123456', '505 Đường Duy Tân, Q. Cầu Giấy, Hà Nội'),
(N'Lê Văn Đức', N'levanduc@gmail.com', '0951234567', '606 Đường Thành Thái, Q.10, TP.HCM'),
(N'Phạm Thị Liên', N'phamthilien@gmail.com', '0952345678', '707 Đường Tô Hiến Thành, Q.10, TP.HCM'),
(N'Hoàng Văn Sỹ', N'hoangvansy@gmail.com', '0953456789', '808 Đường Sư Vạn Hạnh, Q.10, TP.HCM'),
(N'Đặng Thị Nhi', N'dangthinhi@gmail.com', '0954567890', '909 Đường Lý Thái Tổ, Q.3, TP.HCM'),
(N'Vũ Văn Dương', N'vuvanduong@gmail.com', '0955678901', '123 Đường Hai Bà Trưng, Q.3, TP.HCM'),
(N'Bùi Thị Thuý', N'buithithuy@gmail.com', '0956789012', '456 Đường Nam Kỳ Khởi Nghĩa, Q.3, TP.HCM'),
(N'Ngô Văn Phong', N'ngovanphong@gmail.com', '0957890123', '789 Đường Võ Thị Sáu, Q.3, TP.HCM'),
(N'Dương Thị Ân', N'duongthian@gmail.com', '0958901234', '101 Đường Nguyễn Thị Minh Khai, Q.1, TP.HCM'),
(N'Trịnh Văn Tuấn', N'trinhvantuan@gmail.com', '0959012345', '202 Đường Lê Duẩn, Q.1, TP.HCM'),
(N'Đỗ Thị Loan', N'dothiloan@gmail.com', '0960123456', '303 Đường Lê Lai, Q.1, TP.HCM'),
(N'Lý Văn Hào', N'lyvanhao@gmail.com', '0961234567', '404 Đường Phạm Ngũ Lão, Q.1, TP.HCM'),
(N'Phan Thị Hà', N'phanthiha@gmail.com', '0962345678', '505 Đường Bùi Viện, Q.1, TP.HCM'),
(N'Tô Văn Nhật', N'tovannhat@gmail.com', '0963456789', '606 Đường Trần Quang Khải, Q.1, TP.HCM'),
(N'Châu Thị Phương', N'chauthiphuong@gmail.com', '0964567890', '707 Đường Võ Văn Tần, Q.3, TP.HCM'),
(N'Nguyễn Văn Phú', N'nguyenvanphu@gmail.com', '0965678901', '808 Đường Nguyễn Thị Diệu, Q.3, TP.HCM'),
(N'Trần Thị Hoàn', N'tranthihoan@gmail.com', '0966789012', '909 Đường Ngô Thời Nhiệm, Q.3, TP.HCM'),
(N'Lê Văn Toản', N'levantoan@gmail.com', '0967890123', '111 Đường Trần Quốc Thảo, Q.3, TP.HCM'),
(N'Phạm Thị Vi', N'phamthivi@gmail.com', '0968901234', '222 Đường Nguyễn Văn Thủ, Q.1, TP.HCM'),
(N'Hoàng Văn Tân', N'hoangvantan@gmail.com', '0969012345', '333 Đường Nguyễn Bỉnh Khiêm, Q.1, TP.HCM'),
(N'Đặng Thị Mi', N'dangthimi@gmail.com', '0970123456', '444 Đường Nguyễn Đình Chiểu, Q.1, TP.HCM'),
(N'Vũ Văn Trí', N'vuvantri@gmail.com', '0971234567', '555 Đường Phạm Ngọc Thạch, Q.3, TP.HCM'),
(N'Bùi Thị Yến', N'buithiyen@gmail.com', '0972345678', '666 Đường Lê Quý Đôn, Q.3, TP.HCM'),
(N'Ngô Gia Kiệt', N'ngogiakiet@gmail.com', '0973456789', '777 Đường Pasteur, Q.3, TP.HCM'),
(N'Dương Thị Sương', N'duongthisuong@gmail.com', '0974567890', '888 Đường Nguyễn Đình Chính, Q. Phú Nhuận, TP.HCM'),
(N'Trịnh Văn Minh', N'trinhvanminh@gmail.com', '0975678901', '999 Đường Phan Đình Phùng, Q. Phú Nhuận, TP.HCM'),
(N'Đỗ Thị Vân', N'dothivan@gmail.com', '0976789012', '123 Đường Hoàng Văn Thụ, Q. Phú Nhuận, TP.HCM'),
(N'Lý Văn Tân', N'lyvantan@gmail.com', '0977890123', '456 Đường Nguyễn Kiệm, Q. Gò Vấp, TP.HCM'),
(N'Phan Thị Trang', N'phanthitrang@gmail.com', '0978901234', '789 Đường Phan Văn Trị, Q. Gò Vấp, TP.HCM'),
(N'Tô Văn Hải', N'tovanhai@gmail.com', '0979012345', '101 Đường Lê Quang Định, Q. Bình Thạnh, TP.HCM'),
(N'Châu Thị Khuê', N'chauthikhue@gmail.com', '0980123456', '202 Đường Nơ Trang Long, Q. Bình Thạnh, TP.HCM'),
(N'Nguyễn Văn Linh', N'nguyenvanlinh@gmail.com', '0981234567', '303 Đường Đinh Bộ Lĩnh, Q. Bình Thạnh, TP.HCM'),
(N'Trần Thị Thơ', N'tranthitho@gmail.com', '0982345678', '404 Đường Nguyễn Xí, Q. Bình Thạnh, TP.HCM'),
(N'Lê Văn Sơn', N'levanson@gmail.com', '0983456789', '505 Đường Ung Văn Khiêm, Q. Bình Thạnh, TP.HCM'),
(N'Phạm Thị My', N'phamthimy@gmail.com', '0984567890', '606 Đường Dân Chủ, Q. Thủ Đức, TP.HCM'),
(N'Hoàng Văn Hưng', N'hoangvanhung@gmail.com', '0985678901', '707 Đường Võ Văn Ngân, Q. Thủ Đức, TP.HCM'),
(N'Đặng Thị Xuân', N'dangthixuan@gmail.com', '0986789012', '808 Đường Kha Vạn Cân, Q. Thủ Đức, TP.HCM'),
(N'Vũ Văn Việt', N'vuvanviet@gmail.com', '0987890123', '909 Đường Quốc Lộ 13, Q. Thủ Đức, TP.HCM'),
(N'Bùi Thị Lợi', N'buithiloi@gmail.com', '0988901234', '111 Đường Đoàn Kết, Q. Thủ Đức, TP.HCM'),
(N'Ngô Văn Vương', N'ngovanvuong@gmail.com', '0989012345', '222 Đường Thống Nhất, Q. Gò Vấp, TP.HCM'),
(N'Dương Thị Mai', N'duongthimai@gmail.com', '0990123456', '333 Đường Nguyễn Oanh, Q. Gò Vấp, TP.HCM'),
(N'Trịnh Văn Dũng', N'trinhvandung@gmail.com', '0991234567', '444 Đường Phạm Văn Chiêu, Q. Gò Vấp, TP.HCM'),
(N'Đỗ Thị Lâm', N'dothilam@gmail.com', '0992345678', '555 Đường Lê Đức Thọ, Q. Gò Vấp, TP.HCM'),
(N'Lý Văn Minh', N'lyvanminh@gmail.com', '0993456789', '666 Đường Nguyễn Văn Lượng, Q. Gò Vấp, TP.HCM'),
(N'Phan Thị Tuyền', N'phanthituyen@gmail.com', '0994567890', '777 Đường Nguyễn Văn Khối, Q. Gò Vấp, TP.HCM'),
(N'Tô Văn Chiểu', N'tovanchieu@gmail.com', '0995678901', '888 Đường Cây Trâm, Q. Gò Vấp, TP.HCM'),
(N'Châu Thị Yến', N'chauthiyen@gmail.com', '0996789012', '999 Đường Quang Trung, Q. Gò Vấp, TP.HCM'),
(N'Nguyễn Văn Thanh', N'nguyenvanthanh@gmail.com', '0997890123', '123 Đường Trường Chinh, Q. Tân Bình, TP.HCM'),
(N'Trần Thị Vân', N'tranthivan@gmail.com', '0998901234', '456 Đường Cộng Hòa, Q. Tân Bình, TP.HCM'),
(N'Lê Văn Hoà', N'levanhoa@gmail.com', '0999012345', '789 Đường Hoàng Văn Thụ, Q. Tân Bình, TP.HCM'),
(N'Phạm Thị Quyên', N'phamthiquyen@gmail.com', '0910234567', '101 Đường Cách Mạng Tháng 8, Q. Tân Bình, TP.HCM'),
(N'Hoàng Văn Tuấn', N'hoangvantuan@gmail.com', '0911345678', '202 Đường Thành Thái, Q.10, TP.HCM'),
(N'Đặng Thị Bình', N'dangthibinh@gmail.com', '0912456789', '303 Đường 3 Tháng 2, Q.10, TP.HCM'),
(N'Vũ Văn Thành', N'vuvanthanh@gmail.com', '0913567890', '404 Đường Sư Vạn Hạnh, Q.10, TP.HCM'),
(N'Bùi Thị Thanh', N'buithithanh@gmail.com', '0914678901', '505 Đường Lý Thường Kiệt, Q.10, TP.HCM'),
(N'Ngô Văn Khanh', N'ngovankhanh@gmail.com', '0915789012', '606 Đường Bắc Hải, Q.10, TP.HCM'),
(N'Dương Thị Xuân', N'duongthixuan@gmail.com', '0916890123', '707 Đường Tô Hiến Thành, Q.10, TP.HCM'),
(N'Trịnh Văn Châu', N'trinhvanchau@gmail.com', '0917901234', '808 Đường Lê Duẩn, Q.1, TP.HCM');

GO

-- 2. Chèn dữ liệu mẫu cho bảng 'Account' (120 tài khoản: 50 seller, 70 customer)
-- role_id: 2 cho seller, 3 cho customer [1].
-- Các tài khoản seller (account_id 1-50) sẽ được gán cho user_id 1-50.
-- Các tài khoản customer (account_id 51-120) sẽ được gán cho user_id 1-20 (người dùng kiêm seller) và user_id 51-100 (người dùng chỉ là customer).
INSERT INTO [Account] (user_id, role_id, password, status) VALUES
-- 50 tài khoản Seller (user_id 1-50)
(1, 2, N'pass_seller_1', N'active'), (2, 2, N'pass_seller_2', N'active'),
(3, 2, N'pass_seller_3', N'active'), (4, 2, N'pass_seller_4', N'active'),
(5, 2, N'pass_seller_5', N'active'), (6, 2, N'pass_seller_6', N'active'),
(7, 2, N'pass_seller_7', N'active'), (8, 2, N'pass_seller_8', N'active'),
(9, 2, N'pass_seller_9', N'active'), (10, 2, N'pass_seller_10', N'active'),
(11, 2, N'pass_seller_11', N'active'), (12, 2, N'pass_seller_12', N'active'),
(13, 2, N'pass_seller_13', N'active'), (14, 2, N'pass_seller_14', N'active'),
(15, 2, N'pass_seller_15', N'active'), (16, 2, N'pass_seller_16', N'active'),
(17, 2, N'pass_seller_17', N'active'), (18, 2, N'pass_seller_18', N'active'),
(19, 2, N'pass_seller_19', N'active'), (20, 2, N'pass_seller_20', N'active'),
(21, 2, N'pass_seller_21', N'active'), (22, 2, N'pass_seller_22', N'active'),
(23, 2, N'pass_seller_23', N'active'), (24, 2, N'pass_seller_24', N'active'),
(25, 2, N'pass_seller_25', N'active'), (26, 2, N'pass_seller_26', N'active'),
(27, 2, N'pass_seller_27', N'active'), (28, 2, N'pass_seller_28', N'active'),
(29, 2, N'pass_seller_29', N'active'), (30, 2, N'pass_seller_30', N'active'),
(31, 2, N'pass_seller_31', N'active'), (32, 2, N'pass_seller_32', N'active'),
(33, 2, N'pass_seller_33', N'active'), (34, 2, N'pass_seller_34', N'active'),
(35, 2, N'pass_seller_35', N'active'), (36, 2, N'pass_seller_36', N'active'),
(37, 2, N'pass_seller_37', N'active'), (38, 2, N'pass_seller_38', N'active'),
(39, 2, N'pass_seller_39', N'active'), (40, 2, N'pass_seller_40', N'active'),
(41, 2, N'pass_seller_41', N'active'), (42, 2, N'pass_seller_42', N'active'),
(43, 2, N'pass_seller_43', N'active'), (44, 2, N'pass_seller_44', N'active'),
(45, 2, N'pass_seller_45', N'active'), (46, 2, N'pass_seller_46', N'active'),
(47, 2, N'pass_seller_47', N'active'), (48, 2, N'pass_seller_48', N'active'),
(49, 2, N'pass_seller_49', N'active'), (50, 2, N'pass_seller_50', N'active');

-- 70 tài khoản Customer (user_id 1-20 và user_id 51-100)
INSERT INTO [Account] (user_id, role_id, password, status) VALUES
(1, 3, N'pass_customer_1', N'active'), (2, 3, N'pass_customer_2', N'active'),
(3, 3, N'pass_customer_3', N'active'), (4, 3, N'pass_customer_4', N'active'),
(5, 3, N'pass_customer_5', N'active'), (6, 3, N'pass_customer_6', N'active'),
(7, 3, N'pass_customer_7', N'active'), (8, 3, N'pass_customer_8', N'active'),
(9, 3, N'pass_customer_9', N'active'), (10, 3, N'pass_customer_10', N'active'),
(11, 3, N'pass_customer_11', N'active'), (12, 3, N'pass_customer_12', N'active'),
(13, 3, N'pass_customer_13', N'active'), (14, 3, N'pass_customer_14', N'active'),
(15, 3, N'pass_customer_15', N'active'), (16, 3, N'pass_customer_16', N'active'),
(17, 3, N'pass_customer_17', N'active'), (18, 3, N'pass_customer_18', N'active'),
(19, 3, N'pass_customer_19', N'active'), (20, 3, N'pass_customer_20', N'active'),
(51, 3, N'pass_customer_51', N'active'), (52, 3, N'pass_customer_52', N'active'),
(53, 3, N'pass_customer_53', N'active'), (54, 3, N'pass_customer_54', N'active'),
(55, 3, N'pass_customer_55', N'active'), (56, 3, N'pass_customer_56', N'active'),
(57, 3, N'pass_customer_57', N'active'), (58, 3, N'pass_customer_58', N'active'),
(59, 3, N'pass_customer_59', N'active'), (60, 3, N'pass_customer_60', N'active'),
(61, 3, N'pass_customer_61', N'active'), (62, 3, N'pass_customer_62', N'active'),
(63, 3, N'pass_customer_63', N'active'), (64, 3, N'pass_customer_64', N'active'),
(65, 3, N'pass_customer_65', N'active'), (66, 3, N'pass_customer_66', N'active'),
(67, 3, N'pass_customer_67', N'active'), (68, 3, N'pass_customer_68', N'active'),
(69, 3, N'pass_customer_69', N'active'), (70, 3, N'pass_customer_70', N'active'),
(71, 3, N'pass_customer_71', N'active'), (72, 3, N'pass_customer_72', N'active'),
(73, 3, N'pass_customer_73', N'active'), (74, 3, N'pass_customer_74', N'active'),
(75, 3, N'pass_customer_75', N'active'), (76, 3, N'pass_customer_76', N'active'),
(77, 3, N'pass_customer_77', N'active'), (78, 3, N'pass_customer_78', N'active'),
(79, 3, N'pass_customer_79', N'active'), (80, 3, N'pass_customer_80', N'active'),
(81, 3, N'pass_customer_81', N'active'), (82, 3, N'pass_customer_82', N'active'),
(83, 3, N'pass_customer_83', N'active'), (84, 3, N'pass_customer_84', N'active'),
(85, 3, N'pass_customer_85', N'active'), (86, 3, N'pass_customer_86', N'active'),
(87, 3, N'pass_customer_87', N'active'), (88, 3, N'pass_customer_88', N'active'),
(89, 3, N'pass_customer_89', N'active'), (90, 3, N'pass_customer_90', N'active'),
(91, 3, N'pass_customer_91', N'active'), (92, 3, N'pass_customer_92', N'active'),
(93, 3, N'pass_customer_93', N'active'), (94, 3, N'pass_customer_94', N'active'),
(95, 3, N'pass_customer_95', N'active'), (96, 3, N'pass_customer_96', N'active'),
(97, 3, N'pass_customer_97', N'active'), (98, 3, N'pass_customer_98', N'active'),
(99, 3, N'pass_customer_99', N'active'), (100, 3, N'pass_customer_100', N'active');

GO

-- 3. Chèn dữ liệu mẫu cho bảng 'Product' (Tổng cộng 1000 sản phẩm, phân bổ cho 50 seller)
-- product_id sẽ tự động tăng từ 1 đến 1000.
-- account_id sẽ từ 1 đến 50 (là các tài khoản seller).
DECLARE @productNames TABLE (name NVARCHAR(255));
INSERT INTO @productNames (name) VALUES
(N'Áo thun cotton trắng'), (N'Quần jean skinny xanh'), (N'Váy hoa maxi lụa'),
(N'Áo sơ mi caro đỏ'), (N'Chân váy denim rách'), (N'Áo khoác dù đen'),
(N'Quần kaki ống rộng be'), (N'Đầm suông linen xám'), (N'Áo len cổ lọ họa tiết'),
(N'Quần short thể thao đen'), (N'Giày sneaker trắng'), (N'Túi xách da nâu'),
(N'Nón lưỡi trai xanh navy'), (N'Kính râm thời trang'), (N'Đồng hồ đeo tay'),
(N'Áo hoodie nỉ xám'), (N'Quần jogger thun'), (N'Đồ bơi một mảnh'),
(N'Bộ pyjama lụa'), (N'Áo polo nam xanh'),
(N'Áo blouse voan họa tiết'), (N'Quần tây công sở đen'), (N'Váy xòe midi vintage'),
(N'Áo khoác dạ dài nâu'), (N'Chân váy xếp ly lụa'), (N'Quần culottes trắng'),
(N'Đầm dự tiệc ren đen'), (N'Áo vest blazer xanh'), (N'Jumpsuit lụa satin'),
(N'Áo croptop dệt kim'), (N'Quần ống loe denim'), (N'Giày cao gót nude'),
(N'Khăn choàng cổ lụa'), (N'Balo du lịch vải canvas'), (N'Mũ bucket phong cách'),
(N'Kính cận gọng tròn'), (N'Dây chuyền bạc'), (N'Bông tai ngọc trai'),
(N'Vòng tay da unisex'), (N'Nịt bụng da cá sấu');

DECLARE @conditions TABLE (condition NVARCHAR(50));
INSERT INTO @conditions (condition) VALUES
(N'Mới 99%'), (N'Như mới'), (N'Tốt'), (N'Khá'), (N'Đã qua sử dụng'), (N'Hư nhẹ');

DECLARE @sizes TABLE (size NVARCHAR(20));
INSERT INTO @sizes (size) VALUES
(N'S'), (N'M'), (N'L'), (N'XL'), (N'XXL'), (N'Freesize');

DECLARE @colors TABLE (color NVARCHAR(50));
INSERT INTO @colors (color) VALUES
(N'Đen'), (N'Trắng'), (N'Xám'), (N'Xanh dương'), (N'Đỏ'), (N'Hồng'), (N'Vàng'), (N'Nâu'), (N'Xanh lá'), (N'Tím'), (N'Be'), (N'Cam');

DECLARE @productDescriptions TABLE (description NVARCHAR(MAX));
INSERT INTO @productDescriptions (description) VALUES
(N'Áo thun cơ bản, vải mềm mại, thấm hút mồ hôi tốt. Thích hợp mặc đi chơi, đi làm.'),
(N'Quần jean dáng ôm, chất liệu co giãn nhẹ, tôn dáng. Dễ phối đồ với áo thun, sơ mi.'),
(N'Váy maxi với họa tiết hoa nhí tinh tế, chất liệu lụa mềm bay bổng. Hoàn hảo cho mùa hè.'),
(N'Áo sơ mi vải cotton thoáng mát, họa tiết caro nổi bật. Phù hợp cho cả nam và nữ.'),
(N'Chân váy denim phong cách, có chi tiết rách nhẹ tạo điểm nhấn cá tính. Dễ dàng mix-match.'),
(N'Áo khoác dù chống nước nhẹ, giữ ấm tốt. Thiết kế đơn giản, năng động.'),
(N'Quần kaki ống rộng, thoải mái. Phù hợp cho phong cách casual, đi dạo phố.'),
(N'Đầm suông linen, chất liệu tự nhiên thoáng mát. Kiểu dáng thanh lịch, phù hợp nhiều dịp.'),
(N'Áo len cổ lọ với họa tiết độc đáo. Giúp giữ ấm trong những ngày se lạnh.'),
(N'Quần short thể thao co giãn, thoải mái khi vận động. Thích hợp tập gym, chạy bộ.'),
(N'Áo blouse chất liệu voan nhẹ nhàng, họa tiết in sắc nét. Thích hợp đi làm hoặc dạo phố.'),
(N'Quần tây form đứng, chất vải không nhăn, tạo vẻ ngoài lịch sự chuyên nghiệp.'),
(N'Váy midi dáng xòe, họa tiết vintage độc đáo. Dễ dàng kết hợp với áo kiểu hoặc áo thun.'),
(N'Áo khoác dạ dáng dài, ấm áp và sang trọng. Phù hợp cho mùa đông.'),
(N'Chân váy xếp ly bằng lụa mềm mại, tạo sự thanh thoát và nữ tính.'),
(N'Quần culottes dáng rộng, thoải mái, phong cách hiện đại. Dễ phối đồ.'),
(N'Đầm dự tiệc chất liệu ren cao cấp, thiết kế ôm sát tôn dáng. Phù hợp các sự kiện.'),
(N'Áo vest blazer lịch lãm, form chuẩn, dễ dàng kết hợp với quần âu hoặc váy.'),
(N'Jumpsuit lụa satin mềm mại, thiết kế sang trọng và thoải mái.'),
(N'Áo croptop dệt kim trẻ trung, phong cách năng động. Dễ dàng mix với quần jean cạp cao.');

DECLARE @currentSellerAccountID INT = 1; -- Bắt đầu từ account_id của seller đầu tiên
DECLARE @productInsertCount INT = 0;

WHILE @productInsertCount < 1000
BEGIN
    INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status)
    VALUES (
        @currentSellerAccountID,
        (SELECT TOP 1 name FROM @productNames ORDER BY NEWID()),
        N'https://secondwear.com/images/product/' + CAST(@productInsertCount + 1 AS NVARCHAR(10)) + '.jpg', -- Placeholder cho đường dẫn ảnh
        (SELECT TOP 1 description FROM @productDescriptions ORDER BY NEWID()),
        (SELECT TOP 1 condition FROM @conditions ORDER BY NEWID()),
        (SELECT TOP 1 size FROM @sizes ORDER BY NEWID()),
        (SELECT TOP 1 color FROM @colors ORDER BY NEWID()),
        ROUND(RAND() * (500000 - 50000) + 50000, -3), -- Giá từ 50,000 đến 500,000 VND [2, 3]
        N'Đang bán' -- Trạng thái sản phẩm [3]
    );

    SET @productInsertCount = @productInsertCount + 1;
    SET @currentSellerAccountID = @currentSellerAccountID + 1;
    IF @currentSellerAccountID > 50 -- Đảm bảo phân bổ đều cho 50 seller accounts (từ 1 đến 50)
    BEGIN
        SET @currentSellerAccountID = 1;
    END
END;

GO

-- 4. Chèn dữ liệu mẫu cho bảng 'Order' (20 đơn hàng)
-- order_id sẽ tự động tăng từ 1 đến 20.
-- account_id là các tài khoản customer (từ 51 đến 120).
-- product_id là các sản phẩm đã được chèn (từ 1 đến 1000).
INSERT INTO [Order] (account_id, product_id, status, order_date, total_amount) VALUES
(51, 1, N'Hoàn thành', DATEADD(day, -30, GETDATE()), 150000.00), -- user_id 1 (seller kiêm customer) mua product_id 1
(52, 5, N'Hoàn thành', DATEADD(day, -28, GETDATE()), 200000.00),
(53, 10, N'Đã giao', DATEADD(day, -25, GETDATE()), 120000.00),
(54, 15, N'Đang xử lý', DATEADD(day, -20, GETDATE()), 350000.00),
(55, 20, N'Hủy', DATEADD(day, -18, GETDATE()), 250000.00),
(56, 25, N'Hoàn thành', DATEADD(day, -15, GETDATE()), 180000.00),
(57, 30, N'Đã giao', DATEADD(day, -12, GETDATE()), 90000.00),
(58, 35, N'Đang xử lý', DATEADD(day, -10, GETDATE()), 400000.00),
(59, 40, N'Hoàn thành', DATEADD(day, -8, GETDATE()), 160000.00),
(60, 45, N'Đã giao', DATEADD(day, -7, GETDATE()), 110000.00),
(61, 50, N'Hoàn thành', DATEADD(day, -5, GETDATE()), 300000.00),
(62, 55, N'Đang xử lý', DATEADD(day, -4, GETDATE()), 220000.00),
(63, 60, N'Hủy', DATEADD(day, -3, GETDATE()), 100000.00),
(64, 65, N'Đã giao', DATEADD(day, -2, GETDATE()), 280000.00),
(65, 70, N'Hoàn thành', DATEADD(day, -1, GETDATE()), 130000.00),
(66, 75, N'Đang xử lý', GETDATE(), 190000.00),
(67, 80, N'Đã xác nhận', GETDATE(), 450000.00),
(68, 85, N'Đang xử lý', GETDATE(), 210000.00),
(69, 90, N'Hoàn thành', GETDATE(), 95000.00),
(70, 95, N'Đã giao', GETDATE(), 320000.00);

GO

-- 5. Chèn dữ liệu mẫu cho bảng 'Payment' (20 thanh toán tương ứng 20 đơn hàng)
-- payment_id sẽ tự động tăng từ 1 đến 20.
-- order_id sẽ từ 1 đến 20.
INSERT INTO [Payment] (order_id, method, status, payment_date, amount) VALUES
(1, N'Thanh toán khi nhận hàng (COD)', N'Đã thanh toán', DATEADD(day, -29, GETDATE()), 150000.00),
(2, N'Chuyển khoản ngân hàng', N'Đã thanh toán', DATEADD(day, -27, GETDATE()), 200000.00),
(3, N'Momo', N'Đã thanh toán', DATEADD(day, -24, GETDATE()), 120000.00),
(4, N'Thanh toán khi nhận hàng (COD)', N'Chờ thanh toán', DATEADD(day, -19, GETDATE()), 350000.00),
(5, N'Momo', N'Thất bại', DATEADD(day, -17, GETDATE()), 250000.00),
(6, N'Chuyển khoản ngân hàng', N'Đã thanh toán', DATEADD(day, -14, GETDATE()), 180000.00),
(7, N'Thanh toán khi nhận hàng (COD)', N'Đã thanh toán', DATEADD(day, -11, GETDATE()), 90000.00),
(8, N'Momo', N'Chờ thanh toán', DATEADD(day, -9, GETDATE()), 400000.00),
(9, N'Chuyển khoản ngân hàng', N'Đã thanh toán', DATEADD(day, -7, GETDATE()), 160000.00),
(10, N'Thanh toán khi nhận hàng (COD)', N'Đã thanh toán', DATEADD(day, -6, GETDATE()), 110000.00),
(11, N'Momo', N'Đã thanh toán', DATEADD(day, -4, GETDATE()), 300000.00),
(12, N'Chuyển khoản ngân hàng', N'Chờ thanh toán', DATEADD(day, -3, GETDATE()), 220000.00),
(13, N'Thanh toán khi nhận hàng (COD)', N'Thất bại', DATEADD(day, -2, GETDATE()), 100000.00),
(14, N'Momo', N'Đã thanh toán', DATEADD(day, -1, GETDATE()), 280000.00),
(15, N'Chuyển khoản ngân hàng', N'Đã thanh toán', GETDATE(), 130000.00),
(16, N'Thanh toán khi nhận hàng (COD)', N'Chờ thanh toán', GETDATE(), 190000.00),
(17, N'Momo', N'Đã thanh toán', GETDATE(), 450000.00),
(18, N'Chuyển khoản ngân hàng', N'Chờ thanh toán', GETDATE(), 210000.00),
(19, N'Thanh toán khi nhận hàng (COD)', N'Đã thanh toán', GETDATE(), 95000.00),
(20, N'Momo', N'Đã thanh toán', GETDATE(), 320000.00);

GO

-- 6. Chèn dữ liệu mẫu cho bảng 'Shipping' (20 vận chuyển tương ứng 20 đơn hàng)
-- shipping_id sẽ tự động tăng từ 1 đến 20.
-- order_id sẽ từ 1 đến 20.
INSERT INTO [Shipping] (order_id, carrier, status, shipping_date) VALUES
(1, N'Giao hàng nhanh', N'Đã giao', DATEADD(day, -28, GETDATE())),
(2, N'Giao hàng tiết kiệm', N'Đã giao', DATEADD(day, -26, GETDATE())),
(3, N'Viettel Post', N'Đã giao', DATEADD(day, -23, GETDATE())),
(4, N'Giao hàng nhanh', N'Đang vận chuyển', DATEADD(day, -19, GETDATE())),
(5, N'Viettel Post', N'Đã hủy', DATEADD(day, -17, GETDATE())),
(6, N'Giao hàng tiết kiệm', N'Đã giao', DATEADD(day, -13, GETDATE())),
(7, N'Giao hàng nhanh', N'Đã giao', DATEADD(day, -10, GETDATE())),
(8, N'Viettel Post', N'Đang vận chuyển', DATEADD(day, -8, GETDATE())),
(9, N'Giao hàng tiết kiệm', N'Đã giao', DATEADD(day, -6, GETDATE())),
(10, N'Giao hàng nhanh', N'Đã giao', DATEADD(day, -5, GETDATE())),
(11, N'Viettel Post', N'Đã giao', DATEADD(day, -3, GETDATE())),
(12, N'Giao hàng tiết kiệm', N'Đang vận chuyển', DATEADD(day, -2, GETDATE())),
(13, N'Giao hàng nhanh', N'Đã hủy', DATEADD(day, -1, GETDATE())),
(14, N'Viettel Post', N'Đã giao', GETDATE()),
(15, N'Giao hàng tiết kiệm', N'Đã giao', GETDATE()),
(16, N'Giao hàng nhanh', N'Đang đóng gói', GETDATE()),
(17, N'Viettel Post', N'Đang vận chuyển', GETDATE()),
(18, N'Giao hàng tiết kiệm', N'Đang đóng gói', GETDATE()),
(19, N'Giao hàng nhanh', N'Đã giao', GETDATE()),
(20, N'Viettel Post', N'Đang vận chuyển', GETDATE());

GO

-- 7. Chèn dữ liệu mẫu cho bảng 'Complaint' (30 khiếu nại)
-- complaint_id sẽ tự động tăng từ 1 đến 30.
-- account_id có thể là tài khoản customer (51-120) hoặc seller (1-50).
DECLARE @complaintDescriptions TABLE (description NVARCHAR(MAX));
INSERT INTO @complaintDescriptions (description) VALUES
(N'Sản phẩm không đúng mô tả, kích cỡ sai.'),
(N'Hàng bị lỗi rách nhỏ, không được kiểm tra kỹ.'),
(N'Thời gian giao hàng quá lâu, vượt quá cam kết.'),
(N'Thái độ phục vụ của người bán không tốt.'),
(N'Sản phẩm bị thất lạc trong quá trình vận chuyển.'),
(N'Màu sắc sản phẩm thực tế khác xa ảnh đăng.'),
(N'Thiếu phụ kiện đi kèm như đã mô tả.'),
(N'Giá sản phẩm bị thay đổi sau khi đặt hàng.'),
(N'Không nhận được hàng nhưng trạng thái báo đã giao.'),
(N'Đổi trả hàng gặp khó khăn, không được hỗ trợ.'),
(N'Chất liệu vải kém chất lượng, không như mong đợi.'),
(N'Sản phẩm có mùi lạ, không thể sử dụng được.'),
(N'Người bán không phản hồi tin nhắn.'),
(N'Thông tin liên hệ của người bán không chính xác.'),
(N'Giao nhầm sản phẩm, không phải sản phẩm đã đặt.');

DECLARE @complaintStatus TABLE (status NVARCHAR(50));
INSERT INTO @complaintStatus (status) VALUES
(N'Mới'), (N'Đang xử lý'), (N'Đã giải quyết'), (N'Đã đóng');

DECLARE @complaintIteration INT = 0;
WHILE @complaintIteration < 30
BEGIN
    INSERT INTO [Complaint] (account_id, description, status, complaint_date)
    VALUES (
        FLOOR(RAND() * (120 - 1 + 1)) + 1, -- Random account_id giữa 1 và 120 (bao gồm cả seller và customer) [4]
        (SELECT TOP 1 description FROM @complaintDescriptions ORDER BY NEWID()),
        (SELECT TOP 1 status FROM @complaintStatus ORDER BY NEWID()),
        DATEADD(day, -1 * FLOOR(RAND() * 60), GETDATE()) -- Ngày khiếu nại trong 60 ngày gần đây [4]
    );
    SET @complaintIteration = @complaintIteration + 1;
END;

GO

-- 8. Chèn dữ liệu mẫu cho bảng 'Resolution' (30 giải quyết khiếu nại tương ứng)
-- resolution_id sẽ tự động tăng từ 1 đến 30.
-- complaint_id sẽ từ 1 đến 30.
DECLARE @resolutionResults TABLE (result NVARCHAR(MAX));
INSERT INTO @resolutionResults (result) VALUES
(N'Đã hoàn tiền 50% giá trị sản phẩm.'),
(N'Đã gửi lại sản phẩm đúng kích cỡ.'),
(N'Đã làm việc với đơn vị vận chuyển để đẩy nhanh quá trình giao hàng.'),
(N'Đã nhắc nhở người bán về thái độ phục vụ.'),
(N'Đã xác nhận thất lạc và hoàn tiền toàn bộ.'),
(N'Đã yêu cầu người bán cập nhật ảnh thật của sản phẩm.'),
(N'Đã gửi bù phụ kiện bị thiếu.'),
(N'Đã điều chỉnh lại giá và hoàn trả chênh lệch.'),
(N'Đã xác minh và xử lý đơn hàng bị sai trạng thái.'),
(N'Đã hướng dẫn quy trình đổi trả hàng chi tiết.'),
(N'Đã yêu cầu người bán cải thiện chất lượng sản phẩm.'),
(N'Đã yêu cầu người bán vệ sinh sản phẩm trước khi gửi.'),
(N'Đã liên hệ người bán để phản hồi khách hàng.'),
(N'Đã cập nhật thông tin liên hệ cho người bán.'),
(N'Đã yêu cầu người bán gửi đúng sản phẩm.');

DECLARE @currentComplaintIdForResolution INT = 1;
WHILE @currentComplaintIdForResolution <= 30
BEGIN
    INSERT INTO [Resolution] (complaint_id, result, resolution_date)
    VALUES (
        @currentComplaintIdForResolution,
        (SELECT TOP 1 result FROM @resolutionResults ORDER BY NEWID()),
        -- Ngày giải quyết sau ngày khiếu nại 1-5 ngày [5]
        DATEADD(day, FLOOR(RAND() * 5) + 1, (SELECT complaint_date FROM Complaint WHERE complaint_id = @currentComplaintIdForResolution))
    );
    SET @currentComplaintIdForResolution = @currentComplaintIdForResolution + 1;
END;

GO

-- 9. Chèn dữ liệu mẫu cho bảng 'Review' (10 đánh giá sản phẩm)
-- review_id sẽ tự động tăng từ 1 đến 10.
-- product_id là từ 1 đến 1000.
-- account_id là các tài khoản customer (từ 51 đến 120).
DECLARE @reviewComments TABLE (comment NVARCHAR(MAX));
INSERT INTO @reviewComments (comment) VALUES
(N'Sản phẩm đẹp, chất lượng tốt. Giao hàng nhanh chóng.'),
(N'Rất ưng ý với sản phẩm, giá cả hợp lý.'),
(N'Áo rất xinh, đúng mô tả. Sẽ ủng hộ shop nữa.'),
(N'Giao hàng hơi chậm nhưng sản phẩm thì tuyệt vời.'),
(N'Chất liệu vải mềm mại, mặc rất thoải mái.'),
(N'Màu sắc chuẩn, form dáng đẹp. Highly recommend!'),
(N'Đóng gói cẩn thận, sản phẩm không có lỗi.'),
(N'Đánh giá cao sự tận tình của người bán.'),
(N'Hài lòng về chất lượng sản phẩm và dịch vụ.'),
(N'Phù hợp với giá tiền, sẽ mua thêm nếu có dịp.'),
(N'Sản phẩm tốt ngoài mong đợi!'),
(N'Chắc chắn sẽ mua lại từ shop này.'),
(N'Vải rất mát, mặc không bị bí.'),
(N'Giống như hình, không có gì để chê.'),
(N'Khá hài lòng, chỉ có điều gói hàng hơi sơ sài.');

DECLARE @reviewRatings TABLE (rating INT);
INSERT INTO @reviewRatings (rating) VALUES (3), (4), (5); -- Điểm đánh giá từ 3 đến 5 sao [6]

DECLARE @reviewIteration INT = 0;
WHILE @reviewIteration < 10
BEGIN
    INSERT INTO [Review] (product_id, account_id, rating, comment, review_date)
    VALUES (
        FLOOR(RAND() * 1000) + 1, -- product_id ngẫu nhiên từ 1 đến 1000 [7]
        FLOOR(RAND() * (120 - 51 + 1)) + 51, -- account_id ngẫu nhiên từ 51 đến 120 (các tài khoản customer) [7]
        (SELECT TOP 1 rating FROM @reviewRatings ORDER BY NEWID()),
        (SELECT TOP 1 comment FROM @reviewComments ORDER BY NEWID()),
        DATEADD(day, -1 * FLOOR(RAND() * 90), GETDATE()) -- Ngày đánh giá trong 90 ngày gần đây [7]
    );
    SET @reviewIteration = @reviewIteration + 1;
END;

GO

-- Bật lại kiểm tra ràng buộc khóa ngoại (nếu đã tắt ở trên)
-- ALTER TABLE [Account] CHECK CONSTRAINT ALL;
-- ALTER TABLE [Product] CHECK CONSTRAINT ALL;
-- ALTER TABLE [Order] CHECK CONSTRAINT ALL;
-- ALTER TABLE [Payment] CHECK CONSTRAINT ALL;
-- ALTER TABLE [Shipping] CHECK CONSTRAINT ALL;
-- ALTER TABLE [Complaint] CHECK CONSTRAINT ALL;
-- ALTER TABLE [Resolution] CHECK CONSTRAINT ALL;
-- ALTER TABLE [Review] CHECK CONSTRAINT ALL;

PRINT 'Dữ liệu mẫu cho SecondWearDB đã được chèn thành công.';