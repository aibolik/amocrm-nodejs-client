import { Requester } from '../helpers/requester';
import prop from 'lodash.property';
import qs from 'qs';

import { URLS, UrlGetter } from './urls';
import { Lead } from '../typings/lead';
import { Customer } from '../typings/customer';
import { Contact } from '../typings/contact';
import { Company } from '../typings/company';
import { Account } from '../typings/account';
import { User } from '../typings/user';
import { CustomFieldDefiniton } from '../typings/custom-field';
import { ListResponse, EntityType, EntityResponse } from '../typings/common';
import { Note } from '../typings/note';

interface AmoClientOptions {
  baseUrl: string;
  token: string;
}

export class AmoClient {

  _apiVersion: string;
  _baseUrl: string;
  _requester: Requester;
  token: string;

  constructor(options: AmoClientOptions) {
    const { baseUrl, token } = options;

    this._apiVersion = 'v4';
    this._baseUrl = baseUrl;
    this.token = token;
    this._requester = new Requester({ token });
  }

  _buildUrl(path: string, entityId?: string | number, apiVersion?: string | undefined) {
    const version = typeof apiVersion === 'undefined' ? this._apiVersion : apiVersion;
    const url = prop<typeof URLS, string | UrlGetter>([version, path].join('.'))(URLS);

    if (typeof url === 'string') {
      return `https://${this._baseUrl}${url}`;
    } else if (typeof url === 'function') {
      return `https://${this._baseUrl}${url(entityId)}`;
    } else {
      throw new Error(`Invalid path`);
    }
  }

  async account(query: object = {}) {
    let url = this._buildUrl('account');
    let q = qs.stringify(query);
    const account = await this._requester.get<Account>(`${url}?${q}`);

    return account;
  }

  async getLead(leadId: number, query: object = {}) {
    let url = this._buildUrl('leads');
    let q = qs.stringify(query);

    const lead = await this._requester.get<Lead>(`${url}/${leadId}?${q}`);

    return lead;
  }

  async getContact(contactId: number, query: object = {}) {
    let url = this._buildUrl('contacts');
    let q = qs.stringify(query);

    const contact = await this._requester.get<Contact>(`${url}/${contactId}?${q}`);

    return contact;
  }

  async getCompany(companyId: number, query: object = {}) {
    let url = this._buildUrl('companies');
    let q = qs.stringify(query);

    const company = await this._requester.get<Company>(`${url}/${companyId}?${q}`);

    return company;
  }

  async getUsers(query: object = {}) {
    let url = this._buildUrl('users');
    let q = qs.stringify({ limit: 250, ...query });

    const usersResponse = await this._requester.get<ListResponse<'users', User>>(`${url}?${q}`);

    return usersResponse?._embedded?.users ?? null;
  }

  async getCustomFields(entity: keyof typeof URLS['v4']['custom_fields']) {
    let url = this._buildUrl(`custom_fields.${entity}`);
    let q = qs.stringify({ limit: 250 });

    const customFieldsResponse = await this._requester.get<ListResponse<'custom_fields', CustomFieldDefiniton>>(`${url}?${q}`);

    return customFieldsResponse?._embedded?.custom_fields ?? null;
  }

  // TODO: fix types to satisfy API
  async createNotes(entityType: EntityType, entityId: number, notes: Note[]) {
    let url = this._buildUrl(`notes.${entityType}`, entityId);
    
    const response = await this._requester.post<EntityResponse<'notes', Note>>(
      url,
      notes,
    );

    return response?._embedded?.notes ?? null;
  }

  async getCustomer(customerId: number, query: object = {}) {
    let url = this._buildUrl('customers');
    let q = qs.stringify(query);

    const customer = await this._requester.get<Customer>(`${url}/${customerId}?${q}`);

    return customer;
  }
}

