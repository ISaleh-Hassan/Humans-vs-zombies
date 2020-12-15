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
import experis.humansvszombies.hvz.controllers.api.PlayerController;
import experis.humansvszombies.hvz.controllers.api.SquadController;
import experis.humansvszombies.hvz.controllers.api.SquadMemberController;
import experis.humansvszombies.hvz.controllers.api.UserAccountController;
import experis.humansvszombies.hvz.models.datastructures.GameObject;
import experis.humansvszombies.hvz.models.datastructures.PlayerObject;
import experis.humansvszombies.hvz.models.datastructures.SquadMemberObject;
import experis.humansvszombies.hvz.models.datastructures.SquadObject;
import experis.humansvszombies.hvz.models.datastructures.UserAccountObject;
import experis.humansvszombies.hvz.models.enums.SquadRank;
import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Player;
import experis.humansvszombies.hvz.models.tables.Squad;
import experis.humansvszombies.hvz.models.tables.SquadMember;
import experis.humansvszombies.hvz.models.tables.UserAccount;

@SpringBootTest
public class SquadMemberTests {
    @Autowired
    SquadMemberController squadMemberController;
    @Autowired
    SquadController squadController;
    @Autowired
    GameController gameController;
    @Autowired
    UserAccountController userAccountController;
    @Autowired
    PlayerController playerController;

    private int squadMemberId;
    private int squadId;
    private int gameId;
    private int userAccountId;
    private int playerId;

    @BeforeEach
    void initTest() {
        ResponseEntity<GameObject> response = gameController.addGame(new Game());
        this.gameId = response.getBody().getGameId();
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        ResponseEntity<SquadObject> response2 = squadController.addSquad(new Squad(), this.gameId);
        this.squadId = response2.getBody().getSquadId();
        assertEquals(HttpStatus.CREATED, response2.getStatusCode());
        ResponseEntity<UserAccountObject> response3 = userAccountController.addUserAccount(new UserAccount());
        this.userAccountId = response3.getBody().getUserAccountId();
        assertEquals(HttpStatus.CREATED, response3.getStatusCode());
        ResponseEntity<PlayerObject> response4 = playerController.addPlayer(new Player(), this.userAccountId, this.gameId);
        this.playerId = response4.getBody().getPlayerId();
        assertEquals(HttpStatus.CREATED, response4.getStatusCode());
        ResponseEntity<SquadMemberObject> response5 = squadMemberController.addSquadMember(new SquadMember(), this.gameId, this.squadId, this.playerId);
        this.squadMemberId = response5.getBody().getSquadMemberId();
        assertEquals(HttpStatus.CREATED, response5.getStatusCode());
    }

    @AfterEach
    void cleanTest() {
        //Delete the game object from the database.
		ResponseEntity<String> response = gameController.deleteGame(this.gameId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        //Check that the Game object does not exist in the database anymore.
        ResponseEntity<GameObject> response2 = gameController.getGameById(this.gameId);
        assertEquals(HttpStatus.NOT_FOUND, response2.getStatusCode());
        //Check that the Squad object does not exist in the database anymore.
        ResponseEntity<SquadObject> response3 = squadController.getSquadById(this.squadId);
        assertEquals(HttpStatus.NOT_FOUND, response3.getStatusCode());
        //Check that the Player object does not exist in the database anymore.
        ResponseEntity<PlayerObject> response4 = playerController.getPlayerById(this.playerId);
        assertEquals(HttpStatus.NOT_FOUND, response4.getStatusCode());
        //Check that the SquadMember object does not exist anymore.
        ResponseEntity<SquadMemberObject> response5 = squadMemberController.getSquadMemberById(this.squadMemberId);
        assertEquals(HttpStatus.NOT_FOUND, response5.getStatusCode());
        //Delete the UserAccount
        response = userAccountController.deleteUserAccount(this.userAccountId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        //Check that the UserAccount does not exist in the database.
        ResponseEntity<UserAccountObject> response6 = userAccountController.getUserById(this.userAccountId);
        assertEquals(HttpStatus.NOT_FOUND, response6.getStatusCode());
    }

    @Test
    void testFetchAllSquadMemberObjects() {
        //Fetch all of the SquadMember objects from the database.
        ResponseEntity<ArrayList<SquadMemberObject>> response = squadMemberController.getAllSquadMembers();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotEquals(0, response.getBody().size());
    }

    @Test
    void testFetchSquadMemberById() {
        //Fetch a SquadMember object by id from the database.
        ResponseEntity<SquadMemberObject> response = squadMemberController.getSquadMemberById(this.squadMemberId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void updateSquadMemberById() {
        //Create a new SquadMember object and update a SquadMember object in the database with the new information.
        SquadMember newSquadMember = new SquadMember(SquadRank.LEADER);
        ResponseEntity<SquadMemberObject> response = squadMemberController.updateSquadMember(newSquadMember, this.squadMemberId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        SquadMemberObject updatedSquadMember = squadMemberController.getSquadMemberById(this.squadMemberId).getBody();
        assertNotEquals(null, updatedSquadMember);
        assertEquals(SquadRank.LEADER, updatedSquadMember.getSquadRank());
    }
}
