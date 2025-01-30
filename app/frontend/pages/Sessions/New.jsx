import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link, useForm } from "@inertiajs/react";
import { Button, Text, TextField } from "@switchdreams/ui";
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
            <Text size="sm" as="h2" className="m-0 pt-5 text-gray-600 md:pt-10">
              SEJA BEM-VINDO DE VOLTA
            </Text>
            <Text size="3xl" as="h1" className="m-0 pb-14 pt-4 text-3xl text-gray-950">
              Entre na sua conta Dream SaaS Template
            </Text>
            <form onSubmit={submitLoginData}>
              <TextField
                name="email"
                className="mb-5 rounded-sm"
                label="E-mail"
                placeholder="Insira seu e-email"
                onChange={(e) => setData("email", e.target.value)}
                type="email"
              />
              <TextField
                name="password"
                className="rounded-sm"
                label="Senha"
                placeholder="Insira sua senha"
                type={showPassword ? "text" : "password"}
                rightIcon={showPassword ? EyeIcon : EyeSlashIcon}
                onChange={(e) => setData("password", e.target.value)}
                onClickIcon={showPasswordIcon}
              />
              <Link href="/identity/password_resets/step_one">
                <Text
                  size="sm"
                  as="p"
                  className="m-0 w-full cursor-pointer pt-6 text-right text-gray-800"
                >
                  Esqueceu sua senha?
                </Text>
              </Link>
              <Button className="mt-6 rounded-sm" variant="primary" label="Entrar" size="lg" />
            </form>
            <GoogleSignButton />
            <Text size="sm" className="cursor-pointer pt-6 text-center text-gray-600">
              Não possui uma conta?
            </Text>
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
