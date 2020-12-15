package experis.humansvszombies.hvz.api;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.sql.Timestamp;
import java.util.ArrayList;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.geo.Point;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import experis.humansvszombies.hvz.controllers.api.GameController;
import experis.humansvszombies.hvz.models.datastructures.GameObject;
import experis.humansvszombies.hvz.models.enums.GameState;
import experis.humansvszombies.hvz.models.tables.Game;

@SpringBootTest
public class GameTests {
	@Autowired
    GameController gc;

    private int gameId;


    @BeforeEach
    void initTest() {
        ResponseEntity<GameObject> response = gc.addGame(new Game());
        this.gameId = response.getBody().getGameId();
		assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @AfterEach
    void cleanTest() {
        //Delete the game object and make sure that each object created is deleted except for the user account.
		ResponseEntity<String> response = gc.deleteGame(this.gameId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        ResponseEntity<GameObject> response2 = gc.getGameById(gameId);
        assertEquals(HttpStatus.NOT_FOUND, response2.getStatusCode());
    }

    @Test
    void testFetchAllGameObjects() {
		//Fetch all of the game objects from the database.
		ResponseEntity<ArrayList<GameObject>> response = gc.getAllGames();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotEquals(0, response.getBody().size());
	}

    @Test
    void testFetchGameById() {
		//Fetch the game object we created in the first test.
		ResponseEntity<GameObject> response = gc.getGameById(this.gameId);
		assertEquals(HttpStatus.OK, response.getStatusCode());
    }
    
    @Test
    void updateGameById() {
        //Create a new game object and update the game object stored in the database with the new information
        Game newGame = new Game("Updated Name", GameState.COMPLETED, new Point(10, 10), 
            new Point(20, 20), Timestamp.valueOf("2000-01-10 01:01:01"), Timestamp.valueOf("2020-12-12 12:12:12"), 100, "This description is updated.");
        ResponseEntity<GameObject> response = gc.updateGame(newGame, this.gameId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        GameObject updatedGame = gc.getGameById(this.gameId).getBody();
        assertNotEquals(null, updatedGame);
        assertEquals(newGame.getName(), updatedGame.getName());
        assertEquals(newGame.getGameState(), updatedGame.getGameState());
        assertEquals(newGame.getNwPoint(), updatedGame.getNwPoint());
        assertEquals(newGame.getSePoint(), updatedGame.getSePoint());
        assertEquals(newGame.getStartTime(), updatedGame.getStartTime());
        assertEquals(newGame.getEndTime(), updatedGame.getEndTime());
        assertEquals(newGame.getMaxNumberOfPlayers(), updatedGame.getMaxNumberOfPlayers());
        assertEquals(newGame.getDescription(), updatedGame.getDescription());
    }
}
