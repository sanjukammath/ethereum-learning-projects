const HDWalletProvider = require("truffle-hdwallet-provider");
const fs = require("fs");
const path = require("path");
const Web3 = require("Web3");
const { interface, bytecode } = require("./compile");

const mnemonicPath = path.resolve(__dirname, "mnemonic");
const mnemonic = fs.readFileSync(mnemonicPath, "utf8");

const provider = new HDWalletProvider(
  mnemonic,
  "https://rinkeby.infura.io/v3/221cb1c28ce24c269b98142f855c008e"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log(interface);
  console.log("Contract deployed to ", result.options.address);
};

deploy();
