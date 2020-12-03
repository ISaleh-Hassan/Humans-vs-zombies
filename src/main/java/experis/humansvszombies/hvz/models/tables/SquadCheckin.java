package experis.humansvszombies.hvz.models.tables;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "squadCheckinId"
)
public class SquadCheckin {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="squad_chekin_id")
    private Integer squadCheckinId;

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

    public SquadCheckin(Game game, Squad squad, SquadMember squadMember) {
        this.game = game;
        this.squad = squad;
        this.squadMember = squadMember;
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
}
