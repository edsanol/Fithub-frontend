interface MembershipIconProps {
  clickHandler?: () => void;
}

const MembershipIcon = ({ clickHandler }: MembershipIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      onClick={clickHandler}
    >
      <path
        d="M4.44024 13.4474C3.1523 12.1595 2.50832 11.5155 2.2687 10.68C2.02908 9.84449 2.23387 8.9571 2.64343 7.18231L2.87962 6.15883C3.22419 4.66569 3.39648 3.91912 3.90771 3.40789C4.41894 2.89666 5.16551 2.72437 6.65865 2.3798L7.68213 2.14361C9.45692 1.73405 10.3443 1.52927 11.1798 1.76889C12.0153 2.00851 12.6593 2.65248 13.9472 3.94042L15.4719 5.46512C17.7128 7.70594 18.8332 8.82635 18.8332 10.2186C18.8332 11.6109 17.7128 12.7313 15.4719 14.9721C13.2311 17.2129 12.1107 18.3334 10.7184 18.3334C9.32617 18.3334 8.20576 17.2129 5.96494 14.9721L4.44024 13.4474Z"
        stroke="currentColor"
        stroke-width="1.5"
      />
      <circle
        cx="7.67245"
        cy="7.39917"
        r="1.66667"
        transform="rotate(-45 7.67245 7.39917)"
        stroke="currentColor"
        stroke-width="1.5"
      />
      <path
        d="M10.1184 15.4164L15.9342 9.6004"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default MembershipIcon;
