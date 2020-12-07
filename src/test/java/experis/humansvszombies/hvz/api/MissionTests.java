package experis.humansvszombies.hvz.api;

import experis.humansvszombies.hvz.controllers.api.GameController;
import experis.humansvszombies.hvz.controllers.api.MissionController;
import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Mission;
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
public class MissionTests {
    @Autowired
    MissionController mc;

    @Autowired
    GameController gc;

    private int missionId;

    @BeforeEach
    void initTest() {
        int gameId = createTestGame();
        ResponseEntity<Mission> response = mc.addMission(new Mission(),gameId);
        this.missionId = response.getBody().getMissionId();
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @AfterEach
    void cleanTest() {
        ResponseEntity<String> response = mc.deleteMission(this.missionId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        ResponseEntity<Mission> response2 = mc.getMissionById(this.missionId);
        assertEquals(HttpStatus.NOT_FOUND, response2.getStatusCode());
    }

    @Test
    void getAllMissions() {
        ResponseEntity<ArrayList<Mission>> response = mc.getAllMissions();
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void getMissionById() {
        ResponseEntity<Mission> response = mc.getMissionById(this.missionId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void createMission() {
        int gameId = createTestGame();
        ResponseEntity<Mission> response = mc.addMission(new Mission(),gameId);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @Test
    void updateMission() {
        ResponseEntity<Mission> response = mc.updateMission(new Mission(),this.missionId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    int createTestGame() {
        ResponseEntity<Game> response = gc.addGame(new Game());
        return response.getBody().getGameId();
    }
}
