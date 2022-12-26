//imports
const { ethers, run, network } = require('hardhat')
//asyn main
async function main() {
	const SimpleStorageFactory = await ethers.getContractFactory(
		'SimpleStorage'
	)
	console.log('Deploying contract...')
	const simpleStorage = await SimpleStorageFactory.deploy()
	await simpleStorage.deployed()
	console.log(`Contract address: ${simpleStorage.address}`)
	if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
		await simpleStorage.deployTransaction.wait(6)
		await verify(simpleStorage.address, [])
	}
	const currentValue = await simpleStorage.retrieve()
	console.log(`Current value is: ${currentValue}`)
	const transactionResponse = await simpleStorage.store(113355)
	await transactionResponse.wait(1)
	const updatedValue = await simpleStorage.retrieve()
	console.log(`Updated Value is: ${updatedValue}`)
}

async function verify(contractAddress, args) {
	console.log('Verifying contract...')
	try {
		await run('verify:verify', {
			address: contractAddress,
			constructorArgsParams: args,
		})
		console.log('Verfied! (Y)')
	} catch (e) {
		if (e.message.toLowerCase().includes('already verified')) {
			console.log('Already verified!')
		} else {
			console.log(e)
		}
	}
}
//main
main()
	.then(() => {
		process.exit(0)
	})
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
