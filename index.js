let cityTemperatures = [];


function convertTemperature() {


    let unit = document.getElementById("unit").value;
    let tempValue = parseFloat(document.getElementById("temper").value);


    let celsius, fahrenheit, kelvin;

    if (unit === "celsius") {
        celsius = tempValue;
        fahrenheit = (celsius * 9 / 5) + 32;
        kelvin = celsius + 273.15;
    } else if (unit === "fahrenheit") {
        fahrenheit = tempValue;
        celsius = (fahrenheit - 32) * 5 / 9;
        kelvin = celsius + 273.15;
    } else if (unit === "kelvin") {
        if(tempValue<0){
            alert("Enter a valid value");
            return;
        }
        kelvin = tempValue;
        celsius = kelvin - 273.15;
        fahrenheit = (celsius * 9 / 5) + 32;
    }

    document.getElementById("resultBox").style.display = "block";
    document.getElementById("result").innerHTML = `
        <strong>Celsius:</strong> ${celsius.toFixed(2)}°C <br>
        <strong>Fahrenheit:</strong> ${fahrenheit.toFixed(2)}°F <br>
        <strong>Kelvin:</strong> ${kelvin.toFixed(2)}K
    `;

    changeBackground(celsius);
};


function getTemperature() {
    let cityValue = document.getElementById("city").value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=e26287ebe9ee85979fc416e35b331201
`).then(response => response.json())
        .then((data) => {
            console.log(data);
            cityTemperatures.push([cityValue, data.main.temp_min, data.main.temp_max]);
            document.getElementById("cityResultBox").style.display = "block";
            document.getElementById("cityResult").innerHTML = `
        <strong>Celsius:</strong> ${(data.main.temp).toFixed(2)}°C <br>
        <strong>Fahrenheit:</strong> ${((data.main.temp * 9 / 5) + 32).toFixed(2)}°F <br>
        <strong>Kelvin:</strong> ${(data.main.temp + 273.15).toFixed(2)}K
    `;
            changeBackground(data.main.temp);
            drawMultSeries();
        }).catch(err => alert('Wrong City name'));
}



function changeBackground(tempCelsius) {
    let body = document.body;
    let sunShine = document.getElementById("sunShine");
 
    let gradient = "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)";
 
    if (tempCelsius >= 20 && tempCelsius <= 30) {
        gradient = "linear-gradient(90deg, #fcff9e 0%, #c67700 100%)";
        sunShine.style.display = "none";
        removeSnow();
    } else if (tempCelsius > 30) {
        gradient = "linear-gradient(0deg, rgba(253,26,7,1) 0%, rgb(223, 170, 53) 100%)";
        sunShine.style.display = "block";
        sunShine.style.animation = "moveDown 3s ease-out forwards, spin 4s linear infinite";
        removeSnow();
    } else {
        gradient = "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)";
        sunShine.style.display = "none";
        createSnow();
    }
 
    body.style.transition = "background 2.5s ease-in-out";
    body.style.background = gradient;
}
 
function createSnow() {
    let body = document.body;
    for (let i = 0; i < 50; i++) {
        let snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
        snowflake.style.opacity = Math.random();
        body.appendChild(snowflake);
    }
}

function removeSnow() {
    let snowflakes = document.querySelectorAll('.snowflake');
    snowflakes.forEach(snowflake => snowflake.remove());
}


function tabChange(tabName) {
    document.querySelectorAll(".tabContainer button").forEach(button => {
        button.classList.remove("tabActive");
    });
    document.querySelectorAll(".tabContent, .tabContentAct").forEach(tab => {
        tab.classList.remove("tabContentAct");
        tab.classList.add("tabContent");
    });
    document.getElementById(tabName).classList.add("tabContentAct");
    document.querySelector(`[onclick="tabChange('${tabName}')"]`).classList.add("tabActive");
    const sun = document.getElementById("sunShine");
    if (tabName === "cityTemp") {
        sun.style.display = "none";
        document.body.style.transition = "background 2s ease-in-out";
        document.body.style.background = "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)";
    } else {
        sun.style.display = "none";
        document.body.style.transition = "background 2s ease-in-out";
        document.body.style.background = "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)";
    }
}



