var inputForm = document.querySelector('#input-form');
var key = 'fTuNIcv1ybxefwYo_uLu0rfDNfkG5iNUEnESFcFeJPywZwQXlax6XeBqaQ0g9MnFtfS-beghCMtTzuWBKrB9Cn-sRrfV9yn2bIGptKYTtXC2A5Gx6k5u0EDMSM8GY3Yx'
  

var getRequest = 'https://thingproxy.freeboard.io/fetch/https://api.yelp.com/v3/businesses/search&key=fTuNIcv1ybxefwYo_uLu0rfDNfkG5iNUEnESFcFeJPywZwQXlax6XeBqaQ0g9MnFtfS-beghCMtTzuWBKrB9Cn-sRrfV9yn2bIGptKYTtXC2A5Gx6k5u0EDMSM8GY3Yx'



// var apiUrl = 'https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972'

// fetch(apiUrl).then(function (response) {
//     response.json().then(function(data) {
//         console.log(data);
//     })
// })



var openTableApi = 'https://opentable.herokuapp.com/api'

inputForm.addEventListener('click', function() {
    fetch(openTableApi)
    .then(res => {
        return res.json()
    })
    .then(data => console.log(data))
    .catch(error => console.log('error'));
})

// $('#input-form').click(function(){
//     $.get(apiUrl, function(data, response){
//       console.log(data, response);
//    });
//   });


 
