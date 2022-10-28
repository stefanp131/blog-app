using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class TestController : BaseApiController
{
    [HttpGet]
    public async Task<string> Test()
    {
        return "Tested successfully";
    }
}