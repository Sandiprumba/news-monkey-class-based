import React from "react";
import loading from "./loading.gif";

class Spinner extends React.Component {
  render() {
    return (
      <div className="text-center">
        <img className="my-3" src={loading} alt="loading" />
      </div>
    );
  }
}
export default Spinner;
