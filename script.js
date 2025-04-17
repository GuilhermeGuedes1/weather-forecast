 

function buscarCidade(){
    let inputCidade = document.querySelector('.input').value

    if (inputCidade === '') { 
        let mensagemError = document.querySelector('.error')
        let mostrarMensagemError = document.querySelector('.error-message')

        mensagemError.innerHTML = 'Favor, digite uma cidade'
        mostrarMensagemError.classList.remove('escondido')  

        document.querySelector('.container-cidade-encontrada').classList.add('escondido')
        
    } else{

        let promessa = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputCidade}&appid=637dfe07a300a7c1705baa044b4457e4&lang=pt_br&units=metric`)

        .then(cidadeEncontrada)
        .catch(error)
    }
}

function cidadeEncontrada(resposta){ 
    let cidade = document.querySelector('.cidade')
    let pais = document.querySelector('.pais')
    let temperatura = document.querySelector('.temperatura')
    let tempo = document.querySelector('.tempo')
    let descricao = document.querySelector('.descricao')
    let vento = document.querySelector('.vento')
    let umidade = document.querySelector('.umidade')

    let mostrarCidade = document.querySelector('.container-cidade-encontrada')
    mostrarCidade.classList.remove('escondido')

    let dados = resposta.data



    let iconeTempo = dados.weather[0].icon

    cidade.innerHTML = dados.name 
    pais.innerHTML = dados.sys.country
    temperatura.innerHTML = `${(dados.main.temp).toFixed(0)}°`
    tempo.src = `https://openweathermap.org/img/wn/${iconeTempo}.png`
    descricao.innerHTML = dados.weather[0].description.charAt(0).toUpperCase() + dados.weather[0].description.slice(1);  
    vento.innerHTML = dados.wind.speed
    umidade.innerHTML = dados.main.humidity

    document.querySelector('.input').value = ''
    document.querySelector('.error-message').classList.add('escondido')

}

function error(resposta){
    if(resposta.status === 404) { 
        let mensagemError = document.querySelector('.error')
        let mostrarMensagemError = document.querySelector('.error-message')

        mensagemError.innerHTML = 'Digite uma cidade valida'
        mostrarMensagemError.classList.remove('escondido')  

        document.querySelector('.container-cidade-encontrada').classList.add('escondido')

    }

}
