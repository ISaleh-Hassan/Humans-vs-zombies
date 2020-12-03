package experis.humansvszombies.hvz.models.tables;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;


@Entity
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "squadId"
)
public class Squad {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="squad_id")
    private Integer squadId;

    @ManyToOne
    private Game game;

    @OneToMany(mappedBy="squad", cascade=CascadeType.ALL)
    private Collection<SquadMember> squadMembers = new ArrayList<SquadMember>();

    @OneToMany(mappedBy="squad", cascade=CascadeType.ALL)
    private Collection<SquadCheckin> squadCheckins = new ArrayList<SquadCheckin>();

    @OneToMany(mappedBy="squad", cascade=CascadeType.ALL)
    private Collection<ChatMessage> messages = new ArrayList<ChatMessage>();


    public Squad() {

    }

    public Squad(Integer squadId) {
        this.squadId = squadId;
    }

    public Squad(Game game) {
        this.game = game;
    }

    public Integer getSquadId() {
        return squadId;
    }

    public void setSquadId(Integer squadId) {
        this.squadId = squadId;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }
}
