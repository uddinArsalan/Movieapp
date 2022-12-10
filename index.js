const cross = document.querySelector(".sidebar--cross");
const section = document.querySelector(".section");
const navBar = document.querySelector(".nav--bar");
const toShow = document.querySelector(".click--bar");
const allMovieImg = document.querySelectorAll(".movie--img");
const allMovieName = document.querySelectorAll(".movie--name");
const allMovieDesc = document.querySelectorAll(".movie--desc");
// const arrImg = [...allMovieImg];
// const arrName = [...allMovieName];
// const arrDesc = [...allMovieDesc];
// const arrMovie = [...allMovieImg,...allMovieName,...allMovieDesc]
// const arr = [firstImg, secondImg , thirdImg, fourthImg, fifthImg, sixImg , sevenImg , eightImg]
// const base_URL_trailer = "https://www.youtube.com/watch?v="
const inputText = document.querySelector(".nav--input");
const upcomingLink = document.querySelector(".upcoming");
const newRelease = document.querySelector(".newRelease");
let loader = document.querySelector("#preloader");
const smallSidebar = document.querySelector(".small-sidebar");
const button = document.querySelector(".small-screen");
const smallupcoming = document.querySelector(".smallUpcoming");
const smallInput = document.querySelector(".nav--bar__input");

const userCardTempelate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const watchLater = document.querySelector(".watchlater");
const smallRelease = document.querySelector(".smallrelease");
const smallwatchLater = document.querySelector(".smallwatchlater");
const title = document.querySelector(".top--title");
const trending = document.querySelector(".trendingAll");
const smalltrending = document.querySelector(".smalltrending");
const favourites = document.querySelector(".favourites");
const smallfavourites = document.querySelector(".smallfavourites");
const smallastActivity = document.querySelector(".smallastActivity");
const lastActivity = document.querySelector(".lastActivity");
const bookActivity = document.querySelector(".bookActivity");
const smallbookActivity = document.querySelector(".smallbookActivity");


let movieLinkClick = "https://api.themoviedb.org/3/trending/all/day?api_key=1010b707e9765987c55cce5f389121fa";
let upcomingMovieLink = "https://api.themoviedb.org/3/movie/upcoming?api_key=1010b707e9765987c55cce5f389121fa&language=en-US&page=1";

window.addEventListener("load",function() {
    loader.style.display = "none";
})

let countFav = localStorage.getItem("countFav");
let countBook = localStorage.getItem("countBook");

lastActivity.textContent = `${countFav-1} movie${countFav-1>1 ? "s" : ""} added in favourites`;
smallastActivity.textContent = `${countFav-1} movie${countFav-1>1 ? "s" : ""} added in favourites`;
bookActivity.textContent = `${countBook-1} movie${countBook-1>1 ? "s" : ""} added in bookmark`;
smallbookActivity.textContent = `${countBook-1} movie${countBook-1>1 ? "s" : ""} added in bookmark`;

const movieGenre ={
  28 : "Action",
  12 : "Adventure",
  16 : "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18 : "Drama",
  10751: "Family",
  14 : "Fantasy",
  36 : "History",
  27 : "Horror",
  10402 : "Music",
  9648 : "Mystery",
  10749: "Romance",
  878 : "Science Fiction",
  10770 : "TV Movie",
  53 : "Thriller",
  10752 : "War",
  37 : "Western"
}

let users = []

localStorage.setItem("isClicked",false)

inputText.addEventListener("input",(e)=>{
  const value = e.target.value.toLowerCase();
  console.log(users)
  users.forEach(user => {
    const isVisible = user.name.toLowerCase().includes(value) 
    user.element.classList.toggle("hide",!isVisible);
  })
})
smallInput.addEventListener("input",(e)=>{
  const value = e.target.value.toLowerCase();
  users.forEach(user => {
    const isVisible = user.name.toLowerCase().includes(value) 
    user.element.classList.toggle("hide",!isVisible);
  })
})

function fetchUpcomingMovie(e){
  title.textContent = "Coming Soon";
  userCardContainer.innerHTML = ""
  localStorage.setItem("isClicked",true)
  fetch(upcomingMovieLink)
  .then(res => res.json())
  .then(data => {
    users = data.results.map((user,index) => {
      const card = userCardTempelate.content.cloneNode(true).children[0]
      const img = card.querySelector("[data-img]")
      const name = card.querySelector("[data-name]")
      const genre = card.querySelector("[data-genre]")
      img.addEventListener("click",() => {
        localStorage.setItem("id",user.id);
        localStorage.setItem("idImg",index);
        localStorage.setItem("idGenre",user.genre_ids)
      })
      img.src = "https://image.tmdb.org/t/p/w500" +user.poster_path
      name.textContent = user.name
      genre.textContent = user.genre_ids.map(id => {
        return movieGenre[id] + " "
      })
      userCardContainer.appendChild(card)
    });
  })
}


