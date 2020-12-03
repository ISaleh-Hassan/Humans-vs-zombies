package experis.humansvszombies.hvz.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import experis.humansvszombies.hvz.models.tables.SquadCheckin;

public interface SquadCheckinRepository extends JpaRepository<SquadCheckin, Integer> {
    
}
