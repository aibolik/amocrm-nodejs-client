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

export interface DateTimeSettings {
  date_pattern: string;
  short_date_pattern: string;
  short_time_pattern: string;
  date_formant: string;
  time_format: string;
  timezone: string;
  timezone_offset: string;
}

export interface Embedded {
  tags?: any;
  leads?: any;
  companies?: any;
  contacts?: EmbeddedContact;
  datetime_settings?: DateTimeSettings;
}