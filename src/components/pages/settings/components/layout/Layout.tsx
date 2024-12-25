import { FC, Fragment, FunctionComponent, SVGProps } from "react";
import { Sections } from "../sections/Sections";

type LayoutProps = {
  items: {
    title: string;
    items: {
      text: string;
      icon: FunctionComponent<SVGProps<SVGSVGElement>>;
      onClick: () => void;
      isLink?: boolean;
      children?: React.ReactNode;
    }[];
  }[];
};

export const Layout: FC<LayoutProps> = ({ items }) => (
  <>
    {items.map(({ title, items }, index) => (
      <Fragment key={index}>
        {index > 0 && <div className="w-full h-px bg-white/10 rounded-full" />}
        <div className="w-full h-fit flex flex-col gap-y-5">
          <h2 className="text-2xl leading-none font-black tracking-wide text-stroke-1 text-shadow">
            {title}
          </h2>
          <Sections items={items} />
        </div>
      </Fragment>
    ))}
  </>
);
