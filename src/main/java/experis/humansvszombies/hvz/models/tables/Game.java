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

import experis.humansvszombies.hvz.models.datastructures.Position;
import experis.humansvszombies.hvz.models.enums.GameState;

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

    @Column(name="name")
    private String name;

    @Column(name="game_state")
    private GameState gameState;

    @Column(name="nw_point")
    private Position nwPoint;
    
    @Column(name="se_point")
    private Position sePoint;

    @Column(name="start_time")
    private String startTime;

    @Column(name="end_time")
    private String endTime;

    @Column(name="max_number_players")
    private int maxNumberOfPlayers;

    @Column(name="rules")
    private Collection<String> rules = new ArrayList<String>();

    @Column(name="description")
    private String description;

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

    public Game(String name, GameState gameState, Position nw, Position se, 
        String startTime, String endTime, int numPlayers, String description) {
            this.name = name;
            this.gameState = gameState;
            this.nwPoint = nw;
            this.sePoint = se;
            this.startTime = startTime;
            this.endTime = endTime;
            this.maxNumberOfPlayers = numPlayers;
            this.description = description;
            this.fillOutRules();
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public GameState getGameState() {
        return gameState;
    }

    public void setGameState(GameState gameState) {
        this.gameState = gameState;
    }

    public Position getNwPoint() {
        return nwPoint;
    }

    public void setNwPoint(Position nwPoint) {
        this.nwPoint = nwPoint;
    }

    public Position getSePoint() {
        return sePoint;
    }

    public void setSePoint(Position sePoint) {
        this.sePoint = sePoint;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public int getMaxNumberOfPlayers() {
        return maxNumberOfPlayers;
    }

    public void setMaxNumberOfPlayers(int maxNumberOfPlayers) {
        this.maxNumberOfPlayers = maxNumberOfPlayers;
    }

    public Collection<String> getRules() {
        return rules;
    }

    public void setRules(Collection<String> rules) {
        this.rules = rules;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    private void fillOutRules() {
        this.rules.add("1. This is rule number 1.");
        this.rules.add("2. This is rule number 2.");
        this.rules.add("3. This is rule number 3.");
        this.rules.add("4. This is rule number 4.");
        this.rules.add("5. This is rule number 5.");
    }
}
