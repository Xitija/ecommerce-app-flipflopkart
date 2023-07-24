import { Oval } from "react-loader-spinner";
import "./Loader.css";

export const Loader = () => {
  return (
    <Oval
      height={80}
      width={80}
      color="#fc800b"
      wrapperClass="loader-wrapper"
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#1bd0a0"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};
