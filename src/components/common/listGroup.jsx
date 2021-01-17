import React, { Component } from 'react';
import _ from 'lodash';

const ListGroup = (props) => {
    const { items, onItemSelect, selectedItem, valueprop, textprop } = props;
    return (
        <ul className="list-group">
            {items.map(item =>
                <li
                    key={item[valueprop]}
                    className={selectedItem === item ? "list-group-item active" : "list-group-item"}
                    onClick={() => onItemSelect(item)}>
                    {item[textprop]}
                </li>
            )}
        </ul>);
}

ListGroup.defaultProps = {
    valueprop: "_id",
    textprop: "name"
}

export default ListGroup;