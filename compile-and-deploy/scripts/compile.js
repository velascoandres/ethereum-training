
const path = require('path');
const fs = require('fs');
const solc = require('solc');

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


const compileResult = JSON.parse(solc.compile(JSON.stringify(input)));

module.exports = compileResult.contracts['UserContract.sol']['UsersContract']