import Image from "next/image";
import { FunctionComponent } from "react";

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
        <div className="size-25 bg-gray-300 animate-pulse absolute -top-[50px] left-1/2 -translate-x-1/2 rounded-full border-2 border-solid border-white object-cover" />
      ) : (
        <div className="size-25 absolute overflow-hidden -top-[50px] left-1/2 -translate-x-1/2 rounded-full border-2 border-solid border-white object-cover">
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
        <div className="text-3xl w-34 h-8 rounded-2xl bg-gray-300 animate-pulse mx-auto mb-5" />
      ) : (
        <h1 className="text-3xl tracking-wide mb-5 text-center font-black text-stroke-1 text-shadow text-white">
          {first_name}
        </h1>
      )}
    </>
  );
};
