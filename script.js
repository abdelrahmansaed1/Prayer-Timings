const cities = [
    {
        arabicName: "القدس",
        name: "Jerusalem",
        countryName: 'Palestine'
    },
    {
        arabicName: "غزة",
        name: "Gaza",
        countryName: 'Palestine'
    },
    {
        arabicName: "القاهرة",
        name: "Cairo",
        countryName: 'Egypt'
    },
    {
        arabicName: "مكة المكرمة",
        name: "Makka",
        countryName: 'SA'
    }
]
for(city of cities){
    let content = `
    <option>${city.arabicName}</option>
    `
    document.getElementById("cities-name").innerHTML += content
}
document.getElementById('cities-name').addEventListener("change", () => { 
    let cityName = ''
    let countryName = ''
    let changeIMG = document.getElementById('landing')
    let value = document.getElementById('cities-name').value
    
    for(let city of cities){
        if(city.arabicName === value){
            cityName = city.name
            countryName = city.countryName
            changeIMG.classList.remove('Makka')
            changeIMG.classList.remove('Cairo')
            changeIMG.classList.remove('Jerusalem')
            changeIMG.classList.add('Jerusalem')
            changeIMG.classList.add(city.name)
            
        }

    }
    document.getElementById('city-name').innerHTML =  " " + value 
    getPrayersTimingOfCity(cityName, countryName)
})
function getPrayersTimingOfCity(cityName, countryName){

    const params = {
        country : countryName,
        city: cityName 
    }
    axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params: params
        })
        .then(function (response) {
            let timing = response.data.data.timings
            fillTime("fajr-time", timing.Fajr)
            fillTime("sunrize-time", timing.Sunrise)
            fillTime("dhuhr-time", timing.Dhuhr)
            fillTime("asr-time", timing.Asr)
            fillTime("sunset-time", timing.Sunset)
            fillTime("isha-time", timing.Isha)
            let readableDate = response.data.data.date.gregorian.date
            let weekday = response.data.data.date.hijri.weekday.ar
            console.log(readableDate + weekday);
            document.getElementById('date').innerHTML = weekday + ' ' + readableDate
            
        })
        .catch(function (error) {
            console.log(error);
        })
}

function fillTime(id, time){
    document.getElementById(id).innerHTML = time
}

getPrayersTimingOfCity('Jerusalem','Palestine')
// getPrayersTimingOfCity('Gaza')
