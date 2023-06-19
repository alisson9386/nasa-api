import { Component } from "react";
import NasaServices from "../Services/NasaServices";
import Swal from 'sweetalert2';

class Home extends Component {

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

	constructor(props) {
		super(props)

		this.state = {
			urlImageDay:'',
			imageTilte:'',
			imageDescription: '',
			hdImage:''
		}
	}

	componentDidMount(){
		this.showLoading('Carregando');
		NasaServices.imageDay().then((res) =>{
			this.setState({
				urlImageDay: res.data.url, 
				imageTilte: res.data.title, 
				imageDescription: res.data.explanation,
				hdImage: res.data.hdurl
			});
			Swal.close();
		}).catch(error => {
            console.log(error);
          });
	}

render() {
	return (
		<div className="containerHome"><br/>
		 <div className="row">
			<div className="col-sm-6">
			<p className="lead">Todos os dias, a Nasa publica uma foto denominada "Image Day"</p>
			<img className="framedImage" src={this.state.urlImageDay} alt={this.state.imageTilte} title={this.state.imageTilte}/>
			</div>
			<div className="col-sm-6">
			<p className="lead">Descrição</p><br/><br/>
			<label>{this.state.imageDescription}</label><br/><br/>
			<a href={this.state.hdImage} target="_blank" rel="noreferrer" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Imagem em HD</a>
			</div>
		</div>
		</div>
	)
}
}

export default Home;