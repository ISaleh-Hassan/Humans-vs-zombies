package experis.humansvszombies.hvz.models.datastructures;

import experis.humansvszombies.hvz.models.enums.SquadRank;

public class SquadMemberObject {
    private Integer squadMemberId;
    private SquadRank squadRank;
    private Integer gameId;
    private Integer squadId;
    private Integer playerId;

    public SquadMemberObject() {

    }

    public SquadMemberObject(Integer squadMemberId, SquadRank squadRank, Integer gameId, Integer squadId, Integer playerId) {
        this.squadMemberId = squadMemberId;
        this.squadRank = squadRank;
        this.gameId = gameId;
        this.squadId = squadId;
        this.playerId = playerId;
    }

    public Integer getSquadMemberId() {
        return squadMemberId;
    }

    public void setSquadMemberId(Integer squadMemberId) {
        this.squadMemberId = squadMemberId;
    }

    public SquadRank getSquadRank() {
        return squadRank;
    }

    public void setSquadRank(SquadRank squadRank) {
        this.squadRank = squadRank;
    }

    public Integer getGameId() {
        return gameId;
    }

    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }

    public Integer getSquadId() {
        return squadId;
    }

    public void setSquadId(Integer squadId) {
        this.squadId = squadId;
    }

    public Integer getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Integer playerId) {
        this.playerId = playerId;
    }
}
