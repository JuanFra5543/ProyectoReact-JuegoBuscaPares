import React, {Component} from 'react';
import './header.css';

export default class Header extends Component {
    render(){
        return(
            <header>
                <div className="titulo"> Busca Parejas</div>
                <div>
                    <button className="boton-reinicio" onClick={this.props.resetGame}>
                        Reiniciar
                    </button>
                </div>
                <div className="titulo">Intentos: {this.props.numeroIntentos}</div>
            </header>
        )
    }
}