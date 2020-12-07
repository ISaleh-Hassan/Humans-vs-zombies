package experis.humansvszombies.hvz.controllers.api;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Mission;
import experis.humansvszombies.hvz.repositories.MissionRepository;



@RestController
public class MissionController {
    @Autowired
    MissionRepository missionRepository;

    @CrossOrigin
    @GetMapping("/api/fetch/mission/all")
    public ResponseEntity<ArrayList<Mission>> getAllMissions() {
        ArrayList<Mission> missions = (ArrayList<Mission>)missionRepository.findAll();
        System.out.println("Fetched all missions");
        return new ResponseEntity<>(missions, HttpStatus.OK);
    }

    @CrossOrigin()
    @GetMapping("/api/fetch/mission/{missionId}")
    public ResponseEntity<Mission> getMissionById(@PathVariable Integer missionId) {
        try {
            return missionRepository.findById(missionId)
                    .map(mission -> new ResponseEntity<>(mission, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>((Mission) null, HttpStatus.NOT_FOUND));
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id was null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin
    @PostMapping("/api/create/mission/{gameId}")
    public ResponseEntity<Mission> addMission(@RequestBody Mission newMission, @PathVariable Integer gameId) {
            HttpStatus response = HttpStatus.CREATED;
            newMission.setGame(new Game(gameId));
            missionRepository.save(newMission);
            System.out.println("Mission CREATED with id: " + newMission.getMissionId() + " belongs to game with id: " + gameId);
            return new ResponseEntity<>(newMission, response);
    }

    @CrossOrigin()
    @PatchMapping("/api/update/mission/{missionId}")
    public ResponseEntity<Mission> updateMission(@RequestBody Mission newMission, @PathVariable Integer missionId) {
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
                if (newMission.getGame() != null) {
                    mission.setGame(newMission.getGame());
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
            return new ResponseEntity<>(mission, response);
        } catch (IllegalArgumentException e) {
            System.out.println("Exception thrown: id or mission was null.");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/api/delete/mission/{missionId}")
    public ResponseEntity<String> deleteMission(@PathVariable Integer missionId) {
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
    }
}
