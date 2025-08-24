import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ProfilePage.css";
import { Link, useNavigate } from 'react-router-dom';

const ProfilePage = ({ t }) => {
  const [account, setAccount] = useState(null);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phone: "",
    address: "",
  });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("jwtToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accRes = await axios.get("/api/accounts/me", config);
        const accountData = accRes.data;
        const userData = accountData.user;

        setAccount(accountData);
        setUser(userData);

        setFormData({
          email: userData.email || "",
          fullName: userData.name || "",
          phone: userData.phone || "",
          address: userData.address || "",
        });
      } catch (err) {
        setError("Không thể tải thông tin người dùng: " + err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (!user || !user.userId) {
      setError("Không thể xác định người dùng.");
      return;
    }

    const updatedUser = {
        ...user,
        name: formData.fullName,
        phone: formData.phone,
        address: formData.address,
    };

    axios
      .put(`/api/users/${user.userId}`, updatedUser, config)
      .then((res) => {
        setUser(res.data);
        setEditing(false);
      })
      .catch(() => setError("Cập nhật thông tin thất bại."));
  };
  
  const handleBecomeSellerClick = () => {
    const { fullName, phone, address } = formData;
    if (!fullName || !phone || !address) {
      alert("Vui lòng cập nhật đầy đủ Họ tên, Số điện thoại và Địa chỉ trước khi đăng ký bán hàng.");
      setEditing(true);
    } else {
      navigate('/become-seller');
    }
  };

  const renderSellerStatus = () => {
    if (!account) return null;

    switch (account.sellerStatus) {
      case 'PENDING':
        return <div className="seller-status pending">Yêu cầu bán hàng của bạn đang chờ duyệt.</div>;
      case 'APPROVED':
        return <div className="seller-status approved">Bạn đã được duyệt làm người bán.</div>;
      case 'REJECTED':
        return (
          <div className="seller-status rejected">
            Yêu cầu bán hàng của bạn đã bị từ chối. Lý do: {account.rejectReason || 'Không có lý do cụ thể'}.
            <button onClick={handleBecomeSellerClick} className="profile-button">Đăng ký lại</button>
          </div>
        );
      case 'NONE':
      default:
        return (
          <div className="seller-status none">
            <p>Bạn muốn bán hàng trên SecondWear?</p>
            <button onClick={handleBecomeSellerClick} className="profile-button">Trở thành người bán ngay</button>
          </div>
        );
    }
  };


  if (error) return <div className="profile-error">{error}</div>;
  if (!account || !user)
    return (
      <div className="profile-loading">
        {t ? t("profile_loading") : "Đang tải thông tin..."}
      </div>
    );

  return (
    <div className="profile-container">
      <h2 className="profile-title">
        {t ? t("profile_title") : "Thông tin cá nhân"}
      </h2>
      
      {/* ✅ ĐIỀU KIỆN ĐƯỢC CẬP NHẬT */}
      {(account.role.roleName.toLowerCase() === 'customer' || account.role.roleName.toLowerCase() === 'seller') && (
        <div className="seller-status-container">
          {renderSellerStatus()}
        </div>
      )}

      <img
        src="/src/icons/black-user-icon.png"
        alt="Avatar"
        className="profile-avatar"
      />

      <div className="profile-field">
        <label className="profile-label">
          {t ? t("profile_email") : "Email:"}
        </label>
        <input value={formData.email} readOnly className="profile-input" />
      </div>

      <div className="profile-field">
        <label className="profile-label">
          {t ? t("profile_full_name") : "Họ tên:"}
        </label>
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          disabled={!editing}
          className="profile-input"
        />
      </div>

      <div className="profile-field">
        <label className="profile-label">
          {t ? t("profile_phone") : "Số điện thoại:"}
        </label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={!editing}
          className="profile-input"
        />
      </div>

      <div className="profile-field">
        <label className="profile-label">
          {t ? t("profile_address") : "Địa chỉ:"}
        </label>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          disabled={!editing}
          className="profile-input"
        />
      </div>

      {!editing ? (
        <button
          onClick={() => setEditing(true)}
          className="profile-button edit-button"
        >
          {t ? t("profile_edit") : "Chỉnh sửa"}
        </button>
      ) : (
        <div className="profile-button-group">
          <button onClick={handleSave} className="profile-button save-button">
            {t ? t("profile_save") : "Lưu"}
          </button>
          <button
            onClick={() => setEditing(false)}
            className="profile-button cancel-button"
          >
            {t ? t("profile_cancel") : "Hủy"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;