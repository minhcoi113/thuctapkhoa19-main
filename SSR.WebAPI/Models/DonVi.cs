﻿using System;
using SSR.WebAPI.Extensions;
using MongoDB.Bson.Serialization.Attributes;

namespace SSR.WebAPI.Models
{
	public class DonVi : Audit, IIdEntity<string>, IEntity<DonVi>
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
		public string Ten { get; set; }
		public string MaDonVi { get; set; }
		public string DonViCha { get; set; }
		public int CapDV { get; set; }
		public int ThuTu { get; set; }
	}

	public class DonViShort { 
		public string Id { get; set; }
		public string Ten { get; set; }
		public string MaDonVi { get; set; }
		public string DonViCha { get; set; }
		public int CapDV { get; set; }
		public int ThuTu { get; set; }
    }

	public class DonViTreeVM : ITreeVM<DonViTreeVM>
    {
        public string Id { get; set; }
        public string Label { get; set; }
        public bool Selected { get; set; }
        public bool Opened { get; set; }
        public List<DonViTreeVM> Children { get; set; }
    }

    public class CoQuan : Audit, TEntity<string>
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
        public string MaCoQuan { get; set; }
        public string Ten { get; set; }
        public string DonViCha { get; set; }
        public int CapDV { get; set; }
        public string MaLoaiHinhCoQuan { get; set; }
        public string TenLoaiHinhCoQuan { get; set; }
        public string MaCapCoQuan { get; set; }
        public string TenCapCoQuan { get; set; }
    }
}

