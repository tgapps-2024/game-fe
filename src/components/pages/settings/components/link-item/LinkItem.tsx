import { FC } from "react";
import Link from "next/link";
import ArrowIcon from "@/public/assets/svg/arrow.svg";

type LinkItemProps = {
  href: string;
};

export const LinkItem: FC<LinkItemProps> = ({ href }) => (
  <Link
    href={href}
    className="h-fit flex flex-grow flex-row justify-end items-center"
  >
    <ArrowIcon className="size-6 fill-white" />
  </Link>
);
