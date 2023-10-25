import React, { useState } from 'react';

function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        // Example data to search in
        const data = ["apple", "banana", "cherry", "date", "elderberry", "fig"];

        const filteredResults = data.filter(item =>
            item.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSearchResults(filteredResults);
    }


    return (
        <div className='Search-bar'>
            <input className='searchinput'
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className='searchicon' onClick={handleSearch}>🔎</button>

            <ul className='searchlist'>
                {searchResults.map((result, index) => (
                    <li key={index}>{result}</li>
                ))}
            </ul>
        </div>
    );
}

export default SearchPage;
