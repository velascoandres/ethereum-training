const assert = require('assert');
const Web3 = require('web3');


const web3 = new Web3("http://127.0.0.1:7545");

const compile = require('../scripts/compile');



const bytecode = compile.evm.deployedBytecode;
const abi = compile.abi;
let accounts;
let usersContract;


const privateKey = '0x1cb696dc526e93815399ade0e620c5989d2f34689fdc89a95777f5e902bf2704'; // Genesis private key

beforeEach(
    async () => {
        accounts = await web3.eth.getAccounts();
        const usersContractx = await new web3
            .eth
            .Contract(abi)
            .deploy({ data: bytecode.object, arguments: []});
            const createTransaction = await web3.eth.accounts.signTransaction(
               {
                  from: accounts[0],
                  gas: '1000000',
               },
               privateKey
            );
         
            usersContract = await web3.eth.sendSignedTransaction(
               createTransaction.rawTransaction
            );
            
    }
);


describe(
    'The UsersContracts',
    async () => {
        it('should deploy', async ()=> {
            console.log(usersContract);
            assert.ok(usersContract.contractAddress);
        })
    }
);