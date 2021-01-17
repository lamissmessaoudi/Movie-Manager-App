import React, { Component } from 'react';

const Favorite = (props) => {
    let classes = "fa fa-heart";
    if (!props.liked)
        classes += "-o";
    return (
        <i
            onClick={props.onClickLike}
            className={classes}
            style={{ cursor: "pointer" }}
            aria-hidden="true"></i>
    );
}

export default Favorite;