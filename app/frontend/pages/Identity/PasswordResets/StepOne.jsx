import { router, useForm } from "@inertiajs/react";
import React from "react";

import ClickBack from "@/components/ClickBack";
import { useAlert } from "@/contexts/Alert";

const StepOne = () => {
  const { showAlert } = useAlert();
  const { setData, data, post } = useForm({
    email: "",
  });

  const submitStepOneData = (e) => {
    e.preventDefault();
    if (data.email === "") {
      showAlert({ message: "Preencha todos os campos!", type: "warning" });
    } else {
      post("/identity/password_resets", {
        onError: (e) => {
          showAlert({ message: e });
        },
      });
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="absolute left-0 top-10 w-full">
        <ClickBack onClickBack={() => router.visit("/login")} />
      </div>
      <div className="relative flex size-full flex-col items-center px-4 md:px-28">
        <div className="flex h-4/5 w-full flex-col justify-center py-32 pb-28 md:w-1/3">
          <p className="m-0 pt-5 text-center text-sm text-gray-600 md:pt-10">
            Esqueceu sua senha?
          </p>
          <div className="flex justify-center gap-2">
            <h1 className="m-0 flex-none pb-14 pt-4 text-center text-3xl text-gray-800">
              Qual é o seu
            </h1>
            <h1 className="m-0 pb-14 pt-4 text-center text-3xl text-primary-500">
              email?
            </h1>
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-gray-800">Email</label>
            <input
              id="email"
              name="email"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none"
              onChange={(e) => setData("email", e.target.value)}
              placeholder="Insira seu Email"
              type="email"
              required
            />
            <p className="mt-1 text-xs text-gray-500">Enviaremos um código para o seu e-mail.</p>
          </div>
          <button
            type="button"
            className="mt-8 flex rounded-2xl border border-primary-300 bg-primary-500 px-9 py-2 text-sm font-medium text-white duration-500 hover:bg-primary-300"
            onClick={submitStepOneData}
          >
            Continuar
          </button>
          <div className="flex w-full justify-between gap-4 pt-6">
            <div className="h-1 w-1/3 rounded-full bg-primary-500" />
            <div className="h-1 w-1/3 rounded-full bg-gray-100" />
            <div className="h-1 w-1/3 rounded-full bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
