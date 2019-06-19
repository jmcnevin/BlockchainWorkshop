var HotPotato = artifacts.require("HotPotato");

contract("HotPotato", function(accounts) {
  it("should deploy", async () => {
    hp = await HotPotato.new("Joe");
    assert.equal(await hp.owner(), accounts[0]);
    assert.equal(await hp.playerNamesToAddresses("Joe"), accounts[0]);
    assert.equal(await hp.holder(), "Joe");
  });

  it("should start the game", async () => {
    hp = await HotPotato.new("Joe");

    try {
      await hp.start(0);
      throw null;
    } catch (error) {
      assert.isNotNull(error);
      assert.equal(
        error.message,
        "Returned error: VM Exception while processing transaction: revert Ending time must be in the future. -- Reason given: Ending time must be in the future.."
      );
    }

    await hp.start(2560000000);
    assert.isTrue(await hp.gameStarted());
    assert.equal(await hp.gameEndAt(), 2560000000);

    try {
      await hp.start(2560000000);
      throw null;
    } catch (error) {
      assert.isNotNull(error);
      assert.equal(
        error.message,
        "Returned error: VM Exception while processing transaction: revert Game has already started. -- Reason given: Game has already started.."
      );
    }
  });

  it("should register a player", async () => {
    hp = await HotPotato.new("Joe");

    // try to re-register name
    try {
      await hp.registerPlayer("Joe", { from: accounts[1] });
      throw null;
    } catch (error) {
      assert.isNotNull(error);
    }

    // try to register blank
    try {
      await hp.registerPlayer("", { from: accounts[1] });
      throw null;
    } catch (error) {
      assert.isNotNull(error);
    }

    // valid
    await hp.registerPlayer("Jane", { from: accounts[1] });
    assert.equal(await hp.playerNamesToAddresses("Jane"), accounts[1]);

    // try to register second name
    try {
      await hp.registerPlayer("Jane 2", { from: accounts[1] });
      throw null;
    } catch (error) {
      assert.isNotNull(error);
    }

    await hp.start(2560000000);
    await hp.stop();

    // try to register after game is over
    try {
      await hp.registerPlayer("George", { from: accounts[2] });
      throw null;
    } catch (error) {
      assert.isNotNull(error);
    }
  });

  it("should throw the potato", async () => {
    hp = await HotPotato.new("Joe");
    await hp.registerPlayer("Jane", { from: accounts[1] });
    await hp.start(2560000000);
    await hp.throwPotato("Jane", { value: 1 });
    assert.equal(await hp.holder(), "Jane");

    // fence check
    try {
      await hp.throwPotato("Joe", { from: accounts[1], value: 1 });
      throw null;
    } catch (error) {
      assert.isNotNull(error);
    }

    // holder check
    try {
      await hp.throwPotato("Jane", { value: 1 });
      throw null;
    } catch (error) {
      assert.isNotNull(error);
    }

    await hp.throwPotato("Joe", { from: accounts[1], value: 2 });
    assert.equal(await hp.holder(), "Joe");

    await hp.stop();

    // game over check
    try {
      await hp.throwPotato("Jane", { value: 3 });
      throw null;
    } catch (error) {
      assert.isNotNull(error);
    }
  });

  it("winner can claim reward", async () => {
    hp = await HotPotato.new("Joe");
    await hp.registerPlayer("Jane", { from: accounts[1] });
    await hp.start(2560000000);
    await hp.throwPotato("Jane", { value: 1 });
    await hp.throwPotato("Joe", { from: accounts[1], value: 2 });
    await hp.throwPotato("Jane", { value: 4 });
    await hp.throwPotato("Joe", { from: accounts[1], value: 8 });
    await hp.throwPotato("Jane", { value: 16 });

    // claim before end
    try {
      await hp.claim();
      throw null;
    } catch (error) {
      assert.isNotNull(error);
    }

    await hp.stop();

    // claim by non-winner
    try {
      await hp.claim({ from: accounts[1] });
      throw null;
    } catch (error) {
      assert.isNotNull(error);
    }

    await hp.claim();

    // repeat claim
    try {
      await hp.claim();
      throw null;
    } catch (error) {
      assert.isNotNull(error);
    }
  });
});
