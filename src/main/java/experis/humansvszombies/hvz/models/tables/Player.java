package experis.humansvszombies.hvz.models.tables;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import experis.humansvszombies.hvz.models.enums.Faction;

@Entity(name="player")
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

    @Column(name= "faction")
    private Faction faction;

    @Column(name= "is_alive")
    private boolean isAlive;

    @Column(name= "is_patient_zero")
    private boolean isPatientZero;

    @Column(name= "bite_code")
    private String biteCode;

    @ManyToOne
    private UserAccount userAccount;
    
    @ManyToOne
    private Game game;

    @OneToOne(mappedBy="player", cascade=CascadeType.REMOVE)
    private SquadMember squadMember;

    @OneToMany(mappedBy="player", cascade=CascadeType.ALL, fetch = FetchType.EAGER)
    private Collection<ChatMessage> messages = new ArrayList<ChatMessage>();

    @OneToMany(mappedBy="killer", cascade=CascadeType.ALL)
    private Collection<Kill> kills = new ArrayList<Kill>();

    @OneToMany(mappedBy="victim", cascade=CascadeType.ALL)
    private Collection<Kill> killer = new ArrayList<Kill>();

    public Player() {

    }

    public Player(Faction faction, boolean isAlive, boolean isPatientZero) {
        this.faction = faction;
        this.isAlive = isAlive;
        this.isPatientZero = isPatientZero;
    }

    //METHODS
    public Player(Integer playerId) {
        this.playerId = playerId;
    }

    public Player(Game game) {
        this.game = game;
    }

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

    public Faction getFaction() {
        return faction;
    }

    public void setFaction(Faction faction) {
        this.faction = faction;
    }

    public boolean isAlive() {
        return isAlive;
    }

    public void setAlive(boolean alive) {
        isAlive = alive;
    }

    public boolean isPatientZero() {
        return isPatientZero;
    }

    public void setPatientZero(boolean patientZero) {
        isPatientZero = patientZero;
    }

    public SquadMember getSquadMember() {
        return squadMember;
    }

    public void setSquadMember(SquadMember squadMember) {
        this.squadMember = squadMember;
    }

    public Collection<ChatMessage> getMessages() {
        return messages;
    }

    public void setMessages(Collection<ChatMessage> messages) {
        this.messages = messages;
    }

    public Collection<Kill> getKills() {
        return kills;
    }

    public void setKills(Collection<Kill> kills) {
        this.kills = kills;
    }

    public Collection<Kill> getKiller() {
        return killer;
    }

    public void setKiller(Collection<Kill> killer) {
        this.killer = killer;
    }

    public String getBiteCode() {
        return biteCode;
    }

    public void setBiteCode(String biteCode) {
        this.biteCode = biteCode;
    }
}
