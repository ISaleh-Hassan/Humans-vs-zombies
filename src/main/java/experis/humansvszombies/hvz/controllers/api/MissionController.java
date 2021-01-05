package experis.humansvszombies.hvz.controllers.api;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import experis.humansvszombies.hvz.models.datastructures.MissionObject;
import experis.humansvszombies.hvz.models.enums.Faction;
import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Mission;
import experis.humansvszombies.hvz.models.tables.Player;
import experis.humansvszombies.hvz.models.tables.UserAccount;
import experis.humansvszombies.hvz.repositories.MissionRepository;
import experis.humansvszombies.hvz.repositories.PlayerRepository;
import experis.humansvszombies.hvz.repositories.UserAccountRepository;
import experis.humansvszombies.hvz.security.services.UserDetailsImpl;



@RestController
public class MissionController {
    @Autowired
    MissionRepository missionRepository;

    @Autowired
    UserAccountRepository userRepository;

    @Autowired
    PlayerRepository playerRepository;

    @CrossOrigin
    @GetMapping("/api/fetch/mission/all")
    @PreAuthorize("hasAuthority('ADMINISTRATOR') or hasAuthority('PLAYER')")
    public ResponseEntity<ArrayList<MissionObject>> getAllMissions() {
        ArrayList<Mission> missions = (ArrayList<Mission>)missionRepository.findAll();
        ArrayList<MissionObject> returnMissions = new ArrayList<MissionObject>();
        for (Mission mission : missions) {
            returnMissions.add(this.createMissionObject(mission));
        }
        System.out.println("Fetched all missions");
        return new ResponseEntity<>(returnMissions, HttpStatus.OK);
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/mission/{missionId}")
    @PreAuthorize("hasAuthority('ADMINISTRATOR') or hasAuthority('PLAYER')")
    public ResponseEntity<MissionObject> getMissionById(@PathVariable Integer missionId) {
        try {
            return missionRepository.findById(missionId)
                    .map(mission -> new ResponseEntity<>(this.createMissionObject(mission), HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>((MissionObject) null, HttpStatus.NOT_FOUND));
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id was null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println("Exception thrown: Something unexpected went wrong when fetching Mission based on id.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/mission/game={gameId}")
    @PreAuthorize("hasAuthority('ADMINISTRATOR') or hasAuthority('PLAYER')")
    public ResponseEntity<ArrayList<MissionObject>> getMissionByGameAndFaction(@PathVariable Integer gameId) {
        try {
            if (gameId == null) {
                System.out.println("ERROR: gameId was null when trying to fetch missions based on gameId and faction");
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl userDetails = (UserDetailsImpl)authentication.getPrincipal();
            Player player = playerRepository.findDistinctByGameAndUserAccount(new Game(gameId), new UserAccount(userDetails.getId()));
            if (player == null) {
                System.out.println("ERROR: player was null when trying to fetch missions based on gameId and faction");
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            ArrayList<MissionObject> missionObjects = null;
            ArrayList<Mission> missions = missionRepository.findByGame(new Game(gameId));
            if (missions.size() > 0) {
                missionObjects = new ArrayList<MissionObject>();
                for (Mission mission : missions) {
                    if (mission.getFactionVisibility() == Faction.ALL || mission.getFactionVisibility() == player.getFaction()) {
                        MissionObject m = this.createMissionObject(mission);
                        missionObjects.add(m);
                    }
                }
            }
            return new ResponseEntity<>(missionObjects, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: gameId was null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println("Exception thrown: Something unexpected went wrong when fetching Missions based on gameId.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    } 

    @CrossOrigin
    @PostMapping("/api/create/mission/{gameId}")
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    public ResponseEntity<MissionObject> addMission(@RequestBody Mission newMission, @PathVariable Integer gameId) {
        try {
            HttpStatus response = HttpStatus.CREATED;
            newMission.setGame(new Game(gameId));
            missionRepository.save(newMission);
            System.out.println("Mission CREATED with id: " + newMission.getMissionId() + " belongs to game with id: " + gameId);
            return new ResponseEntity<>(this.createMissionObject(newMission), response);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: newMission was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println("Exception thrown: Something unexpected went wrong when creating a new Mission.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @PatchMapping("/api/update/mission/{missionId}")
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    public ResponseEntity<MissionObject> updateMission(@RequestBody Mission newMission, @PathVariable Integer missionId) {
        try {
            Mission mission;
            HttpStatus response;
            if (missionRepository.existsById(missionId)) {
                mission = missionRepository.findById(missionId).get();

                if (newMission.getFactionVisibility() != null) {
                    mission.setFactionVisibility(newMission.getFactionVisibility());
                }
                if (newMission.getStartTime() != null) {
                    mission.setStartTime(newMission.getStartTime());
                }
                if (newMission.getEndTime() != null) {
                    mission.setEndTime(newMission.getEndTime());
                }
                if (newMission.getName()!= null) {
                    mission.setName(newMission.getName());
                }
                if (newMission.getState() != null) {
                    mission.setState(newMission.getState());
                }

                missionRepository.save(mission);
                response = HttpStatus.OK;
                System.out.println("Updated mission with id: " + mission.getMissionId());
            } else {
                System.out.println("Could not find mission with id: " + missionId);
                mission = null;
                response = HttpStatus.NOT_FOUND;
            }
            return new ResponseEntity<>(this.createMissionObject(mission), response);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id or mission was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println("Exception thrown: Something unexpected went wrong when updating a Mission.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin()
    @DeleteMapping("/api/delete/mission/{missionId}")
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    public ResponseEntity<String> deleteMission(@PathVariable Integer missionId) {
        try {
            String message = "";
            HttpStatus response;
            Mission mission = missionRepository.findById(missionId).orElse(null);
            if(mission != null) {
                missionRepository.deleteById(missionId);
                System.out.println("Mission DELETED with id: " + mission.getMissionId());
                message = "SUCCESS";
                response = HttpStatus.OK;
            } else {
                message = "FAILED";
                response = HttpStatus.NOT_FOUND;
            }
            return new ResponseEntity<>(message, response);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: missionId was null.");
            return new ResponseEntity<>("FAILED", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println("Exception thrown: Something unexpected went wrong when deleting a Mission.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    private MissionObject createMissionObject(Mission mission) {
        MissionObject missionObject = new MissionObject(
            mission.getMissionId(),
            mission.getName(),
            mission.getFactionVisibility(),
            mission.getState(),
            mission.getStartTime(),
            mission.getEndTime(),
            (mission.getGame() != null) ? mission.getGame().getGameId() : null
        );
        return missionObject;
    }
}
