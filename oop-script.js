//the API documentation site https://developers.themoviedb.org/3/

class App {
  static async run(list) {
    HomePage.container.innerHTML="";
    HomePage.row.innerHTML=""
    const movies = await APIService.fetchMovies(list)
    const genres = await APIService.fetchGenres()
      // console.log(movies)
    HomePage.renderMovies(movies);
    Genres.renderGenres(genres);
  }
}

class AppSearch {
  static async run(input) {
    HomePage.container.innerHTML="";
    HomePage.row.innerHTML=""
    const searchMov = await APIService.fetchsearchMov(input)
    const searchAct = await APIService.fetchsearchAct(input)
      // console.log(searchMov);
    HomePage.renderMovies(searchMov);
    ActorsListPage.renderActors(searchAct);
  }
}

class ActorsNavbar {
  static async run() {
    HomePage.container.innerHTML=""
    HomePage.row.innerHTML=""
    const Actors = await APIService.fetchActors()
      // console.log(Actors)
    ActorsListPage.renderActors(Actors);
  }
}

class AppDiscover {
  static async run(genreId) {
    const discoverMov = await APIService.fetchDiscover(genreId)
      // console.log(discoverMov)
    HomePage.container.innerHTML = ""
    HomePage.row.innerHTML = ""
    HomePage.renderMovies(discoverMov);
  }
}

class APIService {
  static TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  static async fetchMovies(list) {
    const url = APIService._constructUrl(`movie/${list}`)
    const response = await fetch(url)
    const data = await response.json()
      // console.log(data)
    return data.results.map(movie => new Movie(movie))
  }

static async fetchsearchMov(input) {
    const url = APIService._searchUrl(`search/movie`, input)
    const response = await fetch(url)
    const data = await response.json()
      // console.log(data)
    return data.results.map(movie => new Movie(movie))
  }

static async fetchsearchAct(input) {
    const url = APIService._searchUrl(`search/person`, input)
    const response = await fetch(url)
    const data = await response.json()
    return data.results.map(actor => new Actor(actor))
  }

static _searchUrl(path, input) {
    return `${this.TMDB_BASE_URL}/${path}?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}&query=${input}`;
  }

static async fetchCredits(movie_id) {
    const url = APIService._constructUrl(`movie/${movie_id}/credits`)
    const response = await fetch(url)
    const data = await response.json()
      // console.log(data)
    return data.cast.slice(0,5).map(actor => new Actor(actor))
  }

static async fetchDirector(movie_id) {
    const url = APIService._constructUrl(`movie/${movie_id}/credits`)
    const response = await fetch(url)
    const data = await response.json()
      // console.log(data)
      // const directorData= data.crew.find(x => x.job=="Director")
    return data.crew.find(x => x.job=="Director")
      // console.log(directorData)
  }    
        
static async fetchActors() {
      const url = APIService._constructUrl(`person/popular`)
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      return data.results.map(actor => new Actor(actor))
  }

static async fetchActor(person_id){        
    const url = APIService._constructUrl(`person/${person_id}`)
    const response = await fetch(url)
    const data = await response.json()
      // console.log(data) 
    return new Actor(data)
  }

static async fetchActorMovies(person_id){        
    const url = APIService._constructUrl(`person/${person_id}/movie_credits`)
    const response = await fetch(url)
    const data = await response.json()
      // console.log(data)
    return data.cast.slice(0,6).map(movie => new Movie(movie))
  }

static async fetchRelatedMvoies(movie_id){        
    const url = APIService._constructUrl(`movie/${movie_id}/similar`)
    const response = await fetch(url)
    const data = await response.json()
      // console.log(data) 
    return data.results.slice(0,5).map(movie => new Movie(movie))
  }

static async fetchTrailers(movie_id){
    const url = APIService._constructUrl(`movie/${movie_id}/videos`)
    const response = await fetch(url);
    const trailer = await response.json();
    return trailer.results.map(movie => new Trailers(movie))
      // console.log (trailer)
  }

static async fetchMovie(movieId) {
    const url = APIService._constructUrl(`movie/${movieId}`)
    const response = await fetch(url)
    const data = await response.json()
      // console.log(data)
    return new Movie(data)
  }

static async fetchGenres() {
    const url = APIService._constructUrl(`genre/movie/list`)
    const response = await fetch(url)
    const data = await response.json()
      // console.log(data)
    return data.genres
  }

static async fetchDiscover(genreId) {
    const url = APIService._discoverUrl(`discover/movie`, genreId)
    const response = await fetch(url)
    const data = await response.json()
      // console.log(data)
    return data.results.map(movie => new Movie(movie))
  }

static _constructUrl(path) {
    return `${this.TMDB_BASE_URL}/${path}?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}`;
  }

static _discoverUrl(path, genre) {
    return `${this.TMDB_BASE_URL}/${path}?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}&with_genres=${genre}`;
  }
} 

