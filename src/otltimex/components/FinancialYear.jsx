import React, { useEffect } from 'react';
 
function FinancialYear() {
  const getFinancialYear = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const startYear = today.getMonth() >= 2 ? currentYear : currentYear - 1;
    const endYear = startYear + 1;
    return `FY${startYear}-${endYear}`;
  };
 useEffect(()=>{
    const financialYear=getFinancialYear();
    localStorage.setItem('year',financialYear);
 },[])
  return (
<div>
<h4>{getFinancialYear()}</h4>
</div>
  );
}
 
export default FinancialYear;


//This component is used in OtlUploadPage