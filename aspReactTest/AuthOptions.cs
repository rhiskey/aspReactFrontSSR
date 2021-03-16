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
        public const string ISSUER = "MyServer"; // token issuer
        public const string AUDIENCE = "MyClient"; // token client
        const string KEY = "hvm_secret_key!123";   // cipher key
        public const int LIFETIME = 1; // - 1 minute
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
