package experis.humansvszombies.hvz.models.datastructures;

import java.sql.Timestamp;

import experis.humansvszombies.hvz.models.enums.Faction;

public class ChatMessageObject {
    private Integer chatMessageId;
    private String message;
    private Faction faction;
    private Timestamp timestamp;
    private Integer gameId;
    private Integer playerId;
    private Integer squadId;

    public ChatMessageObject() {

    }

    public ChatMessageObject(Integer chatMessageId, String message, Faction faction, Timestamp timestamp, Integer gameId, Integer playerId, Integer squadId) {
        this.chatMessageId = chatMessageId;
        this.message = message;
        this.faction = faction;
        this.timestamp = timestamp;
        this.gameId = gameId;
        this.playerId = playerId;
        this.squadId = squadId;
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
}
