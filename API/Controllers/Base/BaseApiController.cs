using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Base
{
    //Dùng chung 1 lần luôn khỏi mắc công gọi lại từng lần
    [ApiController]
    [Route("api/[controller]")]
    //Kế từ ControllerBase luôn
    public class BaseApiController : ControllerBase
    {
    }
}