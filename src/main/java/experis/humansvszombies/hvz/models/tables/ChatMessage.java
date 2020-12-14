package experis.humansvszombies.hvz.models.tables;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import experis.humansvszombies.hvz.models.enums.Faction;

import java.sql.Timestamp;

@Entity(name="chat_message")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "chatMessageId"
)
public class ChatMessage {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="chat_message_id")
    private Integer chatMessageId;

    @Column
    private String message;

    @Column
    private Faction faction;

    @Column(name="time_stamp")
    private Timestamp timestamp;

    @ManyToOne
    private Game game;

    @ManyToOne
    private Player player;

    @ManyToOne
    private Squad squad;

    public ChatMessage() {

    }

    public ChatMessage(Integer chatMessageId) {
        this.chatMessageId = chatMessageId;
    }

    public ChatMessage(String message, Faction faction, Timestamp timestamp) {
        this.message = message;
        this.faction = faction;
        this.timestamp = timestamp;
    }

    public ChatMessage(Integer id, String message, Faction faction, Timestamp timestamp, Game game, Player player, Squad squad) {
        this.chatMessageId = id;
        this.message = message;
        this.faction = faction;
        this.timestamp = timestamp;
        this.game = game;
        this.player = player;
        this.squad = squad;
    }

    public Integer getChatMessageId() {
        return chatMessageId;
    }

    public void setChatMessageId(Integer chatMessageId) {
        this.chatMessageId = chatMessageId;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public Squad getSquad() {
        return squad;
    }

    public void setSquad(Squad squad) {
        this.squad = squad;
    }


    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Faction getFaction() {
        return faction;
    }

    public void setFaction(Faction faction) {
        this.faction = faction;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}
