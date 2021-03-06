const { ethers } = require("ethers");

const rpcUrl = "https://rpc.bitkubchain.io";
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

const walletAddres = "0x8b14aA146dcd5c94d6E4A1b3410E45943dcA36C3";
const kkubAddress = "0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5";
const main = async () => {
  const blockNumberPromise = provider.getBlockNumber();
  const balancePromise = provider.getBalance(walletAddres);

  const [blockNumber, balance] = await Promise.all([
    blockNumberPromise,
    balancePromise,
  ]);
  console.log(`current blocknumber=${blockNumber}`);
  console.log(`my wallet have ${ethers.utils.formatEther(balance)} eth`);
};

const getErc20 = async (contractAddres, provider) => {
  const abi = [
    "function name() public view returns (string)",
    "function symbol() public view returns (string)",
    "function decimals() public view returns (uint256)",
    "function totalSupply() public view returns (uint256)",
    "function balanceOf(address _addr) public view returns (uint256)",
  ];
  const contract = new ethers.Contract(contractAddres, abi, provider);
  return new Promise(async (resolve, reject) => {
    const [name, symbol, decimals, totalSupply] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.decimals(),
      contract.totalSupply(),
    ]);
    resolve({
      name,
      symbol,
      decimals,
      totalSupply,
    });
  });
};

const kkubContract = async () => {
  const abi = [
    "function name() public view returns (string)",
    "function symbol() public view returns (string)",
    "function decimals() public view returns (uint256)",
    "function totalSupply() public view returns (uint256)",
    "function balanceOf(address _addr) public view returns (uint256)",
    "event Transfer(address indexed from, address indexed to, uint256 tokens)",
  ];
  const kkubContract = new ethers.Contract(kkubAddress, abi, provider);
  /* const totalSupply = await kkubContract.totalSupply();
  const name = await kkubContract.name();
  const decimals = await kkubContract.decimals();
  console.log(`kkub name = ${name}`);
  console.log(`kkub decimals = ${decimals}`);
  console.log(`kkub totalSupply = ${totalSupply / 10 ** decimals}`);
  const balanceOfMywallet = await kkubContract.balanceOf(walletAddres);
  console.log(`my wallet kkub = ${balanceOfMywallet / 10 ** decimals}`);
  const kubBalance = await provider.getBalance(walletAddres);
  console.log(`my wallet kub = ${kubBalance / 10 ** decimals}`);
  */
  kkubContract.on("Transfer", async (from, to, amount, event) => {
    const blockNumber = await provider.getBlockNumber();
    console.log(`transfer on block = ${blockNumber}`)
    console.log(`${from} sent ${ethers.utils.formatEther(amount)} to ${to}`);
    // The event object contains the verbatim log data, the
    // EventFragment and functions to fetch the block,
    // transaction and receipt and event functions

  });
};

const multiContracts = async () => {
  const [kkub, lumi] = await Promise.all([
    getErc20(kkubAddress, provider),
    getErc20("0x95013Dcb6A561e6C003AED9C43Fb8B64008aA361", provider),
  ]);
  // const kkub = await getErc20(kkubAddress, provider);
  console.log(`kkub %o`, kkub);
  console.log(`lumi %o`, lumi);
};

// main();
kkubContract();
// multiContracts();
