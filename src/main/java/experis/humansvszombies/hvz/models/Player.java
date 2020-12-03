package experis.humansvszombies.hvz.models;


import javax.persistence.*;

@Entity
@Table(name = "Player")
public class Player {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    public Integer id;
    
    @Column
    public String name;

    public Player(){}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}