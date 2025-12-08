import {supabase} from "@/api/supabase";

const TABLE = 'competitors' as const;

export type CompetitorRow = {
    user_id?: string;
    tournament_id?: string;
    category_id?: string;
};

export async function createCompetitor(payload: CompetitorRow): Promise<CompetitorRow> {
    const { data, error } = await supabase.from(TABLE).insert(payload).select().single();
    if (error) throw error;
    return data as CompetitorRow;
}

export async function getCompetitorsByTournamentId(tournamentId: string): Promise<CompetitorRow[]> {
    const { data, error } = await supabase.from(TABLE).select('*').eq('tournament_id', tournamentId);
    if (error) throw error;
    return data as CompetitorRow[];
}

export async function getCompetitorsByUserId(userId: string): Promise<CompetitorRow[]> {
    const { data, error } = await supabase.from(TABLE).select('*').eq('user_id', userId);
    if (error) throw error;
    return data as CompetitorRow[];
}