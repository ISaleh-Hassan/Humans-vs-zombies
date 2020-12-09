package experis.humansvszombies.hvz.models.tables;

import java.sql.Timestamp;
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

import org.springframework.data.geo.Point;

import experis.humansvszombies.hvz.models.enums.GameState;

@Entity(name="game")
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
    private Point nwPoint;      // Can be set with: new Point(x, y);
    
    @Column(name="se_point")
    private Point sePoint;      // Can be set with: new Point(x, y);

    @Column(name="start_time")
    private Timestamp startTime;// Can be set with: Timestamp.valueOf("yyyy-mm-dd hh:mm:ss");

    @Column(name="end_time")
    private Timestamp endTime;  // Can be set with: Timestamp.valueOf("yyyy-mm-dd hh:mm:ss");

    @Column(name="max_number_players")
    private int maxNumberOfPlayers;

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

    public Game(Integer gameId) {
        this.gameId = gameId;
    }

    public Game (String name, GameState gameState, Point nw, Point se,
        Timestamp startTime, Timestamp endTime, int numPlayers, String description){
            this.name = name;
            this.gameState = gameState;
            this.nwPoint = nw;
            this.sePoint = se;
            this.startTime = startTime;
            this.endTime = endTime;
            this.maxNumberOfPlayers = numPlayers;
            this.description = description;
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

    public Point getNwPoint() {
        return nwPoint;
    }

    public void setNwPoint(Point nwPoint) {
        this.nwPoint = nwPoint;
    }

    public Point getSePoint() {
        return sePoint;
    }

    public void setSePoint(Point sePoint) {
        this.sePoint = sePoint;
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

    public int getMaxNumberOfPlayers() {
        return maxNumberOfPlayers;
    }

    public void setMaxNumberOfPlayers(int maxNumberOfPlayers) {
        this.maxNumberOfPlayers = maxNumberOfPlayers;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    } 
}
