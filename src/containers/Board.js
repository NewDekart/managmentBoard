import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Lane from '../components/Lane/Lane';
import withDataFetching from '../withDataFetching'

const BoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 5%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Alert = styled.div`
  text-align: center;
`

const Board = ({ data, loading, error, lanes }) => {

  const [tickets, setTickets] = useState(null)

  useEffect(() => {
    setTickets(data)
  }, [data])

  const onDragStart = (e, id) => {
    e.dataTransfer.setData('id', id)
  }

  const onDragOver = e => {
    e.preventDefault()
  }

  const onDrop = (e, laneId) => {
    const id = e.dataTransfer.getData('id')

    tickets
      .find(ticket => ticket.id === Number(id))
      .lane = laneId

    setTickets([...tickets])
  }

  if (loading || error) {
    return (
      <Alert>
        { loading ? 'Loading...' : error}
      </Alert>
    )
  }

  return (
    <BoardWrapper>
      {lanes.map(lane => (
        <Lane
          key={lane.id}
          laneId={lane.id}
          title={lane.title}
          tickets={tickets.filter(ticket => ticket.lane === lane.id)}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      ))}
    </BoardWrapper>
  );
}

export default withDataFetching(Board)
