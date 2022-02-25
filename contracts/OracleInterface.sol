// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

abstract contract OracleInterface {
    Character[] characters;

    mapping(uint256 => uint256) _charIdToIndex;
    mapping(uint256 => uint256) _marvelIdToId;

    struct Character {
        uint256 id;
        uint256 marvelId;
        string name;
        string description;
        uint256 appearances;
    }

    function testConnection() public pure virtual returns (bool);

    function characterExists(uint256 _charId)
        public
        view
        virtual
        returns (bool);

    function getAllCharacters() public view virtual returns (uint256[] memory);

    function getCharacterById(uint256 _charId)
        public
        view
        virtual
        returns (
            uint256,
            uint256,
            string memory,
            string memory,
            uint256
        );

    function getCharacterByMarvelId(uint256 _marvelId)
        public
        view
        virtual
        returns (
            uint256,
            uint256,
            string memory,
            string memory,
            uint256
        );

    function getLatestCharacter()
        public
        view
        virtual
        returns (
            uint256,
            uint256,
            string memory,
            string memory,
            uint256
        );

    function addTestData() public virtual;
}
