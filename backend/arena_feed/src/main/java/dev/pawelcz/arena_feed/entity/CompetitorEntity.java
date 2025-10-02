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
@Table(name = "competitors")
@NoArgsConstructor
@AllArgsConstructor
public class CompetitorEntity extends BaseEntity {

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @OneToMany(mappedBy = "firstCompetitor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MatchEntity> firstCompetitorMatches;

    @OneToMany(mappedBy = "secondCompetitor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MatchEntity> secondCompetitorMatches;

    @OneToMany(mappedBy = "winner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MatchResultEntity> wonMatches;

    @OneToMany(mappedBy = "loser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MatchResultEntity> lostMatches;
}
