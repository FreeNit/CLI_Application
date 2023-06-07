const { program } = require('commander');

const contacts = require('./contacts');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await contacts.getContacts();
      return console.log(allContacts);

    case 'get':
      const contact = await contacts.getContactById(id);
      return console.log(contact);

    case 'add':
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);

    case 'remove':
      const deleteContact = await contacts.removeContact(id);
      return console.log(deleteContact);

    case 'updateByID':
      const updatedContact = await contacts.updateById(id, {
        name,
        email,
        phone,
      });
      return console.log(updatedContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

program
  .option('-a, --action, <type>', 'choose action')
  .option('-i, --id, <type>', 'user id')
  .option('-n, --name, <type>', 'user name')
  .option('-e, --email, <type>', 'user email')
  .option('-p, --phone, <type>', 'user phone');

program.parse();

const options = program.opts();
invokeAction(options);

// -> manual calls invokeAction function
// invokeAction({ action: 'list' });
// invokeAction({ action: 'get', id: 'AeHIrLTr6JkxGE6SN-0Rw' });
// invokeAction({
//   action: 'add',
//   name: 'Dimon',
//   email: 'DV@mail.com',
//   phone: '1234123423',
// });
// invokeAction({
//   action: 'updateByID',
//   id: '3e1d3e04-a62f-4fd9-a5ea-90da5f56fd26',
//   name: 'Draken',
//   email: 'Draken@mail.com',
//   phone: '4314-4323-34',
// });
// invokeAction({ action: 'remove', id: 'AeHIrLTr6JkxGE6SN-0Rw' });
