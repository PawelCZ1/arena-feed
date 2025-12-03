import { supabase } from '../supabase';

export type TournamentRow = {
    id: number;
    name?: string;
    owner_id?: string | null;
    description?: string;
    location?: string;
    date?: string;
    created_at?: string;
    state?: string;
};

export type Page<T> = { items: T[]; count: number };

const TABLE = 'tournaments' as const;

export async function getTournaments(params?: {
    limit?: number;
    offset?: number;
    ownerId?: number;
    search?: string;
    orderBy?: keyof TournamentRow;
    asc?: boolean;
}): Promise<Page<TournamentRow>> {
    const limit = params?.limit ?? 20;
    const offset = params?.offset ?? 0;
    const orderBy = (params?.orderBy as string) ?? 'created_at';
    const asc = params?.asc ?? false;

    let q = supabase.from(TABLE).select('*', { count: 'exact' });

    if (params?.ownerId !== undefined) q = q.eq('owner_id', params.ownerId);
    if (params?.search) q = q.ilike('name', `%${params.search}%`);

    q = q.order(orderBy, { ascending: asc }).range(offset, offset + limit - 1);

    const { data, error, count } = await q.returns<TournamentRow[]>();
    if (error) throw error;
    return { items: data ?? [], count: count ?? 0 };
}

export async function getTournamentById(id: number): Promise<TournamentRow | null> {
    const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
    if (error) throw error;
    return (data as TournamentRow) ?? null;
}

export type InsertTournament = Omit<TournamentRow, 'id' | 'created_at'>;
export async function createTournament(payload: InsertTournament): Promise<TournamentRow> {
    const { data, error } = await supabase.from(TABLE).insert(payload).select().single();
    if (error) throw error;
    return data as TournamentRow;
}

export type UpdateTournament = Partial<Omit<TournamentRow, 'id' | 'created_at'>>;
export async function updateTournament(id: number, patch: UpdateTournament): Promise<TournamentRow> {
    const { data, error } = await supabase.from(TABLE).update(patch).eq('id', id).select().single();
    if (error) throw error;
    return data as TournamentRow;
}

export async function deleteTournament(id: number): Promise<void> {
    const { error } = await supabase.from(TABLE).delete().eq('id', id);
    if (error) throw error;
}