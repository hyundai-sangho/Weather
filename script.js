let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");

// API의 날씨 세부 사항을 가져와 표시하는 기능
let getWeather = async () => {
  let cityValue = cityRef.value;

  // 입력 필드가 비어있는 경우
  if (cityValue.length == 0) {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
  } else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;

    await fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        result.innerHTML = `
        <h2>${data.name}</h2>
        <h4 class="weather">${data.weather[0].main}</h4>
        <h4 class="desc">${data.weather[0].description}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="날씨 아이콘" />
        <h1>${data.main.temp} &#176;</h1>
        <div class="temp-container">
          <div>
            <h4 class="title">min</h4>
            <h4 class="temp">${data.main.temp_min}</h4>
          </div>
          <div>
            <h4 class="title">max</h4>
            <h4 class="temp">${data.main.temp_max}</h4>
          </div>
        </div>
        `;
      })
      // 도시 이름이 유효하지 않은 경우
      .catch(() => {
        result.innerHTML = `<h3 class="msg">City not found</h3>`;
      });

    // 인풋창의 값 제거하기
    cityRef.value = "";
  }
};

searchBtn.addEventListener("click", getWeather);
cityRef.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    getWeather();
  }
});
