import { Requester } from '../helpers/requester';
import prop from 'lodash.property';
import qs from 'qs';

import { URLS } from './urls';

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

  _buildUrl(path: string, apiVersion?: string | undefined) {
    const version = typeof apiVersion === 'undefined' ? this._apiVersion : apiVersion;
    const url = prop<typeof URLS, string>([version, path].join('.'))(URLS);

    return `https://${this._baseUrl}${url}`;
  }

  async account(query: object = {}) {
    let url = this._buildUrl('account');
    let q = qs.stringify(query);
    const account = await this._requester.get(`${url}?${q}`);

    return account;
  }
}