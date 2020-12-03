package experis.humansvszombies.hvz.models.tables;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "gameId"
)
public class Game {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="game_id")
    private Integer gameId;

    @OneToMany(mappedBy="game", cascade=CascadeType.ALL)
    private Collection<Mission> missions = new ArrayList<Mission>();

    @OneToMany(mappedBy="game", cascade=CascadeType.ALL)
    private Collection<Player> players = new ArrayList<Player>();

    @OneToMany(mappedBy="game", cascade=CascadeType.ALL)
    private Collection<Kill> kills = new ArrayList<Kill>();

    @OneToMany(mappedBy="game", cascade=CascadeType.ALL)
    private Collection<ChatMessage> messages = new ArrayList<ChatMessage>();

    @OneToMany(mappedBy="game", cascade=CascadeType.ALL)
    private Collection<Squad> squads = new ArrayList<Squad>();

    @OneToMany(mappedBy="game", cascade=CascadeType.ALL)
    private Collection<SquadMember> squadMembers = new ArrayList<SquadMember>();

    @OneToMany(mappedBy="game", cascade=CascadeType.ALL)
    private Collection<SquadCheckin> squadCheckins = new ArrayList<SquadCheckin>();


    public Game() {

    }

    public Game(Integer gameId) {
        this.gameId = gameId;
    }

    public Integer getGameId() {
        return gameId;
    }

    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }
}
