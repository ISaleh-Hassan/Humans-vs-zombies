package experis.humansvszombies.hvz.controllers.api;

import java.util.ArrayList;

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

    @CrossOrigin
    @GetMapping("/api/fetch/useraccount/all")
    public ResponseEntity<ArrayList<UserAccount>> getAllUsers() {
        ArrayList<UserAccount> users = (ArrayList<UserAccount>)userAccountRepository.findAll();
        System.out.println("Fetched all useraccounts");
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/api/create/useraccount")
    public ResponseEntity<UserAccount> addUserAccount(@RequestBody UserAccount newUserAccount) {
            HttpStatus response = HttpStatus.CREATED;
            userAccountRepository.save(newUserAccount);
            System.out.println("UserAccount CREATED with id: " + newUserAccount.getUserAccountId());
            return new ResponseEntity<>(newUserAccount, response);
    }

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
