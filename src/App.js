import React from 'react';

import { connect } from 'react-redux';
import { fetchItems, fetchData } from './actions/actions'

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProfitDisplayBox from './components/ProfitDisplayBox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.fetcherClickHandler = this.fetcherClickHandler.bind(this);
  }

  fetcherClickHandler = async (evt) => {
    const { dispatch } = this.props
    dispatch(fetchItems())
  }
  render() {
    return (
      <Container maxWidth="xs">
        <Box my={4}>
          <Typography variant="h6" component="h4" gutterBottom>
            Crypto Best Profit Finder
        </Typography>
          <Button variant="contained" color="primary" disabled={this.props.isFetching} onClick={this.fetcherClickHandler} >
            Fetch Data
        </Button>
          <br/> <br/>
          <Grid container spacing={3}>
            {this.props.items && this.props.items.map(item => <ProfitDisplayBox key={item.currency} item={item} />)}
          </Grid>
        </Box>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  const { isFetching, items } = state || {
    isFetching: true,
    items: []
  }
  return { isFetching, items }
}

export default connect(mapStateToProps)(App)