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
function stripHtmlTags(text) {
  // Use a regular expression to match and remove HTML tags
  return text.replace(/<[^>]*>/g, "");
}
function helper_get_podio_field(external_id, item_data) {
  //function returns the actual value of the external id provided from the podio item data
  if (!item_data || item_data.length === 0) return;
  const data = item_data.filter((o) => o.external_id === external_id);

  return data.length > 0 ? data[0].values[0].value : null;
}
const InTheWorksKPICount = ({ leadData, relationships, transactions }) => {
  const [finalData, setFinalData] = useState([]);

  useEffect(()=>{

    console.log(`relationship & transaction = `, relationships, transactions)
    const rels = relationships.items
    const transac = transactions.items
    setFinalData([...rels, ...transac])
  }, [relationships, transactions])
  if (finalData.length === 0) {
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
console.log(`final data before jsx = `, finalData[0])
  return (
    <div className="overflow-x-auto border-t border-gray-400 text-light-primary dark:text-dark-primary">
      <h2 className="text-bold text-2xl text-center mt-4 p-5">
        Relationship Deals - In the Works
      </h2>
      <div className="">
        <Table className="w-full table-auto ">
          <TableCaption>
            [Relationship Deals + Transaction Coordination] - A list of your in
            the work deals.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>

              <TableHead>Sent by Client</TableHead>

              <TableHead className="w-[100px]">Property Address</TableHead>
              <TableHead>Projected Revenue</TableHead>

              <TableHead>Created On</TableHead>
              <TableHead>Open in Podio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {finalData.map((item, index) => (
  <TableRow key={item.app_item_id}>
    <TableCell className="font-medium">{index + 1}</TableCell>
    <TableCell className="font-medium">
      {item.fields.find(field => field.external_id === "client-that-sent-deal")?.values[0]?.value?.title}
    </TableCell>
    <TableCell className="font-medium">
      {item.fields.find(field => field.external_id === "title" || field.external_id === 'property-address' ) ?.values[0]?.value}
    </TableCell>
    {item.fields.find(field => field.external_id === "projected-revenue" || field.external_id === "projected-revenue-2") ? (
      <TableCell className="font-medium">
        ${formatCurrency(item.fields.find(field => field.external_id === "projected-revenue" || field.external_id === "projected-revenue-2")?.values[0]?.value)}
      </TableCell>
    ) : (
      <TableCell className="font-medium">-</TableCell>
    )}
    <TableCell className="font-medium">
      {item.created_on}
    </TableCell>
    <TableCell>
      <Link
        href={item.link}
        className=" p-4 m-2 hover:bg-gray-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        See Deal
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

export default InTheWorksKPICount;
