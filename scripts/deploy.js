const hre = require('hardhat');
const { ethers } = require('hardhat');

async function main() {
  const chainId = await ethers.provider
    .getNetwork()
    .then((network) => network.chainId);
  console.log('Chain ID:', chainId);
  const Greeter = await hre.ethers.getContractFactory('Greeter');
  const greeter = await Greeter.deploy('Hello, Hardhat!');

  await greeter.deployed();

  console.log('Greeter deployed to:', greeter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
