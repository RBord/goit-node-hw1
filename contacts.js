const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath  = path.join(__dirname, 'db/contacts.json');

async function listContacts () {
    const data = await fs.readFile(contactsPath , 'utf-8');
    const contacts = JSON.parse(data);
    return contacts;
}

async function getContactById (id) {
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id.toString() === id);
    if (!contact) {
        return null;
    }
    return contact;
}

async function addContact (contact) {
    const contacts = await listContacts();
    const newContact = { ...contact, id: v4() };
    contacts.push(newContact);
    await fs.writeFile(contactsPath , JSON.stringify(contacts));
    return listContacts();
} 

async function removeContact (id) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath , JSON.stringify(contacts));
    return listContacts();
}

module.exports = { listContacts, getContactById, addContact, removeContact };