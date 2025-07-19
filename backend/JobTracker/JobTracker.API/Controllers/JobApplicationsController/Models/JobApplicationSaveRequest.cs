using JobTracker.API.Models;

namespace JobTracker.API.Controllers.JobApplicationsController.Models;

public class JobApplicationSaveRequest
{
    public required string Company { get; set; }
    public string? Position { get; set; }
    public string? Salary { get; set; }
    public string? JobAdvertisementLink { get; set; }
    public string? Requirements { get; set; }
    public string? Notes { get; set; }
    public string? Status { get; set; }
    public string? AppliedDate { get; set; }

    public JobApplication ToModel(
        Guid userId,
        Guid? id = null)
    {
        _ = Enum.TryParse(Status, out JobApplicationStatus statusEnum);
        var appliedDataHasValue = DateTime.TryParse(AppliedDate, out DateTime appliedDateParsed);
        return new JobApplication
        {
            Id = id ?? Guid.Empty,
            UserId = userId,
            Company = Company,
            Position = Position,
            Salary = Salary,
            JobAdvertisementLink = JobAdvertisementLink,
            Requirements = Requirements,
            Notes = Notes,
            Status = statusEnum,
            AppliedDate = appliedDataHasValue ? appliedDateParsed : null
        };
    }
}
