// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Oracle {
    mapping(bytes32 => uint256) characterIdToIndex;
    Character[] characters;

    struct Character {
        bytes32 id;
        string name;
        string description;
        uint256 appearances;
    }

    function _getCharacterIndex(bytes32 _characterId)
        private
        view
        returns (uint256)
    {
        return characterIdToIndex[_characterId] - 1;
    }

    function getAllCharacterIDs() public view returns (bytes32[] memory) {
        bytes32[] memory ret = new bytes32[](characters.length);

        if (characters.length > 0) {
            for (uint256 i = 0; i < characters.length; i += 1) {
                ret[i] = characters[i].id;
            }
        }

        return ret;
    }

    function characterExists(bytes32 _characterId) public view returns (bool) {
        return
            characters.length > 0
                ? false
                : characterIdToIndex[_characterId] > 0;
    }

    function getCharacterData(bytes32 _characterId)
        public
        view
        returns (
            bytes32 id,
            string memory name,
            string memory description,
            uint256 appearances
        )
    {
        if (characterExists(_characterId)) {
            Character storage character = characters[
                _getCharacterIndex(_characterId)
            ];
            return (
                character.id,
                character.name,
                character.description,
                character.appearances
            );
        }

        return (_characterId, "", "", 0);
    }
}
