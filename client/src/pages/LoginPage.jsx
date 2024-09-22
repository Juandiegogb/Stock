import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InputField } from "../components/InputField";
import { CustomButton } from "../components/CustomButton";
import { useUserContext } from "../context/UserContext";
import { apiLogin, createAdmin } from "../api/userRoutes";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { setUser, setButtons } = useUserContext();
  const [newCompany, setNewCompany] = useState(null);
  const loginDiv = useRef();
  const singUpDiv = useRef();

  useEffect(() => {
    setUser(null);
    setButtons(null);
  }, []);

  const submit = (data) => {
    if (!newCompany) {
      const promise = apiLogin(data);
      toast.promise(promise, {
        success: (response) => {
          const userInfo = response.data.userInfo;
          setUser(userInfo);
          userInfo.role === "admin" ? navigate("/admin") : navigate("/user");

          return response.data.message;
        },
        loading: "loading",
        error: (error) => {
          console.log(error);
          return error.response.data.message
            ? error.response.data.message
            : error;
        },
      });
    } else {
      const promise = createAdmin(data);
      toast.promise(promise, {
        success: (response) => {
          setNewCompany(null);
          return response.data.message;
        },
        loading: "loading",
        error: (error) => {
          console.log(error);
          return error.response.data.message
            ? error.response.data.message
            : error;
        },
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <main className="flex justify-center items-center p-6 rounded-xl w-4/5 h-4/5">
        <div>
          <img src="data.svg" className="" />
        </div>
        <form
          onSubmit={handleSubmit(submit)}
          className="justify-center items-center p-4  "
        >
          <h1 className="font-extrabold text-3xl text-center">
            Welcome To Stock Tracker
          </h1>
          <h3 className="font-semibold text-base justify-self-center text-center mb-9">
            Controll your stock and sales
          </h3>

          {newCompany ? (
            <div>
              <InputField
                type="text"
                label="Name"
                required={true}
                register={register}
              />
              <InputField
                type="text"
                label="Company"
                register={register}
                required={true}
              />
            </div>
          ) : (
            <></>
          )}

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
          <div className="flex items-center justify-between" ref={loginDiv}>
            <CustomButton text="Login" color="green" />
            <p>
              Don't have an account?
              <strong
                onClick={() => {
                  loginDiv.current.style.display = "none";
                  singUpDiv.current.style.display = "flex";
                  setNewCompany(true);
                  reset();
                }}
                className="hover:cursor-pointer ml-1 underline"
              >
                Sign up
              </strong>
            </p>
          </div>

          <div className=" w-full justify-between hidden" ref={singUpDiv}>
            <CustomButton color="green" text="Create new account!" />
            <CustomButton
              text="Cancel"
              color="red"
              type="button"
              onFunction={() => {
                setNewCompany(null);
                loginDiv.current.style.display = "flex";
                singUpDiv.current.style.display = "none";
                reset();
              }}
            />
          </div>
        </form>
      </main>
    </div>
  );
};
