import wallImage from "../../assets/auditorio.png";
import { getFavorites, getMoviesCategories } from "../../actions/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavorites());
    dispatch(getMoviesCategories());
  }, []);

  return (
    <div className="relative w-full h-screen bg-black bg-cover">
      <img className="h-full w-full bg-cover" src={wallImage} alt="carga" />
      <h1 className="absolute font-Gochi text-6xl text-white top-1/4 left-10 z-20 ">
        The Ultimate Movie App
      </h1>
      <h1 className="absolute font-Gochi text-6xl text-blue-900 top-1/4 left-10 shadow-gray-200 blur-lg   drop-shadow-lg z-10">
        The Ultimate Movie App
      </h1>
    </div>
  );
}

export default LandingPage;
