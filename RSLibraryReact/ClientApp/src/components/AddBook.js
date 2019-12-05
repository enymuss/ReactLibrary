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
var FetchBook_1 = require("./FetchBook");
var AddBook = /** @class */ (function (_super) {
    __extends(AddBook, _super);
    function AddBook(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { title: "", loading: true, empData: new FetchBook_1.BookData };
        var empid = _this.props.match.params["empid"];
        // This will set state for Edit Book
        if (empid > 0) {
            fetch('api/Book/Details/' + empid)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.setState({ title: "Edit", loading: false, empData: data });
            });
        }
        // This will set state for Add Book
        else {
            _this.state = { title: "Create", loading: false, empData: new FetchBook_1.BookData };
        }
        // This binding is necessary to make "this" work in the callback
        _this.handleSave = _this.handleSave.bind(_this);
        _this.handleCancel = _this.handleCancel.bind(_this);
        return _this;
    }
    AddBook.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderCreateForm();
        return React.createElement("div", null,
            React.createElement("h1", null, this.state.title),
            React.createElement("h3", null, "Book"),
            React.createElement("hr", null),
            contents);
    };
    // This will handle the submit form event.
    AddBook.prototype.handleSave = function (event) {
        var _this = this;
        event.preventDefault();
        var data = new FormData(event.target);
        // PUT request for Edit Book.
        if (this.state.empData.bookId) {
            fetch('api/Book/Edit', {
                method: 'PUT',
                body: data,
            }).then(function (response) { return response.json(); })
                .then(function (responseJson) {
                _this.props.history.push("/fetchBook");
            });
        }
        // POST request for Add Book.
        else {
            fetch('api/Book/Create', {
                method: 'POST',
                body: data,
            }).then(function (response) { return response.json(); })
                .then(function (responseJson) {
                _this.props.history.push("/fetchBook");
            });
        }
    };
    // This will handle Cancel button click event.
    AddBook.prototype.handleCancel = function (e) {
        e.preventDefault();
        this.props.history.push("/fetchBook");
    };
    // Returns the HTML Form to the render() method.
    AddBook.prototype.renderCreateForm = function () {
        return (React.createElement("form", { onSubmit: this.handleSave },
            React.createElement("div", { className: "form-group row" },
                React.createElement("input", { type: "hidden", name: "BookId", value: this.state.empData.bookId })),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: " control-label col-md-12", htmlFor: "Title" }, "Title"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "title", defaultValue: this.state.empData.title, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: " control-label col-md-12", htmlFor: "Author" }, "Author"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "author", defaultValue: this.state.empData.author, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "Year" }, "Year"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "number", name: "year", defaultValue: this.state.empData.year, required: true }))),
            React.createElement("div", { className: "form-group" },
                React.createElement("button", { type: "submit", className: "btn btn-default" }, "Save"),
                React.createElement("button", { className: "btn", onClick: this.handleCancel }, "Cancel"))));
    };
    return AddBook;
}(React.Component));
exports.AddBook = AddBook;
//# sourceMappingURL=AddBook.js.map