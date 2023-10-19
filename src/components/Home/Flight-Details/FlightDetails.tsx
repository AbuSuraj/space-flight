import React, { useEffect, useState } from 'react';
import './FlighDetails.scss';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'; // Import arrow icons

interface Launch {
  flight_number: number;
  mission_name: string;
  launch_date_local: string;
  links: {
    mission_patch: string;
  };
  launch_success: boolean;
  rocket: {
    rocket_name: string;
  };
}

function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

const FlightDetails = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const launchesPerPage = 9;

  useEffect(() => {
    async function fetchLaunches() {
      try {
        const response = await fetch('https://api.spacexdata.com/v3/launches');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Launch[] = await response.json();
        setLaunches(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    }

    fetchLaunches();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const totalLaunches = launches.length;
  const indexOfLastLaunch = currentPage * launchesPerPage;
  const indexOfFirstLaunch = indexOfLastLaunch - launchesPerPage;
  const currentLaunches = launches.slice(indexOfFirstLaunch, indexOfLastLaunch);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalLaunches / launchesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {currentLaunches.map((launch) => (
          <div key={launch?.flight_number} className="launch-card">
            <img className='w-[124px] h-[124px]' src={launch?.links?.mission_patch} alt="Mission Patch" />
            <p>Lunch Date: {formatDate(launch?.launch_date_local)}</p>
            <p>{launch?.mission_name}</p>
            <p>{launch?.rocket?.rocket_name}</p>
            <p>Lunch Status: {launch?.launch_success ? <span>Success</span> : <span>Failed</span>}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="arrow-button w-3 h-3"
        >
          <FaAngleLeft />
          
        </button>
        <ul className="page-numbers">
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => setCurrentPage(number)}
                className={number === currentPage ? 'current-page' : 'page-number'}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastLaunch >= totalLaunches}
          className="arrow-button"
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default FlightDetails;
