// atm.js

const fs = require('fs');
const eventHandler = require('./eventHandler');

function checkBalance(accountID) {
    const userData = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
    const user = userData.find(u => u.accountID === accountID);
    return user ? user.balance : null;
}

function depositMoney(accountID, amount) {
    const userData = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
    const userIndex = userData.findIndex(u => u.accountID === accountID);

    if (userIndex !== -1) {
        userData[userIndex].balance += amount;

        // Log transaction
        const transaction = { type: 'deposit', amount, date: new Date().toISOString() };
        userData[userIndex].transactions.push(transaction);

        fs.writeFileSync('./data/users.json', JSON.stringify(userData, null, 2));
        eventHandler.emit('deposit', { accountID, amount });
        return `Successfully deposited ${amount} into account ${accountID}.`;
    } else {
        return 'User not found.';
    }
}

function withdrawMoney(accountID, amount) {
    const userData = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
    const userIndex = userData.findIndex(u => u.accountID === accountID);

    if (userIndex !== -1) {
        // let userData = userData.accountID 
        if (userData[userIndex].balance >= amount) {
            userData[userIndex].balance -= amount;

            // Log transaction
            const transaction = { type: 'withdraw', amount, date: new Date().toISOString() };
            userData[userIndex].transactions.push(transaction);

            fs.writeFileSync('./data/users.json', JSON.stringify(userData, null, 2));
            eventHandler.emit('withdraw', { accountID, amount });
            return `Successfully withdrew ${amount} from account ${accountID}.`;
        } else {
            return 'Insufficient funds.';
        }
    } else {
        return 'User not found.';
    }
}

function viewTransactions(accountID) {
    const userData = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
    const user = userData.find(u => u.accountID === accountID);
    return user ? user.transactions : null;
}

module.exports = {
    checkBalance,
    depositMoney,
    withdrawMoney,
    viewTransactions
};
