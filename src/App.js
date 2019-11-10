import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { fetchItems } from './actions/actions'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import ProfitDisplayBox from './components/ProfitDisplayBox'

import ItemType from './PropTypes/Item.proptype'

export class App extends React.Component {
    render() {
        return (
            <Container maxWidth="xs">
                <Box my={4}>
                    <Typography variant="h6" component="h4" gutterBottom>
            Crypto Best Profit Finder
                    </Typography>
                    <Button variant="contained" color="primary" disabled={this.props.isFetching} onClick={this.props.fetchItems} >
            Fetch Data
                    </Button>
                    <br /> <br />
                    <Grid container spacing={3}>
                        {this.props.items && this.props.items.map(item => <ProfitDisplayBox key={item.currency} item={item} />)}
                    </Grid>
                </Box>
            </Container>
        )
    }
}

App.propTypes = {
    isFetching: PropTypes.bool,
    fetchItems: PropTypes.func,
    items: PropTypes.arrayOf(ItemType)
}

function mapStateToProps(state) {
    const { isFetching, items } = state || {
        isFetching: true,
        items: []
    }
    return { isFetching, items }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchItems: event => dispatch(fetchItems())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)