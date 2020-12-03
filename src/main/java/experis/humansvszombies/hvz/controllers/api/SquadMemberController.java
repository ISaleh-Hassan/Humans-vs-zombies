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
import experis.humansvszombies.hvz.models.tables.Player;
import experis.humansvszombies.hvz.models.tables.Squad;
import experis.humansvszombies.hvz.models.tables.SquadMember;
import experis.humansvszombies.hvz.repositories.SquadMemberRepository;



@RestController
public class SquadMemberController {
    @Autowired
    SquadMemberRepository squadMemberRepository;

    @GetMapping("/api/fetch/squadmember/all")
    public ResponseEntity<ArrayList<SquadMember>> getAllUsers() {
        ArrayList<SquadMember> squadMembers = (ArrayList<SquadMember>)squadMemberRepository.findAll();
        System.out.println("Fetched all squad members");
        return new ResponseEntity<>(squadMembers, HttpStatus.OK);
    }

    @PostMapping("/api/create/squadmember/{gameId}/{squadId}/{playerId}")
    public ResponseEntity<SquadMember> addSquadMember(@RequestBody SquadMember newSquadMember, @PathVariable Integer gameId,
        @PathVariable Integer squadId, @PathVariable Integer playerId) {
            HttpStatus response = HttpStatus.CREATED;
            newSquadMember.setGame(new Game(gameId));
            newSquadMember.setSquad(new Squad(squadId));
            newSquadMember.setPlayer(new Player(playerId));
            squadMemberRepository.save(newSquadMember);
            System.out.println("SquadMember CREATED with id: " + newSquadMember.getSquadMemberId());
            return new ResponseEntity<>(newSquadMember, response);
    }

    @DeleteMapping("/api/delete/squadmember/{squadMemberId}")
    public ResponseEntity<String> deleteSquadMember(@PathVariable Integer squadMemberId) {
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
    }
}
