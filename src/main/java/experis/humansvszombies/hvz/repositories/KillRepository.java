package experis.humansvszombies.hvz.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import experis.humansvszombies.hvz.models.tables.Kill;

public interface KillRepository extends JpaRepository<Kill, Integer> {
    
}
