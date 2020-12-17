package experis.humansvszombies.hvz.models.datastructures.custom;

import experis.humansvszombies.hvz.models.enums.Faction;

public class SquadDetails {
    private Integer squadId;
    private String squadName;
    private Faction faction;
    private Integer maxNumberOfMembers;
    private Integer numberOfRegisteredMembers;

    public SquadDetails() {

    }

    public SquadDetails(Integer squadId, String squadName, Faction faction, Integer maxNumberOfMembers, Integer numberOfRegisteredMembers) {
        this.squadId = squadId;
        this.squadName = squadName;
        this.faction = faction;
        this.maxNumberOfMembers = maxNumberOfMembers;
        this.numberOfRegisteredMembers = numberOfRegisteredMembers;
    }

    public Integer getSquadId() {
        return squadId;
    }

    public void setSquadId(Integer squadId) {
        this.squadId = squadId;
    }

    public String getSquadName() {
        return squadName;
    }

    public void setSquadName(String squadName) {
        this.squadName = squadName;
    }

    public Faction getFaction() {
        return faction;
    }

    public void setFaction(Faction faction) {
        this.faction = faction;
    }

    public Integer getMaxNumberOfMembers() {
        return maxNumberOfMembers;
    }

    public void setMaxNumberOfMembers(Integer maxNumberOfMembers) {
        this.maxNumberOfMembers = maxNumberOfMembers;
    }

    public Integer getNumberOfRegisteredMembers() {
        return numberOfRegisteredMembers;
    }

    public void setNumberOfRegisteredMembers(Integer numberOfRegisteredMembers) {
        this.numberOfRegisteredMembers = numberOfRegisteredMembers;
    }
}
