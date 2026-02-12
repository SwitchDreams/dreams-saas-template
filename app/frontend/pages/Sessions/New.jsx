import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link, useForm } from "@inertiajs/react";
import React, { useContext, useState } from "react";

import { AlertContext } from "@/contexts/Alert";
import { imagePath } from "@/utils";

import GoogleSignButton from "../../components/signIn/GoogleSignButton";

const SessionNew = () => {
  const [showPassword, setShowPassword] = useState(false);
  const showPasswordIcon = () => {
    setShowPassword(!showPassword);
  };

  const { showAlert } = useContext(AlertContext);
  const { setData, post } = useForm({
    email: "",
    password: "",
  });
  const submitLoginData = (e) => {
    e.preventDefault();
    post("/sign_in", {
      onError: (e) => {
        showAlert({ message: e.error });
      },
    });
  };

  return (
    <>
      <div className="flex h-screen w-screen justify-center">
        <div className="relative flex h-full w-screen items-center justify-center md:w-1/2">
          <div className="flex h-4/5 w-full flex-col justify-center px-6 md:w-auto md:p-0">
            <img className="h-[43px] w-[170px]" src={imagePath("logo.svg")} alt="logo" />
            <h2 className="m-0 pt-5 text-sm text-gray-600 md:pt-10">
              SEJA BEM-VINDO DE VOLTA
            </h2>
            <h1 className="m-0 pb-14 pt-4 text-3xl text-gray-950">
              Entre na sua conta Dream SaaS Template
            </h1>
            <form onSubmit={submitLoginData}>
              <div className="mb-5">
                <label htmlFor="email" className="mb-1 block text-sm text-gray-800">E-mail</label>
                <input
                  id="email"
                  name="email"
                  className="w-full rounded-sm border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none"
                  placeholder="Insira seu e-email"
                  onChange={(e) => setData("email", e.target.value)}
                  type="email"
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="mb-1 block text-sm text-gray-800">Senha</label>
                <input
                  id="password"
                  name="password"
                  className="w-full rounded-sm border border-gray-300 px-3 py-2 pr-10 focus:border-primary-500 focus:outline-none"
                  placeholder="Insira sua senha"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setData("password", e.target.value)}
                />
                <button
                  type="button"
                  onClick={showPasswordIcon}
                  className="absolute right-3 top-[2.1rem] text-gray-500 focus:outline-none"
                >
                  {showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
                </button>
              </div>
              <Link href="/identity/password_resets/step_one">
                <p className="m-0 w-full cursor-pointer pt-6 text-right text-sm text-gray-800">
                  Esqueceu sua senha?
                </p>
              </Link>
              <button
                type="submit"
                className="mt-6 w-full rounded-sm bg-primary-500 py-3 text-lg font-medium text-white hover:bg-primary-600 focus:outline-none"
              >
                Entrar
              </button>
            </form>
            <GoogleSignButton />
            <p className="cursor-pointer pt-6 text-center text-sm text-gray-600">
              Não possui uma conta?
            </p>
            <a
              href="https://wa.me/5561999018871?text=Quero%20me%20cadastrar%20no%20SitesNaHora"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer pt-2.5 text-center text-sm text-primary-400"
            >
              Entre em contato com nosso comercial
            </a>
          </div>
        </div>
        <img
          className="hidden h-full w-1/2 object-cover md:block"
          src={imagePath("background-login.png")}
          alt="living_room"
        />
      </div>
    </>
  );
};

export default SessionNew;
