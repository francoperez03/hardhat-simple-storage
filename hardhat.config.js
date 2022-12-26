require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()
require('@nomiclabs/hardhat-etherscan')
require('./tasks/block-number')

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	defaultNetwork: 'hardhat',
	networks: {
		goerli: {
			url: GOERLI_RPC_URL,
			accounts: [PRIVATE_KEY],
			chainId: 5,
		},
		localhost: {
			url: 'http://127.0.0.1:8545/',
			chainId: 31337, //same as hardhat
		},
	},
	etherscan: {
		apiKey: ETHERSCAN_API_KEY,
	},
	solidity: '0.8.7',
}
