using AthenaXI.API.Endpoints;
using AthenaXI.API.Services;
using AthenaXI.Data;
using AthenaXI.Data.Seed;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Hangfire;
using Hangfire.PostgreSql;
using System.Security.Claims;

System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler.DefaultOutboundClaimTypeMap.Clear();
var builder = WebApplication.CreateBuilder(args);

// ─── Database ─────────────────────────────────────────────────────────────────
builder.Services.AddDbContext<AthenaXIDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// ─── Services ─────────────────────────────────────────────────────────────────
builder.Services.AddScoped<TokenService>();

// ─── Auth (JWT) ───────────────────────────────────────────────────────────────
var jwtKey = builder.Configuration["Jwt:Key"] ?? throw new Exception("JWT Key not configured");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer           = true,
            ValidateAudience         = true,
            ValidateLifetime         = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer              = builder.Configuration["Jwt:Issuer"],
            ValidAudience            = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey         = new SymmetricSecurityKey(
                                           Encoding.UTF8.GetBytes(jwtKey)),
            ClockSkew                = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AppOwnerOnly",     p => p.RequireClaim("role", "AppOwner"));
    options.AddPolicy("AdminOrOwner",     p => p.RequireClaim("role", "AppOwner", "LeagueAdmin"));
    options.AddPolicy("TeamOwnerOrAbove", p => p.RequireClaim("role", "AppOwner", "LeagueAdmin", "TeamOwner"));
});

// ─── Hangfire ─────────────────────────────────────────────────────────────────
builder.Services.AddHangfire(config =>
    config.UsePostgreSqlStorage(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddHangfireServer();

// ─── CORS ─────────────────────────────────────────────────────────────────────
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
        policy.WithOrigins(
                "http://localhost:4200",
                "https://YOURUSERNAME.github.io")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());
});

// ─── Swagger ──────────────────────────────────────────────────────────────────
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "AthenaXI API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new()
    {
        Name         = "Authorization",
        Type         = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme       = "bearer",
        BearerFormat = "JWT",
        In           = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description  = "Paste your JWT token here"
    });
    c.AddSecurityRequirement(new()
    {
        {
            new() { Reference = new() { Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme, Id = "Bearer" } },
            []
        }
    });
});

var app = builder.Build();

// ─── Auto migrate + seed ──────────────────────────────────────────────────────
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AthenaXIDbContext>();
    //await db.Database.MigrateAsync();
    await AppOwnerSeeder.SeedAsync(db);
    await SeasonSeeder.SeedAsync(db);
}

// ─── Middleware ───────────────────────────────────────────────────────────────
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "AthenaXI API v1");
    c.RoutePrefix = "swagger";
});

app.UseCors("AllowAngular");
app.UseAuthentication();
app.UseAuthorization();
app.UseHangfireDashboard("/hangfire");

// ─── Health ───────────────────────────────────────────────────────────────────
app.MapGet("/health", () => Results.Ok(new
{
    status    = "healthy",
    app       = "AthenaXI",
    version   = "0.5.0",
    timestamp = DateTime.UtcNow
})).AllowAnonymous();

// ── DEBUG — remove after fixing ───────────────────────────────────────────
app.MapGet("/debug/claims", (ClaimsPrincipal caller) =>
{
    var claims = caller.Claims.Select(c => new { c.Type, c.Value }).ToList();
    return Results.Ok(claims);
}).AllowAnonymous();

// ─── Routes — Days 3–9 ────────────────────────────────────────────────────────
app.MapAuthEndpoints();           // Day 3
app.MapSeasonEndpoints();         // Day 5
app.MapTeamEndpoints();           // Day 6
app.MapPlayerEndpoints();         // Day 7
app.MapAuctionEndpoints();        // Day 8
app.MapNotificationEndpoints();   // Day 9
app.MapLeaderboardEndpoints();    // Day 9

// Coming:
// app.MapTransferEndpoints();    // Day 21
// app.MapSyncEndpoints();        // Day 24

app.Run();
