import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InputField } from "../components/InputField";
import { CustomButton } from "../components/CustomButton";
import { useUserContext } from "../context/UserContext";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { user, setUser } = useUserContext();

  const login = (data) => {
    const promise = axios.post("http://localhost:3000/login", data, {
      headers: { withCredentials: true },
    });

    toast.promise(promise, {
      success: (response) => {
        setUser(response.data.userInfo);
        return response.data.message;
      },
      loading: "loading",
      error: (error) => {
        return error.response.data.message;
      },
    });
  };

  useEffect(() => {
    if (user !== null) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <main className="flex justify-center items-center p-6 rounded-xl w-4/5 h-4/5">
        <div>
          <img src="data.svg" className="" />
        </div>
        <form
          onSubmit={handleSubmit(login)}
          className="justify-center items-center p-4  "
        >
          <h1 className="font-extrabold text-3xl text-center">
            Welcome To Stock Tracker
          </h1>
          <h3 className="font-semibold text-base justify-self-center text-center mb-9">
            Controll your stock and sales
          </h3>
          <InputField
            type="text"
            label="Username"
            required={true}
            register={register}
          />
          <InputField
            type="password"
            label="Password"
            register={register}
            required={true}
          />
          <CustomButton text="Login" color="green" />
        </form>
      </main>
    </div>
  );
};
