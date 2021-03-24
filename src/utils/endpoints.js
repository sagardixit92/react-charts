const getEndpoint = (type) => {
    if(type === 'highlight'){
        return 'get_highlight'
    }
    if(type === 'buyers'){
        return 'get_buyer'
    }
    if(type === 'countries'){
        return 'get_country'
    }
    if(type === 'income'){
        return 'get_income'
    }
}

export default getEndpoint;