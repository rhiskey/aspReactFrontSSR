using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using vkaudioposter_ef.Model;

namespace vkaudioposter_ef.Context
{
    public class UserContext : DbContext
    {
        public UserContext() { }
        public UserContext(DbContextOptions<UserContext> options)
            : base(options)
        {
        }

        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{

        //}
    }
}
