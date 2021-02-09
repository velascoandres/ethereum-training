const assert = require('assert');
const Web3 = require('web3');


const web3 = new Web3("http://127.0.0.1:8545");

const compile = require('../scripts/compile');



const bytecode = compile.evm.deployedBytecode;
const abi = compile.abi;
let accounts;
let usersContract;
let usersContractx;

const privateKey = '0xd0373e37d3844c913049c38fcd470b9576cb608bd5a310787d30a5820ab0982f'; // Genesis private key

beforeEach(
    async () => {
        accounts = await web3.eth.getAccounts();
         usersContractx = await new web3
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

        it(
            'should join a user',
            async () => {
                let name = 'Pepe';
                let surname = 'Vasco'
                
                const usersContracts = new web3.eth.Contract(abi, usersContract.contractAddress);
                
                usersContracts.methods.join(name, surname)
                    .send(
                      {
                          from: accounts[0],
                          gas: '50000'
                      }
                    );
            }
        );
    }
);