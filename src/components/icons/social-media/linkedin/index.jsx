import React from "react";

export const LinkedInIcon = ({ props, color = "#2C3E50" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_850_247)">
        <path
          d="M6 9C6 8.20435 6.31607 7.44129 6.87868 6.87868C7.44129 6.31607 8.20435 6 9 6H27C27.7956 6 28.5587 6.31607 29.1213 6.87868C29.6839 7.44129 30 8.20435 30 9V27C30 27.7956 29.6839 28.5587 29.1213 29.1213C28.5587 29.6839 27.7956 30 27 30H9C8.20435 30 7.44129 29.6839 6.87868 29.1213C6.31607 28.5587 6 27.7956 6 27V9Z"
          stroke={color}
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 16.5V24"
          stroke={color}
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 12V12.015"
          stroke={color}
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 24V16.5"
          stroke={color}
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 24V19.5C24 18.7044 23.6839 17.9413 23.1213 17.3787C22.5587 16.8161 21.7956 16.5 21 16.5C20.2044 16.5 19.4413 16.8161 18.8787 17.3787C18.3161 17.9413 18 18.7044 18 19.5"
          stroke={color}
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_850_247">
          <rect width="36" height="36" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
