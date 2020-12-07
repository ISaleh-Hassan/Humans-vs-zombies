package experis.humansvszombies.hvz.api;

import experis.humansvszombies.hvz.controllers.api.GameController;
import experis.humansvszombies.hvz.controllers.api.PlayerController;
import experis.humansvszombies.hvz.controllers.api.UserAccountController;
import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Player;
import experis.humansvszombies.hvz.models.tables.UserAccount;
import experis.humansvszombies.hvz.models.tables.enums.Faction;
import experis.humansvszombies.hvz.models.tables.enums.UserType;
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

    @BeforeEach
    void initTest() {
        int userAccountId= createTestUserAccount();
        int gameId = createTestGame();
        ResponseEntity<Player> response = pc.addPlayer(new Player(),userAccountId,gameId);
        this.playerId = response.getBody().getPlayerId();
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @AfterEach
    void cleanTest() {
        ResponseEntity<String> response = pc.deletePlayer(this.playerId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        ResponseEntity<Player> response2 = pc.getPlayerById(this.playerId);
        assertEquals(HttpStatus.NOT_FOUND, response2.getStatusCode());
    }

    @Test
    void getAllPlayer() {
        ResponseEntity<ArrayList<Player>> response = pc.getAllPlayers();
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void getPlayerById() {
        ResponseEntity<UserAccount> response = uac.getUserById(this.playerId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void createPlayer() {
        int userId = createTestUserAccount();
        int gameId = createTestGame();
        ResponseEntity<Player> response = pc.addPlayer(new Player(Faction.HUMAN,true,false,"XXDDXXE-4"),userId,gameId);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        pc.deletePlayer(response.getBody().getPlayerId());
    }

    @Test
    void updatePlayer() {
        ResponseEntity<Player> response = pc.updatePlayer((new Player(Faction.HUMAN,true,false,"XXDDXXE-4")), this.playerId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    int createTestUserAccount() {
        ResponseEntity<UserAccount> response = uac.addUserAccount(new UserAccount());
        return response.getBody().getUserAccountId();
    }

    int createTestGame() {
        ResponseEntity<Game> response = gc.addGame(new Game());
        return response.getBody().getGameId();
    }
}
