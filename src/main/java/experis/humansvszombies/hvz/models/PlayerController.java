package experis.humansvszombies.hvz.models;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PlayerController {

    private final PlayerRepository repository;

  PlayerController(PlayerRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin
    @GetMapping("/api/player")
    List<Player> all() {
        return (List<Player>) repository.findAll();
    }

    @CrossOrigin()
    @PostMapping("/api/create/player")
    public ResponseEntity<Player> addUser(@RequestBody Player newUser) {
        try {
            newUser = repository.save(newUser);
            System.out.println("New user with id: " + newUser.getId() + " added");
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: newUser was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
