package experis.humansvszombies.hvz.models.tables;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import experis.humansvszombies.hvz.models.enums.Faction;
import experis.humansvszombies.hvz.models.enums.MissionState;

import java.sql.Timestamp;

@Entity(name="mission")
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "missionId"
)
public class Mission {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="mission_id")
    private Integer missionId;

    @Column
    private String name;

    @Column(name="faction_visibilty")
    private Faction factionVisibility;

    @Column(name="mission_state")
    private MissionState state;

    @Column(name= "start_time")
    private Timestamp startTime;

    @Column(name="end_time")
    private Timestamp endTime;

    @ManyToOne
    private Game game;

    public Mission() {

    }

    public Mission(Integer missionId) {
        this.missionId = missionId;
    }

    public Mission(String name, Faction visibility, MissionState state, Timestamp start, Timestamp end) {
        this.name = name;
        this.factionVisibility = visibility;
        this.state = state;
        this.startTime = start;
        this.endTime = end;
    }

    public Mission(Game game) {
        this.game = game;
    }

    public Integer getMissionId() {
        return missionId;
    }

    public void setMissionId(Integer missionId) {
        this.missionId = missionId;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Faction getFactionVisibility() {
        return factionVisibility;
    }

    public void setFactionVisibility(Faction factionVisibility) {
        this.factionVisibility = factionVisibility;
    }

    public Timestamp getStartTime() {
        return startTime;
    }

    public void setStartTime(Timestamp durationTime) {
        this.startTime = durationTime;
    }

    public Timestamp getEndTime() {
        return endTime;
    }

    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
    }

    public MissionState getState() {
        return state;
    }

    public void setState(MissionState state) {
        this.state = state;
    }
}