class HomePage {
    static container = document.getElementById('container');
    static row = document.createElement('div')
    static renderMovies(movies) {
          // console.log(movies)
    this.row.className= "row"
          movies.forEach(movie => {
    const movieDiv = document.createElement("div");
          movieDiv.className = "col-md-4"
    const movieImage = document.createElement("img")
          movieImage.src = `${movie.backdropUrl}`;
    const movieTitle = document.createElement("h3");
          movieTitle.textContent = `${movie.title}`;
          movieImage.addEventListener("click", function() {
          Movies.run(movie);
            });
          movieDiv.appendChild(movieImage);
          movieDiv.appendChild(movieTitle);
          HomePage.row.appendChild(movieDiv);
          HomePage.container.appendChild(this.row)
        })
    }
}

class ActorsListPage {
    static container = document.getElementById('container');
    static renderActors(actors) {
        actors.forEach(actor => {
    const actorDiv = document.createElement("div");
          actorDiv.className = "col-md-3"
    const actorImage = document.createElement("img");
          actorImage.className = "actorProfileImage";
          actorImage.src = `${actor.backdropUrl}`;
    const actorName = document.createElement("h3");
          actorName.textContent = `${actor.name}`;
          actorImage.addEventListener("click", function() {
          Actors.run(actor);
            });
          actorDiv.appendChild(actorImage);
          actorDiv.appendChild(actorName);
          HomePage.row.appendChild(actorDiv)
          this.container.appendChild(HomePage.row);
        })
    }
}

class Movies {
    static async run(movie) {
    const movieData = await APIService.fetchMovie(movie.id)
    const castData= await APIService.fetchCredits(movie.id)
    const relatedMovies=await APIService.fetchRelatedMvoies(movie.id)
    const movieTrialers=await APIService.fetchTrailers(movie.id)
    const directorName=await APIService.fetchDirector(movie.id)
        // console.log(castData)
    MoviePage.renderMovieSection(movieData,castData,relatedMovies,movieTrialers,directorName);
    }
}

class MoviePage {
    static container = document.getElementById('container');
    static renderMovieSection(movie,cast,related,trailers,director) {
      MovieSection.renderMovie(movie,cast,related,trailers,director);
    }
}

class Actors {
  static async run(actor) {
      const actorData = await APIService.fetchActor(actor.id)
      const actorMoviesData = await APIService.fetchActorMovies(actor.id)
      
      // console.log(actorMoviesData);// const actorGender= await APIService.fetchGender(actor.id)
      ActorSection.renderActor(actorData,actorMoviesData);
      
  }
}

