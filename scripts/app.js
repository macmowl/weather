const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {

    // const cityDets = data.cityDetails;
    // const weather = data.weather;

    // on destructure les 2 lignes ci-dessus. Ca fait la meme chose mais en moins de ligne.
    const { cityDetails, weather } = data;

    // update details UI
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.LocalizedName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update night&day and icons.

    const timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // check if display none

    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
}

cityForm.addEventListener('submit', e => {

    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the UI with new City
    forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    //on stock dans LocalStorage la dernière ville valide
    localStorage.setItem('city', city);
    
})

// on page load, check if city stored.

if (localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}