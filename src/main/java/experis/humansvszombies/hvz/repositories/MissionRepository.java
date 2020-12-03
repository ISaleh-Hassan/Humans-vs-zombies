package experis.humansvszombies.hvz.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import experis.humansvszombies.hvz.models.tables.Mission;

public interface MissionRepository extends JpaRepository<Mission, Integer> {
    
}
