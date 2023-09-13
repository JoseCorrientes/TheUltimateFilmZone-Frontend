import oldCam from "../../assets/oldCam.png";

function Credits() {
  return (
    <div className="fixed top-1/3 left-1/4 h-auto w-2/4  bg-white text-lg z-20 rounded-lg shadow-black shadow-2xl border-2 border-gray-300 flex flex-row">
      <div className="w-2/4 h-full">
        <img
          src={oldCam}
          alt="Logo de la App"
          className="h-full w-auto rounded-l-lg rounded-r-none"
        />
      </div>

      <div className="w-2/4 ">
        <h3 className="font-header text-black text-sm font-light">CREDITS:</h3>
        <br />
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
            Credits to it respective designer.
          </span>{" "}
        </p>
        <hr className="mt-1 w-5/6 border border-black font-semibold text-2xl text-black" />
        <p className="font-header text-black text-sm font-semibold mt-1 ">
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
