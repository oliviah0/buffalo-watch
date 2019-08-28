import axios from "axios";
import API_KEY from "./secret";
import moment from "moment";

const BASE_URL = "https://api.worldtradingdata.com/api/v1/";

// only intraday API has a different URL with more limits to API Calls
const INTRADAY_BASE_URL = "https://intraday.worldtradingdata.com/api/v1/";


const API_TOKEN = `api_token=${API_KEY}`;

class StockAPI {

  static async getData(symbol) {
    const result = await axios.get(`${BASE_URL}stock?symbol=${symbol}&api_token=${API_KEY}`);
    return result.data.data[0];
  }

  static async getIntradayData(symbol) {
    const result = await axios.get(`${INTRADAY_BASE_URL}intraday?symbol=${symbol}&range=1&interval=5&sort=asc&api_token=${API_KEY}`);
    return result.data.intraday;
  }

  static async getMonthData(symbol) {
    const dateFrom = moment().subtract(1, 'months').format('YYYY-MM-D');
    const dateTo = moment().format('YYYY-MM-D');
    const result = await axios.get(`${BASE_URL}history?symbol=${symbol}&sort=asc&date_from=${dateFrom}&date_to=${dateTo}&api_token=${API_KEY}`);
    return result.data.history;
  }

  static async getWeekData(symbol) {
    const dateFrom = moment().subtract(7, 'days').format('YYYY-MM-D');
    const dateTo = moment().format('YYYY-MM-D');
    const result = await axios.get(`${BASE_URL}history?symbol=${symbol}&sort=asc&date_from=${dateFrom}&date_to=${dateTo}&api_token=${API_KEY}`);
    return result.data.history;
  }

  static async getWatchlist(watchlist) {
    const symbols = watchlist.join(",");
    let result = await axios.get(`${BASE_URL}stock?symbol=${symbols}&api_token=${API_KEY}`);

    // creates an object of watchlist stocks with the symbol as the key and value as quote data
    let stockObj = {};
    for (let stock of result.data.data) {
      stockObj[stock.symbol] = stock;
    }

    return stockObj;
  }

  static async getSearchList(searchTerm) {
    let other = "search_by=symbol,name&limit=50&currency=usd&page=1";
    let result = await axios.get(`${BASE_URL}stock_search?search_term=${searchTerm}&${other}&api_token=${API_KEY}`);
    return result.data.data;
  }
}


export default StockAPI;