import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { DateTime } from 'luxon'

import { DATE_FORMAT } from '../../config/config'

import Ticker from '../Ticker/Ticker'

import ItemProptype from '../../PropTypes/Item.proptype'

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        background: '#888888',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    pos: {
        marginBottom: 12,
        fontWeight: 'bold'
    },
})

export default function ProfitDisplayBox(props) {
    const classes = useStyles()
    return (
        <Grid item>
            <Card className={classes.card}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        {DateTime.fromISO(props.item.date).toFormat(DATE_FORMAT)}
                    </Typography>
                    <Typography className={classes.pos} color="textPrimary">
                        {props.item.currency}
                    </Typography>
                    <Grid container spacing={3}>
                        <Ticker
                            title={'Buy'}
                            symbol={'$'}
                            time={props.item.best.buy.time}
                            price={props.item.best.buy.price}
                        />
                        <Ticker
                            title={'Sell'}
                            symbol={'$'}
                            time={props.item.best.sell.time}
                            price={props.item.best.sell.price}
                        />
                        <br />
                        <Grid item xs={12}>
                            <Typography color="textPrimary">
                Profit ${props.item.best.profit}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}

ProfitDisplayBox.propTypes = {
    item: ItemProptype
}
