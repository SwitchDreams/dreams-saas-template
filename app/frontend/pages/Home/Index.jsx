import { Link } from "@inertiajs/react";
import { Text } from "@switchdreams/ui";
import React from "react";

const HomePage = ({ user }) => {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center bg-error-500">
      <Text as="h1" size="5xl" className="text-white">
        Welcome to Dreams SaaS Template{user ? `, ${user.name}` : ""}!
      </Text>
      {!user && (
        <Link href="/sign_in" className="mt-2 rounded-md bg-white p-2">
          Sign In
        </Link>
      )}
    </section>
  );
};

export default HomePage;
