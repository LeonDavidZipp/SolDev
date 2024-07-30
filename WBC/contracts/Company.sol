// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0;

contract Company {
    struct Address {
        bytes32 street;
        bytes32 city;
        uint16  zip_code;
        bytes32 state;
        bytes32 country;
    }
    struct Complaint {
        bytes32 ctype;
        string  text;
    }

    bytes32     public company_name;
    Address     public company_address;
    Complaint[] public complaints;

    event companyCreated(
        address indexed _company,
        bytes32 _name,
        address indexed _address
    );
    event complaintAdded(
        address indexed _company,
        bytes32 _ctype,
        string  _text
    );

    constructor(
        bytes32 _name,
        bytes32 _street,
        bytes32 _city,
        uint16 _zip_code,
        bytes32 _state,
        bytes32 country,
        bytes32 _ctype,
        string memory _text
        ) {
            company_name = _name;
            company_address = Address({
                street : _street,
                city : _city,
                zip_code : _zip_code,
                state : _state,
                country : country
            });

            add_complaint(_ctype, _text);
        }

    function add_complaint(bytes32 _ctype, string memory _text) public {
        require(bytes(_text).length <= 500, "Complaint exceeds maximum length of 100 characters.");
        complaints.push(Complaint({ctype : _ctype, text : _text}));
    }
}