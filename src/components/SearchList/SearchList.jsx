import { useDispatch, useSelector } from "react-redux";
import SearchCard from "../SearchCard/SearchCard";
import { FaRegSquareCaretLeft } from "react-icons/fa6";
import { FaRegSquareCaretRight } from "react-icons/fa6";
import { getSearch, updateSearchPage } from "../../actions/actions";
import { Player } from "@lottiefiles/react-lottie-player";
import movieTheatre from "../../assets/animation_lm2868v8.json";
import noItemFound from "../../assets/animation_lm29dom9.json";

function SearchList() {
  const searchString = useSelector((state) => state.searchString);
  const searchResult = useSelector((state) => state.searchResult);
  const lastPage = useSelector((state) => state.searchTotal_pages);
  let loadingState = useSelector((state) => state.loadingState);
  let actualPage = useSelector((state) => state.searchPage);
  const searchTotal_results = useSelector((state) => state.searchTotal_results);

  const dispatch = useDispatch();

  const titulo1 = "Buscar";
  const titulo2 = "<<";
  const titulo3 = `>>`;

  const handleBackward = () => {
    if (actualPage > 1) {
      actualPage--;
      dispatch(updateSearchPage(actualPage));
      dispatch(getSearch(searchString, actualPage));
    }
  };

  const handleForward = () => {
    if (actualPage < lastPage) {
      actualPage++;
      dispatch(updateSearchPage(actualPage));
      dispatch(getSearch(searchString, actualPage));
    }
  };

  return (
    <div className=" w-full min-h-screen h-auto m-auto">
      <div>
        {loadingState === true && (
          <Player
            src={movieTheatre}
            className="player w-1/4 pt-20"
            autoplay
            loop
          />
        )}

        {loadingState === false &&
          searchString != "" &&
          searchResult.length < 1 && (
            <div className="h-screen">
              <h1 className="font-header text-center font-medium text-2xl text-black mt-4 ">
                {titulo1}
                <span className="ml-6 font-light text-gray-500 ">
                  {titulo2}
                  {searchString}
                  {titulo3}
                </span>{" "}
              </h1>

              <div className="flex flex-row w-4/6 font-header font-medium text-3xl text-black mt-4 mx-auto">
                <Player
                  src={noItemFound}
                  className="player w-1/3 pt-20"
                  autoplay
                  loop
                  speed={1}
                  background="rgb(#6B7280)"
                />
              </div>
            </div>
          )}

        {loadingState === false &&
          searchString != "" &&
          searchResult.length > 0 && (
            <div>
              <h1 className="font-header text-center font-medium text-2xl text-black mt-4 ">
                {titulo1}
                <span className="ml-6 font-light text-gray-500 ">
                  {titulo2}
                  {searchString}
                  {titulo3}
                </span>
              </h1>

              <div className="flex flex-row w-4/6  font-header font-medium text-3xl text-black mt-4 mx-auto bg-gray-200">
                <h1 className="flex flex-row w-1/2 text-left pl-5 items-center">
                  Titles
                  <span className="inline w-auto px-2 font-medium text-sm ml-6 text-gray-400 justify-center ">
                    ( {searchTotal_results} Results )
                  </span>
                </h1>

                <div className="flex flex-row w-1/2 text-right h-auto justify-end items-center ">
                  <p className="font-header font-medium text-base text-black bg-gray-100 ">
                    PAGE:{" "}
                  </p>

                  <span className="inline px-5 w-auto border-1  font-header font-medium text-base text-black border-gray-200 mr-2 ml-2 bg-white">
                    {actualPage}
                  </span>

                  <p className="font-header font-medium text-base text-black mr-5">
                    /{lastPage}
                  </p>
                  {actualPage > 1 && (
                    <button
                      className="hover:text-blue-400 hover:shadow-lg h-full "
                      onClick={handleBackward}
                    >
                      <FaRegSquareCaretLeft />
                    </button>
                  )}

                  {actualPage === 1 && (
                    <button
                      className="text-gray-300 h-full"
                      onClick={handleBackward}
                      disabled
                    >
                      <FaRegSquareCaretLeft />
                    </button>
                  )}

                  {actualPage < lastPage && (
                    <button
                      className="hover:text-blue-400 hover:shadow-lg h-full"
                      onClick={handleForward}
                    >
                      <FaRegSquareCaretRight />
                    </button>
                  )}
                  {actualPage === lastPage && (
                    <button
                      className="text-gray-300 h-full"
                      onClick={handleForward}
                      disabled
                    >
                      <FaRegSquareCaretRight />
                    </button>
                  )}
                </div>
              </div>

              {searchResult.length > 0 &&
                searchResult.map((item) => (
                  <SearchCard key={item.id} item={item} />
                ))}

              <div className="flex flex-row w-4/6 font-header font-medium text-3xl text-black mt-4 mb-5 mx-auto bg-gray-200">
                <div className="w-1/2 text-left pl-5"></div>
                <div className="flex flex-row w-1/2 text-right h-full justify-end items-center ">
                  <p className="font-header font-medium text-base text-black bg-gray-100">
                    PAGE:{" "}
                  </p>

                  <span className="inline px-5 w-auto border-1  font-header font-medium text-base text-black border-gray-200 mr-2 ml-2 bg-white">
                    {actualPage}
                  </span>

                  <p className="font-header font-medium text-base text-black mr-5">
                    /{lastPage}
                  </p>
                  {actualPage > 1 && (
                    <button
                      className="hover:text-blue-400 hover:shadow-lg h-full"
                      onClick={handleBackward}
                    >
                      <FaRegSquareCaretLeft />
                    </button>
                  )}

                  {actualPage === 1 && (
                    <button
                      className="text-gray-300 h-full"
                      onClick={handleBackward}
                      disabled
                    >
                      <FaRegSquareCaretLeft />
                    </button>
                  )}

                  {actualPage < lastPage && (
                    <button
                      className="hover:text-blue-400 hover:shadow-lg h-full"
                      onClick={handleForward}
                    >
                      <FaRegSquareCaretRight />
                    </button>
                  )}
                  {actualPage === lastPage && (
                    <button
                      className="text-gray-300 h-full"
                      onClick={handleForward}
                      disabled
                    >
                      <FaRegSquareCaretRight />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default SearchList;

