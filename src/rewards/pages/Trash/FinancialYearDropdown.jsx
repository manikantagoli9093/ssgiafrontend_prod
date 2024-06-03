import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
 
const FinancialYearDropdown = ({ years, onSelectYear }) => {
  return (
<FormControl fullWidth>
<InputLabel id="financialYear-label">Select Financial Year</InputLabel>
<Select
        labelId="financialYear-label"
        id="financialYear"
        value=""
        onChange={(e) => onSelectYear(e.target.value)}
>
<MenuItem value="">Select...</MenuItem>
        {years.map((year, index) => (
<MenuItem key={index} value={year}>{year}</MenuItem>
        ))}
</Select>
</FormControl>
  );
};
 
export default FinancialYearDropdown;