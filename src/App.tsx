import './App.css'
import Current from './components/current/Current'
import Topbar from './components/topbar/Topbar'
import RecentSearches from './components/recentSearches/RecentSearches'
import Hourly from './components/hourly/Hourly'
import ForeCast from './components/foreCast/ForeCast'
import Search from './components/search/Search'
import { useSelector } from 'react-redux'

function App() {
  const { theme } = useSelector((store: any) => store.weather)
  return (
    <>
      <div className={theme}>
        <Topbar />
        <div className="container">
          <div className="main-section">
            <Search />
            <Current />
            <Hourly />
            <ForeCast />
          </div>
          <div className="search-section">
            <RecentSearches />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
