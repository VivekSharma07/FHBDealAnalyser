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
  return text.replace(/<[^>]*>/g, "");
}
const InTheWorksKPICount = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/podio");
        console.log(`response = `, response);
        setData(response.data);
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
              <TableHead>Sent by Client</TableHead>

              <TableHead className="w-[100px]">Property Address</TableHead>
              <TableHead>Projected Revenue</TableHead>

              <TableHead>Created On</TableHead>
              <TableHead>Open in Podio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item["podio-app-item-id"]}>
                <TableCell className="font-medium">
                  {item && item.hasOwnProperty("client-that-sent-deal")
                    ? item["client-that-sent-deal"]
                    : "-"}
                </TableCell>
                <TableCell className="font-medium">
                  {item && item.hasOwnProperty("title")
                    ? item.title
                    : item["property-address"]}
                </TableCell>
                {item && !item.hasOwnProperty('projected-revenue') && !item.hasOwnProperty('projected-revenue-2') && 
                <TableCell className="font-medium">-</TableCell>
                }
                {item && item.hasOwnProperty("projected-revenue") && (
                  <TableCell className="font-medium">
                    ${" "}
                    {item.hasOwnProperty("projected-revenue")
                      ? item["projected-revenue"]
                      : "-"}
                  </TableCell>
                )}
                {item && item.hasOwnProperty("projected-revenue-2") && (
                  <TableCell className="font-medium">
                    ${" "}
                    {item.hasOwnProperty("projected-revenue-2")
                      ? item["projected-revenue-2"]
                      : "-"}
                  </TableCell>
                )}

                <TableCell className="font-medium">
                  {item["created-date"]}
                </TableCell>
                <TableCell>
                  <Link
                    href={item.custom_url}
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
