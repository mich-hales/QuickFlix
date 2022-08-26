fetch(
  "https://api.themoviedb.org/3/movie/upcoming?api_key=0d83e0ad9f06857804273761b2c3701a&language=en-US&page=1"
)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    var movieTitle = data.results[0].title;
    randomMovieOutput(movieTitle);
  });
