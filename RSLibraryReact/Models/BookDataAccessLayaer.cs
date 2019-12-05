using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSLibraryReact.Models
{
    public class BookDataAccessLayer
    {
        libraryContext db = new libraryContext();

        public IEnumerable<TblBook> GetAllBooks()
        {
            try
            {
                return db.TblBook.ToList();
            }
            catch
            {
                throw;
            }
        }

        //To Add new book record     
        public int AddBook(TblBook book)
        {
            long maxId = book.BookId;
            try
            {
                if (db.TblBook.Find(book.BookId) != null) {
                    List<TblBook> bookList = db.TblBook.ToList();
                    foreach (TblBook aBook in bookList) {
                        maxId = (maxId >= aBook.BookId) ? maxId : aBook.BookId;
                    }
                    maxId += 1;
                }
                book.BookId = maxId;    
                db.TblBook.Add(book);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Update the records of a particluar book    
        public int UpdateBook(TblBook book)
        {
            try
            {
                db.Entry(book).State = EntityState.Modified;
                db.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular book    
        public TblBook GetBookData(long id)
        {
            try
            {
                TblBook book = db.TblBook.Find(id);
                return book;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record of a particular book    
        public int DeleteBook(long id)
        {
            try
            {
                TblBook book = db.TblBook.Find(id);
                db.TblBook.Remove(book);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

    }
}