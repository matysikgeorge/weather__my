const API = "";  // API Key - именно API ключ вставь его для работы
const mainWeatherNode = document.querySelector(".main__weather");

//- отправить асинхронный запрос (название города)
async function getCity(cityName) {
  const geo = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=ru&units=metric&appid=${API}`
  );
  const data = await geo.json();
  try {
    showCityWeather(data);
  } catch (error) {
    console.log(error);
    showErrorScreen();
  }
}

// - проверка когда пользователь не передает свои координаты
if (!navigator.geolocation.coords) {
  getIp();
}

async function getIp() {
  let myGeo = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_tAopj2SwvmNEcedYz2oqwnUBIna3S`
  );
  const myData = await myGeo.json();
  console.log(myData);

  getLatLonWeather(myData.location.lat, myData.location.lng);
}


function getLatLonWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&lang=ru&appid=${API}`
  )
    .then((res) => res.json())
    .then((res) => showCityWeather(res))
    .catch((err) => console.log(err));
}


//- отправить асинхронный запрос(геопозиция)
async function getLocation({ coords }) {
  console.log(coords.latitude);
  const { latitude, longitude } = coords;
  const geolocation = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=ru&appid=${API}`
  );
  const geoData = await geolocation.json();
  showCityWeather(geoData);
  getLatLonWeather(lat, lon);
}

setTimeout(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    getLocation(position);
  });
}, 700);

//- Создание шаблона для первого экрана погоды
function showCityWeather(obj) {
  mainWeatherNode.innerHTML = ""; //
  console.log(obj);
  const firstScreen = document.createElement("div");
  firstScreen.className = "main__result__weather";
  firstScreen.innerHTML = `<p class="main__weather__degrees">${Math.round(
    obj.main.temp
  )}℃</p>
   <p class="main__weather__description">${obj.weather[0].description}</p>
            <p class="main__weather__in__city">${obj.name}</p>
            <button class="main__button__change__city">Поменять город</button>`;
  mainWeatherNode.append(firstScreen);
  const changeCityButton = mainWeatherNode.querySelector(
    ".main__button__change__city"
  );

  changeCityButton.addEventListener("click", () => {
    showFormFindCity();
  });
}

// //- Создание шаблона для второго экрана погоды
function showFormFindCity() {
  mainWeatherNode.innerHTML = ""; // - помогает нам очистить страницу и наполнить ее содержимым заново
  const secondScreen = document.createElement("div"); // - создаем переменную отображения второго экрана
  secondScreen.className = "main__city__search"; // - называем класс переменной
  secondScreen.innerHTML = `<form class="main__form">
  <input
              class="main__city__input"
              type="text"
              placeholder="Введите город здесь"
            />
            <button class="main__find__city__button button">Найти</button>
           </form>`; // - наполняем div, создаем структуру
  mainWeatherNode.append(secondScreen); // - происходит отображение содержимого div
  const buttonFindCity = secondScreen.querySelector(
    ".main__find__city__button" // - через div дотягиваюсь до класса кнопки
  );
  const mainInputCity = secondScreen.querySelector(".main__city__input"); // - создаем переменную и дотягиваемся до класса поля ввода

  buttonFindCity.addEventListener("click", (event) => {
    event.preventDefault(); // - метод при котором мы отменяем автоматическое поведение, а именно перезагрузку страницы при отправке формы
    console.log(mainInputCity.value);
    getCity(mainInputCity.value);
    // showErrorScreen()
    // console.log(city(mainInputCity.value));
    // let data = city(mainInputCity.value)

    // showCityWeather(data);  // вместо render 1 го экрана прописать render 3 го экрана,
  });
}

// //- Создание шаблона для третьего экрана погоды
function showErrorScreen() {
  mainWeatherNode.innerHTML = "";
  const thirdScreen = document.createElement("div");
  thirdScreen.className = "main__city__error";
  thirdScreen.innerHTML = `<p class="main__error__text">Упс. Что-то пошло не так</p>
            <p class="main__error__info">Информация об ошибке</p>
            <button class="main__try__again__button button">Попробуйте еще раз</button>`;
  mainWeatherNode.append(thirdScreen);
  const buttonTryAgain = thirdScreen.querySelector(".main__try__again__button");
  const mainErrorText = thirdScreen.querySelector(".main__error__text");

  buttonTryAgain.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(mainErrorText.value);
    // showCityWeather();  // вместо render 1 го экрана прописать render 3 го экрана,
    showFormFindCity();
  });
}
