import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { BookData } from './FetchBook';

interface AddBookDataState {
    title: string;
    loading: boolean;
    empData: BookData;
}

export class AddBook extends React.Component<RouteComponentProps<{}>, AddBookDataState> {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, empData: new BookData };

        var empid = this.props.match.params["empid"];

        // This will set state for Edit Book
        if (empid > 0) {
            fetch('api/Book/Details/' + empid)
                .then(response => response.json() as Promise<BookData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, empData: data });
                });
        }

        // This will set state for Add Book
        else {
            this.state = { title: "Create", loading: false, empData: new BookData };
        }

        // This binding is necessary to make "this" work in the callback
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return <div>
            <h1>{this.state.title}</h1>
            <h3>Book</h3>
            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event.
    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit Book.
        if (this.state.empData.bookId) {
            fetch('api/Book/Edit', {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchBook");
                })
        }

        // POST request for Add Book.
        else {
            fetch('api/Book/Create', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchBook");
                })
        }
    }

    // This will handle Cancel button click event.
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchBook");
    }

    // Returns the HTML Form to the render() method.
    private renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="BookId" value={this.state.empData.bookId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Title">Title</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="title" defaultValue={this.state.empData.title} required />
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Author">Author</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="author" defaultValue={this.state.empData.author} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Year" >Year</label>
                    <div className="col-md-4">
                        <input className="form-control" type="number" name="year" defaultValue={this.state.empData.year} required />
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}
