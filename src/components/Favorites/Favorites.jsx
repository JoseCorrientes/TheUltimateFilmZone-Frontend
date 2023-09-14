import { useDispatch, useSelector } from "react-redux";
import FavCard from "../FavCard/FavCard";
import { FaRegSquareCaretLeft } from "react-icons/fa6";
import { FaRegSquareCaretRight } from "react-icons/fa6";
import { useEffect } from "react";
import { sorter } from "../../Libraries/sorter";
import {
  updateFavoriteList,
  updateFavoritePage,
  updateFavoriteRecordNumbers,
} from "../../actions/actions";

function Favorites() {
  const favResult = useSelector((state) => state.favoriteList);
  const lastPage = Math.ceil(favResult.length / 20);
  const dispatch = useDispatch();

  dispatch(
    updateFavoriteRecordNumbers({
      favTotals_results: favResult.length,
      favTotals_page: lastPage,
    })
  );

  let loadingStateFav = useSelector((state) => state.loadingStateFav);
  let favPage = useSelector((state) => state.favPage);
  let favOrderBy = useSelector((state) => state.favOrderBy);
  let favOrderType = useSelector((state) => state.favOrderType);
  let favoriteList = useSelector((state) => state.favoriteList);

  useEffect(() => {
    let result = sorter(favoriteList, favOrderBy, favOrderType);
    dispatch(updateFavoriteList(result));
  }, [favOrderBy, favOrderType]);

  let pagedFavorites = favoriteList.slice((favPage - 1) * 20, favPage * 20);

  const handleBackward = () => {
    if (favPage > 1) {
      favPage--;
      dispatch(updateFavoritePage(favPage));
    }
  };

  const handleForward = () => {
    if (favPage < lastPage) {
      favPage++;
      dispatch(updateFavoritePage(favPage));
    }
  };


  return (
    <div className="w-full min-h-screen h-auto m-auto">
      <div>
        {loadingStateFav === true && <h1>esta cargando......</h1>}  

        {loadingStateFav === false && favResult.length < 1 && (
          <div className="h-screen">
            <h1 className="font-header text-center font-medium text-2xl text-black mt-4 ">
              Favorites
            </h1>

            <div className="flex flex-row w-4/6 font-header font-medium text-3xl text-black mt-4 mx-auto bg-gray-200">
              <h1 className="w-1/2 mx-auto  text-center">
                Favorites is Empty.
              </h1>
            </div>
          </div>
        )}











        {loadingStateFav === false && favResult.length > 0 && (
          <div>
            <h1 className="font-header text-center font-medium text-2xl text-black mt-2 sm:mt-4 ">
              Favorites
            </h1>

















            <div className="flex sm:flex-row sm:w-4/6 flex-col font-header font-medium text-2xl text-black mt-4 mx-1 sm:mx-auto bg-gray-200">
              
              
              <h1 className="flex flex-row w-full sm:w-1/2 text-left sm:pl-5 items-center ">
                Titles
                <span className="inline w-auto px-2 font-medium text-sm ml-6 text-gray-400 justify-center ">
                  ( {favoriteList.length} Results )
                </span>
              </h1>




              <div className="flex flex-row w-full sm:w-1/2 text-right h-auto justify-end items-center ">
                
                <p className="font-header font-medium text-base text-black bg-gray-100 ">
                  PAGE:{" "}
                </p>

                <span className="inline px-5 w-auto border-1  font-header font-medium text-base text-black border-gray-200 mr-2 ml-2 bg-white">
                  {favPage}
                </span>

                <p className="font-header font-medium text-base text-black mr-5">
                  /{lastPage}
                </p>

                {favPage > 1 && (
                  <button
                    className="hover:text-blue-400 hover:shadow-lg h-full "
                    onClick={handleBackward}
                  >
                    <FaRegSquareCaretLeft />
                  </button>
                )}


                {favPage === 1 && (
                  <button
                    className="text-gray-300 h-full"
                    onClick={handleBackward}
                    disabled
                  >
                    <FaRegSquareCaretLeft />
                  </button>
                )}


                {favPage < lastPage && (
                  <button
                    className="hover:text-blue-400 hover:shadow-lg h-full"
                    onClick={handleForward}
                  >
                    <FaRegSquareCaretRight />
                  </button>
                )}


                {favPage === lastPage && (
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























            {favResult.length > 0 &&
              pagedFavorites.map((item) => (
                <FavCard key={item.id} item={item} />
              ))}















            <div className="flex flex-row w-auto sm:w-4/6 font-header font-medium text-3xl text-black mt-4 mb-5 mx-1 sm:mx-auto bg-gray-200">
              <div className="w-1/2 text-left pl-5"></div>
              <div className="flex flex-row w-1/2 text-right h-full justify-end items-center ">
                <p className="font-header font-medium text-base text-black bg-gray-100">
                  PAGE:{" "}
                </p>

                <span className="inline px-5 w-auto border-1  font-header font-medium text-base text-black border-gray-200 mr-2 ml-2 bg-white">
                  {favPage}
                </span>

                <p className="font-header font-medium text-base text-black mr-5">
                  /{lastPage}
                </p>
                {favPage > 1 && (
                  <button
                    className="hover:text-blue-400 hover:shadow-lg h-full"
                    onClick={handleBackward}
                  >
                    <FaRegSquareCaretLeft />
                  </button>
                )}

                {favPage === 1 && (
                  <button
                    className="text-gray-300 h-full"
                    onClick={handleBackward}
                    disabled
                  >
                    <FaRegSquareCaretLeft />
                  </button>
                )}

                {favPage < lastPage && (
                  <button
                    className="hover:text-blue-400 hover:shadow-lg h-full"
                    onClick={handleForward}
                  >
                    <FaRegSquareCaretRight />
                  </button>
                )}
                {favPage === lastPage && (
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

export default Favorites;






















// import { useDispatch, useSelector } from "react-redux";
// import FavCard from "../FavCard/FavCard";
// import { FaRegSquareCaretLeft } from "react-icons/fa6";
// import { FaRegSquareCaretRight } from "react-icons/fa6";
// import { useEffect } from "react";
// import { sorter } from "../../Libraries/sorter";
// import {
//   updateFavoriteList,
//   updateFavoritePage,
//   updateFavoriteRecordNumbers,
// } from "../../actions/actions";

// function Favorites() {
//   const favResult = useSelector((state) => state.favoriteList);
//   const lastPage = Math.ceil(favResult.length / 20);
//   const dispatch = useDispatch();

//   dispatch(
//     updateFavoriteRecordNumbers({
//       favTotals_results: favResult.length,
//       favTotals_page: lastPage,
//     })
//   );

//   let loadingStateFav = useSelector((state) => state.loadingStateFav);
//   let favPage = useSelector((state) => state.favPage);
//   let favOrderBy = useSelector((state) => state.favOrderBy);
//   let favOrderType = useSelector((state) => state.favOrderType);
//   let favoriteList = useSelector((state) => state.favoriteList);

//   useEffect(() => {
//     let result = sorter(favoriteList, favOrderBy, favOrderType);
//     dispatch(updateFavoriteList(result));
//   }, [favOrderBy, favOrderType]);

//   let pagedFavorites = favoriteList.slice((favPage - 1) * 20, favPage * 20);

//   const handleBackward = () => {
//     if (favPage > 1) {
//       favPage--;
//       dispatch(updateFavoritePage(favPage));
//     }
//   };

//   const handleForward = () => {
//     if (favPage < lastPage) {
//       favPage++;
//       dispatch(updateFavoritePage(favPage));
//     }
//   };

//   return (
//     <div className="border-4 w-full min-h-screen h-auto m-auto">
//       <div>
//         {loadingStateFav === true && <h1>esta cargando......</h1>}

//         {loadingStateFav === false && favResult.length < 1 && (
//           <div className="h-screen">
//             <h1 className="font-header text-center font-medium text-2xl text-black mt-4 ">
//               Favorites
//             </h1>

//             <div className="flex flex-row w-4/6 font-header font-medium text-3xl text-black mt-4 mx-auto bg-gray-200">
//               <h1 className="w-1/2 mx-auto  text-center">
//                 Results didn&apos;t found.
//               </h1>
//             </div>
//           </div>
//         )}

//         {loadingStateFav === false && favResult.length > 0 && (
//           <div>
//             <h1 className="font-header text-center font-medium text-2xl text-black mt-4 ">
//               Favorites
//             </h1>

//             <div className="flex flex-row w-4/6  font-header font-medium text-3xl text-black mt-4 mx-auto bg-gray-200">
//               <h1 className="flex flex-row w-1/2 text-left pl-5 items-center">
//                 Titles
//                 <span className="inline w-auto px-2 font-medium text-sm ml-6 text-gray-400 justify-center ">
//                   ( {favoriteList.length} Results )
//                 </span>
//               </h1>

//               <div className="flex flex-row w-1/2 text-right h-auto justify-end items-center ">
//                 <p className="font-header font-medium text-base text-black bg-gray-100 ">
//                   PAGE:{" "}
//                 </p>

//                 <span className="inline px-5 w-auto border-1  font-header font-medium text-base text-black border-gray-200 mr-2 ml-2 bg-white">
//                   {favPage}
//                 </span>

//                 <p className="font-header font-medium text-base text-black mr-5">
//                   /{lastPage}
//                 </p>
//                 {favPage > 1 && (
//                   <button
//                     className="hover:text-blue-400 hover:shadow-lg h-full "
//                     onClick={handleBackward}
//                   >
//                     <FaRegSquareCaretLeft />
//                   </button>
//                 )}

//                 {favPage === 1 && (
//                   <button
//                     className="text-gray-300 h-full"
//                     onClick={handleBackward}
//                     disabled
//                   >
//                     <FaRegSquareCaretLeft />
//                   </button>
//                 )}

//                 {favPage < lastPage && (
//                   <button
//                     className="hover:text-blue-400 hover:shadow-lg h-full"
//                     onClick={handleForward}
//                   >
//                     <FaRegSquareCaretRight />
//                   </button>
//                 )}
//                 {favPage === lastPage && (
//                   <button
//                     className="text-gray-300 h-full"
//                     onClick={handleForward}
//                     disabled
//                   >
//                     <FaRegSquareCaretRight />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {favResult.length > 0 &&
//               pagedFavorites.map((item) => (
//                 <FavCard key={item.id} item={item} />
//               ))}

//             <div className="flex flex-row w-4/6 font-header font-medium text-3xl text-black mt-4 mb-5 mx-auto bg-gray-200">
//               <div className="w-1/2 text-left pl-5"></div>
//               <div className="flex flex-row w-1/2 text-right h-full justify-end items-center ">
//                 <p className="font-header font-medium text-base text-black bg-gray-100">
//                   PAGE:{" "}
//                 </p>

//                 <span className="inline px-5 w-auto border-1  font-header font-medium text-base text-black border-gray-200 mr-2 ml-2 bg-white">
//                   {favPage}
//                 </span>

//                 <p className="font-header font-medium text-base text-black mr-5">
//                   /{lastPage}
//                 </p>
//                 {favPage > 1 && (
//                   <button
//                     className="hover:text-blue-400 hover:shadow-lg h-full"
//                     onClick={handleBackward}
//                   >
//                     <FaRegSquareCaretLeft />
//                   </button>
//                 )}

//                 {favPage === 1 && (
//                   <button
//                     className="text-gray-300 h-full"
//                     onClick={handleBackward}
//                     disabled
//                   >
//                     <FaRegSquareCaretLeft />
//                   </button>
//                 )}

//                 {favPage < lastPage && (
//                   <button
//                     className="hover:text-blue-400 hover:shadow-lg h-full"
//                     onClick={handleForward}
//                   >
//                     <FaRegSquareCaretRight />
//                   </button>
//                 )}
//                 {favPage === lastPage && (
//                   <button
//                     className="text-gray-300 h-full"
//                     onClick={handleForward}
//                     disabled
//                   >
//                     <FaRegSquareCaretRight />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Favorites;
