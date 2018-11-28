
const cheerio = require('cheerio');
const rp = require('request-promise');
const fs = require('fs');
const housesURLsArr = require('./housesURLs.json');

const mainJson = require ('./main.json');
const output = require ('./output.json');

const storageFile = './output.json';
const housesURLs = 'housesURLs.json';
let houseInfo = [];
if(!fs.existsSync('main.json')) {
    fs.appendFile('main.json', houseInfo, error => console.log(error));
}
function convertor(value, method) {
    let newValue = value.replace(/\r?\n|\r/g, '');
    newValue = newValue.trim();
    newValue = newValue.split(" ")[0];
    newValue = newValue.replace(/\./g, '');
    newValue = newValue.replace(/\,/g, '.');
    newValue = Number(newValue);
    if(method === 'price') {
        newValue = newValue * 0.88429;
        newValue = Math.round(newValue);
    }

    return newValue;
}

function yearOfConstructionFilter(value) {
    let validValue = value.replace(/\r?\n|\r/g, '');
    validValue = validValue.trim();
    validValue = validValue.substr(-4);
    
    return validValue;
}

/*
houseInfo = [...mainJson];
for(let i = 120; i < 140; i++) {

let house = {};
rp(housesURLsArr[i])
        .then(body => {
            const $ = cheerio.load(body, {
                xmlMode: true
            });
            const address = $('div.location').find('span.no_s').text();
            house.address = address;
            const price = $('div.hardfacts.clear div.hardfact').eq(0).text();
            house.price = convertor(price, 'price');

            house.livingArea = convertor($('div.hardfacts.clear div.hardfact').eq(1).text(), null);
            house.NumberOfRooms = convertor($('div.hardfacts.clear div.hardfact').eq(2).text(), null);
            house.plotSize = convertor($('div.hardfacts.clear div.hardfact').eq(3).text(), null);

            
            let yearOfConstruction = $('div.section_wrapper.iw_left .clear .section_content.iw_right p').eq(1).text();
            yearOfConstruction = yearOfConstructionFilter(yearOfConstruction);
            house.yearOfConstruction = yearOfConstruction;

            
            houseInfo.push(house);

            fs.writeFile('./main.json',  JSON.stringify(houseInfo), (error) => {
                if(error) console.log(error);
                else console.log('Success');
            });
        })
        .catch(err => console.log('error', err));
}
*/