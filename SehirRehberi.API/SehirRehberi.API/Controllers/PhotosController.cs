﻿using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SehirRehberi.API.Data;
using SehirRehberi.API.Dtos;
using SehirRehberi.API.Helpers;
using SehirRehberi.API.Models;
using System.Security.Claims;

namespace SehirRehberi.API.Controllers
{
    [Produces("application/json")]
    [Route("api/cities/{cityId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private IAppRepository _appRepository;
        private IMapper _mapper;
        private IOptions<CloudinarySettings> _cloudinaryConfig;
        Cloudinary _cloudinary;
        public PhotosController(IAppRepository appRepository, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _appRepository = appRepository;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;
            
            Account account = new Account(_cloudinaryConfig.Value.CloudName, _cloudinaryConfig.Value.ApiKey, _cloudinaryConfig.Value.ApiSecret);
            _cloudinary = new Cloudinary(account);
        }

        [HttpPost]
        public ActionResult AddPhotoForCity(int cityId, [FromForm] PhotoForCreationDto photoForCreationDto)
        {
            var city = _appRepository.GetCityById(cityId);
            if (city == null)
            {
                return BadRequest("Could not find the city");
            }

            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if(currentUserId != city.UserId)
            {
                return Unauthorized();
            }

            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();
            
            if(file.Length> 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.Name, stream)
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);
            photo.City = city;

            if(!city.Photos.Any(p => p.IsMain))
            {
                photo.IsMain = true;
            }

            if(photo.Description == null)
            {
                photo.Description = "";
            }
            photo.DateAdded = photo.DateAdded.ToUniversalTime();
            city.Photos.Add(photo);
            if (_appRepository.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                var result = GetPhoto(photo.Id);
                return result;
                //return CreatedAtRoute("GetPhoto", new { id = photo.Id }, photoToReturn);

            }
            return BadRequest("Could not add the photo");
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public ActionResult GetPhoto(int id)
        {
            var photoFromDb = _appRepository.GetPhoto(id);
            var photo = _mapper.Map<PhotoForReturnDto>(photoFromDb);

            return Ok(photo);
        }

    }
}
