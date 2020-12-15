package experis.humansvszombies.hvz.models.datastructures;

import experis.humansvszombies.hvz.models.enums.Faction;

public class SquadObject {
    private Integer squadId;
    private String name;
    private Faction faction;
    private Integer maxNumberOfMembers;
    private Integer gameId;

    public SquadObject() {

    }
    
    public SquadObject(Integer squadId, String name, Faction faction, 
                Integer maxNumberOfMembers, Integer gameId) {
        this.squadId = squadId;
        this.name = name;
        this.faction = faction;
        this.maxNumberOfMembers = maxNumberOfMembers;
        this.gameId = gameId;
    }

    public Integer getSquadId() {
        return squadId;
    }

    public void setSquadId(Integer squadId) {
        this.squadId = squadId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Integer getGameId() {
        return gameId;
    }

    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }
}


