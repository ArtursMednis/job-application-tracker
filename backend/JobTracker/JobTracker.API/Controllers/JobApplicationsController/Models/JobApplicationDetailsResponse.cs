using JobTracker.API.Models;

namespace JobTracker.API.Controllers.JobApplicationsController.Models;

public class JobApplicationDetailsResponse
{
    public Guid Id { get; set; }
    public string Company { get; set; }
    public string Position { get; set; }
    public string Salary { get; set; }
    public string JobAdvertisementLink { get; set; }
    public string Requirements { get; set; }
    public string Notes { get; set; }
    public string Status { get; set; }
    public string AppliedDate { get; set; }

    public static JobApplicationDetailsResponse CreateFrom(JobApplication application)
    {
        return new JobApplicationDetailsResponse
        {
            Id = application.Id,
            Company = application.Company,
            Position = application.Position,
            Salary = application.Salary,
            JobAdvertisementLink = application.JobAdvertisementLink,
            Requirements = application.Requirements,
            Notes = application.Notes,
            Status = application.Status.ToString(),
            AppliedDate = application.AppliedDate?.ToString("yyyy-MM-dd")
        };
    }
}
