using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.DataAccess;
using WebAPI.Models;
using WebAPI.Models.Dto;

namespace WebAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase 
    {
       
        private readonly UserManager<ApplicationUser> _userManager;

        private readonly SignInManager<ApplicationUser> _signInManager;

        private readonly AppSettings _appSettings;

        public AuthenticationController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IOptions<AppSettings> appSettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
        }

        [HttpPost("Register")]
        //Post: /api/Authentication/Register
        public async Task<Object> RegisterUser(RegsiterRequest model)
        {
            var user = new ApplicationUser()
            {
                Email = model.Email,
                Name = model.Name,
                Surname = model.Surname,
                UserName = "aaa"
            };

            try
            {
               var result = await _userManager.CreateAsync(user, model.Password);
                return Ok(result);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost("Login")]
        //Post: /api/Authentication/Login
        public async Task<Object> Login(LoginRequest model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("USERID", user.Id.ToString())
                    }),

                    Expires = DateTime.UtcNow.AddMinutes(15),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.SigningKey)), SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var SecurityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(SecurityToken);
                return Ok(new { token });
            }
            else
            {

                return BadRequest(new { message = "Incorrect Email or Password." });
            }
            
        }

    }
}
