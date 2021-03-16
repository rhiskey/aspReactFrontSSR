using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace aspReactTest
{
    public class AuthOptions
    {
        public const string ISSUER = "localhost"; // token issuer
        public const string AUDIENCE = "localhost"; // token client
        const string KEY = "mysupersecret_secretkey!123";   // cipher key
        public const int LIFETIME = 1; // - 1 minute
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
