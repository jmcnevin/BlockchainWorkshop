var SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", function(accounts) {
  it("should set initial value", async () => {
    const simple_storage = await SimpleStorage.new("foo");
    const result = await simple_storage.storedData();
    assert.equal(result, "foo");
  });

  it("should set owner", async () => {
    const simple_storage = await SimpleStorage.new("foo");
    const result = await simple_storage.owner();
    assert.equal(result, accounts[0]);
  });

  it("should set new data", async () => {
    const simple_storage = await SimpleStorage.new("foo");
    await simple_storage.setStoredData("bar");
    const result = await simple_storage.storedData();
    assert.equal(result, "bar");
  });

  it("should only allow owner to set new data", async () => {
    const simple_storage = await SimpleStorage.new("foo");
    try {
      await simple_storage.setStoredData("bar", { from: accounts[1] });
      throw null;
    } catch (error) {
      assert.isNotNull(error);
      assert.equal(
        error.message,
        "Returned error: VM Exception while processing transaction: revert Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner."
      );
    }
  });
});
