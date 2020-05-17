import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  state = {
    pizzas: [],
    pizzaToEdit: ""
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
      .then(r => r.json())
      .then(pizzaArray => {this.setState({pizzas: pizzaArray})})
  }

  handleEdit = (pizza) => {
    this.setState({pizzaToEdit: pizza})
  }

  handleEditState = (e) => {
    let {name, value} = e.target
    let newPizza = {...this.state.pizzaToEdit}
    if (name === 'vegetarian') {
      newPizza.vegetarian = !newPizza.vegetarian
    } else {
      newPizza[name] = value
    }
    this.setState({pizzaToEdit: newPizza})
  }

  handleSubmit = () => {
    fetch(`http://localhost:3000/pizzas/${this.state.pizzaToEdit.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state.pizzaToEdit)
    })
      .then(r => r.json())
      .then(editedPizza => {
        let editedPizzaIndex = this.state.pizzas.findIndex(pizza => pizza.id === editedPizza.id)
        let newPizzas = [...this.state.pizzas]
        newPizzas.splice(editedPizzaIndex, 1, editedPizza)
        this.setState({pizzas: newPizzas})
      })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizzaToEdit={this.state.pizzaToEdit} editState={this.handleEditState} submit={this.handleSubmit}/>
        <PizzaList pizzas={this.state.pizzas} pizzaEdit={this.handleEdit}/>
      </Fragment>
    );
  }
}

export default App;
