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
(N'Hoàng Văn Khiêm', N'hoangvankhiem@gmail.com', N'0921234567', N'999 Đường Cầu Giấy, Q. Cầu Giấy, Hà Nội'),
(N'Đặng Thị Như Anh', N'dangthinhuanh@gmail.com', N'0922345678', N'123 Đường Nam Kỳ Khởi Nghĩa, Q.3, TP.HCM'),
(N'Vũ Văn Đức', N'vuvanduc@gmail.com', N'0923456789', N'456 Đường Tràng Thi, Q. Hoàn Kiếm, Hà Nội'),
(N'Bùi Thị Hương', N'buithihuong@gmail.com', N'0924567890', N'789 Đường Trần Duy Hưng, Q. Cầu Giấy, Hà Nội'),
(N'Ngô Văn Hào', N'ngovanhao@gmail.com', N'0925678901', N'101 Đường Phan Kế Bính, Q. Ba Đình, Hà Nội'),
(N'Dương Thị Quế', N'duongthique@gmail.com', N'0926789012', N'202 Đường Hồ Tùng Mậu, Q. Cầu Giấy, Hà Nội'),
(N'Trịnh Văn Trung', N'trinhvantrung@gmail.com', N'0927890123', N'303 Đường Xã Đàn, Q. Đống Đa, Hà Nội'),
(N'Đỗ Thị Cúc', N'dothicuc@gmail.com', N'0928901234', N'404 Đường Láng Hạ, Q. Đống Đa, Hà Nội'),
(N'Lý Văn Trác', N'lyvantrac@gmail.com', N'0929012345', N'505 Đường Huỳnh Thúc Kháng, Q. Đống Đa, Hà Nội'),
(N'Phan Thị Nguyệt', N'phanthinguyet@gmail.com', N'0930123456', N'606 Đường Phạm Văn Đồng, Q. Bắc Từ Liêm, Hà Nội'),
(N'Tô Văn Lâm', N'tovanlam@gmail.com', N'0931234567', N'707 Đường Nguyễn Trãi, Q. Thanh Xuân, Hà Nội'),
(N'Châu Thị Nhàn', N'chauthinhan@gmail.com', N'0932345678', N'808 Đường Khuất Duy Tiến, Q. Thanh Xuân, Hà Nội'),
(N'Nguyễn Văn Phi', N'nguyenvanphi@gmail.com', N'0933456789', N'909 Đường Giải Phóng, Q. Hoàng Mai, Hà Nội'),
(N'Trần Thị Giang', N'tranthigiang@gmail.com', N'0934567890', N'111 Đường Minh Khai, Q. Hai Bà Trưng, Hà Nội'),
(N'Lê Văn Thái', N'levanthai@gmail.com', N'0935678901', N'222 Đường Đại Cồ Việt, Q. Hai Bà Trưng, Hà Nội'),
(N'Phạm Thị Linh', N'phamthilinh@gmail.com', N'0936789012', N'333 Đường Kim Mã, Q. Ba Đình, Hà Nội'),
(N'Hoàng Văn Hải', N'hoangvanhai@gmail.com', N'0937890123', N'444 Đường Nguyễn Thái Học, Q. Ba Đình, Hà Nội'),
(N'Đặng Thị Dung', N'dangthidung@gmail.com', N'0938901234', N'555 Đường Điện Biên Phủ, Q. Ba Đình, Hà Nội'),
(N'Vũ Văn Danh', N'vuvandanh@gmail.com', N'0939012345', N'666 Đường Hàng Gai, Q. Hoàn Kiếm, Hà Nội'),
(N'Bùi Thị Nương', N'buithinuong@gmail.com', N'0940123456', N'777 Đường Lý Thái Tổ, Q. Hoàn Kiếm, Hà Nội'),
(N'Ngô Văn Tài', N'ngovantai@gmail.com', N'0941234567', N'888 Đường Hàng Đào, Q. Hoàn Kiếm, Hà Nội'),
(N'Dương Thị Loan', N'duongthiloan@gmail.com', N'0942345678', N'999 Đường Tràng Tiền, Q. Hoàn Kiếm, Hà Nội'),
(N'Trịnh Văn Quyết', N'trinhvanquyet@gmail.com', N'0943456789', N'123 Đường Phan Đình Phùng, Q. Ba Đình, Hà Nội'),
(N'Đỗ Thị Hoa', N'dothihoa@gmail.com', N'0944567890', N'456 Đường Quán Thánh, Q. Ba Đình, Hà Nội'),
(N'Lý Văn Lộc', N'lyvanloc@gmail.com', N'0945678901', N'789 Đường Thụy Khuê, Q. Tây Hồ, Hà Nội'),
(N'Phan Thị Thảo', N'phanthithao@gmail.com', N'0946789012', N'101 Đường Hoàng Hoa Thám, Q. Ba Đình, Hà Nội'),
(N'Tô Văn Sơn', N'tovanson@gmail.com', N'0947890123', N'202 Đường Văn Cao, Q. Ba Đình, Hà Nội'),
(N'Châu Thị Thơ', N'chauthitho@gmail.com', N'0948901234', N'303 Đường Phạm Hùng, Q. Nam Từ Liêm, Hà Nội'),
(N'Nguyễn Văn Cảnh', N'nguyenvancanh@gmail.com', N'0949012345', N'404 Đường Trần Thái Tông, Q. Cầu Giấy, Hà Nội'),
(N'Trần Thị Thư', N'tranthithu@gmail.com', N'0950123456', N'505 Đường Duy Tân, Q. Cầu Giấy, Hà Nội'),
(N'Lê Văn Đức', N'levanduc@gmail.com', N'0951234567', N'606 Đường Thành Thái, Q.10, TP.HCM'),
(N'Phạm Thị Liên', N'phamthilien@gmail.com', N'0952345678', N'707 Đường Tô Hiến Thành, Q.10, TP.HCM'),
(N'Hoàng Văn Sỹ', N'hoangvansy@gmail.com', N'0953456789', N'808 Đường Sư Vạn Hạnh, Q.10, TP.HCM'),
(N'Đặng Thị Nhi', N'dangthinhi@gmail.com', N'0954567890', N'909 Đường Lý Thái Tổ, Q.3, TP.HCM'),
(N'Vũ Văn Dương', N'vuvanduong@gmail.com', N'0955678901', N'123 Đường Hai Bà Trưng, Q.3, TP.HCM'),
(N'Bùi Thị Thuý', N'buithithuy@gmail.com', N'0956789012', N'456 Đường Nam Kỳ Khởi Nghĩa, Q.3, TP.HCM'),
(N'Ngô Văn Phong', N'ngovanphong@gmail.com', N'0957890123', N'789 Đường Võ Thị Sáu, Q.3, TP.HCM'),
(N'Dương Thị Ân', N'duongthian@gmail.com', N'0958901234', N'101 Đường Nguyễn Thị Minh Khai, Q.1, TP.HCM'),
(N'Trịnh Văn Tuấn', N'trinhvantuan@gmail.com', N'0959012345', N'202 Đường Lê Duẩn, Q.1, TP.HCM'),
(N'Đỗ Thị Loan', N'dothiloan@gmail.com', N'0960123456', N'303 Đường Lê Lai, Q.1, TP.HCM'),
(N'Lý Văn Hào', N'lyvanhao@gmail.com', N'0961234567', N'404 Đường Phạm Ngũ Lão, Q.1, TP.HCM'),
(N'Phan Thị Hà', N'phanthiha@gmail.com', N'0962345678', N'505 Đường Bùi Viện, Q.1, TP.HCM'),
(N'Tô Văn Nhật', N'tovannhat@gmail.com', N'0963456789', N'606 Đường Trần Quang Khải, Q.1, TP.HCM'),
(N'Châu Thị Phương', N'chauthiphuong@gmail.com', N'0964567890', N'707 Đường Võ Văn Tần, Q.3, TP.HCM'),
(N'Nguyễn Văn Phú', N'nguyenvanphu@gmail.com', N'0965678901', N'808 Đường Nguyễn Thị Diệu, Q.3, TP.HCM'),
(N'Trần Thị Hoàn', N'tranthihoan@gmail.com', N'0966789012', N'909 Đường Ngô Thời Nhiệm, Q.3, TP.HCM'),
(N'Lê Văn Toản', N'levantoan@gmail.com', N'0967890123', N'111 Đường Trần Quốc Thảo, Q.3, TP.HCM'),
(N'Phạm Thị Vi', N'phamthivi@gmail.com', N'0968901234', N'222 Đường Nguyễn Văn Thủ, Q.1, TP.HCM'),
(N'Hoàng Văn Tân', N'hoangvantan@gmail.com', N'0969012345', N'333 Đường Nguyễn Bỉnh Khiêm, Q.1, TP.HCM'),
(N'Đặng Thị Mi', N'dangthimi@gmail.com', N'0970123456', N'444 Đường Nguyễn Đình Chiểu, Q.1, TP.HCM'),
(N'Vũ Văn Trí', N'vuvantri@gmail.com', N'0971234567', N'555 Đường Phạm Ngọc Thạch, Q.3, TP.HCM'),
(N'Bùi Thị Yến', N'buithiyen@gmail.com', N'0972345678', N'666 Đường Lê Quý Đôn, Q.3, TP.HCM'),
(N'Ngô Gia Kiệt', N'ngogiakiet@gmail.com', N'0973456789', N'777 Đường Pasteur, Q.3, TP.HCM'),
(N'Dương Thị Sương', N'duongthisuong@gmail.com', N'0974567890', N'888 Đường Nguyễn Đình Chính, Q. Phú Nhuận, TP.HCM'),
(N'Trịnh Văn Minh', N'trinhvanminh@gmail.com', N'0975678901', N'999 Đường Phan Đình Phùng, Q. Phú Nhuận, TP.HCM'),
(N'Đỗ Thị Vân', N'dothivan@gmail.com', N'0976789012', N'123 Đường Hoàng Văn Thụ, Q. Phú Nhuận, TP.HCM'),
(N'Lý Văn Tân', N'lyvantan@gmail.com', N'0977890123', N'456 Đường Nguyễn Kiệm, Q. Gò Vấp, TP.HCM'),
(N'Phan Thị Trang', N'phanthitrang@gmail.com', N'0978901234', N'789 Đường Phan Văn Trị, Q. Gò Vấp, TP.HCM'),
(N'Tô Văn Hải', N'tovanhai@gmail.com', N'0979012345', N'101 Đường Lê Quang Định, Q. Bình Thạnh, TP.HCM'),
(N'Châu Thị Khuê', N'chauthikhue@gmail.com', N'0980123456', N'202 Đường Nơ Trang Long, Q. Bình Thạnh, TP.HCM'),
(N'Nguyễn Văn Linh', N'nguyenvanlinh@gmail.com', N'0981234567', N'303 Đường Đinh Bộ Lĩnh, Q. Bình Thạnh, TP.HCM'),
(N'Trần Thị Thơ', N'tranthitho@gmail.com', N'0982345678', N'404 Đường Nguyễn Xí, Q. Bình Thạnh, TP.HCM'),
(N'Lê Văn Sơn', N'levanson@gmail.com', N'0983456789', N'505 Đường Ung Văn Khiêm, Q. Bình Thạnh, TP.HCM'),
(N'Phạm Thị My', N'phamthimy@gmail.com', N'0984567890', N'606 Đường Dân Chủ, Q. Thủ Đức, TP.HCM'),
(N'Hoàng Văn Hưng', N'hoangvanhung@gmail.com', N'0985678901', N'707 Đường Võ Văn Ngân, Q. Thủ Đức, TP.HCM'),
(N'Đặng Thị Xuân', N'dangthixuan@gmail.com', N'0986789012', N'808 Đường Kha Vạn Cân, Q. Thủ Đức, TP.HCM'),
(N'Vũ Văn Việt', N'vuvanviet@gmail.com', N'0987890123', N'909 Đường Quốc Lộ 13, Q. Thủ Đức, TP.HCM'),
(N'Bùi Thị Lợi', N'buithiloi@gmail.com', N'0988901234', N'111 Đường Đoàn Kết, Q. Thủ Đức, TP.HCM'),
(N'Ngô Văn Vương', N'ngovanvuong@gmail.com', N'0989012345', N'222 Đường Thống Nhất, Q. Gò Vấp, TP.HCM'),
(N'Dương Thị Mai', N'duongthimai@gmail.com', N'0990123456', N'333 Đường Nguyễn Oanh, Q. Gò Vấp, TP.HCM'),
(N'Trịnh Văn Dũng', N'trinhvandung@gmail.com', N'0991234567', N'444 Đường Phạm Văn Chiêu, Q. Gò Vấp, TP.HCM'),
(N'Đỗ Thị Lâm', N'dothilam@gmail.com', N'0992345678', N'555 Đường Lê Đức Thọ, Q. Gò Vấp, TP.HCM'),
(N'Lý Văn Minh', N'lyvanminh@gmail.com', N'0993456789', N'666 Đường Nguyễn Văn Lượng, Q. Gò Vấp, TP.HCM'),
(N'Phan Thị Tuyền', N'phanthituyen@gmail.com', N'0994567890', N'777 Đường Nguyễn Văn Khối, Q. Gò Vấp, TP.HCM'),
(N'Tô Văn Chiểu', N'tovanchieu@gmail.com', N'0995678901', N'888 Đường Cây Trâm, Q. Gò Vấp, TP.HCM'),
(N'Châu Thị Yến', N'chauthiyen@gmail.com', N'0996789012', N'999 Đường Quang Trung, Q. Gò Vấp, TP.HCM'),
(N'Nguyễn Văn Thanh', N'nguyenvanthanh@gmail.com', N'0997890123', N'123 Đường Trường Chinh, Q. Tân Bình, TP.HCM'),
(N'Trần Thị Vân', N'tranthivan@gmail.com', N'0998901234', N'456 Đường Cộng Hòa, Q. Tân Bình, TP.HCM'),
(N'Lê Văn Hoà', N'levanhoa@gmail.com', N'0999012345', N'789 Đường Hoàng Văn Thụ, Q. Tân Bình, TP.HCM'),
(N'Phạm Thị Quyên', N'phamthiquyen@gmail.com', N'0910234567', N'101 Đường Cách Mạng Tháng 8, Q. Tân Bình, TP.HCM'),
(N'Hoàng Văn Tuấn', N'hoangvantuan@gmail.com', N'0911345678', N'202 Đường Thành Thái, Q.10, TP.HCM'),
(N'Đặng Thị Bình', N'dangthibinh@gmail.com', N'0912456789', N'303 Đường 3 Tháng 2, Q.10, TP.HCM'),
(N'Vũ Văn Thành', N'vuvanthanh@gmail.com', N'0913567890', N'404 Đường Sư Vạn Hạnh, Q.10, TP.HCM'),
(N'Bùi Thị Thanh', N'buithithanh@gmail.com', N'0914678901', N'505 Đường Lý Thường Kiệt, Q.10, TP.HCM'),
(N'Ngô Văn Khanh', N'ngovankhanh@gmail.com', N'0915789012', N'606 Đường Bắc Hải, Q.10, TP.HCM'),
(N'Dương Thị Xuân', N'duongthixuan@gmail.com', N'0916890123', N'707 Đường Tô Hiến Thành, Q.10, TP.HCM'),
(N'Trịnh Văn Châu', N'trinhvanchau@gmail.com', N'0917901234', N'808 Đường Lê Duẩn, Q.1, TP.HCM');

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
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(1, N'Áo thun cotton', N'https://secondwear.com/images/product/1.jpg', N'Áo thun cotton mềm mại, thoáng mát, phù hợp mọi dịp.', N'Như mới', N'L', N'Be', 202000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(2, N'Quần jean skinny', N'https://secondwear.com/images/product/2.jpg', N'Quần jean skinny ôm sát, tôn dáng, phong cách hiện đại.', N'Như mới', N'XXL', N'Đen', 74000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(3, N'Váy hoa maxi', N'https://secondwear.com/images/product/3.jpg', N'Váy hoa maxi dài nhẹ nhàng, nữ tính, lý tưởng cho mùa hè.', N'Mới 99%', N'XL', N'Đỏ', 262000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(4, N'Áo sơ mi caro', N'https://secondwear.com/images/product/4.jpg', N'Áo sơ mi caro trẻ trung, dễ phối đồ, phù hợp công sở.', N'Mới 99%', N'M', N'Vàng', 493000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(5, N'Chân váy denim rách', N'https://secondwear.com/images/product/5.jpg', N'Chân váy denim rách cá tính, năng động, hợp xu hướng.', N'Mới 99%', N'XXL', N'Xám', 467000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(6, N'Áo khoác dù', N'https://secondwear.com/images/product/6.jpg', N'Áo khoác dù chống thấm, gọn nhẹ, phù hợp ngày mưa.', N'Đã qua sử dụng', N'Freesize', N'Đen', 240000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(7, N'Quần kaki ống rộng', N'https://secondwear.com/images/product/7.jpg', N'Quần kaki ống rộng thoải mái, thanh lịch, dễ phối đồ.', N'Đã qua sử dụng', N'Freesize', N'Xám', 166000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(8, N'Đầm suông linen', N'https://secondwear.com/images/product/8.jpg', N'Đầm suông linen thoáng mát, đơn giản, phù hợp ngày hè.', N'Tốt', N'Freesize', N'Xanh lá', 366000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(9, N'Áo len cổ lọ họa tiết', N'https://secondwear.com/images/product/9.jpg', N'Áo len cổ lọ họa tiết ấm áp, thời trang, hợp mùa đông.', N'Khá', N'M', N'Trắng', 212000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(10, N'Quần short thể thao', N'https://secondwear.com/images/product/10.jpg', N'Quần short thể thao năng động, co giãn, lý tưởng tập luyện.', N'Như mới', N'M', N'Nâu', 315000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(11, N'Giày sneaker', N'https://secondwear.com/images/product/11.jpg', N'Giày sneaker thời trang, êm ái, phù hợp mọi phong cách.', N'Đã qua sử dụng', N'XXL', N'Vàng', 130000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(12, N'Túi xách da', N'https://secondwear.com/images/product/12.jpg', N'Túi xách da cao cấp, bền đẹp, phù hợp công sở và dạo phố.', N'Đã qua sử dụng', N'M', N'Tím', 131000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(13, N'Nón lưỡi trai', N'https://secondwear.com/images/product/13.jpg', N'Nón lưỡi trai trẻ trung, năng động, chống nắng hiệu quả.', N'Tốt', N'S', N'Hồng', 395000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(14, N'Kính râm thời trang', N'https://secondwear.com/images/product/14.jpg', N'Kính râm thời trang, bảo vệ mắt, nâng tầm phong cách.', N'Đã qua sử dụng', N'XL', N'Tím', 319000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(15, N'Đồng hồ đeo tay', N'https://secondwear.com/images/product/15.jpg', N'Đồng hồ đeo tay tinh tế, thanh lịch, phù hợp mọi dịp.', N'Hư nhẹ', N'M', N'Xanh lá', 370000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(16, N'Áo hoodie nỉ', N'https://secondwear.com/images/product/16.jpg', N'Áo hoodie nỉ ấm áp, thoải mái, phong cách đường phố.', N'Khá', N'L', N'Xanh dương', 457000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(17, N'Quần jogger thun', N'https://secondwear.com/images/product/17.jpg', N'Quần jogger thun co giãn, năng động, phù hợp casual.', N'Hư nhẹ', N'L', N'Xanh dương', 192000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(18, N'Đồ bơi một mảnh', N'https://secondwear.com/images/product/18.jpg', N'Đồ bơi một mảnh gợi cảm, ôm sát, phù hợp bãi biển.', N'Khá', N'L', N'Be', 355000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(19, N'Bộ pyjama lụa', N'https://secondwear.com/images/product/19.jpg', N'Bộ pyjama lụa mềm mại, sang trọng, thoải mái khi ngủ.', N'Tốt', N'XL', N'Xám', 489000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(20, N'Áo polo nam', N'https://secondwear.com/images/product/20.jpg', N'Áo polo nam lịch lãm, gọn gàng, phù hợp công sở.', N'Hư nhẹ', N'M', N'Hồng', 381000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(21, N'Áo thun cổ tròn', N'https://secondwear.com/images/product/21.jpg', N'Áo thun cổ tròn basic, dễ phối đồ, phù hợp mọi dáng.', N'Đã qua sử dụng', N'L', N'Hồng', 393000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(22, N'Quần tây ống suông', N'https://secondwear.com/images/product/22.jpg', N'Quần tây ống suông thanh lịch, chuyên nghiệp, lý tưởng công sở.', N'Tốt', N'XXL', N'Hồng', 146000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(23, N'Váy đầm công sở', N'https://secondwear.com/images/product/23.jpg', N'Váy đầm công sở trang nhã, tôn dáng, phù hợp văn phòng.', N'Khá', N'M', N'Đỏ', 251000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(24, N'Áo sơ mi lụa', N'https://secondwear.com/images/product/24.jpg', N'Áo sơ mi lụa mềm mại, sang trọng, phù hợp sự kiện.', N'Như mới', N'Freesize', N'Xám', 314000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(25, N'Chân váy xếp ly', N'https://secondwear.com/images/product/25.jpg', N'Chân váy xếp ly nhẹ nhàng, nữ tính, dễ phối đồ.', N'Hư nhẹ', N'S', N'Đen', 400000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(26, N'Áo khoác da', N'https://secondwear.com/images/product/26.jpg', N'Áo khoác da cá tính, thời thượng, hợp phong cách mùa đông.', N'Tốt', N'L', N'Nâu', 252000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(27, N'Quần culottes', N'https://secondwear.com/images/product/27.jpg', N'Quần culottes thoải mái, hiện đại, phù hợp dạo phố.', N'Khá', N'Freesize', N'Xám', 126000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(28, N'Đầm dạ hội', N'https://secondwear.com/images/product/28.jpg', N'Đầm dạ hội lộng lẫy, sang trọng, lý tưởng tiệc tối.', N'Mới 99%', N'XXL', N'Đen', 368000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(29, N'Áo len cardigan', N'https://secondwear.com/images/product/29.jpg', N'Áo len cardigan mỏng nhẹ, ấm áp, dễ phối nhiều phong cách.', N'Mới 99%', N'XXL', N'Trắng', 194000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(30, N'Quần short jeans', N'https://secondwear.com/images/product/30.jpg', N'Quần short jeans năng động, trẻ trung, hợp mùa hè.', N'Đã qua sử dụng', N'S', N'Xanh dương', 267000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(31, N'Giày cao gót', N'https://secondwear.com/images/product/31.jpg', N'Giày cao gót thanh lịch, tôn dáng, phù hợp sự kiện.', N'Hư nhẹ', N'XL', N'Đỏ', 424000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(32, N'Túi tote vải', N'https://secondwear.com/images/product/32.jpg', N'Túi tote vải đơn giản, tiện dụng, phù hợp đi làm, đi học.', N'Hư nhẹ', N'XXL', N'Nâu', 301000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(33, N'Mũ bucket', N'https://secondwear.com/images/product/33.jpg', N'Mũ bucket thời trang, năng động, hợp phong cách đường phố.', N'Tốt', N'XL', N'Vàng', 308000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(34, N'Kính mát gọng tròn', N'https://secondwear.com/images/product/34.jpg', N'Kính mát gọng tròn cổ điển, thời thượng, bảo vệ mắt.', N'Đã qua sử dụng', N'M', N'Cam', 235000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(35, N'Thắt lưng da', N'https://secondwear.com/images/product/35.jpg', N'Thắt lưng da bền đẹp, tinh tế, nâng tầm outfit.', N'Như mới', N'S', N'Xanh dương', 407000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(36, N'Áo hoodie oversize', N'https://secondwear.com/images/product/36.jpg', N'Áo hoodie oversize thoải mái, cá tính, phong cách Gen Z.', N'Đã qua sử dụng', N'S', N'Xanh dương', 312000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(37, N'Quần legging thể thao', N'https://secondwear.com/images/product/37.jpg', N'Quần legging thể thao co giãn, ôm sát, lý tưởng tập gym.', N'Tốt', N'S', N'Tím', 187000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(38, N'Đồ bơi bikini', N'https://secondwear.com/images/product/38.jpg', N'Đồ bơi bikini quyến rũ, thời trang, phù hợp bãi biển.', N'Đã qua sử dụng', N'Freesize', N'Be', 352000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(39, N'Bộ pyjama cotton', N'https://secondwear.com/images/product/39.jpg', N'Bộ pyjama cotton thoáng mát, nhẹ nhàng, lý tưởng nghỉ ngơi.', N'Tốt', N'M', N'Xám', 222000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(40, N'Áo polo nữ', N'https://secondwear.com/images/product/40.jpg', N'Áo polo nữ trẻ trung, năng động, phù hợp dạo phố.', N'Mới 99%', N'L', N'Tím', 278000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(41, N'Áo thun dài tay', N'https://secondwear.com/images/product/41.jpg', N'Áo thun dài tay mỏng nhẹ, thoải mái, phù hợp mùa thu.', N'Mới 99%', N'Freesize', N'Tím', 282000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(42, N'Quần jean boyfriend', N'https://secondwear.com/images/product/42.jpg', N'Quần jean boyfriend rộng rãi, cá tính, hợp phong cách casual.', N'Mới 99%', N'Freesize', N'Nâu', 241000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(43, N'Váy yếm denim', N'https://secondwear.com/images/product/43.jpg', N'Váy yếm denim năng động, trẻ trung, dễ phối đồ.', N'Đã qua sử dụng', N'L', N'Tím', 215000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(44, N'Áo sơ mi oversize', N'https://secondwear.com/images/product/44.jpg', N'Áo sơ mi oversize thoải mái, thời thượng, phù hợp dạo phố.', N'Tốt', N'XXL', N'Nâu', 463000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(45, N'Chân váy bút chì', N'https://secondwear.com/images/product/45.jpg', N'Chân váy bút chì ôm sát, thanh lịch, lý tưởng công sở.', N'Như mới', N'XL', N'Đen', 368000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(46, N'Áo khoác phao', N'https://secondwear.com/images/product/46.jpg', N'Áo khoác phao ấm áp, gọn nhẹ, phù hợp mùa đông lạnh.', N'Mới 99%', N'M', N'Trắng', 110000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(47, N'Quần ống loe', N'https://secondwear.com/images/product/47.jpg', N'Quần ống loe thời trang, thanh lịch, tôn dáng hiệu quả.', N'Hư nhẹ', N'XXL', N'Cam', 176000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(48, N'Đầm ôm bodycon', N'https://secondwear.com/images/product/48.jpg', N'Đầm ôm bodycon gợi cảm, sang trọng, lý tưởng tiệc tối.', N'Tốt', N'M', N'Đỏ', 205000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(49, N'Áo len cổ V', N'https://secondwear.com/images/product/49.jpg', N'Áo len cổ V nhẹ nhàng, thanh lịch, dễ phối đồ.', N'Khá', N'L', N'Tím', 71000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(50, N'Quần short kaki', N'https://secondwear.com/images/product/50.jpg', N'Quần short kaki thoải mái, trẻ trung, phù hợp mùa hè.', N'Tốt', N'S', N'Đỏ', 367000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(1, N'Giày sandal', N'https://secondwear.com/images/product/51.jpg', N'Giày sandal thoáng mát, thời trang, lý tưởng ngày hè.', N'Hư nhẹ', N'Freesize', N'Xám', 411000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(2, N'Túi đeo chéo', N'https://secondwear.com/images/product/52.jpg', N'Túi đeo chéo tiện dụng, nhỏ gọn, phù hợp dạo phố.', N'Như mới', N'XXL', N'Tím', 252000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(3, N'Mũ beret len', N'https://secondwear.com/images/product/53.jpg', N'Mũ beret len thanh lịch, nữ tính, hợp phong cách mùa thu.', N'Đã qua sử dụng', N'M', N'Cam', 80000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(4, N'Kính mát mắt mèo', N'https://secondwear.com/images/product/54.jpg', N'Kính mát mắt mèo thời thượng, cá tính, bảo vệ mắt.', N'Mới 99%', N'S', N'Vàng', 303000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(5, N'Vòng tay bạc', N'https://secondwear.com/images/product/55.jpg', N'Vòng tay bạc tinh tế, sang trọng, phù hợp mọi outfit.', N'Hư nhẹ', N'XXL', N'Hồng', 284000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(6, N'Áo hoodie crop top', N'https://secondwear.com/images/product/56.jpg', N'Áo hoodie crop top trẻ trung, năng động, hợp phong cách Gen Z.', N'Khá', N'M', N'Vàng', 378000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(7, N'Quần jogger kaki', N'https://secondwear.com/images/product/57.jpg', N'Quần jogger kaki thoải mái, thanh lịch, dễ phối đồ.', N'Khá', N'Freesize', N'Vàng', 294000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(8, N'Đồ bơi cao cấp', N'https://secondwear.com/images/product/58.jpg', N'Đồ bơi cao cấp gợi cảm, thời trang, lý tưởng du lịch biển.', N'Hư nhẹ', N'M', N'Vàng', 221000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(9, N'Bộ ngủ lụa cao cấp', N'https://secondwear.com/images/product/59.jpg', N'Bộ ngủ lụa cao cấp mềm mại, sang trọng, thoải mái khi ngủ.', N'Hư nhẹ', N'S', N'Xanh dương', 197000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(10, N'Áo thun in họa tiết', N'https://secondwear.com/images/product/60.jpg', N'Áo thun in họa tiết cá tính, trẻ trung, phù hợp dạo phố.', N'Tốt', N'L', N'Vàng', 203000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(11, N'Quần tây công sở', N'https://secondwear.com/images/product/61.jpg', N'Quần tây công sở thanh lịch, chuyên nghiệp, lý tưởng văn phòng.', N'Khá', N'XL', N'Vàng', 289000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(12, N'Váy maxi lụa', N'https://secondwear.com/images/product/62.jpg', N'Váy maxi lụa nhẹ nhàng, sang trọng, phù hợp sự kiện.', N'Khá', N'M', N'Cam', 472000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(13, N'Áo sơ mi trắng', N'https://secondwear.com/images/product/63.jpg', N'Áo sơ mi trắng tinh khôi, thanh lịch, phù hợp mọi dịp.', N'Khá', N'L', N'Vàng', 104000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(14, N'Chân váy hoa nhí', N'https://secondwear.com/images/product/64.jpg', N'Chân váy hoa nhí nữ tính, nhẹ nhàng, lý tưởng mùa hè.', N'Mới 99%', N'S', N'Xanh lá', 390000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(15, N'Áo khoác bomber', N'https://secondwear.com/images/product/65.jpg', N'Áo khoác bomber năng động, cá tính, hợp phong cách đường phố.', N'Đã qua sử dụng', N'XL', N'Xanh dương', 227000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(16, N'Quần palazzo', N'https://secondwear.com/images/product/66.jpg', N'Quần palazzo rộng rãi, thanh lịch, tôn dáng hiệu quả.', N'Mới 99%', N'M', N'Vàng', 119000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(17, N'Đầm ren trắng', N'https://secondwear.com/images/product/67.jpg', N'Đầm ren trắng tinh tế, sang trọng, lý tưởng tiệc cưới.', N'Khá', N'S', N'Tím', 57000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(18, N'Áo len mỏng', N'https://secondwear.com/images/product/68.jpg', N'Áo len mỏng nhẹ nhàng, thoải mái, phù hợp mùa thu.', N'Hư nhẹ', N'S', N'Tím', 123000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(19, N'Quần short lụa', N'https://secondwear.com/images/product/69.jpg', N'Quần short lụa mềm mại, sang trọng, phù hợp dạo phố.', N'Như mới', N'Freesize', N'Xanh lá', 121000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(20, N'Giày bốt cổ thấp', N'https://secondwear.com/images/product/70.jpg', N'Giày bốt cổ thấp thời trang, bền đẹp, hợp mùa đông.', N'Đã qua sử dụng', N'XL', N'Trắng', 97000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(21, N'Túi clutch da', N'https://secondwear.com/images/product/71.jpg', N'Túi clutch da sang trọng, nhỏ gọn, lý tưởng tiệc tối.', N'Đã qua sử dụng', N'S', N'Hồng', 425000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(22, N'Nón snapback', N'https://secondwear.com/images/product/72.jpg', N'Nón snapback trẻ trung, năng động, hợp phong cách streetwear.', N'Đã qua sử dụng', N'M', N'Cam', 346000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(23, N'Kính gọng vuông', N'https://secondwear.com/images/product/73.jpg', N'Kính gọng vuông thời thượng, cá tính, bảo vệ mắt.', N'Như mới', N'XXL', N'Xám', 269000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(24, N'Dây nịt bản nhỏ', N'https://secondwear.com/images/product/74.jpg', N'Dây nịt bản nhỏ tinh tế, thanh lịch, nâng tầm outfit.', N'Tốt', N'M', N'Cam', 136000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(25, N'Áo hoodie dài', N'https://secondwear.com/images/product/75.jpg', N'Áo hoodie dài ấm áp, thoải mái, phù hợp mùa đông.', N'Khá', N'XXL', N'Vàng', 226000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(26, N'Quần legging da', N'https://secondwear.com/images/product/76.jpg', N'Quần legging da cá tính, thời trang, hợp phong cách dạo phố.', N'Tốt', N'S', N'Trắng', 189000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(27, N'Đồ bơi cut-out', N'https://secondwear.com/images/product/77.jpg', N'Đồ bơi cut-out gợi cảm, hiện đại, lý tưởng bãi biển.', N'Mới 99%', N'S', N'Đen', 302000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(28, N'Bộ pyjama họa tiết', N'https://secondwear.com/images/product/78.jpg', N'Bộ pyjama họa tiết vui nhộn, thoải mái, lý tưởng nghỉ ngơi.', N'Khá', N'M', N'Nâu', 390000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(29, N'Áo polo cổ bẻ', N'https://secondwear.com/images/product/79.jpg', N'Áo polo cổ bẻ thanh lịch, trẻ trung, phù hợp công sở.', N'Tốt', N'XXL', N'Be', 141000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(30, N'Áo thun crop top', N'https://secondwear.com/images/product/80.jpg', N'Áo thun crop top trẻ trung, năng động, hợp mùa hè.', N'Khá', N'XXL', N'Nâu', 347000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(31, N'Quần jean ống đứng', N'https://secondwear.com/images/product/81.jpg', N'Quần jean ống đứng thoải mái, thời trang, dễ phối đồ.', N'Như mới', N'S', N'Xanh dương', 264000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(32, N'Váy đầm trễ vai', N'https://secondwear.com/images/product/82.jpg', N'Váy đầm trễ vai nữ tính, quyến rũ, lý tưởng tiệc tối.', N'Đã qua sử dụng', N'XL', N'Cam', 301000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(33, N'Áo sơ mi denim', N'https://secondwear.com/images/product/83.jpg', N'Áo sơ mi denim năng động, cá tính, phù hợp dạo phố.', N'Mới 99%', N'XXL', N'Đỏ', 90000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(34, N'Chân váy da', N'https://secondwear.com/images/product/84.jpg', N'Chân váy da sang trọng, thời thượng, hợp phong cách công sở.', N'Khá', N'L', N'Xanh lá', 117000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(35, N'Áo khoác trench coat', N'https://secondwear.com/images/product/85.jpg', N'Áo khoác trench coat thanh lịch, cổ điển, phù hợp mùa thu.', N'Mới 99%', N'XXL', N'Trắng', 478000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(36, N'Quần ống culottes', N'https://secondwear.com/images/product/86.jpg', N'Quần ống culottes thời trang, thoải mái, dễ phối đồ.', N'Như mới', N'Freesize', N'Xám', 487000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(37, N'Đầm tiểu thư', N'https://secondwear.com/images/product/87.jpg', N'Đầm tiểu thư nhẹ nhàng, nữ tính, lý tưởng dạ tiệc.', N'Khá', N'M', N'Hồng', 274000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(38, N'Áo len oversize', N'https://secondwear.com/images/product/88.jpg', N'Áo len oversize thoải mái, ấm áp, hợp phong cách casual.', N'Đã qua sử dụng', N'L', N'Đen', 388000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(39, N'Quần short vải thô', N'https://secondwear.com/images/product/89.jpg', N'Quần short vải thô thoáng mát, trẻ trung, phù hợp mùa hè.', N'Như mới', N'XXL', N'Be', 325000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(40, N'Giày slip-on', N'https://secondwear.com/images/product/90.jpg', N'Giày slip-on tiện dụng, thời trang, phù hợp dạo phố.', N'Tốt', N'L', N'Đen', 184000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(41, N'Túi xách tote da', N'https://secondwear.com/images/product/91.jpg', N'Túi xách tote da cao cấp, bền đẹp, lý tưởng công sở.', N'Khá', N'Freesize', N'Đỏ', 159000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(42, N'Mũ len beanie', N'https://secondwear.com/images/product/92.jpg', N'Mũ len beanie ấm áp, thời trang, hợp mùa đông.', N'Đã qua sử dụng', N'M', N'Tím', 353000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(43, N'Kính mát gọng kim loại', N'https://secondwear.com/images/product/93.jpg', N'Kính mát gọng kim loại tinh tế, hiện đại, bảo vệ mắt.', N'Đã qua sử dụng', N'Freesize', N'Be', 131000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(44, N'Khăn quàng cổ lụa', N'https://secondwear.com/images/product/94.jpg', N'Khăn quàng cổ lụa sang trọng, nhẹ nhàng, nâng tầm outfit.', N'Mới 99%', N'L', N'Tím', 371000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(45, N'Áo hoodie in chữ', N'https://secondwear.com/images/product/95.jpg', N'Áo hoodie in chữ cá tính, trẻ trung, phong cách đường phố.', N'Khá', N'XL', N'Tím', 122000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(46, N'Quần jogger da', N'https://secondwear.com/images/product/96.jpg', N'Quần jogger da sang trọng, thời thượng, hợp dạo phố.', N'Như mới', N'M', N'Xanh dương', 470000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(47, N'Đồ bơi tankini', N'https://secondwear.com/images/product/97.jpg', N'Đồ bơi tankini thoải mái, thời trang, lý tưởng bãi biển.', N'Như mới', N'Freesize', N'Xám', 446000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(48, N'Bộ ngủ cotton', N'https://secondwear.com/images/product/98.jpg', N'Bộ ngủ cotton nhẹ nhàng, thoáng mát, lý tưởng nghỉ ngơi.', N'Khá', N'XL', N'Be', 212000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(49, N'Áo polo dài tay', N'https://secondwear.com/images/product/99.jpg', N'Áo polo dài tay thanh lịch, chuyên nghiệp, phù hợp công sở.', N'Hư nhẹ', N'Freesize', N'Cam', 372000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(50, N'Áo thun cổ tim', N'https://secondwear.com/images/product/100.jpg', N'Áo thun cổ tim nữ tính, thoải mái, dễ phối đồ.', N'Đã qua sử dụng', N'M', N'Đen', 111000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(1, N'Quần tây ống côn', N'https://secondwear.com/images/product/101.jpg', N'Quần tây ống côn ôm sát, thanh lịch, lý tưởng văn phòng.', N'Như mới', N'XXL', N'Đỏ', 113000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(2, N'Váy xòe midi', N'https://secondwear.com/images/product/102.jpg', N'Váy xòe midi nhẹ nhàng, nữ tính, phù hợp dạo phố.', N'Khá', N'Freesize', N'Cam', 297000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(3, N'Áo sơ mi họa tiết', N'https://secondwear.com/images/product/103.jpg', N'Áo sơ mi họa tiết trẻ trung, năng động, dễ phối đồ.', N'Mới 99%', N'M', N'Hồng', 394000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(4, N'Chân váy tennis', N'https://secondwear.com/images/product/104.jpg', N'Chân váy tennis năng động, thời trang, lý tưởng casual.', N'Như mới', N'L', N'Be', 292000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(5, N'Áo khoác gió', N'https://secondwear.com/images/product/105.jpg', N'Áo khoác gió gọn nhẹ, chống thấm, phù hợp ngày mưa.', N'Hư nhẹ', N'L', N'Đỏ', 159000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(6, N'Quần culottes lụa', N'https://secondwear.com/images/product/106.jpg', N'Quần culottes lụa mềm mại, sang trọng, hợp phong cách công sở.', N'Như mới', N'M', N'Đen', 314000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(7, N'Đầm voan hoa', N'https://secondwear.com/images/product/107.jpg', N'Đầm voan hoa nhẹ nhàng, nữ tính, lý tưởng mùa hè.', N'Như mới', N'Freesize', N'Xanh dương', 259000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(8, N'Áo len cổ tròn', N'https://secondwear.com/images/product/108.jpg', N'Áo len cổ tròn ấm áp, thoải mái, phù hợp mùa đông.', N'Tốt', N'S', N'Hồng', 403000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(9, N'Quần short da', N'https://secondwear.com/images/product/109.jpg', N'Quần short da sang trọng, thời thượng, hợp dạo phố.', N'Mới 99%', N'L', N'Đen', 404000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(10, N'Giày bốt cổ cao', N'https://secondwear.com/images/product/110.jpg', N'Giày bốt cổ cao thời trang, bền đẹp, lý tưởng mùa đông.', N'Khá', N'S', N'Đỏ', 334000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(11, N'Túi đeo vai', N'https://secondwear.com/images/product/111.jpg', N'Túi đeo vai tiện dụng, thời trang, phù hợp dạo phố.', N'Như mới', N'XL', N'Be', 400000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(12, N'Nón fedora', N'https://secondwear.com/images/product/112.jpg', N'Nón fedora thanh lịch, cổ điển, hợp phong cách mùa thu.', N'Như mới', N'S', N'Đen', 296000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(13, N'Kính mát oversize', N'https://secondwear.com/images/product/113.jpg', N'Kính mát oversize thời thượng, cá tính, bảo vệ mắt.', N'Mới 99%', N'XL', N'Tím', 60000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(14, N'Vòng cổ ngọc trai', N'https://secondwear.com/images/product/114.jpg', N'Vòng cổ ngọc trai sang trọng, tinh tế, phù hợp sự kiện.', N'Như mới', N'L', N'Xanh lá', 149000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(15, N'Áo hoodie basic', N'https://secondwear.com/images/product/115.jpg', N'Áo hoodie basic đơn giản, thoải mái, phong cách casual.', N'Như mới', N'Freesize', N'Nâu', 132000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(16, N'Quần jogger vải thô', N'https://secondwear.com/images/product/116.jpg', N'Quần jogger vải thô thoáng mát, trẻ trung, dễ phối đồ.', N'Đã qua sử dụng', N'M', N'Đen', 171000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(17, N'Đồ bơi cổ yếm', N'https://secondwear.com/images/product/117.jpg', N'Đồ bơi cổ yếm gợi cảm, thời trang, lý tưởng bãi biển.', N'Mới 99%', N'Freesize', N'Trắng', 346000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(18, N'Bộ pyjama ngắn', N'https://secondwear.com/images/product/118.jpg', N'Bộ pyjama ngắn nhẹ nhàng, thoải mái, phù hợp mùa hè.', N'Như mới', N'XXL', N'Đỏ', 409000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(19, N'Áo polo slim fit', N'https://secondwear.com/images/product/119.jpg', N'Áo polo slim fit ôm sát, thanh lịch, phù hợp công sở.', N'Tốt', N'L', N'Xanh dương', 341000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(20, N'Áo thun tay lỡ', N'https://secondwear.com/images/product/120.jpg', N'Áo thun tay lỡ mỏng nhẹ, thời trang, phù hợp mùa thu.', N'Mới 99%', N'XXL', N'Be', 55000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(21, N'Quần jean rách', N'https://secondwear.com/images/product/121.jpg', N'Quần jean rách cá tính, năng động, hợp phong cách đường phố.', N'Đã qua sử dụng', N'XXL', N'Tím', 430000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(22, N'Váy đầm peplum', N'https://secondwear.com/images/product/122.jpg', N'Váy đầm peplum thanh lịch, tôn dáng, lý tưởng công sở.', N'Đã qua sử dụng', N'S', N'Tím', 217000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(23, N'Áo sơ mi lanh', N'https://secondwear.com/images/product/123.jpg', N'Áo sơ mi lanh thoáng mát, nhẹ nhàng, phù hợp mùa hè.', N'Như mới', N'L', N'Xanh lá', 297000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(24, N'Chân váy chữ A', N'https://secondwear.com/images/product/124.jpg', N'Chân váy chữ A nữ tính, dễ phối đồ, hợp mọi dáng người.', N'Khá', N'Freesize', N'Trắng', 264000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(25, N'Áo khoác lông', N'https://secondwear.com/images/product/125.jpg', N'Áo khoác lông sang trọng, ấm áp, lý tưởng mùa đông.', N'Khá', N'XXL', N'Đen', 499000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(26, N'Quần kaki ống côn', N'https://secondwear.com/images/product/126.jpg', N'Quần kaki ống côn thanh lịch, trẻ trung, phù hợp công sở.', N'Đã qua sử dụng', N'XL', N'Tím', 374000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(27, N'Đầm maxi voan', N'https://secondwear.com/images/product/127.jpg', N'Đầm maxi lanh thoáng mát, nhẹ nhàng, lý tưởng mùa hè.', N'Mới 99%', N'M', N'Xanh lá', 186000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(28, N'Áo len gile', N'https://secondwear.com/images/product/128.jpg', N'Áo len gile mỏng nhẹ, thời trang, dễ phối đồ.', N'Đã qua sử dụng', N'XL', N'Vàng', 83000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(29, N'Quần short culottes', N'https://secondwear.com/images/product/129.jpg', N'Quần short culottes thoải mái, hiện đại, phù hợp dạo phố.', N'Tốt', N'XL', N'Xanh dương', 223000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(30, N'Giày oxford', N'https://secondwear.com/images/product/130.jpg', N'Giày oxford thanh lịch, bền đẹp, phù hợp công sở.', N'Đã qua sử dụng', N'M', N'Be', 183000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(31, N'Túi xách mini', N'https://secondwear.com/images/product/131.jpg', N'Túi xách mini nhỏ gọn, thời trang, lý tưởng tiệc tối.', N'Tốt', N'L', N'Xanh dương', 274000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(32, N'Mũ lưỡi trai da', N'https://secondwear.com/images/product/132.jpg', N'Mũ lưỡi trai da sang trọng, cá tính, hợp phong cách streetwear.', N'Đã qua sử dụng', N'XXL', N'Tím', 339000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(33, N'Kính mát gọng trong', N'https://secondwear.com/images/product/133.jpg', N'Kính mát gọng trong hiện đại, tinh tế, bảo vệ mắt.', N'Khá', N'Freesize', N'Xanh dương', 277000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(34, N'Thắt lưng bản to', N'https://secondwear.com/images/product/134.jpg', N'Thắt lưng bản to thời thượng, nổi bật, nâng tầm outfit.', N'Đã qua sử dụng', N'L', N'Cam', 230000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(35, N'Áo hoodie tay dài', N'https://secondwear.com/images/product/135.jpg', N'Áo hoodie tay dài ấm áp, thoải mái, phù hợp mùa đông.', N'Đã qua sử dụng', N'M', N'Tím', 477000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(36, N'Quần legging in họa tiết', N'https://secondwear.com/images/product/136.jpg', N'Quần legging in họa tiết cá tính, năng động, lý tưởng tập gym.', N'Đã qua sử dụng', N'S', N'Trắng', 357000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(37, N'Đồ bơi thể thao', N'https://secondwear.com/images/product/137.jpg', N'Đồ bơi thể thao thoải mái, thời trang, phù hợp bơi lội.', N'Như mới', N'L', N'Đen', 256000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(38, N'Bộ ngủ lụa ngắn', N'https://secondwear.com/images/product/138.jpg', N'Bộ ngủ lụa ngắn sang trọng, mềm mại, lý tưởng mùa hè.', N'Tốt', N'L', N'Đỏ', 192000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(39, N'Áo polo nữ slim fit', N'https://secondwear.com/images/product/139.jpg', N'Áo polo nữ slim fit ôm sát, thanh lịch, phù hợp dạo phố.', N'Đã qua sử dụng', N'M', N'Vàng', 287000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(40, N'Áo thun in logo', N'https://secondwear.com/images/product/140.jpg', N'Áo thun in logo trẻ trung, năng động, dễ phối đồ.', N'Tốt', N'L', N'Vàng', 297000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(41, N'Quần tây caro', N'https://secondwear.com/images/product/141.jpg', N'Quần tây caro thanh lịch, thời trang, lý tưởng công sở.', N'Hư nhẹ', N'M', N'Tím', 78000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(42, N'Váy yếm vải thô', N'https://secondwear.com/images/product/142.jpg', N'Váy yếm vải thô thoáng mát, trẻ trung, phù hợp mùa hè.', N'Đã qua sử dụng', N'M', N'Xanh dương', 82000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(43, N'Áo sơ mi tay bồng', N'https://secondwear.com/images/product/143.jpg', N'Áo sơ mi tay bồng nữ tính, sang trọng, lý tưởng sự kiện.', N'Hư nhẹ', N'M', N'Đen', 284000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(44, N'Chân váy maxi', N'https://secondwear.com/images/product/144.jpg', N'Chân váy maxi nhẹ nhàng, nữ tính, phù hợp dạo phố.', N'Khá', N'M', N'Vàng', 255000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(45, N'Áo khoác parka', N'https://secondwear.com/images/product/145.jpg', N'Áo khoác parka ấm áp, bền đẹp, lý tưởng mùa đông.', N'Mới 99%', N'L', N'Tím', 413000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(46, N'Quần ống rộng lụa', N'https://secondwear.com/images/product/146.jpg', N'Quần ống rộng lụa mềm mại, sang trọng, tôn dáng.', N'Đã qua sử dụng', N'M', N'Xám', 457000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(47, N'Đầm sơ mi', N'https://secondwear.com/images/product/147.jpg', N'Đầm sơ mi năng động, thoải mái, phù hợp công sở.', N'Đã qua sử dụng', N'S', N'Xám', 108000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(48, N'Áo len dài tay', N'https://secondwear.com/images/product/148.jpg', N'Áo len dài tay ấm áp, thời trang, phù hợp mùa đông.', N'Đã qua sử dụng', N'M', N'Hồng', 307000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(49, N'Quần short linen', N'https://secondwear.com/images/product/149.jpg', N'Quần short linen thoáng mát, nhẹ nhàng, lý tưởng mùa hè.', N'Hư nhẹ', N'S', N'Be', 414000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(50, N'Giày mule', N'https://secondwear.com/images/product/150.jpg', N'Giày mule thời trang, tiện dụng, phù hợp dạo phố.', N'Đã qua sử dụng', N'M', N'Xanh dương', 383000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(1, N'Túi đeo lưng', N'https://secondwear.com/images/product/151.jpg', N'Túi đeo lưng nhỏ gọn, năng động, lý tưởng du lịch.', N'Mới 99%', N'XXL', N'Be', 280000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(2, N'Nón baker boy', N'https://secondwear.com/images/product/152.jpg', N'Nón baker boy thanh lịch, thời trang, hợp phong cách mùa thu.', N'Mới 99%', N'Freesize', N'Đỏ', 78000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(3, N'Kính mát gọng màu', N'https://secondwear.com/images/product/153.jpg', N'Kính mát gọng màu cá tính, nổi bật, bảo vệ mắt.', N'Tốt', N'Freesize', N'Hồng', 178000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(4, N'Dây chuyền vàng', N'https://secondwear.com/images/product/154.jpg', N'Dây chuyền vàng sang trọng, tinh tế, phù hợp sự kiện.', N'Mới 99%', N'XL', N'Vàng', 245000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(5, N'Áo hoodie cổ tròn', N'https://secondwear.com/images/product/155.jpg', N'Áo hoodie cổ tròn thoải mái, đơn giản, phong cách casual.', N'Khá', N'L', N'Vàng', 419000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(6, N'Quần jogger linen', N'https://secondwear.com/images/product/156.jpg', N'Quần jogger linen thoáng mát, trẻ trung, phù hợp mùa hè.', N'Hư nhẹ', N'S', N'Tím', 303000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(7, N'Đồ bơi cao cổ', N'https://secondwear.com/images/product/157.jpg', N'Đồ bơi cao cổ gợi cảm, thời trang, lý tưởng bãi biển.', N'Khá', N'Freesize', N'Tím', 165000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(8, N'Bộ pyjama dài tay', N'https://secondwear.com/images/product/158.jpg', N'Bộ pyjama dài tay ấm áp, thoải mái, phù hợp mùa đông.', N'Mới 99%', N'S', N'Xanh lá', 152000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(9, N'Áo polo cotton', N'https://secondwear.com/images/product/159.jpg', N'Áo polo cotton thoáng mát, thanh lịch, phù hợp công sở.', N'Hư nhẹ', N'Freesize', N'Trắng', 370000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(10, N'Áo thun oversize', N'https://secondwear.com/images/product/160.jpg', N'Áo thun oversize thoải mái, cá tính, hợp phong cách đường phố.', N'Như mới', N'Freesize', N'Vàng', 195000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(11, N'Quần jean ống loe', N'https://secondwear.com/images/product/161.jpg', N'Quần jean ống loe thời trang, tôn dáng, dễ phối đồ.', N'Tốt', N'M', N'Xanh lá', 376000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(12, N'Váy hoa nhí', N'https://secondwear.com/images/product/162.jpg', N'Váy hoa nhí nhẹ nhàng, nữ tính, lý tưởng mùa hè.', N'Như mới', N'M', N'Xanh lá', 227000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(13, N'Áo sơ mi kẻ sọc', N'https://secondwear.com/images/product/163.jpg', N'Áo sơ mi kẻ sọc thanh lịch, trẻ trung, phù hợp công sở.', N'Khá', N'XXL', N'Trắng', 119000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(14, N'Chân váy midi', N'https://secondwear.com/images/product/164.jpg', N'Chân váy midi nữ tính, dễ phối đồ, phù hợp dạo phố.', N'Như mới', N'S', N'Xám', 460000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(15, N'Áo khoác denim', N'https://secondwear.com/images/product/165.jpg', N'Áo khoác denim năng động, cá tính, hợp phong cách casual.', N'Tốt', N'XL', N'Xanh lá', 275000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(16, N'Quần culottes kaki', N'https://secondwear.com/images/product/166.jpg', N'Quần culottes kaki thoải mái, thanh lịch, dễ phối đồ.', N'Như mới', N'XXL', N'Be', 480000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(17, N'Đầm lụa trơn', N'https://secondwear.com/images/product/167.jpg', N'Đầm lụa trơn sang trọng, nhẹ nhàng, lý tưởng sự kiện.', N'Mới 99%', N'S', N'Tím', 489000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(18, N'Áo len crop top', N'https://secondwear.com/images/product/168.jpg', N'Áo len crop top trẻ trung, thời trang, phù hợp mùa thu.', N'Hư nhẹ', N'XL', N'Xanh dương', 393000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(19, N'Quần short caro', N'https://secondwear.com/images/product/169.jpg', N'Quần short caro trẻ trung, năng động, lý tưởng mùa hè.', N'Đã qua sử dụng', N'S', N'Đen', 280000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(20, N'Giày loafer', N'https://secondwear.com/images/product/170.jpg', N'Giày loafer thanh lịch, tiện dụng, phù hợp công sở.', N'Như mới', N'XXL', N'Trắng', 420000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(21, N'Túi xách đan lát', N'https://secondwear.com/images/product/171.jpg', N'Túi xách đan lát thời trang, nhẹ nhàng, lý tưởng dạo phố.', N'Tốt', N'Freesize', N'Trắng', 188000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(22, N'Mũ lưỡi trai thêu', N'https://secondwear.com/images/product/172.jpg', N'Mũ lưỡi trai thêu cá tính, năng động, hợp phong cách streetwear.', N'Mới 99%', N'S', N'Đỏ', 412000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(23, N'Kính mát tráng gương', N'https://secondwear.com/images/product/173.jpg', N'Kính mát tráng gương thời thượng, nổi bật, bảo vệ mắt.', N'Khá', N'Freesize', N'Vàng', 232000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(24, N'Vòng tay charm', N'https://secondwear.com/images/product/174.jpg', N'Vòng tay charm tinh tế, sang trọng, phù hợp mọi outfit.', N'Tốt', N'Freesize', N'Xám', 305000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(25, N'Áo hoodie lông', N'https://secondwear.com/images/product/175.jpg', N'Áo hoodie lông ấm áp, sang trọng, lý tưởng mùa đông.', N'Đã qua sử dụng', N'L', N'Be', 301000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(26, N'Quần jogger cotton', N'https://secondwear.com/images/product/176.jpg', N'Quần jogger cotton thoáng mát, thoải mái, phù hợp casual.', N'Hư nhẹ', N'XL', N'Đen', 172000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(27, N'Đồ bơi hai mảnh', N'https://secondwear.com/images/product/177.jpg', N'Đồ bơi hai mảnh quyến rũ, thời trang, lý tưởng bãi biển.', N'Tốt', N'S', N'Xanh lá', 135000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(28, N'Bộ ngủ vải thô', N'https://secondwear.com/images/product/178.jpg', N'Bộ ngủ vải thô nhẹ nhàng, thoáng mát, lý tưởng nghỉ ngơi.', N'Hư nhẹ', N'XL', N'Trắng', 487000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(29, N'Áo polo kẻ sọc', N'https://secondwear.com/images/product/179.jpg', N'Áo polo kẻ sọc trẻ trung, năng động, phù hợp dạo phố.', N'Hư nhẹ', N'L', N'Be', 366000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(30, N'Áo thun tay ngắn', N'https://secondwear.com/images/product/180.jpg', N'Áo thun tay ngắn basic, dễ phối đồ, phù hợp mọi dịp.', N'Hư nhẹ', N'L', N'Be', 393000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(31, N'Quần tây slim fit', N'https://secondwear.com/images/product/181.jpg', N'Quần tây slim fit ôm sát, thanh lịch, lý tưởng công sở.', N'Tốt', N'XL', N'Hồng', 367000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(32, N'Váy đầm ren', N'https://secondwear.com/images/product/182.jpg', N'Váy đầm ren sang trọng, nữ tính, lý tưởng tiệc tối.', N'Khá', N'XXL', N'Nâu', 346000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(33, N'Áo sơ mi voan', N'https://secondwear.com/images/product/183.jpg', N'Áo sơ mi voan nhẹ nhàng, thời trang, phù hợp sự kiện.', N'Đã qua sử dụng', N'XL', N'Vàng', 251000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(34, N'Chân váy xếp nếp', N'https://secondwear.com/images/product/184.jpg', N'Chân váy xếp nếp thanh lịch, nữ tính, dễ phối đồ.', N'Đã qua sử dụng', N'Freesize', N'Xanh lá', 88000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(35, N'Áo khoác dạ', N'https://secondwear.com/images/product/185.jpg', N'Áo khoác dạ ấm áp, sang trọng, lý tưởng mùa đông.', N'Như mới', N'L', N'Vàng', 306000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(36, N'Quần palazzo vải', N'https://secondwear.com/images/product/186.jpg', N'Quần palazzo vải mềm mại, thời thượng, tôn dáng.', N'Khá', N'M', N'Đen', 62000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(37, N'Đầm trễ vai', N'https://secondwear.com/images/product/187.jpg', N'Đầm trễ vai quyến rũ, nữ tính, lý tưởng dạ tiệc.', N'Mới 99%', N'XL', N'Cam', 249000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(38, N'Áo len tay bồng', N'https://secondwear.com/images/product/188.jpg', N'Áo len tay bồng nữ tính, thời trang, phù hợp mùa thu.', N'Tốt', N'M', N'Xanh lá', 277000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(39, N'Quần short thun', N'https://secondwear.com/images/product/189.jpg', N'Quần short thun năng động, thoải mái, lý tưởng mùa hè.', N'Tốt', N'S', N'Cam', 91000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(40, N'Giày bốt da', N'https://secondwear.com/images/product/190.jpg', N'Giày bốt da bền đẹp, thời trang, lý tưởng mùa đông.', N'Tốt', N'XL', N'Trắng', 217000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(41, N'Túi tote da', N'https://secondwear.com/images/product/191.jpg', N'Túi tote da cao cấp, tiện dụng, phù hợp công sở.', N'Đã qua sử dụng', N'XL', N'Xanh dương', 246000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(42, N'Nón len cổ điển', N'https://secondwear.com/images/product/192.jpg', N'Nón len cổ điển ấm áp, thời trang, hợp mùa đông.', N'Khá', N'Freesize', N'Đen', 367000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(43, N'Kính mát gọng lớn', N'https://secondwear.com/images/product/193.jpg', N'Kính mát gọng lớn thời thượng, cá tính, bảo vệ mắt.', N'Mới 99%', N'Freesize', N'Xám', 353000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(44, N'Thắt lưng vải', N'https://secondwear.com/images/product/194.jpg', N'Thắt lưng vải trẻ trung, năng động, nâng tầm outfit.', N'Như mới', N'XL', N'Cam', 263000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(45, N'Áo hoodie in hình', N'https://secondwear.com/images/product/195.jpg', N'Áo hoodie in hình cá tính, trẻ trung, phong cách đường phố.', N'Như mới', N'S', N'Be', 205000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(46, N'Quần jogger caro', N'https://secondwear.com/images/product/196.jpg', N'Quần jogger caro thanh lịch, thời trang, dễ phối đồ.', N'Hư nhẹ', N'L', N'Xám', 445000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(47, N'Đồ bơi in hoa', N'https://secondwear.com/images/product/197.jpg', N'Đồ bơi in hoa quyến rũ, thời trang, lý tưởng bãi biển.', N'Khá', N'S', N'Be', 172000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(48, N'Bộ pyjama kẻ sọc', N'https://secondwear.com/images/product/198.jpg', N'Bộ pyjama kẻ sọc thoải mái, nhẹ nhàng, lý tưởng nghỉ ngơi.', N'Tốt', N'XXL', N'Xanh dương', 406000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(49, N'Áo polo basic', N'https://secondwear.com/images/product/199.jpg', N'Áo polo basic đơn giản, thanh lịch, phù hợp công sở.', N'Tốt', N'Freesize', N'Vàng', 163000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(50, N'Áo thun cổ bẻ', N'https://secondwear.com/images/product/200.jpg', N'Áo thun cổ bẻ trẻ trung, năng động, dễ phối đồ.', N'Hư nhẹ', N'S', N'Hồng', 208000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(1, N'Quần jean ống côn', N'https://secondwear.com/images/product/201.jpg', N'Quần jean ống côn ôm sát, thời trang, phù hợp dạo phố.', N'Tốt', N'XXL', N'Cam', 229000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(2, N'Váy xòe công sở', N'https://secondwear.com/images/product/202.jpg', N'Váy xòe công sở thanh lịch, nữ tính, lý tưởng văn phòng.', N'Khá', N'XL', N'Xám', 371000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(3, N'Áo sơ mi tay dài', N'https://secondwear.com/images/product/203.jpg', N'Áo sơ mi tay dài thanh lịch, chuyên nghiệp, phù hợp công sở.', N'Tốt', N'Freesize', N'Xám', 214000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(4, N'Chân váy lụa', N'https://secondwear.com/images/product/204.jpg', N'Chân váy lụa mềm mại, sang trọng, hợp phong cách sự kiện.', N'Mới 99%', N'XL', N'Vàng', 482000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(5, N'Áo khoác cardigan', N'https://secondwear.com/images/product/205.jpg', N'Áo khoác cardigan mỏng nhẹ, thời trang, dễ phối đồ.', N'Khá', N'XL', N'Be', 80000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(6, N'Quần kaki ống đứng', N'https://secondwear.com/images/product/206.jpg', N'Quần kaki ống đứng thanh lịch, trẻ trung, phù hợp công sở.', N'Tốt', N'S', N'Trắng', 302000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(7, N'Đầm maxi lanh', N'https://secondwear.com/images/product/207.jpg', N'Đầm maxi lanh thoáng mát, nhẹ nhàng, lý tưởng mùa hè.', N'Mới 99%', N'Freesize', N'Xanh lá', 408000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(8, N'Áo len cổ tim', N'https://secondwear.com/images/product/208.jpg', N'Áo len cổ tim nữ tính, ấm áp, phù hợp mùa đông.', N'Khá', N'Freesize', N'Be', 203000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(9, N'Quần short vải lanh', N'https://secondwear.com/images/product/209.jpg', N'Quần short vải lanh thoáng mát, trẻ trung, lý tưởng mùa hè.', N'Tốt', N'Freesize', N'Be', 316000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(10, N'Giày sandal quai mảnh', N'https://secondwear.com/images/product/210.jpg', N'Giày sandal quai mảnh thời trang, thoáng mát, hợp mùa hè.', N'Khá', N'XL', N'Tím', 293000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(11, N'Túi xách vải thô', N'https://secondwear.com/images/product/211.jpg', N'Túi xách vải thô nhẹ nhàng, tiện dụng, phù hợp dạo phố.', N'Tốt', N'L', N'Xanh lá', 306000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(12, N'Mũ bucket da', N'https://secondwear.com/images/product/212.jpg', N'Mũ bucket da sang trọng, thời thượng, hợp phong cách đường phố.', N'Đã qua sử dụng', N'XL', N'Trắng', 398000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(13, N'Kính mát gọng nhỏ', N'https://secondwear.com/images/product/213.jpg', N'Kính mát gọng nhỏ tinh tế, hiện đại, bảo vệ mắt.', N'Đã qua sử dụng', N'M', N'Đen', 464000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(14, N'Vòng cổ dây da', N'https://secondwear.com/images/product/214.jpg', N'Vòng cổ dây da cá tính, thời trang, phù hợp mọi outfit.', N'Đã qua sử dụng', N'XXL', N'Đen', 467000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(15, N'Áo hoodie cotton', N'https://secondwear.com/images/product/215.jpg', N'Áo hoodie cotton thoải mái, ấm áp, phù hợp mùa đông.', N'Đã qua sử dụng', N'Freesize', N'Vàng', 215000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(16, N'Quần legging cotton', N'https://secondwear.com/images/product/216.jpg', N'Quần legging cotton thoáng mát, co giãn, lý tưởng tập gym.', N'Đã qua sử dụng', N'M', N'Xanh lá', 240000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(17, N'Đồ bơi cut-out cao cấp', N'https://secondwear.com/images/product/217.jpg', N'Đồ bơi cut-out cao cấp gợi cảm, thời trang, lý tưởng bãi biển.', N'Khá', N'Freesize', N'Nâu', 441000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(18, N'Bộ ngủ lụa dài', N'https://secondwear.com/images/product/218.jpg', N'Bộ ngủ lụa dài sang trọng, mềm mại, lý tưởng nghỉ ngơi.', N'Như mới', N'L', N'Trắng', 289000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(19, N'Áo polo tay ngắn', N'https://secondwear.com/images/product/219.jpg', N'Áo polo tay ngắn trẻ trung, năng động, phù hợp dạo phố.', N'Mới 99%', N'S', N'Đen', 262000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(20, N'Áo thun in slogan', N'https://secondwear.com/images/product/220.jpg', N'Áo thun in slogan cá tính, thời thượng, hợp phong cách Gen Z.', N'Đã qua sử dụng', N'XL', N'Nâu', 406000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(21, N'Quần tây ống loe', N'https://secondwear.com/images/product/221.jpg', N'Quần tây ống loe thanh lịch, thời trang, tôn dáng.', N'Hư nhẹ', N'XXL', N'Hồng', 364000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(22, N'Váy đầm ôm sát', N'https://secondwear.com/images/product/222.jpg', N'Váy đầm ôm sát gợi cảm, sang trọng, lý tưởng tiệc tối.', N'Tốt', N'S', N'Vàng', 458000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(23, N'Áo sơ mi cổ trụ', N'https://secondwear.com/images/product/223.jpg', N'Áo sơ mi cổ trụ thanh lịch, độc đáo, phù hợp công sở.', N'Mới 99%', N'L', N'Tím', 477000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(24, N'Chân váy bút chì da', N'https://secondwear.com/images/product/224.jpg', N'Chân váy bút chì da sang trọng, thời thượng, lý tưởng văn phòng.', N'Như mới', N'M', N'Hồng', 165000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(25, N'Áo khoác blazer', N'https://secondwear.com/images/product/225.jpg', N'Áo khoác blazer thanh lịch, chuyên nghiệp, phù hợp công sở.', N'Tốt', N'Freesize', N'Be', 279000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(26, N'Quần culottes denim', N'https://secondwear.com/images/product/226.jpg', N'Quần culottes denim năng động, thời trang, dễ phối đồ.', N'Đã qua sử dụng', N'XXL', N'Cam', 66000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(27, N'Đầm lụa hoa', N'https://secondwear.com/images/product/227.jpg', N'Đầm lụa hoa nhẹ nhàng, sang trọng, lý tưởng sự kiện.', N'Như mới', N'XXL', N'Đen', 151000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(28, N'Áo len mỏng dài tay', N'https://secondwear.com/images/product/228.jpg', N'Áo len mỏng dài tay nhẹ nhàng, thời trang, phù hợp mùa thu.', N'Đã qua sử dụng', N'XL', N'Đỏ', 195000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(29, N'Quần short kaki nữ', N'https://secondwear.com/images/product/229.jpg', N'Quần short kaki nữ trẻ trung, thoải mái, lý tưởng mùa hè.', N'Hư nhẹ', N'Freesize', N'Đỏ', 166000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(30, N'Giày bốt cổ ngắn', N'https://secondwear.com/images/product/230.jpg', N'Giày bốt cổ ngắn thời trang, bền đẹp, hợp mùa đông.', N'Tốt', N'S', N'Xanh lá', 482000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(31, N'Túi clutch vải', N'https://secondwear.com/images/product/231.jpg', N'Túi clutch vải sang trọng, nhỏ gọn, lý tưởng tiệc tối.', N'Mới 99%', N'XXL', N'Be', 78000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(32, N'Nón lưỡi trai vải', N'https://secondwear.com/images/product/232.jpg', N'Nón lưỡi trai vải trẻ trung, năng động, hợp phong cách casual.', N'Hư nhẹ', N'S', N'Trắng', 445000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(33, N'Kính mát gọng tròn nhỏ', N'https://secondwear.com/images/product/233.jpg', N'Kính mát gọng tròn nhỏ tinh tế, thời thượng, bảo vệ mắt.', N'Hư nhẹ', N'Freesize', N'Nâu', 333000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(34, N'Thắt lưng da lộn', N'https://secondwear.com/images/product/234.jpg', N'Thắt lưng da lộn sang trọng, mềm mại, nâng tầm outfit.', N'Đã qua sử dụng', N'L', N'Hồng', 221000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(35, N'Áo hoodie lót lông', N'https://secondwear.com/images/product/235.jpg', N'Áo hoodie lót lông ấm áp, sang trọng, lý tưởng mùa đông.', N'Khá', N'XL', N'Cam', 144000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(36, N'Quần jogger vải lanh', N'https://secondwear.com/images/product/236.jpg', N'Quần jogger vải lanh thoáng mát, trẻ trung, phù hợp mùa hè.', N'Như mới', N'XXL', N'Vàng', 212000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(37, N'Đồ bơi một mảnh hoa', N'https://secondwear.com/images/product/237.jpg', N'Đồ bơi một mảnh hoa quyến rũ, thời trang, lý tưởng bãi biển.', N'Tốt', N'L', N'Hồng', 461000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(38, N'Bộ pyjama lụa mỏng', N'https://secondwear.com/images/product/238.jpg', N'Bộ pyjama lụa mỏng mềm mại, sang trọng, lý hợp mùa hè.', N'Đã qua sử dụng', N'Freesize', N'Be', 126000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(39, N'Áo polo nữ basic', N'https://secondwear.com/images/product/239.jpg', N'Áo polo nữ basic đơn giản, thanh lịch, phù hợp dạo phố.', N'Khá', N'XL', N'Nâu', 130000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(40, N'Áo thun tay dài crop', N'https://secondwear.com/images/product/240.jpg', N'Áo thun tay dài crop trẻ trung, năng động, hợp mùa thu.', N'Hư nhẹ', N'Freesize', N'Nâu', 167000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(41, N'Quần jean ống rộng', N'https://secondwear.com/images/product/241.jpg', N'Quần jean ống rộng thoải mái, thời thượng, dễ phối đồ.', N'Như mới', N'XL', N'Cam', 426000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(42, N'Váy yếm lụa', N'https://secondwear.com/images/product/242.jpg', N'Váy yếm lụa sang trọng, nhẹ nhàng, lý tưởng dạo phố.', N'Khá', N'L', N'Trắng', 211000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(43, N'Áo sơ mi tay ngắn', N'https://secondwear.com/images/product/243.jpg', N'Áo sơ mi tay ngắn trẻ trung, thoáng mát, phù hợp mùa hè.', N'Tốt', N'M', N'Vàng', 486000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(44, N'Chân váy denim midi', N'https://secondwear.com/images/product/244.jpg', N'Chân váy denim midi năng động, thời trang, dễ phối đồ.', N'Tốt', N'S', N'Xanh lá', 252000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(45, N'Áo khoác măng tô', N'https://secondwear.com/images/product/245.jpg', N'Áo khoác măng tô thanh lịch, ấm áp, lý tưởng mùa đông.', N'Đã qua sử dụng', N'XL', N'Đỏ', 273000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(46, N'Quần palazzo lanh', N'https://secondwear.com/images/product/246.jpg', N'Quần palazzo lanh thoáng mát, sang trọng, tôn dáng.', N'Như mới', N'Freesize', N'Nâu', 266000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(47, N'Đầm maxi trễ vai', N'https://secondwear.com/images/product/247.jpg', N'Đầm maxi trễ vai quyến rũ, nữ tính, lý tưởng sự kiện.', N'Đã qua sử dụng', N'M', N'Đen', 112000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(48, N'Áo len cổ lọ mỏng', N'https://secondwear.com/images/product/248.jpg', N'Áo len cổ lọ mỏng nhẹ nhàng, thời trang, phù hợp mùa thu.', N'Mới 99%', N'S', N'Xanh dương', 422000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(49, N'Quần short vải caro', N'https://secondwear.com/images/product/249.jpg', N'Quần short vải caro trẻ trung, năng động, lý tưởng mùa hè.', N'Như mới', N'L', N'Hồng', 121000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(50, N'Giày slip-on vải', N'https://secondwear.com/images/product/250.jpg', N'Giày slip-on vải tiện dụng, thời trang, phù hợp dạo phố.', N'Khá', N'XL', N'Tím', 257000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(1, N'Túi xách quai xích', N'https://secondwear.com/images/product/251.jpg', N'Túi xách quai xích sang trọng, thời thượng, lý tưởng tiệc tối.', N'Như mới', N'L', N'Tím', 159000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(2, N'Mũ fedora len', N'https://secondwear.com/images/product/252.jpg', N'Mũ fedora len thanh lịch, cổ điển, hợp phong cách mùa thu.', N'Như mới', N'XL', N'Xanh dương', 202000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(3, N'Kính mát gọng trắng', N'https://secondwear.com/images/product/253.jpg', N'Kính mát gọng trắng thời thượng, cá tính, bảo vệ mắt.', N'Hư nhẹ', N'M', N'Hồng', 97000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(4, N'Vòng tay da', N'https://secondwear.com/images/product/254.jpg', N'Vòng tay da cá tính, thời trang, phù hợp mọi outfit.', N'Đã qua sử dụng', N'S', N'Đỏ', 342000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(5, N'Áo hoodie dài tay', N'https://secondwear.com/images/product/255.jpg', N'Áo hoodie dài tay thoải mái, ấm áp, phù hợp mùa đông.', N'Như mới', N'L', N'Vàng', 351000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(6, N'Quần legging vải thô', N'https://secondwear.com/images/product/256.jpg', N'Quần legging vải thô thoáng mát, thời trang, lý tưởng casual.', N'Tốt', N'S', N'Be', 321000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(7, N'Đồ bơi thể thao nữ', N'https://secondwear.com/images/product/257.jpg', N'Đồ bơi thể thao nữ thoải mái, thời trang, phù hợp bơi lội.', N'Tốt', N'XXL', N'Đen', 85000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(8, N'Bộ ngủ cotton ngắn', N'https://secondwear.com/images/product/258.jpg', N'Bộ ngủ cotton ngắn nhẹ nhàng, thoáng mát, lý tưởng mùa hè.', N'Hư nhẹ', N'XL', N'Trắng', 151000, N'Đang bán');
INSERT INTO [Product] (account_id, name, image, description, condition, size, color, price, status) VALUES
(9, N'Áo polo nam slim fit', N'https://secondwear.com/images/product/259.jpg', N'Áo polo nam slim fit ôm sát, thanh lịch, phù hợp công sở.', N'Như mới', N'Freesize', N'Xanh dương', 199000, N'Đang bán');

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
        FLOOR(RAND() * 259) + 1, -- product_id ngẫu nhiên từ 1 đến 1000 [7]
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

PRINT N'Dữ liệu mẫu cho SecondWearDB đã được chèn thành công.';