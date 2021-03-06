using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
  public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
  {
    private readonly StoreContext _context;
    public GenericRepository(StoreContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<T>> GetAllAsync()
    {
        return await _context.Set<T>().ToListAsync();
    }

    public async Task<T> GetById(int id)
    {
        return await _context.Set<T>().FindAsync(id);
    }

    public async Task<IReadOnlyList<T>> GetAllWithSpecification(ISpecification<T> spec)
    {
        return await ApplySpecification(spec).ToListAsync();
    }

    public async Task<T> GetEntityWithSpecification(ISpecification<T> spec)
    {
        return await ApplySpecification(spec).FirstOrDefaultAsync();
    }

    public async Task<int> CountAsync(ISpecification<T> countSpec)
    {
        return await ApplySpecification(countSpec).CountAsync();
    }


    public void Add(T entity)
    {
      _context.Set<T>().Add(entity);
    }

    public void Update(T entity)
    {
      _context.Set<T>().Attach(entity);
      _context.Entry(entity).State = EntityState.Modified;
    }

    public void Delete(T entity)
    {
      _context.Set<T>().Remove(entity);
    }



    private IQueryable<T> ApplySpecification(ISpecification<T> spec)
    {
        return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), spec);
    }

  }
}