import moment from 'moment';

export function getFormattedDate(originalDate) {
  let formattedDate;

  if (originalDate && typeof originalDate === 'string') {
    const date = moment(originalDate.toUpperCase()).local();

    formattedDate = date.format('DD-MM-YYYY HH:mm');
  }

  return formattedDate;
}
