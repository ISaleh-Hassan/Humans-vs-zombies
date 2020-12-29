package experis.humansvszombies.hvz.models.datastructures;

import java.util.List;

import experis.humansvszombies.hvz.models.enums.UserType;

public class UserAccountObject {
    private Integer userAccountId;
    private String firstName;
    private String lastName;
    private UserType userType;
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private String jwt;
    private List<String> roles;

    public UserAccountObject() {

    }

    public UserAccountObject(int userAccountId, String firstName, String lastName, UserType userType,
                    String username, String password, String email, String phoneNumber) {
        this.userAccountId = userAccountId;
        this.firstName = firstName;
        this.lastName= lastName;
        this.userType = userType;
        this.username = username;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    public Integer getUserAccountId() {
        return userAccountId;
    }

    public void setUserAccountId(Integer userAccountId) {
        this.userAccountId = userAccountId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
