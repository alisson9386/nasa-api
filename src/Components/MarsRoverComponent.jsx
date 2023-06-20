import { Component } from "react";
import NasaServices from "../Services/NasaServices";
import Swal from 'sweetalert2';
import Carousel from 'react-bootstrap/Carousel';

class MarsRoverComponent extends Component {

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

    showAlertErrorSearch = (error) => {
        Swal.fire({
                    icon: 'error',
					title: 'Erro ao buscar asteroids!',
                    text: error,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 3000 
						})	
                        return;
    }

    constructor(props){
        super(props)
        this.state= {
            date:'',
            pictures:[],
        }
        this.changeDateHandler = this.changeDateHandler.bind(this);
    }

    changeDateHandler= (event) => {
        this.setState({date: event.target.value});
    }

    getPicturesMars = () => {
        this.setState({pictures : []})
        this.showLoading('Buscando imagens');
        let date = this.state.date;
        NasaServices.marsRover(date).then((res) =>{
            const photos = res.data.photos;
            const newPhotos = this.removeDuplicates(photos);
            this.setState({ pictures: newPhotos })
            console.log(newPhotos);
            Swal.close();
        }).catch(error => {
            Swal.close();
            this.showAlertErrorSearch(error);
          });
    }

    handleClearFields = () => {
        this.setState({
            date:'',
            pictures:[],
        });
        }

    removeDuplicates = (obj) => {
        const values = Object.values(obj);
        const uniqueValues = {};
        const uniqueArray = values.filter((value) => {
          if (!uniqueValues[value]) {
            uniqueValues[value] = true;
            return true;
          }
          return false;
        });
        const uniqueObj = {};
        uniqueArray.forEach((value, index) => {
          uniqueObj[index] = value;
        });
        return uniqueObj;
      };

render() {
	return (
		<div>
		<div className='parent'>
            <div className='formAsteroids'><br/>
                <form>
                    <div>
                    <br/><br/>
                    <label htmlFor="data" className="label-with-spacing">Data:</label>
                        <input
                            type="date"
                            name="date"
                            value={this.state.date}
                            onChange={this.changeDateHandler}
                        />
                        <button type="button" className="btn btn-primary mr-2" onClick={this.getPicturesMars}>Buscar</button>
                        <button type="button" className="btn btn-secondary ml-2" onClick={this.handleClearFields}>Limpar</button>
                    </div>
                    <br/>
                </form>
            </div>
        </div>
        <br/><br/><br/><br/>
        <div className="containerData">
            <div className="row">
                <div className="col-sm-6">
                    <div className="containerData"> 
                    <Carousel className="carousel">
                    {Object.entries(this.state.pictures).map(([index, data]) => (
                        <Carousel.Item key={index}>
                            <a href={data.img_src} target="_blank" rel="noopener noreferrer">
                                <img
                                className="d-block w-100"
                                src={data.img_src}
                                alt={`Imagem ${index + 1}`}/>
                            </a>
                        </Carousel.Item>
                    ))}
                        </Carousel>
                    </div>
                </div>
                <div className="col-sm-6">
                    <table className="table table-striped table-bordered text-center">
                        <thead>
                            <tr>
                                <th><h6>Camera</h6></th>
                                <th>Rover Name</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Object.entries(this.state.pictures).map(([index, data]) => (
                            <tr key={index}>
                                <td><label>{data.camera.full_name}</label></td>
                                <td><label>{data.rover.name}</label></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
		</div>
	)
}
}

export default MarsRoverComponent;
