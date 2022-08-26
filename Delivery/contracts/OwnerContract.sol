//SPDX-License-Identifier:GPL-3.0
pragma solidity >=0.4.22 <0.9.0;



contract OwnerContract{

    struct owner {
        string name;
        string add;
        uint256 phone;
        string fileurl;
        uint256 zip;
        string state;
        bool set; // This boolean is used to differentiate between unset and zero struct values
        //Designation Remaining
    }
    
    
    address[] public ownerRecords;
    uint public ownerCount=0;
    
    mapping (address => bool) public ownerAddr;

    mapping(address => owner) public owners;
    
  address[] ownersZip;
    

    function addOwner(
        address _ownerAddress,
        string memory name,
        uint256 phone,
        string memory add,
        uint256 zip,
        string memory state,
        string memory file
    ) public {
        owner storage user = owners[_ownerAddress];
        require(!user.set);
        owners[_ownerAddress] = owner({
            name: name,
            phone: phone,
            add: add,
            zip: zip,
            state: state,
            fileurl: file,
            set: true
        });
        // ownerAddr[_ownerAddress] = true;
        // owners[_ownerAddress] = _ipfsHash;
        ownerRecords.push(_ownerAddress);
        ownerCount++;
    }
    function hasOwner(address _ownerAddress) public view returns(bool){
        if(owners[_ownerAddress].set == true){
            return true;
        }
        else return false;
    }
    
    function getOwnerName(address _ownerAddress) public  view returns(string memory){
        string memory answer = owners[_ownerAddress].name;
        return answer;
    }

    function getownerPhone(address _ownerAddress)
        public
        view
        returns (uint256)
    {
        uint256 answer = owners[_ownerAddress].phone;
        return answer;
    }

    function getownerAddress(address _ownerAddress)
        public
        view
        returns (string memory)
    {
        string memory answer = owners[_ownerAddress].add;
        return answer;
    }

    function getownerZip(address _ownerAddress)
        public
        view
        returns (uint256)
    {
        uint256 answer = owners[_ownerAddress].zip;
        return answer;
    }

    function getownerState(address _ownerAddress)
        public
        view
        returns (string memory)
    {
        string memory answer = owners[_ownerAddress].state;
        return answer;
    }

    function getownerFile(address _ownerAddress)
        public
        view
        returns (string memory)
    {
        string memory answer = owners[_ownerAddress].fileurl;
        return answer;
    }


    function ownersInZip(uint256 _zip)
        public
        returns (address[] memory)
    {
        delete ownersZip;
        for (uint256 i = 0; i < ownerRecords.length; i++) {
            if (owners[ownerRecords[i]].zip == _zip) {
                ownersZip.push(ownerRecords[i]);
            }
        }
        return ownersZip;
    }

    
    // function getowners() public returns(address[] memory){
    //     delete addressValues;
    //     for(uint i=0; i< ownerRecords.length; i++) {
    //             addressValues.push(ownerRecords[i]);
    //     }
        
    //     return addressValues;
    // }
    
    // function ownerCount() public returns(uint){
    //     delete addressValues;
    //     for(uint i=0; i< ownerRecords.length; i++) {
    //             addressValues.push(ownerRecords[i]);
    //     }
        
    //     return addressValues.length;
    // }
    
}