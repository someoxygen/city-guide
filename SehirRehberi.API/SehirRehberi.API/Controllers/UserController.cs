using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SehirRehberi.API.Data;
using SehirRehberi.API.Dtos;
using SehirRehberi.API.Models;

namespace SehirRehberi.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IAppRepository _appRepository;
        IMapper _mapper;
        public UserController(IAppRepository appRepository, IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getUserById")]
        public ActionResult GetUserById(int id)
        {
            var user = _appRepository.GetUserById(id);
            var userToReturn = _mapper.Map<UserForReturnDto>(user);
            return Ok(userToReturn);
        }
    }
}
