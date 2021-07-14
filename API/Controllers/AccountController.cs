using System.Threading.Tasks;
using API.DTOs;
using API.ErrorHandling;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized(new ApiException(401));
            var signInResult = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!signInResult.Succeeded) return Unauthorized(new ApiException(401));
            return new UserDto
            {
                Email = user.Email,
                UserName = user.Name,
                Token = "a token"
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            var user = new User
            {
                Email = registerDto.Email,
                Name = registerDto.Name,
                UserName = registerDto.Email
            };
            var userCheck = await _userManager.FindByEmailAsync(registerDto.Email);
            if (userCheck != null) return BadRequest(new ApiException(400));
            var registerResult = await _userManager.CreateAsync(user, registerDto.Password);
            if (!registerResult.Succeeded) return BadRequest(new ApiException(400));
            return new UserDto
            {
                Email = user.Email,
                UserName = user.Name,
                Token = "a token"
            };
        }
    }
}