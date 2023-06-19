import { Component } from "react";
import NasaServices from "../Services/NasaServices";
import Swal from 'sweetalert2';
import Badge from 'react-bootstrap/Badge';

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
                    text: "Busca permitida somente para até 8 dias contando o dia inicial e final",
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
            asteroidsArray:[],
            days: 0,
            countDays: 0,
            asteroids: 0,
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
        this.changeDays();
        this.changeAsteroids();
    }

    changeDays = () => {
        const daysCount = this.state.asteroids;
        const arraysNoObjeto = Object.values(daysCount).filter(item => Array.isArray(item));
        this.setState({days: arraysNoObjeto.length, countDays: 0 });
        const interval = setInterval(() => {
            if (this.state.countDays === arraysNoObjeto.length) {
              clearInterval(interval);
            } else {
              this.setState((prevState) => ({
                countDays: prevState.countDays + 1
              }));
            }
          }, 50);
    }

    changeAsteroids = () => {
        const asteroidsCount = this.state.asteroids;
        const arraysNoObjeto = Object.values(asteroidsCount).filter(item => Array.isArray(item));
        var totalAsteroids = 0;
        arraysNoObjeto.forEach((asteroids) => {
            totalAsteroids += asteroids.length;
        });
        this.setState({asteroids: totalAsteroids, countAsteroids: 0});
        const interval = setInterval(() => {
            if (this.state.countAsteroids === totalAsteroids) {
              clearInterval(interval);
            } else {
              this.setState((prevState) => ({
                countAsteroids: prevState.countAsteroids + 1
              }));
            }
          }, 5);
    }

    handlerSubmit = () =>{
        this.showLoading('Buscando Asteroides');
        let startDate = this.state.startDate;
        let endDate = this.state.endDate;

        NasaServices.nearbyAsteroids(startDate, endDate).then((res) =>{
            console.log(res.data)
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
            startDate: '',
            endDate: '',
            asteroidsArray:[],
            days: 0,
            countDays: 0,
            asteroids: 0,
            countAsteroids: 0
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
        <p>Máximo 8 dias</p>
        </div>
    </div>
    <div className="containerData">
        <div className="row">
            <div className="col-sm-4">
                <h6>Dias</h6>
                <label><Badge variant="primary">{this.state.countDays}</Badge></label>
            </div>
            <div className="col-sm-4">
                <h6>N° asteróides encontrados</h6>
                <label><Badge variant="primary">{this.state.countAsteroids}</Badge></label>
            </div>
            <div className="col-sm-4">
                <h6>N° asteróides encontrados</h6>
                <label><Badge variant="primary">{this.state.countAsteroids}</Badge></label>
            </div>
        </div>
        <br/><br/><br/><br/>
        <table className="table table-striped table-bordered text-center">
                        <thead>
                            <tr>
                                <th><h6>Dias</h6></th>
                                <th>Número de asteróides encontrados</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Badge variant="primary">{this.state.countDays}</Badge></td>
                                <td><Badge variant="primary">{this.state.countAsteroids}</Badge></td>
                            </tr>
                        </tbody>
                    </table>
    </div>
    </div>
	)
}
}

export default NearbyAsteroids;