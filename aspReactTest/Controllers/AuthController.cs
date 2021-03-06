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
using vkaudioposter_ef.Context;
using vkaudioposter_ef.Model;
using Microsoft.EntityFrameworkCore;

namespace aspReactTest.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class AuthController : Controller
    {
        // test data insted DB
        private List<Person> people = new List<Person>
        {
            new Person { Username="admin", Password="013d897f5c", Role = "ADMIN", Email = "admin"  },
            //new Person { Username=Startup.adminUser, Password=Startup.adminPass, Role = "ADMIN", Email = Startup.adminUser  },
            //new Person { Username="qwerty@gmail.com", Password="55555", Role = "user" }
        };

        //private readonly UserContext user_context = new UserContext(options);
        //private readonly RoleContext role_context = new RoleContext();

        //[HttpPost("/signup")]
        [HttpPost("/api/auth/signup")]
        public IActionResult PostRegister([FromBody] Person person)
        {
            string username = person.Username, password = person.Password, email = person.Email;
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
                message = hashed,
            };
            return Json(response);
        }

        [HttpPost("/api/auth/signin")]
        //[HttpPost("/signin")]
        [HttpPost("/token")]
        public IActionResult PostLogin([FromBody] Person person)
        {
            var username = person.Username;
            var password = person.Password;
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

            //Get user roles from DB

            //List<string> authorities = new();
            //authorities.Add("ROLE_ADMIN");
            //authorities.Add("ROLE_MODERATOR");
            var rct = identity.RoleClaimType;

            Person person1 = people.FirstOrDefault(x => x.Username == username && x.Password == password);
            //Person person = new Person { Username = pName, Role = pRoles };
            string email = null, role = null;

            if (person1 != null)
            {
                email = person1.Email;
                //person1.Username;
                role = person1.Role;
                //roles = person1.Roles;
            }



            var response = new
            {
                id = 1, //pass from DB
                accessToken = encodedJwt,
                username = identity.Name,
                email = email,
                roles = "[ROLE_"+ role +"]"
                //roles = "[ROLE_ADMIN, ROLE_MODERATOR]"
            };

            return Json(response);
        }

        private ClaimsIdentity GetIdentity(string username, string password)
        {
            //User personDB = user_context.Users.FirstOrDefault(x => x.Username == username && x.Password == password);
            //var pRoles = personDB.Roles;
            //var pPass = personDB.Password;
            //var pName = personDB.Username;
            //var pEmail = personDB.Email;
            //string rolesString = null;

            //foreach (var role in pRoles)
            //{
            //    if (role.Name == "ADMIN") rolesString = "ROLE_" + role.Name;
            //    else if (role.Name == "MODERATOR") rolesString = "ROLE_" + role.Name;
            //    else if (role.Name == "USER") rolesString = "ROLE_" + role.Name;
            //}
            //rolesString += role;

            Person person = people.FirstOrDefault(x => x.Username == username && x.Password == password);
            //Person person = new Person { Username = pName, Role = pRoles };

            if (person != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Username),
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
        public IActionResult GetAllContent()
        {
            return Json("Welcome to HVM!");
        }
        [HttpGet("/api/test/user")]
        public IActionResult GetUserContent()
        {
            return Json("User Content.\nThere you can overview photostocks");
        }
        [HttpGet("/api/test/mod")]
        public IActionResult GetModContent()
        {
            return Json("Moderator Content.\nThere you can add playlists");
        }
        [HttpGet("/api/test/admin")]
        public IActionResult GetAdminContent()
        {
            return Json("Admin Content.\nThere you can start parsing and edit playlists");
        }

    }
}