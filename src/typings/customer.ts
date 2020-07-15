import { EntityCustomField, Links, Embedded } from './common';

export interface Customer {
  id?: number;
  name?: string;
  next_price?: number;
  next_date?: number;
  responsible_user_id?: number;
  status_id?: number;
  periodicity?: number;
  created_by?: number;
  updated_by?: number;
  created_at?: number;
  updated_at?: number;
  closest_task_at?: any;
  is_deleted?: boolean;
  custom_fields_values: EntityCustomField[];
  ltv?: any;
  purchases_count?: any;
  average_check?: any;
  account_id: number;
  _links: Links;
  _embedded: Embedded;
}