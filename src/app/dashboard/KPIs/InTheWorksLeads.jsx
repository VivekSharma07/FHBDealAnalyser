import { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

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
const InTheWorksLeads = () => {
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
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[200px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-bold text-2xl border-t border-gray-400 text-center mt-4 p-5">Seller Leads - In the Works</h2>
      <div className="">
        <Table className="w-full table-auto ">
          <TableCaption>
            [Leads] - A list of your in the work leads.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Seller Name</TableHead>
              <TableHead>Property Address</TableHead>
              <TableHead>Projected Revenue</TableHead>
              <TableHead>Created On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={helper_get_podio_field('app_item_id', item.fields)} className="py-2 gap-2">
                <TableCell className="font-medium">{stripHtmlTags(helper_get_podio_field('sellers-name', item.fields))}</TableCell>
                <TableCell className="font-medium">
                  {helper_get_podio_field('address', item.fields)}
                </TableCell>
                <TableCell className="font-medium">
                  ${formatCurrency(helper_get_podio_field('projected-revenue-2', item.fields))}
                </TableCell>
                <TableCell className="font-medium">
                  {item["created_on"]}
                </TableCell>
                <TableCell>
                  <Link
                    href={`https://podio.com/foreverhomebuyercom/plus-ultraossad/apps/leads/items/${item["app_item_id"]}`}
                    className=" border-gray-400 p-4  hover:bg-gray-200"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    See Lead
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InTheWorksLeads;
