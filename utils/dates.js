import moment from 'moment'

moment.locale('id')

export const formatDate = (date, format = 'DD MMMM YYYY') => moment(date).format(format)