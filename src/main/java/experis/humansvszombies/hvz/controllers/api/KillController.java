package experis.humansvszombies.hvz.controllers.api;

import java.util.ArrayList;

import experis.humansvszombies.hvz.models.tables.Mission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Kill;
import experis.humansvszombies.hvz.models.tables.Player;
import experis.humansvszombies.hvz.repositories.KillRepository;


@RestController
public class KillController {
    @Autowired
    KillRepository killRepository;

    @GetMapping("/api/fetch/kill/all")
    public ResponseEntity<ArrayList<Kill>> getAllUsers() {
        ArrayList<Kill> kills = (ArrayList<Kill>)killRepository.findAll();
        System.out.println("Fetched all kills");
        return new ResponseEntity<>(kills, HttpStatus.OK);
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/kill/{killId}")
    public ResponseEntity<Kill> getMissionById(@PathVariable Integer killId) {
        try {
            return killRepository.findById(killId)
                    .map(kill -> new ResponseEntity<>(kill, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>((Kill) null, HttpStatus.NOT_FOUND));
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id was null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/api/create/kill/{gameId}/{killerId}/{victimId}")
    public ResponseEntity<Kill> addKill(@RequestBody Kill newKill, @PathVariable Integer gameId, 
        @PathVariable Integer killerId, @PathVariable Integer victimId) {
            HttpStatus response = HttpStatus.CREATED;
            newKill.setGame(new Game(gameId));
            newKill.setKiller(new Player(killerId));
            newKill.setVictim(new Player(victimId));
            killRepository.save(newKill);
            System.out.println("Kill CREATED with id: " + newKill.getKillId());
            return new ResponseEntity<>(newKill, response);
    }

    @CrossOrigin()
    @PatchMapping("/api/update/kill/{killId}")
    public ResponseEntity<Kill> updateMission(@RequestBody Kill newKill, @PathVariable Integer killId) {
        try {
            Kill kill;
            HttpStatus response;
            if (killRepository.existsById(killId)) {
                kill = killRepository.findById(killId).get();

                if (newKill.getGame() != null) {
                    kill.setGame(newKill.getGame());
                }
                if (newKill.getKiller() != null) {
                    kill.setKiller(newKill.getKiller());
                }
                if (newKill.getPosition() != null) {
                    kill.setPosition(newKill.getPosition());
                }
                if (newKill.getTimeOfDeath() != null) {
                    kill.setTimeOfDeath(newKill.getTimeOfDeath());
                }
                if (newKill.getVictim()!= null) {
                    kill.setVictim(newKill.getVictim());
                }

                killRepository.save(kill);
                response = HttpStatus.OK;
                System.out.println("Updated kill with id: " + kill.getKillId());
            } else {
                System.out.println("Could not find kill with id: " + killId);
                kill = null;
                response = HttpStatus.NOT_FOUND;
            }
            return new ResponseEntity<>(kill, response);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id or kill was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/api/delete/kill/{killId}")
    public ResponseEntity<String> deleteKill(@PathVariable Integer killId) {
        String message = "";
        HttpStatus response;
        Kill kill = killRepository.findById(killId).orElse(null);
        if(kill != null) {
            killRepository.deleteById(killId);
            System.out.println("Kill DELETED with id: " + kill.getKillId());
            message = "SUCCESS";
            response = HttpStatus.OK;
        } else {
            message = "FAILED";
            response = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(message, response);
    }
}
