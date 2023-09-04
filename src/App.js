// App.js 
import { useReducer } from 'react';
import { RootContext } from './components/utils/context';

import { Container, Row, Col } from 'react-bootstrap';
import Events from './components/events/Events';
import CalForm from './components/form/Form';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const date = new Date();

function App() {

  function reducer(state, action) {
    switch (action.type) {
      case 'title':
        return {...state, title: action.payload}
      case 'location':
        return {...state, location : action.payload}
      case 'description':
        return {...state, description: action.payload}
      case 'timeZone':
        return {...state, timeZone: action.payload}
      case 'allDay':
        return {...state, allDay: action.payload}
      case 'start':
        return { ...state, start: action.payload }
      case 'end':
        return {...state, end: action.payload}
      case 'updated':
        return {...state, updated: action.payload}
      default:
        return state;
    }
  }

  const initialState = {
    title: `Trip to 123 sesame street!`,
    location: '1900 Broadway, New York, NY 10023, United States',
    description: `Can you tell me how to get to Sesame Street?. Yes, Sesame Street is real, but it's inside a television studio in New York. And, no, we can't visit without special permission, and we can't go right now. Please stop asking so many questions, and put your socks back on!`,
    timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone,
    allDay: false,
    start: date,
    end: date,
    updated: false
  }

  const [rootState, dispatch] = useReducer(reducer, initialState);

  return (
    <RootContext.Provider value={{ rootState, dispatch }} className='app'>
      <Container>
        <Row className="justify-content-md-center mt-5 mb-5">
          <Col md={5} className='me-3 mb-5 pt-2'>
            <CalForm />
          </Col>
          <Col md={5} className='pt-2'>
            <Events />
          </Col>
        </Row>        
      </Container>      
    </RootContext.Provider>
  );
}

export default App;