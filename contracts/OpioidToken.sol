pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";


contract OpioidToken is ERC20, ERC20Burnable, ERC20Detailed {
  constructor(
    string memory name,
    string memory symbol,
    uint8 decimals,
    uint256 initialSupply
  )
    ERC20Burnable()
    ERC20Detailed(name, symbol, decimals)
    ERC20()
    public
  {
    _mint(msg.sender, initialSupply);
  }
}
