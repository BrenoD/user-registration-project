import React, { Component } from "react";
import Main from "../template/Main";
import axios from "axios";
import './feedback.css';

const headerProps = {
    icon: 'star',
    title: 'Feedback',
    subtitle: 'Deixe seu feedback para meu simples projeto de Cadastro de usuarios'
};

const baseUrl = 'http://localhost:3001/feedback';
const initialState = {
    feedback: { name: '', rating: 0 },
    list: []
};

export default class Feedback extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data });
        });
    }

    clear() {
        this.setState({ feedback: initialState.feedback });
    }

    save() {
        const feedback = this.state.feedback;
        const method = feedback.id ? 'put' : 'post';
        const url = feedback.id ? `${baseUrl}/${feedback.id}` : baseUrl;
        axios[method](url, feedback)
            .then(resp => {
                const list = this.getUpdatedList(resp.data);
                this.setState({ feedback: initialState.feedback, list });
            });
    }

    getUpdatedList(feedback, add = true) {
        const list = this.state.list.filter(f => f.id !== feedback.id);
        if (add) list.unshift(feedback);
        return list;
    }

    updateField(event) {
        const feedback = { ...this.state.feedback };
        feedback[event.target.name] = event.target.value;
        this.setState({ feedback });
    }

    setRating(rating) {
        const feedback = { ...this.state.feedback, rating };
        this.setState({ feedback });
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.feedback.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite seu nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nota</label>
                            <div className="star-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <i
                                        key={star}
                                        className={`fa fa-star ${this.state.feedback.rating >= star ? 'text-warning' : ''}`}
                                        onClick={() => this.setRating(star)}
                                    ></i>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Nota</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        );
    }

    renderRows() {
        return this.state.list.map(feedback => {
            return (
                <tr key={feedback.id}>
                    <td>{feedback.name}</td>
                    <td>{feedback.rating}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        );
    }
}
