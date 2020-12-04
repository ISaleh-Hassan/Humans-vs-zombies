package experis.humansvszombies.hvz.controllers.api;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import experis.humansvszombies.hvz.models.tables.UserAccount;
import experis.humansvszombies.hvz.repositories.UserAccountRepository;



@RestController
public class UserAccountController {
    @Autowired
    UserAccountRepository userAccountRepository;

    @CrossOrigin()
    @GetMapping("/api/fetch/useraccount/all")
    public ResponseEntity<ArrayList<UserAccount>> getAllUsers() {
        ArrayList<UserAccount> users = (ArrayList<UserAccount>)userAccountRepository.findAll();
        System.out.println("Fetched all useraccounts");
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/useraccount/{userAccountId}")
    public ResponseEntity<UserAccount> getUserById(@PathVariable Integer userAccountId) {
        try {
            return userAccountRepository.findById(userAccountId)
                    .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>((UserAccount) null, HttpStatus.NOT_FOUND));
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id was null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @PostMapping("/api/create/useraccount")
    public ResponseEntity<UserAccount> addUserAccount(@RequestBody UserAccount newUserAccount) {
            HttpStatus response = HttpStatus.CREATED;
            userAccountRepository.save(newUserAccount);
            System.out.println("UserAccount CREATED with id: " + newUserAccount.getUserAccountId());
            return new ResponseEntity<>(newUserAccount, response);
    }

    @CrossOrigin()
    @PatchMapping("/api/update/useraccount/{userAccountId}")
    public ResponseEntity<UserAccount> updateUser(@RequestBody UserAccount newUser, @PathVariable Integer userAccountId) {
        try {
            UserAccount user;
            HttpStatus response;
            if (userAccountRepository.existsById(userAccountId)) {
                user = userAccountRepository.findById(userAccountId).get();

                if (newUser.getFirstName() != null) {
                    user.setFirstName(newUser.getFirstName());
                }
                if (newUser.getLastName() != null) {
                    user.setLastName(newUser.getLastName());
                }
                if (newUser.getUsername() != null) {
                    user.setUsername(newUser.getUsername());
                }
                if (newUser.getPassword() != null) {
                    user.setPassword(newUser.getPassword());
                }
                userAccountRepository.save(user);
                response = HttpStatus.OK;
                System.out.println("Updated user with id: " + user.getUserAccountId());
            } else {
                System.out.println("Could not find user with id: " + userAccountId);
                user = null;
                response = HttpStatus.NOT_FOUND;
            }
            return new ResponseEntity<>(user, response);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id or user was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @DeleteMapping("/api/delete/useraccount/{userAccountId}")
    public ResponseEntity<String> deleteUserAccount(@PathVariable Integer userAccountId) {
        String message = "";
        HttpStatus response;
        UserAccount userAccount = userAccountRepository.findById(userAccountId).orElse(null);
        if(userAccount != null) {
            userAccountRepository.deleteById(userAccountId);
            System.out.println("UserAccount DELETED with id: " + userAccount.getUserAccountId());
            message = "SUCCESS";
            response = HttpStatus.OK;
        } else {
            message = "FAILED";
            response = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(message, response);
    }
}
