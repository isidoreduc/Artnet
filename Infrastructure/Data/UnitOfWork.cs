using System;
using System.Collections;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Repositories;

namespace Infrastructure.Data
{
  public class UnitOfWork : IUnitOfWork
  {
    private readonly StoreContext _context;
    private Hashtable _repositories;
    public UnitOfWork(StoreContext context)
    {
      _context = context;
    }

    public async Task<int> Complete() => await _context.SaveChangesAsync();

    public void Dispose() => _context.Dispose();


    public IGenericRepository<T> Repository<T>() where T : BaseEntity
    {
      _repositories = _repositories == null ? new Hashtable() : _repositories;
      var entityType = typeof(T).Name;
      if(!_repositories.ContainsKey(entityType))
      {
        var repoType = typeof(GenericRepository<>);
        var repoInstance = Activator.CreateInstance(repoType.MakeGenericType(typeof(T)), _context);
        _repositories.Add(entityType, repoInstance);
      }
      return (IGenericRepository<T>)_repositories[entityType];
    }
  }
}