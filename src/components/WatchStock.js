/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from "react-router-dom";

const Container = styled.div`
  border-top: 1px solid lightgrey;
  border-radius: 2px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  color: #495057;
  align-items: flex-start;
  transition: background-color 0.2s ease;
  background-color: ${props => props.isDragging ? 'rgba(63, 127, 191, 0.2)' : 'white'};
  &:hover {background: rgba(63, 127, 191, 0.2)}
`;


export default class WatchStock extends React.Component {
  render() {
    const { symbol, price, name, badge } = this.props;
    return (
      <Draggable
        draggableId={this.props.symbol}
        index={this.props.index}
      >
        {(provided, snapshot) => (

          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Link to={`/stock/${symbol}`} style={{ color: '#495057' }}>
              <span>
                <h6>{symbol}</h6>
                {name && name}
              </span>
            </Link>
            <span>
              {price}
              {badge && badge}
            </span>
          </Container>
        )}
      </Draggable>
    );
  }
}