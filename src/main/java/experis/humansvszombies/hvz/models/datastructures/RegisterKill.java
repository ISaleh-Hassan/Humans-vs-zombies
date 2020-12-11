package experis.humansvszombies.hvz.models.datastructures;

import experis.humansvszombies.hvz.models.tables.Kill;

public class RegisterKill {
    private Kill killObject;
    private int gameId;
    private int killerId;
    private int victimId;
    private String biteCode;

    public RegisterKill() {

    }

    public RegisterKill(Kill kill, int gameId, int killerId, int victimId, String biteCode) {
        this.killObject = kill;
        this.gameId = gameId;
        this.killerId = killerId;
        this.victimId = victimId;
        this.biteCode = biteCode;
    }

    public Kill getKillObject() {
        return killObject;
    }

    public void setKillObject(Kill killObject) {
        this.killObject = killObject;
    }

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public int getKillerId() {
        return killerId;
    }

    public void setKillerId(int killerId) {
        this.killerId = killerId;
    }

    public int getVictimId() {
        return victimId;
    }

    public void setVictimId(int victimId) {
        this.victimId = victimId;
    }

    public String getBiteCode() {
        return biteCode;
    }

    public void setBiteCode(String biteCode) {
        this.biteCode = biteCode;
    }
}
