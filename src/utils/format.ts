export class Format {

    static formatCurrency(value: number | string): string {
        if (typeof value === 'string') {
            return this.formatCurrency(parseFloat(value));
        }
        return value.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' });
    }

    static formatDate(date: string): string {
        return new Date(date).toLocaleDateString('ru-RU');
    }


}