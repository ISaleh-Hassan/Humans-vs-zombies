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
import experis.humansvszombies.hvz.models.tables.Mission;
import experis.humansvszombies.hvz.repositories.MissionRepository;



@RestController
public class MissionController {
    @Autowired
    MissionRepository missionRepository;


    @GetMapping("/api/fetch/mission/all")
    public ResponseEntity<ArrayList<Mission>> getAllUsers() {
        ArrayList<Mission> missions = (ArrayList<Mission>)missionRepository.findAll();
        System.out.println("Fetched all missions");
        return new ResponseEntity<>(missions, HttpStatus.OK);
    }

    @PostMapping("/api/create/game/{gameId}")
    public ResponseEntity<Mission> addMission(@RequestBody Mission newMission, @PathVariable Integer gameId) {
            HttpStatus response = HttpStatus.CREATED;
            newMission.setGame(new Game(gameId));
            missionRepository.save(newMission);
            System.out.println("Mission CREATED with id: " + newMission.getMissionId() + " belongs to game with id: " + gameId);
            return new ResponseEntity<>(newMission, response);
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
