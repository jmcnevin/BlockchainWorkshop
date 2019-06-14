var OpioidToken = artifacts.require("OpioidToken");

contract("OpioidToken", function(accounts) {
  it("should deploy", async () => {
    const ot = await OpioidToken.new("Opioid Token", "OPI", 0, 100000);
    assert.equal(await ot.name(), "Opioid Token");
    assert.equal(await ot.symbol(), "OPI");
    assert.equal(await ot.decimals(), 0);
    assert.equal(await ot.balanceOf(accounts[0]), 100000);
    assert.equal(await ot.totalSupply(), 100000);
  });
});
