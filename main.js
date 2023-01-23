const apiKey = '35042cb8e6d94fc992494545232201 ';

// получение места из инпта
const form = document.getElementById('form');
const input = document.querySelector('#input');
const header = document.querySelector('.header')
let city;

function removeCard(){
    const card = document.querySelector('.card');
    if ( card) card.remove();
};
function showError(data){
    const html = `
    <div class="card">
       <div class="card-description">${data.error.message}</div>
    </div>
    `;
    // отображение на странице. Помещается сразу после хедера
    header.insertAdjacentHTML("afterend", html) ;
}
function showWeather(data){
    const html = `
    <div class="card">
        <h2 class="card-city">${data.location.name}<span>${data.location.country}</span></h2>

        <div class="card-weather">
            <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
            <img class="card-img" src="./img/example.png" alt="Weather">
        </div>

        <div class="card-description">${data.current.condition.text}</div>
    </div>
    `;
    // отображение на странице. Помещается сразу после хедера
    header.insertAdjacentHTML("afterend", html) ;
}

async function getWeather (city){
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;

    // проверка на ошибку
    // if (data.error) {
    //     // удаление предыдущей карточки если есть
    //       removeCard();
    //       showError(data);
    //   }
    //   else{
          
    //   // отображение полученных данных на странице
    //   // удаление предыдущей карточки если есть
    //    removeCard()
    //   // отобразить карточку
    //   showWeather(data)
    //   }
     

}

// прослушка отправки формы
form.onsubmit = async function (event) {
    event.preventDefault();
    // значение из инпута без пробелов
    city = input.value.trim();
    // получаем данные с сервера
    const data = await getWeather(city);

        // проверка на ошибку
        if (data.error) {
          // удаление предыдущей карточки если есть
            removeCard();
            showError(data);
        }
        else{
            
        // отображение полученных данных на странице
        // удаление предыдущей карточки если есть
         removeCard()
        // отобразить карточку
        showWeather(data)
        }
       console.log(data);

    }



