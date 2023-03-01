import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaUserAlt } from "react-icons/fa";
import AddButton from "../components/AddButton";

const Home = () => {
  const percentage = 50;
  return (
    <div className="w-full h-screen bg-yellow-100 flex items-center justify-center place-items-center">
      <div className=" w-5/6 md:w-3/4 lg:w-3/2 h-5/6 bg-white opacity-90 py-10 flex-row rounded-lg shadow-2xl lg:px-20 px-2  ">
        <div className="flex justify-between ">
          <h1 className="text-3xl font-bold ">
            Gestion <span className="text-yellow-600 text-2xl">Budgetaire</span>
          </h1>
          <div className="h-10 w-32 rounded-md bg-yellow-500 flex px-2 shadow-lg justify-between place-items-center ">
            <FaUserAlt size={20} />
            <h1 className="text-md mr-3 font-semibold">Marc</h1>
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
            <div className="bottom-0 text-xl">
              <h1>
                Budget total : 400 000<span className="font-bold">XFA</span>{" "}
              </h1>
            </div>
          </div>
          <div className="flex-row my-5">
            <AddButton name={"Revenu"} />
            <AddButton name={"Depense"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
