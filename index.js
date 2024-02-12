// index.js

const readline = require('readline');
const { authenticateUser } = require('./modules/authentication');
const { checkBalance, depositMoney, withdrawMoney, viewTransactions } = require('./modules/atm');
const eventHandler = require('./modules/eventHandler');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptUser() {
    rl.question('Enter your accountID: ', accountID => {
        rl.question('Enter your PIN: ', pin => {
            const user = authenticateUser(accountID, pin);
            if (user) {
                console.log(`Welcome, ${user.name}!`);
                performOperations(user);
            } else {
                console.log('Invalid accountID or PIN. Please try again.');
                promptUser();
            }
        });
    });
}

function performOperations(user) {
    console.log('Select an operation:');
    console.log('1. Check Balance');
    console.log('2. Deposit Money');
    console.log('3. Withdraw Money');
    console.log('4. View Transaction History');
    console.log('5. Exit');

    rl.question('Enter your choice: ', choice => {
        switch (choice) {
            case '1':
                console.log(`Current balance: ${checkBalance(user.accountID)}`);
                performOperations(user);
                break;
            case '2':
                rl.question('Enter amount to deposit: ', amount => {
                    console.log(depositMoney(user.accountID, parseFloat(amount)));
                    performOperations(user);
                });
                break;
            case '3':
                rl.question('Enter amount to withdraw: ', amount => {
                    console.log(withdrawMoney(user.accountID, parseFloat(amount)));
                    performOperations(user);
                });
                break;
            case '4':
                console.log('Transaction History:');
                console.log(viewTransactions(user.accountID));
                performOperations(user);
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log('Invalid choice. Please try again.');
                performOperations(user);
                break;
        }
    });
}

promptUser();
