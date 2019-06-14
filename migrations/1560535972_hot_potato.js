const HotPotato = artifacts.require("HotPotato");

module.exports = function(deployer) {
  deployer.deploy(HotPotato, "JMAC");
};
