import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'zanroo-user-list';

const initialUsers = [
  { id: 1, name: 'Mr A', age: 37, nickname: 'A' },
  { id: 2, name: 'Mr B', age: 22, nickname: 'B' },
];

function loadUsers() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialUsers;
  } catch (error) {
    return initialUsers;
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function App() {
  const [users, setUsers] = useState(() => loadUsers());
  const [form, setForm] = useState({ name: '', age: '', nickname: '' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', age: '', nickname: '' });

  const [clickAdd, setClickAdd] = useState(false);

  useEffect(() => {
    saveUsers(users);
  }, [users]);

  const nextId = useMemo(() => {
    return users.length ? Math.max(...users.map((user) => user.id)) + 1 : 1;
  }, [users]);

  const handleAdd = () => {
    const trimmedName = form.name.trim();
    const trimmedNickname = form.nickname.trim();
    const ageValue = Number(form.age);

    if (!trimmedName || !trimmedNickname || !ageValue) {
      return;
    }

    setUsers((prev) => [
      ...prev,
      { id: nextId, name: trimmedName, age: ageValue, nickname: trimmedNickname },
    ]);
    setForm({ name: '', age: '', nickname: '' });
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const startEdit = (user) => {
    setEditingId(user.id);
    setEditForm({ name: user.name, age: String(user.age), nickname: user.nickname });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = (id) => {
    const trimmedName = editForm.name.trim();
    const trimmedNickname = editForm.nickname.trim();
    const ageValue = Number(editForm.age);

    if (!trimmedName || !trimmedNickname || !ageValue) {
      return;
    }

    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, name: trimmedName, age: ageValue, nickname: trimmedNickname }
          : user
      )
    );
    setEditingId(null);
  };

  return (
    <div className="app-shell">
      <header>
        <h1>React User CRUD</h1>
        <p>Single-page application with LocalStorage, inline edit, add, and delete.</p>
      </header>

      <div className="user-table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Nickname</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  {editingId === user.id ? (
                    <input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editingId === user.id ? (
                    <input
                      type="number"
                      min="1"
                      value={editForm.age}
                      onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                    />
                  ) : (
                    user.age
                  )}
                </td>
                <td>
                  {editingId === user.id ? (
                    <input
                      value={editForm.nickname}
                      onChange={(e) => setEditForm({ ...editForm, nickname: e.target.value })}
                    />
                  ) : (
                    user.nickname
                  )}
                </td>
                <td className="action-cell">
                  {editingId === user.id ? (
                    <>
                      <button className="btn save" onClick={() => saveEdit(user.id)}>
                        Edit
                      </button>
                      <button className="btn cancel" onClick={cancelEdit}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn edit" onClick={() => startEdit(user)}>
                        Edit
                      </button>
                      <button className="btn delete" onClick={() => handleDelete(user.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="form-section">
        {clickAdd && (
            <div className="input-row">
                <input
                    value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Name"
                        />
                <input
                    type="number"
                    min="1"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    placeholder="Age"
                    />
                <input
                    value={form.nickname}
                    onChange={(e) => setForm({ ...form, nickname: e.target.value })}
                    placeholder="Nickname"
                    />

                <div className="action-cell">
                    <button className="btn save new" onClick={handleAdd}>
                        Save
                    </button>
                    <button className="btn cancel" onClick={() => setClickAdd(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        )}
        
        <button className="btn add" onClick={() => setClickAdd(true)}>
          Add
        </button>
      </section>
    </div>
  );
}

export default App;
