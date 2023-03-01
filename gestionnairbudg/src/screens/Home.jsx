import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaUserAlt } from "react-icons/fa";
import AddButton from "../components/AddButton";
import Footer from "../components/Footer";

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
                  Les Revenus
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
                  Placeholder content for this accordion, which is intended to
                  demonstrate the
                  <code>.accordion-flush</code> class. This is the first item's
                  accordion body.
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
                  Les depenses
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
                  Placeholder content for this accordion, which is intended to
                  demonstrate the
                  <code>.accordion-flush</code> class. This is the second item's
                  accordion body. Let's imagine this being filled with some
                  actual content.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
