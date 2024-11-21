export type TodoTypes = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  is_completed: boolean;
  due_date: Date;
  user_id: string;
  project_id?: string | null;
};

export type Todos = TodoTypes[];
