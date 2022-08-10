import React, { Component } from 'react'
import NewsItems from './NewsItems';
import Spinner from './Spinner'
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
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
            loader :true,
            totalArtical : 0

        }
      }
    
    async componentDidMount(){
      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d3e1467945684411810c0cb143605a56&page=1&pageSize=${this.props.pageSize}`
      this.setState({loader:true})
      let data=await fetch(url)
      let parseData = await data.json()
      this.setState({
        articals : parseData.articles,
        totalArtical:parseData.totalResults,
        loader :false
      })
    }
    handlePre= async()=>{
      
      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d3e1467945684411810c0cb143605a56&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      this.setState({loader:true})
      let data=await fetch(url)
      let parseData = await data.json()
      this.setState({
        page: this.state.page -1,
        articals : parseData.articles,
        loader :false
  
      })
  
    }
    handleNext=async ()=>{

      if (this.state.page+1 > Math.ceil(this.state.totalArtical/this.props.pageSize)) {

      }else{
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d3e1467945684411810c0cb143605a56&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loader:true})
        let data=await fetch(url)
        let parseData = await data.json()
        this.setState({
            page: this.state.page +1,
            articals : parseData.articles,
            loader:false
          })

      } 
    
    } 
    fetchMoreData =async ()=>{
      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d3e1467945684411810c0cb143605a56&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      this.setState({loader:true})
      let data=await fetch(url)
      let parseData = await data.json()
      this.setState({
        articals : this.state.articals.concat(parseData.articles),
        loader :false,
        totalArtical:parseData.totalResults,
        page: this.state.page +1,
  
      })

    }

  render() {
    return (
      <>
        
          <h1>All avaiable news</h1>

          <InfiniteScroll
          dataLength={this.state.articals.length}
          next={this.fetchMoreData}
          hasMore={this.state.articals.length !== this.state.totalArtical }
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
            {this.state.loader && <Spinner/>}
            {this.state.articals.map((element)=>{
              return  <div className="col-md-3 my-4" key={element.url?element.url:''}>
                  <NewsItems title={element.title?element.title:""} description={element.description?element.description:""} image={element.urlToImage}  Newsurl={element.url} author={element.author} time={element.publishedAt} badge={element.source.name}/>
            </div>   
            })}
              {/* {!this.state.loader && this.state.articals.map((element)=>{
              return  <div className="col-md-3 my-4" key={element.url?element.url:''}>
                  <NewsItems title={element.title?element.title:""} description={element.description?element.description:""} image={element.urlToImage}  Newsurl={element.url} author={element.author} time={element.publishedAt} badge={element.source.name}/>
            </div>   
            })} */}
          </div>
          </div>
          </InfiniteScroll>
        
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePre} >  previus </button>
        <button  disabled={this.state.page+1>Math.ceil(this.state.totalArtical/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext} >Next</button>
        </div> */}
      </>
    )
  }
}
