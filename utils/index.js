export function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

export function formatPrice(price) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0, minimumFractionDigits: 0, }).format(price)
}