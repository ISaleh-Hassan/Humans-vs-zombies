package experis.humansvszombies.hvz;


import java.sql.Timestamp;
import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.geo.Point;
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
import experis.humansvszombies.hvz.models.enums.Faction;
import experis.humansvszombies.hvz.models.enums.GameState;
import experis.humansvszombies.hvz.models.enums.UserType;
import experis.humansvszombies.hvz.models.tables.ChatMessage;
import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Kill;
import experis.humansvszombies.hvz.models.tables.Mission;
import experis.humansvszombies.hvz.models.tables.Player;
import experis.humansvszombies.hvz.models.tables.Squad;
import experis.humansvszombies.hvz.models.tables.SquadCheckin;
import experis.humansvszombies.hvz.models.tables.SquadMember;
import experis.humansvszombies.hvz.models.tables.UserAccount;


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

	@Test
	void CreateDummyDataForDatabase() {
		ArrayList<Integer> uaIds = new ArrayList<Integer>();
		int uId;
		//Delete the game object and make sure that each object created is deleted except for the user account.
		for (int i = 1; i < 6; i++) {
			if (i == 1) {
				uId = uac.addUserAccount(new UserAccount("FirstName" + i, "LastName" + i, UserType.ADMINISTRATOR, "Admin", "secret", "admin@admin.com")).getBody().getUserAccountId();
			} else {
				uId = uac.addUserAccount(new UserAccount("FirstName" + i, "LastName" + i, UserType.PLAYER, "Player"+i, "password", "player"+ i + "@player.com")).getBody().getUserAccountId();
			}
			uaIds.add(uId);
		}
		GameState state;
		for (int i = 1; i < 6; i++) {		
			if (i == 1) {
				state = GameState.PREPERATION;
			} else if (i==2) {
				state = GameState.IN_PROGRESS;
			} else {
				state = GameState.COMPLETED;
			}
			int gId = gc.addGame(new Game("Dummy Game" + i, state, new Point(10, 10), 
            new Point(20, 20), Timestamp.valueOf("2000-01-10 01:01:01"), Timestamp.valueOf("2020-12-12 12:12:12"), 100, "This is the description of dummy game:" + i)).getBody().getGameId();
			for (int p = 1; p < 6; p++) {
				if (p == 1) {
					pc.addPlayer(new Player(Faction.ZOMBIE, true, true), uaIds.get(p - 1), gId);
				} else if (p == 2) {
					pc.addPlayer(new Player(Faction.HUMAN, false, false), uaIds.get(p - 1), gId);
				} else {
					pc.addPlayer(new Player(Faction.HUMAN, true, false), uaIds.get(p - 1), gId);
				}
			}
		}
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
