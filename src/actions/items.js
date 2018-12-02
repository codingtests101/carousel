export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}
export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}
export function itemsFetchDataSuccess(data) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items: data
    };
}
export function itemsCurrentPage(val) {
    return {
        type: 'ITEMS_CURRENT_PAGE',
        page: val
    };
}
function processData(data){
    const result = [];
    data.hits.map((item) => {
        result.push({id:item.id, imageURL : item.webformatURL,tags:item.tags});
        return result;
    });
    return result;
}
export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((data) => dispatch(itemsFetchDataSuccess(processData(data))))
            .then(() => dispatch(itemsCurrentPage(0)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}