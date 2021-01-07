package experis.humansvszombies.hvz.controllers.api;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import experis.humansvszombies.hvz.models.datastructures.UserAccountObject;
import experis.humansvszombies.hvz.models.tables.UserAccount;
import experis.humansvszombies.hvz.repositories.UserAccountRepository;
import experis.humansvszombies.hvz.security.jwt.JwtUtils;
import experis.humansvszombies.hvz.security.services.UserDetailsImpl;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class UserAccountController {
    @Autowired
    UserAccountRepository userAccountRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @CrossOrigin()
    @GetMapping("/api/fetch/useraccount/all")
    @PreAuthorize("hasAuthority('ADMINISTRATOR') or hasAuthority('PLAYER')")
    public ResponseEntity<ArrayList<UserAccountObject>> getAllUsers() {
        ArrayList<UserAccount> users = (ArrayList<UserAccount>) userAccountRepository.findAll();
        ArrayList<UserAccountObject> returnUsers = new ArrayList<UserAccountObject>();
        for (UserAccount userAccount : users) {
            returnUsers.add(this.createUserAccountObject(userAccount));
        }
        System.out.println("Fetched all useraccounts");
        return new ResponseEntity<>(returnUsers, HttpStatus.OK);
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/useraccount/{userAccountId}")
    @PreAuthorize("hasAuthority('ADMINISTRATOR') or hasAuthority('PLAYER')")
    public ResponseEntity<UserAccountObject> getUserById(@PathVariable Integer userAccountId) {
        try {
            return userAccountRepository.findById(userAccountId)
                    .map(user -> new ResponseEntity<>(this.createUserAccountObject(user), HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>((UserAccountObject) null, HttpStatus.NOT_FOUND));
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id was null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println(
                    "Exception thrown: Something unexpected went wrong when fetching UserAccount based on id.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @PostMapping("/api/create/useraccount")
    public ResponseEntity<UserAccountObject> addUserAccount(@RequestBody UserAccount newUserAccount) {
        try {
            if (newUserAccount == null) {
                System.out.println("ERROR: newUserAccount was null when trying to create new account.");
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            if (newUserAccount.getPassword() == null || newUserAccount.getPassword().length() < 6) {
                System.out.println("ERROR: password was too short when trying to create a new account.");
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            if (newUserAccount.getUsername() == null || newUserAccount.getUsername().length() < 2) {
                System.out.println("ERROR: username was null or too short when trying to create a new account.");
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            if (newUserAccount.getFirstName() == null || newUserAccount.getFirstName().length() < 1) {
                System.out.println("ERROR: firstname was null or too short when trying to create a new account.");
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            if (newUserAccount.getLastName() == null || newUserAccount.getLastName().length() < 1) {
                System.out.println("ERROR: lastname was null or too short when trying to create a new account.");
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            if (newUserAccount.getEmail() == null || newUserAccount.getEmail().length() < 5) {
                System.out.println("ERROR: email was null or too when trying to create a new account.");
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            HttpStatus response = HttpStatus.CREATED;
            BCryptPasswordEncoder encrypter = new BCryptPasswordEncoder();
            newUserAccount.setPassword(encrypter.encode(newUserAccount.getPassword()));
            userAccountRepository.save(newUserAccount);
            System.out.println("UserAccount CREATED with id: " + newUserAccount.getUserAccountId());
            return new ResponseEntity<>(this.createUserAccountObject(newUserAccount), response);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: newUserAccount was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (DataIntegrityViolationException e) {
            System.out.println("Exception thrown: email or username must be unique.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println("Exception thrown: Something unexpected went wrong when creating a UserAccount.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @PatchMapping("/api/update/useraccount/{userAccountId}")
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    public ResponseEntity<UserAccountObject> updateUser(@RequestBody UserAccount newUser,
            @PathVariable Integer userAccountId) {
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
                if (newUser.getUserType() != null) {
                    user.setUserType(newUser.getUserType());
                }
                if (newUser.getUsername() != null) {
                    user.setUsername(newUser.getUsername());
                }
                if (newUser.getPassword() != null) {
                    user.setPassword(newUser.getPassword());
                }
                if (newUser.getEmail() != null) {
                    user.setEmail(newUser.getEmail());
                }
                if (newUser.getPhoneNumber() != null) {
                    user.setPhoneNumber(newUser.getPhoneNumber());
                }
                userAccountRepository.save(user);
                response = HttpStatus.OK;
                System.out.println("Updated user with id: " + user.getUserAccountId());
            } else {
                System.out.println("Could not find user with id: " + userAccountId);
                user = null;
                response = HttpStatus.NOT_FOUND;
            }
            return new ResponseEntity<>(this.createUserAccountObject(user), response);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id or user was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println("Exception thrown: Something unexpected went wrong when updating a UserAccount.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @DeleteMapping("/api/delete/useraccount/{userAccountId}")
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    public ResponseEntity<String> deleteUserAccount(@PathVariable Integer userAccountId) {
        try {
            String message = "";
            HttpStatus response;
            UserAccount userAccount = userAccountRepository.findById(userAccountId).orElse(null);
            if (userAccount != null) {
                userAccountRepository.deleteById(userAccountId);
                System.out.println("UserAccount DELETED with id: " + userAccount.getUserAccountId());
                message = "SUCCESS";
                response = HttpStatus.OK;
            } else {
                message = "FAILED";
                response = HttpStatus.NOT_FOUND;
            }
            return new ResponseEntity<>(message, response);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: userAccountId was null.");
            return new ResponseEntity<>("FAILED", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println("Exception thrown: Something unexpected went wrong when deleting a UserAccount.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @PostMapping("/api/useraccount/login")
    public ResponseEntity<UserAccountObject> loginUser(@RequestBody UserAccount userAccount) {
        try {
            
        UserAccountObject userInfo = null;
        HttpStatus status = HttpStatus.BAD_REQUEST;
            if (userAccount != null) {
                UserAccount user = userAccountRepository.findDistinctByEmail(userAccount.getEmail());
                if (user == null) {
                    UserAccount userPhone = userAccountRepository.findDistinctByPhoneNumber(userAccount.getPhoneNumber());
                    //Compare supplied phone number to account phone number and return SUCCESS message if login information is correct.
                    if (userPhone.getPhoneNumber().equals(userAccount.getPhoneNumber())) {

                        UserAccountObject response = new UserAccountObject(userPhone.getUserAccountId(), null, null,
                                userPhone.getUserType(), userPhone.getUsername(), null, null, null);

                        return ResponseEntity.ok(response);
                    }
                }
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(user.getUsername(), userAccount.getPassword()));

                SecurityContextHolder.getContext().setAuthentication(authentication);
                String jwt = jwtUtils.generateJwtToken(authentication);
                UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
                List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                        .collect(Collectors.toList());

                UserAccountObject response = new UserAccountObject(user.getUserAccountId(), null, null,
                        user.getUserType(), user.getUsername(), null, null, null);
                response.setJwt(jwt);
                response.setRoles(roles);
                return ResponseEntity.ok(response);
            } else {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            System.out.println(e);
            System.out.println("Exception thrown: Something unexpected went wrong when logging in.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    private UserAccountObject createUserAccountObject(UserAccount userAccount) {
        UserAccountObject userAccountObject = new UserAccountObject(userAccount.getUserAccountId(), null, null,
                userAccount.getUserType(), userAccount.getUsername(), null, null, null);
        return userAccountObject;
    }

}
