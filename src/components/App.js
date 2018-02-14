import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import '../styles/App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currently: {},
      timezone: ''
    }
  }

  _convertToCelcius(degree) {
    const celcius = ((degree - 32) * 5) / 9
    return Math.round(celcius)
  }

  render() {
    if (!this.state.timezone) {
      return (
        <Container>
          Loading...
        </Container>
      )
    }

    let {currently, timezone} = this.state
    let {summary, temperature, apparentTemperature, uvIndex, humidity} = currently

    return (
      <div className="App">
        <header className="App-header">
          <Container>
            <h1 className="App-title">Welcome to React</h1>
          </Container>
        </header>
        <Container className="main">
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <h2 className="display-4">{timezone} is {summary}</h2>
              <dl>
                <dt>Temperature</dt>
                <dd>{this._convertToCelcius(temperature)}&deg;C (but feels like {this._convertToCelcius(apparentTemperature)}&deg;C)</dd>
                <dt>UV Index</dt>
                <dd>{uvIndex}</dd>
                <dt>Humidity</dt>
                <dd>{humidity}</dd>
              </dl>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  componentDidMount = async () => {
    const API_URL = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/30d7debaeabdcdba68fce0dbd85769a2/1.352083,103.819836'
    const response = await fetch(API_URL)
    const { currently, timezone } = await response.json()

    console.log( currently, timezone )

    this.setState({
      currently,
      timezone
    })
  }
}

export default App;
