import { useState, useEffect } from 'react';
import InTheWorksKPI from './KPIs/InTheWorksKPI';
import { useTheme } from 'styled-components';

const Grid = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  const [theme, setTheme] = useTheme()
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    console.log(`theme = `, theme)
    // Initial screen width
    handleResize();

    // Update screen width on window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mt-10">
      <div className=" shadow rounded-lg p-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">In The Works</h3>
          <p className="text-gray-600">This shows the no of leads team members are currently working on:</p>
        </div>
        <div className="mt-4 flex-grow overflow-hidden">
          <InTheWorksKPI />
        </div>
      </div>
      {/* <div className="bg-white shadow rounded-lg p-6 h-full flex flex-col">
        <div>
          <h3 className="text-xl font-semibold mb-2">KPI 2</h3>
          <p className="text-gray-600">Content for KPI 2</p>
        </div>
        <div className="mt-4 flex-grow overflow-y-auto">
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6 h-full flex flex-col">
        <div>
          <h3 className="text-xl font-semibold mb-2">KPI 3</h3>
          <p className="text-gray-600">Content for KPI 3</p>
        </div>
        <div className="mt-4 flex-grow overflow-y-auto">
        </div>
      </div> */}
    </div>
  );
};

export default Grid;