import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  getSearch,
  updateLoadingState,
  updateSearchPage,
  updateSearchString,
  updateSeeSearchBTN,
  updateFavoritesOrder,
} from "../../actions/actions";
import { Link } from "react-router-dom";
import oldCam from "../../assets/oldCam.png";

function Header() {
  const dispatch = useDispatch();

  let favOrderBy = useSelector((state) => state.favOrderBy);
  let favOrderType = useSelector((state) => state.favOrderType);

  const seeSearchBTN = useSelector((state) => state.seeSearchBTN);

  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(1);

  const handleOrderBy = (e) => {
    dispatch(updateFavoritesOrder(e.target.value, favOrderType));
  };

  const handleOrderType = (e) => {
    dispatch(updateFavoritesOrder(favOrderBy, e.target.value));
  };

  const handleGoFavorites = () => {
    dispatch(updateSeeSearchBTN(false));
    dispatch(updateSearchPage(1));
    dispatch(updateSearchString(""));
  };

  const handleGoSearch = () => {
    dispatch(updateSeeSearchBTN(true));
  };

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  const handleSubmit = () => {
    if (searchString !== "") {
      dispatch(updateLoadingState(true));
      dispatch(getSearch(searchString, page));
      dispatch(updateSearchString(""));
      dispatch(updateSearchString(searchString));
      dispatch(updateSearchPage(1));
      setSearchString("");
      dispatch(updateLoadingState(false));
    }
  };

  return (
    <div className=" border-black bg-black sm:text-center">
      <div className="flex flex-row flex-grow w-auto sm:w-5/7 mx-auto">
        <div
          className="flex flex-row flex-wrap h-auto mt-1 mb-1  sm:flex-row w-full justify-between " //barra 2/3 de 5/7 para poner logo y searcher
        >
          <img
            src={oldCam}
            className="w-auto h-7 sm:w-auto sm:mr-4 rounded-md"
          ></img>

          {!seeSearchBTN && (
            <Link
              to="/search"
              className="w-1/3 sm:w-1/6 text-white rounded border-2 border-gray-500 text-center mr-1 sm:mr-5 hover:border-black hover:bg-gray-500 hover:bg-opacity-20 hover: shadow-inner hover:ring-4 hover:shadow-gray-200"
              onClick={handleGoSearch}
            >
              SEARCH
            </Link>
          )}

          {seeSearchBTN && (
            <Link
              to="/favorites"
              className="w-1/3 sm:w-1/6 text-white rounded border-2 border-gray-500 text-center mr-1 hover:border-black hover:bg-gray-500 hover:bg-opacity-20 hover: shadow-inner hover:ring-4 hover:shadow-gray-200"
              onClick={handleGoFavorites}
            >
              FAVORITES
            </Link>
          )}

          {seeSearchBTN && (
            <div
              className="w-full mt-1 flex flex-row h-6 sm:h-auto sm:w-4/6 rounded-md sm:rounded-lg sm:mt-0 sm-border bg-gray-200" //contenedor dividido en 6 del searcher
            >
              <p className="flex flex-col w-1/6 h-auto justify-center text-center font-bold text-xs border-r-4   ">
                MOVIE
              </p>
              <input
                className="w-4/6 px-3 text-bold text-xs"
                name="search"
                value={searchString}
                placeholder="Buscar en TMDB"
                onChange={handleChange}
              ></input>

              <div
                className="flex flex-col w-1/6  text-gray-500 justify-center" //container de la lupa
              >
                <Link
                  to="/search"
                  className="w-full text-grey-300 "
                  onClick={handleSubmit}
                >
                  <FaMagnifyingGlass className="mx-auto" />
                </Link>
              </div>
            </div>
          )}

          {!seeSearchBTN && favOrderBy == "" && favOrderType == "" && (
            <div
              className="flex flex-row mt-1 w-full h-6 sm:h-auto sm:w-4/6 rounded-md sm:rounded-lg sm:border sm:mt-0  bg-gray-200 " //contenedor dividido en 6 del searcher
            >
              <p className="flex flex-col w-1/6 h-auto justify-center text-center font-bold text-xs border-r-4">
                SORT
              </p>
              <select
                name="orderBy"
                placeholder="field"
                onChange={(e) => handleOrderBy(e)}
                className="flex flex-row w-2/6 h-full justify-center bg-white text-gray-400 text-center text-xs border-r-4"
              >
                <option className="font-thin text-gray-400" value="">
                  -- By Field --
                </option>
                <option className="font-normal text-black" value="1">
                  Title
                </option>
                <option className="font-normal text-black" value="2">
                  Year
                </option>
              </select>

              <select
                name="orderType"
                onChange={(e) => handleOrderType(e)}
                className="flex flex-row w-2/6 h-auto justify-center bg-white text-center text-gray-400 text-xs border-r-4"
              >
                <option className="font-thin text-gray-400" value="">
                  -- By Order --
                </option>
                <option className="font-normal text-black" value="1">
                  Ascendant
                </option>
                <option className="font-normal text-black" value="2">
                  Descendant
                </option>
              </select>
            </div>
          )}

          {!seeSearchBTN && favOrderBy !== "" && favOrderType !== "" && (
            <div
              className="flex flex-row rounded-md w-full h-6 mt-1 sm:h-auto sm:mt-0 sm:w-4/6 sm:border sm:rounded-lg  bg-gray-200" //contenedor dividido en 6 del searcher
            >
              <p className="flex flex-col w-1/6 h-auto justify-center text-center font-bold text-xs border-r-4">
                SORT
              </p>
              <select
                defaultValue={favOrderBy}
                name="orderBy"
                onChange={(e) => handleOrderBy(e)}
                className="flex flex-row w-2/6 h-full justify-center bg-white text-black text-center text-xs border-r-4"
              >
                <option value="1">Title</option>
                <option value="2">Year</option>
              </select>

              <select
                name="orderType"
                onChange={(e) => handleOrderType(e)}
                className="flex flex-row w-2/6 h-auto justify-center bg-white text-center text-black text-xs border-r-4"
              >
                <option value="1">Ascendant</option>
                <option value="2">Descendant</option>
              </select>
            </div>
          )}

          {!seeSearchBTN && favOrderBy == "" && favOrderType !== "" && (
            <div
              className="flex flex-row h-6 mt-1 w-full sm:h-auto sm:w-4/6 sm:mt-0 rounded-md sm:border sm:rounded-lg bg-gray-200" //contenedor dividido en 6 del searcher
            >
              <p className="flex flex-col w-1/6 h-auto justify-center text-center font-bold text-xs border-r-4">
                SORT
              </p>
              <select
                name="orderBy"
                placeholder="field"
                onChange={(e) => handleOrderBy(e)}
                className="flex flex-row w-2/6 h-full justify-center bg-white text-gray-400 text-center text-xs border-r-4"
              >
                <option className="font-thin text-gray-400" value="">
                  -- SELECT FIELD TO ORDER BY --
                </option>
                <option className="font-normal text-black" value="1">
                  Title
                </option>
                <option className="font-normal text-black" value="2">
                  Year
                </option>
              </select>

              <select
                name="orderType"
                onChange={(e) => handleOrderType(e)}
                className="flex flex-row w-2/6 h-auto justify-center bg-white text-center text-black text-xs border-r-4"
              >
                <option value="1">Ascendant</option>
                <option value="2">Descendant</option>
              </select>
            </div>
          )}

          {!seeSearchBTN && favOrderBy !== "" && favOrderType == "" && (
            <div
              className="flex flex-row h-6 mt-1 w-full sm:h-auto sm:w-4/6 sm:mt-0 rounded-md sm:border sm:rounded-lg bg-gray-200 " //contenedor dividido en 6 del searcher
            >
              <p className="flex flex-col w-1/6 h-auto justify-center text-center font-bold text-xs border-r-4">
                SORT
              </p>
              <select
                name="orderBy"
                placeholder="field"
                onChange={(e) => handleOrderBy(e)}
                className="flex flex-row w-2/6 h-full justify-center bg-white text-center text-black text-xs border-r-4"
              >
                <option value="1">Title</option>
                <option value="2">Year</option>
              </select>

              <select
                name="orderType"
                onChange={(e) => handleOrderType(e)}
                className="flex flex-row w-2/6 h-auto justify-center bg-white text-center text-gray-400 text-xs border-r-4"
              >
                <option className="font-thin text-gray-400" value="">
                  -- Select Way to Order By --
                </option>
                <option className="font-normal text-black" value="1">
                  Ascendant
                </option>
                <option className="font-normal text-black" value="2">
                  Descendant
                </option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;

// import { useState } from "react";
// import { FaMagnifyingGlass } from "react-icons/fa6";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getSearch,
//   updateLoadingState,
//   updateSearchPage,
//   updateSearchString,
//   updateSeeSearchBTN,
//   updateFavoritesOrder,
// } from "../../actions/actions";
// import { Link } from "react-router-dom";
// import oldCam from "../../assets/oldCam.png";

// function Header() {
//   const dispatch = useDispatch();

//   let favOrderBy = useSelector((state) => state.favOrderBy);
//   let favOrderType = useSelector((state) => state.favOrderType);

//   const seeSearchBTN = useSelector((state) => state.seeSearchBTN);

//   const [searchString, setSearchString] = useState("");
//   const [page, setPage] = useState(1);

//   const handleOrderBy = (e) => {
//     dispatch(updateFavoritesOrder(e.target.value, favOrderType));
//   };

//   const handleOrderType = (e) => {
//     dispatch(updateFavoritesOrder(favOrderBy, e.target.value));
//   };

//   const handleGoFavorites = () => {
//     dispatch(updateSeeSearchBTN(false));
//     dispatch(updateSearchPage(1));
//     dispatch(updateSearchString(""));
//   };

//   const handleGoSearch = () => {
//     dispatch(updateSeeSearchBTN(true));
//   };

//   const handleChange = (e) => {
//     setSearchString(e.target.value);
//   };

//   const handleSubmit = () => {
//     if (searchString !== "") {
//       dispatch(updateLoadingState(true));
//       dispatch(getSearch(searchString, page));
//       dispatch(updateSearchString(""));
//       dispatch(updateSearchString(searchString));
//       dispatch(updateSearchPage(1));
//       setSearchString("");
//       dispatch(updateLoadingState(false));
//     }
//   };

//   return (
//     <div
//       className="border-10 border-black bg-black" //barra completa
//     >
//       <div
//         className="w-5/7  mx-auto" //barra 5/7 espacio principal de contenido
//       >
//         <div
//           className="flex flex-row w-full" //barra 2/3 de 5/7 para poner logo y searcher
//         >
//           <img src={oldCam} className="h-7 mr-5 border-none rounded-md"></img>

//           {!seeSearchBTN && (
//             <Link
//               to="/search"
//               className="w-1/6 text-white rounded border-2 border-gray-500 text-center mr-5 hover:border-black hover:bg-gray-500 hover:bg-opacity-20           hover: shadow-inner hover:ring-4 hover:shadow-gray-200"
//               onClick={handleGoSearch}
//             >
//               SEARCH
//             </Link>
//           )}

//           {seeSearchBTN && (
//             <Link
//               to="/favorites"
//               className="w-1/6 text-white rounded border-2 border-gray-500 text-center mr-5 hover:border-black hover:bg-gray-500 hover:bg-opacity-20           hover: shadow-inner hover:ring-4 hover:shadow-gray-200"
//               onClick={handleGoFavorites}
//             >
//               FAVORITES
//             </Link>
//           )}

//           {seeSearchBTN && (
//             <div
//               className="flex flex-row w-4/6 rounded-lg border bg-gray-200" //contenedor dividido en 6 del searcher
//             >
//               <p className="flex flex-col w-1/6 h-auto justify-center text-center font-bold text-xs border-r-4   ">
//                 MOVIE
//               </p>
//               <input
//                 className="w-4/6 px-3 text-bold text-xs"
//                 name="search"
//                 value={searchString}
//                 placeholder="Buscar en TMDB"
//                 onChange={handleChange}
//               ></input>

//               <div
//                 className="flex flex-col w-1/6  text-gray-500 justify-center" //container de la lupa
//               >
//                 <Link
//                   to="/search"
//                   className="w-full text-grey-300 "
//                   onClick={handleSubmit}
//                 >
//                   <FaMagnifyingGlass className="mx-auto" />
//                 </Link>
//               </div>
//             </div>
//           )}

//           {!seeSearchBTN && favOrderBy == "" && favOrderType == "" && (
//             <div
//               className="flex flex-row w-4/6 rounded-lg border bg-gray-200" //contenedor dividido en 6 del searcher
//             >
//               <p className="flex flex-col w-1/6 h-auto justify-center text-center font-bold text-xs border-r-4">
//                 SORT
//               </p>
//               <select
//                 name="orderBy"
//                 placeholder="field"
//                 onChange={(e) => handleOrderBy(e)}
//                 className="flex flex-row w-2/6 h-full justify-center bg-white text-gray-400 text-center text-xs border-r-4"
//               >
//                 <option className="font-thin text-gray-400" value="">
//                   -- Selected Field to Order By --
//                 </option>
//                 <option className="font-normal text-black" value="1">
//                   Title
//                 </option>
//                 <option className="font-normal text-black" value="2">
//                   Year
//                 </option>
//               </select>

//               <select
//                 name="orderType"
//                 onChange={(e) => handleOrderType(e)}
//                 className="flex flex-row w-2/6 h-auto justify-center bg-white text-center text-gray-400 text-xs border-r-4"
//               >
//                 <option className="font-thin text-gray-400" value="">
//                   -- Select Way to Order By --
//                 </option>
//                 <option className="font-normal text-black" value="1">
//                   Ascendant
//                 </option>
//                 <option className="font-normal text-black" value="2">
//                   Descendant
//                 </option>
//               </select>
//             </div>
//           )}

//           {!seeSearchBTN && favOrderBy !== "" && favOrderType !== "" && (
//             <div
//               className="flex flex-row w-4/6 rounded-lg border bg-gray-200" //contenedor dividido en 6 del searcher
//             >
//               <p className="flex flex-col w-1/6 h-auto justify-center text-center font-bold text-xs border-r-4">
//                 SORT
//               </p>
//               <select
//                 defaultValue={favOrderBy}
//                 name="orderBy"
//                 onChange={(e) => handleOrderBy(e)}
//                 className="flex flex-row w-2/6 h-full justify-center bg-white text-black text-center text-xs border-r-4"
//               >
//                 <option value="1">Title</option>
//                 <option value="2">Year</option>
//               </select>

//               <select
//                 name="orderType"
//                 onChange={(e) => handleOrderType(e)}
//                 className="flex flex-row w-2/6 h-auto justify-center bg-white text-center text-black text-xs border-r-4"
//               >
//                 <option value="1">Ascendant</option>
//                 <option value="2">Descendant</option>
//               </select>
//             </div>
//           )}

//           {!seeSearchBTN && favOrderBy == "" && favOrderType !== "" && (
//             <div
//               className="flex flex-row w-4/6 rounded-lg border bg-gray-200" //contenedor dividido en 6 del searcher
//             >
//               <p className="flex flex-col w-1/6 h-auto justify-center text-center font-bold text-xs border-r-4">
//                 SORT
//               </p>
//               <select
//                 name="orderBy"
//                 placeholder="field"
//                 onChange={(e) => handleOrderBy(e)}
//                 className="flex flex-row w-2/6 h-full justify-center bg-white text-gray-400 text-center text-xs border-r-4"
//               >
//                 <option className="font-thin text-gray-400" value="">
//                   -- SELECT FIELD TO ORDER BY --
//                 </option>
//                 <option className="font-normal text-black" value="1">
//                   Title
//                 </option>
//                 <option className="font-normal text-black" value="2">
//                   Year
//                 </option>
//               </select>

//               <select
//                 name="orderType"
//                 onChange={(e) => handleOrderType(e)}
//                 className="flex flex-row w-2/6 h-auto justify-center bg-white text-center text-black text-xs border-r-4"
//               >
//                 <option value="1">Ascendant</option>
//                 <option value="2">Descendant</option>
//               </select>
//             </div>
//           )}

//           {!seeSearchBTN && favOrderBy !== "" && favOrderType == "" && (
//             <div
//               className="flex flex-row w-4/6 rounded-lg border bg-gray-200" //contenedor dividido en 6 del searcher
//             >
//               <p className="flex flex-col w-1/6 h-auto justify-center text-center font-bold text-xs border-r-4">
//                 SORT
//               </p>
//               <select
//                 name="orderBy"
//                 placeholder="field"
//                 onChange={(e) => handleOrderBy(e)}
//                 className="flex flex-row w-2/6 h-full justify-center bg-white text-center text-black text-xs border-r-4"
//               >
//                 <option value="1">Title</option>
//                 <option value="2">Year</option>
//               </select>

//               <select
//                 name="orderType"
//                 onChange={(e) => handleOrderType(e)}
//                 className="flex flex-row w-2/6 h-auto justify-center bg-white text-center text-gray-400 text-xs border-r-4"
//               >
//                 <option className="font-thin text-gray-400" value="">
//                   -- Select Way to Order By --
//                 </option>
//                 <option className="font-normal text-black" value="1">
//                   Ascendant
//                 </option>
//                 <option className="font-normal text-black" value="2">
//                   Descendant
//                 </option>
//               </select>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Header;
