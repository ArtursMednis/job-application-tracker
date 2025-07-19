using JobTracker.API.Contracts.Persistence;
using JobTracker.API.Models;
using Microsoft.EntityFrameworkCore;

namespace JobTracker.API.Persistence;

public static class PersistenceServicesRegistration
{
    public static void AddPersistenceServices(
        this IServiceCollection services,
        string dbConnectionString)
    {
        services.AddDbContext<ApplicationDbContext>(
            options =>
            {
                options.UseSqlServer(dbConnectionString);
            });

        services.AddScoped<IJobApplicationRepository, JobApplicationRepository>();

        services.AddIdentityApiEndpoints<User>(
                opt =>
                {
                    opt.Password.RequireNonAlphanumeric = false;
                })
            .AddEntityFrameworkStores<ApplicationDbContext>();
    }
}
