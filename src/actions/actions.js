import {
  GET_SEARCH,
  SET_SEARCHERROR,
  UPDATE_SEARCHSTRING,
  UPDATE_SEARCHPAGE,
  UPDATE_SEESEARCHBTN,
  UPDATE_LOADINGSTATE,
  UPDATE_LOADINGSTATEFAV,
  GET_FAVORITES,
  ADD_FAVORITES,
  DELETE_FAVORITES,
  UPDATE_FAVORITESORDER,
  UPDATE_FAVORITELIST,
  UPDATA_FAVORITERECORDNUMBERS,
  UPDATE_FAVORITEPAGE,
  GET_MOVIESCATEGORIES,
  GET_MOVIECREDITS,
  GET_MOVIE_TRAILERS,
  SEND_EMAIL,
  UPDATE_EMAIL_ERROR,
  UPDATE_CREDITS_ON,
} from "./actionNames";
import axios from "axios";

const VITE_APP_API = import.meta.env.VITE_APP_API;
let host = VITE_APP_API || "http://localhost:3001/";

export function toggleCreditsOn(data) {
  return function (dispath) {
    return dispath({
      type: UPDATE_CREDITS_ON,
      payload: data,
    });
  };
}

export function updateEmailError(data) {
  return function (dispatch) {
    return dispatch({
      type: UPDATE_EMAIL_ERROR,
      payload: data,
    });
  };
}

export function sendEmail(data) {
  return async function (dispatch) {
    let options = {
      method: "POST",
      url: `${host}email`,
      data: {
        info: data.data,
        urlImage: data.urlImage,
        email: data.email,
        message: data.message,
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log("actions data que vuelve: ");
        console.log(response);

        return dispatch({
          type: SEND_EMAIL,
          payload: response.data.status,
        });
      })
      .catch((error) => {
        return dispatch({
          type: SEND_EMAIL,
          payload: "Error",
        });
      });
  };
}

export function getMovieTrailers(movieId) {
  return function (dispatch) {
    const options = {
      method: "GET",
      url: `${host}search/trailer`,
      params: {
        movieId: movieId,
      },
    };

    axios
      .request(options)
      .then((resolve) => {
        return dispatch({
          type: GET_MOVIE_TRAILERS,
          payload: resolve.data.data,
        });
      })
      .catch((error) => {
        return dispatch({
          type: GET_MOVIE_TRAILERS,
          payload: [],
        });
      });
  };
}

export function getMovieCredits(movieId) {
  return async function (dispatch) {
    const options = {
      method: "GET",
      url: `${host}search/cast`,
      params: {
        movieId: movieId,
      },
    };

    axios
      .request(options)
      .then((resolve) => {
        console.log(resolve);
        return dispatch({
          type: GET_MOVIECREDITS,
          payload: resolve.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getMoviesCategories() {
  return async function (dispatch) {
    try {
      const options = {
        mothed: "GET",
        url: `${host}category/movies`,
      };
      axios
        .request(options)
        .then((resolve) => {
          return dispatch({
            type: GET_MOVIESCATEGORIES,
            payload: resolve.data,
          });
        })
        .catch((error) => {
          console.log("Error al recuperar las categorias para Movies");
          return dispatch({
            type: GET_MOVIESCATEGORIES,
            payload: [],
          });
        });
    } catch (e) {
      console.log("Error recuperando las categorias para las movies");
    }
  };
}

export function updateFavoritePage(data) {
  return function (dispatch) {
    return dispatch({
      type: UPDATE_FAVORITEPAGE,
      payload: data,
    });
  };
}

export function updateFavoriteRecordNumbers(data) {
  return function (dispatch) {
    return dispatch({
      type: UPDATA_FAVORITERECORDNUMBERS,
      payload: data,
    });
  };
}

export function updateFavoriteList(data) {
  return function (dispatch) {
    try {
      return dispatch({
        type: UPDATE_FAVORITELIST,
        payload: data,
      });
    } catch (e) {
      console.log("Error actualizando todo el arreglo de FavoriteList");
    }
  };
}

export function updateFavoritesOrder(orderBy, orderType) {
  return function (dispatch) {
    try {
      return dispatch({
        type: UPDATE_FAVORITESORDER,
        payload: {
          orderBy,
          orderType,
        },
      });
    } catch (e) {
      console.log("Error ordenando los favoritos en memoria");
    }
  };
}

export function deleteFavorites(data) {
  return async function (dispatch) {
    try {
      let options = {
        method: "DELETE",
        url: `${host}favorites`,
        params: { id: data },
      };

      axios
        .request(options)
        .then((resolve) => {
          console.log("se envio el delete y tuvo exito");
        })
        .catch((error) => {
          console.log("Se envio el delete y hubo error");
        });

      return dispatch({
        type: DELETE_FAVORITES,
        payload: data,
      });
    } catch (e) {
      console.log("Error tratando de desmarcar un favorito");
    }
  };
}

export function getFavorites() {
  return function (dispatch) {
    let options = {
      method: "GET",
      url: `${host}favorites`,
    };

    axios
      .request(options)
      .then((resolve) => {
        return dispatch({
          type: GET_FAVORITES,
          payload: resolve.data.founded,
        });
      })
      .catch((error) => {
        console.log(error);
        return dispatch({
          type: GET_FAVORITES,
          payload: [],
        });
      });
  };
}

export function addFavorite(data) {
  return function (dispatch) {
    try {
      const options = {
        method: "POST",
        url: `${host}favorites`,
        data: data,
      };

      axios
        .request(options)
        .then(function (response) {})
        .catch(function (error) {});

      return dispatch({
        type: ADD_FAVORITES,
        payload: data,
      });
    } catch (e) {
      console.log("Error agregando favorito al arreglo de favoritos");
    }
  };
}

export function updateLoadingStateFav(data) {
  return function (dispatch) {
    try {
      return dispatch({
        type: UPDATE_LOADINGSTATEFAV,
        payload: data,
      });
    } catch (e) {
      console.log("Error cambiando el estado de loadingStateFav");
    }
  };
}

export function updateLoadingState(data) {
  return function (dispatch) {
    try {
      return dispatch({
        type: UPDATE_LOADINGSTATE,
        payload: data,
      });
    } catch (e) {
      console.log("Error cambiando el estado globar loadingState");
    }
  };
}

export function updateSeeSearchBTN(data) {
  return function (dispatch) {
    try {
      return dispatch({
        type: UPDATE_SEESEARCHBTN,
        payload: data,
      });
    } catch (e) {
      console.log("Error actualizando el estado globarl seeSearchBTN");
    }
  };
}

export function updateSearchPage(value) {
  return function (dispatch) {
    try {
      return dispatch({
        type: UPDATE_SEARCHPAGE,
        payload: value,
      });
    } catch (e) {
      console.log(
        "Error actualizando el numero de pagina actual en el searchList"
      );
    }
  };
}

export function updateSearchString(data) {
  return function (dispatch) {
    try {
      return dispatch({
        type: UPDATE_SEARCHSTRING,
        payload: data,
      });
    } catch (e) {
      console.log("Error al guardar el estado global SearchString");
    }
  };
}

export function getSearch(data, page) {
  return async function (dispatch) {
    const options = {
      method: "GET",
      url: `${host}search`,
      params: {
        searchString: data,
        page: page,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        if (response.data.status == "Ok") {
          let copyArray = [...response.data.data.results];
          for (let x = 0; x < copyArray.length; x++) {
            copyArray[x]["favorite"] = false;
          }

          let data = {
            results: copyArray,
            total_pages: response.data.data.total_pages,
            total_results: response.data.data.total_results,
          };

          return dispatch({
            type: GET_SEARCH,
            payload: data,
          });
        }
      })
      .catch(function (error) {
        return dispatch({
          type: SET_SEARCHERROR,
          payload: error.message,
        });
      });
  };
}
