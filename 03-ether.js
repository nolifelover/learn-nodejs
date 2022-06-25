const { ethers } = require("ethers");

const apiKey = "73d0b83e155b4bd28cf2e7571f4c3095";
const provider = new ethers.providers.InfuraProvider("rinkeby", apiKey);

const walletAddres = "0x7F693C1dBbB72c03E6b862AC53f5e765698Abd63";
const main = async() => {
  /* const blockNumber = await provider.getBlockNumber()
  console.log(`current blocknumber=${blockNumber}`);
  const balance = await provider.getBalance(walletAddres);
  const balanceEth = ethers.utils.formatEther(balance);
  console.log(`my wallet have ${balanceEth} eth`);
  */
  const blockNumberPromise = provider.getBlockNumber();
  const balancePromise = provider.getBalance(walletAddres);

  const [blockNumber, balance] = await Promise.all([blockNumberPromise, balancePromise])
  console.log(`current blocknumber=${blockNumber}`);
  console.log(`my wallet have ${ethers.utils.formatEther(balance)} eth`);
}

main();
