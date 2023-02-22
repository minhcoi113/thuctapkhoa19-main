using MongoDB.Bson.Serialization.Attributes;

namespace SSR.WebAPI.Models;

public class Project : Audit, TEntity<string>
{
    public Project()
    {
    }
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id { get; set; }
    public string Description { get; set; }
    public string Name { get; set; }   
    public string Thumbnail { get; set; }
    public string Slug { get; set; }
    public List<Group> Groups { get; set; }
    public List<Tag> Labels { get; set; }
    public List<User> Members { get; set; }
    public List<FileShort> Files { get; set; }
}