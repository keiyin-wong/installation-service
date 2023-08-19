export let pageContext = window.contextUrl;

export function convertNumberToCurrency(number) {
    // MYR
    return new Intl.NumberFormat('en-MY', {
        style: 'currency',
        currency: 'MYR'
    }).format(number);
}