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
import experis.humansvszombies.hvz.models.tables.SquadCheckin;
import experis.humansvszombies.hvz.models.tables.SquadMember;
import experis.humansvszombies.hvz.repositories.SquadCheckinRepository;



@RestController
public class SquadCheckinController {
    @Autowired
    SquadCheckinRepository squadCheckinRepository;

    @GetMapping("/api/fetch/squadcheckin/all")
    public ResponseEntity<ArrayList<SquadCheckin>> getAllUsers() {
        ArrayList<SquadCheckin> checkins = (ArrayList<SquadCheckin>)squadCheckinRepository.findAll();
        System.out.println("Fetched all squad checkins");
        return new ResponseEntity<>(checkins, HttpStatus.OK);
    }

    @PostMapping("/api/create/squadcheckin/{gameId}/{squadId}/{squadMemberId}")
    public ResponseEntity<SquadCheckin> addSquadCheckin(@RequestBody SquadCheckin newSquadCheckin, @PathVariable Integer gameId,
        @PathVariable Integer squadId, @PathVariable Integer squadMemberId) {
            HttpStatus response = HttpStatus.CREATED;
            newSquadCheckin.setGame(new Game(gameId));
            newSquadCheckin.setSquad(new Squad(squadId));
            newSquadCheckin.setSquadMember(new SquadMember(squadMemberId));
            squadCheckinRepository.save(newSquadCheckin);
            System.out.println("SquadCheckin CREATED with id: " + newSquadCheckin.getSquadCheckinId());
            return new ResponseEntity<>(newSquadCheckin, response);
    }

    @DeleteMapping("/api/delete/squadcheckin/{squadCheckinId}")
    public ResponseEntity<String> deleteSquadCheckin(@PathVariable Integer squadCheckinId) {
        String message = "";
        HttpStatus response;
        SquadCheckin checkin = squadCheckinRepository.findById(squadCheckinId).orElse(null);
        if(checkin != null) {
            squadCheckinRepository.deleteById(squadCheckinId);
            System.out.println("SquadCheckin DELETED with id: " + checkin.getSquadCheckinId());
            message = "SUCCESS";
            response = HttpStatus.OK;
        } else {
            message = "FAILED";
            response = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(message, response);
    }
}
