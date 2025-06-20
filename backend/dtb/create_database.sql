-- Sử dụng master database để quản lý các database
USE [master];
GO

-- Xóa database nếu đã tồn tại để đảm bảo môi trường sạch cho việc tạo mới
IF DB_ID('SecondWearDB') IS NOT NULL
BEGIN
    ALTER DATABASE SecondWearDB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE SecondWearDB;
END
GO

-- Tạo cơ sở dữ liệu mới
CREATE DATABASE SecondWearDB;
GO

-- Chuyển sang sử dụng cơ sở dữ liệu SecondWearDB
USE SecondWearDB;
GO

-- 1. Tạo bảng 'User'
-- Chứa thông tin cơ bản của người dùng
CREATE TABLE [User] (
    user_id INT IDENTITY(1,1) PRIMARY KEY, -- Khóa chính, tự động tăng
    name NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) NOT NULL UNIQUE, -- Email phải là duy nhất
    phone NVARCHAR(20),
    address NVARCHAR(500)
);
GO

-- 2. Tạo bảng 'Role'
-- Chứa định nghĩa các vai trò trong hệ thống
CREATE TABLE [Role] (
    role_id INT IDENTITY(1,1) PRIMARY KEY, -- Khóa chính, tự động tăng
    role_name NVARCHAR(50) NOT NULL UNIQUE -- Tên vai trò phải là duy nhất
);
GO

