import React, {PropTypes} from 'react';
import CommonMixin from '../mixin/CommonMixin';
import Header from './Header';
import Combobox from './Combobox';

function noop() {
}

function generateOptions(length) {
  return Array.apply(null, {length: length}).map((item, index) => {
    return index;
  });
}

const Panel = React.createClass({
  propTypes: {
    prefixCls: PropTypes.string,
    value: PropTypes.object,
    locale: PropTypes.object,
    placeholder: PropTypes.string,
    gregorianCalendarLocale: PropTypes.object,
    formatter: PropTypes.object,
    hourOptions: PropTypes.array,
    minuteOptions: PropTypes.array,
    secondOptions: PropTypes.array,
    onChange: PropTypes.func,
    onEsc: PropTypes.func,
    allowEmpty: PropTypes.bool,
    showHour: PropTypes.bool,
    showSecond: PropTypes.bool,
    onClear: PropTypes.func,
  },

  mixins: [CommonMixin],

  getDefaultProps() {
    return {
      hourOptions: generateOptions(24),
      minuteOptions: generateOptions(60),
      secondOptions: generateOptions(60),
      onChange: noop,
      onClear: noop,
    };
  },

  getInitialState() {
    return {
      value: this.props.value,
    };
  },

  componentWillReceiveProps(nextProps) {
    const value = nextProps.value;
    if (value) {
      this.setState({
        value,
      });
    }
  },

  onChange(newValue) {
    this.setState({ value: newValue });
    this.props.onChange(newValue);
  },

  onClear() {
    this.props.onClear();
  },

  render() {
    const { locale, prefixCls, placeholder, hourOptions, minuteOptions, secondOptions, allowEmpty, showHour, showSecond, formatter, gregorianCalendarLocale } = this.props;
    const value = this.state.value;
    return (
      <div className={`${prefixCls}-inner`}>
        <Header
          prefixCls={prefixCls}
          gregorianCalendarLocale={gregorianCalendarLocale}
          locale={locale}
          value={value}
          onEsc={this.props.onEsc}
          formatter={formatter}
          placeholder={placeholder}
          hourOptions={hourOptions}
          minuteOptions={minuteOptions}
          secondOptions={secondOptions}
          onChange={this.onChange}
          onClear={this.onClear}
          allowEmpty={allowEmpty}
        />
        <Combobox
          prefixCls={prefixCls}
          value={value}
          gregorianCalendarLocale={gregorianCalendarLocale}
          formatter={formatter}
          onChange={this.onChange}
          showHour={showHour}
          showSecond={showSecond}
          hourOptions={hourOptions}
          minuteOptions={minuteOptions}
          secondOptions={secondOptions}
        />
      </div>
    );
  },
});

export default Panel;