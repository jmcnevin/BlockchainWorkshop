// workshop participants do not need to deploy this contract

const HotPotato = artifacts.require("HotPotato");

module.exports = function(deployer) {
  deployer.deploy(HotPotato, "JMAC");
};
