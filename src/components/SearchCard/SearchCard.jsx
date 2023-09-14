import noImageIcon from "../../assets/NoImageIcon.png";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import {
  addFavorite,
  deleteFavorites,
  updateFavoriteRecordNumbers,
} from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SearchCard(props) {
  const dispatch = useDispatch();
  const favoriteList = useSelector((state) => state.favoriteList);

  let valor = props.item;
  let isFavorite = favoriteList.filter((item) => item.id === valor.id);

  const handleClickFavorite = () => {
    if (isFavorite.length < 1) {
      dispatch(addFavorite(valor));
      let length = favoriteList.length + 1;
      let lastPage = Math.ceil(length / 20);
      dispatch(
        updateFavoriteRecordNumbers({
          favTotals_results: length,
          favTotals_page: lastPage,
        })
      );
    }
    if (isFavorite.length > 0) {
      dispatch(deleteFavorites(valor.id));
      let length = favoriteList.length - 1;
      let lastPage = Math.ceil(length / 20);
      if (lastPage < 1) lastPage = 1;
      dispatch(
        updateFavoriteRecordNumbers({
          favTotals_results: length,
          favTotals_page: lastPage,
        })
      );
    }
  };

  let urlImage = "";
  const urlImageGeneral = import.meta.env.VITE_APP_URL_IMAGES;

  if (valor.poster_path != null && valor.poster_path != undefined) {
    urlImage = `${urlImageGeneral}${valor.poster_path}`;
  } else if (valor.profile_path) {
    urlImage = `${urlImageGeneral}${valor.profile_path}`;
  } else urlImage = noImageIcon;

  return (
    <div className="rounded-xl flex flex-row w-auto mx-1 px-0 sm:w-4/6  mt-5 mb-5 sm:mx-auto shadow-black shadow-lg  ">
      
      
      
      <Link
        to={`/movie/${valor.id}`}
        className="rounded-l-xl w-1/6 sm:w-2/6 flex flex-col  justify-center items-center bg-white cursor-pointer"
      >



        {urlImage != null && (
          <img
            className="w-auto h-auto  border border-black  my-5"
            src={urlImage}
          ></img>
        )}
      </Link>











      <Link
        to={`/movie/${valor.id}`}
        className="w-4/6 sm:w-3/6 flex flex-col bg-white cursor-pointer"
      >
        <h1 className="w-3/4 bg-white font-header font-medium text-base text-black mt-5 ml-1 sm:ml-0">
          {valor.original_title}
        </h1>
        <h1 className="w-3/4 font-header font-light text-sm text-black mb-5 ml-1 sm:ml-0 ">
          {valor.release_date != undefined && valor.release_date != ""
            ? valor.release_date.slice(0, 4)
            : "Unknown"}
        </h1>
        <span className="w-full pr-3 bg-white text-left mb-5 ml-1 sm:ml-0">{valor.overview}</span>
      </Link>





      <div className="rounded-r-xl flex flex-col w-1/6 text-white bg-gray-400 justify-center items-center">
        {isFavorite.length > 0 && (
          <button onClick={handleClickFavorite}>
            <MdFavorite className="text-red-700 sm:text-5xl text-2xl" />
          </button>
        )}

        {isFavorite.length < 1 && (
          <button onClick={handleClickFavorite}>
            <MdFavoriteBorder className="sm:text-5xl text-2xl" />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchCard;













// import noImageIcon from "../../assets/NoImageIcon.png";
// import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
// import {
//   addFavorite,
//   deleteFavorites,
//   updateFavoriteRecordNumbers,
// } from "../../actions/actions";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// function SearchCard(props) {
//   const dispatch = useDispatch();
//   const favoriteList = useSelector((state) => state.favoriteList);

//   let valor = props.item;
//   let isFavorite = favoriteList.filter((item) => item.id === valor.id);

//   const handleClickFavorite = () => {
//     if (isFavorite.length < 1) {
//       dispatch(addFavorite(valor));
//       let length = favoriteList.length + 1;
//       let lastPage = Math.ceil(length / 20);
//       dispatch(
//         updateFavoriteRecordNumbers({
//           favTotals_results: length,
//           favTotals_page: lastPage,
//         })
//       );
//     }
//     if (isFavorite.length > 0) {
//       dispatch(deleteFavorites(valor.id));
//       let length = favoriteList.length - 1;
//       let lastPage = Math.ceil(length / 20);
//       if (lastPage < 1) lastPage = 1;
//       dispatch(
//         updateFavoriteRecordNumbers({
//           favTotals_results: length,
//           favTotals_page: lastPage,
//         })
//       );
//     }
//   };

//   let urlImage = "";
//   const urlImageGeneral = import.meta.env.VITE_APP_URL_IMAGES;

//   if (valor.poster_path != null && valor.poster_path != undefined) {
//     urlImage = `${urlImageGeneral}${valor.poster_path}`;
//   } else if (valor.profile_path) {
//     urlImage = `${urlImageGeneral}${valor.profile_path}`;
//   } else urlImage = noImageIcon;

//   return (
//     <div className="rounded-xl flex flex-row w-full px-1 sm:px-0 sm:w-4/6  mt-5 mb-5 mx-auto shadow-black shadow-lg ">
//       <Link
//         to={`/movie/${valor.id}`}
//         className="rounded-l-xl w-1/6 sm:w-2/6 flex flex-col  justify-center items-center bg-white cursor-pointer"
//       >
//         {urlImage != null && (
//           <img
//             className="w-auto h-auto  bg-orange-300  border-2 border-black my-5"
//             src={urlImage}
//           ></img>
//         )}
//       </Link>

//       <Link
//         to={`/movie/${valor.id}`}
//         className="w-4/6 sm:w-3/6 flex flex-col bg-white cursor-pointer"
//       >
//         <h1 className="w-3/4 bg-white font-header font-medium text-base text-black mt-5">
//           {valor.original_title}
//         </h1>
//         <h1 className="w-3/4 font-header font-light text-sm text-black mb-5">
//           {valor.release_date != undefined && valor.release_date != ""
//             ? valor.release_date.slice(0, 4)
//             : "Unknown"}
//         </h1>
//         <span className="w-3/4 bg-white  mb-5">{valor.overview}</span>
//       </Link>
//       <div className="rounded-r-xl flex flex-col w-1/6 text-white bg-gray-400 justify-center items-center">
//         {isFavorite.length > 0 && (
//           <button onClick={handleClickFavorite}>
//             <MdFavorite className="text-5xl text-red-700" />
//           </button>
//         )}

//         {isFavorite.length < 1 && (
//           <button onClick={handleClickFavorite}>
//             <MdFavoriteBorder className="text-5xl" />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SearchCard;