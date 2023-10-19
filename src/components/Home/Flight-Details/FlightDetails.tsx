import React, { useEffect, useState } from 'react';
import './FlighDetails.scss';
import ReactPaginate from 'react-paginate'; // Import react-paginate
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
    const [offset, setOffset] = useState(0);
    const perPage = 9; // Items per page

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
  const indexOfLastLaunch = currentPage * perPage;
  const indexOfFirstLaunch = indexOfLastLaunch - perPage;
  const currentLaunches = launches.slice(indexOfFirstLaunch, indexOfLastLaunch);

  const handlePageClick = (data: { selected: number }) => {
    const selected = data.selected;
    const offset = Math.ceil(selected * perPage);

    setCurrentPage(selected + 1);
    setOffset(offset);
  };

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
      {/* <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="arrow-button"
      >
        <FaAngleLeft />
      </button> */}
      {/* <ul className="page-numbers"> */}
        <ReactPaginate
          previousLabel={<button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="arrow-button"
          >
            <FaAngleLeft />
          </button>}
          nextLabel={<button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastLaunch >= totalLaunches}
            className="arrow-button"
          >
            <FaAngleRight />
          </button>}
          breakLabel={'...'}
          pageCount={Math.ceil(totalLaunches / perPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
         
        />
      {/* </ul> */}
      {/* <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={indexOfLastLaunch >= totalLaunches}
        className="arrow-button"
      >
        <FaAngleRight />
      </button> */}
    </div>
  </div>
  );
};

export default FlightDetails;
