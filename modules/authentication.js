// authentication.js

const fs = require('fs');

function authenticateUser(accountID, pin) {
    const userData = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));

    const user = userData.find(u => u.accountID === accountID && u.pin === pin);
    return user ? user : null;
}

module.exports = {
    authenticateUser
};
