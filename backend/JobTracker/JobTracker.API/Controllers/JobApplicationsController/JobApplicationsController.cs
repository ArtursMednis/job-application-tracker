using JobTracker.API.Contracts.Services;
using JobTracker.API.Controllers.JobApplicationsController.Models;
using JobTracker.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace JobTracker.API.Controllers.JobApplicationsController;

[Route("api/[controller]")]
[ApiController]
public class JobApplicationsController(
    IJobApplicationsManager jobApplicationsManager,
    SignInManager<User> signInManager) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<JobApplicationResponse>>> Get()
    {
        var currentUser = await GetCurrentUserId();

        var applications = await jobApplicationsManager.GetAsync(currentUser);

        var response = applications.Select(JobApplicationResponse.CreateFrom);

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<JobApplicationDetailsResponse>> Get(string id)
    {
        var currentUser = await GetCurrentUserId();
        var application = await jobApplicationsManager.GetAsyncDetails(Guid.Parse(id), currentUser);
        if (application == null)
        {
            return NotFound();
        }

        return JobApplicationDetailsResponse.CreateFrom(application);
    }

    [HttpPost]
    public async Task<ActionResult> Post([FromBody] JobApplicationSaveRequest jobAppRequest)
    {
        var currentUser = await GetCurrentUserId();
        await jobApplicationsManager.AddJobApplication(jobAppRequest.ToModel(currentUser));
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Put(
        string id,
        [FromBody] JobApplicationSaveRequest jobAppRequest)
    {
        var currentUser = await GetCurrentUserId();
        await jobApplicationsManager.UpdateJobApplication(jobAppRequest.ToModel(currentUser, Guid.Parse(id)));
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        var currentUser = await GetCurrentUserId();
        await jobApplicationsManager.DeleteJobApplication(id, currentUser);
        return NoContent();
    }

    private async Task<Guid> GetCurrentUserId()
    {
        if (User.Identity?.IsAuthenticated == false)
        {
            throw new UnauthorizedAccessException();
        }

        var user = await signInManager.UserManager.GetUserAsync(User);

        if (user == null)
        {
            throw new UnauthorizedAccessException();
        }

        return new Guid(user.Id);
    }
}
