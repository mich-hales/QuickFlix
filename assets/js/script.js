// TO DO:
// readme file 
// presentation
// new name for application
// random generator for movie api



// When 'find me a movie button' is clicked, will get data from movie api and input into this function
function randomMovieOutput(movie) {
    // YouTube API key
    var youtubeApiKEy = 'AIzaSyD5JdQlIa-kgrfw-LaRZKnqT5QVKgtvt_o'
    console.log(movie)
        //  will get the user input when the item is searched for and add the word trailer to present trailers
        var userInput = movie + 'trailer';
        // arguments for the function videoSearch
        videoSearch(youtubeApiKEy, userInput, 3)
    }

    // function to take in arguments to put into the YouTube API to get results
    function videoSearch(key, search, maxResults) {
        // clears out old data
        $('#videos').empty();
        // requesting data from API with results that were chosen in the previous function
        $.get('https://www.googleapis.com/youtube/v3/search?key='+ key
        + '&type=video&part=snippet&maxResults=' + maxResults + '&q=' + search, function(data){
            console.log(data)
            // for each of the YouTube videos, will create an iframe element to display the video
            data.items.forEach(item => {
                video = `
                <iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                `
                // appends videos to page
                $('#videos').append(video);
            })
        })
    }


// javascript for localstorage to save favorite movies of choice to their watch list
const inputVal = document.querySelector('.userInput');
const addTaskBtn = document.querySelector('.addListBtn');

// will use local storage to take input 
function inputMovieVal(watchlist) {
    // takes the random movie and puts it into this function to give user an option if they want to add to their list
    inputVal.value = watchlist;
    addTaskBtn.addEventListener('click', function() {
        
        if (inputVal.value != 0) {
            let localItems = JSON.parse(localStorage.getItem('localItem'))
    
            if (localItems === null) {
                taskList = []
            } else {
                taskList = localItems;
            }
            taskList.push(inputVal.value)
            localStorage.setItem('localItem', JSON.stringify(taskList))
        }
        // calls the show list function
        showList();
        // resets input value 
        inputVal.value = '';
    })
}

// shows the items on the page
function showList() {
    let outPut = '';
    let taskListShow = document.querySelector('.watchListItem');  
    let localItems = JSON.parse(localStorage.getItem('localItem'));
    var taskList = [];
 
    if (localItems === null) {
        console.log('error')
    } else {
        taskList = localItems
        console.log('success')
    }

    // creates html for the data to be placed and also allows for the user to delete an item if wanted. Will call the deleteItem function to execute
    taskList.forEach((data, index) => {
        outPut += `
        <div class="moviesList">
            <p class="pText">${data}</p>
            <button class="deleteTask" onClick="deleteItem(${index})">x</button>
        </div>
        `
        console.log(data)
    });
    taskListShow.innerHTML = outPut;
    // inputVal.value = '';
}
showList();

// local storage
function deleteItem(index) {
    let localItems = JSON.parse(localStorage.getItem('localItem'))
    // will delete the items from the list when x is clicked
    taskList.splice(index, 1);
    localStorage.setItem('localItem', JSON.stringify(taskList));
    showList();
}

// calls clearTask function (which is called in html document) and will clear local storage and the list
function clearTask() {
    localStorage.clear();
    showList();
}


// declares variables 
var generateBtn = document.querySelector('.generateBtn');
var displayResults = document.querySelector('.display-results');


// when 'find me a movie' button is clicked, will generate movie for user
generateBtn.addEventListener('click', function() {
    // shows Movie Trailers section and Watch List
    displayResults.classList.remove('hide')

    fetch(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=0d83e0ad9f06857804273761b2c3701a&language=en-US&page=1"
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          var movieTitle = data.results[0].title;
          randomMovieOutput(movieTitle);
          console.log(data)
          inputMovieVal(movieTitle);
        });    
})
