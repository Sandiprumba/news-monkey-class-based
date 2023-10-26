import "./App.css";
import React from "react";
import News from "./components/News";
import Navbar from "./components/Navbar";

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <News pageSize={5} />
      </div>
    );
  }
}
export default App;
