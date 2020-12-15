package experis.humansvszombies.hvz.controllers.api;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import experis.humansvszombies.hvz.models.datastructures.GameObject;
import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.repositories.GameRepository;


@RestController
public class GameController {
    @Autowired
    GameRepository gameRepository;

    @CrossOrigin()
    @GetMapping("/api/fetch/game/all")
    public ResponseEntity<ArrayList<GameObject>> getAllGames() {
        ArrayList<Game> games = (ArrayList<Game>)gameRepository.findAll();
        ArrayList<GameObject> returnGames = new ArrayList<GameObject>();
        for (Game game : games) {
            returnGames.add(this.createGameObject(game));
        }
        System.out.println("Fetched all games");
        return new ResponseEntity<>(returnGames, HttpStatus.OK);
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/game/{gameId}")
    public ResponseEntity<GameObject> getGameById(@PathVariable Integer gameId) {
        try {   
            return gameRepository.findById(gameId)
            .map(game -> new ResponseEntity<>(this.createGameObject(game), HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>((GameObject) null, HttpStatus.NOT_FOUND));
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id was null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @PostMapping("/api/create/game")
    public ResponseEntity<GameObject> addGame(@RequestBody Game newGame) {
        try {
            newGame = gameRepository.save(newGame);
            System.out.println("Game CREATED with id: " + newGame.getGameId());
            return new ResponseEntity<>(this.createGameObject(newGame), HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: newGame was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @PatchMapping("/api/update/game/{gameId}")
    public ResponseEntity<GameObject> updateGame(@RequestBody Game newGame, @PathVariable Integer gameId) {   
        try {
            Game game;
            HttpStatus status;
            if (gameRepository.existsById(gameId)) {
                game = gameRepository.findById(gameId).get();
                if (newGame.getName() != null) {
                    game.setName(newGame.getName());
                }
                if (newGame.getGameState()!= null) {
                    game.setGameState(newGame.getGameState());
                }
                if (newGame.getNwPoint() != null) {
                    game.setNwPoint(newGame.getNwPoint());
                }
                if (newGame.getSePoint() != null) {
                    game.setSePoint(newGame.getSePoint());
                }
                if (newGame.getStartTime() != null) {
                    game.setStartTime(newGame.getStartTime());
                }
                if (newGame.getEndTime() != null) {
                    game.setEndTime(newGame.getEndTime());
                }
                if (newGame.getMaxNumberOfPlayers() > 0) {
                    game.setMaxNumberOfPlayers(newGame.getMaxNumberOfPlayers());
                }
                if (newGame.getDescription() != null) {
                    game.setDescription(newGame.getDescription());
                }  
                gameRepository.save(game);
                status = HttpStatus.OK;
                System.out.println("Updated Game with id: " + game.getGameId());
            } else {
                System.out.println("Could not find Game with id: " + gameId);
                game = null;
                status = HttpStatus.NOT_FOUND;
            }
            return new ResponseEntity<>(this.createGameObject(game), status);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id or newGame was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @DeleteMapping("/api/delete/game/{gameId}")
    public ResponseEntity<String> deleteGame(@PathVariable Integer gameId) {
        try {
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
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id was gameId was null.");
            return new ResponseEntity<>("FAILED", HttpStatus.BAD_REQUEST);
        }    
    }

    private GameObject createGameObject(Game game) {
        GameObject gameObject = new GameObject(
            game.getGameId(),
            game.getName(), 
            game.getGameState(), 
            game.getNwPoint(), 
            game.getSePoint(), 
            game.getStartTime(), 
            game.getEndTime(), 
            game.getMaxNumberOfPlayers(), 
            game.getDescription(), 
            0
        );
        return gameObject;
    }
}
