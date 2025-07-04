/****** Object:  Database [SecondWearDB]    Script Date: 6/25/2025 9:28:45 AM ******/
CREATE DATABASE [SecondWearDB]
GO
USE [SecondWearDB]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 6/25/2025 9:28:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[account_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[role_id] [int] NOT NULL,
	[password] [nvarchar](255) NOT NULL,
	[status] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[account_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Complaint]    Script Date: 6/25/2025 9:28:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Complaint](
	[complaint_id] [int] IDENTITY(1,1) NOT NULL,
	[account_id] [int] NOT NULL,
	[description] [nvarchar](max) NOT NULL,
	[status] [nvarchar](50) NOT NULL,
	[complaint_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[complaint_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order]    Script Date: 6/25/2025 9:28:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order](
	[order_id] [int] IDENTITY(1,1) NOT NULL,
	[account_id] [int] NOT NULL,
	[status] [nvarchar](50) NOT NULL,
	[order_date] [datetime] NULL,
	[total_amount] [decimal](10, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[order_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payment]    Script Date: 6/25/2025 9:28:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment](
	[payment_id] [int] IDENTITY(1,1) NOT NULL,
	[order_id] [int] NOT NULL,
	[method] [nvarchar](50) NOT NULL,
	[status] [nvarchar](50) NOT NULL,
	[payment_date] [datetime] NULL,
	[amount] [decimal](10, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[payment_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Category] ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[category_id] INT IDENTITY(1,1) NOT NULL,
	[name] NVARCHAR(100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[category_id] ASC
)
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Product]    Script Date: 6/25/2025 9:28:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[product_id] [int] IDENTITY(1,1) NOT NULL,
	[account_id] [int] NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[description] [nvarchar](max) NULL,
	[condition] [nvarchar](50) NULL,
	[size] [nvarchar](20) NULL,
	[color] [nvarchar](50) NULL,
	[price] [decimal](10, 2) NOT NULL,
	[status] [nvarchar](50) NOT NULL,
	[quantity] [int] NOT NULL,
	[category_id] INT NULL,
	[brand] [nvarchar](100) NULL,
	[origin] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[product_id] ASC
),
CONSTRAINT FK_Product_Category FOREIGN KEY (category_id) REFERENCES Category(category_id)
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductImage]    Script Date: 6/25/2025 9:28:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductImage](
	[image_id] [int] IDENTITY(1,1) NOT NULL,
	[product_id] [int] NOT NULL,
	[image_url] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[image_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderItem] ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderItem](
	[order_item_id] [int] IDENTITY(1,1) NOT NULL,
	[order_id] [int] NOT NULL,
	[product_id] [int] NOT NULL,
	[quantity] [int] NOT NULL,
	[price] [decimal] (10, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[order_item_id] ASC
),
CONSTRAINT FK_OrderItem_Order FOREIGN KEY (order_id) REFERENCES [Order](order_id),
CONSTRAINT FK_OrderItem_Product FOREIGN KEY (product_id) REFERENCES [Product](product_id)
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Resolution]    Script Date: 6/25/2025 9:28:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Resolution](
	[resolution_id] [int] IDENTITY(1,1) NOT NULL,
	[complaint_id] [int] NOT NULL,
	[result] [nvarchar](max) NULL,
	[resolution_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[resolution_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Review]    Script Date: 6/25/2025 9:28:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Review](
	[review_id] [int] IDENTITY(1,1) NOT NULL,
	[product_id] [int] NOT NULL,
	[account_id] [int] NOT NULL,
	[rating] [int] NULL,
	[comment] [nvarchar](max) NULL,
	[review_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[review_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 6/25/2025 9:28:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[role_id] [int] IDENTITY(1,1) NOT NULL,
	[role_name] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[role_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Shipping]    Script Date: 6/25/2025 9:28:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Shipping](
	[shipping_id] [int] IDENTITY(1,1) NOT NULL,
	[order_id] [int] NOT NULL,
	[carrier] [nvarchar](50) NULL,
	[status] [nvarchar](50) NOT NULL,
	[shipping_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[shipping_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 6/25/2025 9:28:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[email] [nvarchar](255) NOT NULL,
	[phone] [nvarchar](20) NULL,
	[address] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Account] ON 

INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (1, 1, 2, N'pass_seller_1', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (2, 2, 2, N'pass_seller_2', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (3, 3, 2, N'pass_seller_3', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (4, 4, 2, N'pass_seller_4', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (5, 5, 2, N'pass_seller_5', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (6, 6, 2, N'pass_seller_6', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (7, 7, 2, N'pass_seller_7', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (8, 8, 2, N'pass_seller_8', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (9, 9, 2, N'pass_seller_9', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (10, 10, 2, N'pass_seller_10', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (11, 11, 2, N'pass_seller_11', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (12, 12, 2, N'pass_seller_12', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (13, 13, 2, N'pass_seller_13', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (14, 14, 2, N'pass_seller_14', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (15, 15, 2, N'pass_seller_15', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (16, 16, 2, N'pass_seller_16', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (17, 17, 2, N'pass_seller_17', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (18, 18, 2, N'pass_seller_18', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (19, 19, 2, N'pass_seller_19', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (20, 20, 2, N'pass_seller_20', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (21, 21, 2, N'pass_seller_21', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (22, 22, 2, N'pass_seller_22', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (23, 23, 2, N'pass_seller_23', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (24, 24, 2, N'pass_seller_24', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (25, 25, 2, N'pass_seller_25', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (26, 26, 2, N'pass_seller_26', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (27, 27, 2, N'pass_seller_27', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (28, 28, 2, N'pass_seller_28', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (29, 29, 2, N'pass_seller_29', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (30, 30, 2, N'pass_seller_30', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (31, 31, 2, N'pass_seller_31', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (32, 32, 2, N'pass_seller_32', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (33, 33, 2, N'pass_seller_33', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (34, 34, 2, N'pass_seller_34', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (35, 35, 2, N'pass_seller_35', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (36, 36, 2, N'pass_seller_36', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (37, 37, 2, N'pass_seller_37', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (38, 38, 2, N'pass_seller_38', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (39, 39, 2, N'pass_seller_39', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (40, 40, 2, N'pass_seller_40', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (41, 41, 2, N'pass_seller_41', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (42, 42, 2, N'pass_seller_42', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (43, 43, 2, N'pass_seller_43', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (44, 44, 2, N'pass_seller_44', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (45, 45, 2, N'pass_seller_45', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (46, 46, 2, N'pass_seller_46', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (47, 47, 2, N'pass_seller_47', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (48, 48, 2, N'pass_seller_48', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (49, 49, 2, N'pass_seller_49', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (50, 50, 2, N'pass_seller_50', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (51, 1, 3, N'pass_customer_1', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (52, 2, 3, N'pass_customer_2', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (53, 3, 3, N'pass_customer_3', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (54, 4, 3, N'pass_customer_4', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (55, 5, 3, N'pass_customer_5', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (56, 6, 3, N'pass_customer_6', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (57, 7, 3, N'pass_customer_7', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (58, 8, 3, N'pass_customer_8', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (59, 9, 3, N'pass_customer_9', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (60, 10, 3, N'pass_customer_10', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (61, 11, 3, N'pass_customer_11', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (62, 12, 3, N'pass_customer_12', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (63, 13, 3, N'pass_customer_13', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (64, 14, 3, N'pass_customer_14', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (65, 15, 3, N'pass_customer_15', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (66, 16, 3, N'pass_customer_16', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (67, 17, 3, N'pass_customer_17', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (68, 18, 3, N'pass_customer_18', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (69, 19, 3, N'pass_customer_19', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (70, 20, 3, N'pass_customer_20', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (71, 51, 3, N'pass_customer_51', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (72, 52, 3, N'pass_customer_52', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (73, 53, 3, N'pass_customer_53', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (74, 54, 3, N'pass_customer_54', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (75, 55, 3, N'pass_customer_55', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (76, 56, 3, N'pass_customer_56', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (77, 57, 3, N'pass_customer_57', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (78, 58, 3, N'pass_customer_58', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (79, 59, 3, N'pass_customer_59', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (80, 60, 3, N'pass_customer_60', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (81, 61, 3, N'pass_customer_61', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (82, 62, 3, N'pass_customer_62', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (83, 63, 3, N'pass_customer_63', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (84, 64, 3, N'pass_customer_64', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (85, 65, 3, N'pass_customer_65', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (86, 66, 3, N'pass_customer_66', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (87, 67, 3, N'pass_customer_67', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (88, 68, 3, N'pass_customer_68', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (89, 69, 3, N'pass_customer_69', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (90, 70, 3, N'pass_customer_70', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (91, 71, 3, N'pass_customer_71', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (92, 72, 3, N'pass_customer_72', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (93, 73, 3, N'pass_customer_73', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (94, 74, 3, N'pass_customer_74', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (95, 75, 3, N'pass_customer_75', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (96, 76, 3, N'pass_customer_76', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (97, 77, 3, N'pass_customer_77', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (98, 78, 3, N'pass_customer_78', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (99, 79, 3, N'pass_customer_79', N'active')
GO
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (100, 80, 3, N'pass_customer_80', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (101, 81, 3, N'pass_customer_81', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (102, 82, 3, N'pass_customer_82', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (103, 83, 3, N'pass_customer_83', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (104, 84, 3, N'pass_customer_84', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (105, 85, 3, N'pass_customer_85', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (106, 86, 3, N'pass_customer_86', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (107, 87, 3, N'pass_customer_87', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (108, 88, 3, N'pass_customer_88', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (109, 89, 3, N'pass_customer_89', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (110, 90, 3, N'pass_customer_90', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (111, 91, 3, N'pass_customer_91', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (112, 92, 3, N'pass_customer_92', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (113, 93, 3, N'pass_customer_93', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (114, 94, 3, N'pass_customer_94', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (115, 95, 3, N'pass_customer_95', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (116, 96, 3, N'pass_customer_96', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (117, 97, 3, N'pass_customer_97', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (118, 98, 3, N'pass_customer_98', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (119, 99, 3, N'pass_customer_99', N'active')
INSERT [dbo].[Account] ([account_id], [user_id], [role_id], [password], [status]) VALUES (120, 100, 3, N'pass_customer_100', N'active')
SET IDENTITY_INSERT [dbo].[Account] OFF
GO
SET IDENTITY_INSERT [dbo].[Complaint] ON 

INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (1, 54, N'Người bán không phản hồi tin nhắn.', N'Đã giải quyết', CAST(N'2025-04-30T23:22:55.637' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (2, 25, N'Người bán không phản hồi tin nhắn.', N'Đang xử lý', CAST(N'2025-05-04T23:22:55.640' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (3, 50, N'Hàng bị lỗi rách nhỏ, không được kiểm tra kỹ.', N'Đang xử lý', CAST(N'2025-05-12T23:22:55.640' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (4, 38, N'Hàng bị lỗi rách nhỏ, không được kiểm tra kỹ.', N'Đã đóng', CAST(N'2025-05-05T23:22:55.643' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (5, 22, N'Chất liệu vải kém chất lượng, không như mong đợi.', N'Mới', CAST(N'2025-05-17T23:22:55.643' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (6, 13, N'Thông tin liên hệ của người bán không chính xác.', N'Đã giải quyết', CAST(N'2025-05-18T23:22:55.647' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (7, 14, N'Giao nhầm sản phẩm, không phải sản phẩm đã đặt.', N'Mới', CAST(N'2025-05-15T23:22:55.647' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (8, 27, N'Giao nhầm sản phẩm, không phải sản phẩm đã đặt.', N'Đang xử lý', CAST(N'2025-05-25T23:22:55.647' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (9, 67, N'Thông tin liên hệ của người bán không chính xác.', N'Đã giải quyết', CAST(N'2025-05-17T23:22:55.650' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (10, 120, N'Đổi trả hàng gặp khó khăn, không được hỗ trợ.', N'Đang xử lý', CAST(N'2025-05-21T23:22:55.653' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (11, 5, N'Giá sản phẩm bị thay đổi sau khi đặt hàng.', N'Đã giải quyết', CAST(N'2025-06-02T23:22:55.657' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (12, 65, N'Sản phẩm có mùi lạ, không thể sử dụng được.', N'Đã đóng', CAST(N'2025-05-11T23:22:55.657' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (13, 115, N'Giá sản phẩm bị thay đổi sau khi đặt hàng.', N'Đang xử lý', CAST(N'2025-04-27T23:22:55.657' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (14, 101, N'Thông tin liên hệ của người bán không chính xác.', N'Đã giải quyết', CAST(N'2025-06-21T23:22:55.657' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (15, 83, N'Màu sắc sản phẩm thực tế khác xa ảnh đăng.', N'Đang xử lý', CAST(N'2025-06-17T23:22:55.660' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (16, 90, N'Chất liệu vải kém chất lượng, không như mong đợi.', N'Đã đóng', CAST(N'2025-05-17T23:22:55.660' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (17, 22, N'Người bán không phản hồi tin nhắn.', N'Đã đóng', CAST(N'2025-06-11T23:22:55.660' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (18, 50, N'Đổi trả hàng gặp khó khăn, không được hỗ trợ.', N'Đã đóng', CAST(N'2025-05-03T23:22:55.660' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (19, 119, N'Người bán không phản hồi tin nhắn.', N'Mới', CAST(N'2025-06-03T23:22:55.663' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (20, 105, N'Hàng bị lỗi rách nhỏ, không được kiểm tra kỹ.', N'Đang xử lý', CAST(N'2025-06-14T23:22:55.663' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (21, 110, N'Thiếu phụ kiện đi kèm như đã mô tả.', N'Đã đóng', CAST(N'2025-06-08T23:22:55.663' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (22, 77, N'Thái độ phục vụ của người bán không tốt.', N'Mới', CAST(N'2025-05-18T23:22:55.667' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (23, 98, N'Thời gian giao hàng quá lâu, vượt quá cam kết.', N'Đang xử lý', CAST(N'2025-06-19T23:22:55.667' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (24, 113, N'Thời gian giao hàng quá lâu, vượt quá cam kết.', N'Đã giải quyết', CAST(N'2025-06-17T23:22:55.670' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (25, 82, N'Thông tin liên hệ của người bán không chính xác.', N'Đang xử lý', CAST(N'2025-05-14T23:22:55.670' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (26, 85, N'Sản phẩm không đúng mô tả, kích cỡ sai.', N'Đã giải quyết', CAST(N'2025-06-19T23:22:55.670' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (27, 44, N'Màu sắc sản phẩm thực tế khác xa ảnh đăng.', N'Đang xử lý', CAST(N'2025-05-24T23:22:55.673' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (28, 74, N'Đổi trả hàng gặp khó khăn, không được hỗ trợ.', N'Đang xử lý', CAST(N'2025-05-09T23:22:55.673' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (29, 110, N'Màu sắc sản phẩm thực tế khác xa ảnh đăng.', N'Đang xử lý', CAST(N'2025-06-14T23:22:55.677' AS DateTime))
INSERT [dbo].[Complaint] ([complaint_id], [account_id], [description], [status], [complaint_date]) VALUES (30, 28, N'Màu sắc sản phẩm thực tế khác xa ảnh đăng.', N'Đã giải quyết', CAST(N'2025-06-09T23:22:55.680' AS DateTime))
SET IDENTITY_INSERT [dbo].[Complaint] OFF
GO
SET IDENTITY_INSERT [dbo].[Order] ON 

INSERT [dbo].[Order] ([order_id], [account_id], [status], [order_date], [total_amount]) VALUES (1, 51, N'Hoàn thành', CAST(N'2025-05-25T23:22:55.533' AS DateTime), CAST(1008000.00 AS Decimal(10, 2)))
INSERT [dbo].[Order] ([order_id], [account_id], [status], [order_date], [total_amount]) VALUES (2, 52, N'Hoàn thành', CAST(N'2025-05-27T23:22:55.533' AS DateTime), CAST(262000.00 AS Decimal(10, 2)))
INSERT [dbo].[Order] ([order_id], [account_id], [status], [order_date], [total_amount]) VALUES (3, 53, N'Đã giao', CAST(N'2025-05-30T23:22:55.533' AS DateTime), CAST(567000.00 AS Decimal(10, 2)))
INSERT [dbo].[Order] ([order_id], [account_id], [status], [order_date], [total_amount]) VALUES (4, 54, N'Đang xử lý', CAST(N'2025-06-04T23:22:55.533' AS DateTime), CAST(332000.00 AS Decimal(10, 2)))
INSERT [dbo].[Order] ([order_id], [account_id], [status], [order_date], [total_amount]) VALUES (5, 55, N'Hủy', CAST(N'2025-06-06T23:22:55.533' AS DateTime), CAST(366000.00 AS Decimal(10, 2)))
INSERT [dbo].[Order] ([order_id], [account_id], [status], [order_date], [total_amount]) VALUES (6, 56, N'Hoàn thành', CAST(N'2025-06-09T23:22:55.533' AS DateTime), CAST(714000.00 AS Decimal(10, 2)))
INSERT [dbo].[Order] ([order_id], [account_id], [status], [order_date], [total_amount]) VALUES (7, 57, N'Đã giao', CAST(N'2025-06-12T23:22:55.533' AS DateTime), CAST(202000.00 AS Decimal(10, 2)))
INSERT [dbo].[Order] ([order_id], [account_id], [status], [order_date], [total_amount]) VALUES (8, 58, N'Đang xử lý', CAST(N'2025-06-14T23:22:55.533' AS DateTime), CAST(541000.00 AS Decimal(10, 2)))
INSERT [dbo].[Order] ([order_id], [account_id], [status], [order_date], [total_amount]) VALUES (9, 59, N'Hoàn thành', CAST(N'2025-06-16T23:22:55.533' AS DateTime), CAST(315000.00 AS Decimal(10, 2)))
INSERT [dbo].[Order] ([order_id], [account_id], [status], [order_date], [total_amount]) VALUES (10, 60, N'Đã giao', CAST(N'2025-06-17T23:22:55.533' AS DateTime), CAST(986000.00 AS Decimal(10, 2)))
INSERT [dbo].[Order] ([order_id], [account_id], [status], [order_date], [total_amount]) VALUES (11, 61, N'Hoàn thành', CAST(N'2025-06-19T23:22:55.533' AS DateTime), CAST(502000.00 AS Decimal(10, 2)))
INSERT [dbo].[Order] ([order_id], [account_id], [status], [order_date], [total_amount]) VALUES (12, 62, N'Đang xử lý', CAST(N'2025-06-20T23:22:55.533' AS DateTime), CAST(166000.00 AS Decimal(10, 2)))
INSERT [dbo].[Order] ([order_id], [account_id], [status], [order_date], [total_amount]) VALUES (13, 63, N'Hủy', CAST(N'2025-06-21T23:22:55.533' AS DateTime), CAST(222000.00 AS Decimal(10, 2)))
INSERT [dbo].[Order] ([order_id], [account_id], [status], [order_date], [total_amount]) VALUES (14, 64, N'Đã giao', CAST(N'2025-06-22T23:22:55.533' AS DateTime), CAST(366000.00 AS Decimal(10, 2)))
INSERT [dbo].[Order] ([order_id], [account_id], [status], [order_date], [total_amount]) VALUES (15, 65, N'Hoàn thành', CAST(N'2025-06-23T23:22:55.533' AS DateTime), CAST(404000.00 AS Decimal(10, 2)))
INSERT [dbo].[Order] ([order_id], [account_id], [status], [order_date], [total_amount]) VALUES (16, 66, N'Đang xử lý', CAST(N'2025-06-24T23:22:55.533' AS DateTime), CAST(1198000.00 AS Decimal(10, 2)))
INSERT [dbo].[Order] ([order_id], [account_id], [status], [order_date], [total_amount]) VALUES (17, 67, N'Đã xác nhận', CAST(N'2025-06-24T23:22:55.533' AS DateTime), CAST(467000.00 AS Decimal(10, 2)))
INSERT [dbo].[Order] ([order_id], [account_id], [status], [order_date], [total_amount]) VALUES (18, 68, N'Đang xử lý', CAST(N'2025-06-24T23:22:55.533' AS DateTime), CAST(480000.00 AS Decimal(10, 2)))
INSERT [dbo].[Order] ([order_id], [account_id], [status], [order_date], [total_amount]) VALUES (19, 69, N'Hoàn thành', CAST(N'2025-06-24T23:22:55.533' AS DateTime), CAST(336000.00 AS Decimal(10, 2)))
INSERT [dbo].[Order] ([order_id], [account_id], [status], [order_date], [total_amount]) VALUES (20, 70, N'Đã giao', CAST(N'2025-06-24T23:22:55.533' AS DateTime), CAST(630000.00 AS Decimal(10, 2)))
SET IDENTITY_INSERT [dbo].[Order] OFF
GO
SET IDENTITY_INSERT [dbo].[Payment] ON 

INSERT [dbo].[Payment] ([payment_id], [order_id], [method], [status], [payment_date], [amount]) VALUES (1, 1, N'Thanh toán khi nhận hàng (COD)', N'Đã thanh toán', CAST(N'2025-05-26T23:22:55.553' AS DateTime), CAST(150000.00 AS Decimal(10, 2)))
INSERT [dbo].[Payment] ([payment_id], [order_id], [method], [status], [payment_date], [amount]) VALUES (2, 2, N'Chuyển khoản ngân hàng', N'Đã thanh toán', CAST(N'2025-05-28T23:22:55.553' AS DateTime), CAST(200000.00 AS Decimal(10, 2)))
INSERT [dbo].[Payment] ([payment_id], [order_id], [method], [status], [payment_date], [amount]) VALUES (3, 3, N'Momo', N'Đã thanh toán', CAST(N'2025-05-31T23:22:55.553' AS DateTime), CAST(120000.00 AS Decimal(10, 2)))
INSERT [dbo].[Payment] ([payment_id], [order_id], [method], [status], [payment_date], [amount]) VALUES (4, 4, N'Thanh toán khi nhận hàng (COD)', N'Chờ thanh toán', CAST(N'2025-06-05T23:22:55.553' AS DateTime), CAST(350000.00 AS Decimal(10, 2)))
INSERT [dbo].[Payment] ([payment_id], [order_id], [method], [status], [payment_date], [amount]) VALUES (5, 5, N'Momo', N'Thất bại', CAST(N'2025-06-07T23:22:55.553' AS DateTime), CAST(250000.00 AS Decimal(10, 2)))
INSERT [dbo].[Payment] ([payment_id], [order_id], [method], [status], [payment_date], [amount]) VALUES (6, 6, N'Chuyển khoản ngân hàng', N'Đã thanh toán', CAST(N'2025-06-10T23:22:55.553' AS DateTime), CAST(180000.00 AS Decimal(10, 2)))
INSERT [dbo].[Payment] ([payment_id], [order_id], [method], [status], [payment_date], [amount]) VALUES (7, 7, N'Thanh toán khi nhận hàng (COD)', N'Đã thanh toán', CAST(N'2025-06-13T23:22:55.553' AS DateTime), CAST(90000.00 AS Decimal(10, 2)))
INSERT [dbo].[Payment] ([payment_id], [order_id], [method], [status], [payment_date], [amount]) VALUES (8, 8, N'Momo', N'Chờ thanh toán', CAST(N'2025-06-15T23:22:55.553' AS DateTime), CAST(400000.00 AS Decimal(10, 2)))
INSERT [dbo].[Payment] ([payment_id], [order_id], [method], [status], [payment_date], [amount]) VALUES (9, 9, N'Chuyển khoản ngân hàng', N'Đã thanh toán', CAST(N'2025-06-17T23:22:55.553' AS DateTime), CAST(160000.00 AS Decimal(10, 2)))
INSERT [dbo].[Payment] ([payment_id], [order_id], [method], [status], [payment_date], [amount]) VALUES (10, 10, N'Thanh toán khi nhận hàng (COD)', N'Đã thanh toán', CAST(N'2025-06-18T23:22:55.553' AS DateTime), CAST(110000.00 AS Decimal(10, 2)))
INSERT [dbo].[Payment] ([payment_id], [order_id], [method], [status], [payment_date], [amount]) VALUES (11, 11, N'Momo', N'Đã thanh toán', CAST(N'2025-06-20T23:22:55.553' AS DateTime), CAST(300000.00 AS Decimal(10, 2)))
INSERT [dbo].[Payment] ([payment_id], [order_id], [method], [status], [payment_date], [amount]) VALUES (12, 12, N'Chuyển khoản ngân hàng', N'Chờ thanh toán', CAST(N'2025-06-21T23:22:55.553' AS DateTime), CAST(220000.00 AS Decimal(10, 2)))
INSERT [dbo].[Payment] ([payment_id], [order_id], [method], [status], [payment_date], [amount]) VALUES (13, 13, N'Thanh toán khi nhận hàng (COD)', N'Thất bại', CAST(N'2025-06-22T23:22:55.553' AS DateTime), CAST(100000.00 AS Decimal(10, 2)))
INSERT [dbo].[Payment] ([payment_id], [order_id], [method], [status], [payment_date], [amount]) VALUES (14, 14, N'Momo', N'Đã thanh toán', CAST(N'2025-06-23T23:22:55.553' AS DateTime), CAST(280000.00 AS Decimal(10, 2)))
INSERT [dbo].[Payment] ([payment_id], [order_id], [method], [status], [payment_date], [amount]) VALUES (15, 15, N'Chuyển khoản ngân hàng', N'Đã thanh toán', CAST(N'2025-06-24T23:22:55.553' AS DateTime), CAST(130000.00 AS Decimal(10, 2)))
INSERT [dbo].[Payment] ([payment_id], [order_id], [method], [status], [payment_date], [amount]) VALUES (16, 16, N'Thanh toán khi nhận hàng (COD)', N'Chờ thanh toán', CAST(N'2025-06-24T23:22:55.553' AS DateTime), CAST(190000.00 AS Decimal(10, 2)))
INSERT [dbo].[Payment] ([payment_id], [order_id], [method], [status], [payment_date], [amount]) VALUES (17, 17, N'Momo', N'Đã thanh toán', CAST(N'2025-06-24T23:22:55.553' AS DateTime), CAST(450000.00 AS Decimal(10, 2)))
INSERT [dbo].[Payment] ([payment_id], [order_id], [method], [status], [payment_date], [amount]) VALUES (18, 18, N'Chuyển khoản ngân hàng', N'Chờ thanh toán', CAST(N'2025-06-24T23:22:55.553' AS DateTime), CAST(210000.00 AS Decimal(10, 2)))
INSERT [dbo].[Payment] ([payment_id], [order_id], [method], [status], [payment_date], [amount]) VALUES (19, 19, N'Thanh toán khi nhận hàng (COD)', N'Đã thanh toán', CAST(N'2025-06-24T23:22:55.553' AS DateTime), CAST(95000.00 AS Decimal(10, 2)))
INSERT [dbo].[Payment] ([payment_id], [order_id], [method], [status], [payment_date], [amount]) VALUES (20, 20, N'Momo', N'Đã thanh toán', CAST(N'2025-06-24T23:22:55.553' AS DateTime), CAST(320000.00 AS Decimal(10, 2)))
SET IDENTITY_INSERT [dbo].[Payment] OFF
GO

SET IDENTITY_INSERT [dbo].[Category] ON

INSERT [dbo].[Category] ([category_id], [name]) VALUES (1, N'Áo')
INSERT [dbo].[Category] ([category_id], [name]) VALUES (2, N'Quần')
INSERT [dbo].[Category] ([category_id], [name]) VALUES (3, N'Váy / Đầm')
INSERT [dbo].[Category] ([category_id], [name]) VALUES (4, N'Giày dép')
INSERT [dbo].[Category] ([category_id], [name]) VALUES (5, N'Túi xách / Ba lô')
INSERT [dbo].[Category] ([category_id], [name]) VALUES (6, N'Phụ kiện đầu')
INSERT [dbo].[Category] ([category_id], [name]) VALUES (7, N'Kính mát')
INSERT [dbo].[Category] ([category_id], [name]) VALUES (8, N'Trang sức')
INSERT [dbo].[Category] ([category_id], [name]) VALUES (9, N'Thắt lưng')
INSERT [dbo].[Category] ([category_id], [name]) VALUES (10, N'Đồ bơi')
INSERT [dbo].[Category] ([category_id], [name]) VALUES (11, N'Đồ ngủ / Ở nhà')
INSERT [dbo].[Category] ([category_id], [name]) VALUES (12, N'Khăn / Phụ kiện khác')
INSERT [dbo].[Category] ([category_id], [name]) VALUES (13, N'Khác')
SET IDENTITY_INSERT [dbo].[Category] OFF
GO

SET IDENTITY_INSERT [dbo].[Product] ON 

INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (1, 1, N'Áo thun cotton', N'Áo thun cotton mềm mại, thoáng mát, phù hợp mọi dịp.', N'Như mới', N'L', N'Be', CAST(202000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'KADNE', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (2, 2, N'Quần jean skinny', N'Quần jean skinny ôm sát, tôn dáng, phong cách hiện đại.', N'Như mới', N'XXL', N'Đen', CAST(74000.00 AS Decimal(10, 2)), N'Đang bán', 2, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (3, 3, N'Váy hoa maxi', N'Váy hoa maxi dài nhẹ nhàng, nữ tính, lý tưởng cho mùa hè.', N'Mới 99%', N'XL', N'Đỏ', CAST(262000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (4, 4, N'Áo sơ mi caro', N'Áo sơ mi caro trẻ trung, dễ phối đồ, phù hợp công sở.', N'Mới 99%', N'M', N'Vàng', CAST(493000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (5, 5, N'Chân váy denim rách', N'Chân váy denim rách cá tính, năng động, hợp xu hướng.', N'Mới 99%', N'XXL', N'Xám', CAST(467000.00 AS Decimal(10, 2)), N'Đang bán', 3, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (6, 6, N'Áo khoác dù', N'Áo khoác dù chống thấm, gọn nhẹ, phù hợp ngày mưa.', N'Đã qua sử dụng', N'Freesize', N'Đen', CAST(240000.00 AS Decimal(10, 2)), N'Đang bán', 2, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (7, 7, N'Quần kaki ống rộng', N'Quần kaki ống rộng thoải mái, thanh lịch, dễ phối đồ.', N'Đã qua sử dụng', N'Freesize', N'Xám', CAST(166000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'QMT', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (8, 8, N'Đầm suông linen', N'Đầm suông linen thoáng mát, đơn giản, phù hợp ngày hè.', N'Tốt', N'Freesize', N'Xanh lá', CAST(366000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (9, 9, N'Áo len cổ lọ họa tiết', N'Áo len cổ lọ họa tiết ấm áp, thời trang, hợp mùa đông.', N'Khá', N'M', N'Trắng', CAST(212000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (10, 10, N'Quần short thể thao', N'Quần short thể thao năng động, co giãn, lý tưởng tập luyện.', N'Như mới', N'M', N'Nâu', CAST(315000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'Codes', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (11, 11, N'Giày sneaker', N'Giày sneaker thời trang, êm ái, phù hợp mọi phong cách.', N'Đã qua sử dụng', N'XXL', N'Vàng', CAST(130000.00 AS Decimal(10, 2)), N'Đang bán', 2, 4, N'Unitsuka Tiger', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (12, 12, N'Túi xách da', N'Túi xách da cao cấp, bền đẹp, phù hợp công sở và dạo phố.', N'Đã qua sử dụng', N'M', N'Tím', CAST(131000.00 AS Decimal(10, 2)), N'Đang bán', 1, 5, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (13, 13, N'Nón lưỡi trai', N'Nón lưỡi trai trẻ trung, năng động, chống nắng hiệu quả.', N'Tốt', N'S', N'Hồng', CAST(395000.00 AS Decimal(10, 2)), N'Đang bán', 1, 6, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (14, 14, N'Kính râm thời trang', N'Kính râm thời trang, bảo vệ mắt, nâng tầm phong cách.', N'Đã qua sử dụng', N'XL', N'Tím', CAST(319000.00 AS Decimal(10, 2)), N'Đang bán', 1, 7, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (15, 15, N'Đồng hồ đeo tay', N'Đồng hồ đeo tay tinh tế, thanh lịch, phù hợp mọi dịp.', N'Hư nhẹ', N'M', N'Xanh lá', CAST(370000.00 AS Decimal(10, 2)), N'Đang bán', 1, 13, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (16, 16, N'Áo hoodie nỉ', N'Áo hoodie nỉ ấm áp, thoải mái, phong cách đường phố.', N'Khá', N'L', N'Xanh dương', CAST(457000.00 AS Decimal(10, 2)), N'Đang bán', 3, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (17, 17, N'Quần jogger thun', N'Quần jogger thun co giãn, năng động, phù hợp casual.', N'Hư nhẹ', N'L', N'Xanh dương', CAST(192000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (18, 18, N'Đồ bơi một mảnh', N'Đồ bơi một mảnh gợi cảm, ôm sát, phù hợp bãi biển.', N'Khá', N'L', N'Be', CAST(355000.00 AS Decimal(10, 2)), N'Đang bán', 1, 10, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (19, 19, N'Bộ pyjama lụa', N'Bộ pyjama lụa mềm mại, sang trọng, thoải mái khi ngủ.', N'Tốt', N'XL', N'Xám', CAST(489000.00 AS Decimal(10, 2)), N'Đang bán', 1, 11, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (20, 20, N'Áo polo nam', N'Áo polo nam lịch lãm, gọn gàng, phù hợp công sở.', N'Hư nhẹ', N'M', N'Hồng', CAST(381000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (21, 21, N'Áo thun cổ tròn', N'Áo thun cổ tròn basic, dễ phối đồ, phù hợp mọi dáng.', N'Đã qua sử dụng', N'L', N'Hồng', CAST(393000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (22, 22, N'Quần tây ống suông', N'Quần tây ống suông thanh lịch, chuyên nghiệp, lý tưởng công sở.', N'Tốt', N'XXL', N'Hồng', CAST(146000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (23, 23, N'Váy đầm công sở', N'Váy đầm công sở trang nhã, tôn dáng, phù hợp văn phòng.', N'Khá', N'M', N'Đỏ', CAST(251000.00 AS Decimal(10, 2)), N'Đang bán', 2, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (24, 24, N'Áo sơ mi lụa', N'Áo sơ mi lụa mềm mại, sang trọng, phù hợp sự kiện.', N'Như mới', N'Freesize', N'Xám', CAST(314000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (25, 25, N'Chân váy xếp ly', N'Chân váy xếp ly nhẹ nhàng, nữ tính, dễ phối đồ.', N'Hư nhẹ', N'S', N'Đen', CAST(400000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (26, 26, N'Áo khoác da', N'Áo khoác da cá tính, thời thượng, hợp phong cách mùa đông.', N'Tốt', N'L', N'Nâu', CAST(252000.00 AS Decimal(10, 2)), N'Đang bán', 4, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (27, 27, N'Quần culottes', N'Quần culottes thoải mái, hiện đại, phù hợp dạo phố.', N'Khá', N'Freesize', N'Xám', CAST(126000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (28, 28, N'Đầm dạ hội', N'Đầm dạ hội lộng lẫy, sang trọng, lý tưởng tiệc tối.', N'Mới 99%', N'XXL', N'Đen', CAST(368000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (29, 29, N'Áo len cardigan', N'Áo len cardigan mỏng nhẹ, ấm áp, dễ phối nhiều phong cách.', N'Mới 99%', N'XXL', N'Trắng', CAST(194000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'LOUSTIC', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (30, 30, N'Quần short jeans', N'Quần short jeans năng động, trẻ trung, hợp mùa hè.', N'Đã qua sử dụng', N'S', N'Xanh dương', CAST(267000.00 AS Decimal(10, 2)), N'Đang bán', 3, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (31, 31, N'Giày cao gót', N'Giày cao gót thanh lịch, tôn dáng, phù hợp sự kiện.', N'Hư nhẹ', N'XL', N'Đỏ', CAST(424000.00 AS Decimal(10, 2)), N'Đang bán', 1, 4, N'BIGTREE', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (32, 32, N'Túi tote vải', N'Túi tote vải đơn giản, tiện dụng, phù hợp đi làm, đi học.', N'Hư nhẹ', N'XXL', N'Nâu', CAST(301000.00 AS Decimal(10, 2)), N'Đang bán', 1, 5, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (33, 33, N'Mũ bucket', N'Mũ bucket thời trang, năng động, hợp phong cách đường phố.', N'Tốt', N'XL', N'Vàng', CAST(308000.00 AS Decimal(10, 2)), N'Đang bán', 1, 6, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (34, 34, N'Kính mát gọng tròn', N'Kính mát gọng tròn cổ điển, thời thượng, bảo vệ mắt.', N'Đã qua sử dụng', N'M', N'Cam', CAST(235000.00 AS Decimal(10, 2)), N'Đang bán', 1, 7, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (35, 35, N'Thắt lưng da', N'Thắt lưng da bền đẹp, tinh tế, nâng tầm outfit.', N'Như mới', N'S', N'Xanh dương', CAST(407000.00 AS Decimal(10, 2)), N'Đang bán', 2, 9, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (36, 36, N'Áo hoodie oversize', N'Áo hoodie oversize thoải mái, cá tính, phong cách Gen Z.', N'Đã qua sử dụng', N'S', N'Xanh dương', CAST(312000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (37, 37, N'Quần legging thể thao', N'Quần legging thể thao co giãn, ôm sát, lý tưởng tập gym.', N'Tốt', N'S', N'Tím', CAST(187000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (38, 38, N'Đồ bơi bikini', N'Đồ bơi bikini quyến rũ, thời trang, phù hợp bãi biển.', N'Đã qua sử dụng', N'Freesize', N'Be', CAST(352000.00 AS Decimal(10, 2)), N'Đang bán', 1, 10, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (39, 39, N'Bộ pyjama cotton', N'Bộ pyjama cotton thoáng mát, nhẹ nhàng, lý tưởng nghỉ ngơi.', N'Tốt', N'M', N'Xám', CAST(222000.00 AS Decimal(10, 2)), N'Đang bán', 3, 11, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (40, 40, N'Áo polo nữ', N'Áo polo nữ trẻ trung, năng động, phù hợp dạo phố.', N'Mới 99%', N'L', N'Tím', CAST(278000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'AVANO', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (41, 41, N'Áo thun dài tay', N'Áo thun dài tay mỏng nhẹ, thoải mái, phù hợp mùa thu.', N'Mới 99%', N'Freesize', N'Tím', CAST(282000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'TO-BANYI', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (42, 42, N'Quần jean boyfriend', N'Quần jean boyfriend rộng rãi, cá tính, hợp phong cách casual.', N'Mới 99%', N'Freesize', N'Nâu', CAST(241000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'VANIZEN', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (43, 43, N'Váy yếm denim', N'Váy yếm denim năng động, trẻ trung, dễ phối đồ.', N'Đã qua sử dụng', N'L', N'Tím', CAST(215000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'GENVIET JEANS', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (44, 44, N'Áo sơ mi oversize', N'Áo sơ mi oversize thoải mái, thời thượng, phù hợp dạo phố.', N'Tốt', N'XXL', N'Nâu', CAST(463000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'MEMO TOP', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (45, 45, N'Chân váy bút chì', N'Chân váy bút chì ôm sát, thanh lịch, lý tưởng công sở.', N'Như mới', N'XL', N'Đen', CAST(368000.00 AS Decimal(10, 2)), N'Đang bán', 2, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (46, 46, N'Áo khoác phao', N'Áo khoác phao ấm áp, gọn nhẹ, phù hợp mùa đông lạnh.', N'Mới 99%', N'M', N'Trắng', CAST(110000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'CATTER', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (47, 47, N'Quần ống loe', N'Quần ống loe thời trang, thanh lịch, tôn dáng hiệu quả.', N'Hư nhẹ', N'XXL', N'Cam', CAST(176000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (48, 48, N'Đầm ôm bodycon', N'Đầm ôm bodycon gợi cảm, sang trọng, lý tưởng tiệc tối.', N'Tốt', N'M', N'Đỏ', CAST(205000.00 AS Decimal(10, 2)), N'Đang bán', 2, 3, N'VITRAN BOUTIQUE', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (49, 49, N'Áo len cổ V', N'Áo len cổ V nhẹ nhàng, thanh lịch, dễ phối đồ.', N'Khá', N'L', N'Tím', CAST(71000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (50, 50, N'Quần short kaki', N'Quần short kaki thoải mái, trẻ trung, phù hợp mùa hè.', N'Tốt', N'S', N'Đỏ', CAST(367000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (51, 1, N'Giày sandal', N'Giày sandal thoáng mát, thời trang, lý tưởng ngày hè.', N'Hư nhẹ', N'Freesize', N'Xám', CAST(411000.00 AS Decimal(10, 2)), N'Đang bán', 1, 4, N'RUNDO', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (52, 2, N'Túi đeo chéo', N'Túi đeo chéo tiện dụng, nhỏ gọn, phù hợp dạo phố.', N'Như mới', N'XXL', N'Tím', CAST(252000.00 AS Decimal(10, 2)), N'Đang bán', 2, 5, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (53, 3, N'Mũ beret len', N'Mũ beret len thanh lịch, nữ tính, hợp phong cách mùa thu.', N'Đã qua sử dụng', N'M', N'Cam', CAST(80000.00 AS Decimal(10, 2)), N'Đang bán', 1, 6, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (54, 4, N'Kính mát mắt mèo', N'Kính mát mắt mèo thời thượng, cá tính, bảo vệ mắt.', N'Mới 99%', N'S', N'Vàng', CAST(303000.00 AS Decimal(10, 2)), N'Đang bán', 1, 7, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (55, 5, N'Vòng tay bạc', N'Vòng tay bạc tinh tế, sang trọng, phù hợp mọi outfit.', N'Hư nhẹ', N'XXL', N'Hồng', CAST(284000.00 AS Decimal(10, 2)), N'Đang bán', 1, 8, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (56, 6, N'Áo hoodie crop top', N'Áo hoodie crop top trẻ trung, năng động, hợp phong cách Gen Z.', N'Khá', N'M', N'Vàng', CAST(378000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'Today Wear', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (57, 7, N'Quần jogger kaki', N'Quần jogger kaki thoải mái, thanh lịch, dễ phối đồ.', N'Khá', N'Freesize', N'Vàng', CAST(294000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (58, 8, N'Đồ bơi cao cấp', N'Đồ bơi cao cấp gợi cảm, thời trang, lý tưởng du lịch biển.', N'Hư nhẹ', N'M', N'Vàng', CAST(221000.00 AS Decimal(10, 2)), N'Đang bán', 3, 10, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (59, 9, N'Bộ ngủ lụa cao cấp', N'Bộ ngủ lụa cao cấp mềm mại, sang trọng, thoải mái khi ngủ.', N'Hư nhẹ', N'S', N'Xanh dương', CAST(197000.00 AS Decimal(10, 2)), N'Đang bán', 1, 11, N'ZENME', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (60, 10, N'Áo thun in họa tiết', N'Áo thun in họa tiết cá tính, trẻ trung, phù hợp dạo phố.', N'Tốt', N'L', N'Vàng', CAST(203000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'SANCOOL®', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (61, 11, N'Quần tây công sở', N'Quần tây công sở thanh lịch, chuyên nghiệp, lý tưởng văn phòng.', N'Khá', N'XL', N'Vàng', CAST(289000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (62, 12, N'Váy maxi lụa', N'Váy maxi lụa nhẹ nhàng, sang trọng, phù hợp sự kiện.', N'Khá', N'M', N'Cam', CAST(472000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (63, 13, N'Áo sơ mi trắng', N'Áo sơ mi trắng tinh khôi, thanh lịch, phù hợp mọi dịp.', N'Khá', N'L', N'Vàng', CAST(104000.00 AS Decimal(10, 2)), N'Đang bán', 2, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (64, 14, N'Chân váy hoa nhí', N'Chân váy hoa nhí nữ tính, nhẹ nhàng, lý tưởng mùa hè.', N'Mới 99%', N'S', N'Xanh lá', CAST(390000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'MYAN', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (65, 15, N'Áo khoác bomber', N'Áo khoác bomber năng động, cá tính, hợp phong cách đường phố.', N'Đã qua sử dụng', N'XL', N'Xanh dương', CAST(227000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (66, 16, N'Quần palazzo', N'Quần palazzo rộng rãi, thanh lịch, tôn dáng hiệu quả.', N'Mới 99%', N'M', N'Vàng', CAST(119000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (67, 17, N'Đầm ren trắng', N'Đầm ren trắng tinh tế, sang trọng, lý tưởng tiệc cưới.', N'Khá', N'S', N'Tím', CAST(57000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (68, 18, N'Áo len mỏng', N'Áo len mỏng nhẹ nhàng, thoải mái, phù hợp mùa thu.', N'Hư nhẹ', N'S', N'Tím', CAST(123000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'YODY', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (69, 19, N'Quần short lụa', N'Quần short lụa mềm mại, sang trọng, phù hợp dạo phố.', N'Như mới', N'Freesize', N'Xanh lá', CAST(121000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'CARDINA', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (70, 20, N'Giày bốt cổ thấp', N'Giày bốt cổ thấp thời trang, bền đẹp, hợp mùa đông.', N'Đã qua sử dụng', N'XL', N'Trắng', CAST(97000.00 AS Decimal(10, 2)), N'Đang bán', 1, 4, N'IELGY', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (71, 21, N'Túi clutch da', N'Túi clutch da sang trọng, nhỏ gọn, lý tưởng tiệc tối.', N'Đã qua sử dụng', N'S', N'Hồng', CAST(425000.00 AS Decimal(10, 2)), N'Đang bán', 3, 5, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (72, 22, N'Nón snapback', N'Nón snapback trẻ trung, năng động, hợp phong cách streetwear.', N'Đã qua sử dụng', N'M', N'Cam', CAST(346000.00 AS Decimal(10, 2)), N'Đang bán', 1, 6, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (73, 23, N'Kính gọng vuông', N'Kính gọng vuông thời thượng, cá tính, bảo vệ mắt.', N'Như mới', N'XXL', N'Xám', CAST(269000.00 AS Decimal(10, 2)), N'Đang bán', 1, 7, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (74, 24, N'Dây nịt bản nhỏ', N'Dây nịt bản nhỏ tinh tế, thanh lịch, nâng tầm outfit.', N'Tốt', N'M', N'Cam', CAST(136000.00 AS Decimal(10, 2)), N'Đang bán', 1, 9, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (75, 25, N'Áo hoodie dài', N'Áo hoodie dài ấm áp, thoải mái, phù hợp mùa đông.', N'Khá', N'XXL', N'Vàng', CAST(226000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'ZANZEA®', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (76, 26, N'Quần legging da', N'Quần legging da cá tính, thời trang, hợp phong cách dạo phố.', N'Tốt', N'S', N'Trắng', CAST(189000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (77, 27, N'Đồ bơi cut-out', N'Đồ bơi cut-out gợi cảm, hiện đại, lý tưởng bãi biển.', N'Mới 99%', N'S', N'Đen', CAST(302000.00 AS Decimal(10, 2)), N'Đang bán', 2, 10, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (78, 28, N'Bộ pyjama họa tiết', N'Bộ pyjama họa tiết vui nhộn, thoải mái, lý tưởng nghỉ ngơi.', N'Khá', N'M', N'Nâu', CAST(390000.00 AS Decimal(10, 2)), N'Đang bán', 1, 11, N'Thời trang gia đình VT', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (79, 29, N'Áo polo cổ bẻ', N'Áo polo cổ bẻ thanh lịch, trẻ trung, phù hợp công sở.', N'Tốt', N'XXL', N'Be', CAST(141000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'CANIFA', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (80, 30, N'Áo thun crop top', N'Áo thun crop top trẻ trung, năng động, hợp mùa hè.', N'Khá', N'XXL', N'Nâu', CAST(347000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'LIVAN', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (81, 31, N'Quần jean ống đứng', N'Quần jean ống đứng thoải mái, thời trang, dễ phối đồ.', N'Như mới', N'S', N'Xanh dương', CAST(264000.00 AS Decimal(10, 2)), N'Đang bán', 3, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (82, 32, N'Váy đầm trễ vai', N'Váy đầm trễ vai nữ tính, quyến rũ, lý tưởng tiệc tối.', N'Đã qua sử dụng', N'XL', N'Cam', CAST(301000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'LE′COONG', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (83, 33, N'Áo sơ mi denim', N'Áo sơ mi denim năng động, cá tính, phù hợp dạo phố.', N'Mới 99%', N'XXL', N'Đỏ', CAST(90000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (84, 34, N'Chân váy da', N'Chân váy da sang trọng, thời thượng, hợp phong cách công sở.', N'Khá', N'L', N'Xanh lá', CAST(117000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'MYWAY', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (85, 35, N'Áo khoác trench coat', N'Áo khoác trench coat thanh lịch, cổ điển, phù hợp mùa thu.', N'Mới 99%', N'XXL', N'Trắng', CAST(478000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'ADORE DRESS', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (86, 36, N'Quần ống culottes', N'Quần ống culottes thời trang, thoải mái, dễ phối đồ.', N'Như mới', N'Freesize', N'Xám', CAST(487000.00 AS Decimal(10, 2)), N'Đang bán', 2, 2, N'SIXDO', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (87, 37, N'Đầm tiểu thư', N'Đầm tiểu thư nhẹ nhàng, nữ tính, lý tưởng dạ tiệc.', N'Khá', N'M', N'Hồng', CAST(274000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (88, 38, N'Áo len oversize', N'Áo len oversize thoải mái, ấm áp, hợp phong cách casual.', N'Đã qua sử dụng', N'L', N'Đen', CAST(388000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'GK', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (89, 39, N'Quần short vải thô', N'Quần short vải thô thoáng mát, trẻ trung, phù hợp mùa hè.', N'Như mới', N'XXL', N'Be', CAST(325000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'BRAVERY', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (90, 40, N'Giày slip-on', N'Giày slip-on tiện dụng, thời trang, phù hợp dạo phố.', N'Tốt', N'L', N'Đen', CAST(184000.00 AS Decimal(10, 2)), N'Đang bán', 1, 4, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (91, 41, N'Túi xách tote da', N'Túi xách tote da cao cấp, bền đẹp, lý tưởng công sở.', N'Khá', N'Freesize', N'Đỏ', CAST(159000.00 AS Decimal(10, 2)), N'Đang bán', 1, 5, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (92, 42, N'Mũ len beanie', N'Mũ len beanie ấm áp, thời trang, hợp mùa đông.', N'Đã qua sử dụng', N'M', N'Tím', CAST(353000.00 AS Decimal(10, 2)), N'Đang bán', 1, 6, N'MWAH.', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (93, 43, N'Kính mát gọng kim loại', N'Kính mát gọng kim loại tinh tế, hiện đại, bảo vệ mắt.', N'Đã qua sử dụng', N'Freesize', N'Be', CAST(131000.00 AS Decimal(10, 2)), N'Đang bán', 1, 7, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (94, 44, N'Khăn quàng cổ lụa', N'Khăn quàng cổ lụa sang trọng, nhẹ nhàng, nâng tầm outfit.', N'Mới 99%', N'L', N'Tím', CAST(371000.00 AS Decimal(10, 2)), N'Đang bán', 3, 12, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (95, 45, N'Áo hoodie in chữ', N'Áo hoodie in chữ cá tính, trẻ trung, phong cách đường phố.', N'Khá', N'XL', N'Tím', CAST(122000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'WIND', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (96, 46, N'Quần jogger da', N'Quần jogger da sang trọng, thời thượng, hợp dạo phố.', N'Như mới', N'M', N'Xanh dương', CAST(470000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (97, 47, N'Đồ bơi tankini', N'Đồ bơi tankini thoải mái, thời trang, lý tưởng bãi biển.', N'Như mới', N'Freesize', N'Xám', CAST(446000.00 AS Decimal(10, 2)), N'Đang bán', 1, 10, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (98, 48, N'Bộ ngủ cotton', N'Bộ ngủ cotton nhẹ nhàng, thoáng mát, lý tưởng nghỉ ngơi.', N'Khá', N'XL', N'Be', CAST(212000.00 AS Decimal(10, 2)), N'Đang bán', 1, 11, N'Thời trang gia đình VT', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (99, 49, N'Áo polo dài tay', N'Áo polo dài tay thanh lịch, chuyên nghiệp, phù hợp công sở.', N'Hư nhẹ', N'Freesize', N'Cam', CAST(372000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
GO
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (100, 50, N'Áo thun cổ tim', N'Áo thun cổ tim nữ tính, thoải mái, dễ phối đồ.', N'Đã qua sử dụng', N'M', N'Đen', CAST(111000.00 AS Decimal(10, 2)), N'Đang bán', 2, 1, N'MISOUL MALL', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (101, 1, N'Quần tây ống côn', N'Quần tây ống côn ôm sát, thanh lịch, lý tưởng văn phòng.', N'Như mới', N'XXL', N'Đỏ', CAST(113000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (102, 2, N'Váy xòe midi', N'Váy xòe midi nhẹ nhàng, nữ tính, phù hợp dạo phố.', N'Khá', N'Freesize', N'Cam', CAST(297000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (103, 3, N'Áo sơ mi họa tiết', N'Áo sơ mi họa tiết trẻ trung, năng động, dễ phối đồ.', N'Mới 99%', N'M', N'Hồng', CAST(394000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (104, 4, N'Chân váy tennis', N'Chân váy tennis năng động, thời trang, lý tưởng casual.', N'Như mới', N'L', N'Be', CAST(292000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'REETA', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (105, 5, N'Áo khoác gió', N'Áo khoác gió gọn nhẹ, chống thấm, phù hợp ngày mưa.', N'Hư nhẹ', N'L', N'Đỏ', CAST(159000.00 AS Decimal(10, 2)), N'Đang bán', 3, 1, N'AVANCO', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (106, 6, N'Quần culottes lụa', N'Quần culottes lụa mềm mại, sang trọng, hợp phong cách công sở.', N'Như mới', N'M', N'Đen', CAST(314000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (107, 7, N'Đầm voan hoa', N'Đầm voan hoa nhẹ nhàng, nữ tính, lý tưởng mùa hè.', N'Như mới', N'Freesize', N'Xanh dương', CAST(259000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'MODAVA', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (108, 8, N'Áo len cổ tròn', N'Áo len cổ tròn ấm áp, thoải mái, phù hợp mùa đông.', N'Tốt', N'S', N'Hồng', CAST(403000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'DYACI', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (109, 9, N'Quần short da', N'Quần short da sang trọng, thời thượng, hợp dạo phố.', N'Mới 99%', N'L', N'Đen', CAST(404000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'ROWAY', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (110, 10, N'Giày bốt cổ cao', N'Giày bốt cổ cao thời trang, bền đẹp, lý tưởng mùa đông.', N'Khá', N'S', N'Đỏ', CAST(334000.00 AS Decimal(10, 2)), N'Đang bán', 1, 4, N'LAVINA CARPIO', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (111, 11, N'Túi đeo vai', N'Túi đeo vai tiện dụng, thời trang, phù hợp dạo phố.', N'Như mới', N'XL', N'Be', CAST(400000.00 AS Decimal(10, 2)), N'Đang bán', 1, 5, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (112, 12, N'Nón fedora', N'Nón fedora thanh lịch, cổ điển, hợp phong cách mùa thu.', N'Như mới', N'S', N'Đen', CAST(296000.00 AS Decimal(10, 2)), N'Đang bán', 2, 6, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (113, 13, N'Kính mát oversize', N'Kính mát oversize thời thượng, cá tính, bảo vệ mắt.', N'Mới 99%', N'XL', N'Tím', CAST(60000.00 AS Decimal(10, 2)), N'Đang bán', 1, 7, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (114, 14, N'Vòng cổ ngọc trai', N'Vòng cổ ngọc trai sang trọng, tinh tế, phù hợp sự kiện.', N'Như mới', N'L', N'Xanh lá', CAST(149000.00 AS Decimal(10, 2)), N'Đang bán', 1, 8, N'DREJEW', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (115, 15, N'Áo hoodie basic', N'Áo hoodie basic đơn giản, thoải mái, phong cách casual.', N'Như mới', N'Freesize', N'Nâu', CAST(132000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'LUCID', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (116, 16, N'Quần jogger vải thô', N'Quần jogger vải thô thoáng mát, trẻ trung, dễ phối đồ.', N'Đã qua sử dụng', N'M', N'Đen', CAST(171000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (117, 17, N'Đồ bơi cổ yếm', N'Đồ bơi cổ yếm gợi cảm, thời trang, lý tưởng bãi biển.', N'Mới 99%', N'Freesize', N'Trắng', CAST(346000.00 AS Decimal(10, 2)), N'Đang bán', 1, 10, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (118, 18, N'Bộ pyjama ngắn', N'Bộ pyjama ngắn nhẹ nhàng, thoải mái, phù hợp mùa hè.', N'Như mới', N'XXL', N'Đỏ', CAST(409000.00 AS Decimal(10, 2)), N'Đang bán', 2, 11, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (119, 19, N'Áo polo slim fit', N'Áo polo slim fit ôm sát, thanh lịch, phù hợp công sở.', N'Tốt', N'L', N'Xanh dương', CAST(341000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (120, 20, N'Áo thun tay lỡ', N'Áo thun tay lỡ mỏng nhẹ, thời trang, phù hợp mùa thu.', N'Mới 99%', N'XXL', N'Be', CAST(55000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'LUCID', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (121, 21, N'Quần jean rách', N'Quần jean rách cá tính, năng động, hợp phong cách đường phố.', N'Đã qua sử dụng', N'XXL', N'Tím', CAST(430000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (122, 22, N'Váy đầm peplum', N'Váy đầm peplum thanh lịch, tôn dáng, lý tưởng công sở.', N'Đã qua sử dụng', N'S', N'Tím', CAST(217000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'MODOVA', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (123, 23, N'Áo sơ mi lanh', N'Áo sơ mi lanh thoáng mát, nhẹ nhàng, phù hợp mùa hè.', N'Như mới', N'L', N'Xanh lá', CAST(297000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (124, 24, N'Chân váy chữ A', N'Chân váy chữ A nữ tính, dễ phối đồ, hợp mọi dáng người.', N'Khá', N'Freesize', N'Trắng', CAST(264000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'TOTOSA', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (125, 25, N'Áo khoác lông', N'Áo khoác lông sang trọng, ấm áp, lý tưởng mùa đông.', N'Khá', N'XXL', N'Đen', CAST(499000.00 AS Decimal(10, 2)), N'Đang bán', 3, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (126, 26, N'Quần kaki ống côn', N'Quần kaki ống côn thanh lịch, trẻ trung, phù hợp công sở.', N'Đã qua sử dụng', N'XL', N'Tím', CAST(374000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (127, 27, N'Đầm maxi voan', N'Đầm maxi lanh thoáng mát, nhẹ nhàng, lý tưởng mùa hè.', N'Mới 99%', N'M', N'Xanh lá', CAST(186000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (128, 28, N'Áo len gile', N'Áo len gile mỏng nhẹ, thời trang, dễ phối đồ.', N'Đã qua sử dụng', N'XL', N'Vàng', CAST(83000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (129, 29, N'Quần short culottes', N'Quần short culottes thoải mái, hiện đại, phù hợp dạo phố.', N'Tốt', N'XL', N'Xanh dương', CAST(223000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (130, 30, N'Giày oxford', N'Giày oxford thanh lịch, bền đẹp, phù hợp công sở.', N'Đã qua sử dụng', N'M', N'Be', CAST(183000.00 AS Decimal(10, 2)), N'Đang bán', 2, 4, N'SIGOURNEY', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (131, 31, N'Túi xách mini', N'Túi xách mini nhỏ gọn, thời trang, lý tưởng tiệc tối.', N'Tốt', N'L', N'Xanh dương', CAST(274000.00 AS Decimal(10, 2)), N'Đang bán', 1, 5, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (132, 32, N'Mũ lưỡi trai da', N'Mũ lưỡi trai da sang trọng, cá tính, hợp phong cách streetwear.', N'Đã qua sử dụng', N'XXL', N'Tím', CAST(339000.00 AS Decimal(10, 2)), N'Đang bán', 1, 6, N'jussy', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (133, 33, N'Kính mát gọng trong', N'Kính mát gọng trong hiện đại, tinh tế, bảo vệ mắt.', N'Khá', N'Freesize', N'Xanh dương', CAST(277000.00 AS Decimal(10, 2)), N'Đang bán', 1, 7, N'TEROKK', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (134, 34, N'Thắt lưng bản to', N'Thắt lưng bản to thời thượng, nổi bật, nâng tầm outfit.', N'Đã qua sử dụng', N'L', N'Cam', CAST(230000.00 AS Decimal(10, 2)), N'Đang bán', 3, 9, N'BADBIRD', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (135, 35, N'Áo hoodie tay dài', N'Áo hoodie tay dài ấm áp, thoải mái, phù hợp mùa đông.', N'Đã qua sử dụng', N'M', N'Tím', CAST(477000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (136, 36, N'Quần legging in họa tiết', N'Quần legging in họa tiết cá tính, năng động, lý tưởng tập gym.', N'Đã qua sử dụng', N'S', N'Trắng', CAST(357000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'GYM OHF', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (137, 37, N'Đồ bơi thể thao', N'Đồ bơi thể thao thoải mái, thời trang, phù hợp bơi lội.', N'Như mới', N'L', N'Đen', CAST(256000.00 AS Decimal(10, 2)), N'Đang bán', 1, 10, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (138, 38, N'Bộ ngủ lụa ngắn', N'Bộ ngủ lụa ngắn sang trọng, mềm mại, lý tưởng mùa hè.', N'Tốt', N'L', N'Đỏ', CAST(192000.00 AS Decimal(10, 2)), N'Đang bán', 1, 11, N'LOIRE', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (139, 39, N'Áo polo nữ slim fit', N'Áo polo nữ slim fit ôm sát, thanh lịch, phù hợp dạo phố.', N'Đã qua sử dụng', N'M', N'Vàng', CAST(287000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'KAYLIN', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (140, 40, N'Áo thun in logo', N'Áo thun in logo trẻ trung, năng động, dễ phối đồ.', N'Tốt', N'L', N'Vàng', CAST(297000.00 AS Decimal(10, 2)), N'Đang bán', 2, 1, N'PN STORE', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (141, 41, N'Quần tây caro', N'Quần tây caro thanh lịch, thời trang, lý tưởng công sở.', N'Hư nhẹ', N'M', N'Tím', CAST(78000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (142, 42, N'Váy yếm vải thô', N'Váy yếm vải thô thoáng mát, trẻ trung, phù hợp mùa hè.', N'Đã qua sử dụng', N'M', N'Xanh dương', CAST(82000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'CAYLEO', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (143, 43, N'Áo sơ mi tay bồng', N'Áo sơ mi tay bồng nữ tính, sang trọng, lý tưởng sự kiện.', N'Hư nhẹ', N'M', N'Đen', CAST(284000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'ZOMI', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (144, 44, N'Chân váy maxi', N'Chân váy maxi nhẹ nhàng, nữ tính, phù hợp dạo phố.', N'Khá', N'M', N'Vàng', CAST(255000.00 AS Decimal(10, 2)), N'Đang bán', 3, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (145, 45, N'Áo khoác parka', N'Áo khoác parka ấm áp, bền đẹp, lý tưởng mùa đông.', N'Mới 99%', N'L', N'Tím', CAST(413000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'DGC', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (146, 46, N'Quần ống rộng lụa', N'Quần ống rộng lụa mềm mại, sang trọng, tôn dáng.', N'Đã qua sử dụng', N'M', N'Xám', CAST(457000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (147, 47, N'Đầm sơ mi', N'Đầm sơ mi năng động, thoải mái, phù hợp công sở.', N'Đã qua sử dụng', N'S', N'Xám', CAST(108000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'SANJOLI', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (148, 48, N'Áo len dài tay', N'Áo len dài tay ấm áp, thời trang, phù hợp mùa đông.', N'Đã qua sử dụng', N'M', N'Hồng', CAST(307000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (149, 49, N'Quần short linen', N'Quần short linen thoáng mát, nhẹ nhàng, lý tưởng mùa hè.', N'Hư nhẹ', N'S', N'Be', CAST(414000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (150, 50, N'Giày mule', N'Giày mule thời trang, tiện dụng, phù hợp dạo phố.', N'Đã qua sử dụng', N'M', N'Xanh dương', CAST(383000.00 AS Decimal(10, 2)), N'Đang bán', 1, 4, N'DINCOX', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (151, 1, N'Túi đeo lưng', N'Túi đeo lưng nhỏ gọn, năng động, lý tưởng du lịch.', N'Mới 99%', N'XXL', N'Be', CAST(280000.00 AS Decimal(10, 2)), N'Đang bán', 2, 5, N'TROY', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (152, 2, N'Nón baker boy', N'Nón baker boy thanh lịch, thời trang, hợp phong cách mùa thu.', N'Mới 99%', N'Freesize', N'Đỏ', CAST(78000.00 AS Decimal(10, 2)), N'Đang bán', 1, 6, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (153, 3, N'Kính mát gọng màu', N'Kính mát gọng màu cá tính, nổi bật, bảo vệ mắt.', N'Tốt', N'Freesize', N'Hồng', CAST(178000.00 AS Decimal(10, 2)), N'Đang bán', 1, 7, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (154, 4, N'Dây chuyền vàng', N'Dây chuyền vàng sang trọng, tinh tế, phù hợp sự kiện.', N'Mới 99%', N'XL', N'Vàng', CAST(245000.00 AS Decimal(10, 2)), N'Đang bán', 1, 8, N'BẢO TÍN MẠNH HẢI', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (155, 5, N'Áo hoodie cổ tròn', N'Áo hoodie cổ tròn thoải mái, đơn giản, phong cách casual.', N'Khá', N'L', N'Vàng', CAST(419000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'TEELAB STUDIO', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (156, 6, N'Quần jogger linen', N'Quần jogger linen thoáng mát, trẻ trung, phù hợp mùa hè.', N'Hư nhẹ', N'S', N'Tím', CAST(303000.00 AS Decimal(10, 2)), N'Đang bán', 3, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (157, 7, N'Đồ bơi cao cổ', N'Đồ bơi cao cổ gợi cảm, thời trang, lý tưởng bãi biển.', N'Khá', N'Freesize', N'Tím', CAST(165000.00 AS Decimal(10, 2)), N'Đang bán', 1, 10, N'DOVEWILL', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (158, 8, N'Bộ pyjama dài tay', N'Bộ pyjama dài tay ấm áp, thoải mái, phù hợp mùa đông.', N'Mới 99%', N'S', N'Xanh lá', CAST(152000.00 AS Decimal(10, 2)), N'Đang bán', 1, 11, N'ZENME', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (159, 9, N'Áo polo cotton', N'Áo polo cotton thoáng mát, thanh lịch, phù hợp công sở.', N'Hư nhẹ', N'Freesize', N'Trắng', CAST(370000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (160, 10, N'Áo thun oversize', N'Áo thun oversize thoải mái, cá tính, hợp phong cách đường phố.', N'Như mới', N'Freesize', N'Vàng', CAST(195000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (161, 11, N'Quần jean ống loe', N'Quần jean ống loe thời trang, tôn dáng, dễ phối đồ.', N'Tốt', N'M', N'Xanh lá', CAST(376000.00 AS Decimal(10, 2)), N'Đang bán', 2, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (162, 12, N'Váy hoa nhí', N'Váy hoa nhí nhẹ nhàng, nữ tính, lý tưởng mùa hè.', N'Như mới', N'M', N'Xanh lá', CAST(227000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (163, 13, N'Áo sơ mi kẻ sọc', N'Áo sơ mi kẻ sọc thanh lịch, trẻ trung, phù hợp công sở.', N'Khá', N'XXL', N'Trắng', CAST(119000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (164, 14, N'Chân váy midi', N'Chân váy midi nữ tính, dễ phối đồ, phù hợp dạo phố.', N'Như mới', N'S', N'Xám', CAST(460000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'ALISA SONYA', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (165, 15, N'Áo khoác denim', N'Áo khoác denim năng động, cá tính, hợp phong cách casual.', N'Tốt', N'XL', N'Xanh lá', CAST(275000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (166, 16, N'Quần culottes kaki', N'Quần culottes kaki thoải mái, thanh lịch, dễ phối đồ.', N'Như mới', N'XXL', N'Be', CAST(480000.00 AS Decimal(10, 2)), N'Đang bán', 3, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (167, 17, N'Đầm lụa trơn', N'Đầm lụa trơn sang trọng, nhẹ nhàng, lý tưởng sự kiện.', N'Mới 99%', N'S', N'Tím', CAST(489000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (168, 18, N'Áo len crop top', N'Áo len crop top trẻ trung, thời trang, phù hợp mùa thu.', N'Hư nhẹ', N'XL', N'Xanh dương', CAST(393000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'ZL', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (169, 19, N'Quần short caro', N'Quần short caro trẻ trung, năng động, lý tưởng mùa hè.', N'Đã qua sử dụng', N'S', N'Đen', CAST(280000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'BRAVERY', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (170, 20, N'Giày loafer', N'Giày loafer thanh lịch, tiện dụng, phù hợp công sở.', N'Như mới', N'XXL', N'Trắng', CAST(420000.00 AS Decimal(10, 2)), N'Đang bán', 1, 4, N'INICHI', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (171, 21, N'Túi xách đan lát', N'Túi xách đan lát thời trang, nhẹ nhàng, lý tưởng dạo phố.', N'Tốt', N'Freesize', N'Trắng', CAST(188000.00 AS Decimal(10, 2)), N'Đang bán', 2, 5, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (172, 22, N'Mũ lưỡi trai thêu', N'Mũ lưỡi trai thêu cá tính, năng động, hợp phong cách streetwear.', N'Mới 99%', N'S', N'Đỏ', CAST(412000.00 AS Decimal(10, 2)), N'Đang bán', 1, 6, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (173, 23, N'Kính mát tráng gương', N'Kính mát tráng gương thời thượng, nổi bật, bảo vệ mắt.', N'Khá', N'Freesize', N'Vàng', CAST(232000.00 AS Decimal(10, 2)), N'Đang bán', 1, 7, N'MEGANET', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (174, 24, N'Vòng tay charm', N'Vòng tay charm tinh tế, sang trọng, phù hợp mọi outfit.', N'Tốt', N'Freesize', N'Xám', CAST(305000.00 AS Decimal(10, 2)), N'Đang bán', 1, 8, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (175, 25, N'Áo hoodie lông', N'Áo hoodie lông ấm áp, sang trọng, lý tưởng mùa đông.', N'Đã qua sử dụng', N'L', N'Be', CAST(301000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (176, 26, N'Quần jogger cotton', N'Quần jogger cotton thoáng mát, thoải mái, phù hợp casual.', N'Hư nhẹ', N'XL', N'Đen', CAST(172000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (177, 27, N'Đồ bơi hai mảnh', N'Đồ bơi hai mảnh quyến rũ, thời trang, lý tưởng bãi biển.', N'Tốt', N'S', N'Xanh lá', CAST(135000.00 AS Decimal(10, 2)), N'Đang bán', 3, 10, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (178, 28, N'Bộ ngủ vải thô', N'Bộ ngủ vải thô nhẹ nhàng, thoáng mát, lý tưởng nghỉ ngơi.', N'Hư nhẹ', N'XL', N'Trắng', CAST(487000.00 AS Decimal(10, 2)), N'Đang bán', 1, 11, N'Thời trang gia đình VT', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (179, 29, N'Áo polo kẻ sọc', N'Áo polo kẻ sọc trẻ trung, năng động, phù hợp dạo phố.', N'Hư nhẹ', N'L', N'Be', CAST(366000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (180, 30, N'Áo thun tay ngắn', N'Áo thun tay ngắn basic, dễ phối đồ, phù hợp mọi dịp.', N'Hư nhẹ', N'L', N'Be', CAST(393000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'H90', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (181, 31, N'Quần tây slim fit', N'Quần tây slim fit ôm sát, thanh lịch, lý tưởng công sở.', N'Tốt', N'XL', N'Hồng', CAST(367000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (182, 32, N'Váy đầm ren', N'Váy đầm ren sang trọng, nữ tính, lý tưởng tiệc tối.', N'Khá', N'XXL', N'Nâu', CAST(346000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'LE′COONG', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (183, 33, N'Áo sơ mi voan', N'Áo sơ mi voan nhẹ nhàng, thời trang, phù hợp sự kiện.', N'Đã qua sử dụng', N'XL', N'Vàng', CAST(251000.00 AS Decimal(10, 2)), N'Đang bán', 2, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (184, 34, N'Chân váy xếp nếp', N'Chân váy xếp nếp thanh lịch, nữ tính, dễ phối đồ.', N'Đã qua sử dụng', N'Freesize', N'Xanh lá', CAST(88000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (185, 35, N'Áo khoác dạ', N'Áo khoác dạ ấm áp, sang trọng, lý tưởng mùa đông.', N'Như mới', N'L', N'Vàng', CAST(306000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'ROWAY', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (186, 36, N'Quần palazzo vải', N'Quần palazzo vải mềm mại, thời thượng, tôn dáng.', N'Khá', N'M', N'Đen', CAST(62000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (187, 37, N'Đầm trễ vai', N'Đầm trễ vai quyến rũ, nữ tính, lý tưởng dạ tiệc.', N'Mới 99%', N'XL', N'Cam', CAST(249000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'LE′COONG', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (188, 38, N'Áo len tay bồng', N'Áo len tay bồng nữ tính, thời trang, phù hợp mùa thu.', N'Tốt', N'M', N'Xanh lá', CAST(277000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (189, 39, N'Quần short thun', N'Quần short thun năng động, thoải mái, lý tưởng mùa hè.', N'Tốt', N'S', N'Cam', CAST(91000.00 AS Decimal(10, 2)), N'Đang bán', 2, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (190, 40, N'Giày bốt da', N'Giày bốt da bền đẹp, thời trang, lý tưởng mùa đông.', N'Tốt', N'XL', N'Trắng', CAST(217000.00 AS Decimal(10, 2)), N'Đang bán', 1, 4, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (191, 41, N'Túi tote da', N'Túi tote da cao cấp, tiện dụng, phù hợp công sở.', N'Đã qua sử dụng', N'XL', N'Xanh dương', CAST(246000.00 AS Decimal(10, 2)), N'Đang bán', 1, 5, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (192, 42, N'Nón len cổ điển', N'Nón len cổ điển ấm áp, thời trang, hợp mùa đông.', N'Khá', N'Freesize', N'Đen', CAST(367000.00 AS Decimal(10, 2)), N'Đang bán', 1, 6, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (193, 43, N'Kính mát gọng lớn', N'Kính mát gọng lớn thời thượng, cá tính, bảo vệ mắt.', N'Mới 99%', N'Freesize', N'Xám', CAST(353000.00 AS Decimal(10, 2)), N'Đang bán', 1, 7, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (194, 44, N'Thắt lưng vải', N'Thắt lưng vải trẻ trung, năng động, nâng tầm outfit.', N'Như mới', N'XL', N'Cam', CAST(263000.00 AS Decimal(10, 2)), N'Đang bán', 3, 9, N'PULO', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (195, 45, N'Áo hoodie in hình', N'Áo hoodie in hình cá tính, trẻ trung, phong cách đường phố.', N'Như mới', N'S', N'Be', CAST(205000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (196, 46, N'Quần jogger caro', N'Quần jogger caro thanh lịch, thời trang, dễ phối đồ.', N'Hư nhẹ', N'L', N'Xám', CAST(445000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (197, 47, N'Đồ bơi in hoa', N'Đồ bơi in hoa quyến rũ, thời trang, lý tưởng bãi biển.', N'Khá', N'S', N'Be', CAST(172000.00 AS Decimal(10, 2)), N'Đang bán', 1, 10, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (198, 48, N'Bộ pyjama kẻ sọc', N'Bộ pyjama kẻ sọc thoải mái, nhẹ nhàng, lý tưởng nghỉ ngơi.', N'Tốt', N'XXL', N'Xanh dương', CAST(406000.00 AS Decimal(10, 2)), N'Đang bán', 1, 11, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (199, 49, N'Áo polo basic', N'Áo polo basic đơn giản, thanh lịch, phù hợp công sở.', N'Tốt', N'Freesize', N'Vàng', CAST(163000.00 AS Decimal(10, 2)), N'Đang bán', 2, 1, N'unknown', N'Việt Nam')
GO
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (200, 50, N'Áo thun cổ bẻ', N'Áo thun cổ bẻ trẻ trung, năng động, dễ phối đồ.', N'Hư nhẹ', N'S', N'Hồng', CAST(208000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (201, 1, N'Quần jean ống côn', N'Quần jean ống côn ôm sát, thời trang, phù hợp dạo phố.', N'Tốt', N'XXL', N'Cam', CAST(229000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'GUMAC', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (202, 2, N'Váy xòe công sở', N'Váy xòe công sở thanh lịch, nữ tính, lý tưởng văn phòng.', N'Khá', N'XL', N'Xám', CAST(371000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'NHẬT VY®', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (203, 3, N'Áo sơ mi tay dài', N'Áo sơ mi tay dài thanh lịch, chuyên nghiệp, phù hợp công sở.', N'Tốt', N'Freesize', N'Xám', CAST(214000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'LEEVIN', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (204, 4, N'Chân váy lụa', N'Chân váy lụa mềm mại, sang trọng, hợp phong cách sự kiện.', N'Mới 99%', N'XL', N'Vàng', CAST(482000.00 AS Decimal(10, 2)), N'Đang bán', 2, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (205, 5, N'Áo khoác cardigan', N'Áo khoác cardigan mỏng nhẹ, thời trang, dễ phối đồ.', N'Khá', N'XL', N'Be', CAST(80000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (206, 6, N'Quần kaki ống đứng', N'Quần kaki ống đứng thanh lịch, trẻ trung, phù hợp công sở.', N'Tốt', N'S', N'Trắng', CAST(302000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (207, 7, N'Đầm maxi lanh', N'Đầm maxi lanh thoáng mát, nhẹ nhàng, lý tưởng mùa hè.', N'Mới 99%', N'Freesize', N'Xanh lá', CAST(408000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (208, 8, N'Áo len cổ tim', N'Áo len cổ tim nữ tính, ấm áp, phù hợp mùa đông.', N'Khá', N'Freesize', N'Be', CAST(203000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (209, 9, N'Quần short vải lanh', N'Quần short vải lanh thoáng mát, trẻ trung, lý tưởng mùa hè.', N'Tốt', N'Freesize', N'Be', CAST(316000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'Ojhig', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (210, 10, N'Giày sandal quai mảnh', N'Giày sandal quai mảnh thời trang, thoáng mát, hợp mùa hè.', N'Khá', N'XL', N'Tím', CAST(293000.00 AS Decimal(10, 2)), N'Đang bán', 3, 4, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (211, 11, N'Túi xách vải thô', N'Túi xách vải thô nhẹ nhàng, tiện dụng, phù hợp dạo phố.', N'Tốt', N'L', N'Xanh lá', CAST(306000.00 AS Decimal(10, 2)), N'Đang bán', 1, 5, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (212, 12, N'Mũ bucket da', N'Mũ bucket da sang trọng, thời thượng, hợp phong cách đường phố.', N'Đã qua sử dụng', N'XL', N'Trắng', CAST(398000.00 AS Decimal(10, 2)), N'Đang bán', 1, 6, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (213, 13, N'Kính mát gọng nhỏ', N'Kính mát gọng nhỏ tinh tế, hiện đại, bảo vệ mắt.', N'Đã qua sử dụng', N'M', N'Đen', CAST(464000.00 AS Decimal(10, 2)), N'Đang bán', 1, 7, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (214, 14, N'Vòng cổ dây da', N'Vòng cổ dây da cá tính, thời trang, phù hợp mọi outfit.', N'Đã qua sử dụng', N'XXL', N'Đen', CAST(467000.00 AS Decimal(10, 2)), N'Đang bán', 1, 8, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (215, 15, N'Áo hoodie cotton', N'Áo hoodie cotton thoải mái, ấm áp, phù hợp mùa đông.', N'Đã qua sử dụng', N'Freesize', N'Vàng', CAST(215000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'PARADOX', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (216, 16, N'Quần legging cotton', N'Quần legging cotton thoáng mát, co giãn, lý tưởng tập gym.', N'Đã qua sử dụng', N'M', N'Xanh lá', CAST(240000.00 AS Decimal(10, 2)), N'Đang bán', 2, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (217, 17, N'Đồ bơi cut-out cao cấp', N'Đồ bơi cut-out cao cấp gợi cảm, thời trang, lý tưởng bãi biển.', N'Khá', N'Freesize', N'Nâu', CAST(441000.00 AS Decimal(10, 2)), N'Đang bán', 1, 10, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (218, 18, N'Bộ ngủ lụa dài', N'Bộ ngủ lụa dài sang trọng, mềm mại, lý tưởng nghỉ ngơi.', N'Như mới', N'L', N'Trắng', CAST(289000.00 AS Decimal(10, 2)), N'Đang bán', 1, 11, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (219, 19, N'Áo polo tay ngắn', N'Áo polo tay ngắn trẻ trung, năng động, phù hợp dạo phố.', N'Mới 99%', N'S', N'Đen', CAST(262000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'KAYLIN', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (220, 20, N'Áo thun in slogan', N'Áo thun in slogan cá tính, thời thượng, hợp phong cách Gen Z.', N'Đã qua sử dụng', N'XL', N'Nâu', CAST(406000.00 AS Decimal(10, 2)), N'Đang bán', 2, 1, N'SANCOOL®', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (221, 21, N'Quần tây ống loe', N'Quần tây ống loe thanh lịch, thời trang, tôn dáng.', N'Hư nhẹ', N'XXL', N'Hồng', CAST(364000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'GUMAC', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (222, 22, N'Váy đầm ôm sát', N'Váy đầm ôm sát gợi cảm, sang trọng, lý tưởng tiệc tối.', N'Tốt', N'S', N'Vàng', CAST(458000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (223, 23, N'Áo sơ mi cổ trụ', N'Áo sơ mi cổ trụ thanh lịch, độc đáo, phù hợp công sở.', N'Mới 99%', N'L', N'Tím', CAST(477000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (224, 24, N'Chân váy bút chì da', N'Chân váy bút chì da sang trọng, thời thượng, lý tưởng văn phòng.', N'Như mới', N'M', N'Hồng', CAST(165000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (225, 25, N'Áo khoác blazer', N'Áo khoác blazer thanh lịch, chuyên nghiệp, phù hợp công sở.', N'Tốt', N'Freesize', N'Be', CAST(279000.00 AS Decimal(10, 2)), N'Đang bán', 3, 1, N'KAMONG', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (226, 26, N'Quần culottes denim', N'Quần culottes denim năng động, thời trang, dễ phối đồ.', N'Đã qua sử dụng', N'XXL', N'Cam', CAST(66000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (227, 27, N'Đầm lụa hoa', N'Đầm lụa hoa nhẹ nhàng, sang trọng, lý tưởng sự kiện.', N'Như mới', N'XXL', N'Đen', CAST(151000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (228, 28, N'Áo len mỏng dài tay', N'Áo len mỏng dài tay nhẹ nhàng, thời trang, phù hợp mùa thu.', N'Đã qua sử dụng', N'XL', N'Đỏ', CAST(195000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (229, 29, N'Quần short kaki nữ', N'Quần short kaki nữ trẻ trung, thoải mái, lý tưởng mùa hè.', N'Hư nhẹ', N'Freesize', N'Đỏ', CAST(166000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (230, 30, N'Giày bốt cổ ngắn', N'Giày bốt cổ ngắn thời trang, bền đẹp, hợp mùa đông.', N'Tốt', N'S', N'Xanh lá', CAST(482000.00 AS Decimal(10, 2)), N'Đang bán', 1, 4, N'LOVITO', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (231, 31, N'Túi clutch vải', N'Túi clutch vải sang trọng, nhỏ gọn, lý tưởng tiệc tối.', N'Mới 99%', N'XXL', N'Be', CAST(78000.00 AS Decimal(10, 2)), N'Đang bán', 1, 5, N'MDU', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (232, 32, N'Nón lưỡi trai vải', N'Nón lưỡi trai vải trẻ trung, năng động, hợp phong cách casual.', N'Hư nhẹ', N'S', N'Trắng', CAST(445000.00 AS Decimal(10, 2)), N'Đang bán', 2, 6, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (233, 33, N'Kính mát gọng tròn nhỏ', N'Kính mát gọng tròn nhỏ tinh tế, thời thượng, bảo vệ mắt.', N'Hư nhẹ', N'Freesize', N'Nâu', CAST(333000.00 AS Decimal(10, 2)), N'Đang bán', 1, 7, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (234, 34, N'Thắt lưng da lộn', N'Thắt lưng da lộn sang trọng, mềm mại, nâng tầm outfit.', N'Đã qua sử dụng', N'L', N'Hồng', CAST(221000.00 AS Decimal(10, 2)), N'Đang bán', 1, 9, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (235, 35, N'Áo hoodie lót lông', N'Áo hoodie lót lông ấm áp, sang trọng, lý tưởng mùa đông.', N'Khá', N'XL', N'Cam', CAST(144000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (236, 36, N'Quần jogger vải lanh', N'Quần jogger vải lanh thoáng mát, trẻ trung, phù hợp mùa hè.', N'Như mới', N'XXL', N'Vàng', CAST(212000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (237, 37, N'Đồ bơi một mảnh hoa', N'Đồ bơi một mảnh hoa quyến rũ, thời trang, lý tưởng bãi biển.', N'Tốt', N'L', N'Hồng', CAST(461000.00 AS Decimal(10, 2)), N'Đang bán', 3, 10, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (238, 38, N'Bộ pyjama lụa mỏng', N'Bộ pyjama lụa mỏng mềm mại, sang trọng, lý hợp mùa hè.', N'Đã qua sử dụng', N'Freesize', N'Be', CAST(126000.00 AS Decimal(10, 2)), N'Đang bán', 1, 11, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (239, 39, N'Áo polo nữ basic', N'Áo polo nữ basic đơn giản, thanh lịch, phù hợp dạo phố.', N'Khá', N'XL', N'Nâu', CAST(130000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'CARDINA', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (240, 40, N'Áo thun tay dài crop', N'Áo thun tay dài crop trẻ trung, năng động, hợp mùa thu.', N'Hư nhẹ', N'Freesize', N'Nâu', CAST(167000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (241, 41, N'Quần jean ống rộng', N'Quần jean ống rộng thoải mái, thời thượng, dễ phối đồ.', N'Như mới', N'XL', N'Cam', CAST(426000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (242, 42, N'Váy yếm lụa', N'Váy yếm lụa sang trọng, nhẹ nhàng, lý tưởng dạo phố.', N'Khá', N'L', N'Trắng', CAST(211000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'4LOVA', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (243, 43, N'Áo sơ mi tay ngắn', N'Áo sơ mi tay ngắn trẻ trung, thoáng mát, phù hợp mùa hè.', N'Tốt', N'M', N'Vàng', CAST(486000.00 AS Decimal(10, 2)), N'Đang bán', 2, 1, N'UKFASHION', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (244, 44, N'Chân váy denim midi', N'Chân váy denim midi năng động, thời trang, dễ phối đồ.', N'Tốt', N'S', N'Xanh lá', CAST(252000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (245, 45, N'Áo khoác măng tô', N'Áo khoác măng tô thanh lịch, ấm áp, lý tưởng mùa đông.', N'Đã qua sử dụng', N'XL', N'Đỏ', CAST(273000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (246, 46, N'Quần palazzo lanh', N'Quần palazzo lanh thoáng mát, sang trọng, tôn dáng.', N'Như mới', N'Freesize', N'Nâu', CAST(266000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'KGYEWL', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (247, 47, N'Đầm maxi trễ vai', N'Đầm maxi trễ vai quyến rũ, nữ tính, lý tưởng sự kiện.', N'Đã qua sử dụng', N'M', N'Đen', CAST(112000.00 AS Decimal(10, 2)), N'Đang bán', 1, 3, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (248, 48, N'Áo len cổ lọ mỏng', N'Áo len cổ lọ mỏng nhẹ nhàng, thời trang, phù hợp mùa thu.', N'Mới 99%', N'S', N'Xanh dương', CAST(422000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (249, 49, N'Quần short vải caro', N'Quần short vải caro trẻ trung, năng động, lý tưởng mùa hè.', N'Như mới', N'L', N'Hồng', CAST(121000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (250, 50, N'Giày slip-on vải', N'Giày slip-on vải tiện dụng, thời trang, phù hợp dạo phố.', N'Khá', N'XL', N'Tím', CAST(257000.00 AS Decimal(10, 2)), N'Đang bán', 1, 4, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (251, 1, N'Túi xách quai xích', N'Túi xách quai xích sang trọng, thời thượng, lý tưởng tiệc tối.', N'Như mới', N'L', N'Tím', CAST(159000.00 AS Decimal(10, 2)), N'Đang bán', 3, 5, N'YUUMY', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (252, 2, N'Mũ fedora len', N'Mũ fedora len thanh lịch, cổ điển, hợp phong cách mùa thu.', N'Như mới', N'XL', N'Xanh dương', CAST(202000.00 AS Decimal(10, 2)), N'Đang bán', 1, 6, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (253, 3, N'Kính mát gọng trắng', N'Kính mát gọng trắng thời thượng, cá tính, bảo vệ mắt.', N'Hư nhẹ', N'M', N'Hồng', CAST(97000.00 AS Decimal(10, 2)), N'Đang bán', 1, 7, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (254, 4, N'Vòng tay da', N'Vòng tay da cá tính, thời trang, phù hợp mọi outfit.', N'Đã qua sử dụng', N'S', N'Đỏ', CAST(342000.00 AS Decimal(10, 2)), N'Đang bán', 1, 8, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (255, 5, N'Áo hoodie dài tay', N'Áo hoodie dài tay thoải mái, ấm áp, phù hợp mùa đông.', N'Như mới', N'L', N'Vàng', CAST(351000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'BLACK OF EXIT', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (256, 6, N'Quần legging vải thô', N'Quần legging vải thô thoáng mát, thời trang, lý tưởng casual.', N'Tốt', N'S', N'Be', CAST(321000.00 AS Decimal(10, 2)), N'Đang bán', 1, 2, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (257, 7, N'Đồ bơi thể thao nữ', N'Đồ bơi thể thao nữ thoải mái, thời trang, phù hợp bơi lội.', N'Tốt', N'XXL', N'Đen', CAST(85000.00 AS Decimal(10, 2)), N'Đang bán', 1, 10, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (258, 8, N'Bộ ngủ cotton ngắn', N'Bộ ngủ cotton ngắn nhẹ nhàng, thoáng mát, lý tưởng mùa hè.', N'Hư nhẹ', N'XL', N'Trắng', CAST(151000.00 AS Decimal(10, 2)), N'Đang bán', 2, 11, N'unknown', N'Việt Nam')
INSERT [dbo].[Product] ([product_id], [account_id], [name], [description], [condition], [size], [color], [price], [status], [quantity], [category_id], [brand], [origin]) VALUES (259, 9, N'Áo polo nam slim fit', N'Áo polo nam slim fit ôm sát, thanh lịch, phù hợp công sở.', N'Như mới', N'Freesize', N'Xanh dương', CAST(199000.00 AS Decimal(10, 2)), N'Đang bán', 1, 1, N'TO-TODAY', N'Việt Nam')
SET IDENTITY_INSERT [dbo].[Product] OFF
GO
SET IDENTITY_INSERT [dbo].[ProductImage] ON 

INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (1, 1, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649793/1.1_vzm03p.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (2, 1, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649793/1.2_a9axwy.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (3, 1, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649793/1.3_vx3djs.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (4, 2, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649794/2.1_ryy4i3.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (5, 2, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649794/2.2_ed6zhd.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (6, 2, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649794/2.3_kebhde.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (7, 3, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649794/3.1_rxcemo.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (8, 3, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649795/3.2_fooizq.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (9, 4, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649796/4.1_sgaxqo.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (10, 4, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649797/4.2_opzmcx.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (11, 5, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649798/5.1_panrvy.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (12, 5, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649799/5.2_eudciu.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (13, 6, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649799/6.1_qwrrk6.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (14, 6, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649801/6.2_tj6oum.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (15, 7, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649801/7.1_u4x5ol.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (16, 7, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649803/7.2_wpeqe7.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (17, 8, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649804/8.1_wq7ydr.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (18, 8, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649804/8.2_fsk0zo.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (19, 9, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649805/9.1_n6lvik.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (20, 10, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649805/10.1_g9rtpv.jpg')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (21, 10, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649807/10.2_yhftne.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (22, 11, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649808/11.1_sq9nkr.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (23, 11, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649809/11.2_m92usn.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (24, 12, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649810/12.1_s4udat.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (25, 12, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649812/12.2_klsqlb.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (26, 13, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649813/13.1_pwfgsh.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (27, 14, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649813/14.1_rls9mg.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (28, 15, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649814/15.1_djgsor.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (29, 15, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649816/15.2_lxjcbn.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (30, 16, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649817/16.1_hmkl32.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (31, 16, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649819/16.2_uqiryy.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (32, 17, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649820/17.1_lkxxk9.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (33, 18, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649821/18.1_lpp7hi.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (34, 18, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649821/18.2_s4u6md.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (35, 19, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649824/19.1_sy7n9v.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (36, 20, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649825/20.1_jehqwj.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (37, 20, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649825/20.2_el03vs.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (38, 20, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649826/20.3_hgdshl.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (39, 21, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649829/21.1_rmfcji.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (40, 21, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649829/21.2_bzwk03.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (41, 21, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649830/21.3_jzndrg.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (42, 21, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649830/21.4_kaxuub.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (43, 22, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649833/22.1_yyogrx.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (44, 22, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649834/22.2_tulu1w.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (45, 23, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649834/23.1_egrt9n.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (46, 23, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649837/23.2_pkokre.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (47, 23, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649838/23.3_swqaro.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (48, 24, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649840/24.1_t35xse.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (49, 24, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649840/24.2_crdoze.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (50, 24, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649841/24.3_qfnply.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (51, 25, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649842/25.1_lmyqcd.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (52, 25, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649844/25.2_fch8yl.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (53, 25, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649845/25.3_k4mpje.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (54, 26, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649845/26.1_ne0fcj.jpg')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (55, 26, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649846/26.2_pncy97.jpg')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (56, 27, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649848/27.1_h5k2xp.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (57, 27, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649850/27.2_guziqy.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (58, 27, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649851/27.3_z5bc7e.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (59, 28, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649851/28.1_dfrgxb.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (60, 28, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649853/28.2_x34t7y.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (61, 28, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649856/28.3_qnyeyb.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (62, 28, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649856/28.4_x6iuw1.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (63, 29, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649857/29.1_w5iqtw.jpg')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (64, 29, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649860/29.2_thgffg.jpg')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (65, 30, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649860/30.1_ynisut.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (66, 30, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649861/30.2_thz07j.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (67, 30, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649861/30.3_he0i0c.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (68, 31, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649865/31.1_fjt01r.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (69, 31, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649865/31.2_prwfvx.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (70, 31, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649866/31.3_bjwbmh.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (71, 32, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649866/32.1_m9t39g.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (72, 32, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649870/32.2_txd0dz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (73, 33, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649871/33.1_ppg7z1.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (74, 34, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649871/34.1_bwoakh.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (75, 34, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649871/34.2_s35bi3.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (76, 35, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649876/35.1_rqhick.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (77, 35, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649876/35.2_oepfly.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (78, 36, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649876/36.1_jm7wto.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (79, 36, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649880/36.2_unphog.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (80, 37, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649880/37.1_ata371.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (81, 38, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649880/38.1_noysiv.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (82, 39, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649881/39.1_xp62ex.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (83, 39, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649885/39.2_ghzdea.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (84, 39, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649886/39.3_f23j3a.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (85, 40, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649886/40.1_ss6cwv.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (86, 40, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649888/40.2_bunik0.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (87, 40, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649891/40.3_lbifpr.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (88, 40, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649891/40.4_cd5ijl.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (89, 41, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649892/41.1_wkkz7p.jpg')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (90, 41, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649892/41.2_vhkt3m.jpg')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (91, 41, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649896/41.3_vlylva.jpg')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (92, 42, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649897/42.1_htpcnr.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (93, 42, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649897/42.2_amsv7c.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (94, 42, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649899/42.3_zyrzj2.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (95, 43, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649901/43.1_ukk5fv.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (96, 43, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649902/43.2_idrjvc.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (97, 43, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649904/43.3_dmgnvy.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (98, 44, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649906/44.1_knucy2.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (99, 44, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649909/44.2_qyfohs.webp')
GO
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (100, 44, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649909/44.3_e06m5c.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (101, 45, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649910/45.1_eq7bnm.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (102, 45, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649911/45.2_moaoab.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (103, 45, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649915/45.3_mb3epj.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (104, 46, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649915/46.1_g7gtmh.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (105, 46, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649915/46.2_nmvdwk.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (106, 46, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649916/46.3_pyemhj.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (107, 47, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649921/47.1_wh6q2k.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (108, 47, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649921/47.2_hm6qeh.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (109, 47, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649922/47.3_yfvyui.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (110, 48, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649924/48.1_lfk6m0.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (111, 48, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649926/48.2_ymwbgx.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (112, 48, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649927/48.3_izfdsf.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (113, 49, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649929/49.1_k4fu1m.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (114, 49, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649931/49.2_zsdox0.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (115, 49, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649934/49.3_wi7ksy.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (116, 50, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649934/50.1_cdaop4.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (117, 50, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649935/50.2_oek2ci.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (118, 50, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649939/50.3_n8rpcc.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (119, 51, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649940/51.1_hlgdko.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (120, 51, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649940/51.2_bzpqzz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (121, 51, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649942/51.3_ghha3k.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (122, 52, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649948/52.1_jsobnt.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (123, 52, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649949/52.2_cvvz5s.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (124, 52, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649949/52.3_nhn40e.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (125, 53, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649952/53.1_yb5opw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (126, 53, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649956/53.2_cumbmw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (127, 53, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649959/53.3_ozjkpg.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (128, 54, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649960/54.1_sdrkxk.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (129, 54, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649962/54.2_qvmerz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (130, 54, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649967/54.3_ufauxl.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (131, 55, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649967/55.1_zfx0jl.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (132, 55, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649968/55.2_wl09qx.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (133, 55, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649968/55.3_k9lvng.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (134, 56, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649970/56.1_zv7sxl.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (135, 56, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649977/56.2_gemt0d.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (136, 56, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649978/56.3_jqkaxu.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (137, 57, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649978/57.1_a9fcrk.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (138, 57, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649982/57.2_rpywsd.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (139, 57, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649983/57.3_gdwnpp.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (140, 58, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649983/58.1_vnsthu.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (141, 58, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649988/58.2_rfgqli.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (142, 58, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649989/58.3_xkrc8x.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (143, 59, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649989/59.1_tghgl4.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (144, 59, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649991/59.2_kgivgj.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (145, 59, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649995/59.3_eufgqb.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (146, 60, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649996/60.1_ieoh6s.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (147, 60, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649996/60.2_xzjya6.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (148, 60, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750649998/60.3_mr9pew.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (149, 61, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650003/61.1_es48pb.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (150, 61, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650003/61.2_chv3zu.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (151, 61, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650004/61.3_z5ftdf.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (152, 62, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650008/62.1_qqwwgo.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (153, 62, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650009/62.2_kb7xgs.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (154, 62, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650009/62.3_zvbovt.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (155, 63, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650011/63.1_kwnkas.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (156, 63, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650014/63.2_ctrbrn.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (157, 63, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650016/63.3_ymo78t.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (158, 64, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650018/64.1_v3jc47.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (159, 64, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650020/64.2_ycqc72.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (160, 64, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650023/64.3_m5plur.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (161, 65, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650024/65.1_bhvtqp.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (162, 65, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650027/65.2_fxnht1.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (163, 65, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650030/65.3_f9u8jw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (164, 66, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650031/66.1_xt8tao.jpg')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (165, 66, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650031/66.2_uwgzno.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (166, 66, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650033/66.3_e3hlwg.jpg')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (167, 67, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650040/67.1_agwzgr.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (168, 67, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650040/67.2_xoqroe.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (169, 67, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650040/67.3_rifhph.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (170, 68, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650044/68.1_b8eazk.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (171, 68, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650053/68.2_lvxvcs.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (172, 68, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650053/68.3_gatzgu.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (173, 69, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650054/69.1_vh9xg8.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (174, 69, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650054/69.2_k1njjp.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (175, 69, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650066/69.3_c0u6b1.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (176, 70, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650067/70.1_mfrlpt.jpg')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (177, 70, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650067/70.2_gk5ap5.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (178, 70, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650067/70.3_xkh6ha.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (179, 71, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650068/71.1_okzzwz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (180, 71, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650068/71.2_acfntb.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (181, 71, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650071/71.3_ssq6bc.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (182, 72, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650085/72.1_quxvxc.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (183, 72, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650086/72.2_rhtom3.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (184, 72, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650086/72.3_iwmzou.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (185, 73, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650089/73.1_rwsfbj.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (186, 73, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650099/73.2_vhi9nu.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (187, 73, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650099/73.3_mx7lkc.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (188, 74, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650100/74.1_bwtqer.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (189, 74, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650100/74.2_cugg8g.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (190, 74, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650115/74.3_vvuouc.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (191, 75, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650115/75.1_t2utl4.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (192, 75, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650116/75.2_xponle.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (193, 75, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650116/75.3_qtih4n.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (194, 76, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650116/76.1_rj1uld.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (195, 76, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650116/76.2_ck7tj9.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (196, 76, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650136/76.3_pl5nc5.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (197, 77, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650136/77.1_qwjh8e.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (198, 77, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650137/77.2_xxoe8b.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (199, 77, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650148/77.3_t5cw3u.webp')
GO
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (200, 78, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650149/78.1_k5enan.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (201, 78, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650150/78.2_uaijw6.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (202, 78, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650154/78.3_le0isk.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (203, 79, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650165/79.1_xmtnq3.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (204, 79, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650166/79.2_evcixf.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (205, 79, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650166/79.3_arh2ay.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (206, 80, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650170/80.1_z0kmje.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (207, 80, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650181/80.2_hcfhgr.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (208, 80, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650182/80.3_q1vwce.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (209, 81, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650182/81.1_qytpcd.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (210, 81, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650182/81.2_nzysqz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (211, 81, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650195/81.3_enxtro.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (212, 82, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650196/82.1_wx7s5g.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (213, 82, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650196/82.2_rpwroo.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (214, 82, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650199/82.3_owbnot.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (215, 83, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650210/83.1_jinjie.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (216, 83, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650211/83.2_lowglw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (217, 83, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650211/83.3_sxto3y.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (218, 84, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650222/84.1_aifgzw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (219, 84, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650222/84.2_katdsm.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (220, 84, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650223/84.3_x1uayx.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (221, 85, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650233/85.1_zjjebf.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (222, 85, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650233/85.2_j0mrg1.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (223, 85, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650234/85.3_pcp23i.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (224, 86, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650237/86.1_sgh6rz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (225, 86, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650249/86.2_r3ihwz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (226, 86, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650249/86.3_rohudh.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (227, 87, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650250/87.1_bjtmtm.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (228, 87, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650253/87.2_mz8qj6.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (229, 87, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650261/87.3_a3ztwr.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (230, 88, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650261/88.1_hqghww.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (231, 88, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650272/88.2_j3qdno.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (232, 88, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650273/88.3_gvadcz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (233, 89, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650273/89.1_iqr2qf.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (234, 89, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650283/89.2_ug6oao.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (235, 89, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650284/89.3_btjflw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (236, 90, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650284/90.1_px8n9j.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (237, 90, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650285/90.2_fhq8py.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (238, 90, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650300/90.3_pyzzco.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (239, 91, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650300/91.1_eeuwqr.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (240, 91, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650301/91.2_ejebkw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (241, 91, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650311/91.3_emdp1t.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (242, 92, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650311/92.1_orzwd7.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (243, 92, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650312/92.2_t9svnf.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (244, 92, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650312/92.3_sw7a7u.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (245, 93, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650326/93.1_knmefp.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (246, 93, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650327/93.2_riyouw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (247, 93, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650327/93.3_md6geb.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (248, 94, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650338/94.1_h56zc5.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (249, 94, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650339/94.2_gck5nv.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (250, 94, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650339/94.3_iekv70.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (251, 95, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650344/95.1_lexo5r.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (252, 95, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650359/95.2_gdlusb.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (253, 95, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650359/95.3_f20aql.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (254, 96, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650360/96.1_ypdtml.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (255, 96, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650360/96.2_qzzqn1.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (256, 96, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650361/96.3_id4xy0.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (257, 97, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650380/97.1_tkfeii.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (258, 97, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650380/97.2_qupk9w.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (259, 97, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650381/97.3_hag2px.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (260, 98, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650381/98.1_okcttp.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (261, 98, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650393/98.2_ap5sfr.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (262, 98, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650394/98.3_ksdb9j.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (263, 99, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650394/99.1_aqz0wc.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (264, 99, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650398/99.2_ny111c.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (265, 99, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650407/99.3_ihj5aq.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (266, 100, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650407/100.1_pkbeiv.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (267, 100, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650408/100.2_ity7la.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (268, 100, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650408/100.3_hrznyb.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (269, 101, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650421/101.1_t3xknv.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (270, 101, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650421/101.2_biml3o.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (271, 101, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650422/101.3_iarh14.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (272, 102, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650422/102.1_nrxsib.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (273, 102, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650435/102.2_torzb4.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (274, 102, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650435/102.3_i9zlih.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (275, 103, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650436/103.1_opqq6g.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (276, 103, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650446/103.2_bdtzuy.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (277, 103, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650447/103.3_uvsucv.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (278, 104, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650447/104.1_qpn7oe.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (279, 104, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650451/104.2_ghgrg6.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (280, 104, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650461/104.3_hw3zg6.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (281, 105, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650462/105.1_lcoopo.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (282, 105, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650462/105.2_prjl3g.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (283, 105, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650462/105.3_utcatf.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (284, 106, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650476/106.1_mopk7s.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (285, 106, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650476/106.2_hwapan.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (286, 106, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650477/106.3_xgyd1l.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (287, 107, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650477/107.1_mqeslf.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (288, 107, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650481/107.2_kqg631.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (289, 107, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650490/107.3_ucgd2x.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (290, 108, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650491/108.1_ptniro.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (291, 108, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650506/108.2_txd9w0.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (292, 108, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650507/108.3_vn9g09.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (293, 109, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650507/109.1_jrra8h.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (294, 109, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650518/109.2_jbxljj.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (295, 109, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650519/109.3_tieq28.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (296, 110, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650519/110.1_mqnei4.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (297, 110, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650520/110.2_qw9avi.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (298, 110, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650534/110.3_wxhal7.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (299, 111, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650535/111.1_unjgch.webp')
GO
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (300, 111, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650535/111.2_saowsh.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (301, 111, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650541/111.3_kelwjw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (302, 112, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650558/112.1_xdelz9.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (303, 112, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650559/112.2_g0gdkm.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (304, 112, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650559/112.3_v579eo.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (305, 113, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650560/113.1_e2lrq9.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (306, 113, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650577/113.2_it7ohs.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (307, 113, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650578/113.3_rhfrog.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (308, 114, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650578/114.1_hvbdrf.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (309, 114, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650579/114.2_o1td2o.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (310, 114, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650594/114.3_aef6ne.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (311, 115, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650595/115.1_lrxxys.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (312, 115, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650595/115.2_ivpliq.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (313, 115, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650596/115.3_bbwxxv.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (314, 116, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650612/116.1_dbvzss.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (315, 116, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650612/116.2_eiq20w.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (316, 116, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650613/116.3_njgcwl.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (317, 117, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650617/117.1_slny1f.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (318, 117, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650629/117.2_ohptbu.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (319, 117, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650630/117.3_bskcxi.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (320, 118, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650630/118.1_jlr62u.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (321, 118, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650634/118.2_qzk89z.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (322, 118, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650647/118.3_hkbyfe.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (323, 119, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650647/119.1_qfpc2w.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (324, 119, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650648/119.2_ddwnsh.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (325, 119, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650648/119.3_amxks3.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (326, 120, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650665/120.1_rxim9o.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (327, 120, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650665/120.2_sztdrp.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (328, 120, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650666/120.3_ndku9d.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (329, 121, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650666/121.1_ocmpnm.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (330, 121, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650683/121.2_zeg0n7.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (331, 121, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650684/121.3_vopqfp.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (332, 122, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650684/122.1_nedaii.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (333, 122, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650685/122.2_ggovjt.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (334, 122, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650702/122.3_jtppdv.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (335, 123, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650703/123.1_ugly5r.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (336, 123, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650703/123.2_o4g2g8.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (337, 123, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650704/123.3_aujxyy.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (338, 124, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650708/124.1_aghupz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (339, 124, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650728/124.2_enyzpk.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (340, 124, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650728/124.3_h4xsgp.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (341, 125, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650729/125.1_jh6tm7.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (342, 125, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650735/125.2_xlsg37.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (343, 125, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650750/125.3_w7d6b1.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (344, 126, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650756/126.1_pnq9w7.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (345, 126, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650763/126.2_cxeeqv.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (346, 126, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650768/126.3_mlh8uz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (347, 127, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650769/127.1_nzgmuz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (348, 127, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650774/127.2_aplh3r.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (349, 127, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650789/127.3_bilsla.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (350, 128, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650789/128.1_x6kftl.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (351, 128, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650790/128.2_hvrsus.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (352, 128, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650804/128.3_qwovok.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (353, 129, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650805/129.1_wml7ze.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (354, 129, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650805/129.1_wml7ze.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (355, 129, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650805/129.1_wml7ze.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (356, 130, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650822/130.1_rhcded.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (357, 130, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650822/130.2_cwrima.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (358, 130, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650838/130.3_kniskx.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (359, 131, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650838/131.1_xaye35.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (360, 131, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650839/131.2_aybn0y.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (361, 131, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650855/131.3_wxjx3a.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (362, 132, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650855/132.1_xkgsaj.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (363, 132, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650855/132.2_fxkwdc.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (364, 132, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650871/132.3_zdtpty.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (365, 133, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650871/133.1_p6ffyy.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (366, 133, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650872/133.2_ob7sdc.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (367, 133, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650872/133.3_tjt7ps.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (368, 134, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650893/134.1_ul7rwh.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (369, 134, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650893/134.2_askwrk.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (370, 134, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650893/134.3_rdmnia.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (371, 135, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650894/135.1_jhy5cj.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (372, 135, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650915/135.2_xzdoot.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (373, 135, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650915/135.3_fdmj2o.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (374, 136, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650916/136.1_izikrn.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (375, 136, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650937/136.2_sdwnfo.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (376, 136, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650938/136.3_n2tidn.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (377, 137, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650938/137.1_xlbuwp.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (378, 137, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650945/137.2_jgrrce.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (379, 137, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650964/137.3_wnlgki.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (380, 138, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650964/138.1_bm8xrl.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (381, 138, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650965/138.2_e4k5ei.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (382, 138, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650982/138.3_zvcj9c.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (383, 139, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650982/139.1_l7uz3q.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (384, 139, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650983/139.2_bsbost.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (385, 139, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750650983/139.3_dnhf5f.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (386, 140, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651005/140.1_hjaroz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (387, 140, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651005/140.2_mzw8uf.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (388, 140, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651006/140.3_tgmqhg.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (389, 141, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651012/141.1_tjarhe.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (390, 141, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651023/141.2_cd5pgl.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (391, 141, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651029/141.3_gjx1jq.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (392, 142, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651035/142.1_opevjw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (393, 142, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651036/142.2_sdq4vj.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (394, 142, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651036/142.3_ztmk2n.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (395, 143, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651060/143.1_tjqu9r.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (396, 143, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651060/143.2_dxdanq.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (397, 143, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651061/143.3_bfo3k6.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (398, 144, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651061/144.1_mmuqay.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (399, 144, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651085/144.2_p88i2p.webp')
GO
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (400, 144, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651086/144.3_rpud7s.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (401, 145, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651086/145.1_dwbf4w.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (402, 145, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651092/145.2_xh7q21.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (403, 145, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651112/145.3_qznxu7.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (404, 146, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651113/146.1_d0qwgk.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (405, 146, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651113/146.2_kcaics.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (406, 146, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651139/146.3_dshtnj.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (407, 147, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651139/147.1_yylbs9.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (408, 147, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651140/147.2_uqrrof.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (409, 147, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651148/147.3_cipylp.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (410, 148, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651148/148.1_uphzjp.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (411, 148, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651174/148.2_szu82q.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (412, 148, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651174/148.3_lhhuyg.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (413, 149, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651175/149.1_scucxr.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (414, 149, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651182/149.2_kha0qz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (415, 149, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651201/149.3_cadass.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (416, 150, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651201/150.1_nfwsjq.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (417, 150, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651202/150.2_vdgwmi.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (418, 150, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651202/150.3_q0c6cw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (419, 151, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651230/151.1_d9nqj5.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (420, 151, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651230/151.2_mub8ig.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (421, 151, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651231/151.3_exsylq.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (422, 152, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651231/152.1_urvncf.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (423, 152, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651258/152.2_qyj0ly.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (424, 152, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651259/152.3_hofrgd.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (425, 153, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651259/153.1_ijwpes.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (426, 153, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651259/153.2_xurxf1.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (427, 153, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651288/153.3_hgyce3.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (428, 154, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651288/154.1_nodi9m.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (429, 154, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651289/154.2_br0xp6.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (430, 154, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651289/154.3_q6jpa0.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (431, 155, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651291/155.1_crng20.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (432, 155, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651294/155.2_oq1fkq.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (433, 155, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651297/155.3_xa0qha.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (434, 156, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651349/156.1_zsu6sq.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (435, 156, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651350/156.2_xcbbqz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (436, 156, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651350/156.3_roi1ia.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (437, 157, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651351/157.1_etlcgi.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (438, 157, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651350/157.2_jisxjv.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (439, 157, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651351/157.3_m5otn2.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (440, 158, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651393/158.1_khmbk2.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (441, 158, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651393/158.2_dbqsrf.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (442, 158, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651394/158.3_g6a2rc.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (443, 159, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651394/159.1_sv3bjw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (444, 159, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651424/159.2_xm0kkp.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (445, 159, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651424/159.3_dl5gyq.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (446, 160, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651425/160.1_jbw2ip.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (447, 160, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651433/160.2_xhmoxq.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (448, 160, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651456/160.3_fg9n8l.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (449, 161, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651456/161.1_glzaqz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (450, 161, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651456/161.2_mkn9oz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (451, 161, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651479/161.3_ynm5qu.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (452, 162, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651480/162.1_dlp18r.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (453, 162, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651480/162.2_qwcnrz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (454, 162, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651488/162.3_zando6.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (455, 163, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651496/163.1_pkmzsh.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (456, 163, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651528/163.2_kyklpd.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (457, 163, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651528/163.3_zurkhl.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (458, 164, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651529/164.1_anvkhu.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (459, 164, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651529/164.2_bstnr8.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (460, 164, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651561/164.3_j1zlya.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (461, 165, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651561/165.1_dumenf.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (462, 165, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651562/165.2_gzluty.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (463, 165, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651586/165.3_qirofa.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (464, 166, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651587/166.1_cybus1.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (465, 166, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651587/166.2_d0ziuh.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (466, 166, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651587/166.3_exxot7.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (467, 167, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651588/167.1_aas4a2.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (468, 167, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651588/167.2_z3t9pm.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (469, 167, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651636/167.3_vxm4ti.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (470, 168, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651636/168.1_f7ge0p.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (471, 168, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651637/168.2_mdjxte.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (472, 168, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651646/168.3_uwfjos.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (473, 169, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651671/169.1_p9rvhh.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (474, 169, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651671/169.2_ewhhwl.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (475, 169, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651671/169.3_bqlrqc.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (476, 170, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651671/170.1_dr1szw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (477, 170, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651688/170.2_g8fz19.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (478, 170, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651722/170.3_lmqug2.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (479, 171, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651722/171.1_vyz5fw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (480, 171, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651723/171.2_qby66x.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (481, 171, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651723/171.3_igqzhg.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (482, 172, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651725/172.1_ctz3dn.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (483, 172, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651724/172.2_pso5w2.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (484, 172, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651776/172.3_uhes2f.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (485, 173, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651776/173.1_taffbw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (486, 173, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651776/173.2_st53lm.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (487, 173, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651777/173.3_nkdmgc.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (488, 174, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651777/174.1_mjwiom.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (489, 174, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651820/174.2_wmgkg5.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (490, 174, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651820/174.3_ynmbog.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (491, 175, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651820/175.1_fanwzl.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (492, 175, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651821/175.2_i4jdns.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (493, 175, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651856/175.3_dpinpl.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (494, 176, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651857/176.1_cmmcjx.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (495, 176, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651857/176.2_s9bsle.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (496, 176, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651885/176.3_edotgq.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (497, 177, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651886/177.1_ewgzcr.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (498, 177, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651886/177.2_ioh6mw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (499, 177, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651886/177.3_tyokys.webp')
GO
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (500, 178, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651886/178.1_zmz36d.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (501, 178, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651887/178.2_vcb67x.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (502, 178, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651950/178.3_x6ooyz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (503, 179, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651950/179.1_hjgck9.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (504, 179, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651950/179.2_povpic.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (505, 179, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651951/179.3_vjkjqo.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (506, 180, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651989/180.1_jyki73.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (507, 180, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651989/180.2_qmystg.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (508, 180, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750651990/180.3_s11ndn.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (509, 181, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652019/181.1_rdoboy.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (510, 181, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652019/181.2_xcwb82.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (511, 181, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652019/181.3_icma4t.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (512, 182, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652019/182.1_ttypec.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (513, 182, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652062/182.2_l6e9fh.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (514, 182, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652063/182.3_b94vql.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (515, 183, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652063/183.1_gqckos.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (516, 183, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652064/183.2_t0zw4d.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (517, 183, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652115/183.3_spqn9l.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (518, 184, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652116/184.1_qaxhiy.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (519, 184, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652116/184.2_djaxk0.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (520, 184, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652145/184.3_s1dwbw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (521, 185, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652145/185.1_uynchc.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (522, 185, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652146/185.2_opqvct.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (523, 185, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652176/185.3_q89wrc.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (524, 186, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652176/186.1_sq9ugj.jpg')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (525, 186, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652178/186.2_dwytap.jpg')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (526, 186, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652177/186.3_qbla5c.jpg')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (527, 187, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652216/187.1_my7j7k.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (528, 187, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652217/187.2_zbo7gn.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (529, 187, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652217/187.3_lf7izo.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (530, 188, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652218/188.1_xfbuks.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (531, 188, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652248/188.2_elpawc.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (532, 188, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652269/188.3_lrtnec.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (533, 189, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652269/189.1_pl0urc.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (534, 189, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652269/189.2_quuraj.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (535, 189, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652298/189.3_gx5t2x.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (536, 190, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652311/190.1_ckhg6c.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (537, 190, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652332/190.2_u3koia.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (538, 190, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652333/190.3_u3xcia.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (539, 191, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652333/191.1_nhkxhx.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (540, 191, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652344/191.2_wdr6ar.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (541, 191, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652376/191.3_yjrufk.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (542, 192, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652377/192.1_x185s7.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (543, 192, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652377/192.2_gtusoc.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (544, 192, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652388/192.3_hshbfu.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (545, 193, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652421/193.1_gags6y.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (546, 193, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652421/193.2_vfosww.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (547, 193, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652422/193.3_jjnewa.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (548, 194, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652454/194.1_ill1in.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (549, 194, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652454/194.2_hny6vb.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (550, 194, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652455/194.3_nlurdw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (551, 195, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652484/195.1_ngslla.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (552, 195, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652511/195.2_vjwh9p.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (553, 195, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652511/195.3_wucmv4.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (554, 196, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652511/196.1_slnkfz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (555, 196, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652544/196.2_z303pb.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (556, 196, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652545/196.3_jplpoi.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (557, 197, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652545/197.1_pbftjz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (558, 197, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652546/197.2_glq2xr.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (559, 197, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652589/197.3_v1y4fs.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (560, 198, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652590/198.1_mzlswh.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (561, 198, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652590/198.2_yjenr5.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (562, 198, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652591/198.3_cnhyuk.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (563, 199, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652636/199.1_vlg6ky.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (564, 199, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652636/199.2_hcxeqf.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (565, 199, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652637/199.3_hcguhf.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (566, 200, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652637/200.1_hyrmg9.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (567, 200, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652692/200.2_ficird.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (568, 200, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652692/200.3_nzwxqc.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (569, 201, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652693/201.1_edvifv.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (570, 201, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652716/201.2_k5mnuz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (571, 201, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652740/201.3_vwile3.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (572, 202, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652740/202.1_xnj80r.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (573, 202, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652740/202.2_ubixyh.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (574, 202, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652753/202.3_z0c9ke.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (575, 203, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652788/203.1_njvlzw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (576, 203, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652788/203.2_fm5tv7.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (577, 203, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652789/203.3_cgwqhx.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (578, 204, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652825/204.1_ffeyai.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (579, 204, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652826/204.2_vcyqtl.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (580, 204, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652826/204.3_go6ayi.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (581, 205, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652868/205.1_ezlsgx.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (582, 205, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652868/205.2_mk5cll.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (583, 205, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652869/205.3_v5sl05.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (584, 206, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652913/206.1_rkrynf.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (585, 206, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652914/206.2_b4m511.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (586, 206, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652914/206.3_hmgt3d.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (587, 207, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652914/207.1_iwxuvz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (588, 207, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652914/207.2_pleslv.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (589, 207, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750655707/207.3_cztt3o.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (590, 208, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652914/208.1_mbqeqk.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (591, 208, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750652916/208.2_fgdxjz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (592, 208, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653005/208.3_e3jr5l.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (593, 209, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653005/209.1_nvrvy3.jpg')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (594, 209, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653005/209.2_kba5hq.jpg')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (595, 209, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653005/209.3_azjvac.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (596, 210, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653006/210.1_wj7zjw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (597, 210, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653006/210.2_bzfnst.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (598, 210, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653007/210.3_tzcuri.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (599, 211, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653009/211.1_keq7ja.webp')
GO
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (600, 211, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653012/211.2_zahgdd.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (601, 211, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653012/211.3_a1w70m.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (602, 212, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653012/212.1_aa4l92.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (603, 212, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653012/212.2_elkskr.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (604, 212, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653177/212.3_n12h1r.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (605, 213, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653178/213.1_umzweu.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (606, 213, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653178/213.2_whkh83.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (607, 214, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653178/214.1_zcqi8t.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (608, 214, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653177/214.2_pjct1d.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (609, 214, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653178/214.3_kawzj9.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (610, 215, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653205/215.1_hvklhn.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (611, 215, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653283/215.2_thmqo8.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (612, 215, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653283/215.3_krjbcx.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (613, 216, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653283/216.1_tk5i6f.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (614, 216, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653283/216.2_j0jtqs.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (615, 216, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653284/216.3_ozvogm.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (616, 217, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653284/217.1_vdooii.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (617, 217, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653284/217.2_tt1wlq.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (618, 217, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653379/217.3_pp201s.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (619, 218, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653380/218.1_bvmrs8.jpg')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (620, 218, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750653380/218.2_rzakvr.jpg')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (621, 218, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750655719/218.3_utt5kc.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (622, 219, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750655733/219.1_i2dnb4.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (623, 219, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750655747/219.2_l1i8gi.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (624, 219, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750655762/219.3_xpfl6z.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (625, 220, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750655776/220.1_vrp05a.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (626, 220, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750655790/220.2_cfvvuu.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (627, 220, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750655804/220.3_iq6ypf.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (628, 221, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750655817/221.1_eaeihs.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (629, 221, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750655831/221.2_qsjnuz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (630, 221, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750655845/221.3_sptbhk.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (631, 222, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750655859/222.1_nefau0.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (632, 222, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750655872/222.2_xisc1d.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (633, 222, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750655886/222.3_iqlr1k.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (634, 223, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750655900/223.1_u9c88u.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (635, 223, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750655914/223.2_nftjxd.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (636, 223, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750655927/223.3_dat7fw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (637, 224, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750655942/224.1_fkc1zj.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (638, 224, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750655957/224.2_amv36e.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (639, 224, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750655971/224.3_qwmwch.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (640, 225, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750655985/225.1_mjlmba.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (641, 225, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750655999/225.2_vlrgqf.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (642, 225, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656012/225.3_oxf87m.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (643, 226, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656026/226.1_ezicgb.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (644, 226, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656039/226.2_dt2hwz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (645, 226, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656053/226.3_mvh8al.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (646, 227, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656067/227.1_wgpfax.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (647, 227, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656081/227.2_fjipkl.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (648, 227, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656094/227.3_wgjj1l.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (649, 228, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656108/228.1_lc94np.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (650, 228, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656123/228.2_zaismc.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (651, 228, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656139/228.3_man1dw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (652, 229, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656153/229.1_m1v4bw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (653, 229, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656167/229.2_wlqma3.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (654, 229, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656181/229.3_wdhzhg.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (655, 230, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656195/230.1_tytsxh.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (656, 230, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656209/230.2_iuhniy.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (657, 230, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656223/230.3_rahzib.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (658, 231, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656237/231.1_f9gezm.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (659, 231, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656251/231.2_zwujdh.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (660, 232, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656265/232.1_m3higm.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (661, 232, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656279/232.2_msvxjl.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (662, 232, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656293/232.3_rgpfkb.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (663, 233, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656307/233.1_phaf98.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (664, 233, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656322/233.2_gxrovr.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (665, 233, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656338/233.3_vrfb2r.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (666, 234, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656351/234.1_qvipn4.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (667, 234, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656365/234.2_d3pree.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (668, 234, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656379/234.3_nf9oqb.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (669, 235, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656393/235.1_nf3tts.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (670, 235, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656407/235.2_kuc7wr.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (671, 235, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656421/235.3_ughirf.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (672, 236, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656435/236.1_rp7pxj.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (673, 236, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656449/236.2_ohdrdz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (674, 236, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656463/236.3_qtcuem.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (675, 237, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656477/237.1_akkq6q.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (676, 237, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656491/237.2_amhzjm.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (677, 237, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656506/237.3_sdgkn3.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (678, 238, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656521/238.1_gp2joi.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (679, 238, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656535/238.2_jc74mo.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (680, 238, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656549/238.3_h0wn8m.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (681, 239, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656563/239.1_fyfvdu.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (682, 239, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656577/239.2_ilmvya.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (683, 239, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656591/239.3_q8udrf.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (684, 240, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656605/240.1_uikpz9.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (685, 240, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656619/240.2_wa5fkm.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (686, 240, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656633/240.3_q2nr7h.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (687, 241, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656647/241.1_scexhh.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (688, 241, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656661/241.2_l5nebi.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (689, 241, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656675/241.3_mn4y39.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (690, 242, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656689/242.1_mwidet.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (691, 242, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656704/242.2_vl8xir.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (692, 242, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656719/242.3_xusehk.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (693, 243, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656733/243.1_vp9log.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (694, 243, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656747/243.2_onhfym.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (695, 243, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656761/243.3_bztntb.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (696, 244, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656775/244.1_zabaxi.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (697, 244, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656790/244.2_evx3ux.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (698, 244, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656804/244.3_f4us4k.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (699, 245, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656818/245.1_pwyuay.webp')
GO
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (700, 245, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656832/245.2_uzhg16.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (701, 245, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656846/245.3_n1bngy.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (702, 246, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656860/246.1_vuvk2j.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (703, 246, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656875/246.2_ad3vjp.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (704, 246, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656891/246.3_cpvel8.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (705, 247, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656905/247.1_uom2mz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (706, 247, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656919/247.2_kxdai4.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (707, 247, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656933/247.3_j5qok4.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (708, 248, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656948/248.1_yc1ayj.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (709, 248, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656962/248.2_mwwm2c.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (710, 248, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656977/248.3_fge715.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (711, 249, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750656992/249.1_bynpoi.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (712, 249, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657007/249.2_v0k6j6.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (713, 249, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657022/249.3_pdz77z.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (714, 250, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657037/250.1_tw7eja.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (715, 250, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657051/250.2_rzo8pn.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (716, 250, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657066/250.3_ehlsn1.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (717, 251, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657082/251.1_vehtiy.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (718, 251, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657097/251.2_ldwjna.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (719, 251, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657112/251.3_ey6az1.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (720, 252, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657126/252.1_o0w5mz.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (721, 252, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657141/252.2_oh5kwq.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (722, 252, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657156/252.3_amfezg.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (723, 253, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657170/253.1_qwl3if.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (724, 253, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657185/253.2_yqfuaa.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (725, 254, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657200/254.1_e0olbx.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (726, 254, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657214/254.2_ozklgs.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (727, 254, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657229/254.3_h0ky1r.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (728, 255, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657243/255.1_ugujkq.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (729, 255, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657259/255.2_hgkkmj.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (730, 255, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657276/255.3_tfmgk7.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (731, 256, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657289/256.1_tp1jn7.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (732, 256, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657304/256.2_ur3omb.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (733, 256, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657318/256.3_pyzus1.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (734, 257, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657332/257.1_nf1utl.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (735, 257, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657347/257.2_dnj27d.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (736, 257, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657362/257.3_kczvt1.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (737, 258, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657376/258.1_bi1lbt.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (738, 258, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657391/258.2_wac7hw.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (739, 258, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657405/258.3_ishw5p.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (740, 259, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657420/259.1_qmwkhn.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (741, 259, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657435/259.2_kbzk46.webp')
INSERT [dbo].[ProductImage] ([image_id], [product_id], [image_url]) VALUES (742, 259, N'https://res.cloudinary.com/ddedwlu2h/image/upload/v1750657450/259.3_lpyu9j.webp')
SET IDENTITY_INSERT [dbo].[ProductImage] OFF
GO
SET IDENTITY_INSERT [dbo].[OrderItem] ON

INSERT INTO [dbo].[OrderItem] ([order_item_id], [order_id], [product_id], [quantity], [price]) VALUES
(1, 1, 2, 1, 74000.00),
(2, 1, 5, 2, 467000.00),
(3, 2, 3, 1, 262000.00),
(4, 3, 4, 1, 493000.00),
(5, 3, 2, 1, 74000.00),
(6, 4, 7, 2, 166000.00),
(7, 5, 8, 1, 366000.00),
(8, 6, 9, 1, 212000.00),
(9, 6, 3, 1, 262000.00),
(10, 6, 6, 1, 240000.00),
(11, 7, 1, 1, 202000.00),
(12, 8, 5, 1, 467000.00),
(13, 8, 2, 2, 74000.00),
(14, 9, 10, 1, 315000.00),
(15, 10, 4, 2, 493000.00),
(16, 11, 6, 1, 240000.00),
(17, 11, 3, 1, 262000.00),
(18, 12, 7, 1, 166000.00),
(19, 13, 2, 3, 74000.00),
(20, 14, 8, 1, 366000.00),
(21, 15, 1, 2, 202000.00),
(22, 16, 9, 1, 212000.00),
(23, 16, 4, 2, 493000.00),
(24, 17, 5, 1, 467000.00),
(25, 18, 6, 2, 240000.00),
(26, 19, 3, 1, 262000.00),
(27, 19, 2, 1, 74000.00),
(28, 20, 10, 2, 315000.00);

SET IDENTITY_INSERT [dbo].[OrderItem] OFF
GO
SET IDENTITY_INSERT [dbo].[Resolution] ON 

INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (1, 1, N'Đã yêu cầu người bán gửi đúng sản phẩm.', CAST(N'2025-05-03T23:22:55.637' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (2, 2, N'Đã làm việc với đơn vị vận chuyển để đẩy nhanh quá trình giao hàng.', CAST(N'2025-05-07T23:22:55.640' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (3, 3, N'Đã yêu cầu người bán cải thiện chất lượng sản phẩm.', CAST(N'2025-05-14T23:22:55.640' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (4, 4, N'Đã xác minh và xử lý đơn hàng bị sai trạng thái.', CAST(N'2025-05-08T23:22:55.643' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (5, 5, N'Đã điều chỉnh lại giá và hoàn trả chênh lệch.', CAST(N'2025-05-22T23:22:55.643' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (6, 6, N'Đã yêu cầu người bán cập nhật ảnh thật của sản phẩm.', CAST(N'2025-05-19T23:22:55.647' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (7, 7, N'Đã gửi bù phụ kiện bị thiếu.', CAST(N'2025-05-19T23:22:55.647' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (8, 8, N'Đã liên hệ người bán để phản hồi khách hàng.', CAST(N'2025-05-28T23:22:55.647' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (9, 9, N'Đã gửi bù phụ kiện bị thiếu.', CAST(N'2025-05-21T23:22:55.650' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (10, 10, N'Đã yêu cầu người bán cải thiện chất lượng sản phẩm.', CAST(N'2025-05-25T23:22:55.653' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (11, 11, N'Đã gửi lại sản phẩm đúng kích cỡ.', CAST(N'2025-06-05T23:22:55.657' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (12, 12, N'Đã nhắc nhở người bán về thái độ phục vụ.', CAST(N'2025-05-12T23:22:55.657' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (13, 13, N'Đã gửi bù phụ kiện bị thiếu.', CAST(N'2025-04-30T23:22:55.657' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (14, 14, N'Đã gửi bù phụ kiện bị thiếu.', CAST(N'2025-06-22T23:22:55.657' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (15, 15, N'Đã nhắc nhở người bán về thái độ phục vụ.', CAST(N'2025-06-22T23:22:55.660' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (16, 16, N'Đã yêu cầu người bán cập nhật ảnh thật của sản phẩm.', CAST(N'2025-05-18T23:22:55.660' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (17, 17, N'Đã nhắc nhở người bán về thái độ phục vụ.', CAST(N'2025-06-15T23:22:55.660' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (18, 18, N'Đã xác nhận thất lạc và hoàn tiền toàn bộ.', CAST(N'2025-05-06T23:22:55.660' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (19, 19, N'Đã yêu cầu người bán cải thiện chất lượng sản phẩm.', CAST(N'2025-06-06T23:22:55.663' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (20, 20, N'Đã yêu cầu người bán cải thiện chất lượng sản phẩm.', CAST(N'2025-06-15T23:22:55.663' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (21, 21, N'Đã yêu cầu người bán gửi đúng sản phẩm.', CAST(N'2025-06-13T23:22:55.663' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (22, 22, N'Đã hoàn tiền 50% giá trị sản phẩm.', CAST(N'2025-05-20T23:22:55.667' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (23, 23, N'Đã xác minh và xử lý đơn hàng bị sai trạng thái.', CAST(N'2025-06-23T23:22:55.667' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (24, 24, N'Đã yêu cầu người bán gửi đúng sản phẩm.', CAST(N'2025-06-22T23:22:55.670' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (25, 25, N'Đã hoàn tiền 50% giá trị sản phẩm.', CAST(N'2025-05-15T23:22:55.670' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (26, 26, N'Đã cập nhật thông tin liên hệ cho người bán.', CAST(N'2025-06-20T23:22:55.670' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (27, 27, N'Đã yêu cầu người bán gửi đúng sản phẩm.', CAST(N'2025-05-28T23:22:55.673' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (28, 28, N'Đã yêu cầu người bán vệ sinh sản phẩm trước khi gửi.', CAST(N'2025-05-12T23:22:55.673' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (29, 29, N'Đã hoàn tiền 50% giá trị sản phẩm.', CAST(N'2025-06-18T23:22:55.677' AS DateTime))
INSERT [dbo].[Resolution] ([resolution_id], [complaint_id], [result], [resolution_date]) VALUES (30, 30, N'Đã hướng dẫn quy trình đổi trả hàng chi tiết.', CAST(N'2025-06-10T23:22:55.680' AS DateTime))
SET IDENTITY_INSERT [dbo].[Resolution] OFF
GO
SET IDENTITY_INSERT [dbo].[Review] ON 

INSERT [dbo].[Review] ([review_id], [product_id], [account_id], [rating], [comment], [review_date]) VALUES (1, 197, 117, 4, N'Phù hợp với giá tiền, sẽ mua thêm nếu có dịp.', CAST(N'2025-05-30T23:22:55.837' AS DateTime))
INSERT [dbo].[Review] ([review_id], [product_id], [account_id], [rating], [comment], [review_date]) VALUES (2, 164, 55, 3, N'Sản phẩm tốt ngoài mong đợi!', CAST(N'2025-04-18T23:22:55.837' AS DateTime))
INSERT [dbo].[Review] ([review_id], [product_id], [account_id], [rating], [comment], [review_date]) VALUES (3, 223, 77, 5, N'Vải rất mát, mặc không bị bí.', CAST(N'2025-06-07T23:22:55.843' AS DateTime))
INSERT [dbo].[Review] ([review_id], [product_id], [account_id], [rating], [comment], [review_date]) VALUES (4, 21, 103, 4, N'Hài lòng về chất lượng sản phẩm và dịch vụ.', CAST(N'2025-04-13T23:22:55.847' AS DateTime))
INSERT [dbo].[Review] ([review_id], [product_id], [account_id], [rating], [comment], [review_date]) VALUES (5, 131, 92, 5, N'Đóng gói cẩn thận, sản phẩm không có lỗi.', CAST(N'2025-05-12T23:22:55.853' AS DateTime))
INSERT [dbo].[Review] ([review_id], [product_id], [account_id], [rating], [comment], [review_date]) VALUES (6, 99, 85, 4, N'Khá hài lòng, chỉ có điều gói hàng hơi sơ sài.', CAST(N'2025-05-02T23:22:55.860' AS DateTime))
INSERT [dbo].[Review] ([review_id], [product_id], [account_id], [rating], [comment], [review_date]) VALUES (7, 23, 51, 4, N'Sản phẩm đẹp, chất lượng tốt. Giao hàng nhanh chóng.', CAST(N'2025-05-25T23:22:55.863' AS DateTime))
INSERT [dbo].[Review] ([review_id], [product_id], [account_id], [rating], [comment], [review_date]) VALUES (8, 230, 83, 4, N'Phù hợp với giá tiền, sẽ mua thêm nếu có dịp.', CAST(N'2025-04-29T23:22:55.870' AS DateTime))
INSERT [dbo].[Review] ([review_id], [product_id], [account_id], [rating], [comment], [review_date]) VALUES (9, 250, 109, 3, N'Chắc chắn sẽ mua lại từ shop này.', CAST(N'2025-06-21T23:22:55.873' AS DateTime))
INSERT [dbo].[Review] ([review_id], [product_id], [account_id], [rating], [comment], [review_date]) VALUES (10, 84, 61, 3, N'Đánh giá cao sự tận tình của người bán.', CAST(N'2025-04-13T23:22:55.880' AS DateTime))
SET IDENTITY_INSERT [dbo].[Review] OFF
GO
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([role_id], [role_name]) VALUES (1, N'admin')
INSERT [dbo].[Role] ([role_id], [role_name]) VALUES (3, N'customer')
INSERT [dbo].[Role] ([role_id], [role_name]) VALUES (4, N'guest')
INSERT [dbo].[Role] ([role_id], [role_name]) VALUES (2, N'seller')
SET IDENTITY_INSERT [dbo].[Role] OFF
GO
SET IDENTITY_INSERT [dbo].[Shipping] ON 

INSERT [dbo].[Shipping] ([shipping_id], [order_id], [carrier], [status], [shipping_date]) VALUES (1, 1, N'Giao hàng nhanh', N'Đã giao', CAST(N'2025-05-27T23:22:55.570' AS DateTime))
INSERT [dbo].[Shipping] ([shipping_id], [order_id], [carrier], [status], [shipping_date]) VALUES (2, 2, N'Giao hàng tiết kiệm', N'Đã giao', CAST(N'2025-05-29T23:22:55.570' AS DateTime))
INSERT [dbo].[Shipping] ([shipping_id], [order_id], [carrier], [status], [shipping_date]) VALUES (3, 3, N'Viettel Post', N'Đã giao', CAST(N'2025-06-01T23:22:55.570' AS DateTime))
INSERT [dbo].[Shipping] ([shipping_id], [order_id], [carrier], [status], [shipping_date]) VALUES (4, 4, N'Giao hàng nhanh', N'Đang vận chuyển', CAST(N'2025-06-05T23:22:55.570' AS DateTime))
INSERT [dbo].[Shipping] ([shipping_id], [order_id], [carrier], [status], [shipping_date]) VALUES (5, 5, N'Viettel Post', N'Đã hủy', CAST(N'2025-06-07T23:22:55.570' AS DateTime))
INSERT [dbo].[Shipping] ([shipping_id], [order_id], [carrier], [status], [shipping_date]) VALUES (6, 6, N'Giao hàng tiết kiệm', N'Đã giao', CAST(N'2025-06-11T23:22:55.570' AS DateTime))
INSERT [dbo].[Shipping] ([shipping_id], [order_id], [carrier], [status], [shipping_date]) VALUES (7, 7, N'Giao hàng nhanh', N'Đã giao', CAST(N'2025-06-14T23:22:55.570' AS DateTime))
INSERT [dbo].[Shipping] ([shipping_id], [order_id], [carrier], [status], [shipping_date]) VALUES (8, 8, N'Viettel Post', N'Đang vận chuyển', CAST(N'2025-06-16T23:22:55.570' AS DateTime))
INSERT [dbo].[Shipping] ([shipping_id], [order_id], [carrier], [status], [shipping_date]) VALUES (9, 9, N'Giao hàng tiết kiệm', N'Đã giao', CAST(N'2025-06-18T23:22:55.570' AS DateTime))
INSERT [dbo].[Shipping] ([shipping_id], [order_id], [carrier], [status], [shipping_date]) VALUES (10, 10, N'Giao hàng nhanh', N'Đã giao', CAST(N'2025-06-19T23:22:55.570' AS DateTime))
INSERT [dbo].[Shipping] ([shipping_id], [order_id], [carrier], [status], [shipping_date]) VALUES (11, 11, N'Viettel Post', N'Đã giao', CAST(N'2025-06-21T23:22:55.570' AS DateTime))
INSERT [dbo].[Shipping] ([shipping_id], [order_id], [carrier], [status], [shipping_date]) VALUES (12, 12, N'Giao hàng tiết kiệm', N'Đang vận chuyển', CAST(N'2025-06-22T23:22:55.570' AS DateTime))
INSERT [dbo].[Shipping] ([shipping_id], [order_id], [carrier], [status], [shipping_date]) VALUES (13, 13, N'Giao hàng nhanh', N'Đã hủy', CAST(N'2025-06-23T23:22:55.570' AS DateTime))
INSERT [dbo].[Shipping] ([shipping_id], [order_id], [carrier], [status], [shipping_date]) VALUES (14, 14, N'Viettel Post', N'Đã giao', CAST(N'2025-06-24T23:22:55.570' AS DateTime))
INSERT [dbo].[Shipping] ([shipping_id], [order_id], [carrier], [status], [shipping_date]) VALUES (15, 15, N'Giao hàng tiết kiệm', N'Đã giao', CAST(N'2025-06-24T23:22:55.570' AS DateTime))
INSERT [dbo].[Shipping] ([shipping_id], [order_id], [carrier], [status], [shipping_date]) VALUES (16, 16, N'Giao hàng nhanh', N'Đang đóng gói', CAST(N'2025-06-24T23:22:55.570' AS DateTime))
INSERT [dbo].[Shipping] ([shipping_id], [order_id], [carrier], [status], [shipping_date]) VALUES (17, 17, N'Viettel Post', N'Đang vận chuyển', CAST(N'2025-06-24T23:22:55.570' AS DateTime))
INSERT [dbo].[Shipping] ([shipping_id], [order_id], [carrier], [status], [shipping_date]) VALUES (18, 18, N'Giao hàng tiết kiệm', N'Đang đóng gói', CAST(N'2025-06-24T23:22:55.570' AS DateTime))
INSERT [dbo].[Shipping] ([shipping_id], [order_id], [carrier], [status], [shipping_date]) VALUES (19, 19, N'Giao hàng nhanh', N'Đã giao', CAST(N'2025-06-24T23:22:55.570' AS DateTime))
INSERT [dbo].[Shipping] ([shipping_id], [order_id], [carrier], [status], [shipping_date]) VALUES (20, 20, N'Viettel Post', N'Đang vận chuyển', CAST(N'2025-06-24T23:22:55.570' AS DateTime))
SET IDENTITY_INSERT [dbo].[Shipping] OFF
GO
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (1, N'Nguyễn Văn Anh', N'nguyenvananh@gmail.com', N'0901234567', N'123 Đường Lý Thường Kiệt, Q.1, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (2, N'Trần Thị Hồng', N'tranthihong@gmail.com', N'0902345678', N'456 Đường Lê Lợi, Q. Bình Thạnh, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (3, N'Lê Văn Cường', N'levancuong@gmail.com', N'0903456789', N'789 Đường Hai Bà Trưng, Q. Hoàn Kiếm, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (4, N'Phạm Thị Nương', N'phamthinuong@gmail.com', N'0904567890', N'101 Đường Nguyễn Huệ, Q. Thốt Nốt, Cần Thơ')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (5, N'Hoàng Văn Khoa', N'hoangvankhoa@gmail.com', N'0905678901', N'202 Đường Hùng Vương, Q. Hải Châu, Đà Nẵng')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (6, N'Đặng Thị Mai', N'dangthimai@gmail.com', N'0906789012', N'303 Đường Trần Phú, P. Cái Khế, Cần Thơ')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (7, N'Vũ Văn Nam', N'vuvannam@gmail.com', N'0907890123', N'404 Đường Nguyễn Tri Phương, Q. Thanh Khê, Đà Nẵng')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (8, N'Bùi Thị Châu', N'buithichau@gmail.com', N'0908901234', N'505 Đường Đinh Tiên Hoàng, Q. Ba Đình, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (9, N'Ngô Văn Lương', N'ngovanluong@gmail.com', N'0909012345', N'606 Đường Phan Chu Trinh, Q. Tây Hồ, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (10, N'Dương Thị Đào', N'duongthidao@gmail.com', N'0910123456', N'707 Đường Nguyễn Đình Chiểu, Q.3, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (11, N'Trịnh Văn Luân', N'trinhvanluan@gmail.com', N'0911234567', N'808 Đường Cách Mạng Tháng Tám, Q.10, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (12, N'Đỗ Thị Mười', N'dothimuoi@gmail.com', N'0912345678', N'909 Đường Quang Trung, Q. Gò Vấp, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (13, N'Lý Văn Nghĩa', N'lyvannghia@gmail.com', N'0938728172', N'111 Đường Bà Triệu, Q. Hai Bà Trưng, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (14, N'Phan Thị Phương', N'phanthiphuong@gmail.com', N'0914567890', N'222 Đường Trần Hưng Đạo, Q. Sơn Trà, Đà Nẵng')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (15, N'Tô Văn Quỳnh', N'tovanquynh@gmail.com', N'0915678901', N'333 Đường 3 Tháng 2, Q. Ninh Kiều, Cần Thơ')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (16, N'Châu Thị Hoài', N'chauthihoai@gmail.com', N'0916789012', N'444 Đường Sư Vạn Hạnh, Q.10, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (17, N'Nguyễn Văn Sơn', N'nguyenvanson@gmail.com', N'0917890123', N'555 Đường Lạc Long Quân, Q. Tây Hồ, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (18, N'Trần Thị Tâm', N'tranthitam@gmail.com', N'0918901234', N'666 Đường Nguyễn Thị Minh Khai, Q.1, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (19, N'Lê Văn Luyện', N'levanluyen@gmail.com', N'0919012345', N'777 Đường Bạch Đằng, Q. Hoàn Kiếm, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (20, N'Phạm Thị Vượng', N'phamthivuong@gmail.com', N'0920123456', N'888 Đường Đồng Khởi, Q.1, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (21, N'Hoàng Văn Khiêm', N'hoangvankhiem@gmail.com', N'0921234567', N'999 Đường Cầu Giấy, Q. Cầu Giấy, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (22, N'Đặng Thị Như Anh', N'dangthinhuanh@gmail.com', N'0922345678', N'123 Đường Nam Kỳ Khởi Nghĩa, Q.3, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (23, N'Vũ Văn Đức', N'vuvanduc@gmail.com', N'0923456789', N'456 Đường Tràng Thi, Q. Hoàn Kiếm, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (24, N'Bùi Thị Hương', N'buithihuong@gmail.com', N'0924567890', N'789 Đường Trần Duy Hưng, Q. Cầu Giấy, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (25, N'Ngô Văn Hào', N'ngovanhao@gmail.com', N'0925678901', N'101 Đường Phan Kế Bính, Q. Ba Đình, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (26, N'Dương Thị Quế', N'duongthique@gmail.com', N'0926789012', N'202 Đường Hồ Tùng Mậu, Q. Cầu Giấy, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (27, N'Trịnh Văn Trung', N'trinhvantrung@gmail.com', N'0927890123', N'303 Đường Xã Đàn, Q. Đống Đa, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (28, N'Đỗ Thị Cúc', N'dothicuc@gmail.com', N'0928901234', N'404 Đường Láng Hạ, Q. Đống Đa, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (29, N'Lý Văn Trác', N'lyvantrac@gmail.com', N'0929012345', N'505 Đường Huỳnh Thúc Kháng, Q. Đống Đa, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (30, N'Phan Thị Nguyệt', N'phanthinguyet@gmail.com', N'0930123456', N'606 Đường Phạm Văn Đồng, Q. Bắc Từ Liêm, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (31, N'Tô Văn Lâm', N'tovanlam@gmail.com', N'0931234567', N'707 Đường Nguyễn Trãi, Q. Thanh Xuân, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (32, N'Châu Thị Nhàn', N'chauthinhan@gmail.com', N'0932345678', N'808 Đường Khuất Duy Tiến, Q. Thanh Xuân, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (33, N'Nguyễn Văn Phi', N'nguyenvanphi@gmail.com', N'0933456789', N'909 Đường Giải Phóng, Q. Hoàng Mai, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (34, N'Trần Thị Giang', N'tranthigiang@gmail.com', N'0934567890', N'111 Đường Minh Khai, Q. Hai Bà Trưng, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (35, N'Lê Văn Thái', N'levanthai@gmail.com', N'0935678901', N'222 Đường Đại Cồ Việt, Q. Hai Bà Trưng, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (36, N'Phạm Thị Linh', N'phamthilinh@gmail.com', N'0936789012', N'333 Đường Kim Mã, Q. Ba Đình, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (37, N'Hoàng Văn Hải', N'hoangvanhai@gmail.com', N'0937890123', N'444 Đường Nguyễn Thái Học, Q. Ba Đình, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (38, N'Đặng Thị Dung', N'dangthidung@gmail.com', N'0938901234', N'555 Đường Điện Biên Phủ, Q. Ba Đình, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (39, N'Vũ Văn Danh', N'vuvandanh@gmail.com', N'0939012345', N'666 Đường Hàng Gai, Q. Hoàn Kiếm, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (40, N'Bùi Thị Nương', N'buithinuong@gmail.com', N'0940123456', N'777 Đường Lý Thái Tổ, Q. Hoàn Kiếm, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (41, N'Ngô Văn Tài', N'ngovantai@gmail.com', N'0941234567', N'888 Đường Hàng Đào, Q. Hoàn Kiếm, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (42, N'Dương Thị Loan', N'duongthiloan@gmail.com', N'0942345678', N'999 Đường Tràng Tiền, Q. Hoàn Kiếm, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (43, N'Trịnh Văn Quyết', N'trinhvanquyet@gmail.com', N'0943456789', N'123 Đường Phan Đình Phùng, Q. Ba Đình, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (44, N'Đỗ Thị Hoa', N'dothihoa@gmail.com', N'0944567890', N'456 Đường Quán Thánh, Q. Ba Đình, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (45, N'Lý Văn Lộc', N'lyvanloc@gmail.com', N'0945678901', N'789 Đường Thụy Khuê, Q. Tây Hồ, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (46, N'Phan Thị Thảo', N'phanthithao@gmail.com', N'0946789012', N'101 Đường Hoàng Hoa Thám, Q. Ba Đình, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (47, N'Tô Văn Sơn', N'tovanson@gmail.com', N'0947890123', N'202 Đường Văn Cao, Q. Ba Đình, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (48, N'Châu Thị Thơ', N'chauthitho@gmail.com', N'0948901234', N'303 Đường Phạm Hùng, Q. Nam Từ Liêm, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (49, N'Nguyễn Văn Cảnh', N'nguyenvancanh@gmail.com', N'0949012345', N'404 Đường Trần Thái Tông, Q. Cầu Giấy, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (50, N'Trần Thị Thư', N'tranthithu@gmail.com', N'0950123456', N'505 Đường Duy Tân, Q. Cầu Giấy, Hà Nội')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (51, N'Lê Văn Đức', N'levanduc@gmail.com', N'0951234567', N'606 Đường Thành Thái, Q.10, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (52, N'Phạm Thị Liên', N'phamthilien@gmail.com', N'0952345678', N'707 Đường Tô Hiến Thành, Q.10, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (53, N'Hoàng Văn Sỹ', N'hoangvansy@gmail.com', N'0953456789', N'808 Đường Sư Vạn Hạnh, Q.10, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (54, N'Đặng Thị Nhi', N'dangthinhi@gmail.com', N'0954567890', N'909 Đường Lý Thái Tổ, Q.3, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (55, N'Vũ Văn Dương', N'vuvanduong@gmail.com', N'0955678901', N'123 Đường Hai Bà Trưng, Q.3, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (56, N'Bùi Thị Thuý', N'buithithuy@gmail.com', N'0956789012', N'456 Đường Nam Kỳ Khởi Nghĩa, Q.3, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (57, N'Ngô Văn Phong', N'ngovanphong@gmail.com', N'0957890123', N'789 Đường Võ Thị Sáu, Q.3, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (58, N'Dương Thị Ân', N'duongthian@gmail.com', N'0958901234', N'101 Đường Nguyễn Thị Minh Khai, Q.1, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (59, N'Trịnh Văn Tuấn', N'trinhvantuan@gmail.com', N'0959012345', N'202 Đường Lê Duẩn, Q.1, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (60, N'Đỗ Thị Loan', N'dothiloan@gmail.com', N'0960123456', N'303 Đường Lê Lai, Q.1, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (61, N'Lý Văn Hào', N'lyvanhao@gmail.com', N'0961234567', N'404 Đường Phạm Ngũ Lão, Q.1, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (62, N'Phan Thị Hà', N'phanthiha@gmail.com', N'0962345678', N'505 Đường Bùi Viện, Q.1, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (63, N'Tô Văn Nhật', N'tovannhat@gmail.com', N'0963456789', N'606 Đường Trần Quang Khải, Q.1, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (64, N'Châu Thị Phương', N'chauthiphuong@gmail.com', N'0964567890', N'707 Đường Võ Văn Tần, Q.3, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (65, N'Nguyễn Văn Phú', N'nguyenvanphu@gmail.com', N'0965678901', N'808 Đường Nguyễn Thị Diệu, Q.3, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (66, N'Trần Thị Hoàn', N'tranthihoan@gmail.com', N'0966789012', N'909 Đường Ngô Thời Nhiệm, Q.3, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (67, N'Lê Văn Toản', N'levantoan@gmail.com', N'0967890123', N'111 Đường Trần Quốc Thảo, Q.3, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (68, N'Phạm Thị Vi', N'phamthivi@gmail.com', N'0968901234', N'222 Đường Nguyễn Văn Thủ, Q.1, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (69, N'Hoàng Văn Tân', N'hoangvantan@gmail.com', N'0969012345', N'333 Đường Nguyễn Bỉnh Khiêm, Q.1, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (70, N'Đặng Thị Mi', N'dangthimi@gmail.com', N'0970123456', N'444 Đường Nguyễn Đình Chiểu, Q.1, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (71, N'Vũ Văn Trí', N'vuvantri@gmail.com', N'0971234567', N'555 Đường Phạm Ngọc Thạch, Q.3, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (72, N'Bùi Thị Yến', N'buithiyen@gmail.com', N'0972345678', N'666 Đường Lê Quý Đôn, Q.3, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (73, N'Ngô Gia Kiệt', N'ngogiakiet@gmail.com', N'0973456789', N'777 Đường Pasteur, Q.3, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (74, N'Dương Thị Sương', N'duongthisuong@gmail.com', N'0974567890', N'888 Đường Nguyễn Đình Chính, Q. Phú Nhuận, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (75, N'Trịnh Văn Minh', N'trinhvanminh@gmail.com', N'0975678901', N'999 Đường Phan Đình Phùng, Q. Phú Nhuận, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (76, N'Đỗ Thị Vân', N'dothivan@gmail.com', N'0976789012', N'123 Đường Hoàng Văn Thụ, Q. Phú Nhuận, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (77, N'Lý Văn Tân', N'lyvantan@gmail.com', N'0977890123', N'456 Đường Nguyễn Kiệm, Q. Gò Vấp, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (78, N'Phan Thị Trang', N'phanthitrang@gmail.com', N'0978901234', N'789 Đường Phan Văn Trị, Q. Gò Vấp, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (79, N'Tô Văn Hải', N'tovanhai@gmail.com', N'0979012345', N'101 Đường Lê Quang Định, Q. Bình Thạnh, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (80, N'Châu Thị Khuê', N'chauthikhue@gmail.com', N'0980123456', N'202 Đường Nơ Trang Long, Q. Bình Thạnh, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (81, N'Nguyễn Văn Linh', N'nguyenvanlinh@gmail.com', N'0981234567', N'303 Đường Đinh Bộ Lĩnh, Q. Bình Thạnh, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (82, N'Trần Thị Thơ', N'tranthitho@gmail.com', N'0982345678', N'404 Đường Nguyễn Xí, Q. Bình Thạnh, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (83, N'Lê Văn Sơn', N'levanson@gmail.com', N'0983456789', N'505 Đường Ung Văn Khiêm, Q. Bình Thạnh, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (84, N'Phạm Thị My', N'phamthimy@gmail.com', N'0984567890', N'606 Đường Dân Chủ, Q. Thủ Đức, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (85, N'Hoàng Văn Hưng', N'hoangvanhung@gmail.com', N'0985678901', N'707 Đường Võ Văn Ngân, Q. Thủ Đức, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (86, N'Đặng Thị Xuân', N'dangthixuan@gmail.com', N'0986789012', N'808 Đường Kha Vạn Cân, Q. Thủ Đức, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (87, N'Vũ Văn Việt', N'vuvanviet@gmail.com', N'0987890123', N'909 Đường Quốc Lộ 13, Q. Thủ Đức, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (88, N'Bùi Thị Lợi', N'buithiloi@gmail.com', N'0988901234', N'111 Đường Đoàn Kết, Q. Thủ Đức, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (89, N'Ngô Văn Vương', N'ngovanvuong@gmail.com', N'0989012345', N'222 Đường Thống Nhất, Q. Gò Vấp, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (90, N'Dương Thị Mai', N'duongthimai@gmail.com', N'0990123456', N'333 Đường Nguyễn Oanh, Q. Gò Vấp, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (91, N'Trịnh Văn Dũng', N'trinhvandung@gmail.com', N'0991234567', N'444 Đường Phạm Văn Chiêu, Q. Gò Vấp, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (92, N'Đỗ Thị Lâm', N'dothilam@gmail.com', N'0992345678', N'555 Đường Lê Đức Thọ, Q. Gò Vấp, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (93, N'Lý Văn Minh', N'lyvanminh@gmail.com', N'0993456789', N'666 Đường Nguyễn Văn Lượng, Q. Gò Vấp, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (94, N'Phan Thị Tuyền', N'phanthituyen@gmail.com', N'0994567890', N'777 Đường Nguyễn Văn Khối, Q. Gò Vấp, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (95, N'Tô Văn Chiểu', N'tovanchieu@gmail.com', N'0995678901', N'888 Đường Cây Trâm, Q. Gò Vấp, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (96, N'Châu Thị Yến', N'chauthiyen@gmail.com', N'0996789012', N'999 Đường Quang Trung, Q. Gò Vấp, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (97, N'Nguyễn Văn Thanh', N'nguyenvanthanh@gmail.com', N'0997890123', N'123 Đường Trường Chinh, Q. Tân Bình, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (98, N'Trần Thị Vân', N'tranthivan@gmail.com', N'0998901234', N'456 Đường Cộng Hòa, Q. Tân Bình, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (99, N'Lê Văn Hoà', N'levanhoa@gmail.com', N'0999012345', N'789 Đường Hoàng Văn Thụ, Q. Tân Bình, TP.HCM')
GO
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (100, N'Phạm Thị Quyên', N'phamthiquyen@gmail.com', N'0910234567', N'101 Đường Cách Mạng Tháng 8, Q. Tân Bình, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (101, N'Hoàng Văn Tuấn', N'hoangvantuan@gmail.com', N'0911345678', N'202 Đường Thành Thái, Q.10, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (102, N'Đặng Thị Bình', N'dangthibinh@gmail.com', N'0912456789', N'303 Đường 3 Tháng 2, Q.10, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (103, N'Vũ Văn Thành', N'vuvanthanh@gmail.com', N'0913567890', N'404 Đường Sư Vạn Hạnh, Q.10, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (104, N'Bùi Thị Thanh', N'buithithanh@gmail.com', N'0914678901', N'505 Đường Lý Thường Kiệt, Q.10, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (105, N'Ngô Văn Khanh', N'ngovankhanh@gmail.com', N'0915789012', N'606 Đường Bắc Hải, Q.10, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (106, N'Dương Thị Xuân', N'duongthixuan@gmail.com', N'0916890123', N'707 Đường Tô Hiến Thành, Q.10, TP.HCM')
INSERT [dbo].[User] ([user_id], [name], [email], [phone], [address]) VALUES (107, N'Trịnh Văn Châu', N'trinhvanchau@gmail.com', N'0917901234', N'808 Đường Lê Duẩn, Q.1, TP.HCM')
SET IDENTITY_INSERT [dbo].[User] OFF
GO
/****** Object:  Index [UQ__Payment__4659622826281729]    Script Date: 6/25/2025 9:28:45 AM ******/
ALTER TABLE [dbo].[Payment] ADD UNIQUE NONCLUSTERED 
(
	[order_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__Resoluti__A771F61D5AC3D260]    Script Date: 6/25/2025 9:28:45 AM ******/
ALTER TABLE [dbo].[Resolution] ADD UNIQUE NONCLUSTERED 
(
	[complaint_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Role__783254B124E87766]    Script Date: 6/25/2025 9:28:45 AM ******/
ALTER TABLE [dbo].[Role] ADD UNIQUE NONCLUSTERED 
(
	[role_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__Shipping__46596228D40E4491]    Script Date: 6/25/2025 9:28:45 AM ******/
ALTER TABLE [dbo].[Shipping] ADD UNIQUE NONCLUSTERED 
(
	[order_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__User__AB6E616407C13D67]    Script Date: 6/25/2025 9:28:45 AM ******/
ALTER TABLE [dbo].[User] ADD UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Complaint] ADD  DEFAULT (getdate()) FOR [complaint_date]
GO
ALTER TABLE [dbo].[Order] ADD  DEFAULT (getdate()) FOR [order_date]
GO
ALTER TABLE [dbo].[Payment] ADD  DEFAULT (getdate()) FOR [payment_date]
GO
ALTER TABLE [dbo].[Resolution] ADD  DEFAULT (getdate()) FOR [resolution_date]
GO
ALTER TABLE [dbo].[Review] ADD  DEFAULT (getdate()) FOR [review_date]
GO
ALTER TABLE [dbo].[Account]  WITH CHECK ADD FOREIGN KEY([role_id])
REFERENCES [dbo].[Role] ([role_id])
GO
ALTER TABLE [dbo].[Account]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[User] ([user_id])
GO
ALTER TABLE [dbo].[Complaint]  WITH CHECK ADD FOREIGN KEY([account_id])
REFERENCES [dbo].[Account] ([account_id])
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD FOREIGN KEY([account_id])
REFERENCES [dbo].[Account] ([account_id])
GO
ALTER TABLE [dbo].[Payment]  WITH CHECK ADD FOREIGN KEY([order_id])
REFERENCES [dbo].[Order] ([order_id])
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD FOREIGN KEY([account_id])
REFERENCES [dbo].[Account] ([account_id])
GO
ALTER TABLE [dbo].[ProductImage]  WITH CHECK ADD FOREIGN KEY([product_id])
REFERENCES [dbo].[Product] ([product_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Resolution]  WITH CHECK ADD FOREIGN KEY([complaint_id])
REFERENCES [dbo].[Complaint] ([complaint_id])
GO
ALTER TABLE [dbo].[Review]  WITH CHECK ADD FOREIGN KEY([account_id])
REFERENCES [dbo].[Account] ([account_id])
GO
ALTER TABLE [dbo].[Review]  WITH CHECK ADD FOREIGN KEY([product_id])
REFERENCES [dbo].[Product] ([product_id])
GO
ALTER TABLE [dbo].[Shipping]  WITH CHECK ADD FOREIGN KEY([order_id])
REFERENCES [dbo].[Order] ([order_id])
GO
ALTER TABLE [dbo].[Review]  WITH CHECK ADD CHECK  (([rating]>=(1) AND [rating]<=(5)))
GO
USE [master]
GO
ALTER DATABASE [SecondWearDB] SET  READ_WRITE 
GO
