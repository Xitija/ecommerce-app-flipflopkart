import Carousel from "nuka-carousel";
import { Categories } from "../../components/Categories/Categories";

import "./Landing.css";

import {
  flipflop_banner,
  flipflop_banner2,
  flipflop_banner3,
} from "../../assets/pictures";

export const Landing = () => {
  return (
    <div>
      <div className="slider">
        <Carousel
          autoplay
          pauseOnHover
          wrapAround
          adaptiveHeight={true}
          cellAlign={"center"}
        >
          <img
            src={flipflop_banner2}
            alt="flipflop_banner"
            className="banner"
          />
          <img
            src={flipflop_banner3}
            alt="flipflop_banner2"
            className="banner"
          />
          <img
            src={flipflop_banner}
            alt="flipflop_banner3"
            className="banner"
          />
        </Carousel>
      </div>
      <Categories />
    </div>
  );
};
