namespace JobTracker.API.Models;

public class JobApplication
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public required string Company { get; set; }
    public string? Position { get; set; }
    public string? Salary { get; set; }
    public string? JobAdvertisementLink { get; set; }
    public string? Requirements { get; set; }
    public string? Notes { get; set; }
    public JobApplicationStatus Status { get; set; }
    public DateTime? AppliedDate { get; set; }
}
