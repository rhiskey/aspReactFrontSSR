using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using vkaudioposter_ef.Model;

namespace vkaudioposter_ef.Context
{
    public class RoleContext : DbContext
    {
        public RoleContext() { }
        public RoleContext(DbContextOptions<RoleContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Role> Roles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{

        //}
    }
}
