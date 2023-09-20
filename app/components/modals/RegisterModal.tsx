"use client";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modal";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  //isLoading == disabled prop which is passed to children component
  const [isLoading, setIsLoading] = useState(false);

  //form control
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Registration successful");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error("Failed to register!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggleRegisterToLogin = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, []);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Gobnb" subtitle="Create an account" />
      <Input
        id="email"
        label="Email"
        register={register}
        errors={errors}
        required
        disabled={isLoading}
        type="email"
      />
      <Input
        id="name"
        label="Name"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div className="hover:bg-neutral-400 rounded-lg">
        <Button
          outline
          label="Continue with Google"
          onClick={() => signIn("google")}
          icon={FcGoogle}
        />
      </div>
      <div className="hover:bg-neutral-400 rounded-lg">
        <Button
          outline
          label="Continue with Github"
          onClick={() => signIn("github")}
          icon={AiFillGithub}
        />
      </div>
      <div
        className="flex flex-row items-center justify-center gap-2 
      text-neutral-500 mt-2 font-light"
      >
        <div>Aleady have an account?</div>
        <div
          onClick={toggleRegisterToLogin}
          className="text-neutral-800 cursor-pointer hover:underline"
        >
          Login
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Continue"
      title="Register"
      disabled={isLoading}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
