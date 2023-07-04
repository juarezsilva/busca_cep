'use strict';

//Preencher formulário
const preencherFormulario = (endereco) =>{
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

//Limpar formulário
const limparFormulario = (endereco) =>{
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep); 

const pesquisarCep = async() => {
    limparFormulario();
    
    const cep = document.getElementById('cep').value.replace("-","");
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = 'CEP não encontrado!';
        }else {
            preencherFormulario(endereco);
        }
    }else{
        document.getElementById('endereco').value = 'CEP incorreto!';
    }
     
}

document.getElementById('cep')
        .addEventListener('focusout',pesquisarCep);

//horário
setInterval ( ()=> {
  const hours = document.querySelector('div#hours')
  let data = new Date()
  let hora = data.getHours()
  let minutos = data.getMinutes()
  let segundos = data.getSeconds()
  hora = hora <= 9 ? '0' + hora:hora
  minutos = minutos <= 9 ? '0' + minutos:minutos
  segundos = segundos <= 9 ? '0' + segundos:segundos
      
  hours.innerHTML = `${hora}:${minutos}:${segundos}`
  
  //Semana
  
  const weekday = document.querySelector('div#week-day')
  let wday = data.getDay()
  wday = wday == 0 ? 'DOM.' : wday
  wday = wday == 1 ? 'SEG.' : wday
  wday = wday == 2 ? 'TER.' : wday
  wday = wday == 3 ? 'QUA.' : wday
  wday = wday == 4 ? 'QUI.' : wday
  wday = wday == 5 ? 'SEX.' : wday
  wday = wday == 6 ? 'SAB.' : wday
  weekday.innerHTML = `${wday}`
  
  const day = document.querySelector('div#day')
  let dd = data.getDate()
  dd = dd <= 9 ? '0' + dd:dd 
  day.innerHTML = `${dd} /`
  
  const monthyear = document.querySelector('div#month-year')
  let month = data.getMonth() + 1
  month = month <= 9 ? '0' + month:month
  let year = data.getFullYear()
  monthyear.innerHTML = `${month} / ${year}` 


  
})

function getUserPosition() {
    let url = ''
    navigator.geolocation.getCurrentPosition((pos) => {
      let lat = pos.coords.latitude
      let long = pos.coords.longitude
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=622296cd4fda08b69c46ccfa980f968d`
      fetchApi(url)
      console.log(url)
    })
  }
  
  function fetchApi(url) {
    let city = document.querySelector('.city')
    let temperature = document.querySelector('#temp')
    let humidity = document.querySelector('#umidad')
  
    fetch(url)
    .then((data) => {
      return data.json()
    })
    .then((data) => {
      let tempInCelsius = ((5/9) * (data.main.temp-32)).toFixed(1);
      
      city.textContent      = data.name
      temperature.innerHTML = tempInCelsius
      humidity.innerHTML    = data.main.humidity
    })
    .catch((err) => {
      city.innerText = `Impossível acessar o OpenWeather. Verifique a sua conexão.`;
      temperature.innerHTML = `-`;
    })
  }
  
  getUserPosition();