using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using aspReactTest.Models;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace aspReactTest.Controllers
{
    //[ApiController]
    public class AccountController : Controller
    {
        // test data insted DB
        private List<Person> people = new List<Person>
        {
            new Person {Login="admin@gmail.com", Password="12345", Role = "admin" },
            new Person { Login="qwerty@gmail.com", Password="55555", Role = "user" }
        };


        [HttpPost("api/auth/signup")]
        public IActionResult Register(string username, string password, string email)
        {
			// generate a 128-bit salt using a secure PRNG
			byte[] salt = new byte[128 / 8];
			using (var rng = RandomNumberGenerator.Create())
			{
				rng.GetBytes(salt);
			}
			Console.WriteLine($"Salt: {Convert.ToBase64String(salt)}");
	 
			// derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
			string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
				password: password,
				salt: salt,
				prf: KeyDerivationPrf.HMACSHA1,
				iterationCount: 10000,
				numBytesRequested: 256 / 8));
				
			// store username, email, hashed in DB

            var response = new
            {
                message = "successfull",
            };
            return Json(response);
        }


        [HttpPost("api/auth/signin")]
        [HttpPost("/token")]
        public IActionResult Token(string username, string password)
        {
            var identity = GetIdentity(username, password);
            if (identity == null)
            {
                return BadRequest(new { errorText = "Invalid username or password." });
            }

            var now = DateTime.UtcNow;
            // create JWT-token
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name
            };

            return Json(response);
        }

        private ClaimsIdentity GetIdentity(string username, string password)
        {
            Person person = people.FirstOrDefault(x => x.Login == username && x.Password == password);
            if (person != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Login),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, person.Role)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // if user not found
            return null;
        }


        [HttpGet("/api/test/all")]
        [HttpGet("/api/test/user")]
        [HttpGet("/api/test/mod")]
        [HttpGet("/api/test/admin")]
        public IActionResult All()
        {
            ///IN:
            //headers =     const user = JSON.parse(localStorage.getItem('user'));

            //if (user && user.accessToken)
            //{
            //    return { Authorization: 'Bearer ' + user.accessToken };
            //}
            //else
            //{
            //    return { };
            //}


            ////var response = new
            //{
            //};
            //IEnumerable<string> headerValues = request.Headers.
            return Json("All Content");
        }
    }
}