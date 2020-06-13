export interface Links {
  self: {
    href: string;
  }
}

export interface CustomField {
  field_id: number;
  field_name: string;
  field_code?: any;
  field_type: string;
  values: any;
}

export interface EmbeddedContact {
  id: number;
  is_main: boolean;
  _links: Links;
}

export interface Embedded {
  tags?: any;
  leads?: any;
  companies?: any;
  contacts?: EmbeddedContact;
}