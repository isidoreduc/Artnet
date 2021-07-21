using System;

namespace API.ErrorHandling
{
    public class ApiResponse
    {
        public int StatusCode { get; set; }
        public string ErrorMessage { get; set; }

        public ApiResponse(int statusCode, string errorMessage = null)
        {
            StatusCode = statusCode;
            ErrorMessage = errorMessage ?? GetErrorMessage(statusCode);
        }

        private string GetErrorMessage(int statusCode)
        {
            return statusCode switch
            {
                400 => "Bad request, for sure",
                401 => "Authorize, then come back",
                404 => "Not found, try something else",
                500 => "Server error, it's on me",
                _ => null
            };
        }

        
    }
}