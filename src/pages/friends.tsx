import React from "react";

import { GetStaticProps } from "next";

import { Friends } from "@/components/pages";

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      messages: (await import(`../../public/messages/${locale}.json`)).default,
    },
  };
};

const friends = () => <Friends />;

export default friends;
