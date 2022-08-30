const inputVal = document.querySelector(".userInput");
const addTaskBtn = document.querySelector(".addListBtn");
const movieButton = document.querySelector("#random-movie");

var inputForm = document.querySelector("#input-form");

// using jquery to get api data and display a movie trailer based on input
function randomMovieOutput(movie) {
  var youtubeApiKEy = "AIzaSyD5JdQlIa-kgrfw-LaRZKnqT5QVKgtvt_o";
  var video = "";

  $("#yt-player").submit(function (event) {
    event.preventDefault();

    //  will get the user input when the item is searched for and add the word trailer to present trailers
    var userInput = movie + "trailer";
    // $('#search').val()

    videoSearch(youtubeApiKEy, userInput, 5);
  });

  function videoSearch(key, search, maxResults) {
    // clears out old data
    $("#videos").empty();

    $.get(
      "https://www.googleapis.com/youtube/v3/search?key=" +
        key +
        "&type=video&part=snippet&maxResults=" +
        maxResults +
        "&q=" +
        search,
      function (data) {
        console.log(data);

        data.items.forEach((item) => {
          video = `
                <iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                `;
          $("#videos").append(video);
        });
      }
    );
  }
}

// randomMovieOutput();

// local storage for random movie output -- will chose another if the same
// storage -- stores movie ideas to a list?
// add movies they want to watch to a list
// readme file
// presentation
// new name -- preview

// javascript for localstorage to save favorite movies of choice to their watch list

addTaskBtn.addEventListener("click", function () {
  if (inputVal.value != 0) {
    let localItems = JSON.parse(localStorage.getItem("localItem"));

    if (localItems === null) {
      taskList = [];
    } else {
      taskList = localItems;
    }
    taskList.push(inputVal.value);
    localStorage.setItem("localItem", JSON.stringify(taskList));
  }
  showList();
});

function showList() {
  let outPut = "";
  let taskListShow = document.querySelector(".watchListItem");
  let localItems = JSON.parse(localStorage.getItem("localItem"));
  var taskList = [];

  if (localItems === null) {
    console.log("error");
  } else {
    taskList = localItems;
    console.log("success");
  }

  taskList.forEach((data, index) => {
    outPut += `
        <div class="moviesList">
            <p class="pText">${data}</p>
            <button class="deleteTask" onClick="deleteItem(${index})">x</button>
        </div>
        `;
    console.log(data);
  });
  taskListShow.innerHTML = outPut;
  inputVal.value = "";
}
showList();

function deleteItem(index) {
  let localItems = JSON.parse(localStorage.getItem("localItem"));
  taskList.splice(index, 1);
  localStorage.setItem("localItem", JSON.stringify(taskList));
  showList();
}

function clearTask() {
  localStorage.clear();
  showList();
}

function chooseMovie() {
  fetch(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=0d83e0ad9f06857804273761b2c3701a&language=en-US&page=1&poster_path"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      var x = Math.floor(Math.random() * data.results.length);
      var movieTitle = data.results[x].title;
      var moviePoster = data.results[x].poster_path;

      console.log("Movie title: " + movieTitle);
      console.log(data);
      //use data.results[x].posterpath and append the value onto the end of https://image.tmdb.org/t/p/original/
      randomMovieOutput(movieTitle);
      document
        .querySelector("#movie-poster")
        .setAttribute(
          "src",
          "https://image.tmdb.org/t/p/original/" + moviePoster
        );

      inputVal.value = movieTitle;
    });
}

//add current title to watchlist
//make the random movie button actually do something
movieButton.addEventListener("click", chooseMovie());
//display movie poster and/or title of retrieved random movie as text
//prevent retrieving the same movie title again
//