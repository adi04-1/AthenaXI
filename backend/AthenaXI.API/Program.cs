using AthenaXI.API.Endpoints;
using AthenaXI.API.Services;
using AthenaXI.Data;
using AthenaXI.Data.Seed;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using Hangfire;
using Hangfire.PostgreSql;
using AthenaXI.Core.Enums;

// ── CRITICAL: Prevent JWT middleware from remapping claim names ───────────────
// Without this, "role" claim is renamed to the long URI and ALL role checks fail
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
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                                           Encoding.UTF8.GetBytes(jwtKey)),
            ClockSkew = TimeSpan.Zero,
            // Tell the validator where to find the role claim
            RoleClaimType = "role",
            NameClaimType = "uniqueName"
        };
        options.TokenValidationParameters.RoleClaimType = ClaimTypes.Role;
    });
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("AppOwnerOnly", p =>
        p.RequireAuthenticatedUser()
         .RequireClaim(ClaimTypes.Role, nameof(UserRole.AppOwner)))

    .AddPolicy("AdminOrOwner", p =>
        p.RequireAuthenticatedUser()
         .RequireClaim(
             ClaimTypes.Role,
             nameof(UserRole.AppOwner),
             nameof(UserRole.LeagueAdmin)
         ))

    .AddPolicy("TeamOwnerOrAbove", p =>
        p.RequireAuthenticatedUser()
         .RequireClaim(
             ClaimTypes.Role,
             nameof(UserRole.AppOwner),
             nameof(UserRole.LeagueAdmin),
             nameof(UserRole.TeamOwner)
         ))

    .AddPolicy("AnyLoggedIn", p =>
        p.RequireAuthenticatedUser());

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
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Paste your JWT token"
    });
    c.AddSecurityRequirement(new()
    {
        { new() { Reference = new() { Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme, Id = "Bearer" } }, [] }
    });
});

var app = builder.Build();

// ─── Migrate + Seed ───────────────────────────────────────────────────────────
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

// ─── Debug — remove after confirming claims work ─────────────────────────────
app.MapGet("/debug/claims", (ClaimsPrincipal caller) =>
    Results.Ok(caller.Claims.Select(c => new { c.Type, c.Value }))).AllowAnonymous();

// ─── Health ───────────────────────────────────────────────────────────────────
app.MapGet("/health", () => Results.Ok(new
{
    status = "healthy",
    app = "AthenaXI",
    version = "1.0.0",
    timestamp = DateTime.UtcNow
})).AllowAnonymous();

// ─── Endpoints ────────────────────────────────────────────────────────────────
app.MapAuthEndpoints();
app.MapSeasonEndpoints();
app.MapTeamEndpoints();
app.MapPlayerEndpoints();
app.MapAuctionEndpoints();
app.MapNotificationEndpoints();
app.MapLeaderboardEndpoints();

app.Run();
