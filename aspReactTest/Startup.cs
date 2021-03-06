using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using vkaudioposter_ef.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;


namespace aspReactTest
{
    public class Startup
    {
        public static string db_server, db_user, db_password, db_name, connStr, adminUser, adminPass;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            DotNetEnv.Env.TraversePath().Load();
            db_server = DotNetEnv.Env.GetString("MYSQL_SERVER");
            db_user = DotNetEnv.Env.GetString("MYSQL_USER");
            db_password = DotNetEnv.Env.GetString("MYSQL_PASSWORD");
            db_name = DotNetEnv.Env.GetString("MYSQL_DATABASE_NAME");
            adminUser = DotNetEnv.Env.GetString("SITE_ADMIN");
            adminPass = DotNetEnv.Env.GetString("SITE_ADMIN_PASS");

            connStr = "server=" + db_server + ";user=" + db_user + ";database=" + db_name + ";port=3306;password=" + db_password + "";

            services.AddDbContext<PlaylistContext>(opt => opt.UseMySQL(connStr));
            services.AddDbContext<ConsolePhotostockContext>(opt => opt.UseMySQL(connStr));
            services.AddDbContext<PostedTracksContext>(opt => opt.UseMySQL(connStr));
            services.AddDbContext<ParserXpathContext>(opt => opt.UseMySQL(connStr));
            //services.AddDbContext<UserContext>(opt => opt.UseMySQL(connStr));
            //services.AddDbContext<RoleContext>(opt => opt.UseMySQL(connStr));


            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    // ????????, ????? ?? ?????????????? ???????? ??? ????????? ??????
                    ValidateIssuer = true,
                    // ??????, ?????????????? ????????
                    ValidIssuer = AuthOptions.ISSUER,

                    // ????? ?? ?????????????? ??????????? ??????
                    ValidateAudience = true,
                    // ????????? ??????????? ??????
                    ValidAudience = AuthOptions.AUDIENCE,
                    // ????? ?? ?????????????? ????? ?????????????
                    ValidateLifetime = true,

                    // ????????? ????? ????????????
                    IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                    // ????????? ????? ????????????
                    ValidateIssuerSigningKey = true,
                };
            });

            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
