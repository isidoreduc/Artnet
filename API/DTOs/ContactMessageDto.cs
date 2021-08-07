using System;

namespace API.DTOs
{
  public class ContactMessageDto
  {
    public string Firstname { get; set; }
    public string Lastname { get; set; }
    public string Email { get; set; }
    public string Message { get; set; }
    public DateTimeOffset DateAdded { get; set; }


  }
}