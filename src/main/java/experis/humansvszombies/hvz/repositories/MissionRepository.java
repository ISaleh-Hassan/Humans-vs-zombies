package experis.humansvszombies.hvz.repositories;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Mission;

public interface MissionRepository extends JpaRepository<Mission, Integer> {
    ArrayList<Mission> findByGame(Game game);
}
