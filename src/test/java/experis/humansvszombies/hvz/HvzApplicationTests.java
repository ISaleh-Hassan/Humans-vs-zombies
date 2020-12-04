package experis.humansvszombies.hvz;

import static org.junit.jupiter.api.Assertions.assertEquals;

import experis.humansvszombies.hvz.models.tables.enums.Faction;
import experis.humansvszombies.hvz.models.tables.enums.UserType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import experis.humansvszombies.hvz.controllers.api.ChatMessageController;
import experis.humansvszombies.hvz.controllers.api.GameController;
import experis.humansvszombies.hvz.controllers.api.KillController;
import experis.humansvszombies.hvz.controllers.api.MissionController;
import experis.humansvszombies.hvz.controllers.api.PlayerController;
import experis.humansvszombies.hvz.controllers.api.SquadCheckinController;
import experis.humansvszombies.hvz.controllers.api.SquadController;
import experis.humansvszombies.hvz.controllers.api.SquadMemberController;
import experis.humansvszombies.hvz.controllers.api.UserAccountController;
import experis.humansvszombies.hvz.models.tables.ChatMessage;
import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Kill;
import experis.humansvszombies.hvz.models.tables.Mission;
import experis.humansvszombies.hvz.models.tables.Player;
import experis.humansvszombies.hvz.models.tables.Squad;
import experis.humansvszombies.hvz.models.tables.SquadCheckin;
import experis.humansvszombies.hvz.models.tables.SquadMember;
import experis.humansvszombies.hvz.models.tables.UserAccount;

import java.util.ArrayList;

@SpringBootTest
class HvzApplicationTests {

    @Autowired
    ChatMessageController cmc;

	@Autowired
    GameController gc;
    
	@Autowired
    KillController kc;
    
	@Autowired
    MissionController mc;
    
	@Autowired
    PlayerController pc;
    
	@Autowired
    SquadCheckinController scc;
    
	@Autowired
    SquadController sc;
    
	@Autowired
    SquadMemberController smc;
    
	@Autowired
	UserAccountController uac;


	private int gameId = 0;
	private int missionId = 0;
	private int userAccountId = 0;
	private int userAccountId2 = 0;
	private int playerId = 0;
	private int playerId2 = 0;
	private int killId = 0;
	private int squadId = 0;
	private int squadMemberId = 0;
	private int squadCheckinId = 0;
	private int chatMessageId = 0;


	@BeforeEach
	public void init() {
		//Create the Game object.
		this.gameId = createTestGame();
		//Create the mission object.
		this.missionId = createTestMission(gameId);
		//Create a useraccount and a player connected to the useraccount and the game object.
		this.userAccountId = createTestUserAccount();
		this.userAccountId2 = createTestUserAccount(); 
		this.playerId = createTestPlayer(gameId, userAccountId);
		this.playerId2 = createTestPlayer(gameId, userAccountId2);
		this.killId = createTestKill(gameId, playerId, playerId2);
		this.squadId = createTestSquad(gameId);
		this.squadMemberId = createTestSquadMember(gameId, squadId, playerId);
		this.squadCheckinId = createTestSquadCheckin(gameId, squadId, squadMemberId);
		this.chatMessageId = createTestChatMessage(gameId, squadId, playerId);
	}

	@Test
	void testDeleteGame() {
		//Delete the game object and make sure that each object created is deleted except for the user account.
		ResponseEntity<String> response2 = gc.deleteGame(gameId);
		assertEquals(HttpStatus.OK, response2.getStatusCode());
	}

	@Test
	void testDeleteMissionBeforeGame() {
		//Delete the game object and make sure that each object created is deleted except for the user account.
		ResponseEntity<String> response = mc.deleteMission(missionId);
		assertEquals(HttpStatus.OK, response.getStatusCode());
		// ResponseEntity<String> response2 = gc.deleteGame(gameId);
		// assertEquals(HttpStatus.OK, response2.getStatusCode());
	}

