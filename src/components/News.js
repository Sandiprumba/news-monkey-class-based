import React from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
//create static data
import PropTypes from "prop-types";
//react infinit scroll
import InfiniteScroll from "react-infinite-scroll-component";

class News extends React.Component {
  //pass the default props like this or we can pass from app.js as well
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  //change to upper case and pass it as a state to document.title
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    //in order to display title on top of the react development browser
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }
  // componentDidMount() {
  //   let url =
  //     "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.props.apiKey";
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

  //lets create a async update news function in order to refactor the code
  // async updateNews() {
  //   //top bar passed as a props
  //   this.props.setProgress(10);
  //   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   this.props.setProgress(30);
  //   let parsedData = await data.json();
  //   console.log(parsedData);
  //   this.props.setProgress(70);
  //   this.setState({
  //     articles: parsedData.articles,
  //     totalResults: parsedData.totalResults,
  //     loading: false,
  //   });
  //   this.props.setProgress(100);
  // }

  //new api
  async updateNews() {
    //top bar passed as a props
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    console.log(parsedData);
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalArticles: parsedData.totalResults,
    //   loading: false,
    // });
    this.updateNews();
  }

  handleNextClick = async () => {
    // console.log("next button clicked");
    // if (
    //   this.state.page + 1 <=
    //   Math.ceil(this.state.totalResults / this.props.pageSize)
    // ) {
    //   return console.log(this.state.totalResults);
    // } else {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     this.props.country
    //   }&category=${
    //     this.props.category
    //   }&apiKey=apiKey=${this.props.apiKey}&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  handlePrevClick = async () => {
    // console.log("prev button clicked");
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=apiKey=${this.props.apiKey}&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  //fetch more function after this we dont need next and prev button
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      //concatinate the data here inorder for the scroll to work
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          News Monkey - Top {this.capitalizeFirstLetter(this.props.category)}
        </h1>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {!this.state.loading &&
                this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title : ""}
                        description={
                          element.description ? element.description : ""
                        }
                        image={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;

//changes of the infinite scroll bar problems
// render() {
//     return (
//       <div className="container my-3">
//         <h1 className="text-center" style={{ margin: "35px 0px" }}>
//           News Monkey - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
//           Headlines
//         </h1>
//         {/* //if the content or loading is true then spinner should run */}
//         {/* {this.state.loading && <Spinner />} */}

//         <InfiniteScroll
//           dataLength={this.state.articles.length}
//           next={this.fetchMoreData}
//           hasMore={this.state.articles.length !== this.state.totalResults}
//           loader={<Spinner />}
//         >
//           <div className="row">
//             {!this.state.loading &&
//               this.state.articles.map((element) => {
//                 return (
//                   <div className="col-md-4" key={element.url}>
//                     <NewsItem
//                       title={element.title ? element.title : ""}
//                       description={
//                         element.description ? element.description : ""
//                       }
//                       image={element.urlToImage}
//                       newsUrl={element.url}
//                       author={element.author}
//                       date={element.publishedAt}
//                       source={element.source.name}
//                     />
//                   </div>
//                 );
//               })}
//           </div>
//         </InfiniteScroll>
//         <div className="container d-flex justify-content-between">
//           <button
//             disabled={this.state.page <= 1}
//             type="button"
//             className="btn btn-dark"
//             onClick={() => {
//               this.handlePrevClick();
//             }}
//           >
//             &larr; prev
//           </button>
//           <button
//             disabled={
//               this.state.page + 1 >
//               Math.ceil(this.state.totalResults / this.props.pageSize)
//             }
//             type="button"
//             className="btn btn-dark"
//             onClick={() => {
//               this.handleNextClick();
//             }}
//           >
//             Next &rarr;
//           </button>
//         </div>
//       </div>
//     );
//   }
// }
