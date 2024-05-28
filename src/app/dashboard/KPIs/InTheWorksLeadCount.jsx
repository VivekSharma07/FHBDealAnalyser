// TotalLeadsKPI.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";


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

const InTheWorksLeadCount = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const get_token = await axios.get(
          `/api/servingToken`
        );
        const { access_token } = get_token.data.token_data;
        const response = await axios.post(
          `https://api.podio.com/item/app/28747016/filter/59074126/`, {limit: 100},
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(`response = `, response);
        setData(response.data.items);
      } catch (error) {
        console.error("Error fetching KPI data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="shadow rounded-lg p-6">
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className=" shadow rounded-lg p-6 text-center border border-gray-400">
      <h3 className="text-xl font-semibold mb-2">Leads In the Works</h3>
      <p className="text-4xl font-bold text-blue-600">{data.length}</p>
    </div>
  );
};

export default InTheWorksLeadCount;