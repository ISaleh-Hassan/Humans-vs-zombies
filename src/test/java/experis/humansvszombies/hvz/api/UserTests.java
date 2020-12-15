package experis.humansvszombies.hvz.api;

import experis.humansvszombies.hvz.controllers.api.UserAccountController;
import experis.humansvszombies.hvz.models.datastructures.UserAccountObject;
import experis.humansvszombies.hvz.models.enums.UserType;
import experis.humansvszombies.hvz.models.tables.UserAccount;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class UserTests {
    @Autowired
    UserAccountController uac;
    private int userAccountId;

    @BeforeEach
    void initTest() {
        ResponseEntity<UserAccountObject> response = uac.addUserAccount(new UserAccount());
        this.userAccountId = response.getBody().getUserAccountId();
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @AfterEach
    void cleanTest() {
        ResponseEntity<String> response = uac.deleteUserAccount(this.userAccountId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        ResponseEntity<UserAccountObject> response2 = uac.getUserById(userAccountId);
        assertEquals(HttpStatus.NOT_FOUND, response2.getStatusCode());
    }

    @Test
    void getAllUsers() {
        ResponseEntity<ArrayList<UserAccountObject>> response = uac.getAllUsers();
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void getUserById() {
        int id = this.userAccountId;
        ResponseEntity<UserAccountObject> response = uac.getUserById(id);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void createUser() {
        ResponseEntity<UserAccountObject> response = uac.addUserAccount(new UserAccount("Test","Person", UserType.PLAYER,"TestUsername" ,"TestPassword","test@test.test", "1234567890"));
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(null, response.getBody().getFirstName());
        assertEquals(null, response.getBody().getLastName());
        assertEquals(UserType.PLAYER, response.getBody().getUserType());
        assertEquals("TestUsername", response.getBody().getUsername());
        assertEquals(null, response.getBody().getPassword());
        assertEquals(null, response.getBody().getEmail());
        assertEquals(null, response.getBody().getPhoneNumber());
        ResponseEntity<String> deleteResponse = uac.deleteUserAccount(response.getBody().getUserAccountId());
        assertEquals(HttpStatus.OK, deleteResponse.getStatusCode());
    }

    @Test
    void updateUser() {
        int id = userAccountId;
        ResponseEntity<UserAccountObject> response = uac.updateUser(new UserAccount("Updated firstName","updated lastName", UserType.ADMINISTRATOR,"TestUsername" ,"TestPassword","test@test.test", "1234567890"), id);
        assertEquals(null, response.getBody().getFirstName());
        assertEquals(null, response.getBody().getLastName());
        assertEquals(UserType.ADMINISTRATOR, response.getBody().getUserType());
        assertEquals("TestUsername", response.getBody().getUsername());
        assertEquals(null, response.getBody().getPassword());
        assertEquals(null, response.getBody().getEmail());
        assertEquals(null, response.getBody().getPhoneNumber());
    }

    @Test
    void deleteUser() {
        int id = createTestUserAccount();
        ResponseEntity<UserAccountObject> response1 = uac.getUserById(id);
        assertEquals(HttpStatus.OK, response1.getStatusCode());
        ResponseEntity<String> response2 = uac.deleteUserAccount(id);
        assertEquals(HttpStatus.OK, response2.getStatusCode());
        response1 = uac.getUserById(id);
        assertEquals(HttpStatus.NOT_FOUND, response1.getStatusCode());
    }

    @Test
    void createDuplicateUser() {
        ResponseEntity<UserAccountObject> response = uac.addUserAccount(new UserAccount("Steve", "Harrington", UserType.PLAYER, "Scopes", "icecream", "scopes@email.com", "1234567890"));
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        int stevesId = response.getBody().getUserAccountId();
        ResponseEntity<UserAccountObject> response2 = uac.addUserAccount(new UserAccount("Steve", "Harrington", UserType.PLAYER, "Scopes", "icecream", "scopes@email.com", "1234567890"));
        assertEquals(HttpStatus.BAD_REQUEST, response2.getStatusCode());
        //Delete steves account again.
        ResponseEntity<String> deleteResponse = uac.deleteUserAccount(stevesId);
        assertEquals(HttpStatus.OK, deleteResponse.getStatusCode());
    }

    @Test
    void loginUser() {
        //Create a user to test against.
        UserAccount stevesAccount = new UserAccount("Steve", "Harrington", UserType.PLAYER, "Scoops", "icecream", "scoopes@email.com", "1234567890");
        ResponseEntity<UserAccountObject> response = uac.addUserAccount(stevesAccount);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        //Try to login user with correct information.
        ResponseEntity<UserAccountObject> loginResponse = uac.loginUser(new UserAccount(null,null,null,null,"icecream", "scoopes@email.com", null));
        assertEquals(HttpStatus.OK, loginResponse.getStatusCode());
        assertEquals("Scoops", loginResponse.getBody().getUsername());
        assertEquals(UserType.PLAYER, loginResponse.getBody().getUserType());
        assertEquals(response.getBody().getUserAccountId(), loginResponse.getBody().getUserAccountId());
        //Try to login user with faulty username.
        loginResponse = uac.loginUser(new UserAccount(null,null,null,null,"icecream12", "scoopes@email.com", null));
        assertEquals(HttpStatus.BAD_REQUEST, loginResponse.getStatusCode());
        //Try to login user with faulty email.
        loginResponse = uac.loginUser(new UserAccount(null,null,null,null,"icecream", "scoopes12@email.com", null));
        assertEquals(HttpStatus.BAD_REQUEST, loginResponse.getStatusCode());
        //Delete the UserAccount again.
        ResponseEntity<String> deleteResponse = uac.deleteUserAccount(response.getBody().getUserAccountId());
        assertEquals(HttpStatus.OK, deleteResponse.getStatusCode());
    }

    int createTestUserAccount() {
        ResponseEntity<UserAccountObject> response = uac.addUserAccount(new UserAccount());
        return response.getBody().getUserAccountId();
    }
}
