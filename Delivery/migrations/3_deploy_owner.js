const OwnerContract = artifacts.require("OwnerContract");

module.exports = function (deployer) {
  deployer.deploy(OwnerContract);
};
