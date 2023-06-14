import Carousel from "nuka-carousel";

import "./Landing.css";
import {
  flipflop_banner,
  flipflop_banner2,
  flipflop_banner3,
} from "../../assets/pictures";

export const Landing = () => {
  return (
    <div className="slider">
      <Carousel
        autoplay
        pauseOnHover
        wrapAround
        adaptiveHeight={true}
        cellAlign={"center"}
      >
        <img src={flipflop_banner2} className="banner" />
        <img src={flipflop_banner3} className="banner" />
        <img src={flipflop_banner} className="banner" />
      </Carousel>
    </div>
  );
};
