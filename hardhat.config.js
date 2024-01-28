require('@nomiclabs/hardhat-waffle');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.9',
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    cosVM: {
      url: "https://rpc.cosvm.net",
      accounts: ["f3ca6a22442f4e9ca1a703fe93c5d4691f645ceec82502e37730985b90219516"], // Replace with the private key of your account
      chainId: 323,
    },
  },
};
