package experis.humansvszombies.hvz.models.datastructures;

import experis.humansvszombies.hvz.models.enums.Faction;

public class ChatMessageRequest {
    private Faction faction;
    private Integer squadId;
    private Integer gameId;

    public ChatMessageRequest() {

    }

    public ChatMessageRequest(Faction faction, Integer squadId, Integer gameId) {
        this.faction = faction;
        this.squadId = squadId;
        this.gameId = gameId;
    }

    public Faction getFaction() {
        return faction;
    }

    public void setFaction(Faction faction) {
        this.faction = faction;
    }

    public Integer getSquadId() {
        return squadId;
    }

    public void setSquadId(Integer squadId) {
        this.squadId = squadId;
    }

    public Integer getGameId() {
        return gameId;
    }

    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }

}
