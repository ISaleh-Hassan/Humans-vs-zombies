package experis.humansvszombies.hvz.models.datastructures;

import java.sql.Timestamp;

import experis.humansvszombies.hvz.models.enums.Faction;
import experis.humansvszombies.hvz.models.enums.MissionState;
import org.springframework.data.geo.Point;

public class MissionObject {
    private Integer missionId;
    private String name;
    private String missionDescription;
    private Faction faction;
    private Point missionPoint;
    private Timestamp startTime;
    private Timestamp endTime;
    private Integer gameId;

    public MissionObject() {

    }

    public MissionObject(Integer missionId, String name, String missionDescription, Faction faction, Point missionPoint,
            Timestamp startTime, Timestamp endTime, Integer gameId) {
        this.missionId = missionId;
        this.name = name;
        this.missionDescription = missionDescription;
        this.faction = faction;
        this.missionPoint = missionPoint;
        this.startTime = startTime;
        this.endTime = endTime;
        this.gameId = gameId;
    }

    public Integer getMissionId() {
        return missionId;
    }

    public void setMissionId(Integer missionId) {
        this.missionId = missionId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMissionDescription() { return missionDescription; }

    public void setMissionDescription(String missionDescription) { this.missionDescription = missionDescription; }

    public Faction getFaction() {
        return faction;
    }

    public void setFaction(Faction faction) {
        this.faction = faction;
    }

    public Point getMissionPoint() { return missionPoint; }

    public void setMissionPoint(Point missionPoint) { this.missionPoint = missionPoint; }

    public Timestamp getStartTime() {
        return startTime;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    public Timestamp getEndTime() {
        return endTime;
    }

    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
    }

    public Integer getGameId() {
        return gameId;
    }

    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }  
}
