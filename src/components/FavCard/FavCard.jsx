import { useDispatch } from "react-redux";
import noImageIcon from "../../assets/NoImageIcon.png";
import { MdFavorite } from "react-icons/md";
import { deleteFavorites } from "../../actions/actions";

function FavCard(props) {
  const dispatch = useDispatch();

  const handleClickFavorite = (data) => {
    dispatch(deleteFavorites(data));
  };

  let valor = props.item;
  let urlImage = "";
  const urlImageGeneral = import.meta.env.VITE_APP_URL_IMAGES;

  if (valor.poster_path != null && valor.poster_path != undefined) {
    urlImage = `${urlImageGeneral}${valor.poster_path}`;
  } else if (valor.profile_path) {
    urlImage = `${urlImageGeneral}${valor.profile_path}`;
  } else urlImage = noImageIcon;

  return (
    <div className="rounded-xl flex flex-row w-auto sm:w-4/6  mt-5 mb-5 mx-1 sm:mx-auto shadow-black shadow-lg ">


      <div className="rounded-l-xl w-1/6 sm:w-2/6 flex flex-col  justify-center items-center bg-white">
        {urlImage != null && (
          <img
            className="w-auto h-auto border border-black my-5"
            src={urlImage}
          ></img>
        )}
      </div>


      <div className="w-4/6 sm:w-3/6 flex flex-col bg-white">
        <h1 className="w-3/4 bg-white font-header font-medium text-base text-black mt-5 ml-1 sm:ml-0">
          {valor.original_title}
        </h1>
        <h1 className="w-3/4 font-header font-light text-sm text-black mb-5 ml-1 sm:ml-0">
          {valor.release_date != undefined && valor.release_date != ""
            ? valor.release_date.slice(0, 4)
            : "Unknown"}
        </h1>
        <span className="w-full pr-3 bg-white mb-5 ml-1 sm:ml-0">{valor.overview}</span>
      </div>



      <div className="rounded-r-xl flex flex-col w-1/6 text-white bg-green-700 bg-opacity-50 justify-center items-center">
        <button onClick={() => handleClickFavorite(valor.id)}>
          <MdFavorite className="sm:text-5xl text-2xl text-red-700 hover:text-gray-500" />
        </button>
      </div>


    </div>
);
}

export default FavCard;


























// import { useDispatch } from "react-redux";
// import noImageIcon from "../../assets/NoImageIcon.png";
// import { MdFavorite } from "react-icons/md";
// import { deleteFavorites } from "../../actions/actions";

// function FavCard(props) {
//   const dispatch = useDispatch();

//   const handleClickFavorite = (data) => {
//     dispatch(deleteFavorites(data));
//   };

//   let valor = props.item;
//   let urlImage = "";
//   const urlImageGeneral = import.meta.env.VITE_APP_URL_IMAGES;

//   if (valor.poster_path != null && valor.poster_path != undefined) {
//     urlImage = `${urlImageGeneral}${valor.poster_path}`;
//   } else if (valor.profile_path) {
//     urlImage = `${urlImageGeneral}${valor.profile_path}`;
//   } else urlImage = noImageIcon;

//   return (
//     <div className="rounded-xl flex flex-row w-4/6  mt-5 mb-5 mx-auto shadow-black shadow-lg">
//       <div className="rounded-l-xl w-2/6 flex flex-col  justify-center items-center bg-white">
//         {urlImage != null && (
//           <img
//             className="w-auto h-auto   border-2 border-black my-5"
//             src={urlImage}
//           ></img>
//         )}
//       </div>
//       <div className="w-3/6 flex flex-col bg-white">
//         <h1 className="w-3/4 bg-white font-header font-medium text-base text-black mt-5">
//           {valor.original_title}
//         </h1>
//         <h1 className="w-3/4 font-header font-light text-sm text-black mb-5">
//           {valor.release_date != undefined && valor.release_date != ""
//             ? valor.release_date.slice(0, 4)
//             : "Unknown"}
//         </h1>
//         <span className="w-3/4 bg-white mb-5">{valor.overview}</span>
//       </div>
//       <div className="rounded-r-xl flex flex-col w-1/6 text-white bg-green-700 bg-opacity-50 justify-center items-center">
//         <button onClick={() => handleClickFavorite(valor.id)}>
//           <MdFavorite className="text-5xl text-red-700 hover:text-gray-500" />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default FavCard;
