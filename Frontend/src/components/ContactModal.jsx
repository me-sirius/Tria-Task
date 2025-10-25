import React, { useEffect, useState } from 'react';

const ContactModal = ({ isOpen, onClose, onSave, contact, mode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (contact && mode === 'edit') {
      setFormData({
        name: contact.name,
        email: contact.email,
        phone: contact.phone
      });
    } else {
      setFormData({ name: '', email: '', phone: '' });
    }
    setErrors({});
  }, [contact, mode, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg transform rounded-3xl border border-slate-200 bg-white shadow-2xl transition-all">
        <div className="flex items-start justify-between gap-4 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              {mode === 'add' ? 'Create contact' : 'Update contact'}
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">
              {mode === 'add' ? 'Add New Contact' : 'Edit Contact'}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Enter the details below. All fields are required.
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            aria-label="Close modal"
            className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 border-t border-slate-100 px-6 py-6">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
              Full name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-sky-100 ${
                errors.name ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200 focus:border-sky-400'
              }`}
              placeholder="John Doe"
            />
            {errors.name && <p className="mt-1 text-sm text-rose-500">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-sky-100 ${
                errors.email ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200 focus:border-sky-400'
              }`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-rose-500">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
              Phone number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-sky-100 ${
                errors.phone ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200 focus:border-sky-400'
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && <p className="mt-1 text-sm text-rose-500">{errors.phone}</p>}
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-600"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {mode === 'add' ? 'Add contact' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
