const path = require('path');
const fs = require('fs');
const solc = require('solc');
const chalk = require('chalk');

const contractPath = path.resolve(
    __dirname,
    '../contracts', "UserContract.sol"
);

const source = fs.readFileSync(contractPath, 'utf8');

var input = {
    language: 'Solidity',
    sources: {
      'UserContract.sol': {
        content: source,
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };


const output = JSON.parse(solc.compile(JSON.stringify(input)));


for (const contractName in output.contracts['UserContract.sol']){
    console.log(chalk.green(contractName));
    console.log(chalk.cyan( output.contracts['UserContract.sol'][contractName].evm.bytecode.object));
}

