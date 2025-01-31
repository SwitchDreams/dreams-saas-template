import React from "react";

export default function GoogleSignButton() {
  return (
    <a href="/auth/google_oauth2/">
      <div className="relative mt-6 flex h-[48px] w-full items-center justify-center rounded-sm border border-black bg-transparent text-sm hover:bg-zinc-400">
        <div className="absolute left-0 flex h-full w-16 items-center justify-center border-r border-r-black bg-white">
          <img src="/images/google.svg" alt="google logo" className="size-6" />
        </div>
        Entrar com o google
      </div>
    </a>
  );
}
