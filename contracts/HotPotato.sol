pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract HotPotato is Ownable {
  string public holder;
  uint256 public gameEndAt;
  bool public gameStarted;
  address payable _winnerAddr;
  string _winnerName;
  uint256 _oldBalance; // prevent race condition
  mapping(string => address) public playerNamesToAddresses;
  mapping(address => string) public playerAddressesToNames;
  string[] public playerNames;
  uint256 public playerCount;
  bool _prizeClaimed;

  event GameStarted(uint256 endAt);
  event PlayerRegistered(string playerName, address playerAddress);
  event PotatoThrown(string playerName, uint256 value);
  event WinnerClaimedPrize(string playerName, uint256 value);

  constructor(string memory playerName) public {
    registerPlayer(playerName);
    holder = playerName;
  }

  function start(uint256 _endAt)
    public
    onlyOwner
  {
    require(!gameStarted, "Game has already started.");
    require(_endAt > block.timestamp, "Ending time must be in the future."); // solium-disable-line security/no-block-members

    gameStarted = true;
    gameEndAt = _endAt;

    emit GameStarted(_endAt);
  }

  function registerPlayer(string memory _playerName) public {
    require((!gameStarted || !gameOver()), "Game has ended.");
    require(playerNamesToAddresses[_playerName] == address(0), "Player name is already registered.");

    bytes memory givenPlayerNameBytes = bytes(_playerName);
    require(givenPlayerNameBytes.length > 0, "Registered name cannot be blank.");

    bytes memory existingPlayerNameBytes = bytes(playerAddressesToNames[msg.sender]);
    require(existingPlayerNameBytes.length == 0, "Address already has a registered name.");

    playerNamesToAddresses[_playerName] = msg.sender;
    playerAddressesToNames[msg.sender] = _playerName;
    playerCount++;
    playerNames.push(_playerName);

    emit PlayerRegistered(_playerName, msg.sender);
  }

  function throwPotato(string memory _recipientName)
    public
    payable
  {
    require(!gameOver(), "Game is not running.");
    require(msg.sender == playerNamesToAddresses[holder], "You're not holding the potato.");
    require(msg.value > _oldBalance, "You didn't send enough ether to get over the fence.");

    address recipientAddr = playerNamesToAddresses[_recipientName];
    require(recipientAddr != address(0), "Unknown player.");
    require(recipientAddr.balance > msg.value, "Player would be stuck with potato, and that's mean.");

    _oldBalance = address(this).balance;
    holder = _recipientName;
    _winnerAddr = msg.sender;
    _winnerName = playerAddressesToNames[msg.sender];

    emit PotatoThrown(_recipientName, msg.value);
  }

  function gameOver() public view returns (bool) {
    return gameStarted && block.timestamp > gameEndAt; // solium-disable-line security/no-block-members
  }

  function claim()
    public
  {
    require(gameOver(), "The game isn't over yet.");
    require(_winnerAddr != address(0), "There is not currently a winner.");
    require(msg.sender == _winnerAddr, "Only the winner can get the rewards.");
    require(!_prizeClaimed, "Prize already claimed.");

    _prizeClaimed = true;

    uint256 jackpot = address(this).balance;

    emit WinnerClaimedPrize(playerAddressesToNames[_winnerAddr], jackpot);

    _winnerAddr.transfer(jackpot);
  }

  function stop()
    public
    onlyOwner
  {
    gameEndAt = 0;
  }

  function kaboom()
    public
    onlyOwner
  {
    selfdestruct(msg.sender);
  }

  function fenceHeight() public view returns(uint) {
    return address(this).balance;
  }
}
