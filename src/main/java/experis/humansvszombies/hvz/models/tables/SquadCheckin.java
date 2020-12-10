package experis.humansvszombies.hvz.models.tables;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import org.springframework.data.geo.Point;

@Entity(name="squad_checkin")
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "squadCheckinId"
)
public class SquadCheckin {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="squad_chekin_id")
    private Integer squadCheckinId;

    @Column(name="point_of_time")
    private Timestamp pointOfTime;
    
    @Column(name="position")
    private Point position;

    @ManyToOne
    private Game game;

    @ManyToOne
    private Squad squad;

    @ManyToOne
    private SquadMember squadMember;

    public SquadCheckin() {

    }

    public SquadCheckin(Integer squadCheckinId) {
        this.squadCheckinId = squadCheckinId;
    }

    public SquadCheckin(Timestamp time, Point pos) {
        this.pointOfTime = time;
        this.position = pos;
    }

    public Integer getSquadCheckinId() {
        return squadCheckinId;
    }

    public void setSquadCheckinId(Integer squadCheckinId) {
        this.squadCheckinId = squadCheckinId;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public Squad getSquad() {
        return squad;
    }

    public void setSquad(Squad squad) {
        this.squad = squad;
    }

    public SquadMember getSquadMember() {
        return squadMember;
    }

    public void setSquadMember(SquadMember squadMember) {
        this.squadMember = squadMember;
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
}
