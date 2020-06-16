import { Links } from './common';

export interface User {
  id: number;
  name: string;
  email: string;
  lang: string;
  _links: Links;
}