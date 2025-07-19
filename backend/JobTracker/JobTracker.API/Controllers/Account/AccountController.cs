using JobTracker.API.Controllers.Account.Models;
using JobTracker.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace JobTracker.API.Controllers.Account;

[Route("api/[controller]")]
[ApiController]
public class AccountController(SignInManager<User> signInManager) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult> RegisterUser([FromBody] RegisterUserRequest registerUserRequest)
    {
        var user = new User
        {
            UserName = registerUserRequest.Email,
            Email = registerUserRequest.Email
        };

        var createUserResult = await signInManager.UserManager.CreateAsync(user, registerUserRequest.Password);
        if (!createUserResult.Succeeded)
        {
            foreach (var error in createUserResult.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }

            return ValidationProblem();
        }

        return Ok();
    }

    [HttpGet("user-info")]
    public async Task<ActionResult> GetUserInfo()
    {
        if (User.Identity?.IsAuthenticated == false)
        {
            return NoContent();
        }

        var user = await signInManager.UserManager.GetUserAsync(User);

        if (user == null)
        {
            return Unauthorized();
        }

        return Ok(
            new
            {
                email = user.Email
            });
    }

    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await signInManager.SignOutAsync();

        return NoContent();
    }
}
