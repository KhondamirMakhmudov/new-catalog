const SelectedIcon = ({ props, color = "#62677A" }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.5 8.60555C2.5 5.50969 5.00969 3 8.10555 3C9.21223 3 10.2941 3.32758 11.215 3.94145L12.5 4.79815L13.785 3.94145C14.7059 3.32758 15.7878 3 16.8944 3C19.9903 3 22.5 5.50969 22.5 8.60555V9.34382C22.5 11.3098 21.719 13.1952 20.3289 14.5853L14.6213 20.2929C13.4497 21.4645 11.5503 21.4645 10.3787 20.2929L4.6711 14.5853C3.28097 13.1952 2.5 11.3098 2.5 9.34382V8.60555Z"
        fill={color}
      />
    </svg>
  );
};

export default SelectedIcon;