	@Test
	void testDeletePlayerKillerBeforeGame() {
		//Delete the game object and make sure that each object created is deleted except for the user account.
		ResponseEntity<String> response = pc.deletePlayer(playerId);
		assertEquals(HttpStatus.OK, response.getStatusCode());
		// ResponseEntity<String> response2 = gc.deleteGame(gameId);
		// assertEquals(HttpStatus.OK, response2.getStatusCode());
	}

	@Test
	void testDeletePlayerVictimBeforeGame() {
		//Delete the game object and make sure that each object created is deleted except for the user account.
		ResponseEntity<String> response = pc.deletePlayer(playerId2);
		assertEquals(HttpStatus.OK, response.getStatusCode());
		// ResponseEntity<String> response2 = gc.deleteGame(gameId);
		// assertEquals(HttpStatus.OK, response2.getStatusCode());
	}

	@Test
	void testDeleteKillBeforeGame() {
		//Delete the game object and make sure that each object created is deleted except for the user account.
		ResponseEntity<String> response = kc.deleteKill(killId);
		assertEquals(HttpStatus.OK, response.getStatusCode());
		// ResponseEntity<String> response2 = gc.deleteGame(gameId);
		// assertEquals(HttpStatus.OK, response2.getStatusCode());
	}

	@Test
	void testDeleteChatMessageBeforeGame() {
		//Delete the game object and make sure that each object created is deleted except for the user account.
		ResponseEntity<String> response = cmc.deleteChatMessage(chatMessageId);
		assertEquals(HttpStatus.OK, response.getStatusCode());
		// ResponseEntity<String> response2 = gc.deleteGame(gameId);
		// assertEquals(HttpStatus.OK, response2.getStatusCode());
	}

	@Test
	void testDeleteSquadBeforeGame() {
		//Delete the game object and make sure that each object created is deleted except for the user account.
		ResponseEntity<String> response = sc.deleteSquad(squadId);
		assertEquals(HttpStatus.OK, response.getStatusCode());
		// ResponseEntity<String> response2 = gc.deleteGame(gameId);
		// assertEquals(HttpStatus.OK, response2.getStatusCode());
	}

	@Test
	void testDeleteSquadMemberBeforeGame() {
		//Delete the game object and make sure that each object created is deleted except for the user account.
		ResponseEntity<String> response = smc.deleteSquadMember(squadMemberId);
		assertEquals(HttpStatus.OK, response.getStatusCode());
		// ResponseEntity<String> response2 = gc.deleteGame(gameId);
		// assertEquals(HttpStatus.OK, response2.getStatusCode());
	}

	@Test
	void testDeleteSquadCheckinBeforeGame() {
		//Delete the game object and make sure that each object created is deleted except for the user account.
		ResponseEntity<String> response = scc.deleteSquadCheckin(squadCheckinId);
		assertEquals(HttpStatus.OK, response.getStatusCode());
		// ResponseEntity<String> response2 = gc.deleteGame(gameId);
		// assertEquals(HttpStatus.OK, response2.getStatusCode());
	}

