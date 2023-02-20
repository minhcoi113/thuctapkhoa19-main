﻿using System;
using SSR.WebAPI.Interfaces;
using SSR.WebAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace SSR.WebAPI.APIs
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class KyBaoCaoController : BaseAPIController<KyBaoCao, string>
    {
        private readonly IKyBaoCaoService _service;
        public KyBaoCaoController(IKyBaoCaoService service) : base(service)
        {
            this._service = service;
        }
    }
}