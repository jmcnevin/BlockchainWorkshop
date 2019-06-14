pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


// This contract will allow us to store a simple string inside the state, and change it as we like.
contract SimpleStorage is Ownable {
  string public storedData;

  event StoredDataChanged(string);

  constructor(string memory initialData) public {
    setStoredData(initialData);
  }

  function setStoredData(string memory newData)
    public
    onlyOwner
  {
    storedData = newData;
    emit StoredDataChanged(newData);
  }
}
