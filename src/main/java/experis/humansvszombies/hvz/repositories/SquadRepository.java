package experis.humansvszombies.hvz.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import experis.humansvszombies.hvz.models.tables.Squad;

public interface SquadRepository extends JpaRepository<Squad, Integer> {
    
}
