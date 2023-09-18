import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Favorites from "./components/Favorites/Favorites";
import LandingPage from "./components/LandingPage/LandingPage";
import SearchList from "./components/SearchList/SearchList";
import MovieOverview from "./components/movieOverview/MovieOverview";
import Error404 from "./components/Error404/Error404";
import { useDispatch, useSelector } from "react-redux";
import { toggleCreditsOn } from "./actions/actions";
import Credits from "../src/components/Credits/Credits.jsx";

function App() {
  let creditsOn = useSelector((state) => state.creditsOn);

  const dispatch = useDispatch();
  const handleToggleCreditsOn = () => {
    dispatch(toggleCreditsOn());
  };
  return (
    <BrowserRouter>
      <div className="box-border w-full h-full bg-gray-300">
        <div>
          <Header />
          <Routes>
            <Route path="/search" element={<SearchList />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:videoId" element={<MovieOverview />} />
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="*" element={<Error404 />} />
          </Routes>
          {creditsOn && <Credits />}

          <Footer handleToggleCreditsOn={handleToggleCreditsOn} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