class MovieSection {
    static renderMovie(movie,cast,related,trailers,director) {
      // console.log(trailers)
        MoviePage.container.innerHTML = `
      <div class="movieImg row">
        <div class="col-md-4">
          <img id=${movie.id} src=${movie.backdropUrl}> 
        </div>
        <div class="col-md-8">
          <h2 id="movie-title">${movie.title}</h2>
          <p id="genres">${movie.genres.slice(0, -2)}</p>
          <p id="language">Languages: ${movie.language.slice(0, -2)}</p>
          <p id="movie-release-date">Release date: ${movie.releaseDate}</p>
          <p id="movie-runtime">Runtime: ${movie.runtime}</p>
          <p id="">Rate: ${movie.rating}, Vote count: ${movie.vote_count} </p>
          
          <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
      </div>
      <h5>Director Name: ${director.name}</h5>
      <h3>Actors:</h3>
      <div id="actors">
         ${cast.map(actor =>`
        <div>
          <img class="actorImg" id=${actor.id} src= ${actor.backdropUrl}>
          <p>${actor.name}</p>
        </div>`).join("")
      }
      </div>

      <h3>Production Companies:</h3>
      <div id="production_companies">
        ${movie.productionCompanies.map(m =>`
        <div>
          ${m.logo_path ? `<img class="pcImg" src= ${Movie.BACKDROP_BASE_URL+m.logo_path}>` : ""}
          <p>${m.name}</p>
        </div>`).join("")}
      </div>
      
      <div>
      <h3> Movie Trailers:</h3>
      <iframe width="560" height="315" 
      src="https://www.youtube.com/embed/${trailers[0].key}" 
      frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>      
      </div>
 
 
      <h3>Related Movies:</h3>
      <div id="related">
        ${related.map(movie =>`
        <div>
          <img class="related" id=${movie.id} src= ${movie.backdropUrl}>
          <p>${movie.title}</p>
       </div>`
          
        ).join("")
        
       }
       </div>`

      const actorImage = [...document.getElementsByClassName("actorImg")];
      // console.log(actorImage);
      actorImage.map(actor => actor.addEventListener("click", function() {
        Actors.run(actor);
      }))
      const movieImg = [...document.getElementsByClassName("related")];
      // console.log(movieImg);
      movieImg.map(movie => movie.addEventListener("click", function() {
         Movies.run(movie);
      }))

    // `<div class="overlay">
    //   <div class="text">Rate: ${movie.rating},${movie.genres.slice(0, -2)},${movie.overview} </div>
    // </div>`
      // console.log(movieHover);
      // movieHover.map(movie => movie.addEventListener("onmouseover", function() {
      //   const x = document.createElement("p").
      //   x.innerHTML="Hi";
      //   const element = document.getElementById(`${movie.id}`);
      //   element.after(x);
      //   console.log("aaaa")
      // }))
  }
}
class Related {
  static call(movie){
    Movies.run(movie)
  }
}
class ActorSection {
  static renderActor(actor,cast) {
    HomePage.container.innerHTML = `
    <div class="row">
      <div class="col-md-4">
        <img width = 100% id="actor-backdrop" src=${actor.backdropUrl}> 
      </div>
      <div class="col-md-8">
        <h2 id="actor-name">${actor.name}</h2>
        <p id="gender">Gender: ${actor.actorGender}</p>
        <p id="popularity">Popularity: ${actor.popularity}</p>
        <p id="popularity">DOB: ${actor.actorBirthday}</p>
        <p id="popularity">Deathday: ${actor.actorDeathday}</p>
        <p id="biography">Biography: ${actor.actorBiography}</p>
    </div>
    </div>
    <h3>List of movies the actor participated in:</h3>
      <div id="actors">
        ${cast.map(movie =>`
        <div>
          <img src= ${movie.backdropUrl}>
          <p>${movie.title}</p>
        </div>`).join("")}
      </div>
  `}
}
class Movie {
  static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
    constructor(json) {
        this.id = json.id;
        this.title = json.title;
        this.name=json.name
        this.releaseDate = json.release_date;
        this.runtime = json.runtime + " minutes";
        this.overview = json.overview;
        this.backdropPath = json.backdrop_path;
        this.vote_count=json.vote_count;
        this.genres=""
        for (let i in json.genres){
          this.genres+=json.genres[i].name+", ";
        }
        this.language="";
        for (let j in json.spoken_languages){
          this.language+=json.spoken_languages[j].name+", ";
        }
        
        this.productionCompanies=json.production_companies;
        this.rating=json.vote_average;
    }

  get backdropUrl() {
      return this.backdropPath ? Movie.BACKDROP_BASE_URL + this.backdropPath : "";
  }

    
}

