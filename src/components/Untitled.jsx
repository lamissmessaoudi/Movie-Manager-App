import axios from 'axios';
import React, { Component } from 'react';
class Compnent extends Component {
    state = { items: [] }

    handleDelete = async item => {
        //sending delete request to server
        try {
            await axios.delete(apiEndpoint + "/" + id)
        }
        //if something goes wrong only the catch block will be executed.
        catch (error) {
            if (error.response && error.response.status === 404)
                //    
                return alert('this item is already deleted.')
            //
        }
        //Changing the state & updating the interface
        const newItems = this.state.items.filter(
            i => i.id != item.id)
        this.setState({ items: newItems })
    }


    handleDelete = async item => {
        //saving reference of the old state
        const oldItems = this.state.items

        //changing the state & updating the interface
        const newItems = oldItems.filter(m => m._id !== item._id);
        this.setState({ items: newItems });

        //sending delete request to server
        try {
            await axios.delete(apiEndpoint + "/" + id)
        }
        //if something goes wrong
        catch (error) {
            if (error.response && error.response.status === 404)
                alert('this item is already deleted.')
            this.setState({ items: oldItems });
        }
    }


}

export default Component;
