package experis.humansvszombies.hvz.repositories;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Kill;

public interface KillRepository extends JpaRepository<Kill, Integer> {
    ArrayList<Kill> findByGame(Game game);
}
