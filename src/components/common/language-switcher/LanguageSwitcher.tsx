import { FunctionComponent } from "react";

import Link from "next/link";

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
