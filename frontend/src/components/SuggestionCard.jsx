import React from "react";
import { useNavigate } from "react-router-dom";

const SuggestionCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="suggestion-card" onClick={() => navigate(`/products/${item.id}`)}>
      <img src={item.image} alt={item.name} className="suggestion-img" />
      <div className="suggestion-details">
        <div className="suggestion-name">{item.name}</div>
        <div className="suggestion-price">
          {item.price.toLocaleString()}<span className="vnd">₫</span>
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;
