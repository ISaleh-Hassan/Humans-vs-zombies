package experis.humansvszombies.hvz.models.tables;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.springframework.data.geo.Point;

import java.sql.Timestamp;

@Entity(name="kill")
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "killId"
)
public class Kill {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="kill_id")
    private Integer killId;

    @Column(name="time_of_death")
    private Timestamp timeOfDeath;

    @Column(name="position")
    private Point position;

    @ManyToOne
    private Game game;

    @ManyToOne
    private Player killer;

    @ManyToOne
    private Player victim;

    public Kill() {

    }

    public Kill(Integer killId) {
        this.killId = killId;
    }

    public Kill(Game game, Player killer, Player victim) {
        this.game = game;
        this.killer = killer;
        this.victim = victim;
    }

    public Kill(Timestamp timeOfDeath, Point position) {
        this.timeOfDeath = timeOfDeath;
        this.position = position;
    }

    public Integer getKillId() {
        return killId;
    }

    public void setKillId(Integer killId) {
        this.killId = killId;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public Player getKiller() {
        return killer;
    }

    public void setKiller(Player killer) {
        this.killer = killer;
    }

    public Player getVictim() {
        return victim;
    }

    public void setVictim(Player victim) {
        this.victim = victim;
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
}
