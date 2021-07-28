import shuffle from 'lodash.shuffle'
import FontAwesomeClasses from './fontAwesomeClasses'

const NUM_CARTAS = 20;

const construirBaraja = () => {
    const fontAwesomeClasses = FontAwesomeClasses();
    let cartas = [];

    while (cartas.length < NUM_CARTAS) {
        const indice = Math.floor(Math.random() * fontAwesomeClasses.length);
        const carta = {
            icono: fontAwesomeClasses.splice(indice, 1),
            fueAdivinada: false
        };

        cartas.push(carta);
        cartas.push({...carta});
    }

    return shuffle(cartas);
};

export default construirBaraja