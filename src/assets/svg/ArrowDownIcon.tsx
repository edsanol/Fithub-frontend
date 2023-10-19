import { SVGProps } from "react";

const ArrowDownIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      fill="none"
      {...props}
    >
      <g clipPath="url(#a)">
        <path
          fill="#6122B5"
          fillOpacity={0.35}
          d="M16 32c8.836 0 16-7.164 16-16S24.836 0 16 0 0 7.164 0 16s7.164 16 16 16ZM8.972 15.642a1.23 1.23 0 0 1 1.741-.007l4.056 4.025V9.385a1.23 1.23 0 0 1 2.462 0V19.66l4.056-4.025a1.232 1.232 0 0 1 1.734 1.75l-6.154 6.106a1.23 1.23 0 0 1-1.734 0L8.98 17.386a1.23 1.23 0 0 1-.007-1.743Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h32v32H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default ArrowDownIcon;
