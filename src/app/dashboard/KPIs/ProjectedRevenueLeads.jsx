// TotalLeadsKPI.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

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
function stripHtmlTags(text) {
    // Use a regular expression to match and remove HTML tags
    return text.replace(/<[^>]*>/g, '');
  }
function formatCurrency(value) {
    // Convert the value to a number
    const number = Number(value);
  
    // Check if the value is a valid number
    if (isNaN(number)) {
      return value; // Return the original value if it's not a valid number
    }
  
    // Format the number with commas and 2 decimal places
    const formattedValue = number.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  
    return formattedValue;
  }

function helper_get_podio_field(external_id, item_data){
    //function returns the actual value of the external id provided from the podio item data
    if(!item_data || item_data.length === 0) return;
    const data = item_data.filter((o)=>o.external_id === external_id);

    return data.length>0 ? data[0].values[0].value : null;
}

const ProjectedRevenueLeads = ({leadData, relationships, transactions}) => {


  if (leadData.items.length === 0) {
    return (
      <div className="shadow rounded-lg p-6">
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className=" shadow rounded-lg p-6 text-center border border-gray-400">
      <h3 className="text-xl font-semibold mb-2">Leads Projected Revenue</h3>
      <p className="text-4xl font-bold text-blue-600">{calculateTotalRevenue(leadData.items)}</p>
    </div>
  );
};

export default ProjectedRevenueLeads;