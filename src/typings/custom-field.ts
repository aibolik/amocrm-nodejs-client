import { Links, EntityType } from './common';

export type CustomFieldType = '';

export type RemindType = 0 | 1 | 2 | 3 | null;

export interface CustomFieldEnum {
  id: number;
  value: string;
  sort: number;
}

export interface CustomFieldDefiniton {
  id: number;
  name: string;
  code: string;
  sort: number;
  type: CustomFieldType;
  entity_type: EntityType;
  is_api_only: boolean;
  is_predefined?: boolean;
  is_deletable?: boolean;
  is_visible?: boolean;
  is_required?: boolean;
  remind?: RemindType;
  account_id: number;
  enums?: CustomFieldEnum[];
  group_id?: null | string;
  required_statuses: any[];
  _links: Links;
}