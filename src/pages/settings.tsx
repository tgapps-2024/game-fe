import { Settings } from "@/components/pages";
import { GetStaticProps } from "next";
import React from "react";

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      messages: (await import(`../../public/messages/${locale}.json`)).default,
    },
  };
};

const settings = () => <Settings />;

export default settings;
