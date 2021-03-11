using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vkaudioposter_Console;
using System.Threading.Tasks;
using vkaudioposter_Console.API;

namespace aspReactTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActionController : ControllerBase
    {
        // GET: ActionController
        [HttpGet]
        public async Task<ActionResult> GetAction()
        {
            return Ok();
        }

        // POST: /api/Action/
        [HttpPost]
        public async Task<IActionResult> PostAction()
        {
            try
            {
                await StartProgram.Start();
                return Ok();
                //return RedirectToAction(nameof(Index));
            }
            catch
            {
                return NoContent();
            }
        }


    }
}
