package experis.humansvszombies.hvz.api;

import experis.humansvszombies.hvz.controllers.api.GameController;
import experis.humansvszombies.hvz.controllers.api.PlayerController;
import experis.humansvszombies.hvz.controllers.api.UserAccountController;
import experis.humansvszombies.hvz.models.datastructures.GameObject;
import experis.humansvszombies.hvz.models.datastructures.PlayerObject;
import experis.humansvszombies.hvz.models.datastructures.UserAccountObject;
import experis.humansvszombies.hvz.models.enums.Faction;
import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Player;
import experis.humansvszombies.hvz.models.tables.UserAccount;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class PlayerTests {
    @Autowired
    PlayerController pc;

    @Autowired
    UserAccountController uac;

    @Autowired
    GameController gc;

    private int playerId;
    private int userAccountId;
    private int gameId;

    @BeforeEach
    void initTest() {
        this.userAccountId= createTestUserAccount();
        this.gameId = createTestGame();
        ResponseEntity<PlayerObject> response = pc.addPlayer(new Player(), this.userAccountId, this.gameId);
        this.playerId = response.getBody().getPlayerId();
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @AfterEach
    void cleanTest() {
        ResponseEntity<String> response = pc.deletePlayer(this.playerId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        ResponseEntity<PlayerObject> response2 = pc.getPlayerById(this.playerId);
        assertEquals(HttpStatus.NOT_FOUND, response2.getStatusCode());
        response = gc.deleteGame(this.gameId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        ResponseEntity<GameObject> response3 = gc.getGameById(this.gameId);
        assertEquals(HttpStatus.NOT_FOUND, response3.getStatusCode());
    }

    @Test
    void getAllPlayer() {
        ResponseEntity<ArrayList<PlayerObject>> response = pc.getAllPlayers();
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void getPlayerById() {
        ResponseEntity<PlayerObject> response = pc.getPlayerById(this.playerId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void createPlayer() {
        ResponseEntity<PlayerObject> response = pc.addPlayer(new Player(Faction.HUMAN,true,false), this.userAccountId , this.gameId);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        pc.deletePlayer(response.getBody().getPlayerId());
    }

    @Test
    void updatePlayer() {
        ResponseEntity<PlayerObject> response = pc.updatePlayer((new Player(Faction.HUMAN,true,false)), this.playerId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(Faction.HUMAN, response.getBody().getFaction());
        assertEquals(true, response.getBody().isAlive());
        assertEquals(false, response.getBody().isPatientZero());
        assertEquals(8, response.getBody().getBiteCode().length());
    }

    @Test
    void createPlayerAndCheckBiteCode() {
        ResponseEntity<PlayerObject> response = pc.addPlayer(new Player(Faction.HUMAN,true,false), this.userAccountId , this.gameId);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(8, response.getBody().getBiteCode().length());
        pc.deletePlayer(response.getBody().getPlayerId());
    }

    int createTestUserAccount() {
        ResponseEntity<UserAccountObject> response = uac.addUserAccount(new UserAccount());
        return response.getBody().getUserAccountId();
    }

    int createTestGame() {
        ResponseEntity<GameObject> response = gc.addGame(new Game());
        return response.getBody().getGameId();
    }
}
