// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0;

contract Company {
    /**
     * Simple struct for storing a company address
     */
    struct Address {
        bytes32     street;
        bytes32     city;
        uint16      zipCode;
        bytes32     state;
        bytes32     country;
    }
    /**
     * Simple struct for storing a complaint
     */
    struct Complaint {
        uint        id;
        bytes32     ctype;
        string      text;
        string[10]  supportingDocuments;
        uint16      witnessCount;
        uint16      disputeCount;
    }

    bytes32     public companyName;
    Address     public companyAddress;
    Complaint[] public complaints;

    /**
     * Emits when this is created
     * @param _company - the address of the company contract that is being created (this)
     * @param _name - name of the company (e.g., "ExampleCompany")
     * @param _address - the address of the company contract that is being created (this)
     */
    event companyCreated(
        address indexed _company,
        bytes32 _name,
        address indexed _address
    );
    /**
     * Emits when new complaint is added
     * @param _company - name of company
     * @param _ctype - type of complaint (e.g., "harrassment")
     * @param _text - text of complaint (maximum length of 500 characters)
     * @param _count - number of total number of complaints
     */
    event complaintAdded(
        bytes32 _company,
        bytes32 _ctype,
        string  _text,
        uint256 _count
    );

    /**
     * @param _name - name of company (e.g., "ExampleCompany")
     * @param _street - street address of company (e.g., "1234 Example Street")
     * @param _city - city of company (e.g., "Example Town")
     * @param _zipCode - zip code of company (e.g., "12345")
     * @param _state - state of company (e.g., "Example State")
     * @param _country - country of company (e.g., "Example Country")
     * @param _ctype - type of complaint (e.g., "Harassment")
     * @param _text - text of complaint (e.g., "I was harassed by a coworker on a conference call. Management did nothing.")
     */
    constructor(
        bytes32 _name,
        bytes32 _street,
        bytes32 _city,
        uint16 _zipCode,
        bytes32 _state,
        bytes32 _country,
        bytes32 _ctype,
        string memory _text,
        string[10] memory _supportingDocuments
    ) {
        companyName = _name;
        companyAddress = Address({
            street : _street,
            city : _city,
            zipCode : _zipCode,
            state : _state,
            country : _country
        });

        addComplaint(_ctype, _text, _supportingDocuments);
    }

    /**
     * Returns the company name, address & complaints
     * @return bytes32 - name of company
     * @return Address - address of company
     * @return Complaint[] - list of complaints received
     */
    function getCompany() public view returns (bytes32, Address memory, Complaint[] memory) {
        return (companyName, companyAddress, complaints);
    }

    /** 
     * Add a complaint to the list of complaints
     * @param _ctype - type of complaint (e.g., "harrassment")
     * @param _text - text of complaint (maximum length of 500 characters)
     */
    function addComplaint(
        bytes32 _ctype,
        string memory _text,
        string[10] memory _supportingDocuments
    ) public {
        require(bytes(_text).length <= 500, "Complaint exceeds maximum length of 100 characters.");
        require(_ctype != "", "Complaint type cannot be empty.");
        require(keccak256(bytes(_text)) != keccak256(bytes("")), "Complaint text cannot be empty.");
        require(_supportingDocuments.length <= 10, "Supporting documents cannot exceed 10.");
        complaints.push(Complaint(
            {
                id : complaints.length,
                ctype : _ctype,
                text : _text,
                supportingDocuments : _supportingDocuments,
                witnessCount: 0,
                disputeCount: 0
            }
        ));
        emit complaintAdded(
            companyName,
            _ctype,
            _text,
            complaints.length
        );
    }

    /**
     * Returns all complaints
     * @return Complaint[] - list of all complaints
     */
    function getComplaints() public view returns (Complaint[] memory) {
        return complaints;
    }

    /**
     * Returns specific complaint
     * @param _complaintId - id of complaint
     * @return Complaint - specific complaint
     */
    function getComplaint(uint _complaintId) public view returns (Complaint memory) {
        require (_complaintId < complaints.length, "Complaint does not exist.");
        return complaints[_complaintId];
    }

    /**
     * Allows different valid addresses to support a complaint
     * @param _id - id of complaint
     */
    function witnessComplaint(uint _id) public returns (uint) {
        require (_id < complaints.length, "Complaint does not exist.");
        complaints[_id].witnessCount++;
        return complaints[_id].witnessCount;
    }

    /**
     * Allows different valid addresses to dispute a complaint
     * @param _id - id of complaint
     */
    function disputeComplaint(uint _id) public returns (uint) {
        require (_id < complaints.length, "Complaint does not exist.");
        complaints[_id].disputeCount++;
        return complaints[_id].disputeCount;
    }
}
