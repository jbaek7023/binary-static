import React        from 'react';
import PropTypes    from 'prop-types';
import Button       from '../../../components/form/button.jsx';
import { connect }  from '../../../store/connect';
import { localize } from '../../../../_common/localize';

const Purchase = ({
    trade_types,
}) =>  {
    console.log('hello world');
    console.log(trade_types);
    return (
        <fieldset>
            {Object.keys(trade_types).map((type, idx) => (
                <Button
                    key={idx}
                    id={`purchase_${type}`}
                    className='primary green'
                    has_effect
                    text={`${localize('Purchase')} ${trade_types[type]}`}
                />
            ))}
        </fieldset>
    );
}

Purchase.propTypes = {
    trade_types: PropTypes.object,
};

export default connect(
    ({trade}) => ({
        trade_types: trade.trade_types,
    })
)(Purchase);
