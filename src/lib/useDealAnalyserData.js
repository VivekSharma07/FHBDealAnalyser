// lib/useDealAnalyzerData.js
import { useState, useEffect } from 'react';
import { fetchDealAnalyzerData } from './fetchData'; // Import your data fetching function

function useDealAnalyzerData(docId) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const dealData = await fetchDealAnalyzerData(docId);
                setData(dealData);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [docId]); // Fetch when docId changes

    return { data, isLoading, error };
}

export default useDealAnalyzerData;
