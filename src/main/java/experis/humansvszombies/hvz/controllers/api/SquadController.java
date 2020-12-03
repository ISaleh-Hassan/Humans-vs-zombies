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
import experis.humansvszombies.hvz.models.tables.Squad;
import experis.humansvszombies.hvz.repositories.SquadRepository;


@RestController
public class SquadController {
    @Autowired
    SquadRepository squadRepository;

    @GetMapping("/api/fetch/squad/all")
    public ResponseEntity<ArrayList<Squad>> getAllUsers() {
        ArrayList<Squad> squads = (ArrayList<Squad>)squadRepository.findAll();
        System.out.println("Fetched all squads");
        return new ResponseEntity<>(squads, HttpStatus.OK);
    }

    @PostMapping("/api/create/squad/{gameId}")
    public ResponseEntity<Squad> addSquad(@RequestBody Squad newSquad, @PathVariable Integer gameId) {
            HttpStatus response = HttpStatus.CREATED;
            newSquad.setGame(new Game(gameId));
            squadRepository.save(newSquad);
            System.out.println("Squad CREATED with id: " + newSquad.getSquadId());
            return new ResponseEntity<>(newSquad, response);
    }

    @DeleteMapping("/api/delete/squad/{squadId}")
    public ResponseEntity<String> deleteSquad(@PathVariable Integer squadId) {
        String message = "";
        HttpStatus response;
        Squad squad = squadRepository.findById(squadId).orElse(null);
        if(squad != null) {
            squadRepository.deleteById(squadId);
            System.out.println("Squad DELETED with id: " + squad.getSquadId());
            message = "SUCCESS";
            response = HttpStatus.OK;
        } else {
            message = "FAILED";
            response = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(message, response);
    }
    
}
