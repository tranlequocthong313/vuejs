import { DateTime } from 'luxon'
import moment from 'moment'

export const luxonDeserialize = (date) => {
    return {
        year: date.get('year'),
        month: date.get('month'),
        day: date.get('day'),
    }
}

export const luxonSerialize = (date) => {
    try {
        const obj = DateTime.fromObject(date)
        if (!obj.isValid) {
            return
        }
    } catch (error) {
        return
    }
    return DateTime.fromObject(date)
}

export const momentDeserialize = (date) => {
    const { years, months, date: _date } = date.toObject()
    return { year: years, month: months, day: _date }
}

export const momentSerialize = (date) => {
    return moment().set(date)
}
