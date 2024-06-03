import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
const PeriodSelector = ({ onFormSubmit }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
 
  // Get current date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
 
  // Generate periods array
  const periods = Array.from({ length: 12 }, (_, index) => {
    const periodNumber = index + 1;
    return `P${periodNumber}`;
  });
 
  // Generate financial years array from current year to past 5 years
  const financialYears = Array.from({ length: 5 }, (_, index) => {
    const startYear = currentYear - index;
    const endYear = currentYear - index + 1;
    return `FY${startYear}-${endYear}`;
  });
 
  // Handle period change
  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };
 
  // Handle financial year change
  const handleFinancialYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
 
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPeriod && selectedYear) {
      onFormSubmit(selectedPeriod, selectedYear);
    }
  };
 
  useEffect(() => {
    // Set default values for period and financial year
    if (currentMonth >= 3 && currentMonth <= 12) {
      // If current month is March or later, select current fiscal year and corresponding period
      setSelectedYear(`FY${currentYear}-${currentYear + 1}`);
      setSelectedPeriod(`P${currentMonth - 2}`);
    } else {
      // If current month is January or February, select previous fiscal year and corresponding period
      setSelectedYear(`FY${currentYear - 1}-${currentYear}`);
      setSelectedPeriod(`P${currentMonth + 10}`);
    }
  }, []);
 localStorage.setItem("currentFinancialYear",selectedYear)
 localStorage.setItem("currentPeriod",selectedPeriod)
  return (
<div>
<form onSubmit={handleSubmit}>
<select value={selectedPeriod} onChange={handlePeriodChange}>
<option value="">Select Period</option>
          {periods.map(period => (
<option key={period} value={period}>{period}</option>
          ))}
</select>
<select value={selectedYear} onChange={handleFinancialYearChange}>
<option value="">Select Financial Year</option>
          {financialYears.map(year => (
<option key={year} value={year}>{year}</option>
          ))}
</select>
<button type="submit">Submit</button>
</form>
</div>
  );
};
 
export default PeriodSelector;


//This component is used to select period and finncial year in DataTable Page