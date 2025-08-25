import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./css/ProfilePage.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { API_BASE_URL } from "./apiConfig";

const ProfilePage = ({ t }) => {
  const { currentUser, token, updateUserAvatar } = useAuth();

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
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError("Vui lòng đăng nhập.");
        return;
      }
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const accRes = await axios.get(
          `${API_BASE_URL}/api/accounts/me`,
          config
        );
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
  }, [token]);

  const handleAvatarClick = () => {
    if (!isLoadingAvatar) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file || !currentUser) return;

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    setIsLoadingAvatar(true);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/accounts/${currentUser.accountId}/avatar`,
        uploadFormData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newAvatarUrl = response.data.avatarUrl;

      updateUserAvatar(newAvatarUrl);

      setAccount((prevAccount) => ({
        ...prevAccount,
        avatarUrl: newAvatarUrl,
      }));
    } catch (err) {
      console.error("Lỗi upload avatar:", err);
      setError("Cập nhật avatar thất bại!");
    } finally {
      setIsLoadingAvatar(false);
    }
  };

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

    const config = { headers: { Authorization: `Bearer ${token}` } };
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
      alert(
        "Vui lòng cập nhật đầy đủ Họ tên, Số điện thoại và Địa chỉ trước khi đăng ký bán hàng."
      );
      setEditing(true);
    } else {
      navigate("/become-seller");
    }
  };

  const renderSellerStatus = () => {
    if (!account) return null;

    switch (account.sellerStatus) {
      case "PENDING":
        return (
          <div className="seller-status pending">
            Yêu cầu bán hàng của bạn đang chờ duyệt.
          </div>
        );
      case "APPROVED":
        return (
          <div className="seller-status approved">
            Bạn đã được duyệt làm người bán.
          </div>
        );
      case "REJECTED":
        return (
          <div className="seller-status rejected">
            Yêu cầu bán hàng của bạn đã bị từ chối. Lý do:{" "}
            {account.rejectReason || "Không có lý do cụ thể"}.
            <button
              onClick={handleBecomeSellerClick}
              className="profile-button"
            >
              Đăng ký lại
            </button>
          </div>
        );
      case "NONE":
      default:
        return (
          <div className="seller-status none">
            <p>Bạn muốn bán hàng trên SecondWear?</p>
            <button
              onClick={handleBecomeSellerClick}
              className="profile-button"
            >
              Trở thành người bán ngay
            </button>
          </div>
        );
    }
  };

  if (error) return <div className="profile-error">{error}</div>;
  if (!account || !user) {
    return (
      <div className="profile-loading">
        {t ? t("profile_loading") : "Đang tải thông tin..."}
      </div>
    );
  }

  const defaultAvatar = "/src/icons/black-user-icon.png";
  const avatarToShow =
    currentUser && currentUser.avatarUrl
      ? currentUser.avatarUrl
      : account.avatarUrl || defaultAvatar;

  return (
    <div className="profile-container">
      <h2 className="profile-title">
        {t ? t("profile_title") : "Thông tin cá nhân"}
      </h2>

      {(account.role.roleName.toLowerCase() === "customer" ||
        account.role.roleName.toLowerCase() === "seller") && (
        <div className="seller-status-container">{renderSellerStatus()}</div>
      )}

      <div className="avatar-section" onClick={handleAvatarClick}>
        <img src={avatarToShow} alt="Avatar" className="profile-avatar" />
        <div className="avatar-overlay">
          {isLoadingAvatar ? "Đang tải..." : "Thay đổi"}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>

      <div className="profile-field">
        <label className="profile-label">Email:</label>
        <input value={formData.email} readOnly className="profile-input" />
      </div>

      <div className="profile-field">
        <label className="profile-label">Họ tên:</label>
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          disabled={!editing}
          className="profile-input"
        />
      </div>

      <div className="profile-field">
        <label className="profile-label">Số điện thoại:</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={!editing}
          className="profile-input"
        />
      </div>

      <div className="profile-field">
        <label className="profile-label">Địa chỉ:</label>
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
          Chỉnh sửa
        </button>
      ) : (
        <div className="profile-button-group">
          <button onClick={handleSave} className="profile-button save-button">
            Lưu
          </button>
          <button
            onClick={() => setEditing(false)}
            className="profile-button cancel-button"
          >
            Hủy
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
