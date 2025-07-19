using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JobTracker.API.Controllers.Fallback;

[AllowAnonymous]
public class FallbackController : Controller
{
    public IActionResult Index()
    {
        return PhysicalFile(
            Path.Combine(
                Directory.GetCurrentDirectory(),
                path2: "wwwroot",
                path3: "index.html"),
            contentType: "text/HTML");
    }
}
