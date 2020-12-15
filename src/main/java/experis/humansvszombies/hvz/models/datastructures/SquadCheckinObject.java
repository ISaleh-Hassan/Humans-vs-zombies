package experis.humansvszombies.hvz.models.datastructures;

import java.sql.Timestamp;

import org.springframework.data.geo.Point;

public class SquadCheckinObject {
    private Integer squadCheckinId;
    private Timestamp pointOfTime;
    private Point position;
    private Integer gameId;
    private Integer squadId;
    private Integer squadMemberId;

    public SquadCheckinObject() {

    }

    public SquadCheckinObject(Integer squadCheckinId, Timestamp pointOfTime, Point position,
                Integer gameId, Integer squadId, Integer squadMemberid) {
        this.squadCheckinId = squadCheckinId;
        this.pointOfTime = pointOfTime;
        this.position = position;
        this.gameId = gameId;
        this.squadId = squadId;
        this.squadMemberId = squadMemberid;        
    }

    public Integer getSquadCheckinId() {
        return squadCheckinId;
    }

    public void setSquadCheckinId(Integer squadCheckinId) {
        this.squadCheckinId = squadCheckinId;
    }

    public Timestamp getPointOfTime() {
        return pointOfTime;
    }

    public void setPointOfTime(Timestamp pointOfTime) {
        this.pointOfTime = pointOfTime;
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

    public Integer getSquadId() {
        return squadId;
    }

    public void setSquadId(Integer squadId) {
        this.squadId = squadId;
    }

    public Integer getSquadMemberId() {
        return squadMemberId;
    }

    public void setSquadMemberId(Integer squadMemberId) {
        this.squadMemberId = squadMemberId;
    }
}
