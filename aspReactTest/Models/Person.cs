using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using vkaudioposter_ef.Model;

namespace aspReactTest.Models
{
    public class Person
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public ICollection<Role> Roles { get; set; }
        public string Email { get; set; }
        public string Role { get;  set; }
        //public string Hash { get; set; }
    }

}
