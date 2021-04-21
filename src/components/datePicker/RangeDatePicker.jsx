import React, { Component } from 'react';
import classnames from 'classnames';
import {
  startOfDay,
  endOfDay,
  subDays,
  startOfYear,
  endOfYear,
  addDays,
  isToday,
  isYesterday,
  differenceInDays,
} from 'date-fns'

import { DateRange } from 'react-date-range';
import { es } from 'react-date-range/dist/locale';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './datepicker.css'; // theme css file

const periods = [
  {
    period: 'TODAY',
    label: 'Hoy'
  },
  {
    period: 'YESTERDAY',
    label: 'Ayer'
  },
  {
    period: 'WEEK',
    label: 'Últimos 8 días'
  },
  {
    period: 'YEAR',
    label: 'Año'
  }
]

class RangeDatePicker extends Component {

  static propTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.container = React.createRef();

    this.state = {
      selectedRages: {
        startDate: subDays(new Date(), 8),
        endDate: endOfDay(new Date()),
        key: 'selection',
      },
      selectedPeriod: 'WEEK',
    }
  }

  resetState = () => {
    this.onSelectPeriod('WEEK')
  }

  getContainerRef = () => {
    return this.container.current;
  }

  bindDocumentListeners = () => {
    if (!this.documentClickListener) {
      this.documentClickListener = (event) => {
        if (this.selfClick)
          this.selfClick = false;
        else
          this.hide(event);
      };

      document.addEventListener('click', this.documentClickListener);
    }
  }

  unbindDocumentListeners = () => {
    if (this.documentClickListener) {
      document.removeEventListener('click', this.documentClickListener);
      this.documentClickListener = null;
    }
  }


  show = (event) => {
    //DOMHandler.absolutePosition(this.getContainerRef(), event.currentTarget)

    // this.bindDocumentListeners();

    if (this.getContainerRef()) {
      this.getContainerRef().style.display = 'block';
    }
  }

  hide = () => {
    this.getContainerRef().style.display = 'none';

    this.unbindDocumentListeners();
    this.selfClick = false;
    this.resetState();
  }

  toggle = (event) => {
    if (this.getContainerRef().offsetParent) {
      this.hide(event);
    } else {
      this.show(event);
    }
  }

  onClickSelf = () => {
    if (this.documentClickListener) {
      this.selfClick = true;
    }
  }

  onSelectRange = (ranges) => {
    let period = null;

    const {
      startDate,
      endDate,
    } = ranges.selection;

    if (isToday(startDate) && isToday(endDate)) {
      period = 'TODAY';
    }

    if (isYesterday(startDate) && isYesterday(endDate)) {
      period = 'YESTERDAY';
    }


    this.setState({
      selectedRages: ranges.selection,
      selectedPeriod: period,
    });
  }

  onSelectPeriod = (period) => {

    let startDate;
    let endDate;

    switch (period) {
      case 'TODAY':
        startDate = startOfDay(new Date());
        endDate = endOfDay(new Date());
        break;
      case 'YESTERDAY':
        startDate = startOfDay(addDays(new Date(), -1));
        endDate = startOfDay(addDays(new Date(), -1));
        break;
      case 'WEEK':
        startDate = subDays(new Date(), 8);
        endDate = endOfDay(new Date());
        break;
      case 'YEAR':
        startDate = startOfYear(new Date());
        endDate = endOfYear(new Date());
        break;
    }


    this.setState({
      selectedPeriod: period,
      selectedRages: {
        startDate,
        endDate,
        key: 'selection',
      },
    })
  }


  onApplyFilter = () => {
    const {
      selectedPeriod,
    } = this.state;

    const {
      startDate,
      endDate,
    } = this.state.selectedRages;

    this.props.onFilter(selectedPeriod, startDate, endDate);
    this.hide();
  }

  render() {
    const {
      isLoading,
    } = this.props;

    const {
      selectedRages,
      selectedPeriod,
    } = this.state;

    const {
      startDate,
      endDate,
    } = selectedRages;


    return (
      <React.Fragment>
        <div
          ref={this.container}
          onClick={this.onClickSelf}
          className='picker-container'
        >
          <div className='picker-content d-flex w-100'>
            <DateRange
              dateDisplayFormat='dd-MM-yyyy'
              color='#5916bc'
              showSelectionPreview={false}
              locale={es}
              ranges={[selectedRages]}
              months={2}
              onChange={this.onSelectRange}
              direction={'horizontal'}
            />

            <div className='ranged-filter'>
              <p className='text-muted title-muted'>Periodos definidos</p>
              {
                periods.map(p =>
                  <Period
                    {...p}
                    key={p.period}
                    onSelectPeriod={this.onSelectPeriod}
                    isSelected={selectedPeriod === p.period}
                  />
                )
              }
            </div>
          </div>

          <div className='container border-top'>
            <div className='row py-2'>
              <div className='col-6'>
                <button
                  type='button'
                  className='btn btn-transparent ranged-title'
                  onClick={this.hide}
                >
                  Cancelar
                </button>
              </div>
              <div className='col-6 text-right'>
                <div className='d-none d-md-inline pr-4 title-muted'>
                  <span className='text-muted'>Seleccionado:&nbsp;</span>
                  <span>
                    {differenceInDays(endDate, startDate) + 1} días
                  </span>
                </div>
                <button
                  className='btn btn-primary ranged-title'
                  onClick={this.onApplyFilter}
                  disabled={isLoading}
                  type='button'
                >
                  Listo
                  {isLoading &&
                    <span className='fa fa-spinner fa-spin ml-1' />
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .picker-container {
            background-color: #fff;
            border: 1px solid #0000000D;
            border-radius: 8px;
            display: none;
            overflow-y: auto;
            position: absolute;
            width: max-content;
            z-index: 3000;
            box-shadow: 0px 2px 13px #00000053;
          }
          .picker-content {
            flex-direction: row;
          }
          .ranged-filter{
            padding: 20px 50px 20px 20px;
            border-left: 1px solid #dee2e6!important;
          }
          .title-muted{
            font-size: 12px;
          }
          .ranged-title{
            font-size: 13px;
          }
          @media screen and (max-width: 768px){
            .picker-content {
              flex-direction: column-reverse;
            }
            .ranged-filter{
              padding: 20px 20px 0px 20px;
              border-left: none;
              border-bottom: 1px solid #dee2e6!important;
            }
          }
        `}</style>
      </React.Fragment >
    )
  }
}


const Period = (props) => {
  const {
    isSelected,
    period,
    label,
    onSelectPeriod,
  } = props;

  const csPeriod = classnames('type13 pointer mb-2 p-2', {
    'selected': isSelected,
  });

  return (
    <div
      role='button'
      tabIndex={0}
      onClick={() => onSelectPeriod(period)}
      className={csPeriod}
    >
      {label}

      <style jsx>{`
        .selected {
          background-color: #5916bc;
          color: #FFFFFF;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}

export default RangeDatePicker;
