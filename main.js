const apiKey = '35042cb8e6d94fc992494545232201 ';






// получение места из инпта
const form = document.getElementById('form');
const input = document.querySelector('#input');
const header = document.querySelector('.header')
let city;

// прослушка отправки формы
form.onsubmit = function (event) {
    event.preventDefault();
    // значение из инпута без пробелов
    city = input.value.trim();
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
// запрос на сервер
    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {
        // проверка на ошибку
        if (data.error) {
          // удаление предыдущей карточки если есть
                const card = document.querySelector('.card');
                if ( card) card.remove();

                const html = 
                `
                <div class="card">
                   
                    <div class="card-description">${data.error.message}</div>
                </div>
                `;
            // отображение на странице. Помещается сразу после хедера
            header.insertAdjacentHTML("afterend", html) ;
        }
        else{
            
        // отображение полученных данных на странице
        // удаление предыдущей карточки если есть
        const card = document.querySelector('.card');
        if ( card) card.remove();

        // разметка карточки
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


        console.log(data);

    })
}


