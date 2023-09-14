import oldCam from "../../assets/oldCam.png";

function Credits() {
  return (
    <div className="fixed top-10 sm:top-1/3 left:0 sm:left-1/4 h-auto w-auto mx-1 sm:w-2/4  bg-white text-lg z-20 rounded-lg shadow-black shadow-2xl border sm:border-2 border-gray-300 flex sm:flex-row flex-col">
      <div className="flex flex-col items-center justify-center w-auto sm:w-2/4 h-full ">
        <img
          src={oldCam}
          alt="Logo de la App"
          className="h-full w-1/2 pt-1 sm:pt-0 sm:w-auto rounded-lg sm:rounded-l-lg sm:rounded-r-none"
        />
      </div>

      <div className="pl-2 pt-6 sm:pt-3 w-auto sm:w-2/4">
        <h3 className="pb-3 text-center sm:text-left font-header text-black text-sm font-light">
          CREDITS:
        </h3>

        <p className="font-header text-black text-sm font-semibold ">
          APP -FrontEnd, BackEnd and MongoDB-:
        </p>
        <p className="font-header text-black text-xs font-light ">
          José Ernesto García.
        </p>
        <hr className="mt-1 w-5/6 border border-black font-semibold text-2xl text-black" />
        <p className="mt-2 font-header text-black text-sm font-semibold ">
          Lottie Images:
        </p>
        <p className="font-header text-black text-xs font-semibold ">
          Movie theatre:{" "}
          <span className="font-header text-black text-xs font-light ml-2 ">
            Priyanka Rani in Lottiefiles.
          </span>{" "}
        </p>
        <p className="font-header text-black text-xs font-semibold ">
          No Item Found:{" "}
          <span className="font-header text-black text-xs font-light ml-2">
            jaynal360 in Lottiefiles.
          </span>{" "}
        </p>
        <p className="font-header text-black text-xs font-semibold">
          Page Not Found 404:{" "}
          <span className="font-header text-black text-xs font-light ml-2">
            Sheikh Sohel in Lottiefiles.
          </span>{" "}
        </p>

        <hr className="mt-1 w-5/6 border border-black font-semibold text-2xl text-black" />
        <p className="mt-2 font-header text-black text-sm font-semibold ">
          Initial Background:
          <span className="font-header text-black text-xs font-light ml-2">
            Credits to its respective designer.
          </span>{" "}
        </p>
        <hr className="mt-1 w-5/6 border border-black font-semibold text-2xl text-black" />
        <p className="font-header text-black text-sm font-semibold mt-1 mb-5 sm:mb-2 ">
          Logo Design:
          <span className="font-header text-black text-xs font-light ml-2">
            José Ernesto García.
          </span>
        </p>
      </div>
    </div>
  );
}

export default Credits;
