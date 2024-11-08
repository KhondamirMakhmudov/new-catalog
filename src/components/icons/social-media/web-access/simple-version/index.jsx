import React from "react";

export const SimpleVersionIcon = ({ props, color = "#9AA8BC" }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.3333 6.50817V13.4915C18.3333 16.5248 16.525 18.3332 13.4917 18.3332H8.125V1.6665H13.4917C16.525 1.6665 18.3333 3.47484 18.3333 6.50817Z"
        fill={color}
      />
      <path
        d="M6.87484 1.6665V18.3332H6.50817C3.47484 18.3332 1.6665 16.5248 1.6665 13.4915V6.50817C1.6665 3.47484 3.47484 1.6665 6.50817 1.6665H6.87484Z"
        fill={color}
      />
    </svg>
  );
};
