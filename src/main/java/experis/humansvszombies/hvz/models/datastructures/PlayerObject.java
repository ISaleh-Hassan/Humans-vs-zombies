package experis.humansvszombies.hvz.models.datastructures;

import experis.humansvszombies.hvz.models.enums.Faction;

public class PlayerObject {
    private Integer playerId;
    private Faction faction;
    private boolean isAlive;
    private boolean isPatientZero;
    private String biteCode;
    private Integer userAccountId;
    private Integer gameId;
    private Integer squadMemberId;

    public PlayerObject() {

    }

    public PlayerObject(Integer playerId, Faction faction, boolean isAlive, boolean isPatientZero,
                String biteCode, Integer userAccountId, Integer gameId, Integer squadMemberId) {
        this.playerId = playerId;
        this.faction = faction;
        this.isAlive = isAlive;
        this.isPatientZero = isPatientZero;
        this.biteCode = biteCode;
        this.userAccountId = userAccountId;
        this.gameId = gameId;
        this.squadMemberId = squadMemberId;
    }

    public Integer getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Integer playerId) {
        this.playerId = playerId;
    }

    public Faction getFaction() {
        return faction;
    }

    public void setFaction(Faction faction) {
        this.faction = faction;
    }

    public boolean isAlive() {
        return isAlive;
    }

    public void setAlive(boolean isAlive) {
        this.isAlive = isAlive;
    }

    public boolean isPatientZero() {
        return isPatientZero;
    }

    public void setPatientZero(boolean isPatientZero) {
        this.isPatientZero = isPatientZero;
    }

    public String getBiteCode() {
        return biteCode;
    }

    public void setBiteCode(String biteCode) {
        this.biteCode = biteCode;
    }

    public Integer getUserAccountId() {
        return userAccountId;
    }

    public void setUserAccountId(Integer userAccountId) {
        this.userAccountId = userAccountId;
    }

    public Integer getGameId() {
        return gameId;
    }

    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }

    public Integer getSquadMemberId() {
        return squadMemberId;
    }

    public void setSquadMemberId(Integer squadMemberId) {
        this.squadMemberId = squadMemberId;
    }
}
