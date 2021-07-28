import React, {Component} from 'react';
import Header from './header.js';
import Tablero from './tablero.js';
import './App.css';
import construirBaraja from './utils/construirBaraja'

const getEstadoInicial = () => {
  const baraja = construirBaraja();
  return {
    baraja,
    parejaSeleccionada: [],
    comparando: false,
    numeroIntentos: 0
  };
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = getEstadoInicial();
  }
  render(){
    return (
      <div className="App">
        <Header numeroIntentos = {this.state.numeroIntentos} resetGame={() => this.resetGame()}></Header>
        <Tablero baraja={this.state.baraja} parejaSeleccionada={this.state.parejaSeleccionada} seleccionarCarta={(carta) => this.seleccionarCarta(carta)}/>
      </div>
    );
  }
  seleccionarCarta(carta){
    if(this.state.comparando || this.state.parejaSeleccionada.indexOf(carta)>-1 || carta.fueAdivinada){
      return;
    }
    const parejaSeleccionada = [...this.state.parejaSeleccionada, carta];
    this.setState({parejaSeleccionada})

    if(parejaSeleccionada.length ===2){
      this.compararPareja(parejaSeleccionada)
    }
  }
  compararPareja(parejaSeleccionada){
    this.setState({comparando: true});

    setTimeout(() => {
      const [primeraCarta, segundaCarta] = parejaSeleccionada;
      let baraja = this.state.baraja;

      if(primeraCarta.icono === segundaCarta.icono){
        baraja = baraja.map((carta) => {
          if (carta.icono !== primeraCarta.icono){
            return carta;
          }
          return {...carta, fueAdivinada: true}
        })
      }

      this.verificarGanador(baraja)
      this.setState({
        parejaSeleccionada: [],
        baraja,
        comparando: false,
        numeroIntentos: this.state.numeroIntentos + 1
      })
    }, 1000)
  }

  verificarGanador(baraja){
    if (baraja.filter((carta) => !carta.fueAdivinada).length === 0){
      alert(`Ganaste en ${this.state.numeroIntentos} turnos!`)
    }
  }

  resetGame(){
    this.setState(
      getEstadoInicial()
    );
  }
}

export default App;
