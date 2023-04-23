import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const header = {
  'Client-Identifier': 'private-testingApi',
};

interface StationInformation {
  station_id: string;
  name: string;
  lat: number;
  lon: number;
  capacity: number;
}

interface StationStatus {
  station_id: string;
  num_bikes_available: number;
  num_docks_available: number;
}

interface Station {
  station_id: string;
  name: string;
  lat: number;
  lon: number;
  num_bikes_available: number;
  num_docks_available: number;
  capacity: number;
}

export default function useOsloCityBikeData() {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    Promise.all([
      axios.get('https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json', { headers: header }),
      axios.get('https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json', { headers: header }),
    ])
      .then(([informationResponse, statusResponse]) => {
        const stations = informationResponse.data.data.stations.map((stationInfo: StationInformation) => {
          const stationStatus = statusResponse.data.data.stations.find(
            (status: StationStatus) => status.station_id === stationInfo.station_id
          );
          return {
            station_id: stationInfo.station_id,
            name: stationInfo.name,
            lat: stationInfo.lat,
            lon: stationInfo.lon,
            capacity: stationInfo.capacity,
            num_bikes_available: stationStatus?.num_bikes_available || 0,
            num_docks_available: stationStatus?.num_docks_available || 0,
          };
        });
        setStations(stations);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { stations, loading, refetch };
}
