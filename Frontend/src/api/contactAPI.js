// Mock contact data
export const initialContacts = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=4F46E5&color=fff"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=059669&color=fff"
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.j@example.com",
    phone: "+1 (555) 345-6789",
    avatar: "https://ui-avatars.com/api/?name=Michael+Johnson&background=DC2626&color=fff"
  },
  {
    id: 4,
    name: "Emily Williams",
    email: "emily.w@example.com",
    phone: "+1 (555) 456-7890",
    avatar: "https://ui-avatars.com/api/?name=Emily+Williams&background=9333EA&color=fff"
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "+1 (555) 567-8901",
    avatar: "https://ui-avatars.com/api/?name=David+Brown&background=EA580C&color=fff"
  },
  {
    id: 6,
    name: "Sarah Davis",
    email: "sarah.d@example.com",
    phone: "+1 (555) 678-9012",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Davis&background=0891B2&color=fff"
  }
];

// Simulated API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const contactAPI = {
  // Get all contacts
  getAllContacts: async () => {
    await delay(300);
    return [...initialContacts];
  },

  // Add a new contact
  addContact: async (contact) => {
    await delay(300);
    const newContact = {
      ...contact,
      id: Date.now(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}&background=random&color=fff`
    };
    return newContact;
  },

  // Update a contact
  updateContact: async (id, updatedData) => {
    await delay(300);
    return { ...updatedData, id };
  },

  // Delete a contact
  deleteContact: async (id) => {
    await delay(300);
    return { success: true, id };
  },

  // Search contacts
  searchContacts: async (query, contacts) => {
    await delay(200);
    const searchTerm = query.toLowerCase();
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm) ||
        contact.phone.toLowerCase().includes(searchTerm)
    );
  }
};
