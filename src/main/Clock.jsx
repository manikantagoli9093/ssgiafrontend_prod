import React, { useState, useEffect } from 'react';
 
function Clock() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
 
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(now);
      // Store the year in localStorage
      localStorage.setItem('currentYear', now.getFullYear().toString());
    }, 1000);
 
    return () => clearInterval(interval);
  }, []);
 
  const formatDateTime = (dateTime) => {
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    return dateTime.toLocaleDateString('en-US', options);
  };
 
  return (
<div>
{/* <h1>Current Date and Time</h1> */}
<p>{formatDateTime(currentDateTime)}</p>
</div>
  );
}
 
export default Clock;