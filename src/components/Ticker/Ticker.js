import React from 'react';
import Grid from '@material-ui/core/Grid';
import { DateTime } from 'luxon';

export default function Ticker(props) {
  return (
    <Grid item xs={6}>
      <b>{props.title}</b>
      <br />
      {props.symbol}
      {props.price}
      <br />
      {DateTime.fromISO(props.time).toFormat('hh:mm a')}
    </Grid>
  );
}