import React from 'react';

const TrashModal = ({ isOpen, onClose, deletedContacts, onRestore, onPermanentDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="flex w-full max-w-3xl max-h-[80vh] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </span>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Trash</h2>
              <p className="text-xs uppercase tracking-wide text-slate-400">{deletedContacts.length} removed contact{deletedContacts.length === 1 ? '' : 's'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
            type="button"
            aria-label="Close trash"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {deletedContacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
              <svg className="h-14 w-14 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <p className="text-sm text-slate-500">Trash is empty</p>
            </div>
          ) : (
            <div className="space-y-3">
              {deletedContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 shadow-sm transition hover:border-slate-300 hover:shadow"
                >
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="h-12 w-12 rounded-full object-cover opacity-60 ring-2 ring-white"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-slate-800">{contact.name}</h3>
                    <p className="truncate text-xs text-slate-500">{contact.email}</p>
                    <p className="text-xs text-slate-500">{contact.phone}</p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      onClick={() => onRestore(contact)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-600"
                      title="Restore contact"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Restore
                    </button>
                    <button
                      onClick={() => onPermanentDelete(contact.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-rose-600"
                      title="Delete permanently"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrashModal;
