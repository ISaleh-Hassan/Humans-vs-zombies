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
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "playerId"
)
public class Player {
    //COLUMNS
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="player_id")
    private Integer playerId;

    @ManyToOne
    private UserAccount userAccount;
    
    @ManyToOne
    private Game game;

    @OneToOne(mappedBy="player", cascade=CascadeType.REMOVE)
    private SquadMember squadMember;

    @OneToMany(mappedBy="player", cascade=CascadeType.ALL)
    private Collection<ChatMessage> messages = new ArrayList<ChatMessage>();

    @OneToMany(mappedBy="killer", cascade=CascadeType.ALL)
    private Collection<Kill> kills = new ArrayList<Kill>();

    @OneToMany(mappedBy="victim", cascade=CascadeType.ALL)
    private Collection<Kill> killer = new ArrayList<Kill>();

    public Player() {

    }

    public Player(Integer playerId) {
        this.playerId = playerId;
    }

    public Player(Game game) {
        this.game = game;
    }

    //METHODS
    public Integer getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Integer playerId) {
        this.playerId = playerId;
    }

    public UserAccount getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(UserAccount userAccount) {
        this.userAccount = userAccount;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

}
