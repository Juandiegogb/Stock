import React, { useEffect, useState } from "react";
import { createUser, getUsers } from "../api/userRoutes.js";
import { toast } from "sonner";
import { InputField } from "./InputField.jsx";
import { useForm } from "react-hook-form";
import { FaSyncAlt } from "react-icons/fa";
import { CustomButton } from "./CustomButton.jsx";

export const UsersMain = () => {
  const [users, setUsers] = useState(null);
  const { register, handleSubmit } = useForm();

  const refreshUsers = async () => {
    try {
      const response = await getUsers();
      console.log(response.data.response);
      setUsers(response.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  const clientCreateUser = async (data) => {
    const promise = createUser(data);
    toast.promise(promise, {
      loading: "loading",
      success: (response) => {
        return response.data.message;
      },
      error: (error) => {
        return error.response.data.message;
      },
    });
  };

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div className="w-full h-full p-10 flex justify-between items-center ">
      <div className="h-5/6 w-1/2 p-10 border-0 border-gray-500 mt-0 ">
        <div className="flex justify-between items-center mb-3">
          <h1 className=" text-3xl font-extrabold  text-center">Users list</h1>
          <button
            className="bg-gray-300 font-bold p-2 rounded-lg flex items-center hover:bg-gray-400 border border-black"
            onClick={refreshUsers}
          >
            Refresh
            <FaSyncAlt className="ml-2" />
          </button>
        </div>

        <div className="overflow-y-auto h-full">
          {users ? (
            users.map((user, index) => (
              <div className="bg-blue-200 p-4 my-1" key={index}>
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

      <div className="h-full w-full p-10">
        <form
          className="justify-center items-center flex flex-col"
          onSubmit={handleSubmit(clientCreateUser)}
        >
          <div className=" mb-4 justify-between items-center my-3">
            <h1 className=" text-3xl font-extrabold  text-center">
              User information
            </h1>
            <p>You can create, edit or delete users.</p>
          </div>
          <div className=" w-1/2">
            <InputField label={"Name"} type={"text"} register={register} />
            <InputField label={"Username"} type={"text"} register={register} />
            <InputField
              label={"Password"}
              type={"password"}
              register={register}
            />
            <select {...register("role")}>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
            <div className="justify-between items-center flex ">
              <CustomButton color="green" text="Create" />
              <CustomButton color="red" text="Delete" type="button" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
