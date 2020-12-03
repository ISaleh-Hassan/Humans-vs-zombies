package experis.humansvszombies.hvz.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import experis.humansvszombies.hvz.models.tables.Game;

public interface GameRepository extends JpaRepository<Game, Integer> {
    
}
