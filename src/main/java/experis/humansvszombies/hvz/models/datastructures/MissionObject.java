package experis.humansvszombies.hvz.models.datastructures;

import java.sql.Timestamp;

import experis.humansvszombies.hvz.models.enums.Faction;
import experis.humansvszombies.hvz.models.enums.MissionState;

public class MissionObject {
    private Integer missionId;
    private String name;
    private Faction faction;
    private MissionState missionState;
    private Timestamp startTime;
    private Timestamp endTime;
    private Integer gameId;

    public MissionObject() {

    }

    public MissionObject(Integer missionId, String name, Faction faction, MissionState missionState,
            Timestamp startTime, Timestamp endTime, Integer gameId) {
        this.missionId = missionId;
        this.name = name;
        this.faction = faction;
        this.missionState = missionState;
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

    public Faction getFaction() {
        return faction;
    }

    public void setFaction(Faction faction) {
        this.faction = faction;
    }

    public MissionState getMissionState() {
        return missionState;
    }

    public void setMissionState(MissionState missionState) {
        this.missionState = missionState;
    }

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
