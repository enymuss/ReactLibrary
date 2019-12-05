"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_table_1 = require("react-table");
require("react-table/react-table.css");
var FetchBook = /** @class */ (function (_super) {
    __extends(FetchBook, _super);
    function FetchBook(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { empList: [], loading: true };
        fetch('api/Book/Index')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ empList: data, loading: false });
        });
        // This binding is necessary to make "this" work in the callback
        _this.handleDelete = _this.handleDelete.bind(_this);
        _this.handleEdit = _this.handleEdit.bind(_this);
        return _this;
    }
    FetchBook.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderBookTable(this.state.empList);
        return React.createElement("div", null,
            React.createElement("h1", null, "Book Data"),
            React.createElement("p", null, "This component demonstrates fetching Book data from the server."),
            React.createElement("p", null,
                React.createElement(react_router_dom_1.Link, { to: "/addBook" }, "Create New")),
            React.createElement("div", null, contents));
    };
    // Handle Delete request for an Book
    FetchBook.prototype.handleDelete = function (id) {
        var _this = this;
        fetch('api/Book/Delete/' + id, {
            method: 'delete'
        }).then(function (data) {
            _this.setState({
                empList: _this.state.empList.filter(function (rec) {
                    return (rec.bookId != id);
                })
            });
        });
    };
    FetchBook.prototype.handleEdit = function (id) {
        this.props.history.push("/Book/edit/" + id);
    };
    // Returns the HTML table to the render() method.
    FetchBook.prototype.renderBookTable = function (empList) {
        var _this = this;
        return (React.createElement(react_table_1.default, { data: empList, filterable: true, defaultFilterMethod: function (filter, row) {
                return (String(row[filter.id]).indexOf(filter.value) > -1);
            }, columns: [
                {
                    columns: [
                        {
                            Header: "Book Id",
                            id: "bookId",
                            accessor: function (d) { return d.bookId; }
                        },
                        {
                            Header: "Title",
                            id: "title",
                            accessor: function (d) { return d.title; },
                            filterMethod: function (filter, row) {
                                return (String(row[filter.id]).indexOf(filter.value) > -1);
                            }
                        },
                        {
                            Header: "Last Name",
                            id: "author",
                            accessor: function (d) { return d.author; },
                            filterMethod: function (filter, row) {
                                return (String(row[filter.id]).indexOf(filter.value) > -1);
                            }
                        }
                    ]
                },
                {
                    columns: [
                        {
                            Header: "Year",
                            id: "year",
                            accessor: function (d) { return d.year; },
                            filterMethod: function (filter, row) {
                                return (String(row[filter.id]).indexOf(filter.value) > -1);
                            }
                        }
                    ]
                },
                {
                    columns: [
                        {
                            Header: "",
                            Cell: function (row) { return (React.createElement("div", null,
                                React.createElement("button", { onClick: function (id) { return _this.handleEdit(row.original.bookId); } }, "Edit"),
                                React.createElement("button", { onClick: function (id) { return _this.handleDelete(row.original.bookId); } }, "Delete"))); },
                            filterable: false
                        }
                    ]
                }
            ], defaultPageSize: 20 }));
        //<a className="action" onClick={(id) => this.handleEdit(emp.bookId)}>Edit</a>  |
        // <a className="action" onClick={(id) => this.handleDelete(emp.bookId)}>Delete</a>
    };
    return FetchBook;
}(React.Component));
exports.FetchBook = FetchBook;
var BookData = /** @class */ (function () {
    function BookData() {
        this.bookId = 0;
        this.title = "";
        this.author = "";
        this.year = "";
    }
    return BookData;
}());
exports.BookData = BookData;
//# sourceMappingURL=FetchBook.js.map