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


module.exports = JSON.parse(solc.compile(JSON.stringify(input)));
