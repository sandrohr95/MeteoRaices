// import {csv} from "d3-request";
import { csv } from 'd3-fetch';
import url from '../assets/Provincias_code.csv';

export function removeAccent(cadena) {
  const accent = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ú: 'U' };
  return cadena
    .split('')
    .map(letra => accent[letra] || letra)
    .join('')
    .toString();
}

export function readCSV() {
  return csv(url).then(function(data) {
    return data;
  });
}

export function helpBrowser(query, choices) {
  // eslint-disable-next-line global-require
  const fuzz = require('fuzzball');
  // var query = "pola bear";
  // var choices = ["brown bear", "polar bear", "koala bear"];

  const results = fuzz.extract(query, choices);
  return results;
}
