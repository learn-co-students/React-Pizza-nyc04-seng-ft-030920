import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const API = 'http://localhost:3000/pizzas'
class App extends Component {
  state = {
    pizzas: [],
    form: {
      topping: '',
      size: 'Small',
      vegetarian: true
    }
  }

  componentDidMount() {
    fetch(API)
    .then(r => r.json())
    .then(pizzas => this.setState({pizzas: pizzas}))
  }

  updateForm = (e) => {
    e.persist()
    this.setState(prevState => {
      let pizza = prevState.form
      if(e.target.name === 'vegetarian'){
        pizza[e.target.name] = e.target.value === 'true'
        return {form: pizza}
      }
      pizza[e.target.name] = e.target.value
      return {
        form: pizza
      }
    }
    )
  }

  submitPizza = () => {
    fetch(API, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state.form)
    })
    .then(r => r.json())
    .then(newPizza => this.setState(prevState => {
      return {
        pizzas: [...prevState.pizzas, newPizza]
      }
    }))
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm form={this.state.form} updateForm={this.updateForm} submitPizza={this.submitPizza}/>
        <PizzaList pizzas={this.state.pizzas}/>
      </Fragment>
    );
  }
}

export default App;
