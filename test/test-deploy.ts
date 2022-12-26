import { ethers } from 'hardhat'
import { expect, assert } from 'chai'
import { SimpleStorage, SimpleStorage__factory} from '../typechain-types'
describe('SimpleStorage', function () {
	let simpleStorageFactory: SimpleStorage__factory
	let simpleStorage: SimpleStorage
	beforeEach(async function () {
		simpleStorageFactory = (await ethers.getContractFactory('SimpleStorage')) as SimpleStorage__factory
		simpleStorage = await simpleStorageFactory.deploy()
	})
	it('Should start with a favorite number of 0', async function () {
		const currentValue = await simpleStorage.retrieve()
		const expectedValue = '0'
		assert.equal(currentValue.toString(), expectedValue)
	})
	it('Should update when we call store', async function () {
		const expectedValue = '7'
		const transactionResponse = await simpleStorage.store('7')
		await transactionResponse.wait(1)

		const currentValue = await simpleStorage.retrieve()
		assert.equal(currentValue.toString(), expectedValue)
	})
	it('Should add a person in the array', async function (){
		const expectedValue = 'Franco'
		const transactionResponse = await simpleStorage.addPerson('Franco', '2')
		await transactionResponse.wait(1)
		const people = await simpleStorage.people(0)
		assert.equal(people[1], expectedValue)
	})
})
