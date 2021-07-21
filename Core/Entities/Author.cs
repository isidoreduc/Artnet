using System;

namespace Core.Entities
{
    public class Author : BaseEntity
    {
        public int DateOfBirth { get; set; }
        public int DateOfDeath { get; set; }
        public string Nationality { get; set; }
       
    }
}