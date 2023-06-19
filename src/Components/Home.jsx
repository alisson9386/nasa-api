import { Component } from "react";
import NasaServices from "../Services/NasaServices";

class Home extends Component {

	constructor(props) {
		super(props)

		this.state = {
			urlImageDay:''
		}
	}

	componentDidMount(){
		NasaServices.imageDay().then((res) =>{
			this.setState({urlImageDay: res.data.url})
		}).catch(error => {
            console.log(error);
          });
	}

render() {
	return (
		<div className="containerData">
			<div className="jumbotron">
			<h1 className="display-4">Olá!</h1>
			<p className="lead">Todos os dias, a Nasa publica uma imagem astronômica denominada "Image Day"</p>
			<hr className="my-4"/>
			<img src={this.state.urlImageDay}/>
			</div>
		</div>
	)
}
}

export default Home;