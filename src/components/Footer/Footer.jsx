function Footer({ handleToggleCreditsOn }) {
  return (
    <div className="bottom-0 w-full h-10 bg-black flex flex-row items-center ">
      <p className="w-3/4 text-left text-gray-600 pl-5 font-header text-sm ">
        J.E.G.@2023
      </p>
      <button
        onClick={handleToggleCreditsOn}
        className=" w-1/4 h-auto py-1 text-center rounded-md border border-gray-800 text-white  hover:border-black hover:bg-gray-500 hover:bg-opacity-20           hover: shadow-inner hover:ring-4 hover:shadow-gray-200 text-sm mr-2 cursor-pointer "
      >
        CREDITS
      </button>
    </div>
  );
}

export default Footer;
