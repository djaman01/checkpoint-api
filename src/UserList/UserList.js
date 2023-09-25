import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserList() 
{
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');

  const handleTitle = (e) => setTitle(e.target.value);

  useEffect(() => {
    const fetchData = () => {
      
      const url =`https://jsonplaceholder.typicode.com/users`;

      axios.get(url)
        .then((response) => {
          //response.data est la syntax pour recceuillir toutes les données de l'api
          const filteredUsers= response.data.filter((user)=>user.name.toLowerCase().includes(title.toLowerCase()));
          
          setSearchResult(filteredUsers);//Si je voulais juste les données, j'aurais juste écris setSearchResult(response.data)
        })
        .catch((error) => {
          setError('An error occurred while fetching data.');
        });
    };

    fetchData();
  }, [title]);

  return (
    <>
      <div>
        <h1>User List</h1>
      </div>
      <div>
        <input value={title} onChange={handleTitle} type="text" />
      </div>
      <div>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <div>
            <h1>Search Results</h1>
            <ul>
              {searchResult.map((item) => (
                <li key={item.id}>
                  <h2>{item.name}</h2>
                  <h3>{item.username}</h3>
                  <h3>{item.email}</h3>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

