package experis.humansvszombies.hvz.controllers.api;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import experis.humansvszombies.hvz.models.datastructures.KillObject;
import experis.humansvszombies.hvz.models.enums.UserType;
import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Kill;
import experis.humansvszombies.hvz.models.tables.Player;
import experis.humansvszombies.hvz.models.tables.UserAccount;
import experis.humansvszombies.hvz.repositories.KillRepository;
import experis.humansvszombies.hvz.repositories.PlayerRepository;
import experis.humansvszombies.hvz.security.services.UserDetailsImpl;

@RestController
public class KillController {
    @Autowired
    KillRepository killRepository;

    @Autowired
    PlayerController playerController;

    @Autowired
    PlayerRepository playerRepository;

    @CrossOrigin()
    @GetMapping("/api/fetch/kill/all")
    @PreAuthorize("hasAuthority('ADMINISTRATOR') or hasAuthority('PLAYER')")
    public ResponseEntity<ArrayList<KillObject>> getAllKills() {
        ArrayList<Kill> kills = (ArrayList<Kill>) killRepository.findAll();
        ArrayList<KillObject> returnKills = new ArrayList<KillObject>();
        for (Kill kill : kills) {
            returnKills.add(this.createKillObject(kill));
        }
        System.out.println("Fetched all kills");
        return new ResponseEntity<>(returnKills, HttpStatus.OK);
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/kill/{killId}")
    @PreAuthorize("hasAuthority('ADMINISTRATOR') or hasAuthority('PLAYER')")
    public ResponseEntity<KillObject> getKillById(@PathVariable Integer killId) {
        try {
            return killRepository.findById(killId)
                    .map(kill -> new ResponseEntity<>(this.createKillObject(kill), HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>((KillObject) null, HttpStatus.NOT_FOUND));
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id was null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println("Exception thrown: Something went wrong when fetching Kill based on killId");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/kill/game={gameId}")
    @PreAuthorize("hasAuthority('ADMINISTRATOR') or hasAuthority('PLAYER')")
    public ResponseEntity<ArrayList<KillObject>> getKillsByGame(@PathVariable Integer gameId) {
        try {
            if (gameId == null) {
                System.out.println("ERROR: gameId was null when fetching kills from game.");
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            ArrayList<KillObject> k = null;
            ArrayList<Kill> kills = killRepository.findByGame(new Game(gameId));
            if (kills.size() > 0) {
                k = new ArrayList<KillObject>();
                for (Kill kill : kills) {
                    KillObject killObject = this.createKillObject(kill);
                    k.add(killObject);
                }
            }
            return new ResponseEntity<>(k, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: gameId was null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println("Exception thrown: Something went wrong when fetching Kills based on gameId");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @PostMapping("/api/create/kill/{gameId}/{killerId}/{victimId}")
    @PreAuthorize("hasAuthority('ADMINISTRATOR') or hasAuthority('PLAYER')")
    public ResponseEntity<KillObject> addKill(@RequestBody Kill newKill, @PathVariable Integer gameId,
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
            return new ResponseEntity<>(this.createKillObject(newKill), response);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: newKill was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println("Exception thrown: Something went wrong when creating a new Kill.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @PatchMapping("/api/update/kill/{killId}")
    @PreAuthorize("hasAuthority('ADMINISTRATOR') or hasAuthority('PLAYER')")
    public ResponseEntity<KillObject> updateKill(@RequestBody Kill newKill, @PathVariable Integer killId) {
        try {
            HttpStatus response;
            Kill kill = null;
            if (killRepository.existsById(killId)) {
                kill = killRepository.findById(killId).get();
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                String auth = authentication.getAuthorities().toString();
                if (auth.contains("PLAYER")) {
                    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
                    Player player = playerRepository.findDistinctByGameAndUserAccount(new Game(kill.getGame().getGameId()),
                            new UserAccount(userDetails.getId()));
                    if (player != null) {
                        if (player.getPlayerId() != kill.getKiller().getPlayerId()) {
                            System.out.println("ERROR: player was not the Killer or Admin when trying to update Kill object.");
                            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
                        }
                    } else {
                        System.out.println("ERROR: player was null when trying to update Kill as a player.");
                        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
                    }
                }
                if (newKill.getPosition() != null) {
                    kill.setPosition(newKill.getPosition());
                }
                if (newKill.getTimeOfDeath() != null) {
                    kill.setTimeOfDeath(newKill.getTimeOfDeath());
                }
                if (newKill.getDescription() != null) {
                    kill.setDescription(newKill.getDescription());
                }
                killRepository.save(kill);
                response = HttpStatus.OK;
                System.out.println("Updated kill with id: " + kill.getKillId());
            } else {
                System.out.println("Could not find kill with id: " + killId);
                kill = null;
                response = HttpStatus.NOT_FOUND;
            }
            return new ResponseEntity<>(this.createKillObject(kill), response);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id or kill was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println("Exception thrown: Something unexpected went wrong when updating a Kill.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @DeleteMapping("/api/delete/kill/{killId}")
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    public ResponseEntity<String> deleteKill(@PathVariable Integer killId) {
        try {
            String message = "";
            HttpStatus response;
            Kill kill = killRepository.findById(killId).orElse(null);
            if (kill != null) {
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
        } catch (Exception e) {
            System.out.println("Exception thrown: Something unexpected went wrong when deleting a Kill.");
            return new ResponseEntity<>("FAILED", HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @PostMapping("/api/v2/create/kill")
    @PreAuthorize("hasAuthority('ADMINISTRATOR') or hasAuthority('PLAYER')")
    public ResponseEntity<KillObject> addKillVersion2(@RequestBody KillObject newKill) {
        try {
            HttpStatus status = HttpStatus.CREATED;
            Kill kill = new Kill();
            if (newKill != null) {
                if (playerController.checkBiteCode(newKill.getVictimId(), newKill.getBiteCode()).getBody()) {
                    kill.setGame(new Game(newKill.getGameId()));
                    kill.setKiller(new Player(newKill.getKillerId()));
                    kill.setVictim(new Player(newKill.getVictimId()));
                    kill.setPosition(newKill.getPosition());
                    kill.setTimeOfDeath(newKill.getTimeOfDeath());
                    killRepository.save(kill);
                    System.out.println("Kill CREATED with id: " + kill.getKillId());
                } else {
                    System.out.println("BiteCode did not match with victims BiteCode.");
                    status = HttpStatus.BAD_REQUEST;
                }
            } else {
                System.out.println("Error: newKill was null.");
                status = HttpStatus.BAD_REQUEST;
            }
            return new ResponseEntity<>(this.createKillObject(kill), status);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: newKill was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println("Exception thrown: Something unexpected went wrong when creating a new Kill.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    private KillObject createKillObject(Kill kill) {
        KillObject returnObject = new KillObject(kill.getKillId(), kill.getTimeOfDeath(), kill.getPosition(),
                (kill.getGame() != null) ? kill.getGame().getGameId() : null,
                (kill.getKiller() != null) ? kill.getKiller().getPlayerId() : null,
                (kill.getVictim() != null) ? kill.getVictim().getPlayerId() : null, null, kill.getDescription());
        return returnObject;
    }
}
