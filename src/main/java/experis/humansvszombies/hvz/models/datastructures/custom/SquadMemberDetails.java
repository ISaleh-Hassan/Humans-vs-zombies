package experis.humansvszombies.hvz.models.datastructures.custom;

import experis.humansvszombies.hvz.models.enums.SquadRank;

public class SquadMemberDetails {
    private String username;
    private boolean isAlive;
    private SquadRank squadRank;
    
    public SquadMemberDetails() {

    }

    public SquadMemberDetails(String username, boolean isAlive, SquadRank squadRank) {
        this.username = username;
        this.isAlive = isAlive;
        this.squadRank = squadRank;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isAlive() {
        return isAlive;
    }

    public void setAlive(boolean isAlive) {
        this.isAlive = isAlive;
    }

    public SquadRank getSquadRank() {
        return squadRank;
    }

    public void setSquadRank(SquadRank squadRank) {
        this.squadRank = squadRank;
    }
}
