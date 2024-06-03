import { useEffect } from 'react';
 
function CurrentFYandPeriod() {
  useEffect(() => {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
 
    // Assuming financial year starts from March (period 1)
    let financialYear;
    let period;
 
    if (currentDate.getMonth() >= 2) { // March is the 3rd month (index 2)
      financialYear = `${currentYear}-${currentYear + 1}`; // Assuming financial year runs from March of current year to February of next year
      period = currentDate.getMonth() - 1; // Adjusting month index to start from 1 for March
    } else {
      financialYear = `${currentYear - 1}-${currentYear}`;
      period = currentDate.getMonth() + 11; // Adjusting month index to start from 1 for March
    }
 
    // Store the financial year and period in localStorage
    localStorage.setItem("cufinancialYear", financialYear);
    localStorage.setItem("period", period);
 
  }, []); // This effect runs only once after component mounts
}
 
export default CurrentFYandPeriod;


//This component is used in OtlDashboard