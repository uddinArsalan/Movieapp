const movieTrailerImg = document.querySelector(".trailer--img");
const playTrailer = document.querySelector(".trailer");
const movie__name = document.querySelector(".movie--name");
const trailerWatch = document.querySelector(".trailerWatch");
const API_key = "1010b707e9765987c55cce5f389121fa";
const toggleDark = document.querySelector(".toggleDark");
const bookmark = document.querySelector(".bookmark");
const BASE_IMG_LINK = "https://image.tmdb.org/t/p/w500";
const genre = document.querySelectorAll(".genre");
const upcomingmovieLink = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_key}&language=en-US&page=1`
const trending = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_key}`;
const movieLink = localStorage.getItem("isClicked") === 'true' ? upcomingmovieLink : trending;
const castGridContainer = document.querySelector("[cast-grid-container]");
const castContainer = document.querySelector("[cast-container-template]");
const genreContainer = document.querySelector("[genre-container]")
const genreTemplate = document.querySelector("[genre-template]")
const favourite = document.querySelector(".favourite");
// const setting = document.querySelector(".setting");
// const blur = document.querySelector("#blur");
// const dialog = document.querySelector(".dialog");
const videoContainer = document.querySelector(".video-container");
const imgContainer = document.querySelector(".imgContainer");
// const dialogBox = document.querySelector(".dialogBox");

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

fetch(movieLink)
  .then((res) => res.json())
  .then((data) => {
    movieTrailerImg.src = `${BASE_IMG_LINK}${data.results[parseInt(localStorage.getItem("idImg"))].backdrop_path}`;
    movie__name.textContent = data.results[parseInt(localStorage.getItem("idImg"))].title ||  data.results[parseInt(localStorage.getItem("idImg"))].name;
    let idgenre = localStorage.getItem("idGenre")

    const arrGenre = idgenre.split(',');
      const filtered = arrGenre.filter((arr,i) => {
          return (i<3 && arr)
      })


    filtered.map(index => {
      const cardGenre = genreTemplate.content.cloneNode(true).children[0];
      if(movieGenre[index] == undefined){
        return
      }
      cardGenre.textContent = movieGenre[index]
      genreContainer.appendChild(cardGenre)
    })
    // for(let i = 0; i< 3;i++){
    //   genre[i].textContent = movieGenre[arrGenre[i]] 
    // }
  });

function playtrailer() {
  videoContainer.classList.remove("hide");
  // hide.classList.remove("hide");
  // hide.classList.add("show");
  imgContainer.style.display = "none";
  playTrailer.style.display = "none";
  movie__name.style.display = "none";
  movieTrailerImg.classList.remove("show");
  movieTrailerImg.classList.add("hide");

  fetch(
    `https://api.themoviedb.org/3/movie/${parseInt(localStorage.getItem("id"))}/videos?api_key=${API_key}&language=en-US`
  )
    .then((response) => response.json())
    .then((dt) => {
    function getIndex(index){
    if(index > 8){
      return;
    }
    if(dt.results[index].type == "Trailer"){
      return index;
    }
    return getIndex(index+1);
    }
    console.log(getIndex(0))
    try{
      trailerWatch.src = `https://www.youtube.com/embed/${dt.results[getIndex(0)].key}`
    } 
    catch{
      trailerWatch.src = "https://www.youtube.com/embed/ICBVzTRsVSo"
    }
    
    });
}

playTrailer.addEventListener("click", playtrailer);

function dark(){
  document.body.classList.toggle("darkMode");
}

toggleDark.addEventListener("click",dark);

// const arr = []
// bookmark.addEventListener("click",function(){
//   fetch(movieLink)
//       .then(res => res.json())
//       .then(bkmrkData => {
//         arr.push(bkmrkData.results[parseInt(localStorage.getItem("idImg"))])
//       })
// })

// localStorage.setItem("bookmarkData",JSON.stringify(arr))
// fetch(`https://api.themoviedb.org/3/movie/${parseInt(localStorage.getItem("id"))}/credits?api_key=${API_key}`)
//         .then(res => res.json())
//         .then(castData => {
//           for(let i = 0; i< 6;i++){
//             allCastImgArr[i].src = `${BASE_IMG_LINK}${castData.cast[i].profile_path}`;
//             allCastName[i].textContent = castData.cast[i].name
//           }
//         })

fetch(`https://api.themoviedb.org/3/movie/${parseInt(localStorage.getItem("id"))}/credits?api_key=${API_key}`)
        .then(res => res.json())
        .then(data => {
          data.cast.map(user => {
              const card = castContainer.content.cloneNode(true).children[0];
              const img = card.querySelector("[cast--img]")
              const name = card.querySelector("[cast--name]")
              card.addEventListener("click",()=>{
                fetch(`https://api.themoviedb.org/3/person/${user.id}/external_ids?api_key=${API_key}&language=en-US`)
                    .then(res => res.json())
                    .then(extId => {
                      console.log(extId)
                      window.location.href = `https://m.imdb.com/name/${extId.imdb_id}/`;
                      if(extId.imdb_id == null){
                        window.location.href = `https://m.imdb.com/name/${extId.instagram_id}/`
                        return
                      }
                    })
                  console.log(user.id)
              })
              if(user.profile_path === null){
                // card.classList.add("hide")
                return
              }
              img.src = `${BASE_IMG_LINK}${user.profile_path}`
              name.textContent = user.name
              castGridContainer.appendChild(card)
          });

        })

bookmark.addEventListener("click",bookmarkMovie)
// let count = localStorage.getItem("count")
const arr = [localStorage.getItem("arrId")]
function bookmarkMovie(){
  arr.push(localStorage.getItem("id"));
  localStorage.setItem("arrId",arr)
}


favourite.addEventListener("click",FavouriteMovie);
let FavIdArray = [localStorage.getItem("FavIdarray")]
function FavouriteMovie() {
  FavIdArray.push(localStorage.getItem("id"));
  localStorage.setItem("FavIdarray",FavIdArray);
}

// function showDialogBox(){
//     blur.classList.toggle("hide");
//     // dialogBox.classList.toggle("hide");
//     dialog.classList.toggle("hide");
// }

// setting.addEventListener("click",showDialogBox);