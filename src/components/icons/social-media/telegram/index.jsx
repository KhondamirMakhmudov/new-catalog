import React from "react";

export const TelegramIcon = ({ props, color = "white" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.25012 12.6443L16.6799 20.0625C16.7774 20.1484 16.8956 20.2074 17.0228 20.2338C17.15 20.2602 17.2819 20.2532 17.4055 20.2133C17.5292 20.1734 17.6403 20.1021 17.7281 20.0063C17.8159 19.9106 17.8774 19.7937 17.9064 19.667L21.4327 4.27959C21.4632 4.14655 21.4568 4.00771 21.4142 3.87804C21.3716 3.74837 21.2944 3.63277 21.191 3.54371C21.0876 3.45466 20.9618 3.39551 20.8272 3.37265C20.6927 3.3498 20.5544 3.36409 20.4274 3.414L3.12517 10.2113C2.97438 10.2705 2.84683 10.377 2.76159 10.5148C2.67636 10.6526 2.63803 10.8142 2.65235 10.9756C2.66666 11.137 2.73285 11.2894 2.841 11.41C2.94915 11.5307 3.09346 11.613 3.25233 11.6448L8.25012 12.6443Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 12.6442L21.0105 3.42822"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.46 16.3491L9.53033 19.2788C9.42544 19.3837 9.2918 19.4551 9.14632 19.4841C9.00083 19.513 8.85003 19.4982 8.71299 19.4414C8.57594 19.3846 8.45881 19.2885 8.3764 19.1652C8.29399 19.0418 8.25 18.8968 8.25 18.7485V12.6443"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};