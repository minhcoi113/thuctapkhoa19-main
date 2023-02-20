using MongoDB.Bson.Serialization.Attributes;

namespace SSR.WebAPI.Models;

public class Role : Audit, TEntity<string>
{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id { get; set; }
    public string Code { get; set; }
    public string Ten { get; set; }
    public int ThuTu { get; set; }

    public List<Menu> Menus { get; set; } = new List<Menu>();
    public List<Permission> Permissions { get; set; } = new List<Permission>();
}
