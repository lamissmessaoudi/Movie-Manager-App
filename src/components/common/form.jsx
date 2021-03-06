import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    }

    validate = () => {
        const { error } = Joi.validate(this.state.data, this.schema, { abortEarly: false })
        console.log(error);
        console.log("this.state.data" + this.state.data)
        if (!error) return null;
        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;
        return errors;
        // const errors = {};
        // const { data } = this.state
        // if (data.username.trim() === "")
        //     errors.username = "username required";
        // return Object.keys.length === 0 ? null : errors;
    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value }
        const schema = { [name]: this.schema[name] }
        const { error } = Joi.validate(obj, schema)
        return error ? error.details[0].message : null
    }

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({
            errors: errors || {}
        });
        if (errors) return;
        this.doSubmit()
        console.log("submit ")
    }
    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors }
        const errorMsg = this.validateProperty(input);
        if (errorMsg) errors[input.name] = errorMsg;
        else delete errors[input.name];
        const data = { ...this.state.data }
        data[input.name] = input.value
        this.setState({ data, errors })
    }

    renderButton = (label) => {
        return <button
            disabled={this.validate()}
            className="btn btn-primary">
            {label}
        </button>
    }
    renderInput = (name, label, type = 'text') => {
        const { data, errors } = this.state;
        return (
            < Input
                type={type}
                name={name}
                value={data[name]}
                label={label}
                error={errors[name]}
                onChange={this.handleChange}
            />);
    }
    renderSelect = (name, label, options) => {

        const { data, errors } = this.state;
        return <Select
            name={name}
            value={data[name]}
            label={label}
            options={options}
            onChange={this.handleChange}
            error={errors[name]}
        />
    }

}

export default Form;