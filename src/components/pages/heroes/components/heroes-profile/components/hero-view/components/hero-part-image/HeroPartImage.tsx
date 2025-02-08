import React, {
  ComponentProps,
  FunctionComponent,
  useEffect,
  useState,
} from "react";

import Image from "next/image";

export const HeroPartImage: FunctionComponent<ComponentProps<typeof Image>> = (
  props,
) => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setIsHidden(false);
  }, [props.src]);

  return (
    !isHidden && (
      <Image
        {...props}
        alt={props.alt} // to appease eslint
        onError={() => {
          if (!isHidden) {
            setIsHidden(true);
          }
        }}
      />
    )
  );
};
