import { useState } from 'react';
import useOsloCityBikeData from '../hooks/useOsloCityBikeData';
import { Header, NameCell, Row, SmallCell, Wrapper } from './styled';

export default function Main() {
  const [sortBy, setSortBy] = useState<'name' | 'capacity' | 'num_bikes_available' | 'num_docks_available'>('name');

  const { stations } = useOsloCityBikeData();

  return (
    <Wrapper>
      <Header>Oslo City Bike Data</Header>
      <Row>
        <NameCell onClick={() => setSortBy('name')}>Name</NameCell>
        <SmallCell onClick={() => setSortBy('capacity')}>Capacity</SmallCell>
        <SmallCell onClick={() => setSortBy('num_bikes_available')}>Bikes Available</SmallCell>
        <SmallCell onClick={() => setSortBy('num_docks_available')}>Empty Docks</SmallCell>
        <SmallCell>Map</SmallCell>
      </Row>
      {(sortBy === 'name'
        ? stations.sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
        : stations.sort((a, b) => b[sortBy] - a[sortBy])
      ).map((station) => (
        <Row>
          <NameCell>{station.name}</NameCell>
          <SmallCell>{station.capacity}</SmallCell>
          <SmallCell
            color={station.num_bikes_available === 0 ? 'empty' : station.num_bikes_available > 4 ? 'full' : 'low'}
          >
            {station.num_bikes_available}
          </SmallCell>
          <SmallCell
            color={station.num_docks_available === 0 ? 'empty' : station.num_docks_available > 4 ? 'full' : 'low'}
          >
            {station.num_docks_available}
          </SmallCell>
          <SmallCell>
            <a
              target="_blank"
              href={'https://www.google.com/maps/search/?api=1&query=' + station.lat + ',' + station.lon}
            >
              Click
            </a>
          </SmallCell>
        </Row>
      ))}
    </Wrapper>
  );
}
