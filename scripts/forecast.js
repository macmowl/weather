class Forecast {
    constructor() {
        this.key = 'YOehAJnEbrTXCbJeV7Z5kD749FOuf6BF';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
    }

    async updateCity(city) {
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails.Key);
        return { cityDetails, weather };
    }

    async getCity(city) {
        const query =`?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0];
    };

    async getWeather(locationKey) {
        const query = `${locationKey}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    };
}



