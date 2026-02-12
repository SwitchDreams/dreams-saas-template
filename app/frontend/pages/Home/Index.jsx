import { Link } from "@inertiajs/react";
import React from "react";

const HomePage = ({ user }) => {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center bg-error-500">
      <h1 className="text-5xl text-white">
        Welcome to Dreams SaaS Template{user ? `, ${user.name}` : ""}!
      </h1>
      {!user && (
        <Link href="/sign_in" className="mt-2 rounded-md bg-white p-2">
          Sign In
        </Link>
      )}
    </section>
  );
};

export default HomePage;
