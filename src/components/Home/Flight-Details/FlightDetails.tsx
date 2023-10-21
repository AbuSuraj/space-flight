import React, { useEffect, useState } from 'react';
import './FlighDetails.scss';
import ReactPaginate from 'react-paginate'; // Import react-paginate
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'; // Import arrow icons
import { useSpaceFlight } from '../../../context/spaceFlightContext';

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
    const {spaceSearch, upcoming, filterByDate, filterByStatus } = useSpaceFlight();
    console.log(spaceSearch, upcoming, filterByDate, filterByStatus);
          
  useEffect(() => {
    async function fetchLaunches() {
      try {
        const response = await fetch(`https://api.spacexdata.com/v3/launches?rocket_name=${spaceSearch}&upcoming=${upcoming}&launch_success=${filterByStatus}&launch_date_utc=${filterByDate}`);
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
  }, [spaceSearch, upcoming, filterByDate, filterByStatus]);
  console.log(launches)

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
    <div className="grid items-center justify-items-center grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
      {currentLaunches.map((launch) => (
        <div key={launch?.flight_number} className="launch-card w-52 md:w-[348px] lg:w-96">
          <div className='mt-8'>
          <img className='mx-auto w-[124px] h-[124px]' src={launch?.links?.mission_patch} alt="Mission Patch" />
          </div>
          <div className='mt-10 mb-8'>
          <p className='text-base font-normal font-[Barlow] mb-2'><span className=' text-gray-600'>Launch Date: </span> <span className='text-gray-800'>{formatDate(launch?.launch_date_local)}</span></p>
          <h4 className='font-[Barlow] text-2xl font-medium text-gray-900'>{launch?.mission_name}</h4>
          <p className='text-base font-normal font-[Barlow] text-gray-700 mb-8'>{launch?.rocket?.rocket_name}</p>
          <div className='mb-8'>
          <p className='text-base font-medium font-[Barlow] text-gray-600 mb-2'>Launch Status: </p>
          <p className='text-xs font-bold font-[Helvetica] text-white'>
          {launch?.launch_success ? <span className='bg-[#198754] py-[4.2px] px-[7.8px] rounded'>Success</span> : <span className='bg-[#DC3545] py-[4.2px] px-[7.8px] rounded'>Failed</span>}
          </p>
          </div>
          </div>
        </div>
      ))}
    </div>
    <div className="">
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
