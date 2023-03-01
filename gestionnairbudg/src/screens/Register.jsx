import { useContext, useState } from "react";
import logo from "../assets/img/logo.png";
import Footer from "../components/Footer";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import axios from "axios";
import { NotificationManager } from "react-notifications";
import { apiUrl } from "../api";

const Register = () => {
  const [userRegister, setUserRegister] = useState({});
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  let handlChangeRegister = (event) => {
    setUserRegister({
      ...userRegister,
      [event.target.name]: event.target.value,
    });
  };
  let handlChange = (event) => {
    setPassword2(...userRegister, event.target.value);
  };
  // fonction d'enregistrement
  let registerUser = (event) => {
    event.preventDefault();
    axios
      .post(apiUrl + "/api/auth/register/", userRegister, {
        headers: { Accept: "application/json" },
      })
      .then((res) => {
        NotificationManager.success("Succes", "Sucess", 5000);
        navigate("/login");
      })
      .catch((e) => {
        NotificationManager.warning(
          "Error Information incorrect mot de passe ou email",
          "OOOps une erreur",
          5000
        );
      });
  };

  return (
    <div className="w-full h-screen bg-yellow-100 flex items-center justify-center place-items-center">
      <form
        onSubmit={registerUser}
        className=" w-5/6 md:w-3/4 lg:w-1/2 h-5/6 bg-white opacity-90 py-10 flex-row rounded-lg shadow-2xl "
      >
        <div className=" mx-2 items-center relative justify-center place-items-center flex ">
          <img
            src={logo}
            className=" aspect-square mx-3 mb-2 h-40 w-30  md:w-auto"
            alt="logo"
          />
          <h1 className=" absolute bottom-3 text-2xl font-bold font-serif">
            Register
          </h1>
        </div>
        <div class=" md:w-1/3 w-1/2 mx-auto">
          <div className="grid grid-rows-3 gap-1 ">
            <div>
              <label className="text-gray-500">Email *</label>
              <div class="relative mb-3  w-full border ">
                <input
                  type="email"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  name="email"
                  placeholder="Example label"
                  onChange={handlChangeRegister}
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-gray-500">First name *</label>
              <div class="relative mb-3  w-full border ">
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  name="first_name"
                  placeholder="Example label"
                  onChange={handlChangeRegister}
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-gray-500">Last name *</label>
              <div class="relative mb-3  w-full border ">
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  name="last_name"
                  placeholder="Example label"
                  id="exampleFormControlInputText"
                  onChange={handlChangeRegister}
                />
              </div>
            </div>
            <div>
              <label className="text-gray-500">Password *</label>
              <div class="relative mb-3  w-full border ">
                <input
                  type="password"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  name="password"
                  placeholder="Example label"
                  id="exampleFormControlInputText"
                  onChange={handlChangeRegister}
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-gray-500">Verification Password*</label>
              <div
                // ${(userRegister.password =
                //     !password2 ? "border-red-500" : "border-green-500")}
                class={`relative mb-3  w-full border  `}
              >
                <input
                  type="password"
                  className={`peer block  min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                  name="last_name"
                  placeholder="Example label"
                  id="exampleFormControlInputText"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="md:w-1/3 w-1/2 h-10 mx-auto cursor-pointer shadow-lg hover:shadow-sm rounded-lg mt-10 bg-amber-500 hover:bg-blue-400 text-xl font-bold uppercase flex justify-center text-center text-white place-items-center"
        >
          <h1>submit</h1>
        </button>
        <p className=" font-light text-sm text-center my-2">
          if you are already registered click{" "}
          <a className="text-blue-500 underline " href="/login">
            {" "}
            here
          </a>
        </p>
      </form>
      <Footer />
    </div>
  );
};

export default Register;
