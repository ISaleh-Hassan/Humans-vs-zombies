package experis.humansvszombies.hvz.api;

import experis.humansvszombies.hvz.controllers.api.GameController;
import experis.humansvszombies.hvz.controllers.api.MissionController;
import experis.humansvszombies.hvz.models.datastructures.GameObject;
import experis.humansvszombies.hvz.models.datastructures.MissionObject;
import experis.humansvszombies.hvz.models.enums.Faction;
import experis.humansvszombies.hvz.models.enums.MissionState;
import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Mission;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.sql.Timestamp;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class MissionTests {
    @Autowired
    MissionController mc;

    @Autowired
    GameController gc;

    private int missionId;
    private int gameId;

    @BeforeEach
    void initTest() {
        this.gameId = createTestGame();
        ResponseEntity<MissionObject> response = mc.addMission(new Mission(), this.gameId);
        this.missionId = response.getBody().getMissionId();
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @AfterEach
    void cleanTest() {
        ResponseEntity<String> response = mc.deleteMission(this.missionId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        ResponseEntity<MissionObject> response2 = mc.getMissionById(this.missionId);
        assertEquals(HttpStatus.NOT_FOUND, response2.getStatusCode());
        response = gc.deleteGame(this.gameId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        ResponseEntity<GameObject> response3 = gc.getGameById(this.gameId);
        assertEquals(HttpStatus.NOT_FOUND, response3.getStatusCode()); 
    }

    @Test
    void getAllMissions() {
        ResponseEntity<ArrayList<MissionObject>> response = mc.getAllMissions();
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void getMissionById() {
        ResponseEntity<MissionObject> response = mc.getMissionById(this.missionId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void createMission() {
        ResponseEntity<MissionObject> response = mc.addMission(new Mission(), this.gameId);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @Test
    void updateMission() {
        Mission newMission = new Mission("Updated Name", Faction.ZOMBIE, MissionState.PREPERATION,
        Timestamp.valueOf("2000-01-10 01:01:01"), Timestamp.valueOf("2020-12-12 12:12:12"));
        ResponseEntity<MissionObject> response = mc.updateMission( newMission, this.missionId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(newMission.getName(), response.getBody().getName());
        assertEquals(newMission.getFactionVisibility(), response.getBody().getFaction());
        assertEquals(newMission.getState(), response.getBody().getMissionState());
        assertEquals(newMission.getStartTime(), response.getBody().getStartTime());
        assertEquals(newMission.getEndTime(), response.getBody().getEndTime());
    }

    int createTestGame() {
        ResponseEntity<GameObject> response = gc.addGame(new Game());
        return response.getBody().getGameId();
    }
}
