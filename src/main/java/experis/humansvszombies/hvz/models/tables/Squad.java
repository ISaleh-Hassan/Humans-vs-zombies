package experis.humansvszombies.hvz.models.tables;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import experis.humansvszombies.hvz.models.enums.Faction;


@Entity(name="squad")
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "squadId"
)
public class Squad {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="squad_id")
    private Integer squadId;

    @Column(name="name")
    private String name;

    @Column(name="faction")
    private Faction faction;

    @Column(name="max_number_of_member")
    private int maxNumberOfMembers;

    @ManyToOne
    private Game game;

    @OneToMany(mappedBy="squad", cascade=CascadeType.ALL)
    private Collection<SquadMember> squadMembers = new ArrayList<SquadMember>();

    @OneToMany(mappedBy="squad", cascade=CascadeType.ALL)
    private Collection<SquadCheckin> squadCheckins = new ArrayList<SquadCheckin>();

    @OneToMany(mappedBy="squad", cascade=CascadeType.ALL)
    private Collection<ChatMessage> messages = new ArrayList<ChatMessage>();


    public Squad() {

    }

    public Squad(Integer squadId) {
        this.squadId = squadId;
    }

    public Squad(String name, Faction faction, int maxNumberOfMembers) {
        this.name = name;
        this.faction = faction;
        this.maxNumberOfMembers = maxNumberOfMembers;
    }

    public Integer getSquadId() {
        return squadId;
    }

    public void setSquadId(Integer squadId) {
        this.squadId = squadId;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Faction getFaction() {
        return faction;
    }

    public void setFaction(Faction faction) {
        this.faction = faction;
    }

    public int getMaxNumberOfMembers() {
        return maxNumberOfMembers;
    }

    public void setMaxNumberOfMembers(int maxNumberOfMembers) {
        this.maxNumberOfMembers = maxNumberOfMembers;
    }
}
