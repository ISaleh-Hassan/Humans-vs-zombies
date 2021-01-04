package experis.humansvszombies.hvz.controllers.api;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import experis.humansvszombies.hvz.models.datastructures.MissionObject;
import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Mission;
import experis.humansvszombies.hvz.repositories.MissionRepository;



@RestController
public class MissionController {
    @Autowired
    MissionRepository missionRepository;

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

                if (newMission.getMissionDescription() != null) {
                    mission.setMissionDescription(newMission.getMissionDescription());
                }
                if (newMission.getFactionVisibility() != null) {
                    mission.setFactionVisibility(newMission.getFactionVisibility());
                }
                if (newMission.getMissionPoint() != null) {
                    mission.setMissionPoint(newMission.getMissionPoint());
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
            mission.getMissionDescription(),
            mission.getFactionVisibility(),
            mission.getMissionPoint(),
            mission.getStartTime(),
            mission.getEndTime(),
            (mission.getGame() != null) ? mission.getGame().getGameId() : null
        );
        return missionObject;
    }
}
