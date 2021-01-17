import _ from 'lodash';

export function paginate(items, pageNumber, pageSize, selectedGenre) {
    const index = (pageNumber - 1) * pageSize;
    return _(items) //convert array to lodash wrapper to chain methods
        .slice(index)
        .take(pageSize)
        .value(); // convert lodach wrapper to array
}