package experis.humansvszombies.hvz.models.datastructures;

import java.sql.Timestamp;

import experis.humansvszombies.hvz.models.enums.Faction;
import experis.humansvszombies.hvz.models.enums.SquadRank;

public class ChatMessageObject {
    private Integer chatMessageId;
    private String message;
    private Faction faction;
    private Timestamp timestamp;
    private Integer gameId;
    private Integer playerId;
    private Integer squadId;
    private String username;
    private String stringTimestamp;
    private boolean alive;
    private SquadRank squadRank;

    public ChatMessageObject() {

    }

    public ChatMessageObject(Integer chatMessageId, String message, Faction faction, Timestamp timestamp, Integer gameId, 
            Integer playerId, Integer squadId, String username, String sTimestamp, boolean alive, SquadRank squadRank) {
        this.chatMessageId = chatMessageId;
        this.message = message;
        this.faction = faction;
        this.timestamp = timestamp;
        this.gameId = gameId;
        this.playerId = playerId;
        this.squadId = squadId;
        this.username = username;
        this.stringTimestamp = sTimestamp;
        this.alive = alive;
        this.squadRank = squadRank;
    }

    public Integer getChatMessageId() {
        return chatMessageId;
    }

    public void setChatMessageId(Integer chatMessageId) {
        this.chatMessageId = chatMessageId;
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

    public Integer getGameId() {
        return gameId;
    }

    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }

    public Integer getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Integer playerId) {
        this.playerId = playerId;
    }

    public Integer getSquadId() {
        return squadId;
    }

    public void setSquadId(Integer squadId) {
        this.squadId = squadId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getStringTimestamp() {
        return stringTimestamp;
    }

    public void setStringTimestamp(String stringTimestamp) {
        this.stringTimestamp = stringTimestamp;
    }

    public boolean isAlive() {
        return alive;
    }

    public void setAlive(boolean alive) {
        this.alive = alive;
    }

    public SquadRank getSquadRank() {
        return squadRank;
    }

    public void setSquadRank(SquadRank squadRank) {
        this.squadRank = squadRank;
    }
}
