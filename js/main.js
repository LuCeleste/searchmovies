const apikey = `api_key=181c69466ca24b32232c10c5e8a93323`;
const base = 'https://api.themoviedb.org/3'
const apiurl = base + '/discover/movie?sort_by=popularity.desc&' + apikey + '&language=es';
const imgurl = 'https://image.tmdb.org/t/p/w500'
const searchurl = base + '/search/movie?' + apikey + '&language=es'
const main = document.getElementById('main');
const form = document.getElementById('form');
const search =document.getElementById('search');
const tagsEl = document.getElementById('tags')
const home = document.getElementById('h1')

const genres = [
    {
      "id": 28,
      "name": "Acción"
    },
    {
      "id": 12,
      "name": "Aventura"
    },
    {
      "id": 16,
      "name": "Animación"
    },
    {
      "id": 35,
      "name": "Comedia"
    },
    {
      "id": 80,
      "name": "Crimen"
    },
    {
      "id": 99,
      "name": "Documental"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Familiar"
    },
    {
      "id": 14,
      "name": "Fantasia"
    },
    {
      "id": 36,
      "name": "Historia"
    },
    {
      "id": 27,
      "name": "Terror"
    },
    {
      "id": 10402,
      "name": "Musica"
    },
    {
      "id": 9648,
      "name": "Misterio"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Ciencia Ficcion"
    },
    {
      "id": 10770,
      "name": "TV"
    },
    {
      "id": 53,
      "name": "Suspenso"
    },
    {
      "id": 10752,
      "name": "Guerra"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

let selectedGenre = []

setGenre();
  function setGenre(){
    tagsEl.innerHTML = '';
    genres.forEach(genre =>{
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id)
            }else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id, idx) =>{
                        if(id == genre.id){
                            selectedGenre.slice(idx, 1)
                        }
                    })
                }else{
                    selectedGenre.push(genre.id);
                }
            }
            getMovies(apiurl + '&with_genres=' + encodeURI(selectedGenre.join(',')))
            highlightGenre()
        })
        tagsEl.append(t);
    })
  }

function highlightGenre() {
   const tags =  document.querySelectorAll('.tag')
    tags.forEach(tag =>{
        tag.classList.remove('highlight')
    })
    clearBtn()
    if(selectedGenre.length !=0 )
    selectedGenre.forEach(id => {
        const highlightedTag = document.getElementById(id);
        highlightedTag.classList.add('highlight')
    })
}

function clearBtn(){
    let clearBtn = document.getElementById('clear')
    if(clearBtn){
        clearBtn.classList.add('highlight')
    }else{
    let clear = document.createElement('div');
    clear.classList.add('tag', 'highlight');
    clear.id='clear';
    clear.innerText = 'Clear';
    clear.addEventListener('click', () =>{
        selectedGenre = [];
        setGenre();
        getMovies(apiurl)
    })
    tagsEl.append(clear)
}

}

home.addEventListener('click', () =>{
    selectedGenre = [];
    setGenre();
    getMovies(apiurl)
}) 


getMovies(apiurl)

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        if (data.results.length !== 0) {
            showMovies(data.results)
        } else {
            main.innerHTML = `
            <h2 class="noResults"> No Results Found </h2>
            `
        }
    })
}



function showMovies(data){
main.innerHTML= '';
    data.forEach(movie => {
        const{title, poster_path, vote_average, overview} = movie
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${poster_path? imgurl + poster_path :  "http://via.placeholder.com/1080x1580" }" alt="${title}" >
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>${title}</h3>
            ${overview}
        </div>
        
        
        `
        main.appendChild(movieEl)
    });
}

function getColor(vote){
    if(vote >= 8){
        return 'green'
    }else if(vote>=5){
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const searchT = search.value;
    selectedGenre=[];
    setGenre();
    if(searchT){
        getMovies(searchurl + '&query=' + searchT)
    }else{
        getMovies(apiurl)
    }
})

