package experis.humansvszombies.hvz.repositories;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import experis.humansvszombies.hvz.models.tables.Game;
import experis.humansvszombies.hvz.models.tables.Squad;

public interface SquadRepository extends JpaRepository<Squad, Integer> {
    ArrayList<Squad> findByGame(Game game);
}
