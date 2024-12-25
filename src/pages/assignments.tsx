import { Assignments } from "@/components/pages";
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

export const assignments = () => <Assignments />;

export default assignments;
