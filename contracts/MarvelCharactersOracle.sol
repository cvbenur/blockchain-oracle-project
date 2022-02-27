// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MarvelCharactersOracle is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _characterIdCounter;

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

    /// @notice Used to test the connection with the client
    /// @return Always `true`
    function testConnection() public pure returns (bool) {
        return true;
    }

    /// @notice Retrieves this contract's address
    /// @return The contract address
    function getAddress() public view returns (address) {
        return address(this);
    }

    /// @notice Checks whether an entry exists for the given Marvel Comics character ID
    /// @param _marvelId The Marvel Comics character ID to check
    /// @return `true` if it exists, else `false`
    function characterExists(uint256 _marvelId) public view returns (bool) {
        if (characters.length == 0) {
            return false;
        }

        uint256 charId = _marvelIdToId[_marvelId];

        return _charIdToIndex[charId] > 0;
    }

    /// @notice Retrieve the IDs of all the characters stored in the contract
    /// @return An array of unique character IDs
    function getAllCharacters() public view returns (uint256[] memory) {
        uint256[] memory ret = new uint256[](characters.length);

        if (characters.length > 0) {
            for (uint256 i = 0; i < characters.length; i++) {
                ret[i] = characters[i].id;
            }
        }

        return ret;
    }

    /// @notice Returns the index of a character from a given ID
    /// @param _charId The character ID
    /// @return An array index
    function _getCharacterIndexFromId(uint256 _charId)
        private
        view
        returns (uint256)
    {
        return _charIdToIndex[_charId];
    }

    /// @notice Returns a character from a given ID
    /// @param _charId The character ID
    /// @return The character data if it exists, `(0, 0, "", "", 0)` otherwise
    function getCharacterById(uint256 _charId)
        public
        view
        returns (
            uint256,
            uint256,
            string memory,
            string memory,
            uint256
        )
    {
        // If the character exists
        if (characterExists(_charId)) {
            // Retrieve character data
            Character storage retrieved = characters[
                _getCharacterIndexFromId(_charId)
            ];

            // Return the character data
            return (
                retrieved.id,
                retrieved.marvelId,
                retrieved.name,
                retrieved.description,
                retrieved.appearances
            );
        }

        // Else, return empty character data
        return (0, 0, "", "", 0);
    }

    /// @notice Returns a character from a given Marvel ID
    /// @param _marvelId The character's Marvel ID
    /// @return The character data if it exists, `(0, 0, "", "", 0)` otherwise
    function getCharacterByMarvelId(uint256 _marvelId)
        public
        view
        returns (
            uint256,
            uint256,
            string memory,
            string memory,
            uint256
        )
    {
        // Retrieve the character data by ID
        return getCharacterById(_marvelIdToId[_marvelId]);
    }

    /// @notice Returns the number of characters in the array
    /// @return The number of characters in the array
    function getNumberOfCharacters() public view returns (uint256) {
        // Return the length of the array
        return characters.length;
    }

    /// @notice Adds a new Marvel character into the blockchain
    /// @param _marvelId The character's ID in the Marvel Comics API - ex: 1009610
    /// @param _name The character's name - ex: Spider-Man (Peter Parker)
    /// @param _description The character's description in the Marvel Comics API - ex: "Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength and powers of a spider. Adopting the name Spider-Man, Peter hoped to start a career using his new abilities. Taught that with great power comes great responsibility, Spidey has vowed to use his powers to help people."
    /// @param _appearances The number of comics the character appears in - ex: 4098
    /// @return the unique id of the newly created match
    function addCharacter(
        uint256 _marvelId,
        string memory _name,
        string memory _description,
        uint256 _appearances
    ) public onlyOwner returns (uint256) {
        // Making sure that this character doesn't already exist
        require(!characterExists(_marvelId));

        // Starting IDs from 1 and not 0:
        _characterIdCounter.increment();

        // Get new incremental unique ID
        uint256 id = _characterIdCounter.current();

        // Adding the new character to the array
        characters.push(
            Character(id, _marvelId, _name, _description, _appearances)
        );

        // Updating the mappings
        uint256 newIndex = characters.length - 1;

        _charIdToIndex[id] = newIndex;
        _marvelIdToId[_marvelId] = id;

        // Returning the ID of the newly added character
        return id;
    }

    /// @notice Adds data to the contract for testing
    function addTestData() external onlyOwner {
        addCharacter(
            1009610,
            "Spider-Man (Peter Parker)",
            "Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength and powers of a spider. Adopting the name Spider-Man, Peter hoped to start a career using his new abilities. Taught that with great power comes great responsibility, Spidey has vowed to use his powers to help people.",
            4098
        );
        addCharacter(
            1009262,
            "Daredevil",
            "Abandoned by his mother, Matt Murdock was raised by his father, boxer 'Battling Jack' Murdock, in Hell's Kitchen. Realizing that rules were needed to prevent people from behaving badly, young Matt decided to study law; however, when he saved a man from an oncoming truck, it spilled a radioactive cargo that rendered Matt blind while enhancing his remaining senses. Under the harsh tutelage of blind martial arts master Stick, Matt mastered his heightened senses and became a formidable fighter.",
            1195
        );
        addCharacter(1011339, "Blue Marvel", "", 31);
        addCharacter(1009452, "Moon Knight", "", 268);
        addCharacter(1009399, "Legion", "", 94);
        addCharacter(1009191, "Blade", "", 103);
        addCharacter(
            1009577,
            "Shang-Chi",
            "Shang-Chi is the son of an internationally-renowned and powerful criminal mastermind whose childhood was a lonely one, full of constant training in rigorous mental and martial arts, with only limited contact with his parents.",
            249
        );
    }
}
