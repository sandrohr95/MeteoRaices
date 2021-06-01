import React, {Suspense} from 'react';
import styled from 'styled-components';
import SearchCity from './components/SearchCity';
import device from './responsive/Device';
import NotFound from './components/NotFound';
import raicesImage from './assets/Raices-logo.png';
import {readCSV, removeAccent, helpBrowser} from './components/function';

const Result = React.lazy(() => import('./components/Result'));

const AppTitle = styled.h1`
  display: block;
  height: 10px;
  margin: 0;
  padding: 20px 0;
  font-size: 20px;
  font-weight: 400;
  color: #ffffff;
  transition: 0.3s 1.4s;
  opacity: ${({showLabel}) => (showLabel ? 1 : 0)};

  ${({secondary}) =>
    secondary &&
    `
    opacity: 1;
    height: auto;
    position: relative;
    padding: 20px 0;
    font-size: 30px;
    top: 20%;
    text-align: center;
    transition: .5s;
    @media ${device.tablet} {
      font-size: 40px;
    }
    @media ${device.laptop} {
      font-size: 50px;
    }
    @media ${device.laptopL} {
      font-size: 60px;
    }
    @media ${device.desktop} {
      font-size: 70px;
    }
    
  `}

  ${({showResult}) =>
    showResult &&
    `
    opacity: 0;
    visibility: hidden;
    top: 10%;
  `}
`;

const WeatherWrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  height: calc(100vh - 64px);
  width: 100%;
  position: relative;
`;

const RaicesIcon = styled.img`
  display: block;
  height: auto;
  width: 300px;
  margin: 20px auto 0 auto;
`;

const RaicesIconleft = styled.img`
  width: 200px;
  margin: 0;
`;

class App extends React.Component {
    state = {
        value: '',
        weatherInfo: null,
        error: false,
    };

    handleInputChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    handleSearchCity = async e => {
        e.preventDefault();
        const {value} = this.state;

        // Quitamos acentos y caracteres raros
        const query = removeAccent(value).toLowerCase();

        // Leemos el csv de provincias
        const data = await readCSV();
        const listCities = [];
        const listCodes = [];
        // eslint-disable-next-line array-callback-return
        data.map(dt => {
            const row = Object.values(dt)[0].split(';');
            listCities.push(row[4]);
            listCodes.push(row[1].toString() + row[2].toString());
        });
        // Método para ayudar con el autocompletado
        const result = helpBrowser(query, listCities);
        const indexCode = result[0][2];
        const code = listCodes[indexCode];

        const diasURL = `https://meteoapp.raices.info/api/api/dias/${code}`;
        const horasURL = `https://meteoapp.raices.info/api/api/horas/${code}`;

        Promise.all([fetch(diasURL), fetch(horasURL)])
            .then(([dias, horas]) => {
                if (dias.ok && horas.ok) {
                    return Promise.all([dias.json(), horas.json()]);
                }
                throw Error(dias.statusText, horas.statusText);
            })
            .then(([dt1, dt2]) => {
                const months = [
                    'Enero',
                    'Febrero',
                    'Marzo',
                    'Abril',
                    'Mayo',
                    'Junio',
                    'Julio',
                    'Agosto',
                    'Septiembre',
                    'Octubre',
                    'Noviembre',
                    'Deciembre',
                ];
                const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
                // Tendría que sacar la fecha desde nuestra API Fecha_prevision

                const currentDate = new Date(dt1[0].fecha_prevision);
                const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
                    months[currentDate.getMonth()]
                }`;

                const actualDate = new Date();
                const newDate = `${actualDate.getFullYear()}-${`0${actualDate.getMonth() + 1}`.slice(
                    -2,
                )}-${`0${actualDate.getDate()}`.slice(-2)} ${`0${actualDate.getHours()}`.slice(-2)}`;

                console.log(newDate);
                console.log(dt2[dt2.length - 1].Fecha_Prev.slice(0, 13))
                // Para sacar la temperatura actual tengo que mirar que coincida la hora con la hora actual
                // Tenemos que devolver la lista de condiciones climatológicas por horas a partir de este momento
                // No tiene sentido devolver la de las horas pasadas
                let climaData = [];
                let temperatura = null;
                let simbolo = null;

                dt2.forEach((d, index) => {
                    if (d.Fecha_Prev.slice(0, 13) === newDate) {
                        temperatura = d.Temperatura;
                        climaData = dt2.slice(index, -1);
                        simbolo = d.simbolo;
                    }
                });

                const weatherInfo = {
                    city: dt1[0].municipio,
                    date,
                    main: simbolo,
                    temp: Math.floor(temperatura * 1),
                    highestTemp: Math.floor(dt1[0].temperatura_maxima * 1),
                    lowestTemp: Math.floor(dt1[0].temperatura_minima * 1),
                    humidity_manana: Math.floor(dt1[0].humedad_manana),
                    humidity_noche: Math.floor(dt1[0].humedad_noche),
                    humidity_tarde: Math.floor(dt1[0].humedad_tarde),
                    probabilidad_lluvia_manana: Math.floor(dt1[0].probabilidad_lluvia_manana),
                    probabilidad_lluvia_tarde: Math.floor(dt1[0].probabilidad_lluvia_tarde),
                    probabilidad_lluvia_noche: Math.floor(dt1[0].probabilidad_lluvia_noche),
                    forecast: climaData,
                };
                this.setState({
                    weatherInfo,
                    error: false,
                });
            })
            .catch(error => {
                console.log(error);

                this.setState({
                    error: true,
                    weatherInfo: null,
                });
            });
    };

    render() {
        const {value, weatherInfo, error} = this.state;
        return (
            <>
                <AppTitle showLabel={(weatherInfo || error) && true}>
                    <RaicesIconleft src={raicesImage}/>
                </AppTitle>
                <WeatherWrapper>
                    <AppTitle secondary showResult={(weatherInfo || error) && true}>
                        <RaicesIcon src={raicesImage}/>
                        Aplicación de Meteorología
                    </AppTitle>
                    <SearchCity
                        value={value}
                        showResult={(weatherInfo || error) && true}
                        change={this.handleInputChange}
                        submit={this.handleSearchCity}
                    />
                    <Suspense fallback={<div>Buscando Municipio...</div>}>
                        {weatherInfo && <Result weather={weatherInfo}/>}
                    </Suspense>
                    {error && <NotFound error={error}/>}
                </WeatherWrapper>
            </>
        );
    }
}

export default App;
