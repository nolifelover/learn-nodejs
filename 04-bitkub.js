const { ethers } = require("ethers");

const rpcUrl = 'https://rpc.bitkubchain.io';
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

const walletAddres = "0x8b14aA146dcd5c94d6E4A1b3410E45943dcA36C3";
const kkubAddress = "0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5"
const main = async() => {
  const blockNumberPromise = provider.getBlockNumber();
  const balancePromise = provider.getBalance(walletAddres);

  const [blockNumber, balance] = await Promise.all([blockNumberPromise, balancePromise])
  console.log(`current blocknumber=${blockNumber}`);
  console.log(`my wallet have ${ethers.utils.formatEther(balance)} eth`);
}

const kkubContract = async() => {
  const abi = [
    "function name() public view returns (string)",
    "function symbol() public view returns (string)",
    "function decimals() public view returns (uint256)",
    "function totalSupply() public view returns (uint256)",
    "function balanceOf(address _addr) public view returns (uint256)",
  ]
  const kkubContract = new ethers.Contract(kkubAddress, abi, provider);
  const totalSupply = await kkubContract.totalSupply();
  const name = await kkubContract.name();
  const decimals = await kkubContract.decimals();
  console.log(`kkub name = ${name}`);
  console.log(`kkub decimals = ${decimals}`);
  console.log(`kkub totalSupply = ${totalSupply/10**decimals}`);
  const balanceOfMywallet = await kkubContract.balanceOf(walletAddres);
  console.log(`my wallet kkub = ${balanceOfMywallet/10**decimals}`);
  const kubBalance = await provider.getBalance(walletAddres);
  console.log(`my wallet kub = ${kubBalance/10**decimals}`);
}

// main();
kkubContract()
