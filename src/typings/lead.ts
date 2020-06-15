import { Links, EntityCustomField, Embedded } from './common';

export interface Lead {
  id?: number;
  name?: string;
  price?: number;
  responsible_user_id?: number;
  group_id: number;
  status_id?: number;
  pipeline_id?: number;
  loss_reason_id?: number;
  source_id?: any;
  created_by?: number;
  updated_by?: number;
  created_at?: number;
  updated_at?: number;
  closed_at?: number;
  closest_task_at?: any;
  is_deleted?: boolean;
  custom_fields_values?: EntityCustomField[];
  score?: any;
  account_id?: number;
  _links?: Links;
  _embedded?: Embedded;
}