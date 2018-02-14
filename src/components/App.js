import React, { Component } from 'react'
import { Container, Row, Col, Input, Button, Form, FormGroup } from 'reactstrap'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import '../styles/App.css'

class App extends Component {
  _handleLatitude = (e) => {
    this.setState({
      longitude: e.target.value
    })
  }

  _handleLongitude = (e) => {
    this.setState({
      latitude: e.target.value
    })
  }

  _handleSubmit = async (e) => {
    e.preventDefault()
    const { latitude: lat, longitude: long } = this.state
    this.props.data.refetch({
      variables: { lat, long },
    })
  }

  render () {
    console.log(this.props)
    const {data} = this.props
    if (data && data.loading) {
      return (
        <Container>
          <h1>Loading...</h1>
        </Container>
      )
    }

    if (data && data.error) {
      return <Container>
        <h1>{data.error.message}.</h1>
      </Container>
    }

    let {summary, temperature, apparentTemperature, uvIndex, humidity, timezone} = data.now_weather

    return (
      <div className='App'>
        <header className='App-header'>
          <Container>
            <h1 className='App-title'>Weatherooooo</h1>
          </Container>
        </header>
        <Container className='main'>
          <Row>
            <Col sm='12' md={{ size: 6, offset: 3 }}>
              <h2 className='display-4'>{timezone} is {summary}</h2>
              <dl>
                <dt>Temperature</dt>
                <dd>{temperature}&deg;C (but feels like {apparentTemperature}&deg;C)</dd>
                <dt>UV Index</dt>
                <dd>{uvIndex}</dd>
                <dt>Humidity</dt>
                <dd>{humidity}</dd>
              </dl>
            </Col>
          </Row>
          <Row>
            <Col sm='12' md={{ size: 6, offset: 3 }}>
              <Form inline onSubmit={this._handleSubmit}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Input type="text"
                    name="longitude"
                    placeholder="Longitude"
                    onChange={this._handleLongitude}
                  />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Input type="text"
                    name="latitude"
                    placeholder="Latitude"
                    onChange={this._handleLatitude}
                  />
                </FormGroup>
                <Button>Search</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const WEATHER_QUERY = gql`
  query NowWeather {
    now_weather {
      temperature
      apparentTemperature
      summary
      uvIndex
      humidity
      timezone
    }
  }
`

export default graphql(WEATHER_QUERY)(App)
