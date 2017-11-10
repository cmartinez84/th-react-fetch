import React, { Component } from 'react';
import './App.css';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';
import axios from 'axios';

// 'http://api.giphy.com/v1/gifs/trending?&api_key=roS9h1ghIDgRywk54MegMZqr4ErvAjZN'
// roS9h1ghIDgRywk54MegMZqr4ErvAjZN
// /v1/gifs/trending
export default class App extends Component {
  // super lets you use the keyword this within context of app class, ratehr than component
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true

    }
  }
  //component has dom rep now
  // componentDidMount(){
  //   fetch('http://api.giphy.com/v1/gifs/trending?&api_key=roS9h1ghIDgRywk54MegMZqr4ErvAjZN')
  //   .then(response =>
  //     response.json()
  //   )
  //   .then(responseData=>{
  //     this.setState({ gifs: responseData.data})
  //   })
  //   .catch(err=>{
  //     console.log('Error! ' + err);
  //   })
  // }
  componentDidMount(){
    this.performSearch();
  }
  performSearch= (query = 'cats') =>{
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=roS9h1ghIDgRywk54MegMZqr4ErvAjZN`)
    .then(response =>{
      this.setState({
        gifs: response.data.data,
        loading: false
      });
    })
    .catch(error =>
      console.log()
    )
  }
  render() {
    console.log(this.state.gifs);
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch} />
          </div>
        </div>
        <div className="main-content">
          {
            (this.state.loading)
            ? <p>Loading....</p>
            :<GifList
              data={this.state.gifs}/>
          }

        </div>
      </div>
    );
  }
}
