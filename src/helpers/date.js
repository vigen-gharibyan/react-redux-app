var moment = require('moment');

export const date = {
  format: (date, format) => {
    if (!format) {
      format = 'DD.MM.YYYY';
    }

    date = moment(date).format(format);

    return date;
  }
}