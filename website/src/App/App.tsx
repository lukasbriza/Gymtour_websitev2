//COMPONENTS//
import { Menu } from '../Components/Menu'
//CONTEXT//
import { AnimationContextProvider, AppContextProvider } from './Context'
//ANIMATIONS//
import '../config/animationRegistration.js';
//ROUTER//
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { PageRoutes } from './PageRoutes'
//BROWSER HISTORY//
const history = createBrowserHistory()


function App() {

  return (
    <AppContextProvider>
      <AnimationContextProvider>
        <div id="App">
          <Router history={history}>
            <Menu />

            <PageRoutes />

          </Router>
        </div>
      </AnimationContextProvider>
    </AppContextProvider>
  );
}

export default App;

/*
TO-DO

-crossroad stránka
-lazy load routes viz documentation
-footer
-server data collection preparation
-log in preparation
-register form sucess message
-scrollbar styling
-form data processing
*/