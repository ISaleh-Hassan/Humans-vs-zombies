package experis.humansvszombies.hvz.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import experis.humansvszombies.hvz.models.tables.Player;

public interface PlayerRepository extends JpaRepository<Player, Integer> {
    
}
