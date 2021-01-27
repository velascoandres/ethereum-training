// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;
contract UsersContract {
    
    struct User {
        string name;
        string surname;
    }


    mapping(address => User) private users;
    mapping(address => bool) private joinedUsers;

    address[] private total;

    event onUserJoined(address, string);


    function join(string memory name, string memory surname) public{
       
       require(!usersJoined(msg.sender), 'Ya existe el usuario');

       User  storage user =  users[msg.sender];
       user.name = name;
       user.surname = surname;
       joinedUsers[msg.sender] = true;
       total.push(msg.sender);

       emit onUserJoined(msg.sender, string(abi.encodePacked(name, ' ' , surname)));

    }

    function getUser(address addr) public view returns (string memory, string memory){
        require(usersJoined(addr), 'No existe el usuario');
        User memory user = users[addr];
        return(user.name, user.surname);
    }

    function usersJoined(address addr) private view returns(bool){
        return joinedUsers[addr];
    }

    function totalUsers() public view returns (uint){
        return total.length;
    }

}