package experis.humansvszombies.hvz.controllers.api;

import java.util.ArrayList;

import experis.humansvszombies.hvz.models.datastructures.ChatMessageRequest;
import experis.humansvszombies.hvz.models.tables.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import experis.humansvszombies.hvz.repositories.ChatMessageRepository;


@RestController
public class ChatMessageController {
    @Autowired
    ChatMessageRepository chatMessageRepository;

    @CrossOrigin()
    @GetMapping("/api/fetch/chatmessage/all")
    public ResponseEntity<ArrayList<ChatMessage>> getAllChatMessages() {
        ArrayList<ChatMessage> messages = (ArrayList<ChatMessage>)chatMessageRepository.findAll();
        System.out.println("Fetched all chat messages");
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/message/{chatMessageId}")
    public ResponseEntity<ChatMessage> getChatMessageById(@PathVariable Integer chatMessageId) {
        try {
            return chatMessageRepository.findById(chatMessageId)
                    .map(chatMessage -> new ResponseEntity<>(chatMessage, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>((ChatMessage) null, HttpStatus.NOT_FOUND));
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id was null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @PostMapping("/api/create/chatmessage/{gameId}/{playerId}/{squadId}")
    public ResponseEntity<ChatMessage> addChatMessage(@RequestBody ChatMessage newChatMessage, @PathVariable Integer gameId,
                                                      @PathVariable Integer playerId, @PathVariable Integer squadId) {
        try {
            HttpStatus response = HttpStatus.CREATED;
            newChatMessage.setGame(new Game(gameId));
            newChatMessage.setPlayer(new Player(playerId));
            newChatMessage.setSquad(new Squad(squadId));
            chatMessageRepository.save(newChatMessage);
            System.out.println("ChatMessage CREATED with id: " + newChatMessage.getChatMessageId());
            return new ResponseEntity<>(newChatMessage, response);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id was null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @PatchMapping("/api/update/kill/{chatMessageId}")
    public ResponseEntity<ChatMessage> updateChatMessage(@RequestBody ChatMessage newChatMessage, @PathVariable Integer chatMessageId) {
        try {
            ChatMessage chatMessage;
            HttpStatus response;
            if (chatMessageRepository.existsById(chatMessageId)) {
                chatMessage = chatMessageRepository.findById(chatMessageId).get();
                if (newChatMessage.getMessage() != null) {
                    chatMessage.setMessage(newChatMessage.getMessage());
                }
                if (newChatMessage.getFaction() != null) {
                    chatMessage.setFaction(newChatMessage.getFaction());
                }
                if (newChatMessage.getTimestamp() != null) {
                    chatMessage.setTimestamp(newChatMessage.getTimestamp());
                }
                chatMessageRepository.save(chatMessage);
                response = HttpStatus.OK;
                System.out.println("Updated chatMessage with id: " + chatMessage.getChatMessageId());
            } else {
                System.out.println("Could not find chatMessage with id: " + chatMessageId);
                chatMessage = null;
                response = HttpStatus.NOT_FOUND;
            }
            return new ResponseEntity<>(chatMessage, response);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id or newChatMessage was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @DeleteMapping("/api/delete/chatmessage/{chatMessageId}")
    public ResponseEntity<String> deleteChatMessage(@PathVariable Integer chatMessageId) {
        try {
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
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id was null");
            return new ResponseEntity<>("FAILED", HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin("/api/fetch/chatmessage/bundle")
    public ResponseEntity<ArrayList<ChatMessage>> fetchBundleOfChatMessages(@RequestBody ChatMessageRequest request) {
        try {
            ArrayList<ChatMessage> messages;
            if (request.getSquadId() == null) {
                messages = chatMessageRepository.findByGameAndFaction(request.getGameId(), request.getFaction());
            } else {
                messages = chatMessageRepository.findByGameAndSquad(request.getGameId(), request.getSquadId());
            }
            return new ResponseEntity<>(messages, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Exception thrown when fetching bundle of ChatMessages.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
