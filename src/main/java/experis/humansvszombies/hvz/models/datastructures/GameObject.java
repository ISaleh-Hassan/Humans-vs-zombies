package experis.humansvszombies.hvz.models.datastructures;

import java.sql.Timestamp;

import org.springframework.data.geo.Point;

import experis.humansvszombies.hvz.models.enums.GameState;

public class GameObject {
    private Integer gameId;
    private String name;
    private GameState gameState;
    private Point nwPoint;
    private Point sePoint;
    private Timestamp startTime;
    private Timestamp endTime;
    private Integer maxNumberOfPlayers;
    private String description;
    private Integer numberOfRegisteredPlayers;

    public GameObject() {
        
    }

    public GameObject(Integer gameId, String name, GameState gameState, Point nwPoint, Point sePoint,
            Timestamp startTime, Timestamp endTime, Integer maxNumberOfPlayers, String description, Integer numberOfRegisteredPlayers) {
        this.gameId = gameId;
        this.name= name;
        this.gameState = gameState;
        this.nwPoint = nwPoint;
        this.sePoint = sePoint;
        this.startTime = startTime;
        this.endTime = endTime;
        this.maxNumberOfPlayers = maxNumberOfPlayers;
        this.description = description;
        this.numberOfRegisteredPlayers = numberOfRegisteredPlayers;
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

    public Integer getMaxNumberOfPlayers() {
        return maxNumberOfPlayers;
    }

    public void setMaxNumberOfPlayers(Integer maxNumberOfPlayers) {
        this.maxNumberOfPlayers = maxNumberOfPlayers;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getNumberOfRegisteredPlayers() {
        return numberOfRegisteredPlayers;
    }

    public void setNumberOfRegisteredPlayers(Integer numberOfRegisteredPlayers) {
        this.numberOfRegisteredPlayers = numberOfRegisteredPlayers;
    }
}
