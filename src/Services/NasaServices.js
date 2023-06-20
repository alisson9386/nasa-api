import axios from 'axios';

const BASE_URL = "https://api.nasa.gov/";
const API_KEY = process.env.REACT_APP_API_KEY;

class NasaServices{

    nearbyAsteroids(startDate, endDate){
        let urlNearbyAsteroids = BASE_URL + "neo/rest/v1/feed?start_date=" + startDate + "&end_date=" + endDate + "&api_key=" +  API_KEY;
        return axios.get(urlNearbyAsteroids);
    }

    imageDay(){
        return axios.get(BASE_URL + "planetary/apod?api_key=" + API_KEY);
    }

    marsRover(date){
        let urlMarsRover = BASE_URL + "mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + date + "&api_key=" + API_KEY;
        return axios.get(urlMarsRover);
    }

}
// eslint-disable-next-line import/no-anonymous-default-export
export default new NasaServices()