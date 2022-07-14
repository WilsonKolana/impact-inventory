using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebAPI.DataAccess;
using WebAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//Inject AppSettings
var appSettings = builder.Configuration.GetSection("ApplicationSettings");
builder.Services.Configure<AppSettings>(appSettings);

builder.Services.AddControllers();

//inject the database config
builder.Services.AddDbContext<ApplicationDbContext>(options => 
options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection"))
);

//register identitycore
builder.Services.AddDefaultIdentity<ApplicationUser>()
.AddEntityFrameworkStores<ApplicationDbContext>();

//Disable password validation
builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit =false;
    options.Password.RequireLowercase =false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 4;


});

builder.Services.AddCors();

//register services for Jwt Authentication 

var key = Encoding.UTF8.GetBytes(builder.Configuration["ApplicationSettings:SigningKey"].ToString());

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = false;
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero,
    };
});


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
builder.WithOrigins("*")
.AllowAnyHeader()
.AllowAnyMethod()
);

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseAuthentication();

app.MapControllers();

app.Run();
