using SSR.WebAPI.Exceptions;
using SSR.WebAPI.Helpers;
using SSR.WebAPI.Interfaces;
using SSR.WebAPI.Models;
using SSR.WebAPI.Params;
using Microsoft.AspNetCore.Mvc;
<<<<<<< HEAD
using EResultResponse = SSR.WebAPI.Helpers.EResultResponse;
=======
using EResultResponse = SSR.WebAPI.Exceptions.EResultResponse;
>>>>>>> 819a556e2afb9ba5a3ff608013f3dfe23e59b99d

namespace SSR.WebAPI.APIs
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class LabelController : ControllerBase
    {
<<<<<<< HEAD
        private IPhanloaiService _labelService;

        public LabelController(IPhanloaiService labelService)
=======
        private ILabelService _labelService;

        public LabelController(ILabelService labelService)
>>>>>>> 819a556e2afb9ba5a3ff608013f3dfe23e59b99d
        {
            _labelService = labelService;
        }

        [HttpPost]
        [Route("create")]
<<<<<<< HEAD
        public async Task<IActionResult> Create([FromBody] Phanloai model)
=======
        public async Task<IActionResult> Create([FromBody] Label model)
>>>>>>> 819a556e2afb9ba5a3ff608013f3dfe23e59b99d
        {
            try
            {
                var response = await _labelService.Create(model);
                return Ok(
                    new ResultResponse<dynamic>()
                        .WithData(response)
                        .WithCode(EResultResponse.SUCCESS.ToString())
                        .WithMessage(DefaultMessage.CREATE_SUCCESS)
                );
            }
            catch (ResponseMessageException ex)
            {
                return Ok(
                    new ResultMessageResponse().WithCode(ex.ResultCode)
                        .WithMessage(ex.ResultString)
                );
            }
        }

        [HttpPost]
        [Route("update")]
<<<<<<< HEAD
        public async Task<IActionResult> Update([FromBody] Phanloai model)
=======
        public async Task<IActionResult> Update([FromBody] Label model)
>>>>>>> 819a556e2afb9ba5a3ff608013f3dfe23e59b99d
        {
            try
            {
                var response = await _labelService.Update(model);

                return Ok(
                    new ResultResponse<dynamic>()
                        .WithData(response)
                        .WithCode(EResultResponse.SUCCESS.ToString())
                        .WithMessage(DefaultMessage.UPDATE_SUCCESS)
                );
            }
            catch (ResponseMessageException ex)
            {
                return Ok(
                    new ResultMessageResponse().WithCode(ex.ResultCode)
                        .WithMessage(ex.ResultString)
                );
            }
        }

        [HttpPost]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                await _labelService.Delete(id);

                return Ok(
                    new ResultMessageResponse()
                        .WithCode(EResultResponse.SUCCESS.ToString())
                        .WithMessage(DefaultMessage.DELETE_SUCCESS)
                );
            }
            catch (ResponseMessageException ex)
            {
                return Ok(
                    new ResultMessageResponse().WithCode(ex.ResultCode)
                        .WithMessage(ex.ResultString)
                );
            }
        }

        [HttpGet]
        [Route("get-by-id/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            try
            {
                var response = await _labelService.GetById(id);

                return Ok(
                    new ResultResponse<dynamic>()
                        .WithData(response)
                        .WithCode(EResultResponse.SUCCESS.ToString())
                        .WithMessage(DefaultMessage.GET_DATA_SUCCESS)
                );
            }
            catch (ResponseMessageException ex)
            {
                return Ok(
                    new ResultMessageResponse().WithCode(ex.ResultCode)
                        .WithMessage(ex.ResultString)
                );
            }
        }

<<<<<<< HEAD

        [HttpGet]
        [Route("get")]
=======
        //[HttpGet]
        //[Route("get-by-slug/{id}")]
        //public async Task<IActionResult> GetBySlug(string id)
        //{
        //    try
        //    {
        //        var response = await _labelService.GetBySlug(id);

        //        return Ok(
        //            new ResultResponse<dynamic>()
        //                .WithData(response)
        //                .WithCode(EResultResponse.SUCCESS.ToString())
        //                .WithMessage(DefaultMessage.GET_DATA_SUCCESS)
        //        );
        //    }
        //    catch (ResponseMessageException ex)
        //    {
        //        return Ok(
        //            new ResultMessageResponse().WithCode(ex.ResultCode)
        //                .WithMessage(ex.ResultString)
        //        );
        //    }
        //}

        [HttpGet]
        [Route("get-all-data")]
>>>>>>> 819a556e2afb9ba5a3ff608013f3dfe23e59b99d
        public async Task<IActionResult> Get()
        {
            try
            {
                var response = await _labelService.Get();

                return Ok(
                    new ResultResponse<dynamic>()
                        .WithData(response)
                        .WithCode(EResultResponse.SUCCESS.ToString())
                        .WithMessage(DefaultMessage.GET_DATA_SUCCESS)
                );
            }
            catch (ResponseMessageException ex)
            {
                return Ok(
                    new ResultMessageResponse().WithCode(ex.ResultCode)
                        .WithMessage(ex.ResultString)
                );
            }
        }

        [HttpPost]
        [Route("get-paging-params")]
<<<<<<< HEAD
        public async Task<IActionResult> GetPagingParam([FromBody] PagingParam param)
=======
        public async Task<IActionResult> GetPagingParam([FromBody] PostParams param)
>>>>>>> 819a556e2afb9ba5a3ff608013f3dfe23e59b99d
        {
            try
            {
                var response = await _labelService.GetPaging(param);

                return Ok(
                    new ResultResponse<dynamic>()
                        .WithData(response)
                        .WithCode(EResultResponse.SUCCESS.ToString())
                        .WithMessage(DefaultMessage.GET_DATA_SUCCESS)
                );
            }
            catch (ResponseMessageException ex)
            {
                return Ok(
                    new ResultMessageResponse().WithCode(ex.ResultCode)
                        .WithMessage(ex.ResultString)
                );
            }
        }
<<<<<<< HEAD
=======

        [HttpGet]
        [Route("get-tree")]
        public async Task<IActionResult> GetTree()
        {
            try
            {
                var response = await _labelService.GetTree();

                return Ok(
                    new ResultResponse<dynamic>()
                        .WithData(response)
                        .WithCode(Exceptions.EResultResponse.SUCCESS.ToString())
                        .WithMessage(DefaultMessage.GET_DATA_SUCCESS)
                );
            }
            catch (ResponseMessageException ex)
            {
                return Ok(
                    new ResultMessageResponse().IsError().WithCode(ex.ResultCode)
                          .WithMessage(ex.ResultString)
                );
            }
        }
>>>>>>> 819a556e2afb9ba5a3ff608013f3dfe23e59b99d
    }
}