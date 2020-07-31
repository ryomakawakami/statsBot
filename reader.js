const fs = require('fs');
const readline = require('readline');

function getUsername(id) {
    var array = fs.readFileSync('accounts').toString().split("\n");
    for (i in array) {
        if (array[i].trim().length <= 1) {
            console.log('OH NO')
            continue;
        }
        spl = array[i].split(' ');
        if (id.toString() === spl[0]) {
            return spl[1];
        }
    }

    return '-';
}

function addUsername(id, username) {
    var array = fs.readFileSync('accounts').toString().split("\n");
    for (i in array) {
        spl = array[i].split(' ');
        if (spl[0] == id.toString()) {
            return false;
        }
    }

    fs.appendFile('accounts', id + ' ' + username + '\n', function (err) {
        if (err) throw err;
    });

    return true
}

module.exports = { getUsername, addUsername };
