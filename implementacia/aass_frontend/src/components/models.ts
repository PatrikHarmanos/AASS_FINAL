export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  is_ais_login: boolean;
  courses: Array<Course>;
  permissions: Array<string>;
}

export interface Course {
  id: string;
  name: string;
  name_en: string;
  description: string;
  description_en: string;
  start_at: string;
  end_at: string;
  created_at: string;
  updated_at: string;
  seminars: Array<Seminar>;
}

export interface Seminar {
  id: string;
  name: string;
  name_en: string;
  start_at: string;
  created_at: string;
  updated_at: string;
  course: Course;
}

export interface Week {
  id: number;
  course: string;
  week: number;
  description: string;
  tasks?: Task[];
  task_records_count: number;
  tasks_completed_count: number;
}

export interface WeeksObject {
  data: Array<Week>;
  seminar: {
    course: {
      name: string;
    };
    name: string;
    id: string;
  };
}

export interface Task {
  id: number;
  course: string;
  week: number;
  title: string;
  description: string;
  scheme: string;
}

export interface Database {
  id: string;
  connection_name: string;
  description: string;
  schema_img: object;
  host: string;
  port: string;
  database: string;
  username: string;
}

export interface QueryResults {
  [key: number]: {
    query?: string;
    result?: any;
    status?: string;
    executionTime?: string;
    error?: string;
  };
}

export interface QueryResult {
  query?: string;
  result?: any;
  status?: string;
  executionTime?: string;
  error?: string;
}
