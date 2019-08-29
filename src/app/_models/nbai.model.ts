import { WorkerService } from "../_services/worker.service";

declare let require: any;
const Web3 = require('web3');

export class Nebula {
    abi: any;
    contracts: any;
    addresses: any;
    url: any;
    w3: any;

    constructor() {
        this.abi = {
            depositAbi: [{ "constant": false, "inputs": [], "name": "unpause", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "paused", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "pause", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [], "name": "Pause", "type": "event" }, { "anonymous": false, "inputs": [], "name": "Unpause", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "by", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "FundDeposited", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "FundWithdrawn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "FundWithdrawnFrom", "type": "event" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_addedValue", "type": "uint256" }], "name": "increaseApproval", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_subtractedValue", "type": "uint256" }], "name": "decreaseApproval", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "deposit", "outputs": [{ "name": "", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }], "name": "depositAndApprove", "outputs": [{ "name": "", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_amount", "type": "uint256" }], "name": "withdraw", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_amount", "type": "uint256" }], "name": "withdrawFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }],
            taskAbi: [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "duration", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "paid", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "gpuCount", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "worker", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "complete", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "data", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "benchmark", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "error", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "taskOwner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "params", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "workerPayment", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "unitPrice", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "cancel", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "script", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "create", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "output", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "name": "_taskOwner", "type": "address" }, { "name": "_name", "type": "string" }, { "name": "_script", "type": "string" }, { "name": "_output", "type": "string" }, { "name": "_data", "type": "string" }, { "name": "_params", "type": "string" }, { "name": "_duration", "type": "uint256" }, { "name": "_unitPrice", "type": "uint256" }, { "name": "_benchmark", "type": "uint256" }, { "name": "_gpuCount", "type": "uint256" }], "payable": true, "stateMutability": "payable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [], "name": "RequirementUpdated", "type": "event" }, { "anonymous": false, "inputs": [], "name": "PriceUpdated", "type": "event" }, { "anonymous": false, "inputs": [], "name": "InfoUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_task", "type": "address" }], "name": "TaskCreated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_task", "type": "address" }, { "indexed": true, "name": "_worker", "type": "address" }, { "indexed": true, "name": "_feeToWorker", "type": "uint256" }, { "indexed": false, "name": "_returnedToOwner", "type": "uint256" }], "name": "TaskCompleted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_task", "type": "address" }], "name": "TaskCancelled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "constant": false, "inputs": [{ "name": "_worker", "type": "address" }, { "name": "_complete", "type": "uint256" }, { "name": "_error", "type": "bool" }, { "name": "_cancel", "type": "bool" }, { "name": "_manager", "type": "address" }, { "name": "_gasFee", "type": "uint256" }], "name": "set_workers", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "taskFee", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_benchmark", "type": "uint256" }, { "name": "_gpu", "type": "uint256" }], "name": "update_requirement", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_up", "type": "uint256" }, { "name": "_duration", "type": "uint256" }], "name": "update_price", "outputs": [{ "name": "", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_name", "type": "string" }], "name": "update_name", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_script", "type": "string" }], "name": "update_script", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_output", "type": "string" }], "name": "update_output", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_data", "type": "string" }], "name": "update_data", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_params", "type": "string" }], "name": "update_params", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }],
            managerAbi: [{ "constant": false, "inputs": [{ "name": "_change", "type": "bool" }], "name": "pause", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "workerCredit", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "managerSize", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "managers", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_managers", "type": "address[]" }], "name": "updateManager", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "paused", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "deposit", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "_deposit", "type": "address" }, { "name": "_minerCredit", "type": "address" }, { "name": "_managers", "type": "address[]" }], "payable": true, "stateMutability": "payable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_task", "type": "address" }, { "indexed": true, "name": "_owner", "type": "address" }, { "indexed": false, "name": "_fee", "type": "uint256" }], "name": "NewTask", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "paused", "type": "bool" }], "name": "Paused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "m0", "type": "address" }, { "indexed": true, "name": "m1", "type": "address" }, { "indexed": true, "name": "m2", "type": "address" }], "name": "ManagersSet", "type": "event" }, { "constant": false, "inputs": [{ "name": "_taskOwner", "type": "address" }, { "name": "_name", "type": "string" }, { "name": "_script", "type": "string" }, { "name": "_output", "type": "string" }, { "name": "_data", "type": "string" }, { "name": "_params", "type": "string" }, { "name": "_duration", "type": "uint256" }, { "name": "_unitPrice", "type": "uint256" }, { "name": "_benchmark", "type": "uint256" }, { "name": "_gpuCount", "type": "uint256" }], "name": "createTask", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_task", "type": "address" }, { "name": "_worker", "type": "address" }, { "name": "_complete", "type": "uint256" }, { "name": "_error", "type": "bool" }, { "name": "_cancel", "type": "bool" }, { "name": "_gasFee", "type": "uint256" }], "name": "setComplete", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_task", "type": "address" }, { "name": "_benchmark", "type": "uint256" }, { "name": "_gpu", "type": "uint256" }], "name": "update_requirement", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_task", "type": "address" }, { "name": "_up", "type": "uint256" }, { "name": "_duration", "type": "uint256" }], "name": "update_price", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_task", "type": "address" }, { "name": "_name", "type": "string" }], "name": "update_name", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_task", "type": "address" }, { "name": "_script", "type": "string" }], "name": "update_script", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_task", "type": "address" }, { "name": "_output", "type": "string" }], "name": "update_output", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_task", "type": "address" }, { "name": "_data", "type": "string" }], "name": "update_data", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_task", "type": "address" }, { "name": "_params", "type": "string" }], "name": "update_params", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_amount", "type": "uint256" }], "name": "withdrawalMinerCredit", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_worker", "type": "address" }, { "name": "_ban", "type": "bool" }], "name": "setWorkerStatus", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_limit", "type": "uint256" }], "name": "changeMinimumCredit", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_amount", "type": "uint256" }], "name": "chargePenalty", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_owner", "type": "address" }], "name": "changeMinerCreditOwner", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_payment", "type": "address" }], "name": "updatePayment", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_credit", "type": "address" }], "name": "updateMinerCredit", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }],
            workerAbi: [{ "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "workers", "outputs": [{ "name": "banned", "type": "bool" }, { "name": "credits", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "name": "_minimumCredit", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_worker", "type": "address" }, { "indexed": false, "name": "_ban", "type": "bool" }], "name": "WorkerStatusUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_worker", "type": "address" }, { "indexed": false, "name": "_eligible", "type": "bool" }, { "indexed": false, "name": "_currCredit", "type": "uint256" }, { "indexed": false, "name": "_minimal", "type": "uint256" }], "name": "EligibilityStatus", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" }], "name": "CreditWithdrawn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_minimum", "type": "uint256" }], "name": "MinimumCreditChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" }], "name": "UserRecompensed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" }], "name": "PenaltyIssued", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "changeOwner", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getMinimalCredit", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_worker", "type": "address" }], "name": "isEligible", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_worker", "type": "address" }], "name": "applyEligibility", "outputs": [{ "name": "", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_worker", "type": "address" }, { "name": "_ban", "type": "bool" }], "name": "setWorkerStatus", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_amount", "type": "uint256" }], "name": "withdrawCredit", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_limit", "type": "uint256" }], "name": "changeMinimumCredit", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_manager", "type": "address" }, { "name": "_amount", "type": "uint256" }], "name": "chargePenalty", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }]
        };

        this.contracts = {
            depositContract: {},
            taskContract: {},
            managerContract: {},
            workerContract: {}
        };
        this.addresses = {
            depositAddress: "",
            taskAddress: "",
            managerAddress: "",
            workerAddress: ""
        };
        this.url = {
            api: "",
            http_provider: ""
        };
        this.connectLedger('http://192.168.88.152:8080', 'http://192.168.88.152:8545');
        // this.loadAddresses();
        // this.loadContracts();
    }

    connectLedger(api_address, http_provider) {
        this.url.api = api_address;
        this.url.http_provider = http_provider;
        this.w3 = new Web3(http_provider);
    }

    importAccount(keystore: Object, password: string): any {
        return this.w3.eth.accounts.decrypt(keystore, password);
    }
    privateKeyToAccount(privateKey) {
        return this.w3.eth.accounts.privateKeyToAccount(privateKey);
    }
    // prepareContracts(){  
    //     return new Promise((resolve,reject)=>{
    //         this.loadAddresses()
    //             .then(()=>{
    //                 this.loadContracts();
    //                 resolve();
    //             })
    //             .catch(reject);
    //     });
    // }
    // loadAddresses(){

    //     return new Promise((resolve, reject)=>{
    //         this.getAddress("deposit")
    //             .then(r=>{                              console.log(r);
    //                 this.addresses.depositAddress = r;
    //                 return this.getAddress("minerCredit");
    //             })
    //             .then(r =>{
    //                 this.addresses.workerAddress = r;
    //                 return this.getAddress("taskManager");
    //             })
    //             .then(r =>{
    //                 this.addresses.managerAddress = r;
    //                 resolve()
    //             })
    //             .catch(reject)
    //     })
    // }

    // getAddress(type){            
    //     return new Promise((resolve, reject)=>{
    //          $.get(`${this.url.api}/address/${type}`, function(result){
    //              resolve(result['result']);
    //          }).fail(function() {
    //              reject(`getting ${type} address error`);
    //          });
    //     });
    // }
    loadContracts() {
        // return new Promise((resolve, reject)=>{
        try {
            this.contracts.depositContract = new this.w3.eth.Contract(this.abi.depositAbi, this.addresses.depositAddress);
            this.contracts.managerContract = new this.w3.eth.Contract(this.abi.managerAbi, this.addresses.managerAddress);
            this.contracts.workerContract = new this.w3.eth.Contract(this.abi.workerAbi, this.addresses.workerAddress);
            // resolve();
        } catch (e) {
            console.log(e);
            // reject(e)
        }
        // });
    }

    getBalance(wallet) {
        return new Promise((resolve, reject) => {
            return this.w3.eth.getBalance(wallet.wallet).then(balance => resolve(this.fromWei(balance))).catch(reject);
        });
    }

    getDeposit(wallet) {

        return new Promise((resolve, reject) => {
            return this.contracts.depositContract.methods.balanceOf(wallet.wallet)
                .call().then(r => resolve(this.fromWei(r))).catch(reject);
        })
    }

    getAllowance(wallet) {

        return new Promise((resolve, reject) => {
            return this.contracts.depositContract.methods.allowance(wallet.wallet, this.addresses.managerAddress)
                .call().then(r => resolve(this.fromWei(r))).catch(reject);
        });
    }

    fromWei(n) {
        return Math.floor(this.w3.utils.fromWei(n, "ether")).toFixed(2);
    }
    toHex(n) {
        return this.w3.utils.toHex(n);
    }

    getWorkers() {

        return new Promise((resolve, reject) => {
            $.get(`${this.url.api}/queue/details`, function(result) {
                resolve(result.Result)
            }).fail(reject);
        });
    }

    /**
     *
     * @param wallet {Wallet}
     * @param to {String}
     * @param amount {String}
     */
    transferNBAI(wallet, to, amount) {

        return new Promise((resolve, reject) => {
            let tx = {
                from: wallet.wallet,
                to: to, //note : this will complain if not checksum correct, use tochecksumAddress for all address inputs
                value: this.toHex(amount),
                gas: 30000
            };
            return this.w3.eth.getTransactionCount(wallet.wallet, "pending")
                .then(nonce => {
                    tx['nonce'] = nonce;
                    return this.w3.eth.getGasPrice();
                })
                .then(gp => {
                    if (gp < 100000000) {
                        gp = 1000000000;
                    }
                    tx['gasPrice'] = this.toHex(gp);
                    return this.w3.eth.accounts.signTransaction(tx, wallet.pk);
                })
                .then(signed => {
                    console.log(signed);
                    console.log(tx);
                    return this.w3.eth.sendSignedTransaction(signed.rawTransaction)
                        .on('transactionHash', hash => {
                            console.log("transfer NBAI transaction hash: " + hash);
                        })
                        .on('receipt', receipt => {
                            console.log(receipt);
                            if (receipt.gasUsed < 30000) {
                                console.log("Transfer NBAI successful");
                                resolve();
                            }
                            else throw "Transfer NBAI failed";
                        })
                        .on('error', error => {
                            throw error;
                        });
                })
                .catch(error => {
                    console.log(error);
                    reject();
                });
        });
    }

    /**
     *
     * @param wallet {Wallet}
     * @param amount {Number}
     * @returns {Promise<any>}
     */
    depositOnly(wallet, amount) {

        return new Promise((resolve, reject) => {
            let tx = {
                from: wallet.wallet,
                to: this.addresses.depositAddress,
                value: this.toHex(amount)
            };
            return this.contracts.depositContract
                .methods
                .deposit()
                .estimateGas(tx)
                .then(gas => {
                    tx['gas'] = this.toHex(gas);
                    return this.w3.eth.getTransactionCount(wallet.wallet, "pending");
                })
                .then(nonce => {
                    tx['nonce'] = this.toHex(nonce);
                    return this.contracts.depositContract.methods.deposit().encodeABI();
                })
                .then(encoded => {
                    tx['data'] = encoded;
                    return this.w3.eth.getGasPrice();
                })
                .then(gp => {
                    if (gp < 100000000) {
                        gp = 1000000000;
                    }
                    tx['gasPrice'] = this.toHex(gp);
                    return this.w3.eth.accounts.signTransaction(tx, wallet.pk);
                })
                .then(signed => {
                    console.log(signed);
                    console.log(tx);
                    return this.w3.eth.sendSignedTransaction(signed.rawTransaction)
                        .on('transactionHash', hash => {
                            console.log("Deposit transaction hash: " + hash);
                        })
                        .on('receipt', receipt => {
                            console.log(receipt);
                            if (receipt.logs.length > 0) {
                                console.log("Deposit successful");
                                resolve();
                            }
                            else throw "Deposit failed";
                        })
                        .on('error', error => {
                            throw error;
                        });
                })
                .catch(error => {
                    console.log(error);
                    reject();
                });
        });
    }

    /**
     * set allowance
     * @param wallet {Wallet}
     * @param amount {Number}
     * @returns {Promise<any>}
     */
    setAllowance(wallet, amount) {

        return new Promise((resolve, reject) => {
            let tx = {
                from: wallet.wallet,
                to: this.addresses.depositAddress,
                value: this.toHex(0)
            };
            // debugger;
            return this.contracts.depositContract
                .methods
                .approve(this.addresses.managerAddress, amount)
                .estimateGas(tx)
                .then(gas => {
                    tx['gas'] = this.toHex(gas);
                    return this.w3.eth.getTransactionCount(wallet.wallet, "pending");
                })
                .then(nonce => {
                    tx['nonce'] = this.toHex(nonce);
                    return this.contracts.depositContract.methods.approve(this.addresses.managerAddress, amount).encodeABI();
                })
                .then(encoded => {
                    tx['data'] = encoded;
                    return this.w3.eth.getGasPrice();
                })
                .then(gp => {
                    if (gp < 100000000) {
                        gp = 1000000000;
                    }
                    tx['gasPrice'] = this.toHex(gp);
                    return this.w3.eth.accounts.signTransaction(tx, wallet.pk);
                })
                .then(signed => {
                    console.log(signed);
                    console.log(tx);
                    return this.w3.eth.sendSignedTransaction(signed.rawTransaction)
                        .on('transactionHash', hash => {
                            console.log("Approve transaction hash: " + hash);
                        })
                        .on('receipt', receipt => {
                            console.log(receipt);
                            if (receipt.logs.length > 0) {
                                console.log("Approval successful");
                                resolve();
                            }
                            else throw "Approval failed";
                        })
                        .on('error', error => {
                            throw error;
                        });
                })
                .catch(error => {
                    console.log(error);
                    reject();
                });
        });
    }

    depositWorkerCredit(wallet, worker, amount) {

        return new Promise((resolve, reject) => {
            const tx = {
                from: wallet.account.address,
                to: this.addresses.workerAddress,
                value: this.toHex(amount)
            }; console.log(tx);
            return this.contracts.workerContract
                .methods
                .applyEligibility(worker)
                .estimateGas(tx)
                .then(gas => {              //console.log(gas);
                    tx['gas'] = this.toHex(gas);
                    return this.w3.eth.getTransactionCount(wallet.account.address, "pending");
                })
                .then(nonce => {            //console.log(nonce);
                    tx['nonce'] = this.toHex(nonce);
                    return this.contracts.workerContract.methods.applyEligibility(worker).encodeABI();
                })
                .then(encoded => {
                    tx['data'] = encoded;
                    return this.w3.eth.getGasPrice();
                })
                .then(gp => {           //console.log(gp);
                    if (gp < 100000000) {
                        gp = 1000000000;
                    }
                    tx['gasPrice'] = this.toHex(gp);
                    return this.w3.eth.accounts.signTransaction(tx, wallet.account.privateKey);
                })
                .then(signed => {
                    console.log(tx, signed);

                    return this.w3.eth.sendSignedTransaction(signed.rawTransaction)
                        .on('transactionHash', hash => {
                            console.log("Apply Eligibility transaction hash: " + hash);
                        })
                        .on('receipt', receipt => {
                            console.log(receipt);

                            if (receipt.logs.length > 0) {
                                console.log("Apply Eligibility successful");
                                resolve(receipt);
                            }
                            else throw "Apply Eligibility failed";
                        })
                        .on('error', error => {
                            throw error;
                        });
                })
                .catch(error => {                                           //console.log(error);
                    reject(error);
                });

        });
    }

    depositAndApprove(wallet, amount) {

        return new Promise((resolve, reject) => {
            let tx = {
                from: wallet.wallet,
                to: this.addresses.depositAddress,
                value: this.toHex(amount)
            };
            // debugger;
            return this.contracts.depositContract
                .methods
                .depositAndApprove(this.addresses.managerAddress)
                .estimateGas(tx)
                .then(gas => {
                    tx['gas'] = this.toHex(gas);
                    return this.w3.eth.getTransactionCount(wallet.wallet, "pending");
                })
                .then(nonce => {
                    tx['nonce'] = this.toHex(nonce);
                    return this.contracts.depositContract.methods.depositAndApprove(this.addresses.managerAddress).encodeABI();
                })
                .then(encoded => {
                    tx['data'] = encoded;
                    return this.w3.eth.getGasPrice();
                })
                .then(gp => {
                    if (gp < 100000000) {
                        gp = 1000000000;
                    }
                    tx['gasPrice'] = this.toHex(gp);
                    return this.w3.eth.accounts.signTransaction(tx, wallet.pk);
                })
                .then(signed => {
                    console.log(signed);
                    console.log(tx);
                    return this.w3.eth.sendSignedTransaction(signed.rawTransaction)
                        .on('transactionHash', hash => {
                            console.log("Deposit and approve transaction hash: " + hash);
                        })
                        .on('receipt', receipt => {
                            console.log(receipt);
                            if (receipt.logs.length > 0) {
                                console.log("Deposit and approval successful");
                                resolve();
                            }
                            else throw "Deposit and approval failed";
                        })
                        .on('error', error => {
                            throw error;
                        });
                })
                .catch(error => {
                    console.log("error", error);
                    reject();
                });
        });
    }

    /**
     *
     * @param wallet {Wallet}
     * @param withdrawAmount {Number}
     * @returns {Promise<any>}
     */
    withdrawDeposit(wallet, withdrawAmount) {

        return new Promise((resolve, reject) => {
            let tx = {
                from: wallet.wallet,
                to: this.addresses.depositAddress,
                value: this.toHex(0)
            };
            return this.contracts.depositContract
                .methods
                .withdraw(withdrawAmount)
                .estimateGas(tx)
                .then(gas => {
                    tx['gas'] = this.toHex(gas);
                    return this.w3.eth.getTransactionCount(wallet.wallet, "pending");
                })
                .then(nonce => {
                    tx['nonce'] = this.toHex(nonce);
                    return this.contracts.depositContract.methods.withdraw(withdrawAmount).encodeABI();
                })
                .then(encoded => {
                    tx['data'] = encoded;
                    return this.w3.eth.getGasPrice();
                })
                .then(gp => {
                    if (gp < 100000000) {
                        gp = 1000000000;
                    }
                    tx['gasPrice'] = this.toHex(gp);
                    return this.w3.eth.accounts.signTransaction(tx, wallet.pk);
                })
                .then(signed => {
                    console.log(signed);
                    console.log(tx);
                    return this.w3.eth.sendSignedTransaction(signed.rawTransaction)
                        .on('transactionHash', hash => {
                            console.log("Withdraw deposit transaction hash: " + hash);
                        })
                        .on('receipt', receipt => {
                            console.log(receipt);
                            if (receipt.logs.length > 0) {
                                console.log("Withdraw deposit transaction successful");
                                resolve();
                            }
                            else throw "Withdraw deposit transaction failed";
                        })
                        .on('error', error => {
                            throw error;
                        });
                })
                .catch(error => {
                    console.log(error);
                    reject();
                });
        });
    }

    /**
     * Worker Credit Related
     * *************************************************************************************************************
     *
     * Get worker credit
     * @param workerId {string}
     */
    getWorkerCredit(workerId) {
        // 
        return new Promise((resolve, reject) => {
            this.contracts.workerContract.methods.workers(workerId).call().then(w => {
                w = {
                    banned: w.banned,
                    credits: this.fromWei(w.credits)
                };
                resolve(w);
            }).catch(reject);
        });
    }

    isEligible(workerId) {

        return new Promise((resolve, reject) => {
            this.contracts.workerContract.methods.isEligible(workerId).call().then(resolve).catch(reject);
        });
    }


    /**
     * ********************************************************************************
     * @param wallet {Wallet}
     * @param taskName {String}
     * @param scriptUrl {String}
     * @param dataUrl {String}
     * @param outputUrl {String}
     * @param param {Object}
     * @param unitFee {String}
     * @param duration {Number}
     * @param benchmark {Number}
     * @param gpuCount {Number}
     */
    createTask(wallet, taskName, scriptUrl, dataUrl, outputUrl, param, unitFee, duration, benchmark, gpuCount) {
        // 
        return new Promise((resolve, reject) => {
            let req = {
                owner_address: wallet.wallet,
                name: taskName,
                script_url: scriptUrl,
                output_url: outputUrl,
                data_source: dataUrl,
                param: param,
                unit_fee: unitFee,
                duration: duration,
                gpu_count: gpuCount,
                signed_message: wallet.signMessage(this.w3, "submit")
            };
            //$.post(`${this.url.api}/task/submit`, JSON.stringify(req), r=> resolve(r.result), "json").fail(reject);
        });

    }

    /**
     *
     * @param hash {String}
     */
    getTaskIdByHash(hash) {

        return new Promise((resolve, reject) => {
            let req = {
                hash: hash
            };
            $.post(`${this.url.api}/task/contractCreated`, JSON.stringify(req), r => resolve(r.result), "json").fail(reject);
        })
    }

    /**
     *
     * @param wallet {Wallet}
     * @param taskId {String}
     * @param force {boolean}
     */
    cancelTask(wallet, taskId, force) {
        return new Promise((resolve, reject) => {
            let req = {
                contract: taskId,
                wallet: wallet.wallet,
                force: force,
                signature: wallet.signMessage(this.w3, "cancel")
            };
            $.post(`${this.url.api}/task/cancel`, JSON.stringify(req), r => resolve(r.result), "json").fail(reject);
        });
    }

    /**
     *
     * @param wallet {Wallet}
     * @param workerId {String}
     * @param ban {boolean}
     */
    unbanWorker(wallet, workerId, ban) {
        let req = {
            wallet: workerId,
            banned: ban,
            signature: wallet.signMessage(this.w3, "updateStatus")
        };
        $.post(
            `${this.url.api}/admin/updateWorkerStatus`,
            JSON.stringify(req),
            function(data, status) {
                console.log("data: ", data);
                console.log("status: ", status);
            },
            "json"
        )
            .fail(function(error) {
                console.log(error);
            });
    }

    /**
     *
     * @param wallet {Wallet}
     * @param amount {String}
     */
    ledgerWithdraw(wallet, amount) {
        debugger;
        let req = {
            signature: wallet.signMessage(this.w3, "withdraw"),
            amount: amount
        };
        debugger;
        $.post(
            `${this.url.api}/admin/withdrawNbai`,
            JSON.stringify(req),
            function(data, status) {
                console.log("result: ", data);
                console.log("status: ", status);
            },
            "json"
        )
            .fail(function(error) {
                console.log(error);
            });
    }
}
