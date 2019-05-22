import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xD42B039Bde841cE6E2965193187B9B4DA37d94ba"
);

export default instance;
