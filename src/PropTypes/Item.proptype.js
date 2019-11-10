import TickerType from './Ticker.proptype'
import PropTypes from 'prop-types'

export default PropTypes.shape({
    currency: PropTypes.string,
    date: PropTypes.date,
    best: PropTypes.shape({
        buy: TickerType,
        sell: TickerType,
        profit: PropTypes.number
    })
})