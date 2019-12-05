import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import  ReactTable from "react-table";
import "react-table/react-table.css";

interface FetchBookDataState {
    empList: BookData[];
    loading: boolean;
}

export class FetchBook extends React.Component<RouteComponentProps<{}>, FetchBookDataState> {
    constructor(props) {
        super(props);
        this.state = { empList: [], loading: true };

        fetch('api/Book/Index')
            .then(response => response.json() as Promise<BookData[]>)
            .then(data => {
                this.setState({ empList: data, loading: false });
            });

        // This binding is necessary to make "this" work in the callback
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderBookTable(this.state.empList);

        return <div>
            <h1>Book Data</h1>
            <p>This component demonstrates fetching Book data from the server.</p>
            <p>
                <Link to="/addBook">Create New</Link>
            </p>
            <div>
                {contents}
            </div>
        </div>
    }

    // Handle Delete request for an Book
    private handleDelete(id: number) {
            fetch('api/Book/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        empList: this.state.empList.filter((rec) => {
                            return (rec.bookId != id);
                        })
                    });
            });
        
    }

    private handleEdit(id: number) {
        this.props.history.push("/Book/edit/" + id);
    }

    // Returns the HTML table to the render() method.
    private renderBookTable(empList: BookData[]) {
        return (
            <ReactTable
                data={empList}
                filterable
                defaultFilterMethod={(filter, row) =>
                    (String(row[filter.id]).indexOf(filter.value) > -1)
                }
                columns={[
                    {
                        columns: [
                            {
                                Header: "Book Id",
                                id: "bookId",
                                accessor: d => d.bookId
                             
                            },
                            {
                                Header: "Title",
                                id: "title",
                                accessor: d => d.title,
                                filterMethod: (filter, row) =>
                                    (String(row[filter.id]).indexOf(filter.value) > -1)
                            },
                            {
                                Header: "Last Name",
                                id: "author",
                                accessor: d => d.author,
                                filterMethod: (filter, row) =>
                                    (String(row[filter.id]).indexOf(filter.value) > -1)
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                Header: "Year",
                                id: "year",
                                accessor: d => d.year,
                                filterMethod: (filter, row) =>
                                    (String(row[filter.id]).indexOf(filter.value) > -1)
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                Header: "",
                                Cell: row => (
                                    <div>
                                        <button onClick={(id) => this.handleEdit(row.original.bookId)}>Edit</button>
                                        <button onClick={(id) => this.handleDelete(row.original.bookId)}>Delete</button>
                                    </div>
                                ),
                                filterable: false
                            }
                        ]
                    }
                ]}
                defaultPageSize={20}
            />
        );

        //<a className="action" onClick={(id) => this.handleEdit(emp.bookId)}>Edit</a>  |
       // <a className="action" onClick={(id) => this.handleDelete(emp.bookId)}>Delete</a>
    }
}

export class BookData {
    bookId: number = 0;
    title: string = "";
    author: string = "";
    year: string = "";
}