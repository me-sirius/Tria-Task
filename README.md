## Contact List App (React + Tailwind)

A simple, modern contact manager built with React and Tailwind CSS. It lets you view, search, add, edit, delete, and restore contacts. Deleted contacts go to a Trash with a visible count and can be restored or permanently removed. All data is persisted locally in the browser using localStorage so your changes survive page refreshes.

### Key Features
- View a clean grid of contact cards (name, email, phone, avatar)
- Global search across name, email, and phone (instant filter)
- Add new contacts (validated form)
- Edit existing contacts
- Soft-delete to Trash with a badge counter
- Restore from Trash or delete permanently
- Persists contacts and trash using localStorage

### Tech Stack
- React (Vite)
- Tailwind CSS (utility-first styling)
- localStorage for persistence (no backend required)

### Getting Started
1. Install dependencies
   
	```bash
	npm install
	```

2. Run the development server
   
	```bash
	npm run dev
	```

3. Open the printed Local URL (e.g., http://localhost:5173 or 5174).

### Project Structure

```
Frontend/
  ├─ index.html
  ├─ package.json
  ├─ postcss.config.js
  ├─ tailwind.config.js
  ├─ vite.config.js
  └─ src/
	  ├─ main.jsx               # App bootstrap (React root)
	  ├─ index.css              # Tailwind directives + minimal globals
	  ├─ App.jsx                # App shell + state, search, modals
	  ├─ api/
	  │  └─ contactAPI.js       # Mock API + initial contacts + search util
	  └─ components/
		  ├─ ContactCard.jsx     # Single contact display + edit/delete buttons
		  ├─ ContactModal.jsx    # Add/Edit modal with validation
		  └─ TrashModal.jsx      # Trash modal with restore/permanent delete
```

### Components Overview

1. App.jsx
	- The application shell and state manager.
	- Loads contacts from localStorage on start; falls back to the mock API if none saved.
	- Persists changes to two keys:
	  - `contacts_list` – active contacts
	  - `deleted_contacts` – soft-deleted contacts (Trash)
	- Handles search, open/close modals, and controls for add/edit/delete/restore.
	- Renders the header, search bar, contact grid, and modals.

2. components/ContactCard.jsx
	- Displays a single contact with avatar, name, email, and phone.
	- Provides Edit and Delete actions via callbacks from `App.jsx`.

3. components/ContactModal.jsx
	- Modal form used for both Add and Edit modes.
	- Validates required fields (name, email, phone) and basic email format.
	- On submit, calls the appropriate save handler from `App.jsx`.

4. components/TrashModal.jsx
	- Shows the list of deleted contacts.
	- Provides Restore (moves back to the main list) and Delete permanently.
	- The Trash button in the header shows a badge with the current count.

5. api/contactAPI.js
	- Contains `initialContacts` used to pre-populate the app.
	- Mock async helpers:
	  - `getAllContacts()` – returns the initial list (simulated delay)
	  - `addContact(contact)` – returns a contact with a generated id + avatar
	  - `updateContact(id, data)` – returns updated data
	  - `deleteContact(id)` – returns success
	  - `searchContacts(query, contacts)` – filters by name/email/phone

### Data Model (Contact)
```ts
type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string; // generated from name
}
```

### How Persistence Works
- On load, `App.jsx` tries to read `contacts_list` and `deleted_contacts` from localStorage.
- If none found, it loads `initialContacts` via the mock API and saves to `contacts_list`.
- All changes (add, edit, delete, restore, permanent delete) update the corresponding arrays and immediately write back to localStorage.
- This ensures nothing disappears on refresh—items remain in the main list or Trash until explicitly removed.

### UX Notes
- Responsive layout with sensible spacing and smaller icons for clarity.
- Search is debounced by virtue of state updates and runs instantly on input change.
- Loading and empty states are designed to be clear and minimal.

### Scripts
- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview production build

### Next Ideas (Nice-to-have)
- Avatar upload support
- Sorting and pagination
- Field masking/formatting for phone numbers
- Import/export contacts (JSON/CSV)
- Real API integration with authentication

---

If you’re exploring this repo, start `npm run dev`, add a few contacts, try delete/restore, refresh the page, and see persistence in action. Enjoy!

