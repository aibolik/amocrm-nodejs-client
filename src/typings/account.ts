import { Links, Embedded } from './common';

type CustomerMode = 'unavailable' | 'disabled' | 'segments' | 'dynamic' | 'periodicity';

/** 1 - Name, Surname | 2 - Surname, Name */
type ContactNameDisplayOrder = 1 | 2;

export interface Account {
  id: number;
  name: string;
  subdomain: string;
  created_at: number;
  created_by: number;
  updated_at: number;
  updated_by: number;
  current_user_id: number;
  country: string;
  customers_mode: CustomerMode;
  is_unsorted_on: boolean;
  mobile_feature_version: number;
  is_loss_reason_enabled: boolean;
  is_helpbot_enabled: boolean;
  is_technical_account: boolean;
  contact_name_display_order: ContactNameDisplayOrder;
  version: number;
  _links: Links;
  _embedded: Embedded;
}