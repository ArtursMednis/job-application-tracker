using JobTracker.API.Contracts.Persistence;
using JobTracker.API.Models;
using Microsoft.EntityFrameworkCore;

namespace JobTracker.API.Persistence;

public class JobApplicationRepository(ApplicationDbContext context) : IJobApplicationRepository
{
    public async Task CreateAsync(JobApplication application)
    {
        await context.JobApplications.AddAsync(application);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(JobApplication application)
    {
        context.JobApplications.Remove(application);
        await context.SaveChangesAsync();
    }

    public async Task<IReadOnlyList<JobApplication>> GetAsync(Guid userId)
    {
        return await context.JobApplications
            .AsNoTracking()
            .Where(q => q.UserId == userId)
            .OrderBy(q => q.AppliedDate)
            .ToListAsync();
    }

    public async Task<JobApplication?> GetByIdAsync(
        Guid id,
        Guid userId)
    {
        return await context.JobApplications
            .AsNoTracking()
            .FirstOrDefaultAsync(q => q.Id == id && q.UserId == userId);
    }

    public async Task UpdateAsync(JobApplication application)
    {
        context.Entry(application).State = EntityState.Modified;
        await context.SaveChangesAsync();
    }
}
