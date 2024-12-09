using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace back
{
    public class AppDbContext: IdentityDbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }
        
    }
}