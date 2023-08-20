export let pageContext = window.contextUrl;

export function convertNumberToCurrency(number) {
    // MYR
    return new Intl.NumberFormat('en-MY', {
        style: 'currency',
        currency: 'MYR'
    }).format(number);
}


export function calculateFt(width) {
    let ft = width/304.8;
    return Number(ft.toFixed(2));
}

export function calculateTotalPriceWithFT(width, unitPrice) {
   let ft = calculateFt(width);
    return Number((ft * unitPrice).toFixed(2));
}

export function calculateFtTypeTotalPriceWithQuantity(quantity, unitPrice) {
    return Number((quantity * unitPrice).toFixed(2));
}

export function formatServiceName(descriptionEnglish, descriptionChinese) {
    if (!descriptionEnglish) {
        return descriptionChinese;
    } else if (!descriptionChinese) {
        return descriptionEnglish;
    }
    return `${descriptionEnglish} / ${descriptionChinese}`
}

export function showLoader() {
    $("#loader").show();
}

export function hideLoader() {
    $("#loader").hide();
}
