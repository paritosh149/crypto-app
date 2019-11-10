import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { fetchItems, closeError } from './actions/actions'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Snackbar from '@material-ui/core/Snackbar'
import Slide from '@material-ui/core/Slide'

import ProfitDisplayBox from './components/ProfitDisplayBox'

import ItemType from './PropTypes/Item.proptype'

export class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    render() {
        return (
            <Container maxWidth="xs">
                <Box my={4}>
                    <Typography variant="h6" component="h4" gutterBottom>
            Crypto Best Profit Finder
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={this.props.isFetching}
                        onClick={this.props.fetchItems}
                    >
            Fetch Data
                    </Button>
                    <br /> <br />
                    <Grid container spacing={3}>
                        {this.props.items.length > 0 &&
              this.props.items.map(item => (
                  <ProfitDisplayBox key={item.currency} item={item} />
              ))}
                        { this.props.isError &&
              this.props.isOpen && (
                            <Snackbar
                                open={true}
                                onClose={this.props.closeError}
                                TransitionComponent={props => (
                                    <Slide {...props} direction="up" />
                                )}
                                ContentProps={{
                                    'aria-describedby': 'message-id'
                                }}
                                message={
                                    <span id="message-id">
                      Error:{this.props.error.message}
                                    </span>
                                }
                            />
                        )}
                    </Grid>
                </Box>
            </Container>
        )
    }
}

App.propTypes = {
    isFetching: PropTypes.bool,
    fetchItems: PropTypes.func,
    items: PropTypes.arrayOf(ItemType),
    isOpen: PropTypes.bool,
    isError: PropTypes.bool,
    closeError: PropTypes.func,
    error: PropTypes.any
}

function mapStateToProps(state) {
    const { isFetching, items, isOpen, error, isError } = state || {
        isFetching: true,
        items: [],
        isOpen: false,
        isError: false
    }
    return { isFetching, items, isOpen, error, isError }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchItems: event => dispatch(fetchItems()),
        closeError: () => dispatch(closeError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
