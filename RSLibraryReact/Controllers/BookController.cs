using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RSLibraryReact.Models;

namespace RSLibraryReact.Controllers
{
    public class BookController : Controller
    {
        BookDataAccessLayer objBook = new BookDataAccessLayer();

        [HttpGet]
        [Route("api/Book/Index")]
        public IEnumerable<TblBook> Index()
        {
            return objBook.GetAllBooks();
        }

        [HttpPost]
        [Route("api/Book/Create")]
        public int Create(TblBook book)
        {
            return objBook.AddBook(book);
        }

        [HttpGet]
        [Route("api/Book/Details/{id}")]
        public TblBook Details(int id)
        {
            return objBook.GetBookData(id);
        }

        [HttpPut]
        [Route("api/Book/Edit")]
        public int Edit(TblBook book)
        {
            return objBook.UpdateBook(book);
        }

        [HttpDelete]
        [Route("api/Book/Delete/{id}")]
        public int Delete(long id)
        {
            return objBook.DeleteBook(id);
        }
    }
}
