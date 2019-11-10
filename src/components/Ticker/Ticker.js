import React from 'react'
import Grid from '@material-ui/core/Grid'
import { DateTime } from 'luxon'
import PropTypes from 'prop-types'

import { TIME_FORMAT } from '../../config/config'

export default function Ticker(props) {

    return (
        <Grid item xs={6}>
            <b>{props.title}</b>
            <br />
            {props.symbol}
            {props.price}
            <br />
            {DateTime.fromISO(props.time).toFormat(TIME_FORMAT)}
        </Grid>
    )
}

Ticker.propTypes = {
    title: PropTypes.string,
    symbol: PropTypes.string,
    price: PropTypes.string,
    time: PropTypes.string
}