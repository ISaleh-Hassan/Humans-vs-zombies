package experis.humansvszombies.hvz.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import experis.humansvszombies.hvz.models.tables.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {
    
}
