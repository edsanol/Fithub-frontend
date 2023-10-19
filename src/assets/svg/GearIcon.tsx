import { SVGProps } from "react";

const GearIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      fill="none"
      {...props}
    >
      <path
        fill="#fff"
        d="M15.693 10.075a5.624 5.624 0 0 0-3.065.905 5.407 5.407 0 0 0-2.032 2.412 5.243 5.243 0 0 0-.314 3.105c.213 1.042.738 2 1.51 2.75a5.564 5.564 0 0 0 2.825 1.471c1.07.208 2.18.101 3.188-.305a5.488 5.488 0 0 0 2.476-1.98c.607-.883.93-1.922.93-2.985a5.32 5.32 0 0 0-1.62-3.795 5.61 5.61 0 0 0-3.898-1.578Zm11.913 5.373c-.003.502-.04 1.004-.113 1.5l3.358 2.561a.761.761 0 0 1 .181.993l-3.176 5.341a.798.798 0 0 1-.426.338.823.823 0 0 1-.55-.007l-3.948-1.545a12.265 12.265 0 0 1-2.677 1.523l-.59 4.082a.797.797 0 0 1-.276.47.837.837 0 0 1-.519.193h-6.353a.841.841 0 0 1-.512-.185.803.803 0 0 1-.282-.456l-.59-4.082a11.756 11.756 0 0 1-2.678-1.524l-3.949 1.545a.823.823 0 0 1-.55.008.799.799 0 0 1-.425-.339l-3.177-5.34a.761.761 0 0 1 .182-.993l3.358-2.56a11.423 11.423 0 0 1-.113-1.523c.003-.502.04-1.003.113-1.5l-3.358-2.56a.761.761 0 0 1-.181-.993L3.53 5.054a.799.799 0 0 1 .426-.339.823.823 0 0 1 .55.007l3.948 1.545a12.257 12.257 0 0 1 2.677-1.522l.59-4.083a.796.796 0 0 1 .276-.47.836.836 0 0 1 .519-.192h6.353a.84.84 0 0 1 .512.185.803.803 0 0 1 .282.455l.59 4.082c.96.39 1.861.903 2.681 1.524l3.946-1.544a.823.823 0 0 1 .549-.008c.178.06.33.18.426.338l3.177 5.341a.761.761 0 0 1-.182.993l-3.358 2.56c.072.505.11 1.013.113 1.522Z"
      />
    </svg>
  );
};
export default GearIcon;
