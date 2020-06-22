import { User } from "./user";
import { CustomFieldType } from './custom-field';
import { Note } from "./note";

// TODO: not sure if `Notes` should also be here
export type EntityType = 'leads' | 'contacts' | 'company' | 'custom_fields' | 'users' | 'notes';

export interface Links {
  self: {
    href: string;
  };
  next?: {
    href: string;
  };
  prev?: {
    href: string;
  }
}

export interface EntityCustomField {
  field_id: number;
  field_name: string;
  field_code?: any;
  field_type: CustomFieldType;
  values: any;
}

export interface EmbeddedContact {
  id: number;
  is_main: boolean;
  _links: Links;
}

export interface DateTimeSettings {
  date_pattern: string;
  short_date_pattern: string;
  short_time_pattern: string;
  date_format: string;
  time_format: string;
  timezone: string;
  timezone_offset: string;
}

export interface Embedded {
  tags?: any;
  leads?: any;
  companies?: any;
  contacts?: EmbeddedContact[];
  datetime_settings?: DateTimeSettings;
  users?: Partial<User>[];
  notes?: Partial<Note>[];
}

export type ListResponse<K extends EntityType, T> = {
  _page?: number;
  _total_items?: number;
  _page_count?: number;
  _links: Links;
  _embedded: Record<K, T[]>;
}

export type EntityResponse<K extends EntityType, T> = {
  _links: Links;
  _embedded: Record<K, T[]>;
}