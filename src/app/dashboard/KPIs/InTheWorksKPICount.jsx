// TotalLeadsKPI.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const TotalLeadsKPI = ({leadData, relationships, transactions}) => {


  if (!relationships && !transactions) {
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
      <p className="text-4xl font-bold text-blue-600">{relationships.items.length + transactions.items.length}</p>
    </div>
  );
};

export default TotalLeadsKPI;