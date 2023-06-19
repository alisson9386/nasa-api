import axios from 'axios';

const USUARIO_API_BASE_URL = "https://api.nasa.gov/";
const API_KEY = process.env.REACT_APP_API_KEY;

class NasaServices{

    nearbyAsteroids(startDate, endDate){
        let urlNearbyAsteroids = USUARIO_API_BASE_URL + "neo/rest/v1/feed?start_date=" + startDate + "&end_date=" + endDate + "&api_key=" +  API_KEY;
        return axios.get(urlNearbyAsteroids);
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new NasaServices()