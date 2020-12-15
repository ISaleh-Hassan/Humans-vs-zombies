package experis.humansvszombies.hvz.api;

import experis.humansvszombies.hvz.controllers.api.*;
import experis.humansvszombies.hvz.models.datastructures.ChatMessageObject;
import experis.humansvszombies.hvz.models.datastructures.GameObject;
import experis.humansvszombies.hvz.models.datastructures.PlayerObject;
import experis.humansvszombies.hvz.models.datastructures.SquadObject;
import experis.humansvszombies.hvz.models.datastructures.UserAccountObject;
import experis.humansvszombies.hvz.models.enums.Faction;
import experis.humansvszombies.hvz.models.tables.*;
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
public class ChatMessageTests {
    @Autowired
    ChatMessageController cmc;

    @Autowired
    GameController gc;

    @Autowired
    UserAccountController uac;

    @Autowired
    PlayerController pc;

    @Autowired
    SquadController sc;


    private int chatMessageId;
    private int gameId;
    private int userAccountId;
    private int playerId;
    private int squadId;

    @BeforeEach
    void initTest() {
        this.gameId= createTestGame();
        this.userAccountId= createTestUserAccount();
        this.playerId = createTestPlayer();
        this.squadId = createTestSquad();
        ResponseEntity<ChatMessageObject> response = cmc.addChatMessage(new ChatMessage(),this.gameId,this.playerId,this.squadId);
        this.chatMessageId = response.getBody().getChatMessageId();
    }

    @AfterEach
    void cleanTest() {
        ResponseEntity<String> responseChatMessage = cmc.deleteChatMessage(this.chatMessageId);
        assertEquals(HttpStatus.OK, responseChatMessage.getStatusCode());
        ResponseEntity<ChatMessageObject> responseChatMessage2 = cmc.getChatMessageById(this.chatMessageId);
        assertEquals(HttpStatus.NOT_FOUND, responseChatMessage2.getStatusCode());
        // ResponseEntity<String> responsePlayer = pc.deletePlayer(this.playerId);
        // assertEquals(HttpStatus.OK, responsePlayer.getStatusCode());
        // ResponseEntity<PlayerObject> responsePlayer2 = pc.getPlayerById(this.playerId);
        // assertEquals(HttpStatus.NOT_FOUND, responsePlayer2.getStatusCode());
        // ResponseEntity<String> responseUserAccount = uac.deleteUserAccount(this.userAccountId);
        // assertEquals(HttpStatus.OK, responseUserAccount.getStatusCode());
        // ResponseEntity<UserAccountObject> responseUserAccount2 = uac.getUserById(this.userAccountId);
        // assertEquals(HttpStatus.NOT_FOUND, responseUserAccount2.getStatusCode());
        // ResponseEntity<String> responseSquad = sc.deleteSquad(this.squadId);
        // assertEquals(HttpStatus.OK, responseSquad.getStatusCode());
        // ResponseEntity<SquadObject> responseSquad2 = sc.getSquadById(this.squadId);
        // assertEquals(HttpStatus.NOT_FOUND, responseSquad2.getStatusCode());
        // ResponseEntity<String> responseGame = gc.deleteGame(this.gameId);
        // assertEquals(HttpStatus.OK, responseGame.getStatusCode());
        // ResponseEntity<GameObject> responseGame2 = gc.getGameById(this.gameId);
        // assertEquals(HttpStatus.NOT_FOUND, responseGame2.getStatusCode());
    }

    @Test
    void getAllChatMessages() {
        ResponseEntity<ArrayList<ChatMessageObject>> response = cmc.getAllChatMessages();
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void getChatMessageById() {
        ResponseEntity<ChatMessageObject> response = cmc.getChatMessageById(this.chatMessageId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void createChatMessage() {
        ResponseEntity<ChatMessageObject> response = cmc.addChatMessage(new ChatMessage(),this.gameId,this.playerId,squadId);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        cmc.deleteChatMessage(response.getBody().getChatMessageId());
    }

    @Test
    void updateChatMessage() {
        ChatMessage chatMessage = new ChatMessage("This is a test message",Faction.HUMAN, Timestamp.valueOf("2000-01-10 01:01:01"));
        ResponseEntity<ChatMessageObject> response = cmc.updateChatMessage(chatMessage,this.chatMessageId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("This is a test message", response.getBody().getMessage());
        assertEquals(Timestamp.valueOf("2000-01-10 01:01:01"), response.getBody().getTimestamp());
        assertEquals(Faction.HUMAN, response.getBody().getFaction());
    }

    @Test
    void fetchGlobalChatMessages() {
        //Fetch Global
        ResponseEntity<ArrayList<ChatMessageObject>> messages = cmc.fetchBundleOfChatMessages(new ChatMessageObject(null, null, Faction.ALL, null, 1, null, null));
        assertEquals(HttpStatus.OK, messages.getStatusCode());
        for (ChatMessageObject message : messages.getBody()) {
            System.out.println(message.getChatMessageId());
            System.out.println(message.getMessage());         
        }
        //Fetch Human Faction Messages
        messages = cmc.fetchBundleOfChatMessages(new ChatMessageObject(null, null, Faction.HUMAN, null, 1, null, null));
        assertEquals(HttpStatus.OK, messages.getStatusCode());
        for (ChatMessageObject message : messages.getBody()) {
            System.out.println(message.getChatMessageId());
            System.out.println(message.getMessage());         
        }
        //Fetch Zombie Faction Messages
        messages = cmc.fetchBundleOfChatMessages(new ChatMessageObject(null, null, Faction.ZOMBIE, null, 1, null, null));
        assertEquals(HttpStatus.OK, messages.getStatusCode());
        for (ChatMessageObject message : messages.getBody()) {
            System.out.println(message.getChatMessageId());
            System.out.println(message.getMessage());         
        }
        //Fetch Squad Messages
        messages = cmc.fetchBundleOfChatMessages(new ChatMessageObject(null, null, Faction.HUMAN, null, 1, null, 1));
        assertEquals(HttpStatus.OK, messages.getStatusCode());
        for (ChatMessageObject message : messages.getBody()) {
            System.out.println(message.getChatMessageId());
            System.out.println(message.getMessage());         
        }
    }


    int createTestPlayer() {
        ResponseEntity<PlayerObject> response = pc.addPlayer(new Player(),this.userAccountId,this.gameId);
        return response.getBody().getPlayerId();
    }

    int createTestUserAccount() {
        ResponseEntity<UserAccountObject> response = uac.addUserAccount(new UserAccount());
        return response.getBody().getUserAccountId();
    }

    int createTestSquad() {
        ResponseEntity<SquadObject> response = sc.addSquad(new Squad(), this.gameId);
        return response.getBody().getSquadId();
    }

    int createTestGame() {
        ResponseEntity<GameObject> response = gc.addGame(new Game());
        return response.getBody().getGameId();
    }
}
