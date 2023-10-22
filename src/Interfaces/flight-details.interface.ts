export interface Flight {
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
    upcoming: boolean;
  }