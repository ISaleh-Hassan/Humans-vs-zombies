package experis.humansvszombies.hvz.controllers.api;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import experis.humansvszombies.hvz.models.datastructures.RegisterKill;
import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Kill;
import experis.humansvszombies.hvz.models.tables.Player;
import experis.humansvszombies.hvz.repositories.KillRepository;


@RestController
public class KillController {
    @Autowired
    KillRepository killRepository;

    @Autowired 
    PlayerController playerController;

    @CrossOrigin()
    @GetMapping("/api/fetch/kill/all")
    public ResponseEntity<ArrayList<Kill>> getAllKills() {
        ArrayList<Kill> kills = (ArrayList<Kill>)killRepository.findAll();
        System.out.println("Fetched all kills");
        return new ResponseEntity<>(kills, HttpStatus.OK);
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/kill/{killId}")
    public ResponseEntity<Kill> getKillById(@PathVariable Integer killId) {
        try {
            return killRepository.findById(killId)
                    .map(kill -> new ResponseEntity<>(kill, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>((Kill) null, HttpStatus.NOT_FOUND));
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id was null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @PostMapping("/api/create/kill/{gameId}/{killerId}/{victimId}")
    public ResponseEntity<Kill> addKill(@RequestBody Kill newKill, @PathVariable Integer gameId, 
    @PathVariable Integer killerId, @PathVariable Integer victimId) {
        try {
            HttpStatus response = HttpStatus.CREATED;
            if (newKill != null) {
                newKill.setGame(new Game(gameId));
                newKill.setKiller(new Player(killerId));
                newKill.setVictim(new Player(victimId));
                killRepository.save(newKill);
                System.out.println("Kill CREATED with id: " + newKill.getKillId());
            } else {
                System.out.println("Error: newKill was null.");
                response = HttpStatus.BAD_REQUEST;
            }
            return new ResponseEntity<>(newKill, response);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: newKill was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }   
    }

    @CrossOrigin()
    @PatchMapping("/api/update/kill/{killId}")
    public ResponseEntity<Kill> updateKill(@RequestBody Kill newKill, @PathVariable Integer killId) {
        try {
            Kill kill;
            HttpStatus response;
            if (killRepository.existsById(killId)) {
                kill = killRepository.findById(killId).get();
                if (newKill.getPosition() != null) {
                    kill.setPosition(newKill.getPosition());
                }
                if (newKill.getTimeOfDeath() != null) {
                    kill.setTimeOfDeath(newKill.getTimeOfDeath());
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

    @CrossOrigin()
    @DeleteMapping("/api/delete/kill/{killId}")
    public ResponseEntity<String> deleteKill(@PathVariable Integer killId) {
        try {
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
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: killId was null.");
            return new ResponseEntity<>("FAILED", HttpStatus.BAD_REQUEST);
        }  
    }

    @CrossOrigin()
    @PostMapping("/api/v2/create/kill/{gameId}/{killerId}/{victimId}")
    public ResponseEntity<Kill> addKillVersion2(@RequestBody RegisterKill newKill) {
        try {
            HttpStatus status = HttpStatus.CREATED;
            if (newKill != null) {
                if (newKill.getKillObject() != null) {
                    if (playerController.checkBiteCode(newKill.getVictimId(), newKill.getBiteCode()).getBody()) {
                        newKill.getKillObject().setGame(new Game(newKill.getGameId()));
                        newKill.getKillObject().setKiller(new Player(newKill.getKillerId()));
                        newKill.getKillObject().setVictim(new Player(newKill.getVictimId()));
                        killRepository.save(newKill.getKillObject());
                        System.out.println("Kill CREATED with id: " + newKill.getKillObject().getKillId());
                    } else {
                        System.out.println("BiteCode did not match with victims BiteCode.");
                        status = HttpStatus.BAD_REQUEST;
                        newKill.setKillObject(null);
                    }
                }
            } else {
                System.out.println("Error: newKill was null.");
                status = HttpStatus.BAD_REQUEST;
            }
            return new ResponseEntity<>(newKill.getKillObject(), status);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: newKill was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }   
    }
}
