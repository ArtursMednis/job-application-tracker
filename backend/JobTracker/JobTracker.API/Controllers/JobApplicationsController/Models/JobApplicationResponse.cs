using JobTracker.API.Models;

namespace JobTracker.API.Controllers.JobApplicationsController.Models;

public class JobApplicationResponse
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

    public static JobApplicationResponse CreateFrom(JobApplication application)
    {
        return new JobApplicationResponse
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
