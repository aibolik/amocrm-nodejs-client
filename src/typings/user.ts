import { Links } from './common';

/**
 * https://www.amocrm.ru/developers/content/crm_platform/users-api
 */
export type AccessType = 'A' | 'D' | 'M' | 'G';

interface EntityRights {
  view: AccessType;
  edit: AccessType;
  add: AccessType;
  delete: AccessType;
  export: AccessType;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  lang: string;
  rights?: {
    leads: Partial<EntityRights>;
    contacts: Partial<EntityRights>;
    companies: Partial<EntityRights>;
    tasks: Partial<EntityRights>;
    mail_access: boolean;
    catalog_access: boolean;
    status_rights: any[];
    is_admin: boolean;
    is_free: boolean;
    is_active: boolean;
    group_id: null | number;
    role_id: null | number;
  }
  _links: Links;
}