import { Links, Embedded, CustomField } from './common';

export interface Company {
  id?: number;
  name?: string;
  responsible_user_id?: number;
  group_id?: number;
  created_by?: number;
  updated_by?: number;
  created_at?: number;
  updated_at?: number;
  closest_task_at?: any;
  custom_fields_values?: CustomField[];
  account_id?: number;
  _links: Links;
  _embedded: Embedded;
}