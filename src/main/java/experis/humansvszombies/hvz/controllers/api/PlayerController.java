package experis.humansvszombies.hvz.controllers.api;

import java.util.ArrayList;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import experis.humansvszombies.hvz.models.datastructures.PlayerObject;
import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Player;
import experis.humansvszombies.hvz.models.tables.UserAccount;
import experis.humansvszombies.hvz.repositories.PlayerRepository;


@RestController
public class PlayerController {
    @Autowired
    PlayerRepository playerRepository;

    private static Random randomNumber = new Random();
    private static char[] letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toCharArray();

    @CrossOrigin()
    @GetMapping("/api/fetch/player/all")
    public ResponseEntity<ArrayList<PlayerObject>> getAllPlayers() {
        ArrayList<Player> players = (ArrayList<Player>)playerRepository.findAll();
        ArrayList<PlayerObject> returnPlayers = new ArrayList<PlayerObject>();
        for (Player player : players) {
            returnPlayers.add(this.createPlayerObject(player));
        }
        System.out.println("Fetched all players");
        return new ResponseEntity<>(returnPlayers, HttpStatus.OK);
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/player/{playerId}")
    public ResponseEntity<PlayerObject> getPlayerById(@PathVariable Integer playerId) {
        try {
            return playerRepository.findById(playerId)
                    .map(player -> new ResponseEntity<>(this.createPlayerObject(player), HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>((PlayerObject) null, HttpStatus.NOT_FOUND));
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id was null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
    
    @CrossOrigin()
    @GetMapping("/api/fetch/player/game={gameId}/user={userId}")
    public ResponseEntity<PlayerObject> getPlayerByGameIdAndUserId(@PathVariable Integer gameId, @PathVariable Integer userId) {
        try {
            HttpStatus status;
            PlayerObject playerObject = null;
            if (gameId != null && userId != null) {
                Player player = playerRepository.findDistinctByGameAndUserAccount(new Game(gameId), new UserAccount(userId));
                if (player != null) {
                    playerObject = this.createPlayerObject(player);
                    status = HttpStatus.OK;
                } else {
                    System.out.println("ERROR: player belonging to Game: " + gameId + " and UserAccount:" + userId + " could not be found.");
                    status = HttpStatus.NOT_FOUND;
                }
            } else {
                System.out.println("ERROR: gameId or userId was null.");
                status = HttpStatus.BAD_REQUEST;
            }
            return new ResponseEntity<>(playerObject, status);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: gameId or userId was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);        
        }
    }

    @CrossOrigin()
    @PostMapping("/api/create/player/{userAccountId}/{gameId}")
    public ResponseEntity<PlayerObject> addPlayer(@RequestBody Player newPlayer, @PathVariable Integer userAccountId,
        @PathVariable Integer gameId) {   
            try {
                HttpStatus response = HttpStatus.CREATED;
                StringBuilder bitecode = new StringBuilder();
                for (int i = 0; i < 8; i++) {
                    bitecode.append(letters[randomNumber.nextInt(letters.length)]);
                }
                newPlayer.setBiteCode(bitecode.toString());
                newPlayer.setUserAccount(new UserAccount(userAccountId));
                newPlayer.setGame(new Game(gameId));
                playerRepository.save(newPlayer);
                System.out.println("Player CREATED with id: " + newPlayer.getPlayerId() + " belongs to game with id: " + gameId + " and useraccount with id: " + userAccountId);
                return new ResponseEntity<>(this.createPlayerObject(newPlayer), response);
            } catch(IllegalArgumentException e) {
                System.out.println("Exception thrown: newPlayer was null.");
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }      
    }

    @CrossOrigin()
    @PatchMapping("/api/update/player/{playerId}")
    public ResponseEntity<PlayerObject> updatePlayer(@RequestBody Player newPlayer, @PathVariable Integer playerId) {
        try {
            Player player;
            HttpStatus response;
            if (playerRepository.existsById(playerId)) {
                player = playerRepository.findById(playerId).get();
                if (newPlayer.getFaction() != null) {
                    player.setFaction(newPlayer.getFaction());
                }
                player.setAlive(newPlayer.isAlive());
                player.setPatientZero(newPlayer.isPatientZero());
                if (newPlayer.getBiteCode() != null) {
                    player.setBiteCode(newPlayer.getBiteCode());
                }
                playerRepository.save(player);
                response = HttpStatus.OK;
                System.out.println("Updated player with id: " + player.getPlayerId());
            } else {
                System.out.println("Could not find player with id: " + playerId);
                player = null;
                response = HttpStatus.NOT_FOUND;
            }
            return new ResponseEntity<>(this.createPlayerObject(player), response);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: playerId or newPlayer was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @DeleteMapping("/api/delete/player/{playerId}")
    public ResponseEntity<String> deletePlayer(@PathVariable Integer playerId) {
        try {
            String message = "";
            HttpStatus response;
            Player player = playerRepository.findById(playerId).orElse(null);
            if(player != null) {
                playerRepository.deleteById(playerId);
                System.out.println("Player DELETED with id: " + player.getPlayerId());
                message = "SUCCESS";
                response = HttpStatus.OK;
            } else {
                message = "FAILED";
                response = HttpStatus.NOT_FOUND;
            }
            return new ResponseEntity<>(message, response);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: playerId was null.");
            return new ResponseEntity<>("FAILED", HttpStatus.BAD_REQUEST);
        }     
    }

    public ResponseEntity<Boolean> checkBiteCode(Integer victimId, String biteCode) {
        try {
            HttpStatus status = HttpStatus.OK;
            Boolean result;
            Player victim = playerRepository.findById(victimId).orElse(null);
            if (victim != null) {
                if (victim.getBiteCode().equals(biteCode)) {
                    result = true;
                } else {
                    result = false;
                }
            } else {
                status = HttpStatus.BAD_REQUEST;
                result = false;
            }
            return new ResponseEntity<>(result, status);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: victimId was null.");
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    private PlayerObject createPlayerObject(Player player) {
        PlayerObject playerObject = new PlayerObject(
            player.getPlayerId(), 
            player.getFaction(), 
            player.isAlive(), 
            player.isPatientZero(), 
            player.getBiteCode(), 
            (player.getUserAccount() != null) ? player.getUserAccount().getUserAccountId() : null,
            (player.getGame() != null) ? player.getGame().getGameId() : null,
            (player.getSquadMember() != null) ? player.getSquadMember().getSquadMemberId() : null
        );
        return playerObject;
    }
}
