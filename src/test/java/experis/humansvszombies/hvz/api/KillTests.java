package experis.humansvszombies.hvz.api;

import experis.humansvszombies.hvz.controllers.api.GameController;
import experis.humansvszombies.hvz.controllers.api.KillController;
import experis.humansvszombies.hvz.controllers.api.PlayerController;
import experis.humansvszombies.hvz.controllers.api.UserAccountController;
import experis.humansvszombies.hvz.models.tables.*;
import experis.humansvszombies.hvz.models.tables.enums.Faction;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.geo.Point;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.sql.Timestamp;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class KillTests {
    @Autowired
    KillController kc;
    @Autowired
    PlayerController pc;
    @Autowired
    GameController gc;
    @Autowired
    UserAccountController uac;

    private int killId;
    private int gameId;
    private int killerId;
    private int victemId;

    @BeforeEach
    void initTest() {
        this.gameId= createTestGame();
        this.killerId = createTestPlayer();
        this.victemId = createTestPlayer();
        ResponseEntity<Kill> response = kc.addKill(new Kill(),gameId,killerId,victemId);
        this.killId = response.getBody().getKillId();
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @AfterEach
    void cleanTest() {
        ResponseEntity<String> responseKill = kc.deleteKill(this.killId);
        assertEquals(HttpStatus.OK, responseKill.getStatusCode());
        ResponseEntity<Kill> response2 = kc.getKillById(killId);
        assertEquals(HttpStatus.NOT_FOUND, response2.getStatusCode());
        ResponseEntity<String> responseKiller = pc.deletePlayer(this.killerId);
        assertEquals(HttpStatus.OK, responseKiller.getStatusCode());
        ResponseEntity<Player> responseKiller2 = pc.getPlayerById(killerId);
        assertEquals(HttpStatus.NOT_FOUND, responseKiller2.getStatusCode());
        ResponseEntity<String> responseVictem = pc.deletePlayer(this.victemId);
        assertEquals(HttpStatus.OK, responseVictem.getStatusCode());
        ResponseEntity<Player> responseVictem2 = pc.getPlayerById(killerId);
        assertEquals(HttpStatus.NOT_FOUND, responseVictem2.getStatusCode());
    }

    @Test
    void getAllKills() {
        ResponseEntity<ArrayList<Kill>> response = kc.getAllKills();
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void getKillById() {
        ResponseEntity<Kill> response = kc.getKillById(this.killId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void updateKill() {
        Kill updatedKill = kc.getKillById(this.killId).getBody();
        ResponseEntity<Kill> response = kc.updateKill(new Kill(Timestamp.valueOf("2000-01-10 01:01:01"),new Point(77, 7)), this.killId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(new Point(77, 7), response.getBody().getPosition());
        assertEquals(Timestamp.valueOf("2000-01-10 01:01:01"), response.getBody().getTimeOfDeath());
    }

    int createTestGame() {
        ResponseEntity<Game> response = gc.addGame(new Game());
        return response.getBody().getGameId();
    }

    int createTestPlayer() {
        int userAccountId= createTestUserAccount();
        int gameId = createTestGame();
        ResponseEntity<Player> response = pc.addPlayer(new Player(),userAccountId,gameId);
        return response.getBody().getPlayerId();
    }

    int createTestUserAccount() {
        ResponseEntity<UserAccount> response = uac.addUserAccount(new UserAccount());
        return response.getBody().getUserAccountId();
    }
}
