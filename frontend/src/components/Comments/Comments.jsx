import React, { Component } from "react";
import Main from "../template/Main";
import axios from "axios";

const headerProps = {
    icon: 'comments',
    title: 'Comentários',
    subtitle: 'Deixe seu comentário aqui'
};

const baseUrl = 'http://localhost:3001/comments';
const initialState = {
    name: '',
    comment: '',
    comments: []
};

export default class Comments extends Component {

    state = { ...initialState };

    componentDidMount() {
        axios(baseUrl).then(resp => {
            this.setState({ comments: resp.data });
        });
    }

    clear() {
        this.setState(old => ({ name: '', comment: '', comments: old.comments }));
    }

    saveComment() {
        const { name, comment } = this.state;
        const newComment = { name, comment };
        axios.post(baseUrl, newComment)
            .then(resp => {
                const updatedComments = [...this.state.comments, resp.data];
                
                this.setState({ comments: updatedComments });
                this.clear();
            });
    }

    renderComments() {
        return this.state.comments.map(comment => (
            <div key={comment.id}>
                <h5>{comment.name}</h5>
                <p>{comment.comment}</p>
            </div>
        ));
    }



    render() {
        return (
            <Main {...headerProps}>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}
                            placeholder="Digite seu nome..." />
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment">Comentário:</label>
                        <textarea
                            id="comment"
                            className="form-control"
                            value={this.state.comment}
                            onChange={e => this.setState({ comment: e.target.value })}
                            placeholder="Digite seu comentário..." ></textarea>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end">
                            <button
                                className="btn btn-primary"
                                onClick={() => this.saveComment()}>
                                Enviar
                            </button>
                            <button
                                className="btn btn-secondary ml-2"
                                onClick={() => this.clear()}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>Comentários</h2>
                    {this.renderComments()}
                </div>
            </Main>
        );
    }
}
