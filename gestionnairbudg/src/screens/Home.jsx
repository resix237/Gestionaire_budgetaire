import React, { useEffect, useState, useContext } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaUserAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";

import AddButton from "../components/AddButton";
import Footer from "../components/Footer";
import ItemDepense from "../components/ItemDepense";
import { useNavigate } from "react-router-dom";
// importons le necessaire pour les modal

import Modal from "react-modal";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { apiUrl } from "../api";
import ItemRevenu from "../components/ItemRevenu";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// notre ecran d'acceuil
const Home = () => {
  const { user, LogoutUser } = useContext(AuthContext);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const [modalIsOpen2, setIsOpen2] = React.useState(false);
  const [listeCategoriesR, setListeCategoriesR] = useState([]);
  const [listeCategoriesD, setListeCategoriesD] = useState([]);
  const [listeRevenu, setListeRevenu] = useState([]);
  const [listeDepense, setListeDepense] = useState([]);
  const [newRevenu, setNewRevenu] = useState({});
  const [newDepense, setNewDepense] = useState({});
  const [budget, setBudget] = useState(0);
  const [depenseBud, setDepenseBud] = useState(0);
  const [percentage, setPoucentage] = useState(0);

  let subtitle;
  const navigate = useNavigate();

  function openModal() {
    setIsOpen(true);
  }
  function openModal2() {
    setIsOpen2(true);
  }
  // couleur de l'arrère du modal
  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  function closeModal2() {
    setIsOpen2(false);
  }

  let handlChangeRevenu = (event) => {
    setNewRevenu({
      ...newRevenu,
      [event.target.name]: event.target.value,
    });
  };
  let handlChangeDepense = (event) => {
    setNewDepense({
      ...newDepense,
      [event.target.name]: event.target.value,
    });
  };
  const authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;
  const createNewRevenu = (event) => {
    event.preventDefault();
    axios
      .post(apiUrl + "/api/gestion/revenu/", newRevenu, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((res) => {
        NotificationManager.success("Succes", "Sucess", 5000);
        setIsOpen(false);
        setNewRevenu({});
      })
      .catch((e) => {
        NotificationManager.warning(
          "Error Information incorrect",
          "OOOps une erreur",
          5000
        );
      });
  };
  let createDepense = (event) => {
    event.preventDefault();
    axios
      .post(apiUrl + "/api/gestion/depense/", newDepense, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((res) => {
        NotificationManager.success("Succes", "Sucess", 5000);
        setIsOpen2(false);
        setNewDepense({});
      })
      .catch((e) => {
        NotificationManager.warning(
          "Error Information incorrect",
          "OOOps une erreur",
          5000
        );
      });
  };
  let loadCategorieRevenu = () => {
    axios
      .get(apiUrl + "/api/gestion/categorieRlist/", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((res) => {
        setListeCategoriesR(res.data);
      })
      .catch((e) => {
        NotificationManager.warning(
          "Error Information incorrect categorie revenu",
          "OOOps une erreur",
          5000
        );
      });
  };
  let loadCategorieDepense = () => {
    if (authTokens.access) {
      axios
        .get(apiUrl + "/api/gestion/categorieDlist/", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        })
        .then((res) => {
          setListeCategoriesD(res.data);
        })
        .catch((e) => {
          NotificationManager.warning(
            "Error Information incorrect categorie depense",
            "OOOps une erreur",
            5000
          );
        });
    }
  };
  let loadRevenu = () => {
    axios
      .get(apiUrl + "/api/gestion/revenu/", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((res) => {
        setListeRevenu(res.data);
        NotificationManager.success("Succes", "Sucess", 5000);
      })
      .catch((e) => {
        NotificationManager.warning(
          "Error Information incorrect categorie revenu",
          "OOOps une erreur",
          5000
        );
      });
  };
  let loadDepense = () => {
    axios
      .get(apiUrl + "/api/gestion/depense/", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((res) => {
        setListeDepense(res.data);
        NotificationManager.success("Succes", "Sucess", 5000);
      })
      .catch((e) => {
        NotificationManager.warning(
          "Error Information incorrect categorie revenu",
          "OOOps une erreur",
          5000
        );
      });
  };

  let calculP = () => {
    let bud = 0;

    let depb = 0;
    for (let re in listeRevenu) {
      bud += listeRevenu[re].montant;
      console.log(bud);
    }
    for (let de in listeDepense) {
      depb += listeDepense[de].montant;
    }
    console.log(bud);
    let pourc = parseInt((depb * 100) / bud);
    setPoucentage(pourc);
    setBudget(bud);
    setDepenseBud(depb);
  };
  setTimeout(() => {
    calculP();
  }, "1000");
  console.log(newDepense);
  useEffect(() => {
    if (!load) {
      if ((user && !user.is_active) || user === null) {
        navigate("/login");
      }
      loadRevenu();
      loadDepense();
      calculP();
      loadCategorieRevenu();
      loadCategorieDepense();
    }
  }, [user, modalIsOpen, modalIsOpen2]);

  return (
    <div className="w-full h-screen bg-yellow-100 flex items-center justify-center place-items-center">
      <div className=" w-5/6 md:w-3/4 lg:w-3/2 h-5/6 bg-white opacity-90 py-10 flex-row rounded-lg shadow-2xl lg:px-20 px-2  ">
        <div className="flex justify-between ">
          <h1 className="text-3xl font-bold ">
            Gestion <span className="text-yellow-600 text-2xl">Budgetaire</span>
          </h1>

          <div class="flex justify-center">
            <div>
              <div class="relative" data-te-dropdown-ref>
                <a
                  className="flex items-center whitespace-nowrap rounded bg-yellow-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-yellow-400 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none"
                  href="#"
                  type="button"
                  id="dropdownMenuButton2"
                  data-te-dropdown-toggle-ref
                  aria-expanded="false"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  <FaUserAlt size={20} />
                  <h1 className="text-sm mx-2 font-normal">
                    {user ? user.first_name : "unknow"}
                  </h1>
                  <span class="ml-2 w-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="h-5 w-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </a>
                <ul
                  className="absolute z-[1000] float-left m-0 hidden w-full list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                  aria-labelledby="dropdownMenuButton2"
                  data-te-dropdown-menu-ref
                >
                  <li>
                    <a
                      className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                      href="#"
                      data-te-dropdown-item-ref
                      onClick={LogoutUser}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex my-5 justify-between">
          <div className="flex justify-items-end">
            <div style={{ width: 150, height: 150 }} className="">
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={{
                  // Customize the root svg element
                  root: {},
                  // Customize the path, i.e. the "completed progress"
                  path: {
                    // Path color
                    stroke: ` ${percentage >= 60 ? "#EA1347 " : "#139DEA"}`,
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: "butt",
                    // Customize transition animation
                    transition: "stroke-dashoffset 1.5s ease 0s",
                    // Rotate the path
                    transform: "rotate(0.25turn)",
                    transformOrigin: "center center",
                  },
                  // Customize the circle behind the path, i.e. the "total progress"
                  trail: {
                    // Trail color
                    stroke: "#d6d6d6",
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: "butt",
                    // Rotate the trail
                    transform: "rotate(0.25turn)",
                    transformOrigin: "center center",
                  },
                  // Customize the text
                  text: {
                    // Text color
                    fill: ` ${percentage >= 60 ? "#EA1347 " : "#139DEA"}`,
                    // Text size
                    fontSize: "16px",
                  },
                  // Customize background - only used when the `background` prop is true
                  background: {
                    fill: "#3e98c7",
                  },
                }}
              />
            </div>
            <div className="mt-20  ml-10 text-xl">
              <h1>
                Budget total : {budget}
                <span className="font-bold">XFA</span>{" "}
              </h1>
              <h1>
                Depense total : {depenseBud}
                <span className="font-bold">XFA</span>{" "}
              </h1>
            </div>
          </div>
          <div className="flex-row my-5">
            <AddButton name={"Revenu"} addFunction={openModal} />
            <AddButton name={"Depense"} addFunction={openModal2} />
          </div>
        </div>

        <div>
          <div id="accordionFlushExample">
            <div class="rounded-none border border-t-0 border-l-0 border-r-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
              <h2 class="mb-0" id="flush-headingOne">
                <button
                  class="group relative flex w-full items-center rounded-none border-0 bg-white py-4 px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                  type="button"
                  data-te-collapse-init
                  data-te-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Vos Revenus
                  <span class="ml-auto -mr-1 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-6 w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                class="!visible border-0"
                data-te-collapse-item
                data-te-collapse-show
                aria-labelledby="flush-headingOne"
                data-te-parent="#accordionFlushExample"
              >
                <div class="py-4 px-5">
                  {listeRevenu.map((re, index) => (
                    <ItemRevenu
                      key={index}
                      index={index}
                      categorie={re.categorie}
                      montant={re.montant}
                      id={re.id}
                      reloder={setIsOpen}
                      listeCategoriesD={listeCategoriesR}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div class="rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
              <h2 class="mb-0" id="flush-headingTwo">
                <button
                  class="group relative flex w-full items-center rounded-none border-0 bg-white py-4 px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                  type="button"
                  data-te-collapse-init
                  data-te-collapse-collapsed
                  data-te-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  Vos depenses
                  <span class="ml-auto -mr-1 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-6 w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                class="!visible hidden border-0"
                data-te-collapse-item
                aria-labelledby="flush-headingTwo"
                data-te-parent="#accordionFlushExample"
              >
                <div class="py-4 px-5">
                  {listeDepense.map((de, index) => (
                    <ItemDepense
                      key={index}
                      index={index}
                      categorie={de.categorie}
                      montant={de.montant}
                      id={de.id}
                      reloder={setIsOpen}
                      listeCategoriesD={listeCategoriesD}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* les modal sont ici dessous  */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="w-96">
          <div className="flex w-full justify-between px-3">
            <h1 className="text-xl font-bold ">
              Ajout d'un <span className="text-yellow-500">revenu</span>
            </h1>
            <button onClick={closeModal}>
              <MdClose size={30} />
            </button>
          </div>
          <form onSubmit={createNewRevenu} className="mt-10 mx-3">
            <div className=" basis-full  ">
              <label
                for="floatingFirstName"
                className="text-gray-700 font-poppins"
              >
                Categorie de revenu <span className="text-red-500">*</span>{" "}
              </label>
              <select
                className="form-select form-select-lg mb-3 appearance-none h-[51px] block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white-01 bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-01 focus:outline-none"
                aria-label=".form-select-lg example"
                name="categorie"
                onChange={handlChangeRevenu}
              >
                <option disabled selected>
                  Faire une selection *
                </option>
                {listeCategoriesR.map((cat, index) => (
                  <option key={index} value={cat.id}>
                    {cat.libelle}
                  </option>
                ))}
              </select>
            </div>

            <div className="my-2 form-floating basis-full ">
              <label
                for="floatingFirstName"
                className="text-gray-700 font-poppins"
              >
                Montant <span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="number"
                className="form-control
      block
      w-full
      px-3
      py-3
      text-base
      font-normal
      text-gray-700
      bg-white-01 bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white-01 focus:border-blue-01 focus:outline-none"
                id="floatingFirstName"
                placeholder="4000"
                name="montant"
                onChange={handlChangeRevenu}
              />
            </div>

            <button className="h-10 my-5 w-3/4 mx-auto rounded-md bg-yellow-400 text-xl font-bold flex justify-center place-items-center">
              <h1>Enregistrer</h1>
            </button>
          </form>
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen2}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal2}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
        contentLabel="Example Modal"
      >
        <div className="w-96">
          <div className="flex w-full justify-between px-3">
            <h1 className="text-xl font-bold ">
              Ajout d'une <span className="text-yellow-500">Depense</span>
            </h1>
            <button onClick={closeModal2}>
              <MdClose size={30} />
            </button>
          </div>
          <form onSubmit={createDepense} className="mt-10 mx-3">
            <div className=" basis-full  ">
              <label
                for="floatingFirstName"
                className="text-gray-700 font-poppins"
              >
                Categorie de depense<span className="text-red-500">*</span>{" "}
              </label>
              <select
                class="form-select form-select-lg mb-3 appearance-none h-[51px] block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white-01 bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-01 focus:outline-none"
                aria-label=".form-select-lg example"
                name="categorie"
                onChange={handlChangeDepense}
              >
                <option disabled selected>
                  Faire une selection *
                </option>
                {listeCategoriesD.map((cat, index) => (
                  <option key={index} value={cat.id}>
                    {cat.libelle}
                  </option>
                ))}
              </select>
            </div>

            <div className="my-2 form-floating basis-full ">
              <label
                for="floatingFirstName"
                className="text-gray-700 font-poppins"
              >
                Montant <span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="number"
                className="form-control
      block
      w-full
      px-3
      py-3
      text-base
      font-normal
      text-gray-700
      bg-white-01 bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white-01 focus:border-blue-01 focus:outline-none"
                id="floatingFirstName"
                placeholder="4000"
                name="montant"
                onChange={handlChangeDepense}
                // onChange={handelChangCand}
              />
            </div>

            <button className="h-10 my-5 w-3/4 mx-auto rounded-md bg-yellow-400 text-xl font-bold flex justify-center place-items-center">
              <h1>Enregistrer</h1>
            </button>
          </form>
        </div>
      </Modal>
      {/* les modal sont ici dessous  */}
      <Footer />
    </div>
  );
};

export default Home;
