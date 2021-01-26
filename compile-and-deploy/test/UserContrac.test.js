const assert = require('assert');
const { italic } = require('chalk');
const Web3 = require('web3');


const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

const compile = require('../scripts/compile');



const bytecode = compile.contracts['UserContract.sol']['UsersContract'].evm.deployedBytecode;
const interface = compile.contracts['UserContract.sol']['UsersContract'].abi;
let accounts;
let usersContract;


beforeEach(
    async () => {
        accounts = await web3.eth.getAccounts();
        const incrementerTx = await new web3
            .eth
            .Contract(interface)
            .deploy({ data: bytecode.object });
        
        usersContract = await incrementerTx.send({ from: accounts[0], gas: '1000000'});
    }
);


describe(
    'The UsersContracts',
    async () => {
        it('should deploy', async ()=> {
            assert.ok(true);
        })
    }
);