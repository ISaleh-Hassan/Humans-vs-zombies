package experis.humansvszombies.hvz.controllers.api;

import java.util.ArrayList;

import experis.humansvszombies.hvz.models.datastructures.ChatMessageObject;
import experis.humansvszombies.hvz.models.enums.SquadRank;
import experis.humansvszombies.hvz.models.tables.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import experis.humansvszombies.hvz.repositories.ChatMessageRepository;
import experis.humansvszombies.hvz.repositories.PlayerRepository;
import experis.humansvszombies.hvz.repositories.SquadMemberRepository;
import experis.humansvszombies.hvz.repositories.UserAccountRepository;


@RestController
public class ChatMessageController {
    @Autowired
    ChatMessageRepository chatMessageRepository;

    @Autowired
    PlayerRepository playerRepository;

    @Autowired
    UserAccountRepository userAccountRepository;

    @Autowired
    SquadMemberRepository squadMemberRepository;

    @CrossOrigin()
    @GetMapping("/api/fetch/chatmessage/all")
    @PreAuthorize("hasAuthority('ADMINISTRATOR') or hasAuthority('PLAYER')")
    public ResponseEntity<ArrayList<ChatMessageObject>> getAllChatMessages() {
        ArrayList<ChatMessage> messages = (ArrayList<ChatMessage>)chatMessageRepository.findAll();
        ArrayList<ChatMessageObject> returnMessages = new ArrayList<ChatMessageObject>();
        for (ChatMessage msg : messages) {
            returnMessages.add(this.createChatMessageObject(msg));            
        }
        System.out.println("Fetched all chat messages");
        return new ResponseEntity<>(returnMessages, HttpStatus.OK);
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/chatmessage/{chatMessageId}")
    @PreAuthorize("hasAuthority('ADMINISTRATOR') or hasAuthority('PLAYER')")
    public ResponseEntity<ChatMessageObject> getChatMessageById(@PathVariable Integer chatMessageId) {
        try {
            return chatMessageRepository.findById(chatMessageId)
                    .map(chatMessage -> new ResponseEntity<>(this.createChatMessageObject(chatMessage), HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>((ChatMessageObject) null, HttpStatus.NOT_FOUND));
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id was null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println("Exception thrown: Something went wrong when fetching ChatMessage based on id.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @PostMapping("/api/create/chatmessage/{gameId}/{playerId}/{squadId}")
    @PreAuthorize("hasAuthority('ADMINISTRATOR') or hasAuthority('PLAYER')")
    public ResponseEntity<ChatMessageObject> addChatMessage(@RequestBody ChatMessage newChatMessage, @PathVariable Integer gameId,
                                                      @PathVariable Integer playerId, @PathVariable Integer squadId) {
        try {
            HttpStatus response = HttpStatus.CREATED;
            if (gameId != null && playerId != null) {
                newChatMessage.setGame(new Game(gameId));
                newChatMessage.setPlayer(new Player(playerId));
                if (squadId != null && squadId != 0) {
                    newChatMessage.setSquad(new Squad(squadId));
                }
                chatMessageRepository.save(newChatMessage);
                System.out.println("ChatMessage CREATED with id: " + newChatMessage.getChatMessageId());
                return new ResponseEntity<>(this.createChatMessageObject(newChatMessage), response);
            } else {
                System.out.println("FAILED to CREATE ChatMessage: gameId or playerId was null.");
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id was null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println("Exception thrown: Something went wrong when creating a new ChatMessage.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @PatchMapping("/api/update/chatmessage/{chatMessageId}")
    @PreAuthorize("hasAuthority('ADMINISTRATOR') or hasAuthority('PLAYER')")
    public ResponseEntity<ChatMessageObject> updateChatMessage(@RequestBody ChatMessage newChatMessage, @PathVariable Integer chatMessageId) {
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
            return new ResponseEntity<>(this.createChatMessageObject(chatMessage), response);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id or newChatMessage was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println("Exception thrown: Something unexpected went wrong when updating a ChatMessage.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @DeleteMapping("/api/delete/chatmessage/{chatMessageId}")
    @PreAuthorize("hasAuthority('ADMINISTRATOR') or hasAuthority('PLAYER')")
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
        } catch (Exception e) {
            System.out.println("Exception thrown: Something went wrong when deleting a ChatMessage.");
            return new ResponseEntity<>("FAILED", HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @PostMapping("/api/fetch/chatmessage/bundle")
    @PreAuthorize("hasAuthority('ADMINISTRATOR') or hasAuthority('PLAYER')")
    public ResponseEntity<ArrayList<ChatMessageObject>> fetchBundleOfChatMessages(@RequestBody ChatMessageObject request) {
        try {
            ArrayList<ChatMessage> messages;
            if (request.getSquadId() == null || request.getSquadId() == 0) {
                messages = chatMessageRepository.findByGameAndFactionAndSquad(new Game(request.getGameId()), request.getFaction(), null);
            } else {
                messages = chatMessageRepository.findByGameAndSquad(new Game(request.getGameId()), new Squad(request.getSquadId()));
            }
            ArrayList<ChatMessageObject> result = new ArrayList<ChatMessageObject>();
            for (ChatMessage chatMessage : messages) {
                result.add(this.createChatMessageObject(chatMessage));
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Exception thrown: Something unexpected went wrong when fetching bundle of ChatMessages.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    private ChatMessageObject createChatMessageObject(ChatMessage msg) {
        try {
            String stringTime = null;
            if (msg.getTimestamp() != null) {
                stringTime = msg.getTimestamp().toString();
                stringTime = stringTime.substring(0, stringTime.length() - 4); //remove the miliseconds    
            }
            ChatMessageObject msgObject = null;
            Player tempPlayer = playerRepository.findById(msg.getPlayer().getPlayerId()).orElse(null);
            if (tempPlayer != null) {
                UserAccount tempUser = userAccountRepository.findById(tempPlayer.getUserAccount().getUserAccountId()).orElse(null);
                SquadRank rank = null;
                if (tempPlayer.getSquadMember() != null) {
                    rank = tempPlayer.getSquadMember().getSquadRank();
                }
                if (tempUser != null) {
                        msgObject = new ChatMessageObject(
                        msg.getChatMessageId(), 
                        msg.getMessage(), 
                        msg.getFaction(), 
                        msg.getTimestamp(),
                        (msg.getGame() != null) ? msg.getGame().getGameId() : null,
                        (msg.getPlayer() != null) ? msg.getPlayer().getPlayerId() : null,
                        (msg.getSquad() != null) ? msg.getSquad().getSquadId() : null,
                        tempUser.getUsername(),
                        stringTime,
                        tempPlayer.isAlive(),
                        rank,
                        tempPlayer.getFaction()
                    );   
                }
            }
            return msgObject;
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: PlayerId or UserAccountId not set when creating ChatMessageObject.");
            return null;
        } catch (Exception e) {
            System.out.println("Exception thrown: Something unexpected went wrong when creating a ChatMessageObject.");
            return null;
        }
    }
}
