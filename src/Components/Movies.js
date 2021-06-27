import React, { Component } from 'react'
import {getMovies} from './getMovies';
export default class Movies extends Component {
    constructor() 
    {
        super();
        this.state={
            movies : getMovies(),
            currSearchText : ''
        }
    }

    handleChange=(e)=>{
        let val = e.target.value;
        this.setState({
            currSearchText : val
        })
    }

    onDelete = (id)=>{
        let nfa = this.state.movies.filter(function(moviesObj){
            return moviesObj._id != id
        })
        this.setState({
            movies : nfa
        })
    }

    render() {
        //As every time rendering is there so we have written filtering in render func
        let {movies, currSearchText} = this.state //ES6 Destructuring
        let filteredArr = []
        if(currSearchText == '')
        {
            filteredArr = movies;
        }
        else 
        {
            filteredArr = movies.filter(function(movieObj) {
                let title = movieObj.title.toLowerCase();
                return title.includes(currSearchText.toLowerCase());
            })
        }


        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        Hello col-3
                    </div>
                    <div className="col-9">
                        
                    <input type="search" value={this.state.currSearchText} onChange={this.handleChange}></input>
                    
                    
                    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Movies</th>
      <th scope="col">Genre</th>
      <th scope="col">
        <i onClick={this.sortByStock} className="fa fa-sort-asc" aria-hidden="true"></i>
            Stock
        <i onClick={this.sortByStock} className="fa fa-sort-desc" aria-hidden="true"></i>
      </th>
      <th scope="col">
        <i onClick={this.sortByStock} className="fa fa-sort-asc" aria-hidden="true"></i>
            Rating
        <i onClick={this.sortByStock} className="fa fa-sort-desc" aria-hidden="true"></i>
      </th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {
        //We have to change map function on filtered Arr
        filteredArr.map((moviesObj)=>{
            return(
                <tr scope="row" key={moviesObj._id}>
                    <td></td>
                    <td>{moviesObj.title}</td>
                    <td>{moviesObj.genre.name}</td>
                    <td>{moviesObj.numberInStock}</td>
                    <td>{moviesObj.dailyRentalRate}</td>
                    <td><button onClick={()=>{
                        this.onDelete(moviesObj._id) }}
                        type="button" className="btn btn-danger">Delete</button></td>
                </tr>
            )
        })
    }
  </tbody>
</table>
                    </div>
                </div>
            </div>
        )
    }
}
