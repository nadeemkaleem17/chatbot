import React from "react";
import "./UserAvatar.css";
export const UserAvatar = ({ userName }) => {
  const initial = userName ? userName.charAt(0).toUpperCase() : "?";

  return (
    <div className="user-avatar d-flex align-items-center justify-content-center bg-info text-white rounded-circle">
      {initial}
    </div>
  );
};
