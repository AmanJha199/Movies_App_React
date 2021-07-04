import React, { Component } from 'react'
import { getMovies } from './getMovies';
import axios from 'axios';
export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            currSearchText: '',
            currPage: 1,
            genres: [{ _id: 'abcd', name: 'All Genres' }],
            limit: 4,
            currentGenre: 'All Genres'
        }
    }
    //1st step - Constructor
    //2nd Step - Render 
    //3rd Step - componentDidMount(like a promise)
    async componentDidMount() {
        console.log('Component DID Mount');
        let res = await axios.get('https://backend-react-movie.herokuapp.com/movies');
        let genreRes = await axios.get('https://backend-react-movie.herokuapp.com/genres');
        // console.log(res.data.movies);
        console.log(genreRes.data.genres);
        this.setState({
            movies: res.data.movies,
            //we have used spread operator
            genres: [...this.state.genres, ...genreRes.data.genres]
        })
    }


    handleChange = (e) => {
        let val = e.target.value;
        this.setState({
            currSearchText: val
        })
    }

    onDelete = (id) => {
        let nfa = this.state.movies.filter(function (moviesObj) {
            return moviesObj._id != id
        })
        this.setState({
            movies: nfa
        })
    }

    sortByRating = (e) => {
        let className = e.target.className;
        // console.log(className);
        let sortedMovies = [];
        if (className == 'fa fa-sort-asc') {
            //ascending
            sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
                return movieObjA.dailyRentalRate - movieObjB.dailyRentalRate;
            })
        }
        else {
            //descending 
            sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
                return movieObjB.dailyRentalRate - movieObjA.dailyRentalRate;
            })
        }
        this.setState({
            movies: sortedMovies
        })
    }
    sortByStock = (e) => {
        let className = e.target.className;
        // console.log(className);
        let sortedMovies = [];
        if (className == 'fa fa-sort-asc') {
            //ascending
            sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
                return movieObjA.numberInStock - movieObjB.numberInStock;
            })
        }
        else {
            //descending 
            sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
                return movieObjB.numberInStock - movieObjA.numberInStock;
            })
        }
        this.setState({
            movies: sortedMovies
        })
    }

    handlePage = (pageNumber) => {
        this.setState({
            currPage: pageNumber
        });
    }

    handleGenreChange=(genreObj) =>{
        this.setState({
            currentGenre : genreObj
        })
    }

    render() {
        //As every time rendering is there so we have written filtering in render func
        let { movies, currSearchText, currPage, limit, genres, currentGenre } = this.state //ES6 Destructuring
        let filteredArr = []
        if (currSearchText == '') {
            filteredArr = movies;
        }
        else {
            filteredArr = movies.filter(function (movieObj) {
                let title = movieObj.title.toLowerCase();
                return title.includes(currSearchText.toLowerCase());
            })
        }
        //Genres filteration
        if(currentGenre != 'All Genres'){
            filteredArr = filteredArr.filter(function(moviesObj){
                return moviesObj.genre.name == currentGenre;
            })
        }


        let numberOfPages = Math.ceil(filteredArr.length / limit);
        //creation of pagesArr to store page
        let pagesArr = [];
        for (let i = 0; i < numberOfPages; i++) {
            pagesArr.push(i + 1);
        }
        let si = (currPage - 1) * limit;
        let ei = si + limit;
        //slice(start, end) -> start se end-1 tk jaata he
        filteredArr = filteredArr.slice(si, ei);
        // if(filteredArr == 0){
        //     this.setState({
        //         currPage : 1
        //     })
        // }


        return (
            <>
                {this.state.movies.length == 0 ? <div class="d-flex align-items-center">
                    <strong>Loading...</strong>
                    <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                </div> :

                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <ul className="list-group">
                                    {
                                       genres.map((genreObj)=>(
                                            <li onClick={()=>this.handleGenreChange(genreObj.name)} key={genreObj._id} className='list-group-item'>
                                                {genreObj.name}
                                            </li>
                                       )) 
                                    }
                                </ul>
                                <h5>Current genre :{currentGenre}</h5>
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
                                                <i onClick={this.sortByRating} className="fa fa-sort-asc" aria-hidden="true"></i>
                                                Rating
        <i onClick={this.sortByRating} className="fa fa-sort-desc" aria-hidden="true"></i>
                                            </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            //We have to change map function on filtered Arr
                                            filteredArr.map((moviesObj) => {
                                                return (
                                                    <tr scope="row" key={moviesObj._id}>
                                                        <td></td>
                                                        <td>{moviesObj.title}</td>
                                                        <td>{moviesObj.genre.name}</td>
                                                        <td>{moviesObj.numberInStock}</td>
                                                        <td>{moviesObj.dailyRentalRate}</td>
                                                        <td><button onClick={() => {
                                                            this.onDelete(moviesObj._id)
                                                        }}
                                                            type="button" className="btn btn-danger">Delete</button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>

                                <nav aria-label="...">
                                    <ul class="pagination">
                                        {
                                            pagesArr.map((pageNumber) => {
                                                let classStyle = pageNumber == currPage ? 'page-item active' : 'page-item';
                                                return (
                                                    <li key={pageNumber} onClick={() => this.handlePage(pageNumber)}
                                                        className={classStyle}><span className="page-link">{pageNumber}</span></li>
                                                )
                                            })
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>

                }
            </>
        )
    }
}

// <li class="page-item"><a class="page-link" href="#">1</a></li>
//     <li class="page-item active" aria-current="page">
//       <a class="page-link" href="#">2</a>
//     </li>
//     <li class="page-item"><a class="page-link" href="#">3</a></li>
