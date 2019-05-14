const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

const web3 = new Web3(ganache.provider());

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  await factory.methods.createCampaign("100").send({
    from: accounts[0],
    gas: "1000000"
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});

describe("Campaigns", () => {
  it("deploys a factory and a campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });
  it("sets manager address correctly", async () => {
    const manager = await campaign.methods.manager().call();
    assert.strictEqual(accounts[0], manager);
  });
  it("sets minimum contribution correctly", async () => {
    const minimum = await campaign.methods.minimumContribution().call();
    assert.strictEqual("100", minimum);
  });
  it("requires minimum contribution for participation", async () => {
    try {
      await campaign.methods.contribute().send({
        value: "50",
        from: accounts[1]
      });
      assert(false);
    } catch {
      assert(true);
    }
  });
  it("allows contribution and adds approvers", async () => {
    await campaign.methods.contribute().send({
      value: "200",
      from: accounts[1]
    });
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });
  it("allows manager to make a payment request", async () => {
    const recipient = accounts[2];
    await campaign.methods
      .createRequest("Battery Casings", "100", recipient)
      .send({
        from: accounts[0],
        gas: 1000000
      });
    const request = await campaign.methods.requests(0).call();
    assert.strictEqual("Battery Casings", request.description);
    assert.strictEqual("100", request.value);
    assert.strictEqual(recipient, request.recipient);
    assert(!request.complete);
  });
  it("processes requests", async () => {
    await campaign.methods.contribute().send({
      value: web3.utils.toWei("10", "ether"),
      from: accounts[0]
    });
    await campaign.methods
      .createRequest(
        "Battery Casings",
        web3.utils.toWei("5", "ether"),
        accounts[1]
      )
      .send({ from: accounts[0], gas: 1000000 });
    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000"
    });
    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000"
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);

    assert(balance > 104);
  });
});
