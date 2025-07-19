using JobTracker.API.Models;

namespace JobTracker.API.Contracts.Persistence;

public interface IJobApplicationRepository
{
    Task CreateAsync(JobApplication application);

    Task DeleteAsync(JobApplication application);

    Task<IReadOnlyList<JobApplication>> GetAsync(Guid userId);

    Task<JobApplication?> GetByIdAsync(
        Guid id,
        Guid userId);

    Task UpdateAsync(JobApplication application);
}