	@Test
	void getAllUsers() {
		ResponseEntity<ArrayList<UserAccount>> response = uac.getAllUsers();
		assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@Test
	void getUserById() {
		int id = createTestUserAccount();
		ResponseEntity<UserAccount> response = uac.getUserById(id);
		assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@Test
	void createUser() {
		ResponseEntity<UserAccount> response = uac.addUserAccount(new UserAccount("Test","Person", UserType.PLAYER,"TestUsername" ,"TestPassword","test@test.test"));
		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		assertEquals("Test", response.getBody().getFirstName());
		assertEquals("Person", response.getBody().getLastName());
		assertEquals("TestUsername", response.getBody().getUsername());
		assertEquals("TestPassword", response.getBody().getPassword());
		uac.deleteUserAccount(response.getBody().getUserAccountId());
	}

	@Test
	void updateUser() {
		int id = createTestUserAccount();
		ResponseEntity<UserAccount> response = uac.updateUser(new UserAccount("Updated firstName","updated lastName", UserType.ADMINSTRATOR,"TestUsername" ,"TestPassword","test@test.test"), id);
		assertEquals("Updated firstName", response.getBody().getFirstName());
		assertEquals("updated lastName", response.getBody().getLastName());
		assertEquals("TestUsername", response.getBody().getUsername());
		assertEquals("TestPassword", response.getBody().getPassword());
		uac.deleteUserAccount(id);
	}

	@Test
	void deleteUser() {
		int id = createTestUserAccount();
		ResponseEntity<UserAccount> response1 = uac.getUserById(id);
		assertEquals(HttpStatus.OK, response1.getStatusCode());
		ResponseEntity<String> response2 = uac.deleteUserAccount(id);
		assertEquals(HttpStatus.OK, response2.getStatusCode());
		response1 = uac.getUserById(id);
		assertEquals(HttpStatus.NOT_FOUND, response1.getStatusCode());
	}

	@Test
	void getAllPlayer() {
		ResponseEntity<ArrayList<Player>> response = pc.getAllPlayers();
		assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@Test
	void getPlayerById() {
		int userId = createTestUserAccount();
		int gameId = createTestGame();
		int id = createTestPlayer(gameId,userId);
		ResponseEntity<UserAccount> response = uac.getUserById(id);
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
		int userId = createTestUserAccount();
		int id = createTestPlayer(gameId,userId);

		ResponseEntity<Player> response = pc.updatePlayer((new Player(Faction.HUMAN,true,false,"XXDDXXE-4")), userId);
		pc.deletePlayer(id);
	}

	@Test
	void deletePlayer() {
		int userId = createTestUserAccount();
		int gameId = createTestGame();
		int id = createTestPlayer(gameId,userId);

		ResponseEntity<Player> response1 = pc.getPlayerById(id);
		assertEquals(HttpStatus.OK, response1.getStatusCode());
		ResponseEntity<String> response2 = pc.deletePlayer(id);
		assertEquals(HttpStatus.OK, response2.getStatusCode());
		response1 = pc.getPlayerById(id);
		assertEquals(HttpStatus.NOT_FOUND, response1.getStatusCode());
	}

	int createTestGame() {
		ResponseEntity<Game> response = gc.addGame(new Game());
		return response.getBody().getGameId();
	}

	int createTestUserAccount() {
		ResponseEntity<UserAccount> response = uac.addUserAccount(new UserAccount());
		return response.getBody().getUserAccountId();
	}

	int createTestMission(int gameId) {
		ResponseEntity<Mission> response = mc.addMission(new Mission(), gameId);
		return response.getBody().getMissionId();
	}

	int createTestPlayer(int gameId, int userAccountId) {
		ResponseEntity<Player> response = pc.addPlayer(new Player(), userAccountId, gameId);
		return response.getBody().getPlayerId();
	}

	int createTestSquad(int gameId) {
		ResponseEntity<Squad> response = sc.addSquad(new Squad(), gameId);
		return response.getBody().getSquadId(); 
	}

	int createTestSquadMember(int gameId, int squadId ,int playerId) {
		ResponseEntity<SquadMember> response = smc.addSquadMember(new SquadMember(), gameId, squadId, playerId);
		return response.getBody().getSquadMemberId();
	}

	int createTestSquadCheckin(int gameId, int squadId, int squadMemberId) {
		ResponseEntity<SquadCheckin> response = scc.addSquadCheckin(new SquadCheckin(), gameId, squadId, squadMemberId);
		return response.getBody().getSquadCheckinId();
	}

	int createTestChatMessage(int gameId, int squadId, int playerId) {
		ResponseEntity<ChatMessage> response = cmc.addChatMessage(new ChatMessage(), gameId, playerId, squadId);
		return response.getBody().getChatMessageId();
	}

	int createTestKill(int gameId, int killerId, int victimId) {
		ResponseEntity<Kill> response = kc.addKill(new Kill(), gameId ,killerId, victimId);
		return response.getBody().getKillId();
	}

}
