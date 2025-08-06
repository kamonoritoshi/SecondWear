import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ProfilePage.css";

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
        console.log("🧩 account raw response:", accRes.data);
        setAccount(accRes.data);

        const userRes = await axios.get("/api/users/me", config);
        console.log("🧩 user raw response:", userRes.data);
        setUser(userRes.data);
        setFormData({
          email: userRes.data.email || "",
          fullName: userRes.data.name || "",
          phone: userRes.data.phone || "",
          address: userRes.data.address || "",
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

    axios
      .put(`/api/users/${user.userId}`, { ...user, ...formData }, config)
      .then((res) => {
        setUser(res.data);
        setEditing(false);
      })
      .catch(() => setError("Cập nhật thông tin thất bại."));
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
