import { Account } from 'src/typings/account';
import { AmoClient } from '../';

function assertAccount(account: Account) {
  expect(account.id).toBeDefined();
  expect(account.name).toBeDefined();
  expect(account.subdomain).toBeDefined();
  expect(account.id).not.toBeNull();
  expect(account.name).not.toBeNull();
  expect(account.subdomain).not.toBeNull();
}
describe('AmoClient E2E Tests', () => {
  // e.g. amoprocrmtgv2.amocrm.ru
  const baseUrl = process.env.AMO_CRM_BASE_URL;
  const token = process.env.AMO_CRM_TOKEN;
  let client: AmoClient;

  beforeEach(async () => {
    client = new AmoClient({ baseUrl, token });
    // Add 1 second delay between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  it('should be able to handle 7+ parallel requests', async () => {
    const promises = [];
    for (let i = 0; i < 10; i++) {
      promises.push(client.account());
    }
    const accounts = await Promise.all(promises);
    accounts.forEach(assertAccount);
  }, 10000);

  describe('Account', () => {
    it('should fetch account info', async () => {
      const account = await client.account();

      assertAccount(account);
    });

    it('should fetch account with date time settings', async () => {
      const account = await client.account({ with: 'datetime_settings' });
      expect(account._embedded.datetime_settings).toBeDefined();
    });

    it('should fetch account with users_groups', async () => {
      const account = await client.account({ with: 'users_groups' });
      expect(account._embedded.users_groups).toBeDefined();
    });
  });


  // describe('Leads', () => {
  //   it('should fetch lead by id', async () => {
  //     const leadId = 123;
  //     const lead = await client.getLead(leadId);
  //     expect(lead).toBeDefined();
  //   });

  //   it('should fetch lead with contacts', async () => {
  //     const leadId = 123;
  //     const lead = await client.getLead(leadId, { with: 'contacts' });
  //     expect(lead).toBeDefined();
  //     expect(lead._embedded?.contacts).toBeDefined();
  //   });
  // });

  // describe('Contacts', () => {
  //   it('should fetch contact by id', async () => {
  //     const contactId = 456;
  //     const contact = await client.getContact(contactId);
  //     expect(contact).toBeDefined();
  //   });
  // });

  // describe('Companies', () => {
  //   it('should fetch company by id', async () => {
  //     const companyId = 789;
  //     const company = await client.getCompany(companyId);
  //     expect(company).toBeDefined();
  //   });
  // });

  // describe('Users', () => {
  //   it('should fetch users', async () => {
  //     const users = await client.getUsers();
  //     expect(users).toBeDefined();
  //   });
  // });
});
