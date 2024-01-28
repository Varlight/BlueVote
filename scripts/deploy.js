const hre = require('hardhat');
const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  // Fund the account with some Ether (adjust the value as needed)
  const valueToSend = ethers.utils.parseEther('1'); // Adjust the amount of Ether to send

  try {
    // Attempt to send Ether to the account
    const tx = await deployer.sendTransaction({
      to: '0xD5A1AAE1ABa646C70225f842Eb1FC8E0AfFc95B1',
      value: valueToSend,
    });

    await tx.wait(); // Wait for the transaction to be mined

    console.log(`Account funded successfully with ${ethers.utils.formatEther(valueToSend)} ETH.`);

    // Continue with the rest of your deployment logic here...
  } catch (error) {
    console.error('Error funding account:', error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
