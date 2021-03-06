import { connect } from 'react-redux';
import React from 'react';
import { grocerySelectedAction } from '../../actions/groceriesActions';

class GroceryList extends React.Component {

  className(id) {
    return `grocery-panel panel panel-default ${this.props.selectedGrocery === id ? 'active' : ''}`
  }

  boxesAvailable(boxes, groceryId) {
    let groceryBoxes = boxes.filter( box => {
      if (groceryId === box.grocery_id && box.package_id === null) {
        return box;
      }
    });
    return groceryBoxes.length
  }

  render() {
    return (
      <div>
        {
          this.props.groceries.map(grocery => (
            <div key={grocery.id} className="col-md-3" onClick={this.props.selectGrocery(grocery.id)}>
              <div className={this.className(grocery.id)}>
                 <div className = "panel-heading shelter-grocery-pnl">
                  {grocery.name}
                 </div>
                <img className="panel-img" src={`/pictures/groceries/${grocery.picture}`} alt="Grocery Image"/>
                <div className = "panel-body">
                  <dl>
                    <dt>Boxes Available:</dt>
                    <dd>{this.boxesAvailable(this.props.boxes, grocery.id)}</dd>
                    <dt>Pickup hours:</dt>
                    <dd>{grocery.pickup_hours}</dd>
                  </dl>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  groceries: state.groceries,
  selectedGrocery: state.selectedGrocery,
  boxes: state.boxes
});

const mapDispatchToProps = (dispatch) => ({
  selectGrocery(id) {
    return () => dispatch(grocerySelectedAction(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GroceryList);