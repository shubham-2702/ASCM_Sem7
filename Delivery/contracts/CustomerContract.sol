//SPDX-License-Identifier:GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

contract CustomerContract {
    struct customer {
        string name;
        string add;
        uint256 phone;
        string fileurl;
        uint256 zip;
        string state;
        bool set; // This boolean is used to differentiate between unset and zero struct values
        //Designation Remaining
    }

    address[] public customerRecords;
    uint256 public customerCount = 0;

    // mapping (address => bool) public customerAddr;

    mapping(address => customer) public customers;

    // address payable[] public customer;

    function addCustomer(
        address _customerAddress,
        string memory name,
        uint256 phone,
        string memory add,
        uint256 zip,
        string memory state,
        string memory file
    ) public {
        customer storage user = customers[_customerAddress];
        require(!user.set);
        customers[_customerAddress] = customer({
            name: name,
            phone: phone,
            add: add,
            zip: zip,
            state: state,
            fileurl: file,
            set: true
        });
        // customerAddr[_customerAddress] = true;
        // customers[_customerAddress] = _ipfsHash;
        customerRecords.push(_customerAddress);
        customerCount++;
    }

    function hasCustomer(address _customerAddress) public view returns (bool) {
        if (customers[_customerAddress].set == true) {
            return true;
        } else return false;
    }

    function getCustomerName(address _customerAddress)
        public
        view
        returns (string memory)
    {
        string memory answer = customers[_customerAddress].name;
        return answer;
    }

    function getCustomerPhone(address _customerAddress)
        public
        view
        returns (uint256)
    {
        uint256 answer = customers[_customerAddress].phone;
        return answer;
    }

    function getCustomerAddress(address _customerAddress)
        public
        view
        returns (string memory)
    {
        string memory answer = customers[_customerAddress].add;
        return answer;
    }

    function getCustomerZip(address _customerAddress)
        public
        view
        returns (uint256)
    {
        uint256 answer = customers[_customerAddress].zip;
        return answer;
    }

    function getCustomerState(address _customerAddress)
        public
        view
        returns (string memory)
    {
        string memory answer = customers[_customerAddress].state;
        return answer;
    }

    function getCustomerFile(address _customerAddress)
        public
        view
        returns (string memory)
    {
        string memory answer = customers[_customerAddress].fileurl;
        return answer;
    }

    // function getCustomers() public returns(address[] memory){
    //     delete addressValues;
    //     for(uint i=0; i< customerRecords.length; i++) {
    //             addressValues.push(customerRecords[i]);
    //     }

    //     return addressValues;
    // }

    // function customerCount() public returns(uint){
    //     delete addressValues;
    //     for(uint i=0; i< customerRecords.length; i++) {
    //             addressValues.push(customerRecords[i]);
    //     }

    //     return addressValues.length;
    // }
}



