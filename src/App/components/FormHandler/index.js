import React from 'react';
import set from 'lodash/set';

const FormHandler = (FormComponent) =>
    class extends React.Component {
        /**
         * @var state
         * @type {{initialValues, form: {}, alert: null, working: boolean}}
         */
        state = {
            form: {},
            working: false,
            alert: null,
            initialValues: {},
        };

        /**
         * @method handleSetInitialValues
         * @param {object} initialValues
         */
        handleSetInitialValues = (initialValues) => this.setState({
            initialValues,
            form: {
                ...this.state.form,
                ...initialValues,
            },
        });

        /**
         * @method handleSetForm
         * @param {object} form
         * @param {boolean} fresh
         */
        handleSetForm = (form, fresh = false) => {
            if (fresh) {
                return this.setState({
                    form
                });
            } else {
                return this.setState({
                    form: {
                        ...this.state.form,
                        ...form,
                    },
                });
            }
        };

        /**
         * @method handleWorking
         * @param {boolean} working
         */
        handleWorking = (working = true) => this.setState({
            working,
        });

        /**
         * @method handleSubmit
         * @param {Event} e
         * @param {function} request
         * @param {null|string|function} onSuccess
         * @param {boolean} reset
         */
        handleSubmit = async (e, request = undefined, onSuccess = null, reset = false) => {
            if (e) {
                e.preventDefault();
            }

            if (request) {
                this.working();

                const response = await request(this.state.form);
                let alert = null;

                if (!response.success) {
                    alert = {
                        message: response.message,
                        errors: response.errors,
                        type: 'error',
                    };
                } else {
                    if (typeof onSuccess === 'function') {
                        onSuccess(response);
                    } else {
                        alert = {
                            type: 'success',
                            message: onSuccess,
                        };
                    }
                }

                this.setState({
                    alert,
                    working: false,
                    form: reset && response.success ? this.state.initialValues ?? {} : this.state.form,
                });
            }
        };

        /**
         * @method handleInput
         * @param {string} field
         * @param {string} value
         */
        handleInput = (field, value) => {
            const form = {
                ...this.state.form,
            };

            set(form, field, value);

            this.setState({ form });
        };

        /**
         * @method handleResetForm
         */
        handleResetForm = () => this.setState({
            form: {
                ...this.state.initialValues,
            },
        });

        /**
         * @method handleAlert
         * @param {string} type
         * @param {string} message
         * @param {string[]} errors
         */
        handleAlert = (type, message, errors) => this.setState({
            alert: {
                type, message, errors,
            },
        });

        /**
         * @method handleResetAlert
         */
        handleResetAlert = () => this.setState({
            alert: null,
        });

        /**
         * @method getFieldError
         * @param {string} id
         * @return {null|array}
         */
        getFieldError = (id) => {
            const { alert } = this.state;

            let error = null;

            if (alert?.errors && alert.errors[id]) {
                error = alert.errors[id];
            }

            return error;
        };

        /**
         * @method render
         * @return {*}
         */
        render() {
            return (
                <FormComponent
                    {...this.props}
                    setForm={this.handleSetForm}
                    setInitialValues={this.handleSetInitialValues}
                    handleSubmit={this.handleSubmit}
                    handleInput={this.handleInput}
                    handleResetForm={this.handleResetForm}
                    handleresetAlert={this.handleResetAlert}
                    handleAlert={this.handleAlert}
                    handleWorking={this.handleWorking}
                    form={this.state.form}
                    alert={this.state.alert}
                    working={this.state.working}
                />
            );
        }
    };

export default FormHandler;