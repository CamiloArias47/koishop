export function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

export function formatPrice(price) {
    const formatOptions = { style: 'currency', currency: 'COP', maximumFractionDigits: 0, minimumFractionDigits: 0, }
    return new Intl.NumberFormat('es-CO', formatOptions).format(price)
}

export function formatDate(seconds){
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const until = new Date(seconds * 1000)
    const date = new Intl.DateTimeFormat('es-CO', options).format(until)
    return date
}

export function createProductPath(name){
    return name.replace(/\s/g,'-')
}

export function cleanGionsInName(name){
    return name.replace('-',' ')
}

export function enviroment(){
    let env

    if(process.env.ENVIRONMENT !== undefined){
        env = process.env.ENVIRONMENT
    }

    if(typeof window !== 'undefined'){
        env = (window.location.hostname === 'koimakeup.com') ? 'PRODUCTION' : 'development'
    }

    return env
}
