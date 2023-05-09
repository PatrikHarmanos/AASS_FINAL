export interface Week {
  id: string;
  available_from: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  task_records_count: number;
  tasks_completed_count: number;
  name: string;
  tasks: Array<Task>;
  course_id: string;
}

export interface Task {
  id: string;
  schema_path: string;
  is_template: boolean;
  ended_at: string;
  task_schedule_id: string;
  task_result: Array<any>;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  course_id: string;
  name: string;
  description: string;
  hint: string;
  status: string;
}
