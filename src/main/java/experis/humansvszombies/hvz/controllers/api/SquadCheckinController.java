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

import experis.humansvszombies.hvz.models.datastructures.SquadCheckinObject;
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
    public ResponseEntity<ArrayList<SquadCheckinObject>> getAllSquadCheckins() {
        ArrayList<SquadCheckin> checkins = (ArrayList<SquadCheckin>)squadCheckinRepository.findAll();
        ArrayList<SquadCheckinObject> returnCheckins = new ArrayList<SquadCheckinObject>();
        for (SquadCheckin checkin : checkins) {
            returnCheckins.add(this.createSquadCheckinObject(checkin));       
        }
        System.out.println("Fetched all squad checkins");
        return new ResponseEntity<>(returnCheckins, HttpStatus.OK);
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/squadcheckin/{squadCheckinId}")
    public ResponseEntity<SquadCheckinObject> getSquadCheckinById(@PathVariable Integer squadCheckinId) {
        try {
            return squadCheckinRepository.findById(squadCheckinId)
            .map(checkin -> new ResponseEntity<>(this.createSquadCheckinObject(checkin), HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>((SquadCheckinObject) null, HttpStatus.NOT_FOUND));
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: squadCheckinId was null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @PostMapping("/api/create/squadcheckin/{gameId}/{squadId}/{squadMemberId}")
    public ResponseEntity<SquadCheckinObject> addSquadCheckin(@RequestBody SquadCheckin newSquadCheckin, @PathVariable Integer gameId,
    @PathVariable Integer squadId, @PathVariable Integer squadMemberId) {
        try {
            HttpStatus response;
            if (newSquadCheckin != null) {
                newSquadCheckin.setGame(new Game(gameId));
                newSquadCheckin.setSquad(new Squad(squadId));
                newSquadCheckin.setSquadMember(new SquadMember(squadMemberId));
                squadCheckinRepository.save(newSquadCheckin);
                response = HttpStatus.CREATED;
                System.out.println("SquadCheckin CREATED with id: " + newSquadCheckin.getSquadCheckinId());
            } else {
                System.out.println("Error: newSquadCheckin was null.");
                response = HttpStatus.BAD_REQUEST;
            }
            return new ResponseEntity<>(this.createSquadCheckinObject(newSquadCheckin), response);
            
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: newSquadCheckin was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }          
    }

    @CrossOrigin()
    @PatchMapping("/api/update/squadcheckin/{squadCheckinId}")
    public ResponseEntity<SquadCheckinObject> updateSquadCheckin(@RequestBody SquadCheckin newSquadCheckin, @PathVariable Integer squadCheckinId) {
        try {
            SquadCheckin checkin;
            HttpStatus status;
            if (squadCheckinRepository.existsById(squadCheckinId)) {
                checkin = squadCheckinRepository.findById(squadCheckinId).get();
                if (newSquadCheckin.getPointOfTime() != null) {
                    checkin.setPointOfTime(newSquadCheckin.getPointOfTime());
                }
                if (newSquadCheckin.getPosition() != null) {
                    checkin.setPosition(newSquadCheckin.getPosition());
                }
                squadCheckinRepository.save(checkin);
                status = HttpStatus.OK;
                System.out.println("Updated SquadCheckin with id: " + checkin.getSquadCheckinId());
            } else {
                System.out.println("Could not find SquadCheckin with id: " + squadCheckinId);
                checkin = null;
                status = HttpStatus.NOT_FOUND;
            }
            return new ResponseEntity<>(this.createSquadCheckinObject(checkin), status);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: squadCheckinId or newSquadCheckin was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @DeleteMapping("/api/delete/squadcheckin/{squadCheckinId}")
    public ResponseEntity<String> deleteSquadCheckin(@PathVariable Integer squadCheckinId) {
        try {
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
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: squadCheckinId was null.");
            return new ResponseEntity<>("FAILED", HttpStatus.BAD_REQUEST);
        } 
    }

    private SquadCheckinObject createSquadCheckinObject(SquadCheckin squadCheckin) {
        SquadCheckinObject squadCheckinObject = new SquadCheckinObject(
            squadCheckin.getSquadCheckinId(), 
            squadCheckin.getPointOfTime(),
            squadCheckin.getPosition(), 
            (squadCheckin.getGame() != null) ? squadCheckin.getGame().getGameId() : null, 
            (squadCheckin.getSquad() != null) ? squadCheckin.getSquad().getSquadId() : null,
            (squadCheckin.getSquadMember() != null) ? squadCheckin.getSquadMember().getSquadMemberId() : null 
        );
        return squadCheckinObject;
    }
}
