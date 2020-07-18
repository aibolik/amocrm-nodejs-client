export type UrlGetter = (...args: (string | number)[]) => string;

export const URLS = {
  v4: {
    account: '/api/v4/account',
    leads: '/api/v4/leads',
    contacts: '/api/v4/contacts',
    companies: '/api/v4/companies',
    users: '/api/v4/users',
    customers: '/api/v4/customers',
    custom_fields: {
      leads: '/api/v4/leads/custom_fields',
      contacts: '/api/v4/contacts/custom_fields',
      companies: '/api/v4/companies/custom_fields',
      customers: '/api/v4/customers/custom_fields',
    },
    notes: {
      leads: (leadId: number | string) => `/api/v4/leads/${leadId}/notes`,
      customers: (customerId: number | string) => `/api/v4/customers/${customerId}/notes`,
      contacts: (contactId: number | string) => `/api/v4/customers/${contactId}/notes`,
      companies: (companyId: number | string) => `/api/v4/customers/${companyId}/notes`,
    },
  },
};