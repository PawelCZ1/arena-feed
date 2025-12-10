import { supabase } from "@/api/supabase";

export const TABLE = 'matches' as const;

export type MatchRow = {
    id: number;
    created_at: string;
    tournament_id: number;
    category_id: number;
    first_competitor_id: string;      // FK -> competitors.id (uuid w stringu)
    second_competitor_idd: string;    // FK -> competitors.id
    first_competitor_score: number;
    second_competitor_score: number;
    state: string;
    round_number: number;
    bracket_slot: number;
    winner_competitor_id: string | null;
};

export type Match = {
    id: number;
    createdAt: string;
    tournamentId: number;
    categoryId: number;
    firstCompetitorId: string;
    secondCompetitorId: string;
    firstCompetitorScore: number;
    secondCompetitorScore: number;
    state: string;
    roundNumber: number;
    bracketSlot: number;
    winnerCompetitorId: string | null;
};

export type MatchWithCompetitors = Match & {
    firstCompetitorName: string | null;
    secondCompetitorName: string | null;
};

export const fromMatchRow = (row: MatchRow): Match => ({
    id: row.id,
    createdAt: row.created_at,
    tournamentId: row.tournament_id,
    categoryId: row.category_id,
    firstCompetitorId: row.first_competitor_id,
    secondCompetitorId: row.second_competitor_idd,
    firstCompetitorScore: row.first_competitor_score,
    secondCompetitorScore: row.second_competitor_score,
    state: row.state,
    roundNumber: row.round_number,
    bracketSlot: row.bracket_slot,
    winnerCompetitorId: row.winner_competitor_id,
});

// --- SELECTY proste ---

export const getMatchById = async (id: number): Promise<Match | null> => {
    const { data, error } = await supabase
        .from(TABLE)
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data ? fromMatchRow(data as MatchRow) : null;
};

export const listMatchesByCategory = async (
    categoryId: number,
): Promise<Match[]> => {
    const { data, error } = await supabase
        .from(TABLE)
        .select("*")
        .eq("category_id", categoryId)
        .order("round_number", { ascending: true })
        .order("bracket_slot", { ascending: true });

    if (error) {
        throw error;
    }

    return (data ?? []).map((row) => fromMatchRow(row as MatchRow));
};

// --- SELECT joinowy: matches -> competitors -> profiles ---

type MatchJoinedRow = MatchRow & {
    first_competitor: {
        profiles: {
            username: string;
            first_name: string;
            last_name: string;
        } | null;
    } | null;
    second_competitor: {
        profiles: {
            username: string;
            first_name: string;
            last_name: string;
        } | null;
    } | null;
};

export const listMatchesWithCompetitorsByCategory = async (
    categoryId: number,
): Promise<MatchWithCompetitors[]> => {
    const { data, error } = await supabase
        .from(TABLE)
        .select(
            `
            *,
            first_competitor:first_competitor_id (
                profiles (
                    username,
                    first_name,
                    last_name
                )
            ),
            second_competitor:second_competitor_idd (
                profiles (
                    username,
                    first_name,
                    last_name
                )
            )
        `,
        )
        .eq("category_id", categoryId)
        .order("round_number", { ascending: true })
        .order("bracket_slot", { ascending: true });

    if (error) {
        throw error;
    }

    const rows = (data ?? []) as MatchJoinedRow[];

    return rows.map((row) => {
        const base = fromMatchRow(row);

        const firstProfile = row.first_competitor?.profiles ?? null;
        const secondProfile = row.second_competitor?.profiles ?? null;

        const firstName =
            firstProfile
                ? `${firstProfile.first_name} ${firstProfile.last_name}`
                : null;
        const secondName =
            secondProfile
                ? `${secondProfile.first_name} ${secondProfile.last_name}`
                : null;

        return {
            ...base,
            firstCompetitorName: firstName,
            secondCompetitorName: secondName,
        };
    });
};

export type GetMatchesForCategoryRow = {
    first_competitor_score: number;
    second_competitor_score: number;
    first_competitor_name: string | null;
    second_competitor_name: string | null;
};

// surowy wynik funkcji (tylko punkty + imiona/nazwiska)
export const getMatchesForCategoryViaRpc = async (
    categoryId: number,
): Promise<GetMatchesForCategoryRow[]> => {
    const { data, error } = await supabase.rpc(
        "get_matches_for_category",
        { p_category_id: categoryId },
    );

    if (error) {
        throw error;
    }
    return (data ?? []) as GetMatchesForCategoryRow[];
};


export type MatchScoreWithNamesDto = {
    firstCompetitorScore: number;
    secondCompetitorScore: number;
    firstCompetitorName: string | null;
    secondCompetitorName: string | null;
};

export const mapGetMatchesForCategoryToDto = (
    rows: GetMatchesForCategoryRow[],
): MatchScoreWithNamesDto[] => {
    return rows.map((row) => ({
        firstCompetitorScore: row.first_competitor_score,
        secondCompetitorScore: row.second_competitor_score,
        firstCompetitorName: row.first_competitor_name,
        secondCompetitorName: row.second_competitor_name,
    }));
};

export const listMatchScoresWithNamesByCategoryViaRpc = async (
    categoryId: number,
): Promise<MatchScoreWithNamesDto[]> => {
    const rows = await getMatchesForCategoryViaRpc(categoryId);
    return mapGetMatchesForCategoryToDto(rows);
};

