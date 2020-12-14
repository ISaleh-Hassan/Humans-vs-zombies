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
import experis.humansvszombies.hvz.models.tables.Player;
import experis.humansvszombies.hvz.models.tables.Squad;
import experis.humansvszombies.hvz.models.tables.SquadMember;
import experis.humansvszombies.hvz.repositories.SquadMemberRepository;



@RestController
public class SquadMemberController {
    @Autowired
    SquadMemberRepository squadMemberRepository;

    @CrossOrigin()
    @GetMapping("/api/fetch/squadmember/all")
    public ResponseEntity<ArrayList<SquadMember>> getAllSquadMembers() {
        ArrayList<SquadMember> squadMembers = (ArrayList<SquadMember>)squadMemberRepository.findAll();
        System.out.println("Fetched all squad members");
        return new ResponseEntity<>(squadMembers, HttpStatus.OK);
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/squadmember/{squadMemberId}")
    public ResponseEntity<SquadMember> getSquadMemberById(@PathVariable Integer squadMemberId) {
        try {
            return squadMemberRepository.findById(squadMemberId)
            .map(squadMember -> new ResponseEntity<>(squadMember, HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>((SquadMember) null, HttpStatus.NOT_FOUND));
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: squadMemberId was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/squadmember/game={gameId}/squad={squadId}")
    public ResponseEntity<ArrayList<SquadMember>> getSquadMembersByGameIdAndSquadId(@PathVariable Integer gameId, @PathVariable Integer squadId) {
        try {
            HttpStatus status = HttpStatus.BAD_REQUEST;
            ArrayList<SquadMember> members = null;
            if (gameId != null && squadId != null) {
                members = squadMemberRepository.findByGameAndSquad(new Game(gameId), new Squad(squadId));
                status = HttpStatus.OK;
            }
            return new ResponseEntity<>(members, status);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: gameId was null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @PostMapping("/api/create/squadmember/{gameId}/{squadId}/{playerId}")
    public ResponseEntity<SquadMember> addSquadMember(@RequestBody SquadMember newSquadMember, @PathVariable Integer gameId,
        @PathVariable Integer squadId, @PathVariable Integer playerId) {
            try {
                if (newSquadMember != null) {
                    newSquadMember.setGame(new Game(gameId));
                    newSquadMember.setSquad(new Squad(squadId));
                    newSquadMember.setPlayer(new Player(playerId));
                    squadMemberRepository.save(newSquadMember);
                    System.out.println("SquadMember CREATED with id: " + newSquadMember.getSquadMemberId());
                    return new ResponseEntity<>(newSquadMember, HttpStatus.CREATED);
                } else {
                    System.out.println("Exception thrown: newSquadMember was null.");
                    return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
                }
            } catch (IllegalArgumentException e) {
                System.out.println("Exception thrown: newSquadMember was null.");
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
    }

    @CrossOrigin()
    @PatchMapping("/api/update/squadmember/{squadMemberId}")
    public ResponseEntity<SquadMember> updateSquadMember(@RequestBody SquadMember newSquadMember, @PathVariable Integer squadMemberId) {
        try {
            SquadMember squadMember;
            HttpStatus status;
            if (squadMemberRepository.existsById(squadMemberId)) {
                squadMember = squadMemberRepository.findById(squadMemberId).get();
                if (newSquadMember.getSquadRank() != null) {
                    squadMember.setSquadRank(newSquadMember.getSquadRank());
                }
                squadMemberRepository.save(squadMember);
                status = HttpStatus.OK;
                System.out.println("Updated SquadMember with id: " + squadMember.getSquadMemberId());
            } else {
                System.out.println("Could not find SquadMember with id: " + squadMemberId);
                squadMember = null;
                status = HttpStatus.NOT_FOUND;
            }
            return new ResponseEntity<>(squadMember, status);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: squadMemberId or newSquadMember was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @DeleteMapping("/api/delete/squadmember/{squadMemberId}")
    public ResponseEntity<String> deleteSquadMember(@PathVariable Integer squadMemberId) {
        try {
            String message = "";
            HttpStatus response;
            SquadMember squadMember = squadMemberRepository.findById(squadMemberId).orElse(null);
            if(squadMember != null) {
                squadMemberRepository.deleteById(squadMemberId);
                System.out.println("SquadMember DELETED with id: " + squadMember.getSquadMemberId());
                message = "SUCCESS";
                response = HttpStatus.OK;
            } else {
            message = "FAILED";
            response = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(message, response);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: squadMemberId was null.");
            return new ResponseEntity<>("FAILED", HttpStatus.BAD_REQUEST);
        }
    }
}
