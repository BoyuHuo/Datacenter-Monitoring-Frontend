declare let require: any;
const Web3 = require('web3');

export class Wallet {
    account: object;
    pk: string;
    constructor() {
    }
    setAccount(account: object) {
        this.account = account;
    }
    setPrivateKey(pk) {
        this.pk = pk;
    }
    signMessage(w3, message) {
        return w3.eth.accounts.sign(message, this.pk).signature;
    }
}
