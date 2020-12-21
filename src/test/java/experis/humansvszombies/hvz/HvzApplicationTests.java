package experis.humansvszombies.hvz;


import java.sql.Timestamp;
import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.geo.Point;

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
import experis.humansvszombies.hvz.models.enums.MissionState;
import experis.humansvszombies.hvz.models.enums.SquadRank;
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
		int numberOfUsers = 10;
		int numberOfGames = 5;
		int numberOfPlayers = numberOfUsers - 1;
		int numberOfMissions = 3;
		int numberOfSquads = 2;

		ArrayList<Integer> uaIds = new ArrayList<Integer>();
		ArrayList<Integer> pIds = new ArrayList<Integer>();
		ArrayList<Integer> gIds = new ArrayList<Integer>();
		ArrayList<Integer> sIds = new ArrayList<Integer>();
		ArrayList<Integer> smIds = new ArrayList<Integer>();

		int tempId;
		//Create UserAccount objects
		for (int i = 0; i < numberOfUsers; i++) {
			if (i < numberOfUsers - 1) {
				tempId = uac.addUserAccount(new UserAccount("FirstName" + (i + 1), "LastName" + (i + 1), UserType.PLAYER, "Player"+ (i + 1), "password", "player"+ (i + 1)  + "@player.com", null)).getBody().getUserAccountId();
			} else {
				tempId = uac.addUserAccount(new UserAccount("Administrator", "Adminton", UserType.ADMINISTRATOR, "Admin", "secret", "admin@admin.com", null)).getBody().getUserAccountId();
			}
			uaIds.add(tempId);
		}
		GameState state;
		for (int i = 0; i < numberOfGames; i++) {		
			if (i == 0) {
				state = GameState.PREPERATION;
			} else if (i==1) {
				state = GameState.IN_PROGRESS;
			} else {
				state = GameState.COMPLETED;
			}
			//Create the Game object
			int gId = gc.addGame(new Game("Dummy Game" + (i + 1), state, new Point(10, 10), 
            new Point(20, 20), Timestamp.valueOf("2000-01-10 01:01:01"), Timestamp.valueOf("2020-12-12 12:12:12"), 100, "This is the description of dummy game:" + (i + 1))).getBody().getGameId();
			//Create Player objects
			for (int p = 0; p < numberOfPlayers; p++) {
				if (p == 0) {
					tempId = pc.addPlayer(new Player(Faction.ZOMBIE, true, true), uaIds.get(p), gId).getBody().getPlayerId();
				} else if (p == 1) {
					tempId = pc.addPlayer(new Player(Faction.HUMAN, false, false), uaIds.get(p), gId).getBody().getPlayerId();
				} else {
					tempId = pc.addPlayer(new Player(Faction.HUMAN, true, false), uaIds.get(p), gId).getBody().getPlayerId();
				}
				pIds.add(tempId);
			}
			// Add a kill object between Player 0 and Player 1
			kc.addKill(new Kill(Timestamp.valueOf("2000-01-10 04:04:04"), new Point(12, 12)), gId, pIds.get(0), pIds.get(1));

			// Add Mission objects
			for (int m = 0; m < numberOfMissions; m++) {
				if (m == 0) {
					mc.addMission(new Mission("ZOMBIE Mission: " + (m + 1), Faction.ZOMBIE, MissionState.COMPLETED, Timestamp.valueOf("2000-01-10 01:01:01"), Timestamp.valueOf("2020-12-12 01:59:59")), gId);
				} else if (m == 1) {
					mc.addMission(new Mission("HUMAN Mission: " + (m + 1), Faction.HUMAN, MissionState.COMPLETED, Timestamp.valueOf("2000-01-10 01:01:01"), Timestamp.valueOf("2020-12-12 02:30:00")), gId);
				} else {
					mc.addMission(new Mission("ALL Mission: " + (m + 1), Faction.ALL, MissionState.IN_PROGRESS, Timestamp.valueOf("2000-01-10 04:04:04"), Timestamp.valueOf("2020-12-12 05:05:05")), gId);
				}
			}

			//Add Squad Objects
			for (int s = 0; s < numberOfSquads; s++) {
				tempId = sc.addSquad(new Squad("Squad number: " + (s + 1), Faction.HUMAN, 4), gId).getBody().getSquadId();
				sIds.add(tempId);
			}
			//Add SquadMember Objects to Squad 1
			tempId = smc.addSquadMember(new SquadMember(SquadRank.LEADER), gId, sIds.get(((gId - 1) * 2) + 0), pIds.get(2)).getBody().getSquadMemberId();
			smIds.add(tempId);
			tempId = smc.addSquadMember(new SquadMember(SquadRank.MEMBER), gId, sIds.get(((gId - 1) * 2) + 0), pIds.get(3)).getBody().getSquadMemberId();
			smIds.add(tempId);
			//Add SquadMember Objects to Squad 2
			tempId = smc.addSquadMember(new SquadMember(SquadRank.LEADER), gId, sIds.get(((gId - 1) * 2) + 1), pIds.get(4)).getBody().getSquadMemberId();
			smIds.add(tempId);
			tempId = smc.addSquadMember(new SquadMember(SquadRank.MEMBER), gId, sIds.get(((gId - 1) * 2) + 1), pIds.get(5)).getBody().getSquadMemberId();
			smIds.add(tempId);
			tempId = smc.addSquadMember(new SquadMember(SquadRank.MEMBER), gId, sIds.get(((gId - 1) * 2) + 1), pIds.get(6)).getBody().getSquadMemberId();
			smIds.add(tempId);

			//Add SquadCheckin objects to Squad 1
			scc.addSquadCheckin(new SquadCheckin(Timestamp.valueOf("2000-01-10 04:04:04"), new Point(11, 11)), gId, sIds.get(((gId - 1) * 2) + 0), smIds.get((gId - 1) * 5 + 0));
			scc.addSquadCheckin(new SquadCheckin(Timestamp.valueOf("2000-01-10 05:05:05"), new Point(12, 12)), gId, sIds.get(((gId - 1) * 2) + 0), smIds.get((gId - 1) * 5 + 1));

			//Add SquadCheckin objects to Squad 2
			scc.addSquadCheckin(new SquadCheckin(Timestamp.valueOf("2000-01-10 06:06:06"), new Point(13, 13)), gId, sIds.get(((gId - 1) * 2) + 0), smIds.get((gId - 1) * 5 + 2));
			scc.addSquadCheckin(new SquadCheckin(Timestamp.valueOf("2000-01-10 07:07:07"), new Point(14, 14)), gId, sIds.get(((gId - 1) * 2) + 0), smIds.get((gId - 1) * 5 + 3));
			scc.addSquadCheckin(new SquadCheckin(Timestamp.valueOf("2000-01-10 08:08:08"), new Point(15, 15)), gId, sIds.get(((gId - 1) * 2) + 0), smIds.get((gId - 1) * 5 + 4));

			//Add Global ChatMessages
			cmc.addChatMessage(new ChatMessage("This is a Global Message from a Zombie", Faction.ALL, Timestamp.valueOf("2000-01-10 06:06:06")), gId, pIds.get(((gId - 1) * 9) + 0), null);
			cmc.addChatMessage(new ChatMessage("This is a Global Message from a Human who is dead", Faction.ALL, Timestamp.valueOf("2000-01-10 06:08:06")), gId, pIds.get(((gId - 1) * 9) + 1), null);
			cmc.addChatMessage(new ChatMessage("This is a Global Message from a Human who is alive", Faction.ALL, Timestamp.valueOf("2000-01-10 06:06:06")), gId, pIds.get(((gId - 1) * 9) + 2), null);
			//Add Faction Messages
			cmc.addChatMessage(new ChatMessage("This is a Faction Message from a Zombie", Faction.ZOMBIE, Timestamp.valueOf("2000-01-10 06:06:06")), gId, pIds.get(((gId - 1) * 9) + 0), null);
			cmc.addChatMessage(new ChatMessage("This is a Faction Message from a Human who is dead", Faction.HUMAN, Timestamp.valueOf("2000-01-10 06:06:06")), gId, pIds.get(((gId - 1) * 9) + 1), null);
			cmc.addChatMessage(new ChatMessage("This is a Faction Message from a Human who is alive", Faction.HUMAN, Timestamp.valueOf("2000-01-10 06:07:06")), gId, pIds.get(((gId - 1) * 9) + 2), null);
			//Add Squad Messages for squad 1
			cmc.addChatMessage(new ChatMessage("This is a Squad Message from a Leader", Faction.HUMAN, Timestamp.valueOf("2000-01-10 06:06:06")), gId, pIds.get(((gId - 1) * 9) + 2), sIds.get(((gId - 1) * 2) + 0));
			cmc.addChatMessage(new ChatMessage("This is a Squad Message from a Member", Faction.HUMAN, Timestamp.valueOf("2000-01-10 06:07:06")), gId, pIds.get(((gId - 1) * 9) + 3), sIds.get(((gId - 1) * 2) + 0));
			//Add Squad Messages for Squad 2
			cmc.addChatMessage(new ChatMessage("This is a Squad Message from a Leader", Faction.HUMAN, Timestamp.valueOf("2000-01-10 06:07:06")), gId, pIds.get(((gId - 1) * 9) + 4), sIds.get(((gId - 1) * 2) + 1));
			cmc.addChatMessage(new ChatMessage("This is a Squad Message from a Member", Faction.HUMAN, Timestamp.valueOf("2000-01-10 06:08:06")), gId, pIds.get(((gId - 1) * 9) + 5), sIds.get(((gId - 1) * 2) + 1));
			cmc.addChatMessage(new ChatMessage("This is a Squad Message from another Member", Faction.HUMAN, Timestamp.valueOf("2000-01-10 06:09:06")), gId, pIds.get(((gId - 1) * 9) + 6), sIds.get(((gId - 1) * 2) + 1));

			gIds.add(gId);
		}

		
	}


}
