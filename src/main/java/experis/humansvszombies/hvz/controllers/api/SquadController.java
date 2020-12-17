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

import experis.humansvszombies.hvz.models.datastructures.SquadObject;
import experis.humansvszombies.hvz.models.datastructures.custom.SquadDetails;
import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Squad;
import experis.humansvszombies.hvz.models.tables.SquadMember;
import experis.humansvszombies.hvz.repositories.SquadMemberRepository;
import experis.humansvszombies.hvz.repositories.SquadRepository;


@RestController
public class SquadController {
    @Autowired
    SquadRepository squadRepository;

    @Autowired
    SquadMemberRepository squadMemberRepository;

    @CrossOrigin()
    @GetMapping("/api/fetch/squad/all")
    public ResponseEntity<ArrayList<SquadObject>> getAllSquads() {
        ArrayList<Squad> squads = (ArrayList<Squad>)squadRepository.findAll();
        ArrayList<SquadObject> returnSquads = new ArrayList<SquadObject>();
        for (Squad squad : squads) {
            returnSquads.add(this.createSquadObject(squad));
        }
        System.out.println("Fetched all squads");
        return new ResponseEntity<>(returnSquads, HttpStatus.OK);
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/squad/{squadId}")
    public ResponseEntity<SquadObject> getSquadById(@PathVariable Integer squadId) {
        try {
            return squadRepository.findById(squadId)
            .map(squad -> new ResponseEntity<>(this.createSquadObject(squad), HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>((SquadObject) null, HttpStatus.NOT_FOUND));
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: squadId was null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/squad/game={gameId}")
    public ResponseEntity<ArrayList<SquadObject>> getSquadByGameId(@PathVariable Integer gameId) {
        try {
            HttpStatus status = HttpStatus.BAD_REQUEST;
            ArrayList<Squad> squads = new ArrayList<Squad>();
            if (gameId != null) {
                squads = squadRepository.findByGame(new Game(gameId));
                status = HttpStatus.OK;
            }
            ArrayList<SquadObject> squadObjects = new ArrayList<SquadObject>();
            for (Squad squad : squads) {
                squadObjects.add(this.createSquadObject(squad));
            }
            return new ResponseEntity<>(squadObjects, status);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: gameId was null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/squad/details/game={gameId}")
    public ResponseEntity<ArrayList<SquadDetails>> getSquadDetailsByGameId(@PathVariable Integer gameId) {
        try {
            HttpStatus status = HttpStatus.BAD_REQUEST;
            ArrayList<SquadDetails> detailList = null;
            if (gameId != null) {
                ArrayList<Squad> squads = squadRepository.findByGame(new Game(gameId));
                if (squads != null && squads.size() > 0) {
                    detailList = new ArrayList<SquadDetails>();
                    for (Squad squad : squads) {
                        ArrayList<SquadMember> members = squadMemberRepository.findByGameAndSquad(new Game(squad.getGame().getGameId()), new Squad(squad.getSquadId()));
                        SquadDetails details = new SquadDetails(
                            squad.getSquadId(),
                            squad.getName(),
                            squad.getFaction(),
                            squad.getMaxNumberOfMembers(),
                            members.size()
                        );         
                        detailList.add(details);
                    }  
                    status = HttpStatus.OK;
                } else {
                    System.out.println("Could not find any squads in Game with id: " + gameId);
                    status = HttpStatus.NOT_FOUND;
                }
            }
            return new ResponseEntity<>(detailList, status);
        } catch(IllegalArgumentException e) {
            System.out.println("Exception thrown: squadId was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @PostMapping("/api/create/squad/{gameId}")
    public ResponseEntity<SquadObject> addSquad(@RequestBody Squad newSquad, @PathVariable Integer gameId) {
        try {
            if (newSquad != null) {
                newSquad.setGame(new Game(gameId));
                squadRepository.save(newSquad);
                System.out.println("Squad CREATED with id: " + newSquad.getSquadId());
                return new ResponseEntity<>(this.createSquadObject(newSquad), HttpStatus.CREATED);
            }
            else {
                System.out.println("Exception thrown: newGame was null.");
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: newGame was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }      
    }

    @CrossOrigin()
    @PatchMapping("/api/update/squad/{squadId}")
    public ResponseEntity<SquadObject> updateSquad(@RequestBody Squad newSquad, @PathVariable Integer squadId) {
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
            return new ResponseEntity<>(this.createSquadObject(squad), status);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: squadId or newSquad was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
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

    private SquadObject createSquadObject(Squad squad) {
        SquadObject squadObject = new SquadObject(
            squad.getSquadId(),
            squad.getName(),
            squad.getFaction(),
            squad.getMaxNumberOfMembers(),
            (squad.getGame() != null) ? squad.getGame().getGameId() : null
        );
        return squadObject;
    }
}
