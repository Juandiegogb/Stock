import React, { useEffect, useRef, useState } from "react";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../api/userRoutes.js";
import { toast } from "sonner";
import { InputField } from "./InputField.jsx";
import { useForm } from "react-hook-form";
import { FaTrash, FaUpload, FaEraser } from "react-icons/fa";
export const ElementsMain = () => {
  const [elements, setelements] = useState(null);
  const { register, handleSubmit, reset, setValue, getValues } = useForm();
  const [userIdForm, setuserIdForm] = useState(null);

  useEffect(() => {
    refreshUsers();
    reset();
  }, []);

  const refreshUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  const clientCreateUser = (data) => {
    const promise = createUser(data);

    refreshUsers();
    toast.promise(promise, {
      loading: "loading",
      success: (response) => {
        reset();
        setuserIdForm(null);
        return response.data.message;
      },
      error: (error) => {
        return String(error);
      },
    });
  };

  const renderUserInfo = (user) => {
    setuserIdForm(user._id);
    setValue("name", user.name);
    setValue("role", user.role);
    setValue("username", user.username);
  };

  const apiDeleteUser = () => {
    const promise = deleteUser(userIdForm);
    toast.promise(promise, {
      loading: "loading",
      success: (response) => {
        setuserIdForm(null);
        refreshUsers();
        reset();
        return response.data.message;
      },
      error: (error) => {
        return error.response.data.message;
      },
    });
  };

  const apiUpdateUser = () => {
    const body = getValues();
    const promise = updateUser(userIdForm, body);
    toast.promise(promise, {
      loading: "loading",
      success: (response) => {
        setuserIdForm(null);
        refreshUsers();
        reset();
        return response.data.message;
      },
      error: (error) => {
        return error.response.data.message;
      },
    });
  };

  return (
    <div className="w-full h-full flex">
      <div className=" h-full w-1/2 flex-col flex">
        <div className=" h-28 flex items-center  justify-center w-full">
          <h1 className=" text-3xl font-extrabold  text-center">
            Elements list
          </h1>
        </div>
        <div className="overflow-auto flex-1 px-5">
          {users ? (
            users.map((user, index) => (
              <div
                className="bg-blue-200 p-4 my-2 rounded-md mx-3 hover:cursor-pointer"
                key={index}
                onClick={() => {
                  renderUserInfo(user);
                }}
              >
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Username:</strong> {user.username}
                </p>
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
              </div>
            ))
          ) : (
            <p>No users</p>
          )}
        </div>
      </div>
      <div className="flex-1 h-full">
        <div className="items-center h-28 flex justify-center">
          <h1 className=" text-3xl font-extrabold">User information</h1>
        </div>
        <form
          className=" flex flex-col justify-center items-center"
          onSubmit={handleSubmit(clientCreateUser)}
          autoComplete="off"
        >
          <div className="w-1/2 flex-grow flex-col flex">
            <p className="text-center">You can create, edit or delete users.</p>

            <InputField
              label={"Name"}
              register={register}
              required={true}
              type={"text"}
            />
            <InputField
              label={"Username"}
              register={register}
              required={true}
              type={"text"}
            />
            <InputField
              label={"Password"}
              register={register}
              required={true}
              type={"password"}
            />

            <div className="justify-between items-center flex ">
              <button
                type="submit"
                className="text-white p-3 rounded-md bg-green-600 hover:bg-green-700 w-3/4 font-bold text-lg h-20"
              >
                {" "}
                Create
              </button>

              <div className="flex flex-row justify-end h-full">
                <button
                  type="button"
                  className="  ml-2 text-white p-3 rounded-md bg-gray-600 hover:bg-gray-700 text-2xl mb-auto"
                  onClick={() => {
                    reset();
                  }}
                >
                  <FaEraser />
                </button>
                <button
                  className=" ml-2 text-white p-3 rounded-md bg-blue-600 hover:bg-blue-700 text-2xl"
                  type="button"
                  onClick={() => {
                    toast("You want to update the user?", {
                      action: {
                        label: "Yes",
                        onClick: apiUpdateUser,
                      },
                      duration: 3000,
                    });
                  }}
                >
                  <FaUpload />
                </button>
                <button
                  className=" ml-2 text-white p-3 rounded-md bg-red-600 hover:bg-red-700 text-2xl"
                  text={<FaTrash />}
                  type="button"
                  onClick={() => {
                    toast("You want to delete the user?", {
                      action: {
                        label: "Yes",
                        onClick: apiDeleteUser,
                      },
                      duration: 3000,
                    });
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
