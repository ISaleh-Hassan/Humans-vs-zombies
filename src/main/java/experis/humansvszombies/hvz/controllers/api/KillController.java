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
