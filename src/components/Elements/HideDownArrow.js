import React from "react";

export const HideDownArrow = () => {
  return (
    <style>
      {`
          #dropdownUserAvatarButton::after {
            display: none !important; /* Hides the arrow */
          }
        `}
    </style>
  );
};
