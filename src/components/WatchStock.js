/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from "react-router-dom";

const Container = styled.div`
  align-items: center;
  background-color: ${props => props.isDragging ? 'rgba(63, 127, 191, 0.2)' : 'white'};
  border-top: 1px solid lightgrey;
  border-radius: 2px;
  color: #495057;
  display: flex;
  justify-content: space-between;
  padding: 15px 40px 15px 35px;
  position: relative;
  transition: background-color 0.2s ease;
  &:hover { 
    background: rgba(63, 127, 191, 0.2);
    border-left: 4px solid rgba(63, 127, 191, 0.8);
  }
`;

const DragHandle = styled.div`
  color: lightgrey;
  padding: 15px 0 15px 30rem;
  position: absolute;
  right: 5px;
  &:hover {
    color: darkgrey;
  }
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
          <Link to={`/stock/${symbol}`} style={{ textDecoration: 'none' }}>
            <Container
              {...provided.draggableProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              <span>
                <h6>{symbol}</h6>
                {name && name}
              </span>
              <span>
                {price}
                {badge && badge}
              </span>

              <DragHandle {...provided.dragHandleProps}>
                <i className="fas fa-ellipsis-v"></i>
              </DragHandle>
            </Container>
          </Link>
        )}
      </Draggable>
    );
  }
}