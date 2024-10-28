import React, { useEffect, useState } from 'react';
import { fetchContacts, createContact, deleteContact } from '../api';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const response = await fetchContacts();
      setContacts(response.data);
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  };

  const handleAddContact = async () => {
    if (!newContact.name || !newContact.email || !newContact.phone || !newContact.address) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await createContact(newContact);
      setNewContact({ name: '', email: '', phone: '', address: '' });
      loadContacts();
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await deleteContact(id);
      loadContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div>
      <h2>Contact List</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} - {contact.email} - {contact.phone} - {contact.address}
            <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add Contact</h2>
      <input
        type="text"
        placeholder="Name"
        value={newContact.name}
        onChange={e => setNewContact({ ...newContact, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Email"
        value={newContact.email}
        onChange={e => setNewContact({ ...newContact, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone"
        value={newContact.phone}
        onChange={e => setNewContact({ ...newContact, phone: e.target.value })}
      />
      <input
        type="text"
        placeholder="Address"
        value={newContact.address}
        onChange={e => setNewContact({ ...newContact, address: e.target.value })}
      />
      <button onClick={handleAddContact}>Add Contact</button>
    </div>
  );
};

export default ContactList;