class Rating{
  constructor(json){
    this.value=json.value;
  }
}
class Actor{
  static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
  constructor(json){
    this.name=json.name;
    this.profile=json.profile_path;
    this.id=json.id;
    this.gender_id=json.gender;
    this.gender="";
    this.popularity=json.popularity;
    this.birthday=json.birthday;
    this.deathday=json.deathday;
    this.biography=json.biography;
    this.backdropPath = json.backdrop_path;

    
  }
  get actorGender() {
    return this.gender_id == 1 ? this.gender = "Female" : this.gender = "Male"
  }
  get actorBirthday() {
    return this.birthday ? this.birthday : this.birthday = "N/A"
  }
  get actorDeathday() {
    return this.deathday ? this.deathday : this.deathday = "N/A"
  }
  get actorBiography() {
    return this.biography ? this.biography : this.biography = "N/A"
  }
  get backdropUrl() {
    return this.backdropPath ? Movie.BACKDROP_BASE_URL + this.backdropPath : "";
}
  get backdropUrl() {
    return this.profile ? Actor.BACKDROP_BASE_URL + this.profile : "";
    
  }  
}
class Genres {
  static dropDown = document.getElementById('dropDownMenu');
      static renderGenres(genres) {
          genres.forEach(genre => {
              const genreA = document.createElement("a");
              genreA.innerHTML = genre.name
              genreA.className = "dropdown-item"
              genreA.addEventListener("click", function() {
                  AppDiscover.run(genre.id)
              });
              this.dropDown.appendChild(genreA);
          })
      }
  }
class Trailers{
  constructor(json){
    this.key=json.key;
  }
}

class About{
  static run(){
    HomePage.container.innerHTML=`
    <div class="about-section">
    <h1>About Us Page</h1>
    <p> This website was made by Ahmad and Luey forcefully because we had to and not made with love and passion like other websites at all.<br>
    A lot of team work and staying up at night was required and at the end the result was like shit and nothing worked until the instructor came and fixed everything.<br>
    Finally, we hope you enjoy this useless webiste that no one will ever check or ask for movies data from it but ehhhhhh so be it.<br>
    Made with grapes and chai tea latte :)))))
    </p>
  </div>
  
  <h2 style="text-align:center">Our Team</h2>
  <div class="row">
    <div class="col-md-6">
      <div class="card">
        <img src="12.jpeg">
        <div class="container">
          <h2>Ahmad Aljalmoud</h2>
          <p class="title">CEO & Founder</p>
          <p>Ahmad is an energetic, creative, and multilingual person who is passionate about scientific research, learning and technology.<br>
          He also sees himself thriving positive vibes in multi-cultural and international environment.</p>
          <p>Ahmad@example.com</p>
          <p><button class="button">Contact</button></p>
        </div>
      </div>
    </div>
  
    <div class="col-md-6">
      <div class="card">
        <img src="9071cc73-9701-4f80-80e0-94905adb837c.jpg">
        <div class="container">
          <h2>Luey Ahmed</h2>
          <p class="title">Art Director & Founder</p>
          <p> Find the hidden genie in the img (That is art)<br>
          Baby shark doo doo doo, baby shark<br>
          Dady shark doo doo doo, dady shark<br>
          Yessss, it is Ammar shark</p>
          <p>Luey@example.com</p>
          <p><button class="button">Contact</button></p>
        </div>
      </div>
    </div>
  </div>`

  }
}

document.addEventListener("DOMContentLoaded", () => App.run('now_playing'));

const searchBar = document.getElementById('searchBar');
// console.log(searchBar)
const searchForm = document.getElementById('searchForm')
searchForm.addEventListener('submit', (e)=> {
  e.preventDefault()
  inputValue = searchBar.value
  AppSearch.run(inputValue)
})

// document.body.addEventListener("onclick", function(){  
// window.onload = function() {
// document.getElementById("nav-link").addEventListener('click',changeClass);
//     }
//  } );

//  document.getElementById("nav-link").addEventListener("click", ActorsNavbar.run);
