import { parse, format as dataFnsFormat } from 'date-fns';

export const DATE_FORMAT = 'dd.MM.yyyy';
export const NATIVE_DATE_FORMAT = 'yyyy-MM-dd';
export const DATE_MASK = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];

export const isCompleteDateInput = (input: string) => input.length === DATE_MASK.length;

export const formatDate = (date: Date | number, dateFormat = DATE_FORMAT) =>
    dataFnsFormat(date, dateFormat);

export const parseDateString = (value: string, dateFormat = DATE_FORMAT) =>
    parse(value, dateFormat, new Date());

// TODO: скорее всего, можно сделать проще
export const format = (value: string): string =>
    value
        .replace(/^(\d\d)(\d)$/, '$1.$2')
        .replace(/^(\d\d)\.(\d\d)(\d)$/, '$1.$2.$3')
        .replace(/^(\d\d)\d\.(.*)/, '$1.$2')
        .replace(/^(\d\d\.\d\d)\d\.(.*)/, '$1.$2')
        .replace(/^(\d\d\.\d\d\.\d\d\d\d).*/, '$1')
        .replace(/\.$/, '');

export const validate = (value: string): boolean => {
    const [d, m, y] = value.split('.');

    const day = Number(d);
    const month = Number(m);
    const year = Number(y);

    // TODO: сделать более умную валидацию
    if (day > 31 || month > 12 || year > 2100) {
        return false;
    }

    return true;
};
