import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import noImageIcon from "../../assets/NoImageIcon.png";
import {
  getMovieCredits,
  getMovieTrailers,
  addFavorite,
  deleteFavorites,
  updateFavoriteRecordNumbers,
  sendEmail,
  updateEmailError,
} from "../../actions/actions";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { SlExclamation } from "react-icons/sl";
import { ImShare2 } from "react-icons/im";
import Modal from "../Modal/Modal";
import ModalEmail from "../ModalEmail/ModalEmail";

function MovieOverview() {
  const dispatch = useDispatch();

  let { videoId } = useParams();
  const searchResult = useSelector((state) => state.searchResult);
  const movieCast = useSelector((state) => state.movieCast);
  const movieCrew = useSelector((state) => state.movieCrew);
  const movieTrailer = useSelector((state) => state.movieTrailer);
  let favoriteList = useSelector((state) => state.favoriteList);
  let emailError = useSelector((state) => state.emailError);

  const [modalOn, setModalOn] = useState(false);

  useEffect(() => {
    if (emailError == "Ok") {
      setModalOn(false);
      dispatch(updateEmailError(""));
    }
    if (emailError == "Error") {
      setModalOn(false);
    }
  }, [emailError]);

  useEffect(() => {
    dispatch(getMovieCredits(videoId));
    dispatch(getMovieTrailers(videoId));
  }, []);

  let isFavorite = favoriteList.filter((item) => item.id == videoId);

  let actualMovie = "";
  actualMovie = searchResult.filter((item) => item.id == videoId);
  const moviesCategory = useSelector((state) => state.moviesCategory);

  let urlImage = "";
  const urlImageGeneral = import.meta.env.VITE_APP_URL_IMAGES;

  if (
    actualMovie[0].poster_path != null &&
    actualMovie[0].poster_path != undefined
  ) {
    urlImage = `${urlImageGeneral}${actualMovie[0].poster_path}`;
  } else if (actualMovie[0].profile_path) {
    urlImage = `${urlImageGeneral}${actualMovie[0].profile_path}`;
  } else urlImage = noImageIcon;

  let categoriesName = [];
  if (actualMovie !== "") {
    actualMovie[0].genre_ids.forEach((element) => {
      let nombre = moviesCategory.filter((item) => item.id == element);
      categoriesName.push(nombre[0].name);
    });
  }

  const directorArray = [];
  movieCrew.forEach((item) => {
    if (item.job == "Director") directorArray.push(item.original_name);
  });
  const processedDirectorArray = [];
  for (let x = 0; x < directorArray.length; x++) {
    if (x !== directorArray.length - 1)
      processedDirectorArray.push(`${directorArray[x]}, `);
    else processedDirectorArray.push(`${directorArray[x]}.`);
  }

  const producerArray = [];
  movieCrew.forEach((item) => {
    if (item.job == "Producer") producerArray.push(item.original_name);
  });
  const processedProducerArray = [];
  for (let x = 0; x < producerArray.length; x++) {
    if (x !== producerArray.length - 1)
      processedProducerArray.push(`${producerArray[x]}, `);
    else processedProducerArray.push(`${producerArray[x]}.`);
  }

  const castArray = [];
  movieCast.forEach((item) => {
    if (item.order < 10) castArray.push(item.name);
  });
  const processedCastArray = [];
  for (let x = 0; x < castArray.length; x++) {
    if (x !== castArray.length - 1)
      processedCastArray.push(`${castArray[x]}, `);
    else processedCastArray.push(`${castArray[x]}.`);
  }

  const trailerArray = [];
  movieTrailer.forEach((item) => {
    if (
      item.type == "Trailer" ||
      (item.type == "Clip" && item.site == "YouTube")
    ) {
      trailerArray.push(item.key);
    }
  });

  const handleClickFavorite = () => {
    if (isFavorite.length < 1) {
      dispatch(addFavorite(actualMovie[0]));
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
      dispatch(deleteFavorites(actualMovie[0].id));
      let length = favoriteList.length - 1;
      let lastPage = Math.ceil(length / 20);
      dispatch(
        updateFavoriteRecordNumbers({
          favTotals_results: length,
          favTotals_page: lastPage,
        })
      );
    }
  };

  return (
    <div className="w-full h-auto ">
      <div className="rounded-xl flex flex-row w-auto sm:w-4/6 bg-white mt-5 mb-5 mx-1 sm:mx-auto shadow-black shadow-lg">
        <div className="ml-1 sm:ml-2 w-2/6 h-auto">
          {urlImage != null && (
            <img
              className="w-full h-auto  border-2 border-black my-5"
              src={urlImage}
            ></img>
          )}

          <div className="w-full flex flex-row flex-wrap mb-10">
            {isFavorite.length < 1 && (
              <button
                className="w-full h-10 mb-2 border-2 shadow-lg shadow-gray-500  bg-white hover:bg-gray-200  rounded-sm"
                onClick={handleClickFavorite}
              >
                <MdFavoriteBorder className="w-full h-10 mb-2 text-white border-gray-400 shadow-lg shadow-gray-500 bg-gray-300 hover:bg-gray-200 hover:text-gray-400" />
              </button>
            )}
            {isFavorite.length > 0 && (
              <button
                className="w-full h-10 mb-2 border-2 shadow-lg shadow-gray-500  bg-white hover:bg-gray-200  rounded-sm"
                onClick={handleClickFavorite}
              >
                <MdFavorite className="w-full h-10 mb-2 text-red-700 border-gray-400 shadow-lg shadow-gray-500 bg-gray-300 hover:bg-gray-200 hover:text-gray-400" />
              </button>
            )}
            <button className="w-full h-10 mb-2 border-2 shadow-lg shadow-gray-500  bg-white hover:bg-gray-200 rounded-sm">
              <ImShare2
                className="w-full h-10 text-white  border-gray-400 shadow-lg shadow-gray-500  bg-gray-300 hover:bg-gray-200 hover:text-gray-400 py-1"
                onClick={() => setModalOn(true)}
              />
            </button>
          </div>
        </div>

        <div className="w-4/6 bg-white mx-4 ">
          <h1 className="w-full bg-white font-header font-medium text-lg text-black mt-5">
            {actualMovie[0].original_title}
          </h1>
          <h2 className="w-full font-header font-light text-sm text-black mb-5">
            {actualMovie[0].release_date &&
              actualMovie[0] !== "" &&
              actualMovie[0].release_date.slice(0, 4)}
          </h2>

          <h2 className="flex flex-row flex-wrap justify-left mt-4 mb-4">
            {categoriesName != [] &&
              categoriesName.map((x) => (
                <span
                  key={x}
                  className="rounded-2xl border border-gray-300 px-4 py-2 mr-4"
                >
                  {x}
                </span>
              ))}
          </h2>

          <h1 className="w-full bg-white font-header font-medium text-sm text-black mt-5">
            Overview
          </h1>
          <span>{actualMovie[0].overview}</span>

          <h1 className="w-full bg-white font-header font-medium text-sm text-black mt-5">
            Crew
          </h1>
          <div>
            <span>{processedDirectorArray}</span>
            <span className="w-24 rounded-lg inline-block ml-4 bg-gray-300 text-white text-center">
              {processedDirectorArray.length > 1 ? " Directors" : " Director"}
            </span>
          </div>

          <div>
            <span>{processedProducerArray}</span>
            <span className="w-24 rounded-lg inline-block ml-4 bg-gray-300 text-white text-center">
              <span className="align-top">
                {processedProducerArray.length > 1 ? " Producers" : " Producer"}
              </span>
            </span>
          </div>

          <h1 className="w-full bg-white font-header font-medium text-sm text-black mt-5">
            Cast
          </h1>

          <div>
            <span>{processedCastArray}</span>
          </div>

          <div className="mt-10 mb-10 w-full flex flex-row flex-wrap">
            {trailerArray.map((item) => (
              <div
                key={item}
                className="w-auto sm:w-1/3 h-auto border border-gray-400 px-1 py-1 shadow-lg shadow-gray-400"
              >
                <ReactPlayer
                  wrapper="div"
                  width="100%"
                  height="100%"
                  url={`https://youtube.com/watch?v=${item}`}
                ></ReactPlayer>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modalOn && (
        <Modal>
          <ModalEmail
            setModalOn={setModalOn}
            actualMovie={actualMovie}
            urlImage={urlImage}
          />
        </Modal>
      )}

      {emailError == "Error" && (
        <Modal>
          <div className="flex flex-row w-full h-screen bg-opacity-50 fixed top-0 left-0  bg-black justify-center items-center">
            {" "}
            <div className="flex flex-row flex-wrap rounded-2xl w-1/3 h-auto bg-white bg-opacity-60 shadow-xl shadow-black justify-center">
              <SlExclamation className="mt-10 text-6xl  text-red-700" />
              <h1 className="w-full mt-4 text-center mb-10 font-Roboto text-black text-xl">
                Error sending eMail...
              </h1>
              <button
                className="w-1/3 h-2/3 border-2 rounded-2xl hover:bg-gray-400 hover:border-gray-400  border-black mx-auto mt-5 bg-black text-white shadow-md shadow-black mb-10"
                onClick={() => dispatch(updateEmailError(""))}
              >
                Ok
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default MovieOverview;