-- 3. Tạo bảng 'Account'
-- Chứa thông tin tài khoản, liên kết với người dùng và vai trò
CREATE TABLE [Account] (
    account_id INT IDENTITY(1,1) PRIMARY KEY, -- Khóa chính, tự động tăng
    user_id INT NOT NULL, -- Khóa ngoại tham chiếu đến bảng User [7]
    role_id INT NOT NULL, -- Khóa ngoại tham chiếu đến bảng Role (Dựa trên ERD và thực tiễn CSDL, ưu tiên hơn mô tả dạng string)
    password NVARCHAR(255) NOT NULL,
    status NVARCHAR(50) NOT NULL, -- Trạng thái tài khoản
    FOREIGN KEY (user_id) REFERENCES [User](user_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (role_id) REFERENCES [Role](role_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);
GO

-- 4. Tạo bảng 'Product'
-- Chứa thông tin về sản phẩm được đăng bán
CREATE TABLE [Product] (
    product_id INT IDENTITY(1,1) PRIMARY KEY, -- Khóa chính, tự động tăng
    account_id INT NOT NULL, -- Khóa ngoại tham chiếu đến Account (người bán) [7]
    name NVARCHAR(255) NOT NULL,
	image NVARCHAR(MAX), -- Đường dẫn ảnh
    description NVARCHAR(MAX),
    condition NVARCHAR(50), -- Tình trạng sản phẩm (ví dụ: "Mới 99%", "Đã qua sử dụng") [2]
    size NVARCHAR(20),
    color NVARCHAR(50),
    price DECIMAL(10, 2) NOT NULL, -- Giá bán, sử dụng DECIMAL cho độ chính xác của tiền tệ [2]
    status NVARCHAR(50) NOT NULL, -- Trạng thái sản phẩm (ví dụ: "Đang bán", "Đã bán", "Chờ duyệt") [2]
    FOREIGN KEY (account_id) REFERENCES [Account](account_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);
GO

-- 5. Tạo bảng 'Order'
-- Chứa thông tin các đơn hàng
CREATE TABLE [Order] (
    order_id INT IDENTITY(1,1) PRIMARY KEY, -- Khóa chính, tự động tăng
    account_id INT NOT NULL, -- Khóa ngoại tham chiếu đến Account (người mua) [3, 8]
    product_id INT NOT NULL, -- Khóa ngoại tham chiếu đến Product (theo cấu trúc ERD đơn giản) [3, 9]
    status NVARCHAR(50) NOT NULL, -- Trạng thái đơn hàng [3]
    order_date DATETIME DEFAULT GETDATE(), -- Ngày đặt hàng, mặc định là ngày hiện tại [3]
    total_amount DECIMAL(10, 2) NOT NULL, -- Tổng số tiền của đơn hàng [3]
    FOREIGN KEY (account_id) REFERENCES [Account](account_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (product_id) REFERENCES [Product](product_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);
GO

-- 6. Tạo bảng 'Payment'
-- Chứa thông tin thanh toán cho từng đơn hàng
CREATE TABLE [Payment] (
    payment_id INT IDENTITY(1,1) PRIMARY KEY, -- Khóa chính, tự động tăng
    order_id INT NOT NULL UNIQUE, -- Khóa ngoại tham chiếu đến Order, UNIQUE vì mối quan hệ 1-1 [9]
    method NVARCHAR(50) NOT NULL, -- Phương thức thanh toán (ví dụ: COD, bank_transfer, momo) [3]
    status NVARCHAR(50) NOT NULL, -- Trạng thái thanh toán [3]
    payment_date DATETIME DEFAULT GETDATE(), -- Ngày thanh toán [4]
    amount DECIMAL(10, 2) NOT NULL, -- Số tiền thanh toán [4]
    FOREIGN KEY (order_id) REFERENCES [Order](order_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);
GO

-- 7. Tạo bảng 'Shipping'
-- Chứa thông tin vận chuyển cho từng đơn hàng
CREATE TABLE [Shipping] (
    shipping_id INT IDENTITY(1,1) PRIMARY KEY, -- Khóa chính, tự động tăng
    order_id INT NOT NULL UNIQUE, -- Khóa ngoại tham chiếu đến Order, UNIQUE vì mối quan hệ 1-1 [10]
    carrier NVARCHAR(50), -- Đơn vị vận chuyển (ví dụ: Fast, Economy, Express) [4]
    status NVARCHAR(50) NOT NULL, -- Trạng thái vận chuyển [4]
    shipping_date DATETIME, -- Ngày vận chuyển [4]
    FOREIGN KEY (order_id) REFERENCES [Order](order_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);
GO

-- 8. Tạo bảng 'Complaint'
-- Chứa thông tin về các khiếu nại của người dùng
CREATE TABLE [Complaint] (
    complaint_id INT IDENTITY(1,1) PRIMARY KEY, -- Khóa chính, tự động tăng
    account_id INT NOT NULL, -- Khóa ngoại tham chiếu đến Account (người gửi khiếu nại) [5, 8]
    description NVARCHAR(MAX) NOT NULL, -- Mô tả nội dung khiếu nại [5]
    status NVARCHAR(50) NOT NULL, -- Trạng thái khiếu nại [5]
    complaint_date DATETIME DEFAULT GETDATE(), -- Ngày gửi khiếu nại [5]
    FOREIGN KEY (account_id) REFERENCES [Account](account_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);
GO

-- 9. Tạo bảng 'Resolution'
-- Chứa thông tin giải quyết cho từng khiếu nại
CREATE TABLE [Resolution] (
    resolution_id INT IDENTITY(1,1) PRIMARY KEY, -- Khóa chính, tự động tăng
    complaint_id INT NOT NULL UNIQUE, -- Khóa ngoại tham chiếu đến Complaint, UNIQUE vì mối quan hệ 1-1 [10]
    result NVARCHAR(MAX), -- Kết quả giải quyết [5]
    resolution_date DATETIME DEFAULT GETDATE(), -- Ngày giải quyết khiếu nại [5]
    FOREIGN KEY (complaint_id) REFERENCES [Complaint](complaint_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);
GO

-- 10. Tạo bảng 'Review'
-- Chứa thông tin đánh giá sản phẩm của người dùng
CREATE TABLE [Review] (
    review_id INT IDENTITY(1,1) PRIMARY KEY, -- Khóa chính, tự động tăng
    product_id INT NOT NULL, -- Khóa ngoại tham chiếu đến Product [6, 9]
    account_id INT NOT NULL, -- Khóa ngoại tham chiếu đến Account (người đánh giá) [6, 9]
    rating INT, -- Điểm đánh giá [6] (có thể thêm CHECK constraint để giới hạn giá trị từ 1-5)
    comment NVARCHAR(MAX), -- Bình luận về sản phẩm [6]
    review_date DATETIME DEFAULT GETDATE(), -- Ngày viết đánh giá [6]
    FOREIGN KEY (product_id) REFERENCES [Product](product_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (account_id) REFERENCES [Account](account_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CHECK (rating >= 1 AND rating <= 5) -- Giới hạn điểm đánh giá từ 1 đến 5 sao
);
GO

-- Insert dữ liệu mẫu cho bảng Role (nếu cần)
INSERT INTO [Role] (role_name) VALUES
('admin'),
('seller'),
('customer'),
('guest');
GO

-- Xác nhận hoàn tất
PRINT N'Database SecondWearDB và các bảng đã được tạo thành công.';

