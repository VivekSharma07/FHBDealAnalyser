"use client";
import ProtectedLayout from "../../components/protected_layout";
import { auth } from "../../../firebase/firebaseConfig";
import PrivateRoute from "@/components/PrivateRoute";
import InTheWorksKPI from "./KPIs/InTheWorksKPI";
import CardLayout from "./CardLayout/CardLayout";
import InTheWorksLeads from "./KPIs/InTheWorksLeads";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthState } from "react-firebase-hooks/auth";
import {useRouter} from 'next/navigation'
const Dashboard = () => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [leadsData, setLeadsData] = useState([]);
  const [relationshipDeals, setRelationshipDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [user] = useAuthState(auth)
const router = useRouter()
  useEffect(() => {
    if(!user?.uid){
      router.push('/signin')
    }else{

    get_data()

    }
    async function get_data() {
      try {
        const get_token = await axios.get(`/api/servingToken`);
        const { access_token } = get_token.data.token_data;
        const response = await axios.post(
          `https://api.podio.com/item/app/28747016/filter/59074126/`,
          { limit: 100 },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setLeadsData(response.data);

        const get_relationship_deals = await axios.post(
          `https://api.podio.com/item/app/29592989/filter/59075321/`,
          { limit: 100 },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setRelationshipDeals(get_relationship_deals.data);

        const get_transactions = await axios.post(
          `https://api.podio.com/item/app/29212540/filter/59074650/`,
          { limit: 100 },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setTransactionsData(get_transactions.data);
        setLoading(false);

        console.log(`all data fetched`);
      } catch (error) {
        console.log(
          `error in fetching initial dashboard data from Podio`,
          error
        );
      }
    }

  }, []);
  return (
    <ProtectedLayout>
      {auth.currentUser && (
        <div className="min-h-screen grid grid-cols-[auto_1fr] gap-8 p-8 ">
          <div className="absolute top-2 right-5">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold">Hello, {auth.currentUser.email}!</h2>
        </div>
      </div>
          <div className="shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
            <div className="space-y-8">
              {loading && (
                <div className="shadow rounded-lg p-6 ">
                  <Skeleton className="h-6 w-1/2 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              )}
              {!loading && (
                <>
                  <CardLayout
                    leadData={leadsData}
                    relationships={relationshipDeals}
                    transactions={transactionsData}
                  />
                  <InTheWorksKPI
                  leadData={leadsData}
                  relationships={relationshipDeals}
                  transactions={transactionsData}
                  />
                  <InTheWorksLeads 
                  leadData={leadsData}
                  relationships={relationshipDeals}
                  transactions={transactionsData}
                  />
                </>
              )}

              {/* Other KPI components */}
            </div>
          </div>
        </div>
      )}
    </ProtectedLayout>
  );
};

export default function ProtectedDashboard() {
  return (
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  );
}
