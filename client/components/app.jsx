import React from 'react';
import Header from './header';
import ProductList from './product-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const statusMessage = this.state.isLoading
      ? <p>Testing connections...</p>
      : <p>{this.state.message}</p>;

    return (
      <div>
        <Header title={'Wicked Sales'}/>
        <ProductList />
        { statusMessage }
      </div>
    );
  }
}
