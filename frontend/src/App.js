import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * Core layout for the Personal Notes Organizer App.
 * Implements dashboard structure, sidebar, header, note grid, modals, and responsive UI.
 */
function App() {
  const [theme, setTheme] = useState('light');
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [notes, setNotes] = useState([
    // Demo notes (replace with backend connection)
    {
      id: 1,
      title: 'Meeting notes',
      content: 'Discuss Q3 roadmap for launch.',
      category: 'Projects',
      date: 'May 20, 2024',
      color: 'purple',
      favorite: false,
    },
    {
      id: 2,
      title: 'Book Ideas',
      content: 'Plot outline and character notes.',
      category: 'Personal',
      date: 'May 21, 2024',
      color: 'orange',
      favorite: true,
    },
    {
      id: 3,
      title: 'Research Summary',
      content: 'AI trends and citation analysis.',
      category: 'Business',
      date: 'May 22, 2024',
      color: 'green',
      favorite: false,
    },
    {
      id: 4,
      title: 'Grocery List',
      content: 'Milk, eggs, bread, avocados...',
      category: 'Personal',
      date: 'May 23, 2024',
      color: 'blue',
      favorite: false,
    },
    {
      id: 5,
      title: 'Paris Packing List',
      content: 'Sunglasses, adapter, lightweight jacket.',
      category: 'Travel',
      date: 'May 24, 2024',
      color: 'travel',
      favorite: false,
    },
  ]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // PUBLIC_INTERFACE
  const handleTabChange = (name) => {
    setActiveTab(name);
  };

  // PUBLIC_INTERFACE
  const openModal = () => setShowModal(true);

  // PUBLIC_INTERFACE
  const closeModal = () => setShowModal(false);

  // PUBLIC_INTERFACE
  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  // PUBLIC_INTERFACE
  const filteredNotes = notes.filter(
    (note) =>
      (activeTab === 'All' || note.category === activeTab) &&
      (note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase()))
  );

  // PUBLIC_INTERFACE
  const renderNoteCard = (note) => (
    <div className="note-card" key={note.id}>
      <div className={`note-category-pill ${note.color === "travel" ? "travel" : note.color}`}>
        {note.category === "Travel" ? <span role="img" aria-label="travel">🧳</span> : null} {note.category}
      </div>
      <div className="note-title">{note.title}</div>
      <div className="note-content">{note.content}</div>
      <div className="note-meta">
        <span className="note-date">{note.date}</span>
        <div className="note-actions">
          <button className="icon-btn" title="Edit">
            <span role="img" aria-label="edit">✏️</span>
          </button>
          <button className={`icon-btn${note.favorite ? ' favorite' : ''}`} title="Favorite">
            <span role="img" aria-label="favorite">★</span>
          </button>
          <button className="icon-btn" title="Delete">
            <span role="img" aria-label="delete">🗑️</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="notes-app-root">
      <aside className="sidebar">
        <div className="sidebar-header">
          {/* Brand/Logo */}
          <div className="app-logo">📝</div>
          <span className="app-name">Notes Organizer</span>
        </div>
        <nav className="nav-links">
          {/* Example nav items; will use icons and highlight for active */}
          <NavLink icon="🏠" label="Home" active />
          <NavLink icon="🗒️" label="Tasks" />
          <NavLink icon="📄" label="Documents" />
          <NavLink icon="📷" label="Media" />
          <NavLink icon="⏰" label="Reminders" />
          <NavLink icon="📤" label="Output" />
          <NavLink icon="🛠️" label="Support" />
          <NavLink icon="⚙️" label="Settings" />
        </nav>
        <div className="sidebar-footer">
          <div className="user-avatar" title="User options">
            <span role="img" aria-label="Profile">👤</span>
          </div>
        </div>
      </aside>
      <section className="main-content">
        {/* HEADER BAR */}
        <header className="main-header">
          <div className="search-bar">
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder="Search"
            />
          </div>
          <div className="header-actions">
            <button className="add-btn" onClick={openModal} title="Add note">
              <span role="img" aria-label="Add">＋</span>
            </button>
            <div className="header-avatar">
              <span role="img" aria-label="profile">👩‍💼</span>
            </div>
            <button className="theme-toggle" onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </header>
        {/* TABS */}
        <nav className="tabs-bar">
          {[
            { value: 'All', label: 'All' },
            { value: 'Projects', label: 'Projects' },
            { value: 'Business', label: 'Business' },
            { value: 'Personal', label: 'Personal' },
            { value: 'Travel', label: <>🧳 Travel</> }
          ].map((tab) => (
            <button
              key={typeof tab.label === "string" ? tab.label : tab.value}
              className={`tab-btn${activeTab === tab.value ? ' active' : ''}`}
              onClick={() => handleTabChange(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        {/* NOTES GRID */}
        <main className="notes-grid-container">
          <div className="notes-grid">
            {filteredNotes.map(renderNoteCard)}
          </div>
        </main>
      </section>
      {showModal && (
        <Modal onClose={closeModal}>
          <div style={{ minWidth: 320 }}>
            <h2>New Note</h2>
            <p>To be implemented: Note creation form.</p>
            <button onClick={closeModal} style={{
              marginTop: 16,
              borderRadius: 8,
              padding: "12px 24px",
              background: "var(--button-blue, #3c8dbc)",
              color: "white",
              border: "none"
            }}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// Sidebar navigation link component
function NavLink({ icon, label, active }) {
  return (
    <div className={`nav-link${active ? ' active' : ''}`}>
      <span className="nav-icon">{icon}</span>
      <span className="nav-label">{label}</span>
    </div>
  );
}

// Modal component for add/edit note
function Modal({ children, onClose }) {
  useEffect(() => {
    function handler(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default App;
