const API_key = "1010b707e9765987c55cce5f389121fa";
const mainContainer = document.querySelector("[mainContainer]");
const templateMovie = document.querySelector("[movietemplate]")
const movieId = localStorage.getItem("id");
const arrayFav = localStorage.getItem("FavIdarray").split(",");

localStorage.setItem("countFav",arrayFav.length);

for(let i =0;i < arrayFav.length;i++){
    fetch(`https://api.themoviedb.org/3/movie/${arrayFav[i]}?api_key=${API_key}&language=en-US`)
          .then(res => res.json())
          .then(dataMovieBookmark => {
            const card = templateMovie.content.cloneNode(true).children[0];
            const moviename = card.querySelector("[moviename]");
            const imgSrc = card.querySelector("[dataImg]");
            if(dataMovieBookmark.poster_path == null || dataMovieBookmark.poster_path == undefined || dataMovieBookmark.poster_path == 0 ){
              return
            }
            imgSrc.src = `https://image.tmdb.org/t/p/w500${dataMovieBookmark.poster_path}`;
            moviename.textContent = dataMovieBookmark.original_title;
            mainContainer.appendChild(card)
          })
        }