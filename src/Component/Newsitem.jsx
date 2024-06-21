import React, { Component } from 'react'

export class Newsitem extends Component {
   
  render() {
   let {title, description, imageUrl, newsUrl, author, date} = this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
  <img src={imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}<span className='badge bg-secondary'>New</span></h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small class="text-muted" >By {author} on {date}</small></p>
    <a rel="noreferrer" href={newsUrl} target="_blank"className="btn btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitem
