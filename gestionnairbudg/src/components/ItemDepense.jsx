import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { NotificationManager } from "react-notifications";
import { apiUrl } from "../api";
import { MdClose } from "react-icons/md";

import Modal from "react-modal";
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

const ItemDepense = ({
  index,
  categorie,
  montant,
  id,
  reloder,
  listeCategoriesD,
}) => {
  const [modalIsOpenD, setIsOpenD] = React.useState(false);
  const [modalIsOpenE, setIsOpenE] = React.useState(false);
  const [updateD, setUpdateD] = useState({
    id: id,
    montant: montant,
    categorie: categorie,
  });
  const authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;
  const [cat, setCat] = useState({});
  let subtitle;

  // //////////////////////////////////////////////////////////////////////
  let handlChangeDepense = (event) => {
    setUpdateD({
      ...updateD,
      [event.target.name]: event.target.value,
    });
  };
  function openModalD() {
    setIsOpenD(true);
  }
  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }
  function closeModalD() {
    setIsOpenD(false);
  }
  function openModalE() {
    setIsOpenE(true);
  }
  function closeModalE() {
    setIsOpenE(false);
  }
  let loadCat = () => {
    axios
      .get(apiUrl + "/api/gestion/categorieDlist/" + categorie + "/", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((res) => {
        setCat(res.data);
      })
      .catch((e) => {
        NotificationManager.warning(
          "Error Information incorrect categorie revenu",
          "OOOps une erreur",
          5000
        );
      });
  };
  let deleteD = () => {
    axios
      .delete(apiUrl + "/api/gestion/depense/" + id + "/", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((res) => {
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
  let editD = () => {
    axios
      .put(apiUrl + "/api/gestion/depense/" + id + "/", updateD, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((res) => {
        reloder(false);
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
  useEffect(() => {
    loadCat();
  }, [modalIsOpenD]);
  return (
    <div className="grid grid-cols-4 w-full place-items-center h-10  border-b my-2">
      <div>{index + 1}</div>
      <div>{cat.libelle}</div>
      <div>{montant}</div>
      <div className="flex justify-between w-40 place-items-center">
        <button onClick={openModalE}>
          <MdModeEdit
            size={30}
            className=" text-blue-500  hover:text-blue-700"
          />
        </button>
        <button onClick={openModalD}>
          <MdDelete size={30} className="text-red-600  hover:text-red-900" />
        </button>
      </div>
      <Modal
        isOpen={modalIsOpenD}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModalD}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
        contentLabel="Example Modal"
      >
        <div className="w-96">
          <div className="flex w-full justify-between px-3">
            <h1 className="text-xl font-bold ">
              Suppression depense{" "}
              <span className="text-yellow-500">Depense</span>
            </h1>
            <button onClick={closeModalD}>
              <MdClose size={30} />
            </button>
          </div>
          <form onSubmit={deleteD} className="mt-10 mx-3">
            <div className="text-center ">
              Voulez-vous vraiment supprimer cette depense ?
            </div>
            <button className="h-10 my-5 w-3/4 mx-auto rounded-md bg-red-500 text-xl font-bold flex justify-center place-items-center">
              <h1>Supprimer</h1>
            </button>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpenE}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModalE}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
        contentLabel="Example Modal"
      >
        <div className="w-96">
          <div className="flex w-full justify-between px-3">
            <h1 className="text-xl font-bold ">
              Modification d'une{" "}
              <span className="text-yellow-500">Depense</span>
            </h1>
            <button onClick={closeModalE}>
              <MdClose size={30} />
            </button>
          </div>
          <form onSubmit={editD} className="mt-10 mx-3">
            <div className=" basis-full  ">
              <label
                for="floatingFirstName"
                className="text-gray-700 font-poppins"
              >
                Categorie de depense <span className="text-red-500">*</span>{" "}
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
                defaultValue={updateD.montant}
                onChange={handlChangeDepense}
                // onChange={handelChangCand}
              />
            </div>

            <button className="h-10 my-5 w-3/4 mx-auto rounded-md bg-yellow-400 text-xl font-bold flex justify-center place-items-center">
              <h1>Modifier</h1>
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ItemDepense;
