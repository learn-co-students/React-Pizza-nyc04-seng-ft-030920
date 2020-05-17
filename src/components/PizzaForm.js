import React from "react"

const PizzaForm = (props) => {
  return(
      <div className="form-row">
        <div className="col-5">
            <input 
              type="text"
              className="form-control"
              placeholder="Pizza Topping"
              name="topping"
              value={props.pizzaToEdit.topping}
              onChange={(e) => props.editState(e)}
            />
        </div>
        <div className="col">
          <select 
            className="form-control"
            name="size"
            value={props.pizzaToEdit.size}
            onChange={(e) => props.editState(e)}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" name="vegetarian" value="Vegetarian" checked={props.pizzaToEdit.vegetarian} onChange={(e) => props.editState(e)}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="vegetarian" value="Not Vegetarian" checked={!props.pizzaToEdit.vegetarian} onChange={(e) => props.editState(e)}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={props.submit}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
