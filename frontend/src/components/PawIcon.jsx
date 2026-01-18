const PawIcon = ({ className = "w-8 h-8", color = "currentColor" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="8.5" cy="9" rx="2.5" ry="3" />
      <ellipse cx="15.5" cy="9" rx="2.5" ry="3" />
      <ellipse cx="5" cy="14" rx="2" ry="2.5" />
      <ellipse cx="19" cy="14" rx="2" ry="2.5" />
      <path d="M12 17c-2.5 0-4.5 1.5-4.5 3.5 0 1.5 2 2.5 4.5 2.5s4.5-1 4.5-2.5c0-2-2-3.5-4.5-3.5z" />
    </svg>
  );
};

export default PawIcon;
