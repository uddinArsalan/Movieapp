const API_key = "1010b707e9765987c55cce5f389121fa";
// const upcomingmovieLink = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_key}&language=en-US&page=1`
// const trending = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_key}`;
// const movieLink = localStorage.getItem("isClicked") === 'true' ? upcomingmovieLink : trending;
const mainContainer = document.querySelector("[mainContainer]");
const templateMovie = document.querySelector("[movietemplate]")
const movieId = localStorage.getItem("id");
console.log(movieId);

// function createElementfromhtml(html) {
//   const template = document.createElement("template");

//   template.innerHTML = html.trim();

//   return template.content.firstElementChild;
// }

const arrayBook = localStorage.getItem("arrId").split(",");
localStorage.setItem("countBook",arrayBook.length);
for(let i =0;i < arrayBook.length;i++){
      fetch(`https://api.themoviedb.org/3/movie/${arrayBook[i]}?api_key=${API_key}&language=en-US`)
            .then(res => res.json())
            .then(dataMovieBookmark => {
              // localStorage.setItem("imgSrc",dataMovieBookmark.poster_path);
              // localStorage.setItem("name",dataMovieBookmark.original_title);
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
    // }
// }
// div.innerText = sessionStorage.getItem('bkmrkId')
// div.classList.add('movieBookmark')

console.log(localStorage.getItem("count"));
console.log(localStorage.getItem("arrId"))