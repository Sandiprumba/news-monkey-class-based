import React from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

class News extends React.Component {
  constructor() {
    super();

    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  // componentDidMount() {
  //   let url =
  //     "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=70f9336095254d378716c0a3edfe912d";
  //   fetch(url)
  //     .then((response) => {
  //       return response.json;
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.log("error fetching data:", error);
  //     });
  // }
  // fetch api using  ..put await for asyncronous funciton

  //fetch the data using asyncronous function ..and the pageSize defines how many numbers of news to be displayed in one page
  async componentDidMount() {
    console.log("component did mount running");
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=70f9336095254d378716c0a3edfe912d&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
  }
  catch(error) {
    console.log("error fetching data:", error);
  }

  handleNextClick = async () => {
    console.log("next button clicked");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 14))) {
      return console.log(this.state.totalResults);
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=70f9336095254d378716c0a3edfe912d&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
    }
  };
  handlePrevClick = async () => {
    console.log("prev button clicked");
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=70f9336095254d378716c0a3edfe912d&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  render() {
    console.log("render");
    return (
      <div className="container my-3">
        <h1 className="text-center">News Monkey - Top Headlines</h1>
        {/* //if the content or loading is true then spinner should run */}
        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    author={element.author}
                    title={element.title ? element.title.slice(0, 15) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    image={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={() => {
              this.handlePrevClick();
            }}
          >
            &larr; prev
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={() => {
              this.handleNextClick();
            }}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;