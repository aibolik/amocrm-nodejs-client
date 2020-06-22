import { Links, EntityType } from './common';

export interface NoteParams {
  text?: string;
  service?: string;
}

export type NoteType = 'common' | 'call_in' | 'call_out' | 'service_message' | 'message_cashier' | 'invoice_paid' | 'geolocation' | 'sms_in' | 'sms_out' | 'extended_service_message';

// TODO: to implement conditional types
// https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/
export interface Note {
  id?: number;
  note_type: NoteType;
  entity_id: number;
  entity_type?: EntityType;
  created_by?: number;
  updated_by?: number;
  created_at?: number;
  updated_at?: number;
  responsible_user_id?: number;
  group_id?: number;
  params: NoteParams;
  account_id?: number;
  _links?: Links;
}