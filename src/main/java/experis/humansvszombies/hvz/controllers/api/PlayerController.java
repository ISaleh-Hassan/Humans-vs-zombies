package experis.humansvszombies.hvz.controllers.api;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Player;
import experis.humansvszombies.hvz.models.tables.UserAccount;
import experis.humansvszombies.hvz.repositories.PlayerRepository;


@RestController
public class PlayerController {
    @Autowired
    PlayerRepository playerRepository;

    @CrossOrigin()
    @GetMapping("/api/fetch/player/all")
    public ResponseEntity<ArrayList<Player>> getAllPlayers() {
        ArrayList<Player> players = (ArrayList<Player>)playerRepository.findAll();
        System.out.println("Fetched all players");
        return new ResponseEntity<>(players, HttpStatus.OK);
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/player/{playerId}")
    public ResponseEntity<Player> getPlayerById(@PathVariable Integer playerId) {
        try {
            return playerRepository.findById(playerId)
                    .map(player -> new ResponseEntity<>(player, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>((Player) null, HttpStatus.NOT_FOUND));
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id was null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @PostMapping("/api/create/player/{userAccountId}/{gameId}")
    public ResponseEntity<Player> addPlayer(@RequestBody Player newPlayer, @PathVariable Integer userAccountId,
        @PathVariable Integer gameId) {   
            try {
                HttpStatus response = HttpStatus.CREATED;
                newPlayer.setUserAccount(new UserAccount(userAccountId));
                newPlayer.setGame(new Game(gameId));
                playerRepository.save(newPlayer);
                System.out.println("Player CREATED with id: " + newPlayer.getPlayerId() + " belongs to game with id: " + gameId + " and useraccount with id: " + userAccountId);
                return new ResponseEntity<>(newPlayer, response);
            } catch(IllegalArgumentException e) {
                System.out.println("Exception thrown: newPlayer was null.");
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }      
    }

    @CrossOrigin()
    @PatchMapping("/api/update/player/{playerId}")
    public ResponseEntity<Player> updatePlayer(@RequestBody Player newPlayer, @PathVariable Integer playerId) {
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
            return new ResponseEntity<>(player, response);
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
}
