package experis.humansvszombies.hvz.api;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.util.ArrayList;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import experis.humansvszombies.hvz.controllers.api.GameController;
import experis.humansvszombies.hvz.controllers.api.SquadController;
import experis.humansvszombies.hvz.models.datastructures.GameObject;
import experis.humansvszombies.hvz.models.datastructures.SquadObject;
import experis.humansvszombies.hvz.models.enums.Faction;
import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Squad;

@SpringBootTest
public class SquadTests {
    @Autowired
    SquadController squadController;

    @Autowired
    GameController gameController;

    private int squadId;
    private int gameId;

    @BeforeEach
    void initTest() {
        ResponseEntity<GameObject> response = gameController.addGame(new Game());
        this.gameId = response.getBody().getGameId();
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        ResponseEntity<SquadObject> response2 = squadController.addSquad(new Squad(), gameId);
        this.squadId = response2.getBody().getSquadId();
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @AfterEach
    void cleanTest() {
        //Delete the game object and make sure that each object created is deleted except for the user account.
		ResponseEntity<String> response = gameController.deleteGame(this.gameId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        ResponseEntity<GameObject> response2 = gameController.getGameById(gameId);
        assertEquals(HttpStatus.NOT_FOUND, response2.getStatusCode());
        ResponseEntity<SquadObject> response3 = squadController.getSquadById(squadId);
        assertEquals(HttpStatus.NOT_FOUND, response3.getStatusCode());
    }

    @Test
    void testFetchAllSquadObjects() {
        //Fetch all of the Squad objects from the database
        ResponseEntity<ArrayList<SquadObject>> response = squadController.getAllSquads();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotEquals(0, response.getBody().size());
    }

    @Test
    void testFetchSquadById() {
        //Fetch a Squad object by id from the database.
        ResponseEntity<SquadObject> response = squadController.getSquadById(this.squadId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void updateSquadById() {
        //Create a new Squad object and update a Squad object in the database with the new information.
        Squad newSquad = new Squad("Updated Squad", Faction.HUMAN, 100);
        ResponseEntity<SquadObject> response = squadController.updateSquad(newSquad, this.squadId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        SquadObject updatedSquad = squadController.getSquadById(this.squadId).getBody();
        assertNotEquals(null, updatedSquad);
        assertEquals(newSquad.getName(), updatedSquad.getName());
        assertEquals(newSquad.getFaction(), updatedSquad.getFaction());
        assertEquals(newSquad.getMaxNumberOfMembers(), updatedSquad.getMaxNumberOfMembers());
    }
}
