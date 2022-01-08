// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Base64.sol";

contract AdroPunks is ERC721, ERC721Enumerable {
    using Counters for Counters.Counter;

    Counters.Counter private _idCounter;
    uint256 public maxSupply;

    constructor(uint256 _maxSupply) ERC721("AdroPunks", "ADPU") {
        maxSupply = _maxSupply;
    }

    function mint() public {
        uint256 current = _idCounter.current();
        require(current < maxSupply, "No AdroPunks left");
        _safeMint(msg.sender, current);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            "ERC721 Metada: URI query for nonecistent token"
        );
        // The only way to concat string is transform them to bytes with
        //abi.encodePacked(...) , and with the string() we can transform
        //them again into a string
        string memory jsonURI = Base64.encode(
            abi.encodePacked(
                '{ "name": "AdroPunks #',
                _tokenId,
                '", "description": "Adro Punks are randomized Avataaars and the only purpose is to test and improve knowledge about Solidity and ERC721", "image": "',
                "//TODO: Calculate img URL",
                '"}'
            )
        );

        return
            string(abi.encodePacked("data:application/json;base64,", jsonURI));
    }

    //Override require
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
