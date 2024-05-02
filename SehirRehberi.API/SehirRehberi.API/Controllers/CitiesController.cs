using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SehirRehberi.API.Data;
using SehirRehberi.API.Dtos;
using SehirRehberi.API.Models;

namespace SehirRehberi.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Cities")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        IAppRepository _appRepository;
        IMapper _mapper;
        public CitiesController(IAppRepository appRepository,IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult GetCities()
        {
            var cities = _appRepository.GetCities();
            var citiesToReturn = _mapper.Map<List<CityForListDto>>(cities);
            return Ok(citiesToReturn);
        }

        [HttpPost]
        [Route("add")]
        public ActionResult Add([FromBody]City city) 
        {
            _appRepository.Add(city);
            _appRepository.SaveAll();
            return Ok(city);
        }

        [HttpGet]
        [Route("detail")]
        public ActionResult GetCitiesById(int id)
        {
            var city = _appRepository.GetCityById(id);        
            var cityToReturn = _mapper.Map<CityForDetailDto>(city);
            return Ok(cityToReturn);
        }

        [HttpGet]
        [Route("getCitiesByUserId")]
        public ActionResult GetCitiesByUserId(int userId)
        {
            var cityList = _appRepository.GetCitiesByUserId(userId);
            List<CityForDetailDto> cityForDetailDtos = new List<CityForDetailDto>();
            foreach (var city in cityList)
            {
                cityForDetailDtos.Add(_mapper.Map<CityForDetailDto>(city));
            }
            //var cityToReturn = _mapper.Map<CityForDetailDto>(cityList);
            return Ok(cityForDetailDtos);
        }

        [HttpGet]
        [Route("photos")]
        public ActionResult GetPhotosByCity(int cityId)
        {
            var photos = _appRepository.GetPhotosByCity(cityId);
            return Ok(photos);
        }
    }
}
