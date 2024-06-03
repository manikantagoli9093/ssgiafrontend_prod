import React, { useState } from 'react';
 
const SalesTable = ({ salesData }) => {
  const [searchTerm, setSearchTerm] = useState('');
 
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
 
  const filteredData = salesData.filter(item => {
    return (
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.amount.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
 
  return (
<div >
<input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        style={{marginLeft:'700px'}}
      />
<table style={{width:'90%'}}>
<thead>
<tr>
<th>Name</th>
<th>Week1</th>
<th>Week2</th>
<th>Week3</th>
<th>Week4</th>
<th>Difference</th>
<th>Status</th>
</tr>
</thead>
<tbody>
          {filteredData.map(item => (
<tr key={item.id}>
<td>{item.id}</td>
<td>{item.product}</td>
<td>{item.amount}</td>
</tr>
          ))}
</tbody>
</table>
</div>
  );
};
 
export default SalesTable;