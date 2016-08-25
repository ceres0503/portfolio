import React from 'react';
import CoffeeStore from "../stores/coffee-store";
import * as CoffeeActions from "../actions/coffee-actions";

export default class CoffeeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coffees: [],
      subscribedCoffeeId: 0
    };

    CoffeeActions.loadCoffee({coffeeId: this.props.coffeeId});
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    CoffeeStore.addChangeListener(this._onChange);
    //this._getCoffeeDataIfNeeded(this.props);
  }

  componentWillUnmount() {
    CoffeeStore.removeChangeListener(this._onChange);
  }

  // componentWillReceiveProps(nextProps) {
  //   this._getCoffeeDataIfNeeded(nextProps);
  // }

  _onChange() {
    const coffees = CoffeeStore.getAll();
    this.setState({coffees: coffees});
  }

  render() {
    const {coffees} = this.state;
    if (coffees.length) {
      const coffee = coffees[0];
      return (
          <div id="coffee-detail" className="container">
            <div className="container col-sm-4">
              <img src={coffee.image[0]} className="img-responsive block-center"/>
              <h2 className="text-left">{coffee.name}</h2>
              <p className="text-left">
                <span className="label label-info">{coffee.origin.name}</span>
              </p>
              <p>
                <a className="btn btn-primary btn-lg" href="#" role="button" onClick={this._handleSubscribe.bind(this, coffee)}>Subscribe Me!</a>
              </p>
            </div>
            <div className="container col-sm-8 text-left">
              <h3>{coffee.description}</h3>
            </div>
          </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }

  _handleSubscribe(coffee, event) {
    event.preventDefault();
    this.setState({subscribedCoffeeId: coffee.id});
  }
}
