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
    property = "missionId"
)
public class Mission {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="mission_id")
    private Integer missionId;    

    @ManyToOne
    private Game game;

    public Mission() {

    }

    public Mission(Integer missionId) {
        this.missionId = missionId;
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
}