function trendingAll(){
  title.textContent = "Trending";
  fetch(movieLinkClick)
  .then(res => res.json())
  .then(data => {
    users = data.results.map((user,index) => {
      const card = userCardTempelate.content.cloneNode(true).children[0]
      const img = card.querySelector("[data-img]")
      const name = card.querySelector("[data-name]")
      const genre = card.querySelector("[data-genre]")
      img.addEventListener("click",() => {
        localStorage.setItem("id",user.id);
        localStorage.setItem("idImg",index);
        localStorage.setItem("idGenre",user.genre_ids)
      })
      img.src = "https://image.tmdb.org/t/p/w500" +user.poster_path
      name.textContent = user.name || user.title
      genre.textContent = user.genre_ids.map(id => {
        return movieGenre[id] + " "
      })
      userCardContainer.appendChild(card)
      return{name : user.name || user.title,imgSrc : user.poster_path,element: card, genre: user.genre_ids.map(id => {
        return movieGenre[id] + " "
      }) }
    });
  })
}

  trending.addEventListener("click",trendingAll)
  smalltrending.addEventListener("click",trendingAll)

  fetch(movieLinkClick)
  .then(res => res.json())
  .then(data => {
    users = data.results.map((user,index) => {
      const card = userCardTempelate.content.cloneNode(true).children[0]
      const img = card.querySelector("[data-img]")
      const name = card.querySelector("[data-name]")
      const genre = card.querySelector("[data-genre]")
      img.addEventListener("click",() => {
        localStorage.setItem("id",user.id);
        localStorage.setItem("idImg",index);
        localStorage.setItem("idGenre",user.genre_ids)
      })
      img.src = "https://image.tmdb.org/t/p/w500" +user.poster_path
      name.textContent = user.name || user.title
      genre.textContent = user.genre_ids.map(id => {
        return movieGenre[id] + " "
      })
      userCardContainer.appendChild(card)
      return{name : user.name || user.title,imgSrc : user.poster_path,element: card, genre: user.genre_ids.map(id => {
        return movieGenre[id] + " "
      }) }
    });
  })


upcomingLink.addEventListener("click",fetchUpcomingMovie)
smallupcoming.addEventListener("click",fetchUpcomingMovie);

function release(){
  location.reload();
  localStorage.setItem("arrId",0);
  title.textContent = "New Releases";
  localStorage.setItem("FavIdarray",0);
}

newRelease.addEventListener("click",release)

smallRelease.addEventListener("click",release)

const base_URL_video = "https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US"
const API_key = "1010b707e9765987c55cce5f389121fa";

function crossFunc() {
  section.style = `display : none`;
}

function hide() {
  toShow.classList.toggle("click--bar--show");
}


cross.addEventListener("click", crossFunc);
navBar.addEventListener("click", hide);


// fetch("./trending.json")
// fetch(movieLinkClick)
//   .then((res) => res.json())
//   .then((data) => {
//     for (let i = 0; i < allMovieImg.length; i++) {
//       arrImg[
//         i
//       ].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
//       // arrImg[1].src = `https://image.tmdb.org/t/p/w500${data.results[9].poster_path}`;
//       arrName[i].textContent = data.results[i].title || data.results[i].name;
//       arrDesc[i].textContent = data.results[i].genre_ids.map(id => {
//         return movieGenre[id] + " "
//       })
//       //  data.results[i].genre_ids.map(id => console.log(movieGenre[id]))
//         arrImg[i].addEventListener("click", () => {
//            localStorage.setItem("id",data.results[i].id);
//            localStorage.setItem("idImg",i);
//            localStorage.setItem("idGenre",data.results[i].genre_ids)
//           });
//     }
//   });


// function text(e){
  // fetch("./trending.json")
  // var filter = inputText.value;
  // console.log('change')
  // fetch("https://api.themoviedb.org/3/trending/all/day?api_key=1010b707e9765987c55cce5f389121fa")
  //     .then(res => res.json())
  //     .then(txt => {
        // const filteredArray = arrName.filter(arr => {
        //   return arr.textContent === e.target.value
        // })
        // console.log(filteredArray)
        // for(let i = 0; i< allMovieImg.length ; i++){
        //   arrImg[i].style.display = "none"
        //   arrName[i].style.display = "none"
        //   arrDesc[i].style.display = "none"
        //   if((txt.results[i].name || txt.results[i].title ) === e.target.value){
        //   // if(txt.results[i].name.indexOf(filter)> -1){
        //       arrImg[i].style.display = "inline"
        //       arrName[i].style.display = "block"
        //       arrDesc[i].style.display = "inline"
        //   }
          // else{
          //   arrImg[i].style.display = "none"
          //   arrName[i].style.display = "none"
          //   arrDesc[i].style.display = "none"
          // }
//         }
//       })
// }


button.addEventListener("click",function(){
  smallSidebar.classList.toggle("hide");
})

watchLater.addEventListener("click",() =>{
  location.href ="bookmark.html"
})

smallwatchLater.addEventListener("click",() => {
  location.href ="bookmark.html"
})

favourites.addEventListener("click",() =>{
  location.href = "favourite.html";
});

smallfavourites.addEventListener("click",() =>{
  location.href = "favourite.html";
});