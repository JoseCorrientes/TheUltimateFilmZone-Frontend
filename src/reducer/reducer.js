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
} from "../actions/actionNames";

const initialState = {
  searchResult: [], //resultados de la busqueda traidos para esta pagina(20resultados)
  searchPage: 1, //pagina de resultados actual recuperada
  searchTotal_pages: 1, //Total de paginas de resultados que devuelve la busqueda
  searchTotal_results: 0,
  searchError: "", //Total de resultados encontrados para la busqueda busqueda en mainwindow
  seeSearchBTN: true, //ver el boton de search en el header
  searchString: "", //cadena que se pone al buscar una pelicula o serie
  favoriteList: [], //Lista de favoritos que se trae primero de mongo
  loadingState: false, //dice que se esta cargando los datos
  loadingStateFav: false, //dice que se estan cargando los datos de Favorites
  favPage: 1, //pagina de favorita en la que se esta en multipagina
  favTotals_results: 0, //cantidad de favoritos
  favTotals_pages: 1, //cantidad de paginas de favoritos (20xpagina)

  favOrderBy: "", //Ordenamiento de favoritos en memoria por title(1), year(2)
  favOrderType: "", //Ordenamiento de favoritos en memoria ascendente(1), descendente(2)
  moviesCategory: [], //Categorias para las peliculas
  movieCast: [], //reparto de una pelicula en el overview
  movieCrew: [], //Productor, director etc de una pelicula en el overview
  movieTrailer: [], //trailers de la pelicula
  emailError: "", //Estado al enviar el email de sugerencia de pelicula
  creditsOn: false, //para mostrar los creditos en pantalla al activar boton credits
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CREDITS_ON: {
      return {
        ...state,
        creditsOn: !state.creditsOn,
      };
    }

    case UPDATE_EMAIL_ERROR: {
      return {
        ...state,
        emailError: action.payload,
      };
    }

    case SEND_EMAIL: {
      return {
        ...state,
        emailError: action.payload,
      };
    }

    case GET_MOVIE_TRAILERS: {
      return {
        ...state,
        movieTrailer: action.payload,
      };
    }

    case GET_MOVIECREDITS: {
      return {
        ...state,
        movieCrew: action.payload.crew,
        movieCast: action.payload.cast,
      };
    }

    case GET_MOVIESCATEGORIES: {
      return {
        ...state,
        moviesCategory: action.payload.data,
      };
    }

    case UPDATE_FAVORITEPAGE: {
      return {
        ...state,
        favPage: action.payload,
      };
    }

    case UPDATA_FAVORITERECORDNUMBERS: {
      return {
        ...state,
        favTotals_results: action.payload.favTotals_results,
        favTotals_pages: action.payload.favTotals_page,
      };
    }

    case UPDATE_FAVORITELIST: {
      return {
        ...state,
        favoriteList: action.payload,
      };
    }

    case UPDATE_FAVORITESORDER: {
      if (action.payload.orderBy == "")
        return {
          ...state,
          favOrderType: parseInt(action.payload.orderType),
        };
      if (action.payload.orderType == "")
        return {
          ...state,
          favOrderBy: parseInt(action.payload.orderBy),
        };
      return {
        ...state,
        favOrderBy: parseInt(action.payload.orderBy),
        favOrderType: parseInt(action.payload.orderType),
      };
    }

    case DELETE_FAVORITES: {
      let id = action.payload;
      let copyList = [...state.favoriteList];
      let result = copyList.filter((item) => item.id !== id);
      return {
        ...state,
        favoriteList: result,
      };
    }

    case ADD_FAVORITES: {
      let newData = action.payload;
      let result = [];

      let oldFav = [...state.favoriteList];
      if (oldFav.length > 0) {
        result = oldFav.filter((item) => item.id == newData.id);
      }
      if (result.length < 1) {
        return {
          ...state,
          favoriteList: [...state.favoriteList, newData],
          favTotals_results: state.favTotals_results + 1,
        };
      }

      return {
        ...state,
      };
    }

    case GET_FAVORITES: {
      return {
        ...state,
        favoriteList: action.payload,
      };
    }

    case UPDATE_LOADINGSTATEFAV: {
      return {
        ...state,
        loadingStateFav: action.payload,
      };
    }

    case UPDATE_LOADINGSTATE: {
      return {
        ...state,
        loadingState: action.payload,
      };
    }

    case UPDATE_SEESEARCHBTN: {
      return {
        ...state,
        seeSearchBTN: action.payload,
      };
    }

    case UPDATE_SEARCHPAGE: {
      return {
        ...state,
        searchPage: action.payload,
      };
    }

    case UPDATE_SEARCHSTRING: {
      return {
        ...state,
        searchString: action.payload,
      };
    }

    case GET_SEARCH: {
      return {
        ...state,
        searchResult: action.payload.results,
        searchTotal_pages: action.payload.total_pages,
        searchTotal_results: action.payload.total_results,
      };
    }

    case SET_SEARCHERROR: {
      return {
        ...state,
        searchResult: [],
        searchPage: 1,
        searchTotal_pages: 0,
        searchTotal_results: 0,
        searchError: action.payload,
      };
    }

    default:
      return { ...state };
  }
}

export default rootReducer;
