package dev.pawelcz.arena_feed.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@Table(name = "matches")
@NoArgsConstructor
@AllArgsConstructor
public class MatchEntity extends BaseEntity{

    @Column(nullable = false)
    private int matchState;

    @OneToOne(mappedBy = "match", cascade = CascadeType.ALL, orphanRemoval = true)
    private MatchResultEntity matchResult;

    @ManyToOne
    @JoinColumn(name = "first_competitor_id", nullable = false)
    private CompetitorEntity firstCompetitor;

    @ManyToOne
    @JoinColumn(name = "second_competitor_id", nullable = false)
    private CompetitorEntity secondCompetitor;

    @Column
    private int firstCompetitorScore;

    @Column
    private int secondCompetitorScore;

    @ManyToOne
    @JoinColumn(name = "tournament_id", nullable = false)
    private TournamentEntity tournament;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryEntity category;
}
