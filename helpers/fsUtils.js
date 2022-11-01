const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);   //read promise
const read = fs.readFile;                           // reads file without promise

const writeToFile = (destination, content) => {                                         // function to write specific data to the selected file
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
        err ? console.error(err) : console.info(`Data was written ${destination}`)
    });
};

const readAndAppend = (content, file) => {                                  // function to read, copy, and add to the selected file
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const selection = JSON.parse(data);
            selection.push(content);
            writeToFile(file, selection);
        }
    });
};

module.exports = { readFromFile, writeToFile, readAndAppend, read };