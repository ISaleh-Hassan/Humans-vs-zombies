package experis.humansvszombies.hvz.models.datastructures;

import experis.humansvszombies.hvz.models.enums.UserType;

public class UserInfo {
    private int userId;
    private String username;
    private UserType type;

    public UserInfo(int userId, String username, UserType type) {
        this.userId = userId;
        this.username = username;
        this.type = type;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public UserType getType() {
        return type;
    }

    public void setType(UserType type) {
        this.type = type;
    }
}
