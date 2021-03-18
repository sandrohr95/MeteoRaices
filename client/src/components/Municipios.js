import {csv} from 'd3-request';
import url from '../assets/Provincias.csv';


export function removeAccent(cadena) {
    const accent = {'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U'};
    return cadena.split('').map(letra => accent[letra] || letra).join('').toString();
}

export function replaceByCode(city) {
    let value = removeAccent(city).toLowerCase();
    let code;
    if (value === 'malaga') {
        code = "29067";
    } else if (value === 'madrid') {
        code = "28079";
    } else {
        code = "18087"
    }
    return code;
}


function parse(city) {
    csv(url, function (err, data) {
        let row;
        let code;
        let listCities = [];
        data.map(dt => {
            row = Object.values(dt)[0].split(';');
            console.log(city);
            if (row[4] === city) {
                console.log("entra")
                code = row[1].toString() + row[2].toString();
            }
        });
        return code;
    })
}

let code = parse("Málaga");
console.log(code);