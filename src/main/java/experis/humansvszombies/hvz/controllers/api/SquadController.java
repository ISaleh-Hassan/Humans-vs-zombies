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

import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Squad;
import experis.humansvszombies.hvz.repositories.SquadRepository;


@RestController
public class SquadController {
    @Autowired
    SquadRepository squadRepository;

    @CrossOrigin()
    @GetMapping("/api/fetch/squad/all")
    public ResponseEntity<ArrayList<Squad>> getAllSquads() {
        ArrayList<Squad> squads = (ArrayList<Squad>)squadRepository.findAll();
        System.out.println("Fetched all squads");
        return new ResponseEntity<>(squads, HttpStatus.OK);
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/squad/{squadId}")
    public ResponseEntity<Squad> getSquadById(@PathVariable Integer squadId) {
        try {
            return squadRepository.findById(squadId)
            .map(squad -> new ResponseEntity<>(squad, HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>((Squad) null, HttpStatus.NOT_FOUND));
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: squadId was null");
            return new ResponseEntity<>("FAILED", HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @PostMapping("/api/create/squad/{gameId}")
    public ResponseEntity<Squad> addSquad(@RequestBody Squad newSquad, @PathVariable Integer gameId) {
        try {
            if (newSquad != null) {
                newSquad.setGame(new Game(gameId));
                squadRepository.save(newSquad);
                System.out.println("Squad CREATED with id: " + newSquad.getSquadId());
                return new ResponseEntity<>(newSquad, HttpStatus.CREATED);
            }
            else {
                System.out.println("Exception thrown: newGame was null.");
                return new ResponseEntity<>("FAILED", HttpStatus.BAD_REQUEST);
            }
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: newGame was null.");
            return new ResponseEntity<>("FAILED", HttpStatus.BAD_REQUEST);
        }      
    }

    @CrossOrigin()
    @PatchMapping("/api/update/squad/{squadId}")
    public ResponseEntity<Squad> updateSquad(@RequestBody Squad newSquad, @PathVariable Integer squadId) {
        try {
            Squad squad;
            HttpStatus status;
            if (squadRepository.existsById(squadId)) {
                squad = squadRepository.findById(squadId).get();
                if (newSquad.getName() != null) {
                    squad.setName(newSquad.getName());
                }
                if (newSquad.getFaction() != null) {
                    squad.setFaction(newSquad.getFaction());
                }
                if (newSquad.getMaxNumberOfMembers() > 0) {
                    squad.setMaxNumberOfMembers(newSquad.getMaxNumberOfMembers());
                }
                squadRepository.save(squad);
                status = HttpStatus.OK;
                System.out.println("Updated Squad with id: " + squad.getSquadId());
            } else {
                System.out.println("Could not find Squad with id: " + squadId);
                squad = null;
                status = HttpStatus.NOT_FOUND;
            }
            return new ResponseEntity<>(squad, status);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: squadId or newSquad was null.");
            return new ResponseEntity<>("FAILED", HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @DeleteMapping("/api/delete/squad/{squadId}")
    public ResponseEntity<String> deleteSquad(@PathVariable Integer squadId) {
        try {
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
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: squadId was null.");
            return new ResponseEntity<>("FAILED", HttpStatus.BAD_REQUEST);
        }  
    } 
}
