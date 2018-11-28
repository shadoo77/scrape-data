
const cheerio = require('cheerio');
const rp = require('request-promise');
const fs = require('fs');

const url1 = 'https://www.immowelt.de/liste/basel-landschaft-kanton/haeuser/kaufen?lat=47.45127896&lon=7.70087979&sort=relevanz';
const url2 = 'https://www.immowelt.de/liste/basel-landschaft-kanton/haeuser/kaufen?lat=47.45127896&lon=7.70087979&sort=relevanz&cp=2';
const url3 = 'https://www.immowelt.de/liste/basel-landschaft-kanton/haeuser/kaufen?lat=47.45127896&lon=7.70087979&sort=relevanz&cp=3';
const url4 = 'https://www.immowelt.de/liste/basel-landschaft-kanton/haeuser/kaufen?lat=47.45127896&lon=7.70087979&sort=relevanz&cp=4';
const url5 = 'https://www.immowelt.de/liste/basel-landschaft-kanton/haeuser/kaufen?lat=47.45127896&lon=7.70087979&sort=relevanz&cp=5';
const url6 = 'https://www.immowelt.de/liste/basel-landschaft-kanton/haeuser/kaufen?lat=47.45127896&lon=7.70087979&sort=relevanz&cp=6';
const url7 = 'https://www.immowelt.de/liste/basel-landschaft-kanton/haeuser/kaufen?lat=47.45127896&lon=7.70087979&sort=relevanz&cp=7';


if(!fs.existsSync('lastUpdateUrls.json')) {
    fs.appendFile('lastUpdateUrls.json', '[]', error => console.log("houses url's file was not existed but now created"));

    const pages = [url1, url2, url3, url4, url5, url6, url7];
    let housesURLsArr = [];
    const initURL = 'https://www.immowelt.de';

    pages.forEach(url => {
        rp(url)
        .then(html => {
            const $ = cheerio.load(html, {
                xmlMode: true
            });
            $('div.js-object').each(function(index, element) {
                let item = initURL + $(element).find('.listitem a').attr('href');
                housesURLsArr.push(item);
            });
            fs.writeFile('./lastUpdateUrls.json',  JSON.stringify(housesURLsArr), (error) => {
                if(error) console.log(error);
                else console.log('Success');
            });
        })
        .catch(err => console.log('error', err));
    });
}else console.log("Houses url's file is already existed!");