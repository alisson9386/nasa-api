import React, { Component } from "react";
import NasaServices from "../Services/NasaServices";
import Swal from 'sweetalert2';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urlImageDay: '',
      imageTitle: '',
      imageDescription: '',
      hdImage: ''
    };
  }

  componentDidMount() {
    this.showLoading('Carregando');
    NasaServices.imageDay().then((res) => {
      this.setState({
        urlImageDay: res.data.url,
        imageTitle: res.data.title,
        imageDescription: res.data.explanation,
        hdImage: res.data.hdurl
      });
      this.closeLoading();
    }).catch(error => {
      console.log(error);
    });
  }

  showLoading = (text) => {
    Swal.fire({
      title: 'Aguarde!',
      html: text,
      allowOutsideClick: false,
      allowEscapeKey: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  closeLoading = () => {
    Swal.close();
  };

  render() {
    return (
      <div className="containerHome"><br />
        <div className="row">
          <div className="col-sm-6">
            <p className="lead">Todos os dias, a Nasa publica uma foto denominada "Picture of the Day"</p>
            <img className="framedImage" src={this.state.urlImageDay} alt={this.state.imageTitle} title={this.state.imageTitle} /><br /><br />
            <a href={this.state.hdImage} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm active" role="button" aria-pressed="true">Fullscreen</a>
          </div>
          <div className="col-sm-6">
            <p className="lead">Descrição</p><br /><br />
            <label>{this.state.imageDescription}</label><br /><br />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
