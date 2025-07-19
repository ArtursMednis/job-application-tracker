using JobTracker.API.Models;

namespace JobTracker.API.Contracts.Services;

public interface IJobApplicationsManager
{
    Task<IReadOnlyList<JobApplication>> GetAsync(Guid userId);

    Task<JobApplication?> GetAsyncDetails(
        Guid applicationId,
        Guid userId);

    Task<Guid> AddJobApplication(JobApplication application);

    Task UpdateJobApplication(JobApplication application);

    Task DeleteJobApplication(
        Guid applicationId,
        Guid userId);
}
