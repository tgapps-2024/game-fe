import { FunctionComponent } from "react";

import Image from "next/image";

type Props = {
  first_name: string;
  photo_url: string;
  isLoading: boolean;
};

export const ProfileHeader: FunctionComponent<Props> = ({
  first_name,
  photo_url,
  isLoading,
}) => {
  return (
    <>
      {isLoading ? (
        <div className="absolute -top-[50px] left-1/2 size-25 -translate-x-1/2 animate-pulse rounded-full border-2 border-solid border-white bg-gray-300 object-cover" />
      ) : (
        <div className="absolute -top-[50px] left-1/2 size-25 -translate-x-1/2 overflow-hidden rounded-full border-2 border-solid border-white object-cover">
          <Image
            src={photo_url}
            alt="avatar"
            fill
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      )}
      {isLoading ? (
        <div className="mx-auto mb-5 h-8 w-34 animate-pulse rounded-2xl bg-gray-300 text-3xl" />
      ) : (
        <h1 className="text-stroke-1 mb-5 text-center text-3xl font-black tracking-wide text-white text-shadow">
          {first_name}
        </h1>
      )}
    </>
  );
};
