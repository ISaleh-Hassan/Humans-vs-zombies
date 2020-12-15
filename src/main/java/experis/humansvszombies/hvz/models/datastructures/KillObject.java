package experis.humansvszombies.hvz.models.datastructures;

import java.sql.Timestamp;

import org.springframework.data.geo.Point;

public class KillObject {
    private Integer killId;
    private Timestamp timeOfDeath;
    private Point position;
    private Integer gameId;
    private Integer killerId;
    private Integer victimId;
    private String biteCode;

    public KillObject() {

    }

    public KillObject(Integer killId, Timestamp timeOfDeath, Point position, Integer gameId, 
            Integer killerId, Integer victimId, String biteCode) {
        this.killId = killId;
        this.timeOfDeath = timeOfDeath;
        this.position = position;
        this.gameId = gameId;
        this.killerId = killerId;
        this.victimId = victimId;
        this.biteCode = biteCode;
    }

    public Integer getKillId() {
        return killId;
    }

    public void setKillId(Integer killId) {
        this.killId = killId;
    }

    public Timestamp getTimeOfDeath() {
        return timeOfDeath;
    }

    public void setTimeOfDeath(Timestamp timeOfDeath) {
        this.timeOfDeath = timeOfDeath;
    }

    public Point getPosition() {
        return position;
    }

    public void setPosition(Point position) {
        this.position = position;
    }

    public Integer getGameId() {
        return gameId;
    }

    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }

    public Integer getKillerId() {
        return killerId;
    }

    public void setKillerId(Integer killerId) {
        this.killerId = killerId;
    }

    public Integer getVictimId() {
        return victimId;
    }

    public void setVictimId(Integer victimId) {
        this.victimId = victimId;
    }

    public String getBiteCode() {
        return biteCode;
    }

    public void setBiteCode(String biteCode) {
        this.biteCode = biteCode;
    }

}
