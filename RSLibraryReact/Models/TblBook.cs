using System;
using System.Collections.Generic;

namespace RSLibraryReact.Models
{
    public partial class TblBook
    {
        public long BookId { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public long Year { get; set; }
    }
}
