import { Route } from 'react-router-dom'
import { HomePage, LandingPage, DetailPage, FormPage } from './views'
import NavBar from './components/NavBar/NavBar'

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route
        path="/home"
        render={() => (
          <>
            <NavBar />
            <HomePage />
          </>
        )}
      />
      <Route
        exact
        path="/detail/:id"
        render={() => (
          <>
            <NavBar />
            <DetailPage />
          </>
        )}
      />
      <Route
        exact
        path="/create"
        render={() => (
          <>
            <NavBar />
            <FormPage />
          </>
        )}
      />
    </div>
  )
}

export default App
