import React from 'react'
import styled from 'styled-components'
import withDataFetching from '../withDataFetching'
import Ticket from '../components/Ticket/Ticket'

const TicketWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin: 5%;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const Alert = styled.div`
    text-align: center;
`

const Tickets = ({ loading, data, error }) => {

    if (loading || error) {
        return (
          <Alert>
            { loading ? 'Loading...' : error}
          </Alert>
        )
      }

    return (
        <TicketWrapper>
            {data.map(ticket => <Ticket key={ticket.id} ticket={ticket} marginRight />)}
        </TicketWrapper>
    )
}

export default withDataFetching(Tickets)
