import Link from "next/link";
import { FunctionComponent } from "react";

type Props = {
  children: React.ReactNode;
  route: string;
  locale?: string;
};

export const LocaleSwitcher: FunctionComponent<Props> = ({
  children,
  locale,
  route,
}) => {
  return (
    <Link href={route} locale={locale}>
      {children}
    </Link>
  );
};
