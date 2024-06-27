import { Text } from "@switchdreams/ui";
import React from "react";

const HomePage = () => {
  return (
    <section className="flex h-screen w-full items-center justify-center bg-error-500">
      <Text as="h1" size="5xl" className="text-white">
        Welcome to Dreams SaaS Template!
      </Text>
    </section>
  );
};

export default HomePage;
