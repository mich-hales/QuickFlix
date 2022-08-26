var inputForm = document.querySelector('#input-form');




$(document).ready(function() {
    var youtubeApiKEy = 'AIzaSyD5JdQlIa-kgrfw-LaRZKnqT5QVKgtvt_o'
    var video = '';

    $('#yt-player').submit(function(event) {
        event.preventDefault();
   
        //  will get the user input when the item is searched for and add the word trailer to present trailers
        var userInput = $('#search').val() + 'trailer';

        videoSearch(youtubeApiKEy, userInput, 5)
    })

    function videoSearch(key, search, maxResults) {
        // clears out old data
        $('#videos').empty();

        $.get('https://www.googleapis.com/youtube/v3/search?key='+ key
        + '&type=video&part=snippet&maxResults=' + maxResults + '&q=' + search, function(data){
            console.log(data)

            data.items.forEach(item => {
                video = `
                <iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                `
                $('#videos').append(video);
            })
        })
    }
})

// local storage for random movie output -- will chose another if the same
// storage -- stores movie ideas to a list? 
// add movies they want to watch to a list 
// readme file 
// presentation
// new name -- preview


const inputVal = document.querySelector('.inputVal');
const addTaskBtn = document.querySelector('.addListBtn');
// const watchList = document.querySelector('.watchList');
// const watchListItem = document.querySelector('.watchListItem');

addTaskBtn.addEventListener('click', () => {
    if(inputVal.value != 0) {
        let localItems = JSON.parse(localStorage.getItem('localItem'))

        if (localItems === null) {
            taskList = []
        } else {
            taskList = localItems;
        }
        taskList.push(inputVal.value)
        localStorage.setItem('localItem', JSON.stringify(taskList))
    }
    showList();
})


function showList() {
    let outPut = '';
    let taskListShow = document.querySelector('.watchListItem');  
    let localItems = JSON.parse(localStorage.getItem('localItem'))

    if (localItems === null) {
        taskList = []
    } else {
        taskList = localItems;
    }
    taskList.forEach((data, index) => {
        outPut += `
        <div class="theMoviesList">
            <p class="pText">${data}</p>
            <button class="deleteTask" onClick="deleteItem(${index})">x</button>
        </div>
        `
    });
    taskListShow.innerHTML = outPut;
}
showList();


function deleteItem(index) {
    let localItems = JSON.parse(localStorage.getItem('localItem'))
    taskList.splice(index, 1);
    localStorage.setItem('localItem', JSON.stringify(taskList));
    showList();
}

function clearTask() {
    localStorage.clear();
    showList();
}

