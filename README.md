
A React stock tracking web application. 

Users can search stocks and view React-vis graphs to track daily, weekly, or monthly changes. 

Users have the ability to follow/unfollow stocks.

### Component Architecture

```
App
│
├─┬ Navigation
└─┬ Routes
  ├─┬ Home
  │ ├── SearchForm
  │ └─┬ Results
  │   └── Row
  ├─┬ Search
  │ ├── SearchForm
  │ └─┬ Results
  │   └── Row
  └─┬ Stock
    ├── StockHeader
    ├─┬  Graph
    │ └── Chart
    └── StockFooter

```

### Deployment

On localhost:3000
```
npm i
npm start
```
