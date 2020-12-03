package experis.humansvszombies.hvz.controllers.api;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import experis.humansvszombies.hvz.models.tables.ChatMessage;
import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Player;
import experis.humansvszombies.hvz.models.tables.Squad;
import experis.humansvszombies.hvz.repositories.ChatMessageRepository;


@RestController
public class ChatMessageController {
    @Autowired
    ChatMessageRepository chatMessageRepository;

    @GetMapping("/api/fetch/chatmessage/all")
    public ResponseEntity<ArrayList<ChatMessage>> getAllUsers() {
        ArrayList<ChatMessage> messages = (ArrayList<ChatMessage>)chatMessageRepository.findAll();
        System.out.println("Fetched all chat messages");
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @PostMapping("/api/create/chatmessage/{gameId}/{playerId}/{squadId}")
    public ResponseEntity<ChatMessage> addChatMessage(@RequestBody ChatMessage newChatMessage, @PathVariable Integer gameId,
        @PathVariable Integer playerId, @PathVariable Integer squadId) {
            HttpStatus response = HttpStatus.CREATED;
            newChatMessage.setGame(new Game(gameId));
            newChatMessage.setPlayer(new Player(playerId));
            newChatMessage.setSquad(new Squad(squadId));
            chatMessageRepository.save(newChatMessage);
            System.out.println("ChatMessage CREATED with id: " + newChatMessage.getChatMessageId());
            return new ResponseEntity<>(newChatMessage, response);
    }

    @DeleteMapping("/api/delete/chatmessage/{chatMessageId}")
    public ResponseEntity<String> deleteChatMessage(@PathVariable Integer chatMessageId) {
        String message = "";
        HttpStatus response;
        ChatMessage chatMessage = chatMessageRepository.findById(chatMessageId).orElse(null);
        if(chatMessage != null) {
            chatMessageRepository.deleteById(chatMessageId);
            System.out.println("ChatMessage DELETED with id: " + chatMessage.getChatMessageId());
            message = "SUCCESS";
            response = HttpStatus.OK;
        } else {
            message = "FAILED";
            response = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(message, response);
    }


}
