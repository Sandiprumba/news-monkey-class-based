import "./App.css";
import React from "react";
import News from "./components/News";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

class App extends React.Component {
  //refactor the page
  pageSize = 15;
  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <News
                  pageSize={this.pageSize}
                  country="us"
                  category="general"
                />
              }
            />

            <Route
              exact
              path="/business"
              element={
                <News
                  key="business"
                  pageSize={this.pageSize}
                  country="us"
                  category="business"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  key="entertainment"
                  pageSize={this.pageSize}
                  country="us"
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/general"
              element={
                <News
                  key="general"
                  pageSize={this.pageSize}
                  country="us"
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  key="health"
                  pageSize={this.pageSize}
                  country="us"
                  category="health"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  key="science"
                  pageSize={this.pageSize}
                  country="us"
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  key="sports"
                  pageSize={this.pageSize}
                  country="us"
                  category="sports"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News
                  key="technology"
                  pageSize={this.pageSize}
                  country="us"
                  category="technology"
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}
export default App;
