const fs = require('fs/promises');
const path = require('path');
const uuid = require('uuid').v4;

const contactsPath = path.join(`${__dirname}/db`, 'contacts.json');

// -> Retrieve list of Contacts
async function getContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
}

// -> Retrieve contact by ID
async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === contactId);
    return result || null;
  } catch (error) {
    console.log(error.message);
  }
}

// -> Remove contact by ID
async function removeContact(contactId) {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

// -> Add contact to the list
async function addContact(data) {
  const contacts = await listContacts();

  const newContact = {
    id: uuid(),
    ...data,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

// -> Update contact by ID
async function updateById(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};
