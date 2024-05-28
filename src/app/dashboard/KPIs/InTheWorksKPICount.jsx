// TotalLeadsKPI.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const TotalLeadsKPI = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/podio");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching Total Deals In the works data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="shadow rounded-lg p-6 ">
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="shadow rounded-lg p-6 text-center border border-gray-400">
      <h3 className="text-xl font-semibold mb-2">Deals In the Works</h3>
      <p className="text-4xl font-bold text-blue-600">{data.length}</p>
    </div>
  );
};

export default TotalLeadsKPI;