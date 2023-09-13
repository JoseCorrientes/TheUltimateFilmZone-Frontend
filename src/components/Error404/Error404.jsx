import { Player } from "@lottiefiles/react-lottie-player";
import NotFound from "../../assets/animation_lm86i5zp.json";

function Error404() {
  return (
    <div className="w-full h-screen">
      <Player
        className="player pt-20 h-auto w-1/3"
        src={NotFound}
        autoplay
        loop
        speed={1}
      />
    </div>
  );
}

export default Error404;
