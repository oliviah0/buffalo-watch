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


const Container = styled.div`
  border: 1px solid white;
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
    const { destination, source, draggableId} = result;

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
          <h3 className="my-3 mx-auto">Watchlist</h3>
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


