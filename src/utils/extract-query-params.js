/**
 * aqui flitramos os parametros de consulta da URL
 * 
 * substr(1) remove o primeiro caracter da string, que é o '?'
 * split('&') divide a string em um array de strings, separando pelos '&'
 * 
 * reduce é usado para pecorrer o array e criar outra coisa     
 */

export function extractQueryParams(query) {
    return query.substr(1).split('&').reduce((queryParams, param) => {
        const [key, value] = param.split('=') // ira retorna o nome e o valor do parametro ['page', 'Erik']

        queryParams[key] = value

        return queryParams

    }, {})
} 