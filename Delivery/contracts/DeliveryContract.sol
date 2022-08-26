//SPDX-License-Identifier:GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

contract DeliveryContract {
    struct delivery {
        string vehicleRc;
        address owner;
        address customer;
        string deliveryId;
        bool isDone;
        uint256 from;
        uint256 to;
        string quantity;
        string lat;
        string long;
    }

    string[] public deliveryRecords;
    uint256 public deliveryCount = 0;

    string[] public deliveryDetail;

    mapping(string => delivery) public deliveryDetails;

    function addDelivery(
        string memory _rc,
        address _customerAddress,
        address _ownerAddress,
        string memory id,
        uint256 _from,
        uint256 _to,
        string memory _quantity,
        string memory _lat,
        string memory _long
    ) public {
        // delivery storage veh = deliveryDetails[id];
        deliveryDetails[id] = delivery({
            vehicleRc: _rc,
            customer: _customerAddress,
            owner: _ownerAddress,
            deliveryId: id,
            isDone: false,
            from: _from,
            to: _to,
            quantity: _quantity,
            lat: _lat,
            long: _long
        });

        deliveryRecords.push(id);
        deliveryCount++;
    }

    // receive() payable external{}

    function getDeliveryDetails(string memory id)
        public
        view
        returns (delivery memory)
    {
        delivery memory answer = deliveryDetails[id];
        return answer;
    }

    function doneDeliveryDetailsOfOwner(address _ownerAddress)
        public
        returns (string[] memory)
    {
        delete deliveryDetail;
        for (uint256 i = 0; i < deliveryRecords.length; i++) {
            if (deliveryDetails[deliveryRecords[i]].owner == _ownerAddress) {
                if(deliveryDetails[deliveryRecords[i]].isDone == true){
                    deliveryDetail.push(deliveryRecords[i]);
                }
            }
        }
        return deliveryDetail;
    }


    function pendingDeliveryDetailsOfOwner(address _ownerAddress)
        public
        returns (string[] memory)
    {
        delete deliveryDetail;
        for (uint256 i = 0; i < deliveryRecords.length; i++) {
            if (deliveryDetails[deliveryRecords[i]].owner == _ownerAddress) {
                if(deliveryDetails[deliveryRecords[i]].isDone == false){
                    deliveryDetail.push(deliveryRecords[i]);
                }
            }
        }
        return deliveryDetail;
    }


    function pendingDeliveryDetailsOfCustomer(address _customerAddress)
        public
        returns (string[] memory)
    {
        delete deliveryDetail;
        for (uint256 i = 0; i < deliveryRecords.length; i++) {
            if (deliveryDetails[deliveryRecords[i]].customer == _customerAddress) {
                if(deliveryDetails[deliveryRecords[i]].isDone == false){
                    deliveryDetail.push(deliveryRecords[i]);
                }
            }
        }
        return deliveryDetail;
    }

    function doneDeliveryDetailsOfCustomer(address _customerAddress)
        public
        returns (string[] memory)
    {
        delete deliveryDetail;
        for (uint256 i = 0; i < deliveryRecords.length; i++) {
            if (deliveryDetails[deliveryRecords[i]].customer == _customerAddress) {
                if(deliveryDetails[deliveryRecords[i]].isDone == true){
                    deliveryDetail.push(deliveryRecords[i]);
                }
            }
        }
        return deliveryDetail;
    }


    function updateLatLong(string memory _id, string memory _lat, string memory _long)
        public
       
    {       
        deliveryDetails[_id].lat=_lat;
        deliveryDetails[_id].long=_long;   
    }

    function checkDone(string memory _id, uint256 pinCode)
        public
       
    {       
        if(deliveryDetails[_id].to==pinCode){
            deliveryDetails[_id].isDone=true;
        }   
    }

    
}
