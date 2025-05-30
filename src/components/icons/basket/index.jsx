const BasketIcon = ({ props, color = "#0256BA" }) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.33333 2.5C2.8731 2.5 2.5 2.8731 2.5 3.33333C2.5 3.79357 2.8731 4.16667 3.33333 4.16667H4.16667C4.58388 4.16667 4.92948 4.47326 4.99045 4.87344L5.22288 8.59317C5.36009 10.7892 7.18114 12.5 9.38143 12.5H13.3333C15.6345 12.5 17.5 10.6345 17.5 8.33333C17.5 6.03215 15.6345 4.16667 13.3333 4.16667H6.52441C6.18121 3.19567 5.25518 2.5 4.16667 2.5H3.33333Z"
        fill={color}
      />
      <path
        d="M10 15.8333C10 16.7538 9.25381 17.5 8.33333 17.5C7.41286 17.5 6.66667 16.7538 6.66667 15.8333C6.66667 14.9129 7.41286 14.1667 8.33333 14.1667C9.25381 14.1667 10 14.9129 10 15.8333Z"
        fill={color}
      />
      <path
        d="M13.3333 17.5C14.2538 17.5 15 16.7538 15 15.8333C15 14.9129 14.2538 14.1667 13.3333 14.1667C12.4129 14.1667 11.6667 14.9129 11.6667 15.8333C11.6667 16.7538 12.4129 17.5 13.3333 17.5Z"
        fill={color}
      />
    </svg>
  );
};

export default BasketIcon;
