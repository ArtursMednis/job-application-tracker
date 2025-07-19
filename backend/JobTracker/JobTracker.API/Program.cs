using JobTracker.API.Contracts.Services;
using JobTracker.API.Contracts.Utilities;
using JobTracker.API.Middleware;
using JobTracker.API.Models;
using JobTracker.API.Persistence;
using JobTracker.API.Services;
using JobTracker.API.Utilities;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddTransient<ExceptionMiddleware>();

builder.Services.AddPersistenceServices(GetDbConnectionString());

AddJobTrackerServices(builder.Services);

builder.Services.AddControllers();

AddCors(builder.Services, policyName: "AllowLocalhost", origin: "http://localhost:5173");

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();
app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (app.Environment.IsDevelopment())
{
    app.UseCors("AllowLocalhost");
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>();

app.MapFallbackToController(action: "Index", controller: "Fallback");

app.Run();

return;

static void AddJobTrackerServices(IServiceCollection services)
{
    services.AddScoped<IJobApplicationsManager, JobApplicationsManager>();

    services.AddScoped<IDateTimeProvider, DateTimeProvider>();
}

static void AddCors(
    IServiceCollection services,
    string policyName,
    string origin)
{
    services.AddCors(
        options =>
        {
            options.AddPolicy(
                policyName,
                policy =>
                    policy.WithOrigins(origin)
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials());
        });
}

static string GetDbConnectionString()
{
    const string connectionStringEnvironmentVariableName = "JOB_TRACKER_DB_CONNECTION_STRING";

    bool isDesignTime = AppDomain.CurrentDomain.FriendlyName.Contains("ef");

    var dbConnectionString = Environment.GetEnvironmentVariable(connectionStringEnvironmentVariableName);
    if (!isDesignTime && dbConnectionString == null)
    {
        throw new InvalidOperationException(
            $"There must be environment variable '{connectionStringEnvironmentVariableName}' with connection string to DB");
    }

    return dbConnectionString ?? "";
}
