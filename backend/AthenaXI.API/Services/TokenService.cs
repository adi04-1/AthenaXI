using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AthenaXI.Core.Models;
using Microsoft.IdentityModel.Tokens;

namespace AthenaXI.API.Services;

public class TokenService(IConfiguration config)
{
    public (string token, DateTime expiresAt) GenerateToken(
        User user,
        bool isImpersonating = false,
        string? impersonatedBy = null)
    {
        var key      = config["Jwt:Key"] ?? throw new Exception("JWT Key missing");
        var issuer   = config["Jwt:Issuer"];
        var audience = config["Jwt:Audience"];
        var expDays  = int.Parse(config["Jwt:ExpiryInDays"] ?? "7");
        var expiresAt = DateTime.UtcNow.AddDays(expDays);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub,        user.Id.ToString()),
            new(JwtRegisteredClaimNames.UniqueName, user.Username),
            new(JwtRegisteredClaimNames.Email,      user.Email),
            new(ClaimTypes.Role,                    user.Role.ToString()),
            new("userId",                           user.Id.ToString()),
            new("role",                             user.Role.ToString()),
        };

        if (user.TeamName is not null)
            claims.Add(new Claim("teamName", user.TeamName));

        if (isImpersonating && impersonatedBy is not null)
        {
            claims.Add(new Claim("isImpersonating", "true"));
            claims.Add(new Claim("impersonatedBy",  impersonatedBy));
        }

        var creds = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
            SecurityAlgorithms.HmacSha256);

        var jwt = new JwtSecurityToken(
            issuer:             issuer,
            audience:           audience,
            claims:             claims,
            expires:            expiresAt,
            signingCredentials: creds);

        return (new JwtSecurityTokenHandler().WriteToken(jwt), expiresAt);
    }
}
