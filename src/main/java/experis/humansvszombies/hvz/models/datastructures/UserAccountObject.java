package experis.humansvszombies.hvz.models.datastructures;

import experis.humansvszombies.hvz.models.enums.UserType;

public class UserAccountObject {
    private Integer userAccountId;
    private String firstName;
    private String lastName;
    private UserType userType;
    private String username;
    private String password;
    private String email;

    public UserAccountObject() {

    }

    public UserAccountObject(int userAccountId, String firstName, String lastName, UserType userType,
                    String username, String password, String email) {
        this.userAccountId = userAccountId;
        this.firstName = firstName;
        this.lastName= lastName;
        this.userType = userType;
        this.username = username;
        this.password = password;
        this.email = email;
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
}
