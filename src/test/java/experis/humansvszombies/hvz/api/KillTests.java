package experis.humansvszombies.hvz.api;

import experis.humansvszombies.hvz.controllers.api.GameController;
import experis.humansvszombies.hvz.controllers.api.KillController;
import experis.humansvszombies.hvz.controllers.api.PlayerController;
import experis.humansvszombies.hvz.controllers.api.UserAccountController;
import experis.humansvszombies.hvz.models.datastructures.GameObject;
import experis.humansvszombies.hvz.models.datastructures.KillObject;
import experis.humansvszombies.hvz.models.datastructures.PlayerObject;
import experis.humansvszombies.hvz.models.datastructures.UserAccountObject;
import experis.humansvszombies.hvz.models.tables.*;
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
    private int userAccountKillerId;
    private int killerId;
    private int userAccountVictimId;
    private int victimId;
    private String victimBiteCode;

    @BeforeEach
    void initTest() {
        this.gameId = createTestGame();
        this.userAccountKillerId = createTestUserAccount();
        this.killerId = createTestPlayerKiller();
        this.userAccountVictimId = createTestUserAccount();
        this.victimId = createTestPlayerVictim();
        ResponseEntity<KillObject> response = kc.addKill(new Kill(), this.gameId, this.killerId, this.victimId);
        this.killId = response.getBody().getKillId();
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @AfterEach
    void cleanTest() {
        ResponseEntity<String> responseKill = kc.deleteKill(this.killId);
        assertEquals(HttpStatus.OK, responseKill.getStatusCode());
        ResponseEntity<KillObject> response2 = kc.getKillById(killId);
        assertEquals(HttpStatus.NOT_FOUND, response2.getStatusCode());
        ResponseEntity<String> responseKiller = pc.deletePlayer(this.killerId);
        assertEquals(HttpStatus.OK, responseKiller.getStatusCode());
        ResponseEntity<PlayerObject> responseKiller2 = pc.getPlayerById(killerId);
        assertEquals(HttpStatus.NOT_FOUND, responseKiller2.getStatusCode());
        ResponseEntity<String> responseVictem = pc.deletePlayer(this.victimId);
        assertEquals(HttpStatus.OK, responseVictem.getStatusCode());
        ResponseEntity<PlayerObject> responseVictem2 = pc.getPlayerById(killerId);
        assertEquals(HttpStatus.NOT_FOUND, responseVictem2.getStatusCode());
        ResponseEntity<String> responseUserAccount = uac.deleteUserAccount(this.userAccountKillerId);
        assertEquals(HttpStatus.OK, responseUserAccount.getStatusCode());
        ResponseEntity<UserAccountObject> responseUserAccountFind = uac.getUserById(this.userAccountKillerId);
        assertEquals(HttpStatus.NOT_FOUND, responseUserAccountFind.getStatusCode());
        responseUserAccount = uac.deleteUserAccount(this.userAccountVictimId);
        assertEquals(HttpStatus.OK, responseUserAccount.getStatusCode());
        responseUserAccountFind = uac.getUserById(this.userAccountVictimId);
        assertEquals(HttpStatus.NOT_FOUND, responseUserAccountFind.getStatusCode());
    }

    @Test
    void getAllKills() {
        ResponseEntity<ArrayList<KillObject>> response = kc.getAllKills();
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void getKillById() {
        ResponseEntity<KillObject> response = kc.getKillById(this.killId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void updateKill() {
        ResponseEntity<KillObject> response = kc.updateKill(new Kill(Timestamp.valueOf("2000-01-10 01:01:01"),new Point(77, 7)), this.killId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(new Point(77, 7), response.getBody().getPosition());
        assertEquals(Timestamp.valueOf("2000-01-10 01:01:01"), response.getBody().getTimeOfDeath());
    }

    @Test
    void createKillWithVerifiedBiteCode() {
        //Test with correct code
        ResponseEntity<KillObject> response = kc.addKillVersion2(new KillObject(null, null, null, this.gameId, this.killerId, this.victimId, this.victimBiteCode));
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        //Test with faulty code
        ResponseEntity<KillObject> response2 = kc.addKillVersion2(new KillObject(null, null, null, this.gameId, this.killerId, this.victimId, "ThisCodeIsWrong"));
        assertEquals(HttpStatus.BAD_REQUEST, response2.getStatusCode());
        // //Delete Kill objects
        ResponseEntity<String> deleteResponse = kc.deleteKill(response.getBody().getKillId());
        assertEquals(HttpStatus.OK, deleteResponse.getStatusCode());
    }

    int createTestGame() {
        ResponseEntity<GameObject> response = gc.addGame(new Game());
        return response.getBody().getGameId();
    }

    int createTestPlayerKiller() {
        ResponseEntity<PlayerObject> response = pc.addPlayer(new Player(), this.userAccountKillerId, this.gameId);
        return response.getBody().getPlayerId();
    }

    int createTestPlayerVictim() {
        ResponseEntity<PlayerObject> response = pc.addPlayer(new Player(), this.userAccountVictimId, this.gameId);
        this.victimBiteCode = response.getBody().getBiteCode();
        return response.getBody().getPlayerId();
    }

    int createTestUserAccount() {
        ResponseEntity<UserAccountObject> response = uac.addUserAccount(new UserAccount());
        return response.getBody().getUserAccountId();
    }
}
