using System;
using API.Extensions;
using DAL.Data;
using DAL.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

// add services to container

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.AddCors();

// configure middleware

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors(x => x.AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
    .WithOrigins("http://localhost:4200"));

app.UseRouting();
app.UseStaticFiles();
app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapFallbackToController("Index", "Fallback");
});

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
    await context.Database.MigrateAsync();
    await Seed.SeedUsers(userManager, roleManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

await app.RunAsync();
