// TotalLeadsKPI.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

function calculateTotalRevenue(data) {
  // Check if data is an array
  if (!Array.isArray(data)) {
    throw new Error('Invalid input. Expected an array.');
  }

  const finalData = data.map((item)=>{
      console.log('each item = ', item)
      const found_item = item.fields.filter((o)=>o.external_id === "projected-revenue-2");
      if(!found_item || found_item.length === 0) return;

      return{
          'projected-revenue-2': found_item[0].values[0].value
      };
  })

  let totalRevenue = 0;

  // Loop through each object in the array
  console.log(`data[0] = `, finalData)
  const main_final_data = finalData.filter(Boolean)
  for (const obj of main_final_data) {
    // Check if 'projected-revenue' field exists and is a valid number
    if (obj && obj.hasOwnProperty('projected-revenue')) {
      const revenue = parseFloat(obj['projected-revenue'].replace(/,/g, ''));
      if (!isNaN(revenue)) {
        totalRevenue += revenue;
      }
    }
    // Check if 'projected-revenue-2' field exists and is a valid number
    else if (obj && obj.hasOwnProperty('projected-revenue-2')) {
      const revenue = parseFloat(obj['projected-revenue-2'].replace(/,/g, ''));
      if (!isNaN(revenue)) {
        totalRevenue += revenue;
      }
    }
  }

  // Format the total revenue as currency with $ sign and rounded off to thousands
  const formattedRevenue = formatCurrencyCustom(totalRevenue);

  return formattedRevenue;
}
  
  // Helper function to format currency with $ sign and rounded off to thousands
  function formatCurrencyCustom(amount) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  
    const formattedAmount = formatter.format(amount);
  
    // Round off to thousands if the amount is greater than or equal to 1000
    if (amount >= 1000) {
      const roundedAmount = Math.round(amount / 1000);
      return `$${roundedAmount}K`;
    }
  
    return formattedAmount;
  }
  
  // Helper function to format currency with $ sign and rounded off to thousands
  function formatCurrency(amount) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  
    const formattedAmount = formatter.format(amount);
  
    // Round off to thousands if the amount is greater than or equal to 1000
    if (amount >= 1000) {
      const roundedAmount = Math.round(amount / 1000);
      return `$${roundedAmount}K`;
    }
  
    return formattedAmount;
  }
const ProjectedRevenueDeals = ({ leadData, relationships, transactions }) => {
  const [data, setData] = useState([]);

 
  useEffect(() => {
    
    console.log(`relationship & transaction = `, relationships, transactions)
        const rels = relationships.items
        const transac = transactions.items
        setData([...rels, ...transac])

  }, []);

  if (data.length === 0) {
    return (
      <div className="shadow rounded-lg p-6 ">
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }
console.log(`total rev data = `, data)
  return (
    <div className="shadow rounded-lg p-6 text-center border border-gray-400">
      <h3 className="text-xl font-semibold mb-2">Deals Projected Revenue</h3>
      <p className="text-4xl font-bold text-blue-600">{calculateTotalRevenue(data)}</p>
    </div>
  );
};

export default ProjectedRevenueDeals;