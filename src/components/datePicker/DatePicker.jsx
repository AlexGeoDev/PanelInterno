import React, { Component } from 'react';
import PickerButton from './PickerButton';
import RangeDatePicker from './RangeDatePicker';
import { format } from 'date-fns';

class DatePicker extends Component {

  state = {
    selectedDateLabel: 'Últimos 8 días',
  }

  componentDidUpdate = (prevProps) => {

    if (prevProps.isLoading && !this.props.isLoading) {
      this.datePicker.hide();
    }
  }

  getPeriodLabel = (period) => {
    switch (period) {
      case 'TODAY':
        return 'Hoy';
      case 'YESTERDAY':
        return 'Ayer';
      case 'WEEK':
        return 'Últimos 8 días';
      case 'YEAR':
        return 'Año';
    }
  }

  onFilter = (period = null, startDate, endDate) => {

    if (period) {
      this.setState({
        selectedDateLabel: this.getPeriodLabel(period),
      });

      this.props.onFilterPeriod(
        format(startDate, 'yyyy-MM-dd'),
        format(endDate, 'yyyy-MM-dd')
      );
    } else {
      this.setState({
        selectedDateLabel: `${format(startDate, 'dd. MM. YYY')} - ${format(endDate, 'dd. MM. YYY')} `,
      });

      this.props.onFilterRange(format(startDate, 'yyyy-MM-dd'), format(endDate, 'yyyy-MM-dd'));
    }
  }

  render() {
    const {
      selectedDateLabel,
    } = this.state;

    return (
      <React.Fragment>
        <PickerButton
          dateLabel={selectedDateLabel}
          onClick={e => {
            this.datePicker.toggle(e)
          }}
        />

        <RangeDatePicker
          ref={el => this.datePicker = el}
          onFilter={this.onFilter}
          isLoading={this.props.isLoading}
        />
      </React.Fragment>
    );
  }
}

export default DatePicker;
