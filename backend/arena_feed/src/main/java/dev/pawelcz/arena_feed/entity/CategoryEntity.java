package dev.pawelcz.arena_feed.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@Table(name = "categories")
@NoArgsConstructor
@AllArgsConstructor
public class CategoryEntity extends BaseEntity{
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String weightClass;
    @Column(nullable = false)
    private String ageGroup;
    @Column(nullable = false)
    private String advancementLevel;
    @Column(nullable = false)
    private String sex;
    @ManyToOne
    @JoinColumn(name = "tournament_id", nullable = false)
    private TournamentEntity tournament;
}
