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

        [HttpPost]
        [Route("edit")]
        public ActionResult Edit([FromBody] City city)
        {
            var unmodifiedCity = _appRepository.GetCityById(city.Id);
            if (unmodifiedCity != null)
            {
                unmodifiedCity.Name = city.Name;
                unmodifiedCity.Description = city.Description;
                _appRepository.Update(unmodifiedCity);
                _appRepository.SaveAll();
                return Ok(city);
            }
            return NotFound(city);
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
        [Route("deleteCityById")]
        public ActionResult DeleteCityById(int cityId)
        {
            var city = _appRepository.GetCityById(cityId);
            foreach (var photo in city.Photos)
            {
                _appRepository.Delete(photo);
            }
            _appRepository.Delete(city);
            _appRepository.SaveAll();
            return Ok(cityId);
        }

        [HttpGet]
        [Route("getCitiesByUserId")]
        public ActionResult GetCitiesByUserId(int userId)
        {
            var cityList = _appRepository.GetCitiesByUserId(userId);
            List<CityForListDto> cityForListDtos = new List<CityForListDto>();
            foreach (var city in cityList)
            {
                cityForListDtos.Add(_mapper.Map<CityForListDto>(city));
            }
            //var cityToReturn = _mapper.Map<CityForDetailDto>(cityList);
            return Ok(cityForListDtos);
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
