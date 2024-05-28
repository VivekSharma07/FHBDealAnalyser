import React from 'react';
import InTheWorksKPICount from '../KPIs/InTheWorksKPICount'
import InTheWorksLeadCount from '../KPIs/InTheWorksLeadCount';
import ProjectedRevenueDeals from '../KPIs/ProjectedRevenueDeals';
import ProjectedRevenueLeads from '../KPIs/ProjectedRevenueLeads';

const KPICard = ({ title, value }) => {
  return (
    <div className="shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-4xl font-bold text-blue-600">{value}</p>
    </div>
  );
};

const CardLayout = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-5">
      <InTheWorksKPICount />
      <InTheWorksLeadCount/>
      <ProjectedRevenueDeals/>
      <ProjectedRevenueLeads/>

    </div>
  );
};

export default CardLayout;