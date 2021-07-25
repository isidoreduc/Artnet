using System.Security.Claims;

namespace API.ExtensionMethods
{
    public static class GetUserEmailFromClaimsExtension
    {
        public static string GetUserEmail(this ClaimsPrincipal user) =>
          user.FindFirstValue(ClaimTypes.Email);
    }
}