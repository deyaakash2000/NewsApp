import React, { Component } from 'react'
import NewsItems from './NewsItems';
import Spinner from './Spinner'
import PropTypes from 'prop-types';
export default class news extends Component {
  static defaultProps = {
    country:'in',
    pageSize :8,
   
  }
  static propTypes = {
    pageSize :PropTypes.number,
    country :PropTypes.string,
    category :PropTypes.string,

  }
    artical=   [
          
      ]
    constructor(){
        super();
        this.state ={
            articals:this.artical,
            page : 1,
            loadier :false

        }
      }
    
    async componentDidMount(){
      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d3e1467945684411810c0cb143605a56&page=1&pageSize=${this.props.pageSize}`
      this.setState({loadier:true})
      let data=await fetch(url)
      let parseData = await data.json()
      this.setState({
        articals : parseData.articles,
        totalArtical:parseData.totalResults,
        loadier :false
      })
    }
    handlePre= async()=>{
      
      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d3e1467945684411810c0cb143605a56&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      this.setState({loadier:true})
      let data=await fetch(url)
      let parseData = await data.json()
      this.setState({
        page: this.state.page -1,
        articals : parseData.articles,
        loadier :false
  
      })
    }
    handleNext=async ()=>{

      if (this.state.page+1 > Math.ceil(this.state.totalArtical/this.props.pageSize)) {

      }else{
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d3e1467945684411810c0cb143605a56&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loadier:true})
        let data=await fetch(url)
        let parseData = await data.json()
        this.setState({
            page: this.state.page +1,
            articals : parseData.articles,
            loadier:false
          })

      } 
    } 
  render() {
    return (
      <div>
        <div className="container my-5" >
          <h1>All avaiable news</h1>
            <div className="row">
            {this.state.loadier && <Spinner/>}
            {!this.state.loadier && this.state.articals.map((element)=>{
              return  <div className="col-md-3 my-4" key={element.url?element.url:''}>
                  <NewsItems title={element.title?element.title:""} description={element.description?element.description:""} image={element.urlToImage}  Newsurl={element.url} author={element.author} time={element.publishedAt} badge={element.source.name}/>
            </div>   
            })}
              
          </div>
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePre} >  previus </button>
        <button  disabled={this.state.page+1>Math.ceil(this.state.totalArtical/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext} >Next</button>
        </div>
      </div>
    )
  }
}
