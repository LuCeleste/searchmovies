const apikey = `api_key=181c69466ca24b32232c10c5e8a93323`;
const base = 'https://api.themoviedb.org/3'
const apiurl = base + '/discover/movie?sort_by=popularity.desc&' + apikey;
const imgurl = 'https://image.tmdb.org/t/p/w500'
const main = document.getElementById('main');
const form = document.getElementById('form');
const search =document.getElementById('search');
const searchurl = base + '/search/movie?' + apikey


getMovies(apiurl)

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results)
    })
}

function showMovies(data){
main.innerHTML= '';
    data.forEach(movie => {
        const{title, poster_path, vote_average, overview} = movie
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${imgurl + poster_path}" alt="${title}" >
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
    if(searchT){
        getMovies(searchurl + '&query=' + searchT)
    }else{
        getMovies(apiurl)
    }
})