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

import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Player;
import experis.humansvszombies.hvz.models.tables.UserAccount;
import experis.humansvszombies.hvz.repositories.PlayerRepository;


@RestController
public class PlayerController {
    @Autowired
    PlayerRepository playerRepository;

    @GetMapping("/api/fetch/player/all")
    public ResponseEntity<ArrayList<Player>> getAllUsers() {
        ArrayList<Player> players = (ArrayList<Player>)playerRepository.findAll();
        System.out.println("Fetched all players");
        return new ResponseEntity<>(players, HttpStatus.OK);
    }

    @PostMapping("/api/create/player/{userAccountId}/{gameId}")
    public ResponseEntity<Player> addPlayer(@RequestBody Player newPlayer, @PathVariable Integer userAccountId,
        @PathVariable Integer gameId) {
            HttpStatus response = HttpStatus.CREATED;
            newPlayer.setUserAccount(new UserAccount(userAccountId));
            newPlayer.setGame(new Game(gameId));
            playerRepository.save(newPlayer);
            System.out.println("Player CREATED with id: " + newPlayer.getPlayerId() + " belongs to game with id: " + gameId + " and useraccount with id: " + userAccountId);
            return new ResponseEntity<>(newPlayer, response);
    }

    @DeleteMapping("/api/delete/player/{playerId}")
    public ResponseEntity<String> deletePlayer(@PathVariable Integer playerId) {
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
    }
}
