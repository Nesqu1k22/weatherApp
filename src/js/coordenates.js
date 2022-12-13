
const APIKeys = '937bca0df2987172c5ae4a0dca416cad';
const coordinatesAPI = 'https://api.openweathermap.org/data/2.5/onecall?';
const cityAPI = 'https://api.openweathermap.org/data/2.5/weather?q=';
const form = document.querySelector(".top_banner form");
const button = document.querySelector('#search__button');
const secBoxs = document.querySelector('.boxs');
const boxArray = [];


//identificar clase segun corresponda al clima
const searchWord = (sentence, theWord) => {
let theWords = sentence.split('/')
return theWords.indexOf(theWord) != -1;
}

//retornar clase segun el clima identificado
const selectImg = (object) => {
    if(searchWord(object.image,'01d.svg')){return 'd01'}
    if(searchWord(object.image,'01n.svg')){return 'n01'}
    if(searchWord(object.image,'02d.svg')){return 'd02'}
    if(searchWord(object.image,'02n.svg')){return 'n02'}
    if(searchWord(object.image,'03d.svg')){return 'd03'}
    if(searchWord(object.image,'03n.svg')){return 'n03'}
    if(searchWord(object.image,'04d.svg')){return 'd04'}
    if(searchWord(object.image,'04n.svg')){return 'n04'}
    if(searchWord(object.image,'10d.svg')){return 'd10'}
    if(searchWord(object.image,'10n.svg')){return 'n10'}
    if(searchWord(object.image,'11d.svg')){return 'd11'}
    if(searchWord(object.image,'11n.svg')){return 'n11'}
    if(searchWord(object.image,'13d.svg')){return 'd13'}
    if(searchWord(object.image,'13n.svg')){return 'n13'}
    if(searchWord(object.image,'50d.svg')){return 'd50'}
    if(searchWord(object.image,'50n.svg')){return 'n50'}
}


//array de objetos (wheaterboxs)
let i = 0;
let weatherBox = [];

//constructor de weatherboxs
class weathers  {
    constructor (data){
    this.windSpd= data.wind.speed
    this.feels= data.main.feels_like
    this.hum= data.main.humidity
    this.tempMax= data.main.temp_max
    this.tempMin= data.main.temp_min
    this.country = data.sys.country
    this.city = data.name
    this.temperature = Math.round(data.main.temp) + ' °C'
    this.image = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0]["icon"]}.svg`
    this.description = `${data.weather[0]["description"]}`
    }
}

//recibir valor de imputs para completar la URL
form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    
    let cityName = await document.getElementById("search__imput").value;
    let countryName = await document.getElementById("search__imput2").value;
    let city = (cityName+","+countryName);
    let url = `${cityAPI}${city}&units=metric&appid=${APIKeys}`;
    getData(url)
})

//recibir URL para obtener cordenadas para devolver una URL mas completa
async function getData (Url){
    const response = await fetch (Url);
    const data =  await response.json();
    console.log(data)
    weatherBox[i] = new weathers (data);
    buildBox(weatherBox[i])
    i++;
}


// enumerador de cajas reflejado en su clase
let boxEnumerator = 0;
// recibir objeto del array para construir html
buildBox = (object) => {
    // SVG 
    const ubiSvg = document.createElement('img')
    ubiSvg.classList.add('ubiIcon')
    ubiSvg.src= './src/img/ubi.svg'
    const windSvg = document.createElement('img')
    windSvg.src= './src/img/wind.svg'
    windSvg.classList.add('windIcon')
    feelsTxt = document.createElement('h2')
    feelsTxt.textContent= 'feels'
    feelsTxt.classList.add('feelsIcon')
    const humSvg = document.createElement('img')
    humSvg.src= './src/img/hum.svg'
    humSvg.classList.add('humIcon')
    const tempMaxSvg = document.createElement('img')
    tempMaxSvg.src= './src/img/tempmax.svg'
    tempMaxSvg.classList.add('tempMaxIcon')
    const tempMinSvg = document.createElement('img')
    tempMinSvg.src= './src/img/tempmin.svg'
    tempMinSvg.classList.add('tempMinIcon')

    //CONTAINER
    const container = document.createElement('article')
    container.classList.add('box__container'+boxEnumerator)
    boxArray.push(container)
    boxEnumerator++
    
    //BOX back
    const boxBk = document.createElement('div')
    boxBk.classList.add(selectImg(object))
    boxBk.classList.add('container__boxBk')
    const boxBk2 = document.createElement('div')
    boxBk2.classList.add('head__boxBk')

    const titleBk = document.createElement('h3') 
    titleBk.classList.add('title__boxBk')
    
    
    const tempBk = document.createElement('h1')
    tempBk.classList.add('temp__boxBk')
    
    const descBk = document.createElement('h3')
    descBk.classList.add('desc__boxBk')
    const infoBk = document.createElement('div')
    infoBk.classList.add('info__boxBk')
    
    const windSpd = document.createElement('p')
    windSpd.classList.add('windSpd__boxBk')
    const feels = document.createElement('p')
    feels.classList.add('feels__boxBk')
    const hum = document.createElement('p')
    hum.classList.add('hum__boxBk')
    const tempMax = document.createElement('p')
    tempMax.classList.add('tempMax__boxBk')
    const tempMin = document.createElement('p')
    tempMin.classList.add('tempMin__boxBk')
    
    titleBk.textContent = object.city +' / '+ object.country
    tempBk.textContent = object.temperature
    descBk.textContent = object.description
    windSpd.textContent = object.windSpd
    feels.textContent = object.feels
    hum.textContent = object.hum
    tempMax.textContent = object.tempMax
    tempMin.textContent = object.tempMin
    infoBk.append(windSvg,windSpd,feelsTxt,feels,humSvg,hum,tempMaxSvg,tempMax,tempMinSvg,tempMin)
    boxBk2.append(ubiSvg,titleBk,tempBk,descBk)
    boxBk.append(boxBk2,infoBk)
    
    container.appendChild(boxBk)
    secBoxs.appendChild(container)


    //BOX front
    const boxFront = document.createElement('div')
    boxFront.classList.add(selectImg(object))
    boxFront.classList.add('container__boxFront')

    const buttonDelete = document.createElement('img') 
    buttonDelete.classList.add('button__boxFront')

    const title = document.createElement('h3') 
    title.classList.add('title__boxFront')

    const img = document.createElement('img')
    img.classList.add('img__boxFront')

    const temp = document.createElement('h1')
    temp.classList.add('temp__boxFront')

    const desc = document.createElement('h3')
    desc.classList.add('description__boxFront')

    buttonDelete.src = './src/img/trash.svg'
    title.textContent = object.city +' / '+ object.country
    img.src = object.image
    temp.textContent = object.temperature
    desc.textContent = object.description
    boxFront.append(buttonDelete,title,img,temp,desc)
    container.appendChild(boxFront)
    secBoxs.appendChild(container)
    console.log(secBoxs)
    console.log(object)
    
    
    
    
}

secBoxs.addEventListener('click', (event)=>{
    // agregar o quitar (la clase para girar la caja)
    if (event.target.tagName === 'ARTICLE'){
        const container = document.querySelector('.'+event.target.classList.value)
        
        console.log(container)
        container.childNodes[0].classList.toggle('boxBkHover')
        container.childNodes[1].classList.toggle('boxFrontHover')  
    }
    // eliminar caja
    if (event.target.classList.value === 'button__boxFront') {
        const container = document.querySelector('.'+event.target.parentNode.parentNode.className)
        secBoxs.removeChild(container)
    }
})




