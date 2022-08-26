//SPDX-License-Identifier:GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

contract VehicleContract {
    struct vehicle {
        string ipfsHash;
        string rc;
        string name;
        address owner;
        uint256 pricePerKm;
        uint256 capacity;
        bool isAvailable;
        bool set;
    }

    string[] public vehicleRecords;
    uint256 public vehicleCount = 0;

    string[] public vehicleRc;

    mapping(string => vehicle) public vehicles;

    function addVehicle(
        string memory _rc,
        string memory _ipfsHash,
        address _ownerAddress,
        string memory _name,
        uint256 _pricePerKm,
        uint256 _capacity
    ) public {
        vehicle storage veh = vehicles[_rc];
        require(!veh.set);
        vehicles[_rc] = vehicle({
            rc: _rc,
            ipfsHash: _ipfsHash,
            name: _name,
            owner: _ownerAddress,
            pricePerKm: _pricePerKm,
            capacity: _capacity,
            isAvailable: true,
            set: true
        });

        vehicleRecords.push(_rc);
        vehicleCount++;
    }

    function getVehicleName(string memory _rc)
        public
        view
        returns (string memory)
    {
        string memory answer = vehicles[_rc].name;
        return answer;
    }

    function getVehicle(string memory _rc)
        public
        view
        returns (vehicle memory)
    {
        vehicle memory answer = vehicles[_rc];
        return answer;
    }

    function vehiclesOfOwner(address _ownerAddress)
        public
        returns (string[] memory)
    {
        delete vehicleRc;
        for (uint256 i = 0; i < vehicleRecords.length; i++) {
            if (vehicles[vehicleRecords[i]].owner == _ownerAddress) {
                vehicleRc.push(vehicleRecords[i]);
            }
        }
        return vehicleRc;
    }

    function changeState(string memory _rc)
        public
       
    {       
        if(vehicles[_rc].isAvailable==true){
            vehicles[_rc].isAvailable=false;
        }  
        else{
            vehicles[_rc].isAvailable=true;
        }
    }

    
}
