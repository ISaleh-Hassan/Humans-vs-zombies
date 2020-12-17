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

import experis.humansvszombies.hvz.models.datastructures.SquadMemberObject;
import experis.humansvszombies.hvz.models.datastructures.custom.SquadMemberDetails;
import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Player;
import experis.humansvszombies.hvz.models.tables.Squad;
import experis.humansvszombies.hvz.models.tables.SquadMember;
import experis.humansvszombies.hvz.models.tables.UserAccount;
import experis.humansvszombies.hvz.repositories.PlayerRepository;
import experis.humansvszombies.hvz.repositories.SquadMemberRepository;
import experis.humansvszombies.hvz.repositories.UserAccountRepository;



@RestController
public class SquadMemberController {
    @Autowired
    SquadMemberRepository squadMemberRepository;

    @Autowired
    PlayerRepository playerRepository;

    @Autowired
    UserAccountRepository userRepository;

    @CrossOrigin()
    @GetMapping("/api/fetch/squadmember/all")
    public ResponseEntity<ArrayList<SquadMemberObject>> getAllSquadMembers() {
        ArrayList<SquadMember> squadMembers = (ArrayList<SquadMember>)squadMemberRepository.findAll();
        ArrayList<SquadMemberObject> squadMemberObjects = new ArrayList<SquadMemberObject>();
        for (SquadMember squadMember : squadMembers) {
            squadMemberObjects.add(this.createSquadMemberObject(squadMember));            
        }
        System.out.println("Fetched all squad members");
        return new ResponseEntity<>(squadMemberObjects, HttpStatus.OK);
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/squadmember/{squadMemberId}")
    public ResponseEntity<SquadMemberObject> getSquadMemberById(@PathVariable Integer squadMemberId) {
        try {
            return squadMemberRepository.findById(squadMemberId)
            .map(squadMember -> new ResponseEntity<>(this.createSquadMemberObject(squadMember), HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>((SquadMemberObject) null, HttpStatus.NOT_FOUND));
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: squadMemberId was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/squadmember/game={gameId}/squad={squadId}")
    public ResponseEntity<ArrayList<SquadMemberObject>> getSquadMembersByGameIdAndSquadId(@PathVariable Integer gameId, @PathVariable Integer squadId) {
        try {
            HttpStatus status = HttpStatus.BAD_REQUEST;
            ArrayList<SquadMember> members = null;
            if (gameId != null && squadId != null) {
                members = squadMemberRepository.findByGameAndSquad(new Game(gameId), new Squad(squadId));
                status = HttpStatus.OK;
            }
            ArrayList<SquadMemberObject> squadMemberObjects = new ArrayList<SquadMemberObject>();
            for (SquadMember squadMember : members) {
                squadMemberObjects.add(this.createSquadMemberObject(squadMember));
            }
            return new ResponseEntity<>(squadMemberObjects, status);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: gameId was null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/squadMember/game={gameId}/player={playerId}")
    public ResponseEntity<SquadMemberObject> getSquadMemberByPlayerId(@PathVariable Integer gameId, @PathVariable Integer playerId) {
        try {
            HttpStatus status = HttpStatus.NOT_FOUND;
            SquadMemberObject squadMemberObject = null;
            if (gameId != null && playerId != null) {
                SquadMember squadMember = squadMemberRepository.findDistinctByGameAndPlayer(new Game(gameId),new Player(playerId));
                if (squadMember != null) {
                    squadMemberObject = this.createSquadMemberObject(squadMember);
                    status = HttpStatus.OK;
                } else {
                    System.out.println("ERROR: a SquadMember that belongs to a Game with id: " + gameId + " and a Player with id: " + playerId + " could not be found.");
                    status = HttpStatus.NOT_FOUND;
                }
            } else {
                System.out.println("ERROR: gameId and/or playerId was null.");
                status = HttpStatus.BAD_REQUEST;
            }       
            return new ResponseEntity<>(squadMemberObject, status);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: playerId was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/squadmember/details/game={gameId}/squad={squadId}")
    public ResponseEntity<ArrayList<SquadMemberDetails>> getSquadMemberDetailsBySquadId(@PathVariable Integer gameId, @PathVariable Integer squadId) {
        try {
            HttpStatus status = HttpStatus.BAD_REQUEST;
            ArrayList<SquadMemberDetails> detailList = null;
            if (gameId != null && squadId != null) {
                ArrayList<SquadMember> squadMembers = squadMemberRepository.findByGameAndSquad(new Game(gameId), new Squad(squadId));
                if (squadMembers != null && squadMembers.size() > 0) {
                    detailList = new ArrayList<SquadMemberDetails>();
                    status = HttpStatus.OK;
                    for (SquadMember squadMember : squadMembers) {
                        Player playerObject = playerRepository.findById(squadMember.getPlayer().getPlayerId()).orElse(null);
                        if (playerObject != null) {
                            UserAccount userObject = userRepository.findById(playerObject.getUserAccount().getUserAccountId()).orElse(null);
                            if (userObject != null) {
                                SquadMemberDetails details = new SquadMemberDetails();
                                details.setUsername(userObject.getUsername());
                                details.setAlive(playerObject.isAlive());
                                details.setSquadRank(squadMember.getSquadRank());
                                detailList.add(details);
                            } else {
                                System.out.println("ERROR: userObject could not be found.");
                                status = HttpStatus.NOT_FOUND;
                                break;
                            }
                        } else {
                            System.out.print("ERROR: playerObject could not be found.");
                            status = HttpStatus.NOT_FOUND;
                            break;
                        }
                    }     
                }   
            } else {
                System.out.print("ERROR: squadMemberId was null.");
            }
            return new ResponseEntity<>(detailList, status);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: squadMemberId was null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @PostMapping("/api/create/squadmember/{gameId}/{squadId}/{playerId}")
    public ResponseEntity<SquadMemberObject> addSquadMember(@RequestBody SquadMember newSquadMember, @PathVariable Integer gameId,
        @PathVariable Integer squadId, @PathVariable Integer playerId) {
            try {
                if (newSquadMember != null) {
                    newSquadMember.setGame(new Game(gameId));
                    newSquadMember.setSquad(new Squad(squadId));
                    newSquadMember.setPlayer(new Player(playerId));
                    squadMemberRepository.save(newSquadMember);
                    System.out.println("SquadMember CREATED with id: " + newSquadMember.getSquadMemberId());
                    return new ResponseEntity<>(this.createSquadMemberObject(newSquadMember), HttpStatus.CREATED);
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
    public ResponseEntity<SquadMemberObject> updateSquadMember(@RequestBody SquadMember newSquadMember, @PathVariable Integer squadMemberId) {
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
            return new ResponseEntity<>(this.createSquadMemberObject(squadMember), status);
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

    private SquadMemberObject createSquadMemberObject(SquadMember squadMember) {
        SquadMemberObject squadMemberObject = new SquadMemberObject(
            squadMember.getSquadMemberId(),
            squadMember.getSquadRank(),
            (squadMember.getGame() != null) ? squadMember.getGame().getGameId() : null,
            (squadMember.getSquad() != null) ? squadMember.getSquad().getSquadId() : null,
            (squadMember.getPlayer() != null) ? squadMember.getPlayer().getPlayerId() : null
        );
        return squadMemberObject;
    }
}
