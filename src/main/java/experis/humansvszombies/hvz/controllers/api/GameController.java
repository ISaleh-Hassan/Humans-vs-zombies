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
import experis.humansvszombies.hvz.repositories.GameRepository;


@RestController
public class GameController {
    @Autowired
    GameRepository gameRepository;

    @GetMapping("/api/fetch/game/all")
    public ResponseEntity<ArrayList<Game>> getAllUsers() {
        ArrayList<Game> games = (ArrayList<Game>)gameRepository.findAll();
        System.out.println("Fetched all games");
        return new ResponseEntity<>(games, HttpStatus.OK);
    }

    @PostMapping("/api/create/game")
    public ResponseEntity<Game> addGame(@RequestBody Game newGame) {
            HttpStatus response = HttpStatus.CREATED;
            gameRepository.save(newGame);
            System.out.println("Game CREATED with id: " + newGame.getGameId());
            return new ResponseEntity<>(newGame, response);
    }

    @DeleteMapping("/api/delete/game/{gameId}")
    public ResponseEntity<String> deleteGame(@PathVariable Integer gameId) {
        String message = "";
        HttpStatus response;
        Game game = gameRepository.findById(gameId).orElse(null);
        if(game != null) {
            gameRepository.deleteById(gameId);
            System.out.println("Game DELETED with id: " + game.getGameId());
            message = "SUCCESS";
            response = HttpStatus.OK;
        } else {
            message = "FAILED";
            response = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(message, response);
    }
}
