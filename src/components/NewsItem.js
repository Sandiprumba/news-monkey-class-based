import React from "react";

class NewsItem extends React.Component {
  render() {
    let { author, title, description, image, newsUrl } = this.props;
    return (
      <div>
        <div className="card">
          <img
            src={
              !image
                ? "https://static.vecteezy.com/system/resources/thumbnails/002/247/315/small/grim-reaper-death-angel-holding-a-dagger-vector.jpg"
                : image
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <p className="card-title">{author}</p>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} target="black" className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default NewsItem;
