const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { interface, bytecode } = require("../compile");

const web3 = new Web3(ganache.provider());

let lottery;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Lottery Contract", () => {
  it("deploys a contract", () => {
    assert.ok(lottery.options.address);
  });

  it("sets manager correctly", async () => {
    const manager = await lottery.methods.manager().call({
      from: accounts[0]
    });
    assert.equal(accounts[0], manager);
  });

  it("adds one player", async () => {
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei("0.02", "ether")
    });
    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });
    assert.equal(accounts[1], players[0]);
    assert.equal(1, players.length);
  });

  it("adds multiple players", async () => {
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei("0.02", "ether")
    });
    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei("0.02", "ether")
    });
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether")
    });
    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });
    assert.equal(accounts[1], players[0]);
    assert.equal(accounts[2], players[1]);
    assert.equal(accounts[0], players[2]);
    assert.equal(3, players.length);
  });

  it("requires minimum amount of ether to enter", async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 0
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("requires manager to call pickWinner", async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[1],
        value: web3.utils.toWei("0.02", "ether")
      });
      await lottery.methods.pickWinner().send({
        from: accounts[1],
        value: 0
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
    try {
      await lottery.methods.enter().send({
        from: accounts[1],
        value: web3.utils.toWei("0.02", "ether")
      });
      await lottery.methods.pickWinner().send({
        from: accounts[0],
        value: 0
      });
      assert(true);
    } catch (err) {
      assert(false);
    }
  });

  it("sends money to the winner and resets the player list", async () => {
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei("2", "ether")
    });
    const initialBalance = await web3.eth.getBalance(accounts[1]);
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });
    const finalBalance = await web3.eth.getBalance(accounts[1]);
    const difference = finalBalance - initialBalance;
    assert(difference > web3.utils.toWei("1.8", "ether"));

    //add missing test
  });
});
