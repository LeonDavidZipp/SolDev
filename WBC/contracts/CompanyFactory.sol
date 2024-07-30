// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0;

import "./Company.sol";

contract CompanyFactory {
    mapping(bytes32 => address) public companiesCreated;

    event factoryCreated(
        address _address
    );
    event companyContractDeployed(
        address _newAddress,
        bytes32 _company
    );

    /**
     * Constructor for CompanyFactory contract
     * Emits an event when this contract is created
     */
    constructor() {
        emit factoryCreated(address(this));
    }

    /**
     * Deploys a new complaint contract for a company
     * @param _name - name of company (e.g., "ExampleCompany")
     * @param _street - street address of company (e.g., "1234 Example Street")
     * @param _city - city of company (e.g., "Example Town")
     * @param _zipCode - zip code of company (e.g., "12345")
     * @param _state - state of company (e.g., "Example State")
     * @param _country - country of company (e.g., "Example Country")
     * @param _ctype - type of complaint (e.g., "Harassment")
     * @param _text - text of complaint (e.g., "I was harassed by a coworker on a conference call. Management did nothing.")
     * @param _supportingDocuments - array of supporting documents (e.g., ["example.com/document1", "example.com/document2"])
     */
    function deployNewContract(
        bytes32 _name,
        bytes32 _street,
        bytes32 _city,
        uint16 _zipCode,
        bytes32 _state,
        bytes32 _country,
        bytes32 _ctype,
        string memory _text,
        string[10] memory _supportingDocuments
    ) public returns (address) {
        require(companiesCreated[_name] == address(0), "Contract exists");

        Company newContract = new Company(
            _name,
            _street,
            _city,
            _zipCode,
            _state,
            _country,
            _ctype,
            _text,
            _supportingDocuments
        );

        companiesCreated[_name] = address(newContract);

        emit companyContractDeployed(address(newContract), _name);

        return address(newContract);
    }
}
