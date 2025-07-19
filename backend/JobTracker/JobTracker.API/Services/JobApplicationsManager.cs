using JobTracker.API.Contracts.Persistence;
using JobTracker.API.Contracts.Services;
using JobTracker.API.Contracts.Utilities;
using JobTracker.API.Models;

namespace JobTracker.API.Services;

public class JobApplicationsManager(
    IJobApplicationRepository jobApplicationRepository,
    IDateTimeProvider dateTimeProvider)
    : IJobApplicationsManager
{
    public async Task<Guid> AddJobApplication(JobApplication application)
    {
        AssignInitialValues(application);
        await jobApplicationRepository.CreateAsync(application);

        return application.Id;
    }

    public async Task UpdateJobApplication(JobApplication application)
    {
        if (application.Id == Guid.Empty)
        {
            throw new ArgumentException("JobApplication must have valid Id");
        }

        await jobApplicationRepository.UpdateAsync(application);
    }

    public async Task<IReadOnlyList<JobApplication>> GetAsync(Guid userId)
    {
        return await jobApplicationRepository.GetAsync(userId);
    }

    public async Task<JobApplication?> GetAsyncDetails(
        Guid applicationId,
        Guid userId)
    {
        return await jobApplicationRepository.GetByIdAsync(applicationId, userId);
    }

    public async Task DeleteJobApplication(
        Guid applicationId,
        Guid userId)
    {
        var application = await jobApplicationRepository.GetByIdAsync(applicationId, userId);
        if (application != null)
        {
            await jobApplicationRepository.DeleteAsync(application);
        }
    }

    private void AssignInitialValues(JobApplication application)
    {
        application.Id = Guid.NewGuid();
        application.AppliedDate ??= dateTimeProvider.Now;
    }
}
