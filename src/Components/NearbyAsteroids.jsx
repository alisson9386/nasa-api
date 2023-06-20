import { Component } from "react";
import NasaServices from "../Services/NasaServices";
import Swal from 'sweetalert2';
import Badge from 'react-bootstrap/Badge';
import { format, parseISO } from 'date-fns';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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
            showModal: false,
            dataModal:{},
            startDate: '',
            endDate: '',
            asteroidsForDayArray:[],
            countAsteroidsForDay:{},
            days: 0,
            countDays: 0,
            asteroids: 0,
            asteroidsCount: 0,
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

    handleClose = () => {
        this.setState({showModal: false});
        this.setState({dataModal: {}});
    }

    //Abre o modal dos termos
    handleShow  = (data) => {
        this.showLoading('Carregando!');
        const [dia, mes, ano] = data.split('/'); // Divide a string da data em dia, mês e ano
        const formattedDate = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
        const asteroids = this.state.asteroids;
        const asteroidsDay = asteroids[formattedDate];
        // eslint-disable-next-line
        this.state.dataModal = asteroidsDay;
        Swal.close();
        this.setState({showModal: true});
    }

    setAsteroidsConst = (daysAsteroids) =>{
        // eslint-disable-next-line
        this.state.asteroids = daysAsteroids;
        const asteroidsCount = daysAsteroids;
        const arraysNoObjeto = Object.values(asteroidsCount).filter(item => Array.isArray(item));
        this.changeDays(arraysNoObjeto);
        this.changeAsteroids(arraysNoObjeto);
        this.changeTables();
        console.log(this.state)
    }

    changeDays = (arraysNoObjeto) => {
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

    changeAsteroids = (arraysNoObjeto) => {
        var totalAsteroids = 0;
        arraysNoObjeto.forEach((asteroids) => {
            totalAsteroids += asteroids.length;
        });
        this.setState({asteroidsCount: totalAsteroids, countAsteroids: 0});
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

    changeTables = () => {
        const asteroids = this.state.asteroids
        var countAsteroidsForDay = {};
        Object.keys(asteroids).forEach((data) => {
            const formattedDate = format(parseISO(data), 'dd/MM/yyyy');
            countAsteroidsForDay[formattedDate] = asteroids[data].length;
        });
        // eslint-disable-next-line
        this.state.countAsteroidsForDay = countAsteroidsForDay;
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
            Swal.close(error);
            this.showAlertErrorSearch();
          });

    }

    handleClearFields = () => {
        this.setState({
            showModal: false,
            dataModal:{},
            startDate: '',
            endDate: '',
            asteroidsForDayArray:[],
            countAsteroidsForDay:{},
            days: 0,
            countDays: 0,
            asteroids: 0,
            asteroidsCount: 0,
            countAsteroids: 0
        });
      }

render() {
	return (
        <div>
        <div className='parent'>
        <div className='formAsteroids'><br/>
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
            <div className="col-sm-5">
                <h6>Dias</h6>
                <label><Badge variant="primary">{this.state.countDays}</Badge></label>
            </div>
            <div className="col-sm-5">
                <h6>N° asteróides encontrados</h6>
                <label><Badge variant="primary">{this.state.countAsteroids}</Badge></label>
            </div>
        </div>
        <br/><br/><br/><br/>
            <table className="table table-striped table-bordered text-center">
                <thead>
                    <tr>
                        <th><h6>Dia</h6></th>
                        <th>N° asteróides encontrados</th>
                    </tr>
                </thead>
                <tbody>
                {Object.entries(this.state.countAsteroidsForDay).map(([data, count]) => (
                    <tr key={data}>
                        <td><Button onClick={() => this.handleShow(data)}>{data}</Button></td>
                        <td><Badge variant="primary">{count}</Badge></td>
                    </tr>
                ))}
                </tbody>
            </table>

    <>
    <Modal className='modal modal-lg' show={this.state.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Dados do dia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <table className="table table-striped table-bordered text-center">
                <thead>
                    <tr>
                        <th>Nome do asteroide</th>
                        <th>Magnitude absoluta</th>
                        <th>Diâmetro máximo estimado (em metros)</th>
                        <th>Potencialmente perigoso</th>
                    </tr>
                </thead>
                <tbody>
                {Object.entries(this.state.dataModal).map(([map, data]) => (
                    <tr key={map}>
                        <td>{data.id + ' ' + data.name}</td>
                        <td>{data.absolute_magnitude_h} h</td>
                        <td>{data.estimated_diameter.meters.estimated_diameter_min.toFixed(2)} m</td>
                        <td>{data.is_potentially_hazardous_asteroid ? 'Sim': 'Não'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>Fechar</Button>
        </Modal.Footer>
    </Modal>
    </>

    <LineChart width={600} height={400} data={Object.values(this.state.countAsteroidsForDay)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={data => data[0]} stroke="#8884d8" />
        <Line type="monotone" dataKey={data => data[1]} stroke="#82ca9d" />
    </LineChart>

    </div>
    </div>
	)
}
}

export default NearbyAsteroids;