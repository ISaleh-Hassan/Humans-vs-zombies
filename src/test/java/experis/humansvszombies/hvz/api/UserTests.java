package experis.humansvszombies.hvz.api;

import experis.humansvszombies.hvz.controllers.api.UserAccountController;
import experis.humansvszombies.hvz.models.tables.UserAccount;
import experis.humansvszombies.hvz.models.tables.enums.UserType;
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
        ResponseEntity<UserAccount> response = uac.updateUser(new UserAccount("Updated firstName","updated lastName", UserType.ADMINSTRATOR,"TestUsername" ,"TestPassword","test@test.test"), id);
        assertEquals("Updated firstName", response.getBody().getFirstName());
        assertEquals("updated lastName", response.getBody().getLastName());
        assertEquals(UserType.ADMINSTRATOR, response.getBody().getUserType());
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

    int createTestUserAccount() {
        ResponseEntity<UserAccount> response = uac.addUserAccount(new UserAccount());
        return response.getBody().getUserAccountId();
    }
}
