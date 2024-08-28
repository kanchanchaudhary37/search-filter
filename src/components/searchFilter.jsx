import React, { useState, useEffect } from 'react';

const SearchFilter = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Search Filter Component</h2>
      <input
        type="text"
        placeholder="Search for users..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
      />
      <ul className="list-none mt-4">
        {filteredUsers.length === 0 ? (
          <li className="text-center text-gray-500">No users found.</li>
        ) : (
          filteredUsers.map(user => (
            <li key={user.id} className="py-2 px-4 border-b border-slate-200 hover:bg-slate-100 transition duration-200">
              {user.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SearchFilter;
