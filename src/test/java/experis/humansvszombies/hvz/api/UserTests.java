package experis.humansvszombies.hvz.api;

import experis.humansvszombies.hvz.controllers.api.UserAccountController;
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
        ResponseEntity<UserAccount> response = uac.addUserAccount(new UserAccount());
        this.userAccountId = response.getBody().getUserAccountId();
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @AfterEach
    void cleanTest() {
        ResponseEntity<String> response = uac.deleteUserAccount(this.userAccountId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        ResponseEntity<UserAccount> response2 = uac.getUserById(userAccountId);
        assertEquals(HttpStatus.NOT_FOUND, response2.getStatusCode());
    }

    @Test
    void getAllUsers() {
        ResponseEntity<ArrayList<UserAccount>> response = uac.getAllUsers();
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void getUserById() {
        int id = this.userAccountId;
        ResponseEntity<UserAccount> response = uac.getUserById(id);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void createUser() {
        ResponseEntity<UserAccount> response = uac.addUserAccount(new UserAccount("Test","Person", UserType.PLAYER,"TestUsername" ,"TestPassword","test@test.test"));
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("Test", response.getBody().getFirstName());
        assertEquals("Person", response.getBody().getLastName());
        assertEquals(UserType.PLAYER, response.getBody().getUserType());
        assertEquals("TestUsername", response.getBody().getUsername());
        assertEquals("TestPassword", response.getBody().getPassword());
        assertEquals("test@test.test", response.getBody().getEmail());
    }

    @Test
    void updateUser() {
        int id = userAccountId;
        ResponseEntity<UserAccount> response = uac.updateUser(new UserAccount("Updated firstName","updated lastName", UserType.ADMINISTRATOR,"TestUsername" ,"TestPassword","test@test.test"), id);
        assertEquals("Updated firstName", response.getBody().getFirstName());
        assertEquals("updated lastName", response.getBody().getLastName());
        assertEquals(UserType.ADMINISTRATOR, response.getBody().getUserType());
        assertEquals("TestUsername", response.getBody().getUsername());
        assertEquals("TestPassword", response.getBody().getPassword());
        assertEquals("test@test.test", response.getBody().getEmail());
    }

    @Test
    void deleteUser() {
        int id = createTestUserAccount();
        ResponseEntity<UserAccount> response1 = uac.getUserById(id);
        assertEquals(HttpStatus.OK, response1.getStatusCode());
        ResponseEntity<String> response2 = uac.deleteUserAccount(id);
        assertEquals(HttpStatus.OK, response2.getStatusCode());
        response1 = uac.getUserById(id);
        assertEquals(HttpStatus.NOT_FOUND, response1.getStatusCode());
    }

    @Test
    void createDuplicateUser() {
        ResponseEntity<UserAccount> response = uac.addUserAccount(new UserAccount("Steve", "Harrington", UserType.PLAYER, "Scopes", "icecream", "scopes@email.com"));
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        int stevesId = response.getBody().getUserAccountId();
        ResponseEntity<UserAccount> response2 = uac.addUserAccount(new UserAccount("Steve", "Harrington", UserType.PLAYER, "Scopes", "icecream", "scopes@email.com"));
        assertEquals(HttpStatus.BAD_REQUEST, response2.getStatusCode());
        //Delete steves account again.
        ResponseEntity<String> deleteResponse = uac.deleteUserAccount(stevesId);
        assertEquals(HttpStatus.OK, deleteResponse.getStatusCode());
    }

    @Test
    void loginUser() {
        //Create a user to test against.
        UserAccount stevesAccount = new UserAccount("Steve", "Harrington", UserType.PLAYER, "Scoops", "icecream", "scoopes@email.com");
        ResponseEntity<UserAccount> response = uac.addUserAccount(stevesAccount);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        //Try to login user with correct information.
        ResponseEntity<String> loginResponse = uac.loginUser(new UserAccount(null,null,null,null,"icecream", "scoopes@email.com"));
        assertEquals(HttpStatus.OK, loginResponse.getStatusCode());
        //Try to login user with faulty username.
        loginResponse = uac.loginUser(new UserAccount(null,null,null,null,"icecream12", "scoopes@email.com"));
        assertEquals(HttpStatus.BAD_REQUEST, loginResponse.getStatusCode());
        //Try to login user with faulty email.
        loginResponse = uac.loginUser(new UserAccount(null,null,null,null,"icecream", "scoopes12@email.com"));
        assertEquals(HttpStatus.BAD_REQUEST, loginResponse.getStatusCode());
        //Delete the UserAccount again.
        ResponseEntity<String> deleteResponse = uac.deleteUserAccount(response.getBody().getUserAccountId());
        assertEquals(HttpStatus.OK, deleteResponse.getStatusCode());
    }

    int createTestUserAccount() {
        ResponseEntity<UserAccount> response = uac.addUserAccount(new UserAccount());
        return response.getBody().getUserAccountId();
    }
}
