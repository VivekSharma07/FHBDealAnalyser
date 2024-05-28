import React from 'react';
import InTheWorksKPICount from '../KPIs/InTheWorksKPICount'
import InTheWorksLeadCount from '../KPIs/InTheWorksLeadCount';
import ProjectedRevenueDeals from '../KPIs/ProjectedRevenueDeals';
import ProjectedRevenueLeads from '../KPIs/ProjectedRevenueLeads';
import {useEffect} from 'react'
const KPICard = ({ title, value }) => {
  return (
    <div className="shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-4xl font-bold text-blue-600">{value}</p>
    </div>
  );
};



const CardLayout = ({leadData, relationships, transactions}) => {
  useEffect(()=>{
    console.log(`states received = `, leadData, relationships, transactions)
  }, [])
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-5">
      <InTheWorksKPICount
      leadData={leadData}
      relationships={relationships}
      transactions={transactions}
      />
      <InTheWorksLeadCount
      leadData={leadData}
      relationships={relationships}
      transactions={transactions}
      />
      <ProjectedRevenueDeals
      leadData={leadData}
      relationships={relationships}
      transactions={transactions}
      />
      <ProjectedRevenueLeads
      leadData={leadData}
      relationships={relationships}
      transactions={transactions}
      />
      

    </div>
  );
};

export default CardLayout;