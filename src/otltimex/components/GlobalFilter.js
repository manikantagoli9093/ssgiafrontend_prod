import React from 'react';
 
export const GlobalFilter = ({ filter, setFilter }) => {
    return (
<div>
<label htmlFor="global-filter">Search: </label>
<input
                id="global-filter"
                type="text"
                placeholder="Type to search..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
</div>
    );
};