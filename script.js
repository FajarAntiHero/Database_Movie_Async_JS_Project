// WEB PROGRAMMING UNPAS, EPISODE Latihan Callback
// $('.search-button').on('click', function(){
//     $.ajax({
//         url: `http://www.omdbapi.com/?i=tt3896198&apikey=60b92240&s=${$('.input-keyword').val()}`,
//         success: results => {
//             const movies = results.Search;
//             console.log(movies)
//             let card = ``;
//             movies.forEach(element => {
//                 card += showCard(element)
//             });
//             $('.movie-container').html(card);
    
//             $('.modal-detail-button').on('click', function(){
//                 // console.log($(this).data('imdbid'))
//                 $.ajax({
//                     url: `http://www.omdbapi.com/?apikey=60b92240&i=${$(this).data('imdbid')}`,
//                     success: movieDetail => {
//                         const moviesModal = showMovieDetail(movieDetail)
//                             // console.log(movieDetail)
//                         $('.modal-content').html(moviesModal)
//                     },
//                     error: (results) => {
//                         console.log(results.responseText)
//                     },
//                 })
//             })
//         },
//         error: (results) => {
//             console.log(results.responseText)
//         },
    
//     })

// })

const SEARCHBUTTON = document.querySelector('.search-button')
const moviesContainerCard = document.querySelector('.movie-container');
SEARCHBUTTON.addEventListener('click', function(){
    const INPUTKEYWORD = document.querySelector('.input-keyword')
    moviesContainerCard.innerHTML = showPlaceholderCard()
    setTimeout(() => {
        fetch(`http://www.omdbapi.com/?apikey=60b92240&s=${INPUTKEYWORD.value}`)
            .then(response => response.json())
            .then((response) => {
                const moviesContainerData = response.Search;
                // console.log(moviesContainerData)
                let cards = '';
                moviesContainerData.forEach(element => {
                    cards += showCard(element)
                });
                moviesContainerCard.innerHTML = cards;
                
                const moviesDetailButton = document.querySelectorAll('.modal-detail-button') // -> declare after button card was created
                const movieDetailContainer = document.querySelector('.modal-content');
                // Show Movie Detail
                moviesDetailButton.forEach(data => {
                    data.addEventListener('click', function() {
                        movieDetailContainer.innerHTML = showPlaceholderModal()
                        const imdbID = this.dataset.imdbid;
                        setTimeout(() => {
                            fetch(`http://www.omdbapi.com/?apikey=60b92240&i=${imdbID}`)
                                .then(response => response.json())
                                .then(response => {
                                    console.log(response)
                                    const movieDetail = showMovieDetail(response)
                                    movieDetailContainer.innerHTML = movieDetail;
        
                                })
                        }, 2000);
                    })
                }) 
                
            })
    }, 2000);
})

function showCard(data){
    return `<div class="col-11 col-sm-11 col-md-4 col-lg-3 col-xl-3 col-xxl-3 h-auto g-0 d-flex justify-content-center mx-3 mb-3">
                <div class="card" style="width: 90%; padding: 20px 10px 20px 10px;">
                    <div style="width: 100%; height: auto; overflow: hidden;" >
                        <img src="${data.Poster}" class="card-img-top" style="width: 100%;">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${data.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${data.Year}</h6>
                        <a href="#" class="btn btn-primary btn-details modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetail" data-imdbid="${data.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`
}

function showMovieDetail(movieDetail){
    return `<div class="modal-header">
                <h5 class="modal-title fw-bold text-primary">${movieDetail.Title} (${movieDetail.Year})</h5>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-3 ">
                            <img src="${movieDetail.Poster}" alt="" class="img-fluid">
                        </div>
                        <div class="col  g-0">
                            <ul class="list-group">
                                <li class="list-group-item"><strong>Director : </strong>${movieDetail.Director}</li>
                                <li class="list-group-item"><strong>Actor : </strong>${movieDetail.Actors}</li>
                                <li class="list-group-item"><strong>Writer : </strong>${movieDetail.Writer}</li>
                                <li class="list-group-item"><strong>Plot : </strong> <br>${movieDetail.Plot}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>`;
}

function showPlaceholderModal(){
    return `<div class="modal-header">
                  <div class="modal-placeholder"></div>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-3 ">
                            <div class="modal-placeholder"></div>
                        </div>
                        <div class="col  g-0">
                            <ul class="list-group w-100">
                                <li class="list-group-item w-100"><div class="w-100 modal-placeholder"></div></li>
                                <li class="list-group-item w-100"><div class="w-100 modal-placeholder"></div></li>
                                <li class="list-group-item w-100"><div class="w-100 modal-placeholder"></div></li>
                                <li class="list-group-item w-100"><div class="w-100 modal-placeholder"></div></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>`
}

function showPlaceholderCard(){
    return `<div class="col-11 col-sm-11 col-md-4 col-lg-3 col-xl-3 col-xxl-3 g-0 d-flex justify-content-center mx-3 mb-3" style="height:50vh;">
                <div class="card" style="width: 90%; padding: 20px 10px 20px 10px;">
                  <div class="h-50 mb-3" style="width: 100%;" >
                    <div class="w-100 card-placeholder h-100"></div>
                  </div>
                  <div class="card-body p-0">
                      <div class="w-100 card-placeholder mb-2 h-25"></div>
                      <div class="w-100 card-placeholder mb-2 h-25"></div>
                      <div class="w-100 card-placeholder mb-2 h-25"></div>
                  </div>
                </div>
            </div>
            <div class="col-11 col-sm-11 col-md-4 col-lg-3 col-xl-3 col-xxl-3 g-0 d-flex justify-content-center mx-3 mb-3" style="height:50vh;">
                <div class="card" style="width: 90%; padding: 20px 10px 20px 10px;">
                  <div class="h-50 mb-3" style="width: 100%;" >
                    <div class="w-100 card-placeholder h-100"></div>
                  </div>
                  <div class="card-body p-0">
                      <div class="w-100 card-placeholder mb-2 h-25"></div>
                      <div class="w-100 card-placeholder mb-2 h-25"></div>
                      <div class="w-100 card-placeholder mb-2 h-25"></div>
                  </div>
                </div>
            </div>
            <div class="col-11 col-sm-11 col-md-4 col-lg-3 col-xl-3 col-xxl-3 g-0 d-flex justify-content-center mx-3 mb-3" style="height:50vh;">
                <div class="card" style="width: 90%; padding: 20px 10px 20px 10px;">
                  <div class="h-50 mb-3" style="width: 100%;" >
                    <div class="w-100 card-placeholder h-100"></div>
                  </div>
                  <div class="card-body p-0">
                      <div class="w-100 card-placeholder mb-2 h-25"></div>
                      <div class="w-100 card-placeholder mb-2 h-25"></div>
                      <div class="w-100 card-placeholder mb-2 h-25"></div>
                  </div>
                </div>
            </div>`
}