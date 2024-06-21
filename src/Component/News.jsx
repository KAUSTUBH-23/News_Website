import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Newsitem from './Newsitem';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props) {
    super(props);
    console.log("Hello I am a constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.props.category}- NewsWallah`;
  }

  async componentDidMount() {
    this.props.setProgress(10);
    const { country, pageSize } = this.props;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${this.props.category}&apiKey=404e3b6cbe1547d99a166ab62ca5941f&page=1&pageSize=${pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults });
    this.props.setProgress(100);
  }
  

  handlePrevClick = async () => {
    const { country, pageSize } = this.props;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${this.props.category}&apiKey=404e3b6cbe1547d99a166ab62ca5941f&page=${this.state.page - 1}&pageSize=${pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  }

  handleNextClick = async () => {
    const { country, pageSize } = this.props;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${this.props.category}&apiKey=404e3b6cbe1547d99a166ab62ca5941f&page=${this.state.page + 1}&pageSize=${pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
    });
  }

  fetchMoreData = async () => {
    const { country, pageSize } = this.props;
    const nextPage = this.state.page + 1;

    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${this.props.category}&apiKey=404e3b6cbe1547d99a166ab62ca5941f&page=${nextPage}&pageSize=${pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();

      // Append the new articles to the existing ones
      this.setState({
        page: nextPage,
        articles: [...this.state.articles, ...parsedData.articles],
      });
    } catch (error) {
      console.error('Error fetching more data:', error);
    }
  };

  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center'> NeighborGood {this.props.category} News  </h2>
        <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length !== this.state.totalResults} loader={<h4>Loading...</h4>}>
          <div className="row">
            {this.state.articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page * this.props.pageSize >= this.state.totalResults} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
