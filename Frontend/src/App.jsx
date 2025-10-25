import { useState, useEffect } from 'react';
import ContactCard from './components/ContactCard';
import ContactModal from './components/ContactModal';
import TrashModal from './components/TrashModal';
import { contactAPI, initialContacts } from './api/contactAPI';

const STORAGE_KEY = 'contacts_list';
const TRASH_KEY = 'deleted_contacts';

function App() {
  const [contacts, setContacts] = useState([]);
  const [deletedContacts, setDeletedContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrashOpen, setIsTrashOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedContact, setSelectedContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial contacts from localStorage or API
  useEffect(() => {
    const loadContacts = async () => {
      setIsLoading(true);
      try {
        const savedContacts = localStorage.getItem(STORAGE_KEY);
        const savedDeleted = localStorage.getItem(TRASH_KEY);
        
        if (savedContacts) {
          const parsedContacts = JSON.parse(savedContacts);
          setContacts(parsedContacts);
          setFilteredContacts(parsedContacts);
        } else {
          const data = await contactAPI.getAllContacts();
          setContacts(data);
          setFilteredContacts(data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
        
        if (savedDeleted) {
          setDeletedContacts(JSON.parse(savedDeleted));
        }
      } catch (error) {
        console.error('Error loading contacts:', error);
        const data = await contactAPI.getAllContacts();
        setContacts(data);
        setFilteredContacts(data);
      }
      setIsLoading(false);
    };
    loadContacts();
  }, []);

  // Handle search
  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.trim() === '') {
        setFilteredContacts(contacts);
      } else {
        const results = await contactAPI.searchContacts(searchQuery, contacts);
        setFilteredContacts(results);
      }
    };
    performSearch();
  }, [searchQuery, contacts]);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    }
  }, [contacts]);

  // Save deleted contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(TRASH_KEY, JSON.stringify(deletedContacts));
  }, [deletedContacts]);

  // Add new contact
  const handleAddContact = async (formData) => {
    const newContact = await contactAPI.addContact(formData);
    setContacts([newContact, ...contacts]);
  };

  // Edit contact
  const handleEditContact = async (formData) => {
    const updatedContact = await contactAPI.updateContact(selectedContact.id, {
      ...formData,
      avatar: selectedContact.avatar
    });
    setContacts(contacts.map(c => c.id === selectedContact.id ? updatedContact : c));
  };

  // Delete contact (move to trash)
  const handleDeleteContact = (contact) => {
    setDeletedContacts([...deletedContacts, contact]);
    setContacts(contacts.filter(c => c.id !== contact.id));
  };

  // Restore contact from trash
  const handleRestoreContact = (contact) => {
    setContacts([...contacts, contact]);
    setDeletedContacts(deletedContacts.filter(c => c.id !== contact.id));
  };

  // Permanently delete contact
  const handlePermanentDelete = (id) => {
    setDeletedContacts(deletedContacts.filter(c => c.id !== id));
  };

  // Open modal for adding
  const openAddModal = () => {
    setModalMode('add');
    setSelectedContact(null);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (contact) => {
    setModalMode('edit');
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-semibold text-slate-900">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </span>
              Contact List
            </h1>
            <p className="mt-1 text-sm text-slate-500">Manage your network effortlessly with quick search, edit, and trash controls.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-sky-600"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Contact
            </button>
            <button
              onClick={() => setIsTrashOpen(true)}
              className="relative inline-flex items-center gap-2 rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-rose-600"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Trash
              {deletedContacts.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-xs font-semibold text-slate-900">
                  {deletedContacts.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">Total contacts</p>
            <p className="text-3xl font-semibold text-slate-900">{contacts.length}</p>
          </div>
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search by name, email, phone, or any detail..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 pl-12 text-sm shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
            <svg
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-100 p-1 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
                aria-label="Clear search"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Contact List */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-slate-200 border-t-sky-500"></div>
            <p className="mt-4 text-sm text-slate-500">Loading contacts…</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <svg className="h-14 w-14 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-base text-slate-500">
              {searchQuery ? 'No contacts found matching your search' : 'No contacts yet'}
            </p>
            {!searchQuery && (
              <button
                onClick={openAddModal}
                className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-600"
              >
                Add Your First Contact
              </button>
            )}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onEdit={openEditModal}
                onDelete={handleDeleteContact}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={modalMode === 'add' ? handleAddContact : handleEditContact}
        contact={selectedContact}
        mode={modalMode}
      />

      <TrashModal
        isOpen={isTrashOpen}
        onClose={() => setIsTrashOpen(false)}
        deletedContacts={deletedContacts}
        onRestore={handleRestoreContact}
        onPermanentDelete={handlePermanentDelete}
      />
    </div>
  );
}

export default App;
