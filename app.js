const express = require('express');
const fs = require('fs');
const app = express();

const housesURLs = 'housesURLs.json';
const urlsList2 = 'lastUpdateUrls.json';

app.get('/urls', (req, res) => {
    readHousesURLsFile()
        .then(data => {
            if (data == '[]') {
                res.status(404).json({ message: "no data found" });
            }else {
                const todosData = JSON.parse(data);
                res.status(200).json(todosData);
            }
        })
    .catch(error => console.log(error));
});








function readHousesURLsFile() {
    return new Promise ((resolve, reject) => {
        if(!fs.existsSync(urlsList2)) {
            return console.log('file is not existed!');
        }else {
            fs.readFile('./' + urlsList2, (error, data) => {
                if(error) reject(error);
                else resolve(data);
            });
        }  
    });
}









const server = {
    host: 'http://localhost',
    port: 8082
};

const port = process.env.PORT || server.port;
    app.listen(port, () => {
        console.log(`Listening on ${server.host}:${port} ..`);
    });