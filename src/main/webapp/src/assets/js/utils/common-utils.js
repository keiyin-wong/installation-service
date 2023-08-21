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

export function calculateTotalPriceWithQuantity(quantity, unitPrice) {
    return Number((quantity * unitPrice).toFixed(2));
}

/**
 *
 * @param {number} width - the width of the order detail
 * @param {number} height - the height of the order detail
 * @param {number} unitPrice - the unit price of the order detail
 * @returns {number} - the total price of the order detail, truncated to 2 decimal places. Not rounded.
 */
export function calculateTotalPriceWithPingFeng(width, height, unitPrice) {
    let ftWidth = calculateFt(width);
    let ftHeight = calculateFt(height);
    return Number(Math.floor(ftWidth * ftHeight * unitPrice * 100)/100);
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
