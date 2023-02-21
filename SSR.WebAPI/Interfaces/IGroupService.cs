using SSR.WebAPI.Models;

namespace SSR.WebAPI.Interfaces;

public interface IGroupService
{
    Task<Group> Create(Group model);
    Task<Group> Update(Group model);
    Task Delete(string id);
    Task<List<Group>> Get();
    Task<Group> GetById(string id);
}