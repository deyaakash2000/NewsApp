import React, { Component } from 'react'
export class NewsItems extends Component {
  render() {
    let {title,description,image,Newsurl,time,author,badge} = this.props // destructring in js==> props is an obj and by through this object can access title , description
    return (
    <div>
      
        <div className="card" >
            <img src={!image?"https://images.livemint.com/img/2022/08/02/600x338/httpsblankpaperhtdigitalincms-backend-service-mtim_1659400703073_1659400703190_1659400703190.jpg":image} className="card-img-top" alt="..."/>
            <div className="card-body">
            <span class="badge bg-success">{badge}</span>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">Last updated {new Date(time).toGMTString()} and author {!author?"Unknown":author} </small></p>
            <a href={Newsurl}  className="btn btn-sm btn-primary">Read more</a>
        </div>
      </div>
    </div>
  
    )
  }
}
export default NewsItems

// rce - means 'react-class-based' component when we use component inside the class then use  'react-class-based' (rce)
//rcc -  means react-class component when we use component inside the class then use  'react-class-based' (rce)