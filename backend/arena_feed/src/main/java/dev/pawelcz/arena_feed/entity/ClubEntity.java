package dev.pawelcz.arena_feed.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@Table(name = "clubs")
@NoArgsConstructor
@AllArgsConstructor
public class ClubEntity extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String name;
    @Column
    private String description;
    @Column
    private String city;
    @Column
    private String country;
    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private UserEntity owner;
    @OneToMany(mappedBy = "club", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserEntity> members;
}
