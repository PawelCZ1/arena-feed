import {supabase} from "@/api/supabase";

export type Category = {
    id: string;
    name: string;
    tournament_id: string;
}

const TABLE = "tournament_categories" as const;

export async function getCategoriesByTournamentId(tournamentId: string): Promise<Category[]> {
    const { data, error } = await supabase
        .from(TABLE)
        .select("*")
        .eq("tournament_id", tournamentId);
    if (error) throw error;
    return data as Category[];
}

export async function createCategory(payload: Omit<Category, "id">): Promise<Category> {
    const { data, error } = await supabase
        .from(TABLE)
        .insert(payload)
        .select()
        .single();
    if (error) throw error;
    return data as Category;
}

export async function deleteCategory(id: string): Promise<void> {
    const { error } = await supabase
        .from(TABLE)
        .delete()
        .eq("id", id);
    if (error) throw error;
}