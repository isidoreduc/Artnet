using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression(@"((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,})", ErrorMessage = @"Password requires at least 1 lower case character, 1 upper case character, 1 number, 1 special character and must be at least 6 characters")]
        public string Password { get; set; }

    }
}