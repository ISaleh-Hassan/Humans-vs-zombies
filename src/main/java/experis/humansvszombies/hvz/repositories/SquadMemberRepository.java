package experis.humansvszombies.hvz.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import experis.humansvszombies.hvz.models.tables.SquadMember;

public interface SquadMemberRepository extends JpaRepository<SquadMember, Integer> {
    
}
