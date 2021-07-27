using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.ErrorHandling;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService, IMapper mapper)
        {
            _mapper = mapper;
            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetActiveUser()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var user = await _userManager.FindByEmailAsync(email);
            return new UserDto
            {
                Email = user.Email,
                UserName = user.Name,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email) =>
            await _userManager.FindByEmailAsync(email) != null;

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddressAsync()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var user = await _userManager.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);
            return Ok(_mapper.Map<Address, AddressDto>(user.Address));
        }

        [Authorize]
        [HttpPost("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddressAsync(AddressDto addressDto)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var user = await _userManager.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);
            user.Address = _mapper.Map<AddressDto, Address>(addressDto);
            var result = await _userManager.UpdateAsync(user);
            return result.Succeeded ? Ok(_mapper.Map<Address, AddressDto>(user.Address)) : BadRequest("Problems updating user");
        }


        // [Authorize]
        [HttpPost("login")]
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
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
                return new BadRequestObjectResult(new ApiValidationErrorResponse
                {
                    Errors = new[] { "Email address is already in use" }
                }
            );
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
                Token = _tokenService.CreateToken(user)
            };
        }
    }
}