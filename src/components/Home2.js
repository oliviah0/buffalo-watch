/**
 * Home2 contains drag and drop functionality
 */

import React, { Component } from "react";
import uuid from "uuid/v4";
import SearchForm from "./SearchForm";
import { Badge } from "react-bootstrap";
import Spinner from "./Spinner";
import StockContext from "../StockContext";
import image from "../stock.png";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import "./Home.css";
import WatchStock from './WatchStock';

import ReactTooltip from 'react-tooltip';


const Container = styled.div`
  border: 1px solid white;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const ToolTipIcon = styled.div`
  padding: 5px;
  color: lightgrey;
  font-size: 18px;
  &:hover {
    color: darkgrey;
  }
`;

class Home extends Component {
  static contextType = StockContext;

  makeBadge(percent) {
    return (
      <Badge
        className="mx-2 percent-change-badge"
        variant={percent > 0 ? "success" : "danger"}>
        {percent}%
      </Badge>
    );
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    // if item did not move, return
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStockOrder = this.context.watchlist.slice();
    newStockOrder.splice(source.index, 1);
    newStockOrder.splice(destination.index, 0, draggableId);
    this.context.updateWatchlist(newStockOrder);
    return;
  }

  render() {
    let { watchlistQuotes, watchlist } = this.context;
    if (!watchlistQuotes) return <Spinner />;

    let stocks = watchlist.map((stock, index) => (
      <WatchStock
        key={uuid()}
        symbol={stock}
        price={watchlistQuotes[stock].price}
        index={index}
        badge={this.makeBadge(watchlistQuotes[stock].change_pct)}
      />
    ));


    return (
      <div className="my-5">
        <img className="header-image my-3" src={image} alt="" />
        <SearchForm />
        <div className="my-5">
          <Header>
            <h3 className="my-3">Watchlist</h3>
            <ToolTipIcon data-tip data-for='watchlist-help'>
              <i className="fas fa-question-circle"></i>
            </ToolTipIcon>
            <ReactTooltip
              id='watchlist-help'
              place='right'
              type='info'
              effect='solid'
            >
              <span>
                Use left side to click into stock details.<br />
                Use right side to drag and drop rows.
              </span>
            </ReactTooltip>
          </Header>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Container>
              <Droppable droppableId={1}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {stocks}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Container>
          </DragDropContext>
        </div>
      </div>
    );
  }
}

export default Home;


