export const colors = {
    primaryUltraDim : '#fff1f1',
    primaryDim:'#d2aeae', 
    primary: '#cf9696',
    primaryDark: '#9e7070',
    alert: '#ffdab0',
    alertDark: '#f5982e',
    red:'#ad4646',
    white: '#fff',
    whiteBone: '#f6f6f6',
    veryDimGray: '#fdfdfd',
    dimGray: '#efefef',
    gray: '#e2e2e2',
    green: '#70cca7',
    greenDark: '#00ab66'
}

export const fontColor = {
    important:'#353535',
    general:'#6f6f6f',
    primary: colors.primary,
    white: colors.white
}

export const glass = {
    toWrite:"backdrop-filter: blur( 4px ); -webkit-backdrop-filter: blur( 4px ); border: 1px solid rgba( 255, 255, 255, 0.18 ); border-radius:10px;"
}

export const shadow = {
    card:`-webkit-box-shadow: 0px 6px 10px 0px rgba(0,0,0,0.27); 
          box-shadow: 0px 6px 10px 0px rgba(0,0,0,0.27);`
}

export const scroll = scrollClass => {
    return `${scrollClass}::-webkit-scrollbar {
        width: .5em;
      }
       
      ${scrollClass}::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      }
       
      ${scrollClass}::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        border-radius: 20px;
      }
      `
}

export const scrollRules = {
    scrollBar : `-webkit-scrollbar {
        width: .5em;
      }`,
    scrollBarTrack: `-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      }`,
    scrollBarThumb : `-webkit-scrollbar-thumb {
        background-color: darkgrey;
        border-radius: 20px;
      }`
}