import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";

import ClickBack from "@/components/ClickBack";
import { useAlert } from "@/contexts/Alert";

const StepThree = ({ sid, code }) => {
  const { showAlert } = useAlert();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);

  const showPasswordIcon = () => {
    setShowPassword(!showPassword);
  };

  const showConfirmationPasswordIcon = () => {
    setShowConfirmationPassword(!showConfirmationPassword);
  };

  const { data, setData, patch } = useForm({
    password: "",
    passwordConfirmation: "",
    sid: sid,
    code: parseInt(code),
  });

  const submitStepThreeData = (e) => {
    e.preventDefault();

    if (data.password !== data.passwordConfirmation) {
      showAlert({ message: "As senhas devem ser idênticas" });
      return;
    }

    patch("/identity/password_resets", {
      onError: (e) => {
        showAlert({ message: e });
      },
    });
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Link className="absolute left-0 top-10 w-full" href={`step_two?sid=${sid}`}>
        <ClickBack />
      </Link>
      <div className="relative flex size-full flex-col items-center justify-center px-4 md:px-28">
        <div className="mb-14 flex h-4/5 w-full flex-col justify-center py-32 pb-28 md:w-1/3">
          <p className="m-0 pt-5 text-center text-sm text-gray-600 md:pt-10">
            Esqueceu sua senha?
          </p>
          <div className="flex justify-center gap-2">
            <h1 className="m-0 flex-none pb-14 pt-4 text-center text-3xl text-gray-800">
              Crie uma
            </h1>
            <h1
              className="m-0 flex-none pb-14 pt-4 text-center text-3xl text-primary-500"
            >
              nova senha
            </h1>
          </div>
          <div className="relative">
            <label htmlFor="password" className="mb-1 block text-sm text-gray-800">Nova senha</label>
            <input
              id="password"
              name="password"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 pr-10 focus:border-primary-500 focus:outline-none"
              placeholder="Insira sua nova senha"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setData("password", e.target.value)}
              required
            />
            <button
              type="button"
              onClick={showPasswordIcon}
              className="absolute right-3 top-[2.1rem] text-gray-500 focus:outline-none"
            >
              {showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
            </button>
          </div>
          <div className="relative mt-4">
            <label htmlFor="password-confirmation" className="mb-1 block text-sm text-gray-800">Confirme sua nova senha</label>
            <input
              id="password-confirmation"
              name="password-confirmation"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 pr-10 focus:border-primary-500 focus:outline-none"
              placeholder="Insira sua nova senha novamente"
              type={showConfirmationPassword ? "text" : "password"}
              onChange={(e) => setData("passwordConfirmation", e.target.value)}
              required
            />
            <button
              type="button"
              onClick={showConfirmationPasswordIcon}
              className="absolute right-3 top-[2.1rem] text-gray-500 focus:outline-none"
            >
              {showConfirmationPassword ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
            </button>
          </div>
          <button
            type="button"
            className="mt-8 flex rounded-2xl border border-primary-300 bg-primary-500 px-9 py-2 text-sm font-medium text-white duration-500 hover:bg-primary-300"
            onClick={submitStepThreeData}
          >
            Trocar senha
          </button>
          <div className="flex w-full justify-between gap-4 pt-6">
            <div className="h-1 w-1/3 rounded-full bg-gray-100" />
            <div className="h-1 w-1/3 rounded-full bg-gray-100" />
            <div className="h-1 w-1/3 rounded-full bg-primary-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
