window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let locationIcon = document.querySelector('.weather-icon');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

//if this exists in the browser, then find exact position of user
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=80de077a204b3f1c959c8931a0a03ca2`;

        fetch(api)
        //after u get info, it runs
        .then(response => {
            return response.json();
        })
        .then(data => {
            const {temp} = data.main;
            const {description} = data.weather[0];
            const {icon} = data.weather[0];
            const {name} = data;
            //set DOM elements from the API
            temperatureDegree.textContent = temp;
            temperatureDescription.textContent = description;
            locationTimezone.textContent = data.name;
            //Formula for CELCIUS
            let celsius = (temp - 32) * (5 / 9);

            // Set Icon
            locationIcon.innerHTML = `<img src="img/icons/${icon}.png">`;

            //change temperature to Celcius/Farenheit
            temperatureSection.addEventListener('click', () =>{
                if (temperatureSpan.textContent === "F"){
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = Math.floor(celsius);
                }else{
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = temp;
                }
            });
        });
    });
    }

});

// DOM Elements
const time = document.getElementById('time'),
greeting = document.getElementById('greeting'),
name = document.getElementById('name'),
goal = document.getElementById('goal');

//Options
const showAmPm = true;

//show time
function showTime() {
    let today = new Date (),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

//Set AM or PM
const amPm = hour >= 12 ? 'PM' : 'AM';

//12hr Format
hour = hour % 12 || 12;

//Output Time
time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}
${showAmPm ? amPm : ''}`;
setTimeout(showTime, 1000);
}

//Add Zeros
function addZero(n){
    return(parseInt(n,10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
    let today = new Date(),
    hour=today.getHours();

    if (hour < 12) {
        //Morning
        document.body.style.backgroundImage = "url('./img/morning.jpg')";
        greeting.textContent = 'Good Morning';
        document.body.style.color = 'white';
    } else if (hour < 18) {
        //Afternoon
        document.body.style.backgroundImage = "url('./img/afternoon.jpg')";
        greeting.textContent = 'Good Afternoon';
        document.body.style.color = 'white';
    } else {
        //Evening
        document.body.style.backgroundImage = "url('./img/night.jpg')";
        greeting.textContent = 'Good Evening';
        document.body.style.color = 'white';
    }
}

//Get name
function getName(){
    if(localStorage.getItem('name') === null){
        name.textContent = '[Enter Name]';
    } else {
        name.textContent= localStorage.getItem('name');
    }
}

//Set name
function setName(e) {
    if(e.type === 'keypress') {
        //Make sure enter is pressed
        if(e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
}

//Get focus
function getGoal(){
    if(localStorage.getItem('goal')=== null){
        goal.textContent = '[Enter Goal]';
    } else {
        goal.textContent= localStorage.getItem('goal');
    }
}

//Set Focus
function setGoal(e) {
    if(e.type === 'keypress') {
        //Make sure enter is pressed
        if(e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('goal', e.target.innerText);
            goal.blur();
        }
    } else {
        localStorage.setItem('goal', e.target.innerText);
    }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
goal.addEventListener('keypress', setGoal);
goal.addEventListener('blur', setGoal);


//run
showTime();
setBgGreet();
getName();
getGoal();