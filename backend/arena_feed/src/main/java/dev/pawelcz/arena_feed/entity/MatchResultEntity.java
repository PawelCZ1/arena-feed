package dev.pawelcz.arena_feed.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@Table(name = "match_results")
@NoArgsConstructor
@AllArgsConstructor
public class MatchResultEntity extends BaseEntity{

    @OneToOne
    @JoinColumn(name = "match_id", nullable = false)
    private MatchEntity match;

    @ManyToOne
    @JoinColumn(name = "winner_id", nullable = false)
    private CompetitorEntity winner;

    @ManyToOne
    @JoinColumn(name = "loser_id", nullable = false)
    private CompetitorEntity loser;

    @Column
    private String description;
}
