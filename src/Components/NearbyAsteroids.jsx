import { Component } from "react";
import NasaServices from "../Services/NasaServices";
import Swal from 'sweetalert2';

class NearbyAsteroids extends Component {

    showLoading = (text) => {
        Swal.fire({
            title: 'Aguarde !',
            html: text,// add html attribute if you want or remove
            allowOutsideClick: false,
            allowEscapeKey: false,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
            },
        });
    }

    showAlertErrorSearch = () => {
        Swal.fire({
                    icon: 'error',
					title: 'Erro ao buscar asteroids!',
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 3000 
						})	
                        return;
    }

    constructor(props){
        super(props)
        this.state= {
            startDate: '',
            endDate: '',
            asteroids:[],
            days: 0,
            countAsteroids: 0
        }
        this.changeStartDateHandler = this.changeStartDateHandler.bind(this);
        this.changeEndDateHandler = this.changeEndDateHandler.bind(this);
    }

    changeStartDateHandler= (event) => {
        this.setState({startDate: event.target.value});
    }

    changeEndDateHandler= (event) => {
        this.setState({endDate: event.target.value});
    }

    setAsteroidsConst = (daysAsteroids) =>{
        // eslint-disable-next-line
        this.state.asteroids = daysAsteroids;
        this.changeDatas(daysAsteroids)
    }

    changeDatas = (daysAsteroids) =>{
        console.log(daysAsteroids)
        let daysCount = daysAsteroids.filter(x => x !== "").lenght;
        console.log(daysCount)

    }

    handlerSubmit = () =>{
        this.showLoading('Buscando Asteroides');
        let startDate = this.state.startDate;
        let endDate = this.state.endDate;

        NasaServices.nearbyAsteroids(startDate, endDate).then((res) =>{
            let daysAsteroids = res.data.near_earth_objects;
            this.setAsteroidsConst(daysAsteroids);
            Swal.close();
        }).catch(error => {
            Swal.close();
            this.showAlertErrorSearch();
            console.log(error);
          });

    }



    handleClearFields = () => {
        this.setState({
            startDate: "",
            endDate: "",
        });
      }

render() {
	return (
        <div>
        <div className='parent'>
        <div className='formAsteroids'>
        <form>
            <div>
            <br/><br/>
            <label htmlFor="data" className="label-with-spacing">Data Inicial:</label>
                <input
                    type="date"
                    name="startDate"
                    value={this.state.startDate}
                    onChange={this.changeStartDateHandler}
                />
                <label htmlFor="data" className="label-with-spacing">Data Final:</label>
                <input
                    type="date"
                    name="endDate"
                    value={this.state.endDate}
                    onChange={this.changeEndDateHandler}
                />
                <button type="button" className="btn btn-primary mr-2" onClick={this.handlerSubmit}>Buscar</button>
                <button type="button" className="btn btn-secondary ml-2" onClick={this.handleClearFields}>Limpar</button>
            </div>
            <br/>
        </form>
        <p>Máximo 7 dias de diferença</p>
        </div>
    </div>
    <div className="container">
        <h6>Dias selecionados</h6>
        <label value={this.state.days}></label>
    </div>
    </div>
	)
}
}

export default NearbyAsteroids;